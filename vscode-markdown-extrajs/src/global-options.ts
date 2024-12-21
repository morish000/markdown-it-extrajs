import * as vscode from 'vscode';
import type { ExtraJSOptions } from "@morish000/markdown-it-extrajs";

export type GlobalOptions = {
  globalStorageUri: vscode.Uri;
  update: () => ExtraJSOptions;
};

const createGlobalOptions = (context: vscode.ExtensionContext) => {
  const globalStorageUri = context.globalStorageUri;
  const storedOptions: ExtraJSOptions = {};
  return {
    globalStorageUri: globalStorageUri,
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
};

export default createGlobalOptions;
