import type { Rule } from "@unocss/core";
import type { IconsOptions } from "@unocss/preset-icons";
import type { PresetWindOptions } from "@unocss/preset-wind";
import type { PresetMiniOptions } from "@unocss/preset-mini";
import type { AttributifyOptions } from "@unocss/preset-attributify";
import type { TypographyOptions } from "@unocss/preset-typography";
import type { WebFontsOptions } from "@unocss/preset-web-fonts";
import type { TagifyOptions } from "@unocss/preset-tagify";
import type { MermaidConfig } from "mermaid";
import type { Config } from "@fortawesome/fontawesome-svg-core";

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
  preflightStyle?: string;
};

export type MermaidJSConfig = {
  mermaidConfig?: MermaidConfig;
};

export type FontAwesomeConfig = {
  fontAwesomeConfig?: Config;
};

export type ExtraJSUseOptions = {
  useMermaid?: boolean;
  useFontAwesome?: boolean;
  useUnoCSS?: boolean;
};

export type ExtraJSFrontMatter =
  & UnoCSSConfig
  & MermaidJSConfig
  & FontAwesomeConfig
  & ExtraJSUseOptions;

export type ExtraJSOptions = ExtraJSUseOptions & {
  discardFrontMatter?: boolean;
  outputScriptTag?: boolean;
  mermaidUrl?: string;
  mermaidElkUrl?: string;
  fontAwesomeUrl?: string;
  unoCSSUrl?: string;
  iconifyJsonCDN?: string;
};

export type InitFunctionType = (
  options: ExtraJSOptions,
  frontMatter: ExtraJSFrontMatter,
) => Promise<void>;

export const defaultOptions: {
  [K in keyof ExtraJSOptions]-?: ExtraJSOptions[K];
} = {
  discardFrontMatter: true,
  outputScriptTag: true,
  useMermaid: false,
  useFontAwesome: false,
  useUnoCSS: false,
  mermaidUrl: "https://esm.sh/mermaid",
  mermaidElkUrl: "https://esm.sh/@mermaid-js/layout-elk",
  fontAwesomeUrl: "https://esm.sh/@fortawesome",
  unoCSSUrl: "https://esm.sh/@unocss",
  iconifyJsonCDN: "https://esm.sh",
};
