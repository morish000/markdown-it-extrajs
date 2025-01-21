import { defaultOptions } from "./types.js";

export const getIcons = async (
  unoCSSUrl: string = defaultOptions.unoCSSUrl,
) =>
  await import(`${unoCSSUrl}/preset-icons/core`).then((i) =>
    i.icons as string[]
  );

export const createIconLoader =
  (iconifyJsonCDN: string = defaultOptions.iconifyJsonCDN, iconifyJsonCDNParams: string = defaultOptions.iconifyJsonCDNParams) =>
    (key: string) =>
      () => import(`${iconifyJsonCDN}/@iconify-json/${key}${iconifyJsonCDNParams ? "?" + iconifyJsonCDNParams : ""}`).then((i) => i.icons);
