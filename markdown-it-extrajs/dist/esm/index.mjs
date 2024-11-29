import w from"markdown-it-front-matter";import x from"gray-matter";var S=(e="https://esm.sh/mermaid")=>`export default async (_ = {}) => {
    const mermaid = await import("${e}");
    mermaid.default.init();
};`,c=S;var l=(e="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
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
};`,m=l;var g=(e="https://esm.sh/@unocss",t="https://esm.sh/",n={})=>{let o={...n};return o.presetIcons&&(o.presetIcons.cdn=t),`
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
`},p=g;var y=e=>e.useMermaid||e.useFontAwesome||e.useUnoCSS?`
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
};`:"",f=(e,t)=>e.useMermaid||e.useFontAwesome||e.useUnoCSS?`
<template
  id="extrajs"
${e.useMermaid?`data-extrajs-mermaid-js="${btoa(c(e.mermaidUrl))}"`:""}
${e.useFontAwesome?`data-extrajs-font-awesome="${btoa(m(e.fontAwesomeUrl))}"`:""}
${e.useUnoCSS?`data-extrajs-uno-css="${btoa(p(e.unoCSSUrl,e.unoCSSPresetIconCDN,t))}"`:""}
${`data-extrajs-init="${btoa(y(e))}"`}>
</template>`:"",u=e=>(e.useMermaid||e.useFontAwesome||e.useUnoCSS)&&e.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";var C={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function h(e,t){let{renderer:{render:n},parse:o}=e,i={};t.discardFrontMatter&&e.use(w,r=>{}),e.parse=(r,s)=>(i=x(r).data.extrajs??{},o.call(e,r,s)),e.renderer.render=function(...r){let s=i?{...i}:{},a={...C,...t,...s.useMermaid?{}:{useMermaid:!1},...s.useFontAwesome?{}:{useFontAwesome:!1},...s.useUnoCSS?{}:{useUnoCSS:!1}};return n.apply(e.renderer,r)+f(a,s)+u(a)}}var d=h;var k=d;export{u as createScriptTag,f as createTemplateTag,k as default,y as initAll};
//# sourceMappingURL=index.mjs.map
