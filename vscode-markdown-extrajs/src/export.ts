import * as vscode from 'vscode';
import extraJsPlugin, { ExtraJSOptions } from "@morish000/markdown-it-extrajs";
import MarkdownIt from "markdown-it";
import { createScriptTag, escapeForHTML } from "@morish000/markdown-it-extrajs/create-tags";
import grayMatter from "gray-matter";
import css from "css";
import markdownKatex from "@vscode/markdown-it-katex";
import { chromium } from "playwright-chromium";

export const createExportContent = async (
  options: ExtraJSOptions,
  lang: string,
  sourceFileName: string,
  markdown: string): Promise<{ marp: boolean, content: string }> => {
  const grayMatterFile = grayMatter(markdown);
  const frontMatter = grayMatterFile.data ?? {};
  const markdwonContent = grayMatterFile.content ?? "";

  if (frontMatter.marp) {
    return {
      marp: true,
      content: grayMatter.stringify(
        createMarp(
          {
            ...options,
            outputScriptTag: true
          },
          frontMatter.extrajs ?? {},
          markdwonContent),
        {
          ...Object.fromEntries(Object.entries(frontMatter).filter(([key]) => key !== 'extrajs'))
        })
    };
  } else {
    const exportContent = {
      marp: false,
      content: createHtml({
        lang,
        title: frontMatter.title ? frontMatter.title : sourceFileName,
        body: convertMarkdownToHtml(options, markdown),
        ...(await createCss())
      })
    };

    return exportContent;
  }
};

export const exportPDF = async (
  exportContent: string,
  exportpath: string,
  exportSize: string,
  headless: boolean,
  timeout: number,
  globalStorageUri: vscode.Uri) => {

  const cacheDir = await createCacheDirectoryIfNotExists(globalStorageUri);
  const browser = await chromium.launchPersistentContext(
    cacheDir, { headless });

  const page = await browser.newPage();
  await page.setContent(exportContent, { timeout, waitUntil: 'networkidle' });
  await page.pdf({
    path: exportpath,
    format: exportSize,
    preferCSSPageSize: true,
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
  });

  await browser.close();
};

const createMarp = (options: ExtraJSOptions, frontMatter: { [key: string]: any }, markdonwContent: string) =>
  `${markdonwContent}

${createScriptTag(options, frontMatter)}
`;

const createHtml = ({
  lang = "",
  title = "",
  cssLink = [],
  css = [],
  body = ""
}: {
  lang?: string, title?: string, cssLink?: string[], css?: string[], body?: string
}) => `<!DOCTYPE html>
<html${(lang && /^[a-z]{2}(-[A-Z]{2})?$/.test(lang)) ? ` lang="${lang}"` : ""}>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    ${cssLink.map(link => `<link rel="stylesheet" href="${link}">`).join('\n')}
    ${css.map(style => `<style>${style}</style>`).join('\n')}
</head>
<body>
    ${body}
</body>
</html>`;

const convertMarkdownToHtml = (options: ExtraJSOptions, markdown: string) => {
  const md = new MarkdownIt({ html: true });
  md.use(extraJsPlugin, {
    ...options,
    ...{
      discardFrontMatter: true,
      outputScriptTag: true
    }
  });
  if (vscode.workspace.getConfiguration('markdown').get('math.enabled', true)) {
    md.use(markdownKatex.default);
  }
  return md.render(markdown);
};

const createCss = async (): Promise<{ cssLink?: string[], css?: string[] }> => {
  const cssLink: string[] = [];
  const css: string[] = [];

  const config = vscode.workspace.getConfiguration('markdown');
  const styles = config.get<string[]>('styles') || [];

  if (styles.length > 0) {
    for (const style of styles) {
      if (style.startsWith('https')) {
        cssLink.push(escapeForHTML(style));
      } else {
        try {
          const uri = vscode.Uri.file(style);
          const fileContent = await vscode.workspace.fs.readFile(uri);
          const cssContent = Buffer.from(fileContent).toString('utf-8');
          css.push(sanitizeCSS(cssContent));
        } catch (error) {
          console.error(`Error reading CSS file: ${style}`, error);
        }
      }
    }
  } else {
    cssLink.push("https://cdn.jsdelivr.net/gh/microsoft/vscode/extensions/markdown-language-features/media/markdown.css");
  }
  if (config.get('math.enabled', true)) {
    cssLink.push("https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css");
  }

  return {
    cssLink,
    css
  };
};

const sanitizeCSS = (rawCSS: string) => {
  const ast = css.parse(rawCSS);
  ast.stylesheet?.rules.forEach(rule => {
    if (rule.type === 'rule') {
      rule.declarations = rule.declarations?.map(declaration => {
        if (declaration.type === 'declaration') {
          const value = declaration.value?.toLowerCase() ?? "";
          if (value.includes('javascript:')) {
            return {
              type: 'comment',
              comment: `${declaration.property}: ${declaration.value};`
            };
          }
        }
        return declaration;
      });
    }
  });
  return css.stringify(ast);
};

const createCacheDirectoryIfNotExists = async (globalStorageUri: vscode.Uri) => {
  const cacheUri = vscode.Uri.joinPath(globalStorageUri, '.playwright', 'browser-chromium');
  try {
    await vscode.workspace.fs.stat(cacheUri);
  } catch (e) {
    await vscode.workspace.fs.createDirectory(cacheUri);
    vscode.window.showInformationMessage(`Directory created: ${cacheUri.fsPath}`);
  }
  return cacheUri.fsPath;
};
