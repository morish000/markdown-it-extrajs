var n=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var l=(t,e)=>{for(var s in e)n(t,s,{get:e[s],enumerable:!0})},d=(t,e,s,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of m(e))!u.call(t,o)&&o!==s&&n(t,o,{get:()=>e[o],enumerable:!(r=f(e,o))||r.enumerable});return t};var S=t=>d(n({},"__esModule",{value:!0}),t);var b={};l(b,{createScriptTag:()=>C,createTemplateTag:()=>x,initAll:()=>p});module.exports=S(b);var y=()=>`export default async (options = {}, _frontMatter = {}, _conf = {}) => {
    const mermaid = await import(options.mermaidUrl);
    mermaid.default.initialize();
    mermaid.default.run();
};`,i=y;var g=()=>`const extractIcons = (iconSet) => {
    return Object.entries(iconSet)
        .filter(([key, value]) =>
            key !== "prefix" && key !== "default" && typeof value !== "string"
        )
        .map(([, value]) => value);
};

export default async (options = {}, _frontMatter = {}, _conf = {}) => {
    try {
        const [
            fontawesomeSvgCore,
            freeSolidSvgIcons,
            freeRegularSvgIcons,
            freeBrandsSvgIcons,
        ] = await Promise.all([
            import(options.fontAwesomeUrl + "/fontawesome-svg-core"),
            import(options.fontAwesomeUrl + "/free-solid-svg-icons"),
            import(options.fontAwesomeUrl + "/free-regular-svg-icons"),
            import(options.fontAwesomeUrl + "/free-brands-svg-icons"),
        ]);

        const icons = [
            ...extractIcons(freeSolidSvgIcons),
            ...extractIcons(freeRegularSvgIcons),
            ...extractIcons(freeBrandsSvgIcons),
        ];

        fontawesomeSvgCore.config.autoAddCss = false;
        fontawesomeSvgCore.library.add(...icons);
        fontawesomeSvgCore.dom.i2svg();
        fontawesomeSvgCore.dom.watch();

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
                subtree: true,
            });
        }
    } catch (error) {
        throw error;
    }
};`,a=g;var w=()=>`export default async (options = {}, frontMatter = {}, _conf = {}) => {
    const conf = {
        ...frontMatter,
    };
    if (conf.presetIcons) {
        conf.presetIcons.cdn = options.unoCSSPresetIconCDN;
    }

    const [
        { default: initUnocssRuntime },
        { default: initPresetIcons },
        { default: initPresetUno },
        { default: initPresetWind },
        { default: initPresetMini },
        { default: initPresetAttributify },
        { default: initPresetTypography },
        { default: initPresetWebFonts },
        { default: initPresetTagify },
        { default: initPresetRemToPx },
    ] = await Promise.all([
        import(options.unoCSSUrl + "/runtime"),
        import(options.unoCSSUrl + "/preset-icons/browser"),
        import(options.unoCSSUrl + "/preset-uno"),
        import(options.unoCSSUrl + "/preset-wind"),
        import(options.unoCSSUrl + "/preset-mini"),
        import(options.unoCSSUrl + "/preset-attributify"),
        import(options.unoCSSUrl + "/preset-typography"),
        import(options.unoCSSUrl + "/preset-web-fonts"),
        import(options.unoCSSUrl + "/preset-tagify"),
        import(options.unoCSSUrl + "/preset-rem-to-px"),
    ]);

    const presets = [];

    if (conf.presetWind) {
        presets.push(initPresetWind(conf.presetWind));
    } else if (conf.presetMini) {
        presets.push(initPresetMini(conf.presetMini));
    } else {
        presets.push(initPresetUno());
    }

    if (conf.presetIcons) {
        const presetIcons = { ...conf.presetIcons };
        if (_conf?.presetIcons?.collections && options.useBundleIconifyJson) {
            presetIcons.autoInstall = false;
            presetIcons.collections = _conf.presetIcons.collections;
        }
        presets.push(initPresetIcons(presetIcons));
    }

    if (conf.presetAttributify) {
        presets.push(initPresetAttributify(conf.presetAttributify));
    }

    if (conf.presetTypography) {
        presets.push(initPresetTypography(conf.presetTypography));
    }

    if (conf.presetWebFonts) {
        presets.push(initPresetWebFonts(conf.presetWebFonts));
    }

    if (conf.presetTagify) {
        presets.push(initPresetTagify(conf.presetTagify));
    }

    if (conf.presetRemToPx) {
        presets.push(initPresetRemToPx());
    }

    const rules = conf.rules ?? [];

    initUnocssRuntime({
        defaults: {
            rules,
            presets,
        },
    });
};`,c=w;var p=t=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
export default async (options = {}, frontMatter = {}, _conf = {}) => {
  const tasks = [];
${t.useMermaid?`
  const mermaidScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-mermaid-js');
  if (mermaidScript) {
    tasks.push(
      (async () => {
        const initMermaid = await import("data:text/javascript;base64," + mermaidScript);
        await initMermaid.default(options, frontMatter, _conf);
      })()
    );
  }`:""}
${t.useFontAwesome?`
  const fontAwesomeScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-font-awesome');
  if (fontAwesomeScript) {
    tasks.push(
      (async () => {
        const initFontAwesome = await import("data:text/javascript;base64," + fontAwesomeScript);
        await initFontAwesome.default(options, frontMatter, _conf);
      })()
    );
  }`:""}
${t.useUnoCSS?`
  const unoCSSScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-uno-css');
  if (unoCSSScript) {
    tasks.push(
      (async () => {
        const initUnoCSS = await import("data:text/javascript;base64," + unoCSSScript);
        await initUnoCSS.default(options, frontMatter, _conf);
      })()
    );
  }`:""}
  tasks.length > 0 && await Promise.all(tasks);
};`:"",x=(t,e)=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
<template
  id="extrajs"
${t.useMermaid?`data-extrajs-mermaid-js="${btoa(i())}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${btoa(a())}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${btoa(c())}"`:""}
${`data-extrajs-init="${btoa(p(t))}"`}
${`data-extrajs-options="${btoa("export default"+JSON.stringify(t))}"`}
${`data-extrajs-frontMatter="${btoa("export default"+JSON.stringify(e))}"`}>
</template>`:"",C=(t,e)=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default(
      ${JSON.stringify(t)},
      ${JSON.stringify(e)},
      {}
    );
  }
<\/script>`:"";
//# sourceMappingURL=create-tags.cjs.map
