var r=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var u=(e,t)=>{for(var s in t)r(e,s,{get:t[s],enumerable:!0})},S=(e,t,s,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of f(t))!d.call(e,n)&&n!==s&&r(e,n,{get:()=>t[n],enumerable:!(o=p(t,n))||o.enumerable});return e};var l=e=>S(r({},"__esModule",{value:!0}),e);var b={};u(b,{createScriptTag:()=>h,createTemplateTag:()=>C,initAll:()=>m});module.exports=l(b);var g=(e="https://esm.sh/mermaid")=>`export default async (_ = {}) => {
    const mermaid = await import("${e}");
    mermaid.default.init();
};`,i=g;var y=(e="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
    return Object.entries(iconSet)
        .filter(([key, value]) =>
            key !== "prefix" && key !== "default" && typeof value !== "string"
        )
        .map(([, value]) => value);
};

export default async (_ = {}) => {
    try {
        const [
            fontawesomeSvgCore,
            freeSolidSvgIcons,
            freeRegularSvgIcons,
            freeBrandsSvgIcons,
        ] = await Promise.all([
            import("${e}/fontawesome-svg-core"),
            import("${e}/free-solid-svg-icons"),
            import("${e}/free-regular-svg-icons"),
            import("${e}/free-brands-svg-icons"),
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
    } catch (error) {
        throw error;
    }
};`,a=y;var w=(e="https://esm.sh/@unocss",t="https://esm.sh/",s={})=>{let o={...s};return o.presetIcons&&(o.presetIcons.cdn=t),`
import initUnocssRuntime from "${e}/runtime";
import initPresetIcons from "${e}/preset-icons/browser";
import initPresetUno from "${e}/preset-uno";
import initPresetWind from "${e}/preset-wind";
import initPresetMini from "${e}/preset-mini";
import initPresetAttributify from "${e}/preset-attributify";
import initPresetTypography from "${e}/preset-typography";
import initPresetWebFonts from "${e}/preset-web-fonts";
import initPresetTagify from "${e}/preset-tagify";
import initPresetRemToPx from "${e}/preset-rem-to-px";

const conf = ${JSON.stringify(o)};

export default async (_conf = {}) => {
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
        if (_conf?.presetIcons?.collections && conf.useBundleIconifyJson) {
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
};
`},c=w;var m=e=>e.useMermaid||e.useFontAwesome||e.useUnoCSS?`
export default async (_conf = {}) => {
  const tasks = [];
${e.useMermaid?`
  const mermaidScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-mermaid-js');
  if (mermaidScript) {
    tasks.push(
      (async () => {
        const initMermaid = await import("data:text/javascript;base64," + mermaidScript);
        await initMermaid.default(_conf);
      })()
    );
  }`:""}
${e.useFontAwesome?`
  const fontAwesomeScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-font-awesome');
  if (fontAwesomeScript) {
    tasks.push(
      (async () => {
        const initFontAwesome = await import("data:text/javascript;base64," + fontAwesomeScript);
        await initFontAwesome.default(_conf);
      })()
    );
  }`:""}
${e.useUnoCSS?`
  const unoCSSScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-uno-css');
  if (unoCSSScript) {
    tasks.push(
      (async () => {
        const initUnoCSS = await import("data:text/javascript;base64," + unoCSSScript);
        await initUnoCSS.default(_conf);
      })()
    );
  }`:""}
  tasks.length > 0 && await Promise.all(tasks);
};`:"",C=(e,t)=>e.useMermaid||e.useFontAwesome||e.useUnoCSS?`
<template
  id="extrajs"
${e.useMermaid?`data-extrajs-mermaid-js="${btoa(i(e.mermaidUrl))}"`:""}
${e.useFontAwesome?`data-extrajs-font-awesome="${btoa(a(e.fontAwesomeUrl))}"`:""}
${e.useUnoCSS?`data-extrajs-uno-css="${btoa(c(e.unoCSSUrl,e.unoCSSPresetIconCDN,t))}"`:""}
${`data-extrajs-init="${btoa(m(e))}"`}>
</template>`:"",h=e=>(e.useMermaid||e.useFontAwesome||e.useUnoCSS)&&e.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";
//# sourceMappingURL=create-tags.cjs.map
