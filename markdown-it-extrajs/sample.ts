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

<h1>h1 tag escape.</h1>
# Title
`;

const result = md.render(markdownContent);
console.log(result);
