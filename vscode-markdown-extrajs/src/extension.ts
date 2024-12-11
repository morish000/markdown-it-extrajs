import * as vscode from 'vscode';
import type MarkdownIt from "markdown-it";
import extraJsPlugin, { type ExtraJSOptions } from "@morish000/markdown-it-extrajs";
import { test } from "./experiment.js";

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
	context.subscriptions.push(vscode.commands.registerCommand('extension.markdown-extrajs.export.html', () => {
		console.log("export html.");
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found');
			return;
		}

		const document = editor.document;
		if (document.languageId !== 'markdown') {
			vscode.window.showErrorMessage('This command can only be run on Markdown files.');
			return;
		}

		const filePath = document.uri.fsPath;
		const htmlPath = filePath.replace(/\.md$/, '.html');
		const pdfPath = filePath.replace(/\.md$/, '.pdf');
		console.log("Paths:", filePath, htmlPath, pdfPath);
		test(globalOptions.update(), document.getText());
	}));

	context.subscriptions.push(vscode.commands.registerCommand('extension.markdown-extrajs.export.pdf', async () => {
		console.log("export pdf.");
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found');
			return;
		}

		const document = editor.document;
		const filePath = document.uri.fsPath;
		const pdfPath = filePath.replace(/\.md$/, '.pdf');
		try {
			await vscode.workspace.fs.stat(vscode.Uri.file(pdfPath));
			const overwrite = await vscode.window.showWarningMessage(
				`The file ${vscode.Uri.file(pdfPath).path.split('/').pop()} already exists. Do you want to overwrite it?`,
				'Yes', 'No'
			);
			if (overwrite !== 'Yes') {
				return;
			}
		} catch (err: any) {
			if (err?.name !== 'FileNotFound') {
				vscode.window.showErrorMessage(`Error checking file: ${err?.message}`);
				return;
			}
		}

		try {
			// const pdfPath = '/path/to/your/file.pdf';
			// const content = new TextEncoder().encode('Hello, VSCode! This is a sample content.');

			// await vscode.workspace.fs.writeFile(vscode.Uri.file(pdfPath), content);

			vscode.window.showInformationMessage(`File written successfully: ${pdfPath}`);
		} catch (err) {
			const error = err as Error;
			vscode.window.showErrorMessage(`Error writing file: ${error.message}`);
		}
	}));

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
