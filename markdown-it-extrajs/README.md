# MarkdownIt Extra JS Plugin

This project is currently under development. It is not yet ready for official
release, and the functionality or API may change.

# Overview

This project is designed to enable JavaScript for [UnoCSS](https://unocss.dev/),
[Mermaid](https://mermaid.js.org/), and [Font Awesome](https://fontawesome.com/)
in Markdown and Marp.

For detailed documentation and updates, please refer to the documentation at
[vscode-markdown-extrajs](https://github.com/morish000/markdown-it-extrajs/blob/main/vscode-markdown-extrajs/README.md).

# Utilities

This module includes utility plugins for markdown-it. These plugins are intended
solely for outputting tags, and it is assumed that they will be used in
combination with
[markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs).

## block-tag-plugin

src:

```typescript
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import blockTagPlugin from "@morish000/markdown-it-extrajs/block-tag-plugin";

const md = new MarkdownIt();
md
  .use(blockTagPlugin, "test-div", { tag: "div", marker: ":", markerCount: 3 })
  .use(blockTagPlugin, "test-pre", {
    tag: "pre",
    marker: "[",
    endMarker: "]",
    markerCount: 3,
  })
  .use(markdownItAttrs);

console.log(md.render(`::: test-div {#sample1 .class1-a .class1-b}
example.
:::`));

console.log(md.render(`[[[ test-pre {#sample2 .class2-a .class2-b}
example.
]]]`));
```

output:

```html
<div data-block-tag-name="test-div" id="sample1" class="class1-a class1-b">
<p>example.</p>
</div>

<pre data-block-tag-name="test-pre" id="sample2" class="class2-a class2-b">
example.
</pre>
```

## inline-tag-plugin

src:

```typescript
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import inlineTagPlugin from "@morish000/markdown-it-extrajs/inline-tag-plugin";

const md = new MarkdownIt();
md.use(inlineTagPlugin, "test-span", {
  tag: "span",
  marker: "=",
  endMarker: "=",
  markerCount: 2,
}).use(markdownItAttrs);

console.log(md.render("This is a ==test=={.class1-a .class1-b}."));
```

output:

```html
<p>This is a <span data-inline-tag-name="test-span" class="class1-a class1-b">test</span>.</p>
```

## void-tag-plugin

src:

```typescript
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import voidTagPlugin from "@morish000/markdown-it-extrajs/void-tag-plugin";

const md = new MarkdownIt();
md.use(voidTagPlugin, "test-br", {
  tag: "br",
  marker: "$",
  isVoidElement: true,
  markerCount: 2,
})
  .use(voidTagPlugin, "test-i", {
    tag: "i",
    marker: "@",
    isVoidElement: false,
    markerCount: 2,
  })
  .use(markdownItAttrs);

console.log(md.render("123$$!456"));
console.log(md.render("Icon: @@!{.icon1 .icon2} test."));
```

output:

```html
<p>123<br data-void-tag-name="test-br">456</p>

<p>Icon: <i data-void-tag-name="test-i" class="icon1 icon2"></i> test.</p>
```

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
