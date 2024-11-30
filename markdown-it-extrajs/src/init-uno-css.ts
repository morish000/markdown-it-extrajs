import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";

export const initUnoCSS = (
  options: ExtraJSOptions,
  frontMatter: ExtraJSFrontMatter = {},
) => {
  const conf = {
    ...frontMatter,
  };
  if (conf.presetIcons) {
    conf.presetIcons.cdn = options.unoCSSPresetIconCDN;
  }

  return `
import initUnocssRuntime from "${options.unoCSSUrl}/runtime";
import initPresetIcons from "${options.unoCSSUrl}/preset-icons/browser";
import initPresetUno from "${options.unoCSSUrl}/preset-uno";
import initPresetWind from "${options.unoCSSUrl}/preset-wind";
import initPresetMini from "${options.unoCSSUrl}/preset-mini";
import initPresetAttributify from "${options.unoCSSUrl}/preset-attributify";
import initPresetTypography from "${options.unoCSSUrl}/preset-typography";
import initPresetWebFonts from "${options.unoCSSUrl}/preset-web-fonts";
import initPresetTagify from "${options.unoCSSUrl}/preset-tagify";
import initPresetRemToPx from "${options.unoCSSUrl}/preset-rem-to-px";

const options = ${JSON.stringify(options)};
const conf = ${JSON.stringify(conf)};

export default async (_conf = {}) => {
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
`;
};

export default initUnoCSS;
