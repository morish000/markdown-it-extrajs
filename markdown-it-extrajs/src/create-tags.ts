import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";
import SRC_BASE64 from "./base64js.ts";

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
  await initAll(
    ${JSON.stringify(options)},
    ${JSON.stringify(frontMatter)}
  );
</script>`
    : "";
