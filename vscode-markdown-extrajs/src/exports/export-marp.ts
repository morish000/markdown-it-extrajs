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

export const createMarpHtmlExportContent = (
  options: ExtraJSOptions,
  lang: string,
  sourceFileName: string,
  sourceDir: string | undefined,
  source: string,
  frontMatter: {
    estrajs: ExtraJSFrontMatter;[key: string]: any
  }) => {
  const marp = new Marp({ html: true });
  marp.use(extraJsPlugin, {
    ...options,
    outputScriptTag: true
  });

  const { html, css } = marp.render(source);

  return createHtml(
    {
      lang,
      base: sourceDir,
      title: frontMatter.title ? frontMatter.title : sourceFileName,
      css: [css],
      body: html,
    }
  );
};
