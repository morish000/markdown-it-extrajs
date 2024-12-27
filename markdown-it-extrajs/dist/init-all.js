import { initMermaid } from "./init-mermaid.js";
import { initFontAwesome } from "./init-font-awesome.js";
import { initUnoCSS } from "./init-uno-css.js";
const initAll = async (options = {}, frontMatter = {}) => {
  const tasks = [];
  options.useMermaid && tasks.push(initMermaid(options, frontMatter));
  options.useFontAwesome && tasks.push(initFontAwesome(options, frontMatter));
  options.useUnoCSS && tasks.push(initUnoCSS(options, frontMatter));
  tasks.length > 0 && await Promise.all(tasks);
};
export {
  initAll
};
//# sourceMappingURL=init-all.js.map
