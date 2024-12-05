import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";
import type {
  IconDefinition,
  IconPack,
} from "@fortawesome/fontawesome-svg-core";

const extractIcons = (
  iconSet: Record<string, IconPack | IconDefinition | string>,
) => {
  return Object.entries(iconSet)
    .filter(([key, value]) =>
      key !== "prefix" && key !== "default" && typeof value !== "string"
    )
    .map(([, value]) => value);
};

export default async (
  options: ExtraJSOptions = {},
  _frontMatter: ExtraJSFrontMatter = {},
  _conf: ExtraJSFrontMatter = {},
) => {
  try {
    const [
      fontawesomeSvgCore,
      freeSolidSvgIcons,
      freeRegularSvgIcons,
      freeBrandsSvgIcons,
    ] = await Promise.all([
      import(options.fontAwesomeUrl + "/fontawesome-svg-core"),
      import(options.fontAwesomeUrl + "/free-solid-svg-icons"),
      import(options.fontAwesomeUrl + "/free-regular-svg-icons"),
      import(options.fontAwesomeUrl + "/free-brands-svg-icons"),
    ]);

    const icons = [
      ...extractIcons(freeSolidSvgIcons),
      ...extractIcons(freeRegularSvgIcons),
      ...extractIcons(freeBrandsSvgIcons),
    ];

    fontawesomeSvgCore.config.autoAddCss = false;
    fontawesomeSvgCore.library.add(...icons);
    fontawesomeSvgCore.dom.i2svg();
    fontawesomeSvgCore.dom.watch();

    if (!document.getElementById("extrajs-fontawesome")) {
      const styleElement = document.createElement("style");
      styleElement.id = "extrajs-fontawesome";
      styleElement.textContent = fontawesomeSvgCore.dom.css();
      document.head.appendChild(styleElement);
      const observer = new MutationObserver(() => {
        if (styleElement && styleElement.textContent === "") {
          styleElement.textContent = fontawesomeSvgCore.dom.css();
        }
      });
      observer.observe(styleElement, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    }
  } catch (error) {
    throw error;
  }
};
