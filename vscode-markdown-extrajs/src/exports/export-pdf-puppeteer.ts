import * as vscode from 'vscode';
import { randomUUID } from 'crypto';
import puppeteer, { PaperFormat, PDFMargin } from 'puppeteer-core';
import type { ExtraJSFrontMatter } from "@morish000/markdown-it-extrajs";
import {
  Browser,
  BrowserPlatform,
  canDownload,
  computeExecutablePath,
  detectBrowserPlatform,
  getInstalledBrowsers,
  install,
  resolveBuildId,
  uninstall
} from '@puppeteer/browsers';

// https://pptr.dev/api/puppeteer.pdfoptions
export type PDFOptionsPuppeteer = {
  displayHeaderFooter?: boolean;
  footerTemplate?: string;
  format?: PaperFormat;
  headerTemplate?: string;
  height?: string | number;
  landscape?: boolean;
  margin?: PDFMargin;
  outline?: boolean;
  pageRanges?: string;
  path?: string;
  preferCSSPageSize?: boolean;
  printBackground?: boolean;
  scale?: number;
  tagged?: boolean;
  waitForFonts?: boolean;
  width?: string | number;
};

const commonOptions = (): PDFOptionsPuppeteer => ({
  printBackground: true
});

const marpOptions = (): PDFOptionsPuppeteer => ({
  preferCSSPageSize: true,
  margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
});

const regularOptions = (title: string): PDFOptionsPuppeteer => ({
  format: "A4",
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

export const exportPDFPuppeteer = async (
  filename: string,
  exportContent: string,
  exportPath: string,
  frontMatter: {
    estrajs: ExtraJSFrontMatter;
    pdfOptions: PDFOptionsPuppeteer;
    [key: string]: any;
  },
  launchOptions: puppeteer.LaunchOptions & { useProxy?: boolean } = {},
  waitTimeout: number,
  globalStorageUri: vscode.Uri) => {

  const cacheDir = await createCacheDirectoryIfNotExists(globalStorageUri);

  const tempFileUri = vscode.Uri.file(`${exportPath}-${randomUUID()}.html`);
  await vscode.workspace.fs.writeFile(
    tempFileUri,
    new TextEncoder().encode(exportContent));

  const executablePath = launchOptions.executablePath ?
    launchOptions.executablePath :
    await getExecutablePath(globalStorageUri);
  const browser = await puppeteer.launch({
    ...launchOptions,
    userDataDir: cacheDir,
    args: [
      ...getProxySettingsArgs(!!launchOptions.useProxy),
      "--disable-dev-shm-usage"],
    executablePath
  });

  try {
    const page = await browser.newPage();
    await page.goto(`file://${tempFileUri.fsPath}`, { timeout: waitTimeout, waitUntil: 'load' });
    await page.waitForNetworkIdle({ timeout: waitTimeout });

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
      ...(frontMatter.pdfOptions ?? {}),
      path: exportPath
    });

  } finally {
    try {
      await browser.close();
    } catch (e) {
      console.error(e);
    }
    try {
      await vscode.workspace.fs.delete(tempFileUri);
    } catch (e) {
      console.error(e);
    }
  }
};

const createCacheDirectoryIfNotExists = async (globalStorageUri: vscode.Uri) => {
  const cacheUri = vscode.Uri.joinPath(globalStorageUri, '.puppeteer', 'browser-chromium');
  try {
    await vscode.workspace.fs.stat(cacheUri);
  } catch (e) {
    await vscode.workspace.fs.createDirectory(cacheUri);
    vscode.window.showInformationMessage(`Directory created: ${cacheUri.fsPath}`);
  }
  return cacheUri.fsPath;
};

const createBrowserDirectoryIfNotExists = async (globalStorageUri: vscode.Uri) => {
  const cacheUri = vscode.Uri.joinPath(globalStorageUri, '.puppeteer-browsers');
  try {
    await vscode.workspace.fs.stat(cacheUri);
  } catch (e) {
    await vscode.workspace.fs.createDirectory(cacheUri);
    vscode.window.showInformationMessage(`Directory created: ${cacheUri.fsPath}`);
  }
  return cacheUri.fsPath;
};

const getProxySettingsArgs = (useProxy: boolean) => {
  if (!useProxy) {
    return [];
  }

  const proxyUrl = process.env.HTTP_PROXY || process.env.http_proxy;

  if (!proxyUrl) {
    console.error('proxy settings not found.');
    return [];
  }

  const url = new URL(proxyUrl);

  const args = [`--proxy-server=${url.protocol}//${url.hostname}` + (url.port ? `:${url.port}` : '')];

  // Unfortunately, there is no official method to set this currently. [Using Proxies with Puppeteer](https://puppeteer.guide/posts/proxies/)
  // if (url.username) { args.push(`--proxy-auth=${url.username}:${url.password}`); }

  return args;
};

export const getExecutablePath = async (globalStorageUri: vscode.Uri) => {
  const cacheDir = await createBrowserDirectoryIfNotExists(globalStorageUri);
  const installedBrowsers = await getInstalledBrowsers({ cacheDir });
  let buildId = "";
  if (0 < installedBrowsers.length) {
    buildId = installedBrowsers.sort((a, b) => parseInt(b.buildId) - parseInt(a.buildId))[0].buildId;
  }
  const options = buildId ?
    { browser: Browser.CHROMIUM, buildId, cacheDir } :
    await installLatestChromium(globalStorageUri);
  return await computeExecutablePath(options);
};

export const installLatestChromium = async (globalStorageUri: vscode.Uri) => {
  const cacheDir = await createBrowserDirectoryIfNotExists(globalStorageUri);
  const browserPlatform = detectBrowserPlatform() as BrowserPlatform;
  const buildId = await resolveBuildId(Browser.CHROMIUM, browserPlatform, "latest");
  const options = { browser: Browser.CHROMIUM, buildId, cacheDir };
  if (await canDownload(options)) {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Installing Chromium",
      cancellable: false
    }, async (progress) => {
      await install(options);
      progress.report({ increment: 100 });
    });
  }
  return options;
};

export const uninstallOldChromium = async (globalStorageUri: vscode.Uri) => {
  const cacheDir = await createBrowserDirectoryIfNotExists(globalStorageUri);
  const platform = detectBrowserPlatform();
  const installedBrowsers = await getInstalledBrowsers({ cacheDir });

  if (installedBrowsers.length < 2) {
    return;
  }

  const latestBuildId = installedBrowsers.sort(
    (a, b) => parseInt(b.buildId) - parseInt(a.buildId))[0].buildId;
  const oldBrowsers = installedBrowsers.filter(browser => browser.buildId !== latestBuildId);

  await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: "Uninstalling Chromium",
    cancellable: false
  }, async (progress) => {
    for (const browser of oldBrowsers) {
      await uninstall({ browser: Browser.CHROMIUM, buildId: browser.buildId, cacheDir, platform });
    }
    progress.report({ increment: 100 });
  });
};
