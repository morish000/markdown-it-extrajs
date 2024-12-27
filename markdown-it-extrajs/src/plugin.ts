import type MarkdownIt from "markdown-it";
import markdownItFrontMatter from "markdown-it-front-matter";
import grayMatter from "gray-matter";
import { createScriptTag, createTemplateTag } from "./create-tags.js";
import { defaultOptions } from "./types.js";
import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.js";

export function extraJsPlugin(md: MarkdownIt, userOptions: ExtraJSOptions) {
  const { renderer: { render }, parse } = md;

  let frontMatter: ExtraJSFrontMatter = {};

  if (userOptions.discardFrontMatter) {
    md.use(markdownItFrontMatter, (_fm: string) => {
      // Discard front matter
    });
  }

  md.parse = (markdown: string, env) => {
    frontMatter = grayMatter(markdown).data.extrajs ?? {};
    return parse.call(md, markdown, env);
  };

  md.renderer.render = function (
    ...args
  ) {
    const options: ExtraJSOptions = {
      ...defaultOptions,
      ...userOptions,
      ...(!frontMatter.useMermaid ? { useMermaid: false } : {}),
      ...(!frontMatter.useFontAwesome ? { useFontAwesome: false } : {}),
      ...(!frontMatter.useUnoCSS ? { useUnoCSS: false } : {}),
    };

    return render.apply(md.renderer, args) +
      createTemplateTag(options, frontMatter) +
      createScriptTag(options, frontMatter);
  };
}

export default extraJsPlugin;
