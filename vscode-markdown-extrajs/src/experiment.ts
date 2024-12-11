import MarkdownIt from "markdown-it";
import extraJsPlugin, { type ExtraJSOptions } from "@morish000/markdown-it-extrajs";
import grayMatter from "gray-matter";
import css from "css";

export const test = (options: ExtraJSOptions, markdown: string): string => {
    const frontMatter = grayMatter(markdown).data.extrajs ?? {};
    const md = new MarkdownIt();
    md.use(extraJsPlugin, {
        ...options,
        outputScriptTag: true,
    });

    const result = md.render(markdown);

    console.log(markdown);
    console.log(frontMatter);
    console.log(result);
    return result;
};

/*
CSSを探す：
- markdown.style or デフォルト
  - markdown.styles
  - https://code.visualstudio.com/Docs/languages/markdown#_using-your-own-css
  - https://cdn.jsdelivr.net/gh/microsoft/vscode/extensions/markdown-language-features/media/markdown.css
- marpの場合はthemeディレクトリ
  - markdown.marp.themes
*/
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

const template = (lang: string, title: string, css: string, html: string) => `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>${css}</style>
</head>
<body>
    ${html}
</body>
</html>`;