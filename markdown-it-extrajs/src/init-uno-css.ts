import type { IconifyJSON } from "@iconify/types";
import type { PresetOrFactory } from "@unocss/core";
import type {
  ExtraJSFrontMatter,
  ExtraJSOptions,
  InitFunctionType,
} from "./types.ts";
import { createIconLoader, getIcons } from "./iconify-json.ts";

export const initUnoCSS: InitFunctionType = async (
  options: ExtraJSOptions = {},
  frontMatter: ExtraJSFrontMatter = {},
) => {
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
    { default: initPresetRemToPx },
  ] = await Promise.all([
    import(options.unoCSSUrl + "/runtime"),
    frontMatter.presetWind
      ? import(options.unoCSSUrl + "/preset-wind")
      : Promise.resolve({}),
    (!frontMatter.presetWind && frontMatter.presetMini)
      ? import(options.unoCSSUrl + "/preset-mini")
      : Promise.resolve({}),
    (!frontMatter.presetWind && !frontMatter.presetMini)
      ? import(options.unoCSSUrl + "/preset-uno")
      : Promise.resolve({}),
    frontMatter.presetIcons
      ? import(options.unoCSSUrl + "/preset-icons/browser")
      : Promise.resolve({}),
    frontMatter.presetAttributify
      ? import(options.unoCSSUrl + "/preset-attributify")
      : Promise.resolve({}),
    frontMatter.presetTypography
      ? import(options.unoCSSUrl + "/preset-typography")
      : Promise.resolve({}),
    frontMatter.presetWebFonts
      ? import(options.unoCSSUrl + "/preset-web-fonts")
      : Promise.resolve({}),
    frontMatter.presetTagify
      ? import(options.unoCSSUrl + "/preset-tagify")
      : Promise.resolve({}),
    frontMatter.presetRemToPx
      ? import(options.unoCSSUrl + "/preset-rem-to-px")
      : Promise.resolve({}),
  ]);

  const presets: PresetOrFactory[] = [];

  if (frontMatter.presetWind) {
    presets.push(initPresetWind(frontMatter.presetWind));
  } else if (frontMatter.presetMini) {
    presets.push(initPresetMini(frontMatter.presetMini));
  } else {
    presets.push(initPresetUno());
  }

  if (frontMatter.presetIcons) {
    const presetIcons = { ...frontMatter.presetIcons };

    const iconLoader = createIconLoader(options.iconifyJsonCDN);
    const icons = await getIcons(options.unoCSSUrl);

    const iconCollections: () => Record<string, () => Promise<IconifyJSON>> =
      () => {
        const collections: Record<string, () => Promise<IconifyJSON>> = {};
        icons.forEach((key: string) => {
          collections[key] = iconLoader(key);
        });

        return collections;
      };

    presetIcons.autoInstall = false;
    presetIcons.collections = {
      ...iconCollections(),
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

  const rules = ((frontMatter.rules ?? []) as [string, object][]).map((
    [pattern, template],
  ) =>
    (!pattern.startsWith("/") || !pattern.endsWith("/"))
      ? [pattern, template]
      : [
        new RegExp(pattern.replace(/^\/|\/$/g, "")),
        (m: string[]) =>
          m
            ? Object.fromEntries(
              Object.entries(template).map(([key, value]) => [
                key,
                value.replace(
                  /\$\{m(?:\[(\d+)\])?\}/g,
                  (src, index: string) => {
                    const idx = index ? parseInt(index, 10) : 1;
                    return idx < m.length ? m[idx] : src;
                  },
                ),
              ]),
            )
            : template,
      ]
  );

  initUnocssRuntime({
    defaults: {
      rules,
      presets,
    },
  });
};
