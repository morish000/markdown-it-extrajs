import * as vscode from 'vscode';
import path from 'path';

export const selectFile = async (initialPath: string, dirPath: string): Promise<string> => {
  let outputPath = initialPath;
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
        return "";
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
      return "";
    }
  }
  return outputPath;
};
