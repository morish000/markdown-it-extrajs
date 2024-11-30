// deno-lint-ignore-file no-window no-window-prefix
const unoCSSIcons = () => ({
  presetIcons: {
    collections: {
      "carbon": () =>
        import("@iconify-json/carbon/icons.json").then((i) => i.default),
      "fa6-brands": () =>
        import("@iconify-json/fa6-brands/icons.json").then((i) => i.default),
      "fa6-regular": () =>
        import("@iconify-json/fa6-regular/icons.json").then((i) => i.default),
      "fa6-solid": () =>
        import("@iconify-json/fa6-solid/icons.json").then((i) => i.default),
      "flagpack": () =>
        import("@iconify-json/flagpack/icons.json").then((i) => i.default),
      "logos": () =>
        import("@iconify-json/logos/icons.json").then((i) => i.default),
      "mdi": () =>
        import("@iconify-json/mdi/icons.json").then((i) => i.default),
      "ph": () => import("@iconify-json/ph/icons.json").then((i) => i.default),
      "tdesign": () =>
        import("@iconify-json/tdesign/icons.json").then((i) => i.default),
      "twemoji": () =>
        import("@iconify-json/twemoji/icons.json").then((i) => i.default),
    },
  },
});

const init = async () => {
  const initScript = window.document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-init",
  );
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default(unoCSSIcons());
  }
};

window.removeEventListener("vscode.markdown.updateContent", init);
window.addEventListener("vscode.markdown.updateContent", init);
init();
