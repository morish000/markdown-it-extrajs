import { Marp } from "@marp-team/marp-core";
import fs from "fs";
import markdownItAttrs from "markdown-it-attrs";
import extraJsPlugin from "@morish000/markdown-it-extrajs";
import inlineTagPlugin from "@morish000/markdown-it-extrajs/inline-tag-plugin";
import blockTagPlugin from "@morish000/markdown-it-extrajs/block-tag-plugin";
import voidTagPlugin from "@morish000/markdown-it-extrajs/void-tag-plugin";

const marp = new Marp({ html: false });
marp.use(blockTagPlugin, "div", { tag: "div", marker: ":", markerCount: 3 })
  .use(blockTagPlugin, "pre", {
    tag: "pre",
    marker: "[",
    endMarker: "]",
    markerCount: 3,
  })
  .use(inlineTagPlugin, "span", {
    tag: "span",
    marker: "[",
    endMarker: "]",
    markerCount: 2,
  })
  .use(voidTagPlugin, "i", {
    tag: "i",
    marker: "@",
    isVoidElement: false,
    markerCount: 2,
  })
  .use(markdownItAttrs)
  .use(extraJsPlugin, {
    discardFrontMatter: false,
    useMermaid: true,
    useFontAwesome: true,
    useUnoCSS: true,
    outputScriptTag: true,
  });

const markdown = fs.readFileSync('./sample-nohtml.md', 'utf8');

const { html, css } = marp.render(markdown);

const output = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marp Presentation</title>
  <style>${css}</style>
</head>
<body>
  ${html}
</body>
</html>`;

fs.writeFileSync('./dist/sample_marp-core-nohtml.html', output);
