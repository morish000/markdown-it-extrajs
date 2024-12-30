import * as vscode from 'vscode';
import path from 'path';
import extraJsPlugin, { type ExtraJSOptions, ExtraJSFrontMatter } from "@morish000/markdown-it-extrajs";
import { createScriptTag } from "@morish000/markdown-it-extrajs/create-tags";
import grayMatter from "gray-matter";
import { Marp } from "@marp-team/marp-core";
import { createHtml } from "./export-html.js";
import { noHTMLPluginForMarp } from "../no-html-feature.js";

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
  useNoHTMLFeatuer: boolean,
  lang: string,
  sourceFileName: string,
  source: string,
  frontMatter: {
    estrajs: ExtraJSFrontMatter;[key: string]: any
  }) => {
  const marp = new Marp({ html: true });
  (useNoHTMLFeatuer ? noHTMLPluginForMarp(marp) : marp)
    .use(extraJsPlugin, {
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

export const createMarpSlideHtmlExportContent = async (
  options: ExtraJSOptions,
  useNoHTMLFeatuer: boolean,
  lang: string,
  sourceFileName: string,
  source: string,
  frontMatter: {
    estrajs: ExtraJSFrontMatter;[key: string]: any
  }) => {
  const marp = new Marp({ html: true });
  (useNoHTMLFeatuer ? noHTMLPluginForMarp(marp) : marp)
    .use(extraJsPlugin, {
      ...options,
      outputScriptTag: true
    });
  await loadThemes(marp);

  const { html, css } = marp.render(source);

  return createHtml(
    {
      lang,
      title: frontMatter.title ? frontMatter.title : sourceFileName,
      css: [slideCss, css],
      body: html + slideScript,
    }
  );
};

const slideCss = `html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}
div.marpit {
  width: 100%;
  height: auto;
  max-height: 100%;
  margin: 0;
  padding: 0;
  background-color: black;
}
svg[data-marpit-svg] {
  display: none;
}`;

const slideScript = `<script>
  document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('div.marpit > svg[data-marpit-svg=""]');
    let currentSlide = 0;

    function showSlide(index) {
      sections.forEach((section, i) => {
        section.style.display = i === index ? 'block' : 'none';
      });
    }

    function nextSlide(allowLoop = false) {
      if (currentSlide < sections.length - 1) {
        currentSlide++;
      } else if (allowLoop) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    }

    function prevSlide() {
      if (currentSlide > 0) {
        currentSlide--;
      }
      showSlide(currentSlide);
    }

    function firstSlide() {
      currentSlide = 0;
      showSlide(currentSlide);
    }

    function lastSlide() {
      currentSlide = sections.length - 1;
      showSlide(currentSlide);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextSlide();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        prevSlide();
      } else if (event.key === 'PageUp' || event.key === 'Home') {
        firstSlide();
      } else if (event.key === 'PageDown' || event.key === 'End') {
        lastSlide();
      }
    });

    document.addEventListener('wheel', function (event) {
      if (event.deltaY > 0) {
        nextSlide();
      } else if (event.deltaY < 0) {
        prevSlide();
      }
    });

    document.addEventListener('click', function (event) {
      if (event.button === 0) {
        nextSlide(true);
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function (event) {
      touchStartX = event.changedTouches[0].screenX;
      touchStartY = event.changedTouches[0].screenY;
    });

    document.addEventListener('touchmove', function (event) {
      touchEndX = event.changedTouches[0].screenX;
      touchEndY = event.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function () {
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      } else if (touchStartY - touchEndY > 50) {
        nextSlide();
      } else if (touchEndY - touchStartY > 50) {
        prevSlide();
      }
    });

    showSlide(currentSlide);
  });
</script>
`;
