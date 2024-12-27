import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import extraJsPlugin from "./src/index.ts";
import inlineTagPlugin from "./src/inline-tag-plugin.ts";
import blockTagPlugin from "./src/block-tag-plugin.ts";
import voidTagPlugin from "./src/void-tag-plugin.ts";

const md = new MarkdownIt();
md
  .use(blockTagPlugin, "div", { tag: "div", marker: ":", markerCount: 3 })
  .use(blockTagPlugin, "pre", {
    tag: "pre",
    marker: "[",
    endMarker: "]",
    markerCount: 3,
  })
  .use(inlineTagPlugin, "span", {
    tag: "span",
    marker: "=",
    endMarker: "=",
    markerCount: 2,
  })
  .use(voidTagPlugin, "br", {
    tag: "br",
    marker: "$",
    isVoidElement: true,
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
    discardFrontMatter: true,
    useMermaid: true,
    useFontAwesome: true,
    useUnoCSS: true,
    outputScriptTag: false,
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

# Title {#title}

::: sample1 {#sample1 .class1a .class1b}

**div block test.**

::: sample2 {#sample2 .class2a .class2b}

nest

:::

:::

::: sample3 {#sample3 .class3a .class3b}

**div block test.**

::: sample4 {#sample4 .class4a .class4b}

nest1

::: sample5 {#sample5 .class5a .class5b}

next2

:::

next3

:::

next4

:::

[[[ mermaid {.mermaid .xyz}

pre block test.

]]]

::: preTest

[[[ mermaid2 {.mermaid .abc}

pre block test2.

]]]

:::

inline ====text1=={.red .bold}== test1.
======text2======{.brue .itaric} test2.

![alt text](image.png){.test1 .test2}

test$$!$$!test

test@@!{.icon1 .icon2}@@!{.icon3 .icon4}test
`;

const result = md.render(markdownContent);
console.log(result);
