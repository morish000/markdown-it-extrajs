import markdownItAttrs from "markdown-it-attrs";
import extraJsPlugin from "@morish000/markdown-it-extrajs";
import inlineTagPlugin from "@morish000/markdown-it-extrajs/inline-tag-plugin";
import blockTagPlugin from "@morish000/markdown-it-extrajs/block-tag-plugin";
import voidTagPlugin from "@morish000/markdown-it-extrajs/void-tag-plugin";

export default ({ marp }) => {
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
  return marp;
};
