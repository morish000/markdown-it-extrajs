// @deno-types="@types/markdown-it"
import type MarkdownIt from "markdown-it";
import frontMatter from "markdown-it-front-matter";
import grayMatter from "gray-matter";
import { createScriptTag, createTemplateTag } from "./create-tags.ts";
import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";

const defaultExtraJSOptions: ExtraJSOptions = {
  discardFrontMatter: true,
  useMermaid: false,
  mermaidUrl: "https://esm.sh/mermaid",
  useFontAwesome: false,
  fontAwesomeUrl: "https://esm.sh/@fortawesome",
  useUnoCSS: false,
  unoCSSUrl: "https://esm.sh/@unocss",
  unoCSSPresetIconCDN: "https://esm.sh/",
  outputScriptTag: true,
};

export function extraJsPlugin(md: MarkdownIt, userOptions: ExtraJSOptions) {
  let extraJsFrontMatter: ExtraJSFrontMatter = {};

  if (userOptions.discardFrontMatter) {
    md.use(frontMatter, (_fm: string) => {
      // Discard front matter
    });
  }

  md.core.ruler.push(
    "front_matter_to_env_for_estrajs",
    (state) => {
      extraJsFrontMatter = grayMatter(state.src).data.extrajs ?? {};
    },
  );

  const originalRender = md.renderer.render;
  md.renderer.render = function (
    ...args
  ) {
    const conf: ExtraJSFrontMatter = extraJsFrontMatter
      ? { ...extraJsFrontMatter }
      : {};
    const extrajsOptions: ExtraJSOptions = {
      ...defaultExtraJSOptions,
      ...userOptions,
      ...(conf.disableMermaid ? { useMermaid: false } : {}),
      ...(conf.disableFontAwesome ? { useFontAwesome: false } : {}),
      ...(conf.disableUnoCSS ? { useUnoCSS: false } : {}),
    };

    return originalRender.apply(md.renderer, args) +
      createTemplateTag(extrajsOptions, conf) +
      createScriptTag(extrajsOptions);
  };
}

export default extraJsPlugin;
