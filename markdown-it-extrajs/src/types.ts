import type { Rule } from "@unocss/core";
import type { IconsOptions } from "@unocss/preset-icons/browser";
import type { PresetWindOptions } from "@unocss/preset-wind";
import type { PresetMiniOptions } from "@unocss/preset-mini";
import type { AttributifyOptions } from "@unocss/preset-attributify";
import type { TypographyOptions } from "@unocss/preset-typography";
import type { WebFontsOptions } from "@unocss/preset-web-fonts";
import type { TagifyOptions } from "@unocss/preset-tagify";

export type UnoCSSConfig<Theme extends object = object> = {
    rules?: Rule<Theme>[];
    presetWind?: PresetWindOptions | null;
    presetMini?: PresetMiniOptions | null;
    presetIcons?: IconsOptions | null;
    presetAttributify?: AttributifyOptions | null;
    presetTypography?: TypographyOptions | null;
    presetWebFonts?: WebFontsOptions | null;
    presetTagify?: TagifyOptions | null;
    presetRemToPx?: boolean;
};

export type ExtraJSFrontMatter = UnoCSSConfig & {
    disableMermaid?: boolean;
    disableFontAwesome?: boolean;
    disableUnoCSS?: boolean;
};

export type ExtraJSOptions = {
    discardFrontMatter?: boolean;
    useMermaid?: boolean;
    mermaidUrl?: string;
    useFontAwesome?: boolean;
    fontAwesomeUrl?: string;
    useUnoCSS?: boolean;
    unoCSSUrl?: string;
    unoCSSPresetIconCDN?: string;
    outputScriptTag?: boolean;
};
