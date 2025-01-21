import * as vscode from 'vscode';
import { ExtraJSOptions, defaultOptions } from "@morish000/markdown-it-extrajs";

export type GlobalOptions = {
  globalStorageUri: vscode.Uri;
  update: () => ExtraJSOptions;
};

const createGlobalOptions = (context: vscode.ExtensionContext) => {
  const globalStorageUri = context.globalStorageUri;
  const storedOptions: ExtraJSOptions = {};
  return {
    globalStorageUri,
    update: () => {
      const config = vscode.workspace.getConfiguration('markdownExtraJS');

      storedOptions.discardFrontMatter = config.get<boolean>('discardFrontMatter', true);
      storedOptions.outputScriptTag = config.get<boolean>('outputScriptTag', false);
      storedOptions.useMermaid = config.get<boolean>('useMermaid', true);
      storedOptions.useFontAwesome = config.get<boolean>('useFontAwesome', true);
      storedOptions.useUnoCSS = config.get<boolean>('useUnoCSS', true);
      storedOptions.mermaidUrl = config.get<string>('mermaidUrl', defaultOptions.mermaidUrl);
      storedOptions.mermaidElkUrl = config.get<string>('mermaidElkUrl', defaultOptions.mermaidElkUrl);
      storedOptions.fontAwesomeUrl = config.get<string>('fontAwesomeUrl', defaultOptions.fontAwesomeUrl);
      storedOptions.unoCSSUrl = config.get<string>('unoCSSUrl', defaultOptions.unoCSSUrl);
      storedOptions.iconifyJsonCDN = config.get<string>('iconifyJsonCDN', defaultOptions.iconifyJsonCDN);
      storedOptions.iconifyJsonCDNParams = config.get<string>('iconifyJsonCDNParams', defaultOptions.iconifyJsonCDNParams);

      return storedOptions;
    }
  };
};

export default createGlobalOptions;
