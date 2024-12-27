import { defaultOptions } from "./types.js";
const getIcons = async (unoCSSUrl = defaultOptions.unoCSSUrl) => await import(`${unoCSSUrl}/preset-icons/core`).then(
  (i) => i.icons
);
const createIconLoader = (iconifyJsonCDN = defaultOptions.iconifyJsonCDN) => (key) => () => import(`${iconifyJsonCDN}/@iconify-json/${key}`).then((i) => i.icons);
export {
  createIconLoader,
  getIcons
};
//# sourceMappingURL=iconify-json.js.map
