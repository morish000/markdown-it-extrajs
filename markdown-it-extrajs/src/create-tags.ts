import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";
import SRC_BASE64 from "./base64js.ts";

export const initAll = (
  extrajsOptions: ExtraJSOptions,
): string =>
  (extrajsOptions.useMermaid || extrajsOptions.useFontAwesome ||
      extrajsOptions.useUnoCSS)
    ? `
export default async (options = {}, frontMatter = {}, additionalSettings = {}) => {
  const tasks = [];
${
      extrajsOptions.useMermaid
        ? `
  const mermaidScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-mermaid-js');
  if (mermaidScript) {
    tasks.push(
      (async () => {
        const { default: initMermaid } = await import("data:text/javascript;base64," + mermaidScript);
        await initMermaid(options, frontMatter, additionalSettings);
      })()
    );
  }`
        : ""
    }
${
      extrajsOptions.useFontAwesome
        ? `
  const fontAwesomeScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-font-awesome');
  if (fontAwesomeScript) {
    tasks.push(
      (async () => {
        const { default: initFontAwesome } = await import("data:text/javascript;base64," + fontAwesomeScript);
        await initFontAwesome(options, frontMatter, additionalSettings);
      })()
    );
  }`
        : ""
    }
${
      extrajsOptions.useUnoCSS
        ? `
  const unoCSSScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-uno-css');
  if (unoCSSScript) {
    tasks.push(
      (async () => {
        const { default: initUnoCSS } = await import("data:text/javascript;base64," + unoCSSScript);
        await initUnoCSS(options, frontMatter, additionalSettings);
      })()
    );
  }`
        : ""
    }
  tasks.length > 0 && await Promise.all(tasks);
};`
    : "";

export const createTemplateTag = (
  extrajsOptions: ExtraJSOptions,
  frontMatter: ExtraJSFrontMatter,
): string =>
  (extrajsOptions.useMermaid || extrajsOptions.useFontAwesome ||
      extrajsOptions.useUnoCSS)
    ? `
<template
  id="extrajs"
${
      extrajsOptions.useMermaid
        ? `data-extrajs-mermaid-js="${SRC_BASE64.INIT_MERMAID}"`
        : ""
    }
${
      extrajsOptions.useFontAwesome
        ? `data-extrajs-font-awesome="${SRC_BASE64.INIT_FONT_AWESOME}"`
        : ""
    }
${
      extrajsOptions.useUnoCSS
        ? `data-extrajs-uno-css="${SRC_BASE64.INIT_UNO_CSS}"`
        : ""
    }
${`data-extrajs-init="${btoa(initAll(extrajsOptions))}"`}
${`data-extrajs-options="${
      btoa("export default" + JSON.stringify(extrajsOptions))
    }"`}
${`data-extrajs-frontMatter="${
      btoa("export default" + JSON.stringify(frontMatter))
    }"`}>
</template>`
    : "";

export const createScriptTag = (
  extrajsOptions: ExtraJSOptions,
  frontMatter: ExtraJSFrontMatter,
): string =>
  (extrajsOptions.useMermaid || extrajsOptions.useFontAwesome ||
      extrajsOptions.useUnoCSS) && extrajsOptions.outputScriptTag
    ? `
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const { default: init } = await import("data:text/javascript;base64," + initScript);
    await init(
      ${JSON.stringify(extrajsOptions)},
      ${JSON.stringify(frontMatter)},
      {}
    );
  }
</script>`
    : "";
