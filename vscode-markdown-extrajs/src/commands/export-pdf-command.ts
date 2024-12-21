import * as vscode from 'vscode';
import path from 'path';
import grayMatter from "gray-matter";
import { createHTMLExportContent } from "../exports/export-html.js";
import { createMarpHtmlExportContent } from "../exports/export-marp.js";
import { exportPDF } from "../exports/export-pdf.js";
import type { ExtraJSFrontMatter } from "@morish000/markdown-it-extrajs";
import type { GlobalOptions } from "../global-options.js";
import { selectFile } from "./select-file.js";

export const create = (globalOptions: GlobalOptions): [string, () => Promise<void>, any] => [
  'extension.markdown-extrajs.export-pdf',
  async () => {
    const config = vscode.workspace.getConfiguration('markdownExtraJS');
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const document = editor.document;
    const filePath = document.uri.fsPath;
    if (document.languageId !== 'markdown' || !filePath.endsWith('.md')) {
      vscode.window.showErrorMessage('This command can only be run on Markdown files.');
      return;
    }

    const grayMatterFile = grayMatter(document.getText());
    const frontMatter = (grayMatterFile.data ?? {}) as {
      estrajs: ExtraJSFrontMatter;
      playwright: {
        pdfOptions: any;
      };
      [key: string]: any;
    };

    const dirPath = path.dirname(filePath);
    const outputPath = await selectFile(
      filePath.replace(/\.md$/, '_extrajs.pdf'),
      dirPath);

    if (!outputPath) {
      return;
    }

    const htmlContent = frontMatter.marp ?
      await createMarpHtmlExportContent(
        globalOptions.update(),
        config.get<string>('export.htmlLang', ""),
        path.basename(filePath, '.md') ?? "",
        document.getText(),
        frontMatter) :
      await createHTMLExportContent(
        globalOptions.update(),
        config.get<string>('export.htmlLang', ""),
        path.basename(filePath, '.md') ?? "",
        document.getText(),
        frontMatter);

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Exporting PDF",
      cancellable: false
    }, async (progress) => {
      try {
        await exportPDF(
          path.basename(filePath, '.md') ?? "",
          htmlContent,
          outputPath,
          frontMatter,
          // This setting is not included in package.json.Reason: PDF export only works with Chromium.
          "chromium",
          {
            devtools: config.get<boolean>('playwright.devtools', false),
            headless: config.get<boolean>('playwright.headless', true),
            timeout: config.get<number>('playwright.timeout', 30000),
            offline: config.get<boolean>('playwright.offline', false),
            useProxy: config.get<boolean>('playwright.useProxy', false),
            ...(config.get<string | null>('playwright.executablePath', null) ? { executablePath: config.get<string>('playwright.executablePath') } : {}),
            ...(config.get<string | null>('playwright.locale', null) ? { locale: config.get<string>('playwright.locale') } : {}),
            ...(config.get<string | null>('playwright.timezoneId', null) ? { timezoneId: config.get<string>('playwright.timezoneId') } : {})
          },
          config.get<number>('playwright.waitTimeout', 30000),
          globalOptions.globalStorageUri
        );
      } finally {
        progress.report({ increment: 100 });
      }
    });

    vscode.window.showInformationMessage(`File written successfully: ${outputPath}`);
  },
  undefined
];
