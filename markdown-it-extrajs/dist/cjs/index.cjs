var x=Object.create;var n=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,$=Object.prototype.hasOwnProperty;var A=(t,e)=>{for(var r in e)n(t,r,{get:e[r],enumerable:!0})},f=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of b(e))!$.call(t,o)&&o!==r&&n(t,o,{get:()=>e[o],enumerable:!(s=C(e,o))||s.enumerable});return t};var u=(t,e,r)=>(r=t!=null?x(P(t)):{},f(e||!t||!t.__esModule?n(r,"default",{value:t,enumerable:!0}):r,t)),U=t=>f(n({},"__esModule",{value:!0}),t);var J={};A(J,{createScriptTag:()=>m,createTemplateTag:()=>a,default:()=>E,initAll:()=>l});module.exports=U(J);var y=u(require("markdown-it-front-matter")),w=u(require("gray-matter"));var v=(t="https://esm.sh/mermaid")=>`export default async () => {
    const mermaid = await import("${t}");
    mermaid.default.init();
};`,d=v;var I=(t="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
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
};`,S=I;var M=(t="https://esm.sh/@unocss",e="https://esm.sh/",r={})=>{let s={...r};return s.presetIcons&&(s.presetIcons.cdn=e),`
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

const conf = ${JSON.stringify(s)};

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
`},g=M;var l=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
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
  const unoCSSScript = document.getElementById('extrajs').getAttribute('data-extrajs-uno-css');
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
${t.useMermaid?`data-extrajs-mermaid-js="${btoa(d(t.mermaidUrl))}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${btoa(S(t.fontAwesomeUrl))}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${btoa(g(t.unoCSSUrl,t.unoCSSPresetIconCDN,e))}"`:""}
${`data-extrajs-init="${btoa(l(t))}"`}>
</template>`:"",m=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";var F={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function T(t,e){e.discardFrontMatter&&t.use(y.default,s=>{}),t.core.ruler.push("front_matter_to_env_for_estrajs",s=>{s.env.extrajsConf=(0,w.default)(s.src).data.extrajs??{}});let r=t.renderer.render;t.renderer.render=function(s,o,p){let i=p.extrajsConf??{},c={...F,...e,...i.disableMermaid?{useMermaid:!1}:{},...i.disableFontAwesome?{useFontAwesome:!1}:{},...i.disableUnoCSS?{useUnoCSS:!1}:{}};return r.call(this,s,o,p)+a(c,i)+m(c)}}var h=T;var E=h;
//# sourceMappingURL=index.cjs.map
