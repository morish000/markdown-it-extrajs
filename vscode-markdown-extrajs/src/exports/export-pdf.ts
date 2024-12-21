import * as vscode from 'vscode';
import { chromium, firefox, webkit, BrowserType } from 'playwright-core';
import type { ExtraJSFrontMatter } from "@morish000/markdown-it-extrajs";

const browserTypeMap: { [key: string]: BrowserType<any> } = {
  chromium,
  firefox,
  webkit
};

export type PDFOptions = {
  displayHeaderFooter?: boolean;
  footerTemplate?: string;
  format?: string;
  headerTemplate?: string;
  height?: string | number;
  landscape?: boolean;
  margin?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
  outline?: boolean;
  pageRanges?: string;
  path?: string;
  preferCSSPageSize?: boolean;
  printBackground?: boolean;
  scale?: number;
  tagged?: boolean;
  width?: string | number;
};

const commonOptions = (): PDFOptions => ({
  printBackground: true
});

const marpOptions = (): PDFOptions => ({
  preferCSSPageSize: true,
  margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
});

const regularOptions = (title: string): PDFOptions => ({
  displayHeaderFooter: true,
  headerTemplate: `
  <div style="font-size: 12px; width: 100%; text-align: center; margin-top: 10px;">
    ${title}
  </div>`,
  footerTemplate: `
  <div style="font-size: 12px; width: 100%; text-align: center; margin-top: 10px;">
    <span class="pageNumber"></span> / <span class="totalPages"></span>
  </div>`,
  margin: { top: '40px', right: '40px', bottom: '40px', left: '40px' }
});

export const exportPDF = async (
  filename: string,
  exportContent: string,
  exportPath: string,
  frontMatter: {
    estrajs: ExtraJSFrontMatter;
    playwright: {
      pdfOptions: PDFOptions;
    };
    [key: string]: any;
  },
  browserName: string,
  launchOptions: {
    executablePath?: string,
    devtools?: boolean,
    headless?: boolean,
    timeout?: number,
    locale?: string,
    offline?: boolean,
    timezoneId?: string,
    useProxy?: boolean
  } = {},
  waitTimeout: number,
  globalStorageUri: vscode.Uri) => {
  const browserType = browserTypeMap[browserName];

  if (!browserType) {
    vscode.window.showErrorMessage(`Unsupported browser: ${browserName}`);
    return;
  }

  const cacheDir = await createCacheDirectoryIfNotExists(globalStorageUri, browserName);

  const browser = await browserType.launchPersistentContext(
    cacheDir, { ...launchOptions, ...getProxySettings(!!launchOptions.useProxy) });

  const page = await browser.newPage();
  await page.setContent(exportContent, { timeout: waitTimeout, waitUntil: 'load' });
  await page.waitForLoadState('networkidle', { timeout: waitTimeout });

  const settings = {
    timeout: waitTimeout,
    interval: 200,
    stablePeriod: 1000
  };

  await page.evaluate(({ timeout, interval, stablePeriod }) => {
    return new Promise<void>((resolve) => {
      let lastMutationTime = Date.now();
      const observer = new MutationObserver(() => {
        lastMutationTime = Date.now();
      });

      observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
      });

      const checkInterval = setInterval(() => {
        if (Date.now() - lastMutationTime > stablePeriod) {
          clearInterval(checkInterval);
          observer.disconnect();
          resolve();
        }
      }, interval);

      setTimeout(() => {
        clearInterval(checkInterval);
        observer.disconnect();
        resolve();
      }, timeout);
    });
  }, settings);

  await page.pdf({
    ...commonOptions(),
    ...(frontMatter.marp ? marpOptions() : regularOptions(frontMatter.title ?? filename)),
    ...(frontMatter.playwright?.pdfOptions ? frontMatter.playwright.pdfOptions : {}),
    path: exportPath
  });

  try {
    await browser.close();
  } catch (e) {
    console.error(e);
  }
};

const createCacheDirectoryIfNotExists = async (globalStorageUri: vscode.Uri, browserName: string) => {
  const cacheUri = vscode.Uri.joinPath(globalStorageUri, '.playwright', `browser-${browserName}`);
  try {
    await vscode.workspace.fs.stat(cacheUri);
  } catch (e) {
    await vscode.workspace.fs.createDirectory(cacheUri);
    vscode.window.showInformationMessage(`Directory created: ${cacheUri.fsPath}`);
  }
  return cacheUri.fsPath;
};

const getProxySettings = (useProxy: boolean) => {
  if (!useProxy) {
    return {};
  }

  const proxyUrl = process.env.HTTP_PROXY || process.env.http_proxy;

  if (!proxyUrl) {
    console.error('proxy settings not found.');
    return {};
  }

  const url = new URL(proxyUrl);

  const bypass = process.env.NO_PROXY || process.env.no_proxy || '';
  return {
    proxy: {
      server: `${url.protocol}//${url.hostname}` + (url.port ? `:${url.port}` : ''),
      ...(url.username ? { username: url.username } : {}),
      ...(url.password ? { password: url.password } : {}),
      ...(bypass ? { bypass } : {}),
    },
  };
};
