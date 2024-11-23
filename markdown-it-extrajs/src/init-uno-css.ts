import type { UnoCSSConfig } from "./types.ts";

export const initUnoCSS = (
    url: string = "https://esm.sh/@unocss",
    unoCSSPresetIconCDN: string = "https://esm.sh/",
    conf: UnoCSSConfig = {},
) => {
    const safeConf = {
        ...conf,
    };
    if (safeConf.presetIcons) {
        safeConf.presetIcons.cdn = unoCSSPresetIconCDN;
    }

    return `
import initUnocssRuntime from "${url}/runtime";
import initPresetIcons from "${url}/preset-icons/browser";
import initPresetUno from "${url}/preset-uno";
import initPresetWind from "${url}/preset-wind";
import initPresetMini from "${url}/preset-mini";
import initPresetAttributify from "${url}/preset-attributify";
import initPresetTypography from "${url}/preset-typography";
import initPresetWebFonts from "${url}/preset-web-fonts";
import initPresetTagify from "${url}/preset-tagify";
import initPresetRemToPx from "${url}/preset-rem-to-px";

const conf = ${JSON.stringify(safeConf)};

export default async () => {
    const presets = [];

    if (conf.presetWind) {
        presets.push(initPresetWind(conf.presetWind));
    } else if (conf.presetMini) {
        presets.push(initPresetMini(conf.presetMini));
    } else {
        presets.push(initPresetUno());
    }

    if (conf.presetIcons) {
        presets.push(initPresetIcons(conf.presetIcons));
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
