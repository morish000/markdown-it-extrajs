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
  const { renderer: { render }, parse } = md;

  let extraJsFrontMatter: ExtraJSFrontMatter = {};

  if (userOptions.discardFrontMatter) {
    md.use(frontMatter, (_fm: string) => {
      // Discard front matter
    });
  }

  md.parse = (markdown: string, env) => {
    extraJsFrontMatter = grayMatter(markdown).data.extrajs ?? {};
    return parse.call(md, markdown, env);
  };

  md.renderer.render = function (
    ...args
  ) {
    const conf: ExtraJSFrontMatter = extraJsFrontMatter
      ? { ...extraJsFrontMatter }
      : {};
    const extrajsOptions: ExtraJSOptions = {
      ...defaultExtraJSOptions,
      ...userOptions,
      ...(!conf.useMermaid ? { useMermaid: false } : {}),
      ...(!conf.useFontAwesome ? { useFontAwesome: false } : {}),
      ...(!conf.useUnoCSS ? { useUnoCSS: false } : {}),
    };

    return render.apply(md.renderer, args) +
      createTemplateTag(extrajsOptions, conf) +
      createScriptTag(extrajsOptions);
  };
}

export default extraJsPlugin;
