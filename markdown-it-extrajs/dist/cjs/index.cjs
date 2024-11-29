var C=Object.create;var a=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var A=(e,t)=>{for(var s in t)a(e,s,{get:t[s],enumerable:!0})},f=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of I(t))!v.call(e,o)&&o!==s&&a(e,o,{get:()=>t[o],enumerable:!(r=h(t,o))||r.enumerable});return e};var u=(e,t,s)=>(s=e!=null?C(b(e)):{},f(t||!e||!e.__esModule?a(s,"default",{value:e,enumerable:!0}):s,e)),M=e=>f(a({},"__esModule",{value:!0}),e);var J={};A(J,{createScriptTag:()=>m,createTemplateTag:()=>c,default:()=>T,initAll:()=>g});module.exports=M(J);var y=u(require("markdown-it-front-matter")),w=u(require("gray-matter"));var P=(e="https://esm.sh/mermaid")=>`export default async (_ = {}) => {
    const mermaid = await import("${e}");
    mermaid.default.init();
};`,d=P;var $=(e="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
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
};`,S=$;var U=(e="https://esm.sh/@unocss",t="https://esm.sh/",s={})=>{let r={...s};return r.presetIcons&&(r.presetIcons.cdn=t),`
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

const conf = ${JSON.stringify(r)};

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
`},l=U;var g=e=>e.useMermaid||e.useFontAwesome||e.useUnoCSS?`
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
};`:"",c=(e,t)=>e.useMermaid||e.useFontAwesome||e.useUnoCSS?`
<template
  id="extrajs"
${e.useMermaid?`data-extrajs-mermaid-js="${btoa(d(e.mermaidUrl))}"`:""}
${e.useFontAwesome?`data-extrajs-font-awesome="${btoa(S(e.fontAwesomeUrl))}"`:""}
${e.useUnoCSS?`data-extrajs-uno-css="${btoa(l(e.unoCSSUrl,e.unoCSSPresetIconCDN,t))}"`:""}
${`data-extrajs-init="${btoa(g(e))}"`}>
</template>`:"",m=e=>(e.useMermaid||e.useFontAwesome||e.useUnoCSS)&&e.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";var E={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function F(e,t){let{renderer:{render:s},parse:r}=e,o={};t.discardFrontMatter&&e.use(y.default,i=>{}),e.parse=(i,n)=>(o=(0,w.default)(i).data.extrajs??{},r.call(e,i,n)),e.renderer.render=function(...i){let n=o?{...o}:{},p={...E,...t,...n.useMermaid?{}:{useMermaid:!1},...n.useFontAwesome?{}:{useFontAwesome:!1},...n.useUnoCSS?{}:{useUnoCSS:!1}};return s.apply(e.renderer,i)+c(p,n)+m(p)}}var x=F;var T=x;
//# sourceMappingURL=index.cjs.map
