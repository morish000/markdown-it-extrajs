import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";

export default async (
  options: ExtraJSOptions = {},
  frontMatter: ExtraJSFrontMatter = {},
  _conf: ExtraJSFrontMatter = {},
) => {
  const conf: ExtraJSFrontMatter = {
    ...frontMatter,
  };
  if (conf.presetIcons) {
    conf.presetIcons.cdn = options.unoCSSPresetIconCDN;
  }

  const [
    { default: initUnocssRuntime },
    { default: initPresetIcons },
    { default: initPresetUno },
    { default: initPresetWind },
    { default: initPresetMini },
    { default: initPresetAttributify },
    { default: initPresetTypography },
    { default: initPresetWebFonts },
    { default: initPresetTagify },
    { default: initPresetRemToPx },
  ] = await Promise.all([
    import(options.unoCSSUrl + "/runtime"),
    import(options.unoCSSUrl + "/preset-icons/browser"),
    import(options.unoCSSUrl + "/preset-uno"),
    import(options.unoCSSUrl + "/preset-wind"),
    import(options.unoCSSUrl + "/preset-mini"),
    import(options.unoCSSUrl + "/preset-attributify"),
    import(options.unoCSSUrl + "/preset-typography"),
    import(options.unoCSSUrl + "/preset-web-fonts"),
    import(options.unoCSSUrl + "/preset-tagify"),
    import(options.unoCSSUrl + "/preset-rem-to-px"),
  ]);

  const presets = [];

  if (conf.presetWind) {
    presets.push(initPresetWind(conf.presetWind));
  } else if (conf.presetMini) {
    presets.push(initPresetMini(conf.presetMini));
  } else {
    presets.push(initPresetUno());
  }

  if (conf.presetIcons) {
    const presetIcons = { ...conf.presetIcons };
    if (_conf?.presetIcons?.collections && options.useBundleIconifyJson) {
      presetIcons.autoInstall = false;
      presetIcons.collections = _conf.presetIcons.collections;
    }
    presets.push(initPresetIcons(presetIcons));
  }

  if (conf.presetAttributify) {
    presets.push(initPresetAttributify(conf.presetAttributify));
  }

  if (conf.presetTypography) {
    presets.push(initPresetTypography(conf.presetTypography));
  }

  if (conf.presetWebFonts) {
    presets.push(initPresetWebFonts(conf.presetWebFonts));
  }

  if (conf.presetTagify) {
    presets.push(initPresetTagify(conf.presetTagify));
  }

  if (conf.presetRemToPx) {
    presets.push(initPresetRemToPx());
  }

  const rules = conf.rules ?? [];

  initUnocssRuntime({
    defaults: {
      rules,
      presets,
    },
  });
};
