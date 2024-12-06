import { defaultOptions } from "./types.ts";

export const getIcons = async (
  unoCSSUrl: string = defaultOptions.unoCSSUrl,
) =>
  await import(`${unoCSSUrl}/preset-icons/core`).then((i) =>
    i.icons as string[]
  );

export const createIconLoader =
  (iconifyJsonCDN: string = defaultOptions.iconifyJsonCDN) =>
  (key: string) =>
  () => import(`${iconifyJsonCDN}/@iconify-json/${key}`).then((i) => i.icons);
