import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";
import SRC_BASE64 from "./base64js.ts";

export const escapeScriptClosingTags = (str: string): string => {
  return str.replace(/<\/script>/gi, function (match) {
    return "<\\/" + match.slice(2);
  });
};

export const escapeForHTML = (str: string): string => {
  return str.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return match;
    }
  });
};

export const createTemplateTag = (
  options: ExtraJSOptions,
  frontMatter: ExtraJSFrontMatter,
): string =>
  (options.useMermaid || options.useFontAwesome ||
      options.useUnoCSS)
    ? `
<template
  id="extrajs"
  ${`data-extrajs-options="${btoa(JSON.stringify(options))}"`}
  ${`data-extrajs-frontMatter="${btoa(JSON.stringify(frontMatter))}"`}>
</template>`
    : "";

export const createScriptTag = (
  options: ExtraJSOptions,
  frontMatter: ExtraJSFrontMatter,
): string =>
  (options.useMermaid || options.useFontAwesome ||
      options.useUnoCSS) && options.outputScriptTag
    ? `
<script type="module">
  const { initAll } = await import("data:text/javascript;base64,${SRC_BASE64.INIT_ALL}");
  const options = ${escapeScriptClosingTags(JSON.stringify(options))};
  const frontMatter = ${escapeScriptClosingTags(JSON.stringify(frontMatter))};
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll(options, frontMatter));
  } else {
    await initAll(options, frontMatter);
  }
</script>`
    : "";
