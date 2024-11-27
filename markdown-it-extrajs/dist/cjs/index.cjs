var x=Object.create;var n=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var $=(t,e)=>{for(var r in e)n(t,r,{get:e[r],enumerable:!0})},c=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of C(e))!P.call(t,s)&&s!==r&&n(t,s,{get:()=>e[s],enumerable:!(o=h(e,s))||o.enumerable});return t};var f=(t,e,r)=>(r=t!=null?x(b(t)):{},c(e||!t||!t.__esModule?n(r,"default",{value:t,enumerable:!0}):r,t)),A=t=>c(n({},"__esModule",{value:!0}),t);var E={};$(E,{createScriptTag:()=>p,createTemplateTag:()=>a,default:()=>T,initAll:()=>g});module.exports=A(E);var l=f(require("markdown-it-front-matter")),y=f(require("gray-matter"));var M=(t="https://esm.sh/mermaid")=>`export default async () => {
    const mermaid = await import("${t}");
    mermaid.default.init();
};`,u=M;var U=(t="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
    return Object.entries(iconSet)
        .filter(([key, value]) =>
            key.startsWith("fa") && typeof value !== "function"
        )
        .map(([, value]) => value);
};

export default async () => {
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
};`,d=U;var v=(t="https://esm.sh/@unocss",e="https://esm.sh/",r={})=>{let o={...r};return o.presetIcons&&(o.presetIcons.cdn=e),`
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

export default async () => {
    const presets = [];

    if (conf.presetWind) {
        presets.push(initPresetWind(conf.presetWind));
    } else if (conf.presetMini) {
        presets.push(initPresetMini(conf.presetMini));
    } else {
        presets.push(initPresetUno());
    }

    if (conf.presetIcons) {
        presets.push(initPresetIcons(conf.presetIcons));
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
`},S=v;var g=t=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
export default async () => {
  const tasks = [];
${t.useMermaid?`
  const mermaidScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-mermaid-js');
  if (mermaidScript) {
    tasks.push(
      (async () => {
        const initMermaid = await import("data:text/javascript;base64," + mermaidScript);
        await initMermaid.default();
      })()
    );
  }`:""}
${t.useFontAwesome?`
  const fontAwesomeScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-font-awesome');
  if (fontAwesomeScript) {
    tasks.push(
      (async () => {
        const initFontAwesome = await import("data:text/javascript;base64," + fontAwesomeScript);
        await initFontAwesome.default();
      })()
    );
  }`:""}
${t.useUnoCSS?`
  const unoCSSScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-uno-css');
  if (unoCSSScript) {
    tasks.push(
      (async () => {
        const initUnoCSS = await import("data:text/javascript;base64," + unoCSSScript);
        await initUnoCSS.default();
      })()
    );
  }`:""}
  tasks.length > 0 && await Promise.all(tasks);
};`:"",a=(t,e)=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
<template
  id="extrajs"
${t.useMermaid?`data-extrajs-mermaid-js="${btoa(u(t.mermaidUrl))}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${btoa(d(t.fontAwesomeUrl))}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${btoa(S(t.unoCSSUrl,t.unoCSSPresetIconCDN,e))}"`:""}
${`data-extrajs-init="${btoa(g(t))}"`}>
</template>`:"",p=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";var I={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function F(t,e){let r={};e.discardFrontMatter&&t.use(l.default,s=>{}),t.core.ruler.push("front_matter_to_env_for_estrajs",s=>{r=(0,y.default)(s.src).data.extrajs??{}});let o=t.renderer.render;t.renderer.render=function(...s){let i=r?{...r}:{},m={...I,...e,...i.disableMermaid?{useMermaid:!1}:{},...i.disableFontAwesome?{useFontAwesome:!1}:{},...i.disableUnoCSS?{useUnoCSS:!1}:{}};return o.apply(t.renderer,s)+a(m,i)+p(m)}}var w=F;var T=w;
//# sourceMappingURL=index.cjs.map
