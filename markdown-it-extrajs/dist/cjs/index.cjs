var h=Object.create;var a=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var $=(t,e)=>{for(var s in e)a(t,s,{get:e[s],enumerable:!0})},f=(t,e,s,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of I(e))!P.call(t,r)&&r!==s&&a(t,r,{get:()=>e[r],enumerable:!(o=C(e,r))||o.enumerable});return t};var u=(t,e,s)=>(s=t!=null?h(b(t)):{},f(e||!t||!t.__esModule?a(s,"default",{value:t,enumerable:!0}):s,t)),A=t=>f(a({},"__esModule",{value:!0}),t);var J={};$(J,{createScriptTag:()=>c,createTemplateTag:()=>p,default:()=>E,initAll:()=>g});module.exports=A(J);var y=u(require("markdown-it-front-matter")),w=u(require("gray-matter"));var M=(t="https://esm.sh/mermaid")=>`export default async (_ = {}) => {
    const mermaid = await import("${t}");
    mermaid.default.init();
};`,S=M;var U=(t="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
    return Object.entries(iconSet)
        .filter(([key, value]) =>
            key.startsWith("fa") && typeof value !== "function"
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
            import("${t}/fontawesome-svg-core"),
            import("${t}/free-solid-svg-icons"),
            import("${t}/free-regular-svg-icons"),
            import("${t}/free-brands-svg-icons"),
        ]);

        const icons = [
            ...extractIcons(freeSolidSvgIcons),
            ...extractIcons(freeRegularSvgIcons),
            ...extractIcons(freeBrandsSvgIcons),
        ];

        fontawesomeSvgCore.library.add(...icons);
        fontawesomeSvgCore.dom.i2svg();
        fontawesomeSvgCore.dom.watch();
    } catch (error) {
        throw error;
    }
};`,d=U;var v=(t="https://esm.sh/@unocss",e="https://esm.sh/",s={})=>{let o={...s};return o.presetIcons&&(o.presetIcons.cdn=e),`
import initUnocssRuntime from "${t}/runtime";
import initPresetIcons from "${t}/preset-icons/browser";
import initPresetUno from "${t}/preset-uno";
import initPresetWind from "${t}/preset-wind";
import initPresetMini from "${t}/preset-mini";
import initPresetAttributify from "${t}/preset-attributify";
import initPresetTypography from "${t}/preset-typography";
import initPresetWebFonts from "${t}/preset-web-fonts";
import initPresetTagify from "${t}/preset-tagify";
import initPresetRemToPx from "${t}/preset-rem-to-px";

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
        if (_conf?.presetIcons?.collections) {
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
`},l=v;var g=t=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
export default async (_conf = {}) => {
  const tasks = [];
${t.useMermaid?`
  const mermaidScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-mermaid-js');
  if (mermaidScript) {
    tasks.push(
      (async () => {
        const initMermaid = await import("data:text/javascript;base64," + mermaidScript);
        await initMermaid.default(_conf);
      })()
    );
  }`:""}
${t.useFontAwesome?`
  const fontAwesomeScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-font-awesome');
  if (fontAwesomeScript) {
    tasks.push(
      (async () => {
        const initFontAwesome = await import("data:text/javascript;base64," + fontAwesomeScript);
        await initFontAwesome.default(_conf);
      })()
    );
  }`:""}
${t.useUnoCSS?`
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
};`:"",p=(t,e)=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
<template
  id="extrajs"
${t.useMermaid?`data-extrajs-mermaid-js="${btoa(S(t.mermaidUrl))}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${btoa(d(t.fontAwesomeUrl))}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${btoa(l(t.unoCSSUrl,t.unoCSSPresetIconCDN,e))}"`:""}
${`data-extrajs-init="${btoa(g(t))}"`}>
</template>`:"",c=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";var F={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function T(t,e){let{renderer:{render:s},parse:o}=t,r={};e.discardFrontMatter&&t.use(y.default,n=>{}),t.parse=(n,i)=>(r=(0,w.default)(n).data.extrajs??{},o.call(t,n,i)),t.renderer.render=function(...n){let i=r?{...r}:{},m={...F,...e,...i.disableMermaid?{useMermaid:!1}:{},...i.disableFontAwesome?{useFontAwesome:!1}:{},...i.disableUnoCSS?{useUnoCSS:!1}:{}};return s.apply(t.renderer,n)+p(m,i)+c(m)}}var x=T;var E=x;
//# sourceMappingURL=index.cjs.map
