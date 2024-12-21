import * as vscode from 'vscode';
import path from 'path';
import extraJsPlugin, { type ExtraJSOptions, ExtraJSFrontMatter } from "@morish000/markdown-it-extrajs";
import { createScriptTag } from "@morish000/markdown-it-extrajs/create-tags";
import grayMatter from "gray-matter";
import { Marp } from "@marp-team/marp-core";
import { createHtml } from "./export-html.js";

export const createMarpExportContent = (
  options: ExtraJSOptions,
  frontMatter: {
    estrajs: ExtraJSFrontMatter;[key: string]: any
  },
  markdown: string): string => {

  return grayMatter.stringify(
    createMarp(
      {
        ...options,
        outputScriptTag: true
      },
      frontMatter.extrajs ?? {},
      markdown),
    {
      ...Object.fromEntries(Object.entries(frontMatter).filter(([key]) => key !== 'extrajs'))
    });
};

const createMarp = (
  options: ExtraJSOptions,
  frontMatter: { [key: string]: any },
  markdonwContent: string) =>
  `${markdonwContent}

  ${createScriptTag(options, frontMatter)}
  `;

const loadThemes = async (marp: Marp) => {
  const config = vscode.workspace.getConfiguration('markdown');
  const marpThemes: string[] = config.get('marp.themes', []);
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    throw new Error('No workspace folders found');
  }

  await Promise.all(marpThemes.map(async (themePath) => {
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    const absolutePath = path.isAbsolute(themePath)
      ? themePath
      : path.join(workspaceRoot, themePath);
    const fileUri = vscode.Uri.file(absolutePath);

    try {
      const fileData = await vscode.workspace.fs.readFile(fileUri);
      const themeContent = Buffer.from(fileData).toString('utf8');
      marp.themeSet.add(themeContent);
    } catch (error) {
      console.error(`Error reading file from path ${absolutePath}`, error);
    }
  }));
};

export const createMarpHtmlExportContent = async (
  options: ExtraJSOptions,
  lang: string,
  sourceFileName: string,
  source: string,
  frontMatter: {
    estrajs: ExtraJSFrontMatter;[key: string]: any
  }) => {
  const marp = new Marp({ html: true });
  marp.use(extraJsPlugin, {
    ...options,
    outputScriptTag: true
  });
  await loadThemes(marp);

  const { html, css } = marp.render(source);

  return createHtml(
    {
      lang,
      title: frontMatter.title ? frontMatter.title : sourceFileName,
      css: [css],
      body: html,
    }
  );
};
