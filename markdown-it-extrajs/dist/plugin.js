import markdownItFrontMatter from "markdown-it-front-matter";
import grayMatter from "gray-matter";
import { createScriptTag, createTemplateTag } from "./create-tags.js";
import { defaultOptions } from "./types.js";
function extraJsPlugin(md, userOptions) {
  const { renderer: { render }, parse } = md;
  let frontMatter = {};
  if (userOptions.discardFrontMatter) {
    md.use(markdownItFrontMatter, (_fm) => {
    });
  }
  md.parse = (markdown, env) => {
    frontMatter = grayMatter(markdown).data.extrajs ?? {};
    return parse.call(md, markdown, env);
  };
  md.renderer.render = function(...args) {
    const options = {
      ...defaultOptions,
      ...userOptions,
      ...!frontMatter.useMermaid ? { useMermaid: false } : {},
      ...!frontMatter.useFontAwesome ? { useFontAwesome: false } : {},
      ...!frontMatter.useUnoCSS ? { useUnoCSS: false } : {}
    };
    return render.apply(md.renderer, args) + createTemplateTag(options, frontMatter) + createScriptTag(options, frontMatter);
  };
}
var plugin_default = extraJsPlugin;
export {
  plugin_default as default,
  extraJsPlugin
};
//# sourceMappingURL=plugin.js.map
