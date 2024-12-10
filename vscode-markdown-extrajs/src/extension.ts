import * as vscode from 'vscode';
import type MarkdownIt from "markdown-it";
import extraJsPlugin, { ExtraJSOptions } from "@morish000/markdown-it-extrajs";

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
	const configChangeListener = vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('markdownExtraJS')) {
			globalOptions.update();
			vscode.commands.executeCommand('markdown.preview.refresh');
		}
	});

	context.subscriptions.push(configChangeListener);

	return {
		extendMarkdownIt(md: MarkdownIt) {
			return md.use(extraJsPlugin, globalOptions.update());
		},
	};
}

export function deactivate() { }
