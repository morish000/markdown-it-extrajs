import g from"markdown-it-front-matter";import x from"gray-matter";var S=(t,e)=>`export default async (_ = {}) => {
    const mermaid = await import("${t.mermaidUrl}");
    mermaid.default.init();
};`,i=S;var l=(t,e)=>`const extractIcons = (iconSet) => {
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
            import("${t.fontAwesomeUrl}/fontawesome-svg-core"),
            import("${t.fontAwesomeUrl}/free-solid-svg-icons"),
            import("${t.fontAwesomeUrl}/free-regular-svg-icons"),
            import("${t.fontAwesomeUrl}/free-brands-svg-icons"),
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
};`,a=l;var d=(t,e={})=>{let r={...e};return r.presetIcons&&(r.presetIcons.cdn=t.unoCSSPresetIconCDN),`
import initUnocssRuntime from "${t.unoCSSUrl}/runtime";
import initPresetIcons from "${t.unoCSSUrl}/preset-icons/browser";
import initPresetUno from "${t.unoCSSUrl}/preset-uno";
import initPresetWind from "${t.unoCSSUrl}/preset-wind";
import initPresetMini from "${t.unoCSSUrl}/preset-mini";
import initPresetAttributify from "${t.unoCSSUrl}/preset-attributify";
import initPresetTypography from "${t.unoCSSUrl}/preset-typography";
import initPresetWebFonts from "${t.unoCSSUrl}/preset-web-fonts";
import initPresetTagify from "${t.unoCSSUrl}/preset-tagify";
import initPresetRemToPx from "${t.unoCSSUrl}/preset-rem-to-px";

const options = ${JSON.stringify(t)};
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
};
`},m=d;var y=t=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
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
${t.useMermaid?`data-extrajs-mermaid-js="${btoa(i(t,e))}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${btoa(a(t,e))}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${btoa(m(t,e))}"`:""}
${`data-extrajs-init="${btoa(y(t))}"`}>
</template>`:"",p=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";var w={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function C(t,e){let{renderer:{render:r},parse:u}=t,o={};e.discardFrontMatter&&t.use(g,s=>{}),t.parse=(s,n)=>(o=x(s).data.extrajs??{},u.call(t,s,n)),t.renderer.render=function(...s){let n={...w,...e,...o.useMermaid?{}:{useMermaid:!1},...o.useFontAwesome?{}:{useFontAwesome:!1},...o.useUnoCSS?{}:{useUnoCSS:!1}};return r.apply(t.renderer,s)+c(n,o)+p(n)}}var f=C;var T=f;export{p as createScriptTag,c as createTemplateTag,T as default,y as initAll};
//# sourceMappingURL=index.mjs.map
