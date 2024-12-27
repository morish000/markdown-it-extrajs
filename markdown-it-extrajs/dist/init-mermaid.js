import { dedent } from "ts-dedent";
import { nanoid } from "nanoid";
import { createIconLoader, getIcons } from "./iconify-json.js";
const initMermaid = async (options = {}, frontMatter = {}) => {
  const entityDecode = function(html) {
    const decoder = document.createElement("div");
    html = encodeURIComponent(html).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";");
    decoder.innerHTML = html;
    return decodeURIComponent(decoder.textContent);
  };
  if (options.mermaidUrl) {
    const { default: mermaid } = await import(options.mermaidUrl);
    if (options.mermaidElkUrl) {
      const { default: elkLayouts } = await import(options.mermaidElkUrl);
      mermaid.registerLayoutLoaders(elkLayouts);
    }
    const iconLoader = createIconLoader(options.iconifyJsonCDN);
    const icons = await getIcons(options.unoCSSUrl);
    const createMermaidIconLoaders = () => {
      const loaders = [];
      icons.forEach((key) => {
        loaders.push(
          {
            name: key,
            loader: iconLoader(key)
          }
        );
      });
      return loaders;
    };
    mermaid.registerIconPacks(createMermaidIconLoaders());
    mermaid.initialize({
      ...frontMatter.mermaidConfig ?? {},
      ...{ startOnLoad: false, suppressErrorRendering: true }
    });
    const renders = Array.from(document.querySelectorAll(".mermaid")).map(
      async (element) => {
        if (element.getAttribute("data-processed")) {
          return;
        }
        element.setAttribute("data-processed", "true");
        const graphDefinition = element.innerHTML;
        element.querySelectorAll("svg").forEach((svg) => svg.remove());
        if (graphDefinition) {
          const id = `mermaid-${nanoid()}`;
          const renderResult = await mermaid.render(
            id,
            dedent(entityDecode(graphDefinition)).trim().replace(/<br\s*\/?>/gi, "<br/>")
          );
          element.innerHTML = renderResult.svg;
          renderResult.bindFunctions?.(element);
        }
      }
    );
    const safeRenders = renders.map((p) => p.catch((e) => console.error(e)));
    await Promise.all(safeRenders);
  }
};
export {
  initMermaid
};
//# sourceMappingURL=init-mermaid.js.map
