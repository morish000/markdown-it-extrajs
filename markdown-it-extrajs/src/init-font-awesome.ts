import type {
  Config,
  IconDefinition,
  IconPack,
} from "@fortawesome/fontawesome-svg-core";
import type {
  ExtraJSFrontMatter,
  ExtraJSOptions,
  InitFunctionType,
} from "./types.js";

export const initFontAwesome: InitFunctionType = async (
  options: ExtraJSOptions = {},
  frontMatter: ExtraJSFrontMatter = {},
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

    const extractIcons = (
      iconSet: Record<string, IconPack | IconDefinition | string>,
    ) => {
      return Object.entries(iconSet)
        .filter(([key, value]) =>
          key !== "prefix" && key !== "default" && typeof value !== "string"
        )
        .map(([, value]) => value);
    };

    const icons = [
      ...extractIcons(freeSolidSvgIcons),
      ...extractIcons(freeRegularSvgIcons),
      ...extractIcons(freeBrandsSvgIcons),
    ];

    ([
      "familyPrefix",
      "cssPrefix",
      "styleDefault",
      "familyDefault",
      "replacementClass",
      "autoReplaceSvg",
      "autoA11y",
      "searchPseudoElements",
      "keepOriginalSource",
      "measurePerformance",
      "mutateApproach",
      "showMissingIcons",
    ] as (keyof Config)[]).forEach((key) =>
      frontMatter.fontAwesomeConfig?.[key] &&
      (fontawesomeSvgCore.config[key] = frontMatter.fontAwesomeConfig[key])
    );

    fontawesomeSvgCore.config.observeMutations = false;
    fontawesomeSvgCore.config.autoAddCss = false;
    fontawesomeSvgCore.library.add(...icons);
    fontawesomeSvgCore.dom.i2svg();

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
