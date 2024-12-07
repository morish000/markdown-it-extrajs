// @deno-types="@types/markdown-it"
import MarkdownIt from "markdown-it";
import extraJsPlugin from "./src/index.ts";

const md = new MarkdownIt();
md.use(extraJsPlugin, {
  discardFrontMatter: true,
  useMermaid: true,
  useFontAwesome: true,
  useUnoCSS: true,
  outputScriptTag: true,
});

const markdownContent = `---
extrajs:
  useMermaid: true
  useFontAwesome: true
  useUnoCSS: true
  rules: []
  presetWind: null
  presetMini: null
  presetIcons:
    extraProperties:
      display: inline-block
  presetAttributify:
    prefix: "un-"
    prefixedOnly: true
  presetTypography: null
  presetWebFonts: null
  presetTagify: null
  presetRemToPx: false
---

# Title
`;

const result = md.render(markdownContent);
console.log(result);
