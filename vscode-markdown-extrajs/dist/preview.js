(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.deno/markdown-it-front-matter@0.2.4/node_modules/markdown-it-front-matter/index.js
  var require_markdown_it_front_matter = __commonJS({
    "node_modules/.deno/markdown-it-front-matter@0.2.4/node_modules/markdown-it-front-matter/index.js"(exports, module) {
      "use strict";
      module.exports = function front_matter_plugin(md, cb) {
        var min_markers = 3, marker_str = "-", marker_char = marker_str.charCodeAt(0), marker_len = marker_str.length;
        function frontMatter(state, startLine, endLine, silent) {
          var pos, nextLine, marker_count, token, old_parent, old_line_max, start_content, auto_closed = false, start = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
          if (startLine !== 0 || marker_char !== state.src.charCodeAt(0)) {
            return false;
          }
          for (pos = start + 1; pos <= max; pos++) {
            if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
              start_content = pos + 1;
              break;
            }
          }
          marker_count = Math.floor((pos - start) / marker_len);
          if (marker_count < min_markers) {
            return false;
          }
          pos -= (pos - start) % marker_len;
          if (silent) {
            return true;
          }
          nextLine = startLine;
          for (; ; ) {
            nextLine++;
            if (nextLine >= endLine) {
              break;
            }
            if (state.src.slice(start, max) === "...") {
              break;
            }
            start = state.bMarks[nextLine] + state.tShift[nextLine];
            max = state.eMarks[nextLine];
            if (start < max && state.sCount[nextLine] < state.blkIndent) {
              break;
            }
            if (marker_char !== state.src.charCodeAt(start)) {
              continue;
            }
            if (state.sCount[nextLine] - state.blkIndent >= 4) {
              continue;
            }
            for (pos = start + 1; pos <= max; pos++) {
              if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
                break;
              }
            }
            if (Math.floor((pos - start) / marker_len) < marker_count) {
              continue;
            }
            pos -= (pos - start) % marker_len;
            pos = state.skipSpaces(pos);
            if (pos < max) {
              continue;
            }
            auto_closed = true;
            break;
          }
          old_parent = state.parentType;
          old_line_max = state.lineMax;
          state.parentType = "container";
          state.lineMax = nextLine;
          token = state.push("front_matter", null, 0);
          token.hidden = true;
          token.markup = state.src.slice(startLine, pos);
          token.block = true;
          token.map = [startLine, nextLine + (auto_closed ? 1 : 0)];
          token.meta = state.src.slice(start_content, start - 1);
          state.parentType = old_parent;
          state.lineMax = old_line_max;
          state.line = nextLine + (auto_closed ? 1 : 0);
          cb(token.meta);
          return true;
        }
        md.block.ruler.before(
          "table",
          "front_matter",
          frontMatter,
          {
            alt: [
              "paragraph",
              "reference",
              "blockquote",
              "list"
            ]
          }
        );
      };
    }
  });

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.14/src/plugin.ts
  var import_npm_markdown_it_front_matter_0_2 = __toESM(require_markdown_it_front_matter());
  var import_npm_gray_matter_4_0 = __toESM(__require("gray-matter"));

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.14/src/types.ts
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

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.14/src/iconify-json.ts
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

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.14/src/init-mermaid.ts
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
          const graphDefinition = element.textContent;
          element.querySelectorAll("svg").forEach((svg) => svg.remove());
          if (graphDefinition) {
            const renderResult = await mermaid.render(
              `mermaid-${crypto.randomUUID()}`,
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

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.14/src/init-font-awesome.ts
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

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.14/src/init-uno-css.ts
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

  // https://jsr.io/@morish000/markdown-it-extrajs/0.0.14/src/init-all.ts
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
        JSON.parse(btoa(optionsStr)),
        JSON.parse(btoa(frontMatterStr))
      );
    }
  };
  window.removeEventListener("vscode.markdown.updateContent", init);
  window.addEventListener("vscode.markdown.updateContent", init);
  init();
})();
//# sourceMappingURL=preview.js.map
