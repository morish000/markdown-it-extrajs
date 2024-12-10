(() => {
  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.17/src/init-font-awesome.ts
  var initFontAwesome = async (options = {}, frontMatter = {}) => {
    try {
      const [
        fontawesomeSvgCore,
        freeSolidSvgIcons,
        freeRegularSvgIcons,
        freeBrandsSvgIcons
      ] = await Promise.all([
        import(options.fontAwesomeUrl + "/fontawesome-svg-core"),
        import(options.fontAwesomeUrl + "/free-solid-svg-icons"),
        import(options.fontAwesomeUrl + "/free-regular-svg-icons"),
        import(options.fontAwesomeUrl + "/free-brands-svg-icons")
      ]);
      const extractIcons = (iconSet) => {
        return Object.entries(iconSet).filter(
          ([key, value]) => key !== "prefix" && key !== "default" && typeof value !== "string"
        ).map(([, value]) => value);
      };
      const icons = [
        ...extractIcons(freeSolidSvgIcons),
        ...extractIcons(freeRegularSvgIcons),
        ...extractIcons(freeBrandsSvgIcons)
      ];
      [
        "familyPrefix",
        "cssPrefix",
        "styleDefault",
        "familyDefault",
        "replacementClass",
        "autoReplaceSvg",
        "autoA11y",
        "searchPseudoElements",
        "keepOriginalSource",
        "measurePerformance",
        "mutateApproach",
        "showMissingIcons"
      ].forEach(
        (key) => frontMatter.fontAwesomeConfig?.[key] && (fontawesomeSvgCore.config[key] = frontMatter.fontAwesomeConfig[key])
      );
      fontawesomeSvgCore.config.observeMutations = false;
      fontawesomeSvgCore.config.autoAddCss = false;
      fontawesomeSvgCore.library.add(...icons);
      fontawesomeSvgCore.dom.i2svg();
      if (!document.getElementById("extrajs-fontawesome")) {
        const styleElement = document.createElement("style");
        styleElement.id = "extrajs-fontawesome";
        styleElement.textContent = fontawesomeSvgCore.dom.css();
        document.head.appendChild(styleElement);
        const observer = new MutationObserver(() => {
          if (styleElement && styleElement.textContent === "") {
            styleElement.textContent = fontawesomeSvgCore.dom.css();
          }
        });
        observer.observe(styleElement, {
          characterData: true,
          childList: true,
          subtree: true
        });
      }
    } catch (error) {
      throw error;
    }
  };

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.17/src/types.ts
  var defaultOptions = {
    discardFrontMatter: true,
    outputScriptTag: true,
    useMermaid: false,
    useFontAwesome: false,
    useUnoCSS: false,
    mermaidUrl: "https://esm.sh/mermaid",
    mermaidElkUrl: "https://esm.sh/@mermaid-js/layout-elk",
    fontAwesomeUrl: "https://esm.sh/@fortawesome",
    unoCSSUrl: "https://esm.sh/@unocss",
    iconifyJsonCDN: "https://esm.sh"
  };

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.17/src/iconify-json.ts
  var getIcons = async (unoCSSUrl = defaultOptions.unoCSSUrl) => await import(`${unoCSSUrl}/preset-icons/core`).then(
    (i) => i.icons
  );
  var createIconLoader = (iconifyJsonCDN = defaultOptions.iconifyJsonCDN) => (key) => () => import(`${iconifyJsonCDN}/@iconify-json/${key}`).then((i) => i.icons);

  // node_modules/.deno/ts-dedent@2.2.0/node_modules/ts-dedent/esm/index.js
  function dedent(templ) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      values[_i - 1] = arguments[_i];
    }
    var strings = Array.from(typeof templ === "string" ? [templ] : templ);
    strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
    var indentLengths = strings.reduce(function(arr, str) {
      var matches = str.match(/\n([\t ]+|(?!\s).)/g);
      if (matches) {
        return arr.concat(matches.map(function(match) {
          var _a, _b;
          return (_b = (_a = match.match(/[\t ]/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        }));
      }
      return arr;
    }, []);
    if (indentLengths.length) {
      var pattern_1 = new RegExp("\n[	 ]{" + Math.min.apply(Math, indentLengths) + "}", "g");
      strings = strings.map(function(str) {
        return str.replace(pattern_1, "\n");
      });
    }
    strings[0] = strings[0].replace(/^\r?\n/, "");
    var string = strings[0];
    values.forEach(function(value, i) {
      var endentations = string.match(/(?:^|\n)( *)$/);
      var endentation = endentations ? endentations[1] : "";
      var indentedValue = value;
      if (typeof value === "string" && value.includes("\n")) {
        indentedValue = String(value).split("\n").map(function(str, i2) {
          return i2 === 0 ? str : "" + endentation + str;
        }).join("\n");
      }
      string += indentedValue + strings[i + 1];
    });
    return string;
  }

  // node_modules/.deno/uuid@9.0.1/node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/.deno/uuid@9.0.1/node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // node_modules/.deno/uuid@9.0.1/node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/.deno/uuid@9.0.1/node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.17/src/init-mermaid.ts
  var initMermaid = async (options = {}, frontMatter = {}) => {
    const entityDecode = function(html) {
      const decoder = document.createElement("div");
      html = encodeURIComponent(html).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";");
      decoder.innerHTML = html;
      return decodeURIComponent(decoder.textContent);
    };
    if (options.mermaidUrl) {
      const { default: mermaid } = await import(options.mermaidUrl);
      if (options.mermaidElkUrl) {
        const { default: elkLayouts } = await import(options.mermaidElkUrl);
        mermaid.registerLayoutLoaders(elkLayouts);
      }
      const iconLoader = createIconLoader(options.iconifyJsonCDN);
      const icons = await getIcons(options.unoCSSUrl);
      const createMermaidIconLoaders = () => {
        const loaders = [];
        icons.forEach((key) => {
          loaders.push(
            {
              name: key,
              loader: iconLoader(key)
            }
          );
        });
        return loaders;
      };
      mermaid.registerIconPacks(createMermaidIconLoaders());
      mermaid.initialize({
        ...frontMatter.mermaidConfig ?? {},
        ...{ startOnLoad: false, suppressErrorRendering: true }
      });
      const renders = Array.from(document.querySelectorAll(".mermaid")).map(
        async (element) => {
          if (element.getAttribute("data-processed")) {
            return;
          }
          element.setAttribute("data-processed", "true");
          const graphDefinition = element.innerHTML;
          element.querySelectorAll("svg").forEach((svg) => svg.remove());
          if (graphDefinition) {
            const id = `mermaid-${v4_default()}`;
            const renderResult = await mermaid.render(
              id,
              dedent(entityDecode(graphDefinition)).trim().replace(/<br\s*\/?>/gi, "<br/>")
            );
            element.innerHTML = renderResult.svg;
            renderResult.bindFunctions?.(element);
          }
        }
      );
      const safeRenders = renders.map((p) => p.catch((e) => console.error(e)));
      await Promise.all(safeRenders);
    }
  };

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.17/src/init-uno-css.ts
  var initUnoCSS = async (options = {}, frontMatter = {}) => {
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
      { default: initPresetRemToPx }
    ] = await Promise.all([
      import(options.unoCSSUrl + "/runtime"),
      frontMatter.presetWind ? import(options.unoCSSUrl + "/preset-wind") : Promise.resolve({}),
      !frontMatter.presetWind && frontMatter.presetMini ? import(options.unoCSSUrl + "/preset-mini") : Promise.resolve({}),
      !frontMatter.presetWind && !frontMatter.presetMini ? import(options.unoCSSUrl + "/preset-uno") : Promise.resolve({}),
      frontMatter.presetIcons ? import(options.unoCSSUrl + "/preset-icons/browser") : Promise.resolve({}),
      frontMatter.presetAttributify ? import(options.unoCSSUrl + "/preset-attributify") : Promise.resolve({}),
      frontMatter.presetTypography ? import(options.unoCSSUrl + "/preset-typography") : Promise.resolve({}),
      frontMatter.presetWebFonts ? import(options.unoCSSUrl + "/preset-web-fonts") : Promise.resolve({}),
      frontMatter.presetTagify ? import(options.unoCSSUrl + "/preset-tagify") : Promise.resolve({}),
      frontMatter.presetRemToPx ? import(options.unoCSSUrl + "/preset-rem-to-px") : Promise.resolve({})
    ]);
    const presets = [];
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
      const iconCollections = () => {
        const collections = {};
        icons.forEach((key) => {
          collections[key] = iconLoader(key);
        });
        return collections;
      };
      presetIcons.autoInstall = false;
      presetIcons.collections = {
        ...iconCollections()
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
    const rules = frontMatter.rules ?? [];
    initUnocssRuntime({
      defaults: {
        rules,
        presets
      }
    });
  };

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.17/src/init-all.ts
  var initAll = async (options = {}, frontMatter = {}) => {
    const tasks = [];
    options.useMermaid && tasks.push(initMermaid(options, frontMatter));
    options.useFontAwesome && tasks.push(initFontAwesome(options, frontMatter));
    options.useUnoCSS && tasks.push(initUnoCSS(options, frontMatter));
    tasks.length > 0 && await Promise.all(tasks);
  };

  // src/preview.ts
  var init = async () => {
    const optionsStr = document.getElementById("extrajs")?.getAttribute(
      "data-extrajs-options"
    );
    const frontMatterStr = document.getElementById("extrajs")?.getAttribute(
      "data-extrajs-frontMatter"
    );
    if (optionsStr && frontMatterStr) {
      await initAll(
        JSON.parse(atob(optionsStr)),
        JSON.parse(atob(frontMatterStr))
      );
    }
  };
  window.removeEventListener("vscode.markdown.updateContent", init);
  window.addEventListener("vscode.markdown.updateContent", init);
  init();
})();
//# sourceMappingURL=preview.js.map
