import * as vscode from 'vscode';
import extraJsPlugin, { ExtraJSOptions } from "@morish000/markdown-it-extrajs";
import MarkdownIt from "markdown-it";
import { createScriptTag } from "@morish000/markdown-it-extrajs/create-tags";
import grayMatter from "gray-matter";
import css from "css";

export const createExportContent = async (options: ExtraJSOptions, lang: string, sourceFileName: string, markdown: string): Promise<{ marp: boolean, content: string }> => {
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
    return {
      marp: false,
      content: createHtml({
        lang,
        title: frontMatter.title ? frontMatter.title : sourceFileName,
        body: convertMarkdownToHtml(options, markdown),
        ...(await createCss())
      })
    };
  }
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

/*
TODO: katex not support.
- markdown.math.enabled
  - @vscode/markdown-it-katex
  - https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css
*/
const convertMarkdownToHtml = (options: ExtraJSOptions, markdown: string) => {
  const md = new MarkdownIt({ html: true });
  md.use(extraJsPlugin, {
    ...options,
    ...{
      discardFrontMatter: true,
      outputScriptTag: true
    }
  });
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
        cssLink.push(style);
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
