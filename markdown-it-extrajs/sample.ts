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
  presetIcons:
    extraProperties:
      display: inline-block
  presetAttributify:
    prefix: "un-"
    prefixedOnly: true
  rules:
    -
      - text-box-1
      - font-size: 48px
        color: white
        background-color: black
        padding: 50px
        border-radius: 16px
    -
      - text-box-2
      - font-size: 48px
        color: red
        background-color: yellow
        padding: 50px
        border-radius: 16px
---

# Title
`;

const result = md.render(markdownContent);
console.log(result);
