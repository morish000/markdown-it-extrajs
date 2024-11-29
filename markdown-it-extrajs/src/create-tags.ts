import initMermaid from "./init-mermaid.ts";
import initFontAwesome from "./init-font-asesome.ts";
import initUnoCSS from "./init-uno-css.ts";
import type { ExtraJSOptions, UnoCSSConfig } from "./types.ts";

export const initAll = (
  extrajsOptions: ExtraJSOptions,
): string =>
  (extrajsOptions.useMermaid || extrajsOptions.useFontAwesome ||
      extrajsOptions.useUnoCSS)
    ? `
export default async (_conf = {}) => {
  const tasks = [];
${
      extrajsOptions.useMermaid
        ? `
  const mermaidScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-mermaid-js');
  if (mermaidScript) {
    tasks.push(
      (async () => {
        const initMermaid = await import("data:text/javascript;base64," + mermaidScript);
        await initMermaid.default(_conf);
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
        const initFontAwesome = await import("data:text/javascript;base64," + fontAwesomeScript);
        await initFontAwesome.default(_conf);
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
        const initUnoCSS = await import("data:text/javascript;base64," + unoCSSScript);
        await initUnoCSS.default(_conf);
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
  conf: UnoCSSConfig,
): string =>
  (extrajsOptions.useMermaid || extrajsOptions.useFontAwesome ||
      extrajsOptions.useUnoCSS)
    ? `
<template
  id="extrajs"
${
      extrajsOptions.useMermaid
        ? `data-extrajs-mermaid-js="${
          btoa(initMermaid(extrajsOptions.mermaidUrl))
        }"`
        : ""
    }
${
      extrajsOptions.useFontAwesome
        ? `data-extrajs-font-awesome="${
          btoa(initFontAwesome(extrajsOptions.fontAwesomeUrl))
        }"`
        : ""
    }
${
      extrajsOptions.useUnoCSS
        ? `data-extrajs-uno-css="${
          btoa(
            initUnoCSS(
              extrajsOptions.unoCSSUrl,
              extrajsOptions.unoCSSPresetIconCDN,
              conf,
            ),
          )
        }"`
        : ""
    }
${`data-extrajs-init="${
      btoa(
        initAll(extrajsOptions),
      )
    }"`}>
</template>`
    : "";

export const createScriptTag = (
  extrajsOptions: ExtraJSOptions,
): string =>
  (extrajsOptions.useMermaid || extrajsOptions.useFontAwesome ||
      extrajsOptions.useUnoCSS) && extrajsOptions.outputScriptTag
    ? `
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
</script>`
    : "";
