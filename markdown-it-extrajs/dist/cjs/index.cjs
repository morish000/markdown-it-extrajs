var C=Object.create;var a=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var A=(t,e)=>{for(var s in e)a(t,s,{get:e[s],enumerable:!0})},f=(t,e,s,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of b(e))!v.call(t,r)&&r!==s&&a(t,r,{get:()=>e[r],enumerable:!(o=h(e,r))||o.enumerable});return t};var u=(t,e,s)=>(s=t!=null?C(I(t)):{},f(e||!t||!t.__esModule?a(s,"default",{value:t,enumerable:!0}):s,t)),M=t=>f(a({},"__esModule",{value:!0}),t);var J={};A(J,{createScriptTag:()=>m,createTemplateTag:()=>c,default:()=>T,initAll:()=>g});module.exports=M(J);var y=u(require("markdown-it-front-matter")),w=u(require("gray-matter"));var P=(t="https://esm.sh/mermaid")=>`export default async (_ = {}) => {
    const mermaid = await import("${t}");
    mermaid.default.init();
};`,d=P;var $=(t="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
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
};`,S=$;var U=(t="https://esm.sh/@unocss",e="https://esm.sh/",s={})=>{let o={...s};return o.presetIcons&&(o.presetIcons.cdn=e),`
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
`},l=U;var g=t=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
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
};`:"",c=(t,e)=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
<template
  id="extrajs"
${t.useMermaid?`data-extrajs-mermaid-js="${btoa(d(t.mermaidUrl))}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${btoa(S(t.fontAwesomeUrl))}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${btoa(l(t.unoCSSUrl,t.unoCSSPresetIconCDN,e))}"`:""}
${`data-extrajs-init="${btoa(g(t))}"`}>
</template>`:"",m=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";var E={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function F(t,e){let{renderer:{render:s},parse:o}=t,r={};e.discardFrontMatter&&t.use(y.default,i=>{}),t.parse=(i,n)=>(r=(0,w.default)(i).data.extrajs??{},o.call(t,i,n)),t.renderer.render=function(...i){let n=r?{...r}:{},p={...E,...e,...n.useMermaid?{}:{useMermaid:!1},...n.useFontAwesome?{}:{useFontAwesome:!1},...n.useUnoCSS?{}:{useUnoCSS:!1}};return s.apply(t.renderer,i)+c(p,n)+m(p)}}var x=F;var T=x;
//# sourceMappingURL=index.cjs.map
