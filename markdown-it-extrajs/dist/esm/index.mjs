import y from"markdown-it-front-matter";import h from"gray-matter";var S=(t="https://esm.sh/mermaid")=>`export default async () => {
    const mermaid = await import("${t}");
    mermaid.default.init();
};`,a=S;var g=(t="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
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
};`,p=g;var l=(t="https://esm.sh/@unocss",r="https://esm.sh/",o={})=>{let e={...o};return e.presetIcons&&(e.presetIcons.cdn=r),`
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

const conf = ${JSON.stringify(e)};

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
`},m=l;var w=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
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
};`:"",c=(t,r)=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
<template
  id="extrajs"
${t.useMermaid?`data-extrajs-mermaid-js="${btoa(a(t.mermaidUrl))}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${btoa(p(t.fontAwesomeUrl))}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${btoa(m(t.unoCSSUrl,t.unoCSSPresetIconCDN,r))}"`:""}
${`data-extrajs-init="${btoa(w(t))}"`}>
</template>`:"",f=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";var x={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function C(t,r){r.discardFrontMatter&&t.use(y,e=>{}),t.core.ruler.push("front_matter_to_env_for_estrajs",e=>{e.env.extrajsConf=h(e.src).data.extrajs??{}});let o=t.renderer.render;t.renderer.render=function(e,u,i){let s=i.extrajsConf??{},n={...x,...r,...s.disableMermaid?{useMermaid:!1}:{},...s.disableFontAwesome?{useFontAwesome:!1}:{},...s.disableUnoCSS?{useUnoCSS:!1}:{}};return o.call(this,e,u,i)+c(n,s)+f(n)}}var d=C;var J=d;export{f as createScriptTag,c as createTemplateTag,J as default,w as initAll};
//# sourceMappingURL=index.mjs.map
