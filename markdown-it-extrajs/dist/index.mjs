var u=Object.defineProperty;var f=(t,e)=>()=>(t&&(e=t(t=0)),e);var l=(t,e)=>{for(var s in e)u(t,s,{get:e[s],enumerable:!0})};var i={};l(i,{default:()=>M});async function E(t){let e=await Deno.readFile(t);return btoa(new TextDecoder().decode(e))}var I,o,M,S=f(async()=>{I={"SRC_BASE64.INIT_MERMAID":"dist/init-mermaid.mjs","SRC_BASE64.INIT_FONT_AWESOME":"dist/init-font-awesome.mjs","SRC_BASE64.INIT_UNO_CSS":"dist/init-uno-css.mjs"},o={};for(let[t,e]of Object.entries(I))o[`${t}`]=`"${await E(e)}"`;globalThis.SRC_BASE64={INIT_MERMAID:o["SRC_BASE64.INIT_MERMAID"],INIT_FONT_AWESOME:o["SRC_BASE64.INIT_FONT_AWESOME"],INIT_UNO_CSS:o["SRC_BASE64.INIT_UNO_CSS"]};M=o});import g from"markdown-it-front-matter";import A from"gray-matter";typeof SRC_BASE64>"u"&&await S().then(()=>i);var _=t=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
export default async (options = {}, frontMatter = {}, _conf = {}) => {
  const tasks = [];
${t.useMermaid?`
  const mermaidScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-mermaid-js');
  if (mermaidScript) {
    tasks.push(
      (async () => {
        const initMermaid = await import("data:text/javascript;base64," + mermaidScript);
        await initMermaid.default(options, frontMatter, _conf);
      })()
    );
  }`:""}
${t.useFontAwesome?`
  const fontAwesomeScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-font-awesome');
  if (fontAwesomeScript) {
    tasks.push(
      (async () => {
        const initFontAwesome = await import("data:text/javascript;base64," + fontAwesomeScript);
        await initFontAwesome.default(options, frontMatter, _conf);
      })()
    );
  }`:""}
${t.useUnoCSS?`
  const unoCSSScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-uno-css');
  if (unoCSSScript) {
    tasks.push(
      (async () => {
        const initUnoCSS = await import("data:text/javascript;base64," + unoCSSScript);
        await initUnoCSS.default(options, frontMatter, _conf);
      })()
    );
  }`:""}
  tasks.length > 0 && await Promise.all(tasks);
};`:"",m=(t,e)=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
<template
  id="extrajs"
${t.useMermaid?'data-extrajs-mermaid-js="dmFyIGk9YXN5bmModD17fSxhPXt9LGU9e30pPT57aWYodC5tZXJtYWlkVXJsKXtsZXQgcj1hd2FpdCBpbXBvcnQodC5tZXJtYWlkVXJsKTtyLmRlZmF1bHQuaW5pdGlhbGl6ZSgpLHIuZGVmYXVsdC5ydW4oKX19O2V4cG9ydHtpIGFzIGRlZmF1bHR9OwovLyMgc291cmNlTWFwcGluZ1VSTD1pbml0LW1lcm1haWQubWpzLm1hcAo="':""}
${t.useFontAwesome?'data-extrajs-font-awesome="dmFyIG49bz0+T2JqZWN0LmVudHJpZXMobykuZmlsdGVyKChbcixzXSk9PnIhPT0icHJlZml4IiYmciE9PSJkZWZhdWx0IiYmdHlwZW9mIHMhPSJzdHJpbmciKS5tYXAoKFsscl0pPT5yKSxkPWFzeW5jKG89e30scj17fSxzPXt9KT0+e3RyeXtsZXRbe2RlZmF1bHQ6ZX0se2RlZmF1bHQ6YX0se2RlZmF1bHQ6Y30se2RlZmF1bHQ6Zn1dPWF3YWl0IFByb21pc2UuYWxsKFtpbXBvcnQoby5mb250QXdlc29tZVVybCsiL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlIiksaW1wb3J0KG8uZm9udEF3ZXNvbWVVcmwrIi9mcmVlLXNvbGlkLXN2Zy1pY29ucyIpLGltcG9ydChvLmZvbnRBd2Vzb21lVXJsKyIvZnJlZS1yZWd1bGFyLXN2Zy1pY29ucyIpLGltcG9ydChvLmZvbnRBd2Vzb21lVXJsKyIvZnJlZS1icmFuZHMtc3ZnLWljb25zIildKSxpPVsuLi5uKGEpLC4uLm4oYyksLi4ubihmKV07aWYoZS5jb25maWcuYXV0b0FkZENzcz0hMSxlLmxpYnJhcnkuYWRkKC4uLmkpLGUuZG9tLmkyc3ZnKCksZS5kb20ud2F0Y2goKSwhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImV4dHJhanMtZm9udGF3ZXNvbWUiKSl7bGV0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic3R5bGUiKTt0LmlkPSJleHRyYWpzLWZvbnRhd2Vzb21lIix0LnRleHRDb250ZW50PWUuZG9tLmNzcygpLGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCksbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCk9Pnt0JiZ0LnRleHRDb250ZW50PT09IiImJih0LnRleHRDb250ZW50PWUuZG9tLmNzcygpKX0pLm9ic2VydmUodCx7Y2hhcmFjdGVyRGF0YTohMCxjaGlsZExpc3Q6ITAsc3VidHJlZTohMH0pfX1jYXRjaChlKXt0aHJvdyBlfX07ZXhwb3J0e2QgYXMgZGVmYXVsdH07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPWluaXQtZm9udC1hd2Vzb21lLm1qcy5tYXAK"':""}
${t.useUnoCSS?'data-extrajs-uno-css="dmFyIGg9YXN5bmModD17fSxuPXt9LGk9e30pPT57bGV0IGU9ey4uLm59O2UucHJlc2V0SWNvbnMmJihlLnByZXNldEljb25zLmNkbj10LnVub0NTU1ByZXNldEljb25DRE4pO2xldFt7ZGVmYXVsdDpwfSx7ZGVmYXVsdDpvfSx7ZGVmYXVsdDp1fSx7ZGVmYXVsdDphfSx7ZGVmYXVsdDpsfSx7ZGVmYXVsdDpmfSx7ZGVmYXVsdDpTfSx7ZGVmYXVsdDpjfSx7ZGVmYXVsdDp5fSx7ZGVmYXVsdDptfV09YXdhaXQgUHJvbWlzZS5hbGwoW2ltcG9ydCh0LnVub0NTU1VybCsiL3J1bnRpbWUiKSxpbXBvcnQodC51bm9DU1NVcmwrIi9wcmVzZXQtaWNvbnMvYnJvd3NlciIpLGltcG9ydCh0LnVub0NTU1VybCsiL3ByZXNldC11bm8iKSxpbXBvcnQodC51bm9DU1NVcmwrIi9wcmVzZXQtd2luZCIpLGltcG9ydCh0LnVub0NTU1VybCsiL3ByZXNldC1taW5pIiksaW1wb3J0KHQudW5vQ1NTVXJsKyIvcHJlc2V0LWF0dHJpYnV0aWZ5IiksaW1wb3J0KHQudW5vQ1NTVXJsKyIvcHJlc2V0LXR5cG9ncmFwaHkiKSxpbXBvcnQodC51bm9DU1NVcmwrIi9wcmVzZXQtd2ViLWZvbnRzIiksaW1wb3J0KHQudW5vQ1NTVXJsKyIvcHJlc2V0LXRhZ2lmeSIpLGltcG9ydCh0LnVub0NTU1VybCsiL3ByZXNldC1yZW0tdG8tcHgiKV0pLHI9W107aWYoZS5wcmVzZXRXaW5kP3IucHVzaChhKGUucHJlc2V0V2luZCkpOmUucHJlc2V0TWluaT9yLnB1c2gobChlLnByZXNldE1pbmkpKTpyLnB1c2godSgpKSxlLnByZXNldEljb25zKXtsZXQgcz17Li4uZS5wcmVzZXRJY29uc307aT8ucHJlc2V0SWNvbnM/LmNvbGxlY3Rpb25zJiZ0LnVzZUJ1bmRsZUljb25pZnlKc29uJiYocy5hdXRvSW5zdGFsbD0hMSxzLmNvbGxlY3Rpb25zPWkucHJlc2V0SWNvbnMuY29sbGVjdGlvbnMpLHIucHVzaChvKHMpKX1lLnByZXNldEF0dHJpYnV0aWZ5JiZyLnB1c2goZihlLnByZXNldEF0dHJpYnV0aWZ5KSksZS5wcmVzZXRUeXBvZ3JhcGh5JiZyLnB1c2goUyhlLnByZXNldFR5cG9ncmFwaHkpKSxlLnByZXNldFdlYkZvbnRzJiZyLnB1c2goYyhlLnByZXNldFdlYkZvbnRzKSksZS5wcmVzZXRUYWdpZnkmJnIucHVzaCh5KGUucHJlc2V0VGFnaWZ5KSksZS5wcmVzZXRSZW1Ub1B4JiZyLnB1c2gobSgpKTtsZXQgZD1lLnJ1bGVzPz9bXTtwKHtkZWZhdWx0czp7cnVsZXM6ZCxwcmVzZXRzOnJ9fSl9O2V4cG9ydHtoIGFzIGRlZmF1bHR9OwovLyMgc291cmNlTWFwcGluZ1VSTD1pbml0LXVuby1jc3MubWpzLm1hcAo="':""}
${`data-extrajs-init="${btoa(_(t))}"`}
${`data-extrajs-options="${btoa("export default"+JSON.stringify(t))}"`}
${`data-extrajs-frontMatter="${btoa("export default"+JSON.stringify(e))}"`}>
</template>`:"",c=(t,e)=>(t.useMermaid||t.useFontAwesome||t.useUnoCSS)&&t.outputScriptTag?`
<script type="module">
  const initScript = document.getElementById('extrajs')?.getAttribute('data-extrajs-init');
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default(
      ${JSON.stringify(t)},
      ${JSON.stringify(e)},
      {}
    );
  }
<\/script>`:"";var C={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function w(t,e){let{renderer:{render:s},parse:p}=t,r={};e.discardFrontMatter&&t.use(g,a=>{}),t.parse=(a,n)=>(r=A(a).data.extrajs??{},p.call(t,a,n)),t.renderer.render=function(...a){let n={...C,...e,...r.useMermaid?{}:{useMermaid:!1},...r.useFontAwesome?{}:{useFontAwesome:!1},...r.useUnoCSS?{}:{useUnoCSS:!1}};return s.apply(t.renderer,a)+m(n,r)+c(n,r)}}var d=w;var $=d;export{c as createScriptTag,m as createTemplateTag,$ as default,_ as initAll};
//# sourceMappingURL=index.mjs.map
