import * as vscode from 'vscode';
import type MarkdownIt from "markdown-it";
import extraJsPlugin, { type ExtraJSOptions } from "@morish000/markdown-it-extrajs";
import { createExportContent } from "./export.js";
import path from 'path';

const globalOptions = (() => {
  const storedOptions: ExtraJSOptions = {};
  return {
    update: () => {
      const config = vscode.workspace.getConfiguration('markdownExtraJS');

      storedOptions.discardFrontMatter = config.get<boolean>('discardFrontMatter', true);
      storedOptions.outputScriptTag = config.get<boolean>('outputScriptTag', false);
      storedOptions.useMermaid = config.get<boolean>('useMermaid', true);
      storedOptions.useFontAwesome = config.get<boolean>('useFontAwesome', true);
      storedOptions.useUnoCSS = config.get<boolean>('useUnoCSS', true);
      storedOptions.mermaidUrl = config.get<string>('mermaidUrl', 'https://esm.sh/mermaid');
      storedOptions.mermaidElkUrl = config.get<string>('mermaidElkUrl', 'https://esm.sh/@mermaid-js/layout-elk');
      storedOptions.fontAwesomeUrl = config.get<string>('fontAwesomeUrl', 'https://esm.sh/@fortawesome');
      storedOptions.unoCSSUrl = config.get<string>('unoCSSUrl', 'https://esm.sh/@unocss');
      storedOptions.iconifyJsonCDN = config.get<string>('iconifyJsonCDN', 'https://esm.sh');

      return storedOptions;
    }
  };
})();

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('extension.markdown-extrajs.export', async () => {
    const config = vscode.workspace.getConfiguration('markdownExtraJS');
    const puppeteerTimeout = config.get<number>('puppeteerTimeout', -1);
    if (puppeteerTimeout >= 0) {
      process.env.PUPPETEER_TIMEOUT = puppeteerTimeout.toString();
    }

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

    const dirPath = path.dirname(filePath);
    const htmlPath = filePath.replace(/\.md$/, '_extrajs.html');
    const marpPath = filePath.replace(/\.md$/, '_extrajs.md');
    const sourceFileName = path.basename(filePath, '.md') ?? "";

    const fileContent = await createExportContent(globalOptions.update(), config.get<string>('htmlLang', ""), sourceFileName, document.getText());
    let outputPath = fileContent.marp ? marpPath : htmlPath;

    while (true) {
      try {
        await vscode.workspace.fs.stat(vscode.Uri.file(outputPath));
        const newFileName = path.basename(outputPath);

        const inputFileName = (await vscode.window.showInputBox({
          prompt: `The file ${newFileName} already exists. Please enter a new file name or confirm to overwrite:`,
          value: newFileName,
          valueSelection: [0, newFileName.length]
        }))?.trim() ?? "";

        if (!inputFileName) {
          // cancel.
          return;
        }

        outputPath = path.join(dirPath, inputFileName);
        if (newFileName === inputFileName) {
          // override
          break;
        }
      } catch (err: any) {
        if (err?.code === 'FileNotFound') {
          // new file
          break;
        }
        vscode.window.showErrorMessage(`Error checking file: ${err?.code}, ${err?.name}, ${err?.message}`);
        // unexpected error.
        return;
      }
    }

    try {
      const content = new TextEncoder().encode(fileContent.content);
      await vscode.workspace.fs.writeFile(vscode.Uri.file(outputPath), content);
      vscode.window.showInformationMessage(`File written successfully: ${outputPath}`);
    } catch (err) {
      const error = err as Error;
      vscode.window.showErrorMessage(`Error writing file: ${error.message}`);
    }
  }));

  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('markdownExtraJS')) {
      globalOptions.update();
      vscode.commands.executeCommand('markdown.preview.refresh');
    }
  }));

  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(extraJsPlugin, globalOptions.update());
    },
  };
}

export function deactivate() { }
