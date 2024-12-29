import * as vscode from 'vscode';
import path from 'path';
import grayMatter from "gray-matter";
import { createHTMLExportContent } from "../exports/export-html.js";
import { createMarpSlideHtmlExportContent } from "../exports/export-marp.js";
import type { ExtraJSFrontMatter } from "@morish000/markdown-it-extrajs";
import type { GlobalOptions } from "../global-options.js";
import { selectFile } from "./select-file.js";

export const create = (globalOptions: GlobalOptions): [string, () => Promise<void>, any] => [
  'extension.markdown-extrajs.export-html',
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
      estrajs: ExtraJSFrontMatter;[key: string]: any
    };

    const outputPath = await selectFile(
      filePath.replace(/\.md$/, '_extrajs.html'),
      path.dirname(filePath));

    if (!outputPath) {
      return;
    }

    const fileContent = frontMatter.marp ?
      await createMarpSlideHtmlExportContent(
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

    try {
      await vscode.workspace.fs.writeFile(
        vscode.Uri.file(outputPath),
        new TextEncoder().encode(fileContent));
      vscode.window.showInformationMessage(`File written successfully: ${outputPath}`);
    } catch (err) {
      const error = err as Error;
      vscode.window.showErrorMessage(`Error writing file: ${error.message}`);
    }
  },
  undefined
];
