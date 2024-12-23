import * as vscode from 'vscode';
import { installLatestChromium, uninstallOldChromium } from "../exports/export-pdf-puppeteer.js";
import type { GlobalOptions } from "../global-options.js";

export const create = (globalOptions: GlobalOptions): [string, () => Promise<void>, any] => [
  'extension.markdown-extrajs.install-chromium-for-puppeteer',
  async () => {
    const config = vscode.workspace.getConfiguration('markdownExtraJS');
    await installLatestChromium(globalOptions.globalStorageUri);
    if (config.get<boolean>('puppeteer.uninstallOldChromium', true)) {
      await uninstallOldChromium(globalOptions.globalStorageUri);
    }
  },
  undefined
];
