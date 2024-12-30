import type MarkdownIt from "markdown-it";
import * as vscode from 'vscode';
import extraJsPlugin from "@morish000/markdown-it-extrajs";
import createGlobalOptions from "./global-options.js";
import * as exportCommand from "./commands/export-command.js";
import * as htmlExportCommand from "./commands/export-html-command.js";
import * as pdfExportCommand from "./commands/export-pdf-command.js";
import * as installPuppeteerChromium from "./commands/install-puppeteer-chromium.js";
import { noHTMLPluginForMarkdownIt, noHTMLPluginForMarpVSCode } from "./no-html-feature.js";

export function activate(context: vscode.ExtensionContext) {
  const globalOptions = createGlobalOptions(context);
  context.subscriptions.push(vscode.commands.registerCommand(...exportCommand.create(globalOptions)));
  context.subscriptions.push(vscode.commands.registerCommand(...htmlExportCommand.create(globalOptions)));
  context.subscriptions.push(vscode.commands.registerCommand(...pdfExportCommand.create(globalOptions)));
  context.subscriptions.push(vscode.commands.registerCommand(...installPuppeteerChromium.create(globalOptions)));
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('markdownExtraJS')) {
      globalOptions.update();
      vscode.commands.executeCommand('markdown.preview.refresh');
    }
  }));

  return {
    extendMarkdownIt(md: MarkdownIt) {
      const config = vscode.workspace.getConfiguration('markdownExtraJS');
      const useNoHTMLFeatuer = config.get<boolean>('featuer.useNoHTML', false);
      const newMarkdownIt = (useNoHTMLFeatuer ? noHTMLPluginForMarkdownIt(md) : md)
        .use(extraJsPlugin, globalOptions.update());
      return (useNoHTMLFeatuer ? noHTMLPluginForMarpVSCode(newMarkdownIt) : newMarkdownIt);
    },
  };
}

export function deactivate() { }
