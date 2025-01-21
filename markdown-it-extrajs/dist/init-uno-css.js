import { createIconLoader, getIcons } from "./iconify-json.js";
const initUnoCSS = async (options = {}, frontMatter = {}) => {
  const [
    { default: initUnocssRuntime },
    { default: initPresetWind },
    { default: initPresetMini },
    { default: initPresetUno },
    { default: initPresetIcons },
    { default: initPresetAttributify },
    { default: initPresetTypography },
    { default: initPresetWebFonts },
    { default: initPresetTagify },
    { default: initPresetRemToPx }
  ] = await Promise.all([
    import(options.unoCSSUrl + "/runtime"),
    frontMatter.presetWind ? import(options.unoCSSUrl + "/preset-wind") : Promise.resolve({}),
    !frontMatter.presetWind && frontMatter.presetMini ? import(options.unoCSSUrl + "/preset-mini") : Promise.resolve({}),
    !frontMatter.presetWind && !frontMatter.presetMini ? import(options.unoCSSUrl + "/preset-uno") : Promise.resolve({}),
    frontMatter.presetIcons ? import(options.unoCSSUrl + "/preset-icons/browser") : Promise.resolve({}),
    frontMatter.presetAttributify ? import(options.unoCSSUrl + "/preset-attributify") : Promise.resolve({}),
    frontMatter.presetTypography ? import(options.unoCSSUrl + "/preset-typography") : Promise.resolve({}),
    frontMatter.presetWebFonts ? import(options.unoCSSUrl + "/preset-web-fonts") : Promise.resolve({}),
    frontMatter.presetTagify ? import(options.unoCSSUrl + "/preset-tagify") : Promise.resolve({}),
    frontMatter.presetRemToPx ? import(options.unoCSSUrl + "/preset-rem-to-px") : Promise.resolve({})
  ]);
  const presets = [];
  if (frontMatter.presetWind) {
    presets.push(initPresetWind(frontMatter.presetWind));
  } else if (frontMatter.presetMini) {
    presets.push(initPresetMini(frontMatter.presetMini));
  } else {
    presets.push(initPresetUno());
  }
  if (frontMatter.presetIcons) {
    const presetIcons = { ...frontMatter.presetIcons };
    const iconLoader = createIconLoader(options.iconifyJsonCDN, options.iconifyJsonCDNParams);
    const icons = await getIcons(options.unoCSSUrl);
    const iconCollections = () => {
      const collections = {};
      icons.forEach((key) => {
        collections[key] = iconLoader(key);
      });
      return collections;
    };
    presetIcons.autoInstall = false;
    presetIcons.collections = {
      ...iconCollections()
    };
    presets.push(initPresetIcons(presetIcons));
  }
  if (frontMatter.presetAttributify) {
    presets.push(initPresetAttributify(frontMatter.presetAttributify));
  }
  if (frontMatter.presetTypography) {
    presets.push(initPresetTypography(frontMatter.presetTypography));
  }
  if (frontMatter.presetWebFonts) {
    presets.push(initPresetWebFonts(frontMatter.presetWebFonts));
  }
  if (frontMatter.presetTagify) {
    presets.push(initPresetTagify(frontMatter.presetTagify));
  }
  if (frontMatter.presetRemToPx) {
    presets.push(initPresetRemToPx());
  }
  const replacePlaceholders = (m, value) => {
    if (typeof value === "string") {
      return value.replace(
        /\$\{m(?:\[(\d+)\])?\}/g,
        (src, index) => {
          const idx = index ? parseInt(index, 10) : 1;
          return idx < m.length ? m[idx] : src;
        }
      );
    } else if (typeof value === "object" && value !== null) {
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [
          key,
          replacePlaceholders(m, val)
        ])
      );
    }
    return value;
  };
  const rules = (frontMatter.rules ?? []).map(
    ([pattern, template]) => !pattern.startsWith("/") || !pattern.endsWith("/") ? [pattern, template] : [
      new RegExp(pattern.replace(/^\/|\/$/g, "")),
      (m) => m ? replacePlaceholders(m, template) : template
    ]
  );
  const preflights = [];
  if (frontMatter.preflightStyle) {
    preflights.push({
      getCSS: () => frontMatter.preflightStyle ?? ""
    });
  }
  initUnocssRuntime({
    defaults: {
      rules,
      presets,
      preflights
    }
  });
};
export {
  initUnoCSS
};
//# sourceMappingURL=init-uno-css.js.map
