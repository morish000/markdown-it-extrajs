import MarkdownIt from "markdown-it";
import extraJsPlugin from "./dist/index.mjs";

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
    autoInstall: true
    extraProperties:
      display: inline-block
  presetAttributify:
    prefix: "un-"
    prefixedOnly: true
    ignoreAttributes:
      - style
  presetTypography: null
  presetWebFonts: null
  presetTagify: null
  presetRemToPx: false
---

# Title
`;

const result = md.render(markdownContent);
console.log(result);
