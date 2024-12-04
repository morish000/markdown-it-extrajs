(() => {
  // node_modules/.deno/@unocss+preset-icons@0.65.0-beta.2/node_modules/@unocss/preset-icons/dist/shared/preset-icons.Dik-90yv.mjs
  var defaultIconDimensions = Object.freeze(
    {
      left: 0,
      top: 0,
      width: 16,
      height: 16
    }
  );
  var defaultIconTransformations = Object.freeze({
    rotate: 0,
    vFlip: false,
    hFlip: false
  });
  var defaultIconProps = Object.freeze({
    ...defaultIconDimensions,
    ...defaultIconTransformations
  });
  var defaultExtendedIconProps = Object.freeze({
    ...defaultIconProps,
    body: "",
    hidden: false
  });
  var defaultIconSizeCustomisations = Object.freeze({
    width: null,
    height: null
  });
  var defaultIconCustomisations = Object.freeze({
    // Dimensions
    ...defaultIconSizeCustomisations,
    // Transformations
    ...defaultIconTransformations
  });
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var collections = [
    "academicons",
    "akar-icons",
    "ant-design",
    "arcticons",
    "basil",
    "bi",
    "bitcoin-icons",
    "bpmn",
    "brandico",
    "bx",
    "bxl",
    "bxs",
    "bytesize",
    "carbon",
    "catppuccin",
    "cbi",
    "charm",
    "ci",
    "cib",
    "cif",
    "cil",
    "circle-flags",
    "circum",
    "clarity",
    "codicon",
    "covid",
    "cryptocurrency-color",
    "cryptocurrency",
    "cuida",
    "dashicons",
    "devicon-line",
    "devicon-original",
    "devicon-plain",
    "devicon",
    "duo-icons",
    "ei",
    "el",
    "emblemicons",
    "emojione-monotone",
    "emojione-v1",
    "emojione",
    "entypo-social",
    "entypo",
    "eos-icons",
    "ep",
    "et",
    "eva",
    "f7",
    "fa-brands",
    "fa-regular",
    "fa-solid",
    "fa",
    "fa6-brands",
    "fa6-regular",
    "fa6-solid",
    "fad",
    "fe",
    "feather",
    "file-icons",
    "flag",
    "flagpack",
    "flat-color-icons",
    "flat-ui",
    "flowbite",
    "fluent-color",
    "fluent-emoji-flat",
    "fluent-emoji-high-contrast",
    "fluent-emoji",
    "fluent-mdl2",
    "fluent",
    "fontelico",
    "fontisto",
    "formkit",
    "foundation",
    "fxemoji",
    "gala",
    "game-icons",
    "geo",
    "gg",
    "gis",
    "gravity-ui",
    "gridicons",
    "grommet-icons",
    "guidance",
    "healthicons",
    "heroicons-outline",
    "heroicons-solid",
    "heroicons",
    "hugeicons",
    "humbleicons",
    "ic",
    "icomoon-free",
    "icon-park-outline",
    "icon-park-solid",
    "icon-park-twotone",
    "icon-park",
    "iconamoon",
    "iconoir",
    "icons8",
    "il",
    "ion",
    "iwwa",
    "jam",
    "la",
    "lets-icons",
    "line-md",
    "lineicons",
    "logos",
    "ls",
    "lsicon",
    "lucide-lab",
    "lucide",
    "mage",
    "majesticons",
    "maki",
    "map",
    "marketeq",
    "material-symbols-light",
    "material-symbols",
    "mdi-light",
    "mdi",
    "medical-icon",
    "memory",
    "meteocons",
    "mi",
    "mingcute",
    "mono-icons",
    "mynaui",
    "nimbus",
    "nonicons",
    "noto-v1",
    "noto",
    "octicon",
    "oi",
    "ooui",
    "openmoji",
    "oui",
    "pajamas",
    "pepicons-pencil",
    "pepicons-pop",
    "pepicons-print",
    "pepicons",
    "ph",
    "pixelarticons",
    "prime",
    "proicons",
    "ps",
    "quill",
    "radix-icons",
    "raphael",
    "ri",
    "rivet-icons",
    "si-glyph",
    "si",
    "simple-icons",
    "simple-line-icons",
    "skill-icons",
    "solar",
    "stash",
    "streamline-emojis",
    "streamline",
    "subway",
    "svg-spinners",
    "system-uicons",
    "tabler",
    "tdesign",
    "teenyicons",
    "token-branded",
    "token",
    "topcoat",
    "twemoji",
    "typcn",
    "uil",
    "uim",
    "uis",
    "uit",
    "uiw",
    "unjs",
    "vaadin",
    "vs",
    "vscode-icons",
    "websymbol",
    "weui",
    "whh",
    "wi",
    "wpf",
    "zmdi",
    "zondicons"
  ];
  var icons = /* @__PURE__ */ getDefaultExportFromCjs(collections);

  // src/preview.ts
  var iconLoader = (key) => () => import(`https://esm.sh/@iconify-json/${key}/index.mjs`).then((i) => i.icons);
  var iconCollections = () => {
    const collections2 = {};
    icons.forEach((key) => {
      collections2[key] = iconLoader(key);
    });
    return collections2;
  };
  var unoCSSIcons2 = () => ({
    presetIcons: {
      collections: {
        ...iconCollections()
      }
    }
  });
  var init = async () => {
    const initScript = window.document.getElementById("extrajs")?.getAttribute(
      "data-extrajs-init"
    );
    if (initScript) {
      const init2 = await import("data:text/javascript;base64," + initScript);
      await init2.default(unoCSSIcons2());
    }
  };
  window.removeEventListener("vscode.markdown.updateContent", init);
  window.addEventListener("vscode.markdown.updateContent", init);
  init();
})();
//# sourceMappingURL=preview.js.map
