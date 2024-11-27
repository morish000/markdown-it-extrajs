var a=(t="https://esm.sh/mermaid")=>`export default async () => {
    const mermaid = await import("${t}");
    mermaid.default.init();
};`,i=a;var p=(t="https://esm.sh/@fortawesome")=>`const extractIcons = (iconSet) => {
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
};`,o=p;var m=(t="https://esm.sh/@unocss",e="https://esm.sh/",n={})=>{let s={...n};return s.presetIcons&&(s.presetIcons.cdn=e),`
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
`},r=m;var c=t=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
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
};`:"",l=(t,e)=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
<template
  id="extrajs"
${t.useMermaid?`data-extrajs-mermaid-js="${btoa(i(t.mermaidUrl))}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${btoa(o(t.fontAwesomeUrl))}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${btoa(r(t.unoCSSUrl,t.unoCSSPresetIconCDN,e))}"`:""}
${`data-extrajs-init="${btoa(c(t))}"`}>
</template>`:"",w=t=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default();
  }
<\/script>`:"";export{w as createScriptTag,l as createTemplateTag,c as initAll};
//# sourceMappingURL=create-tags.mjs.map
