import type {
  ExtraJSFrontMatter,
  ExtraJSOptions,
  InitFunctionType,
} from "./types.js";
import { initMermaid } from "./init-mermaid.js";
import { initFontAwesome } from "./init-font-awesome.js";
import { initUnoCSS } from "./init-uno-css.js";

export const initAll: InitFunctionType = async (
  options: ExtraJSOptions = {},
  frontMatter: ExtraJSFrontMatter = {},
) => {
  const tasks: Promise<void>[] = [];

  options.useMermaid && tasks.push(initMermaid(options, frontMatter));
  options.useFontAwesome && tasks.push(initFontAwesome(options, frontMatter));
  options.useUnoCSS && tasks.push(initUnoCSS(options, frontMatter));

  tasks.length > 0 && await Promise.all(tasks);
};
