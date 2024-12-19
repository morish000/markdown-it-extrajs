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
  presetTagify:
    prefix: "un-"
  rules:
    -
      - text-box-1
      - display: 'block'
        font-size: 48px
        color: white
        background-color: black
        padding: 50px
        border-radius: 16px
    -
      - text-box-2
      - display: block
        font-size: 48px
        color: red
        background-color: yellow
        padding: 50px
        border-radius: 16px
    -
      - red
      - display: inline
        color: red
    -
      - blue
      - display: inline
        color: blue
    -
      - danger
      - display: inline
        color: red
        font-weight: bold
    -
      - warning
      - display: inline
        color: blue
        font-weight: bold
    -
      - /^m-(.+)px-sample$/
      - margin: \${m}px
    -
      - /^p-(.+)px-sample$/
      - padding: \${m}px
    -
      - /^p-(\\d+)m-(\\d+)px$/
      - padding: \${m[1]}px
        margin: \${m[2]}px
  preflightStyle: |
    div.preflight-g {
      color: green;
    }
    div.preflight-y {
      color: yellow;
    }
---

# Title
`;

const result = md.render(markdownContent);
console.log(result);
