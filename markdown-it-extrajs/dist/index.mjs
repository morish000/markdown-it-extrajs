import S from"markdown-it-front-matter";import p from"gray-matter";var o={INIT_MERMAID:"dmFyIGk9YXN5bmModD17fSxhPXt9LGU9e30pPT57aWYodC5tZXJtYWlkVXJsKXtsZXQgcj1hd2FpdCBpbXBvcnQodC5tZXJtYWlkVXJsKTtyLmRlZmF1bHQuaW5pdGlhbGl6ZSgpLHIuZGVmYXVsdC5ydW4oKX19O2V4cG9ydHtpIGFzIGRlZmF1bHR9OwovLyMgc291cmNlTWFwcGluZ1VSTD1pbml0LW1lcm1haWQubWpzLm1hcAo=",INIT_FONT_AWESOME:"dmFyIG49bz0+T2JqZWN0LmVudHJpZXMobykuZmlsdGVyKChbcixzXSk9PnIhPT0icHJlZml4IiYmciE9PSJkZWZhdWx0IiYmdHlwZW9mIHMhPSJzdHJpbmciKS5tYXAoKFsscl0pPT5yKSxkPWFzeW5jKG89e30scj17fSxzPXt9KT0+e3RyeXtsZXRbZSxhLGMsaV09YXdhaXQgUHJvbWlzZS5hbGwoW2ltcG9ydChvLmZvbnRBd2Vzb21lVXJsKyIvZm9udGF3ZXNvbWUtc3ZnLWNvcmUiKSxpbXBvcnQoby5mb250QXdlc29tZVVybCsiL2ZyZWUtc29saWQtc3ZnLWljb25zIiksaW1wb3J0KG8uZm9udEF3ZXNvbWVVcmwrIi9mcmVlLXJlZ3VsYXItc3ZnLWljb25zIiksaW1wb3J0KG8uZm9udEF3ZXNvbWVVcmwrIi9mcmVlLWJyYW5kcy1zdmctaWNvbnMiKV0pLGY9Wy4uLm4oYSksLi4ubihjKSwuLi5uKGkpXTtpZihlLmNvbmZpZy5hdXRvQWRkQ3NzPSExLGUubGlicmFyeS5hZGQoLi4uZiksZS5kb20uaTJzdmcoKSxlLmRvbS53YXRjaCgpLCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZXh0cmFqcy1mb250YXdlc29tZSIpKXtsZXQgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzdHlsZSIpO3QuaWQ9ImV4dHJhanMtZm9udGF3ZXNvbWUiLHQudGV4dENvbnRlbnQ9ZS5kb20uY3NzKCksZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KSxuZXcgTXV0YXRpb25PYnNlcnZlcigoKT0+e3QmJnQudGV4dENvbnRlbnQ9PT0iIiYmKHQudGV4dENvbnRlbnQ9ZS5kb20uY3NzKCkpfSkub2JzZXJ2ZSh0LHtjaGFyYWN0ZXJEYXRhOiEwLGNoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSl9fWNhdGNoKGUpe3Rocm93IGV9fTtleHBvcnR7ZCBhcyBkZWZhdWx0fTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5pdC1mb250LWF3ZXNvbWUubWpzLm1hcAo=",INIT_UNO_CSS:"dmFyIGg9YXN5bmModD17fSxuPXt9LGk9e30pPT57bGV0IGU9ey4uLm59O2UucHJlc2V0SWNvbnMmJihlLnByZXNldEljb25zLmNkbj10LnVub0NTU1ByZXNldEljb25DRE4pO2xldFt7ZGVmYXVsdDpwfSx7ZGVmYXVsdDpvfSx7ZGVmYXVsdDp1fSx7ZGVmYXVsdDphfSx7ZGVmYXVsdDpsfSx7ZGVmYXVsdDpmfSx7ZGVmYXVsdDpTfSx7ZGVmYXVsdDpjfSx7ZGVmYXVsdDp5fSx7ZGVmYXVsdDptfV09YXdhaXQgUHJvbWlzZS5hbGwoW2ltcG9ydCh0LnVub0NTU1VybCsiL3J1bnRpbWUiKSxpbXBvcnQodC51bm9DU1NVcmwrIi9wcmVzZXQtaWNvbnMvYnJvd3NlciIpLGltcG9ydCh0LnVub0NTU1VybCsiL3ByZXNldC11bm8iKSxpbXBvcnQodC51bm9DU1NVcmwrIi9wcmVzZXQtd2luZCIpLGltcG9ydCh0LnVub0NTU1VybCsiL3ByZXNldC1taW5pIiksaW1wb3J0KHQudW5vQ1NTVXJsKyIvcHJlc2V0LWF0dHJpYnV0aWZ5IiksaW1wb3J0KHQudW5vQ1NTVXJsKyIvcHJlc2V0LXR5cG9ncmFwaHkiKSxpbXBvcnQodC51bm9DU1NVcmwrIi9wcmVzZXQtd2ViLWZvbnRzIiksaW1wb3J0KHQudW5vQ1NTVXJsKyIvcHJlc2V0LXRhZ2lmeSIpLGltcG9ydCh0LnVub0NTU1VybCsiL3ByZXNldC1yZW0tdG8tcHgiKV0pLHI9W107aWYoZS5wcmVzZXRXaW5kP3IucHVzaChhKGUucHJlc2V0V2luZCkpOmUucHJlc2V0TWluaT9yLnB1c2gobChlLnByZXNldE1pbmkpKTpyLnB1c2godSgpKSxlLnByZXNldEljb25zKXtsZXQgcz17Li4uZS5wcmVzZXRJY29uc307aT8ucHJlc2V0SWNvbnM/LmNvbGxlY3Rpb25zJiZ0LnVzZUJ1bmRsZUljb25pZnlKc29uJiYocy5hdXRvSW5zdGFsbD0hMSxzLmNvbGxlY3Rpb25zPWkucHJlc2V0SWNvbnMuY29sbGVjdGlvbnMpLHIucHVzaChvKHMpKX1lLnByZXNldEF0dHJpYnV0aWZ5JiZyLnB1c2goZihlLnByZXNldEF0dHJpYnV0aWZ5KSksZS5wcmVzZXRUeXBvZ3JhcGh5JiZyLnB1c2goUyhlLnByZXNldFR5cG9ncmFwaHkpKSxlLnByZXNldFdlYkZvbnRzJiZyLnB1c2goYyhlLnByZXNldFdlYkZvbnRzKSksZS5wcmVzZXRUYWdpZnkmJnIucHVzaCh5KGUucHJlc2V0VGFnaWZ5KSksZS5wcmVzZXRSZW1Ub1B4JiZyLnB1c2gobSgpKTtsZXQgZD1lLnJ1bGVzPz9bXTtwKHtkZWZhdWx0czp7cnVsZXM6ZCxwcmVzZXRzOnJ9fSl9O2V4cG9ydHtoIGFzIGRlZmF1bHR9OwovLyMgc291cmNlTWFwcGluZ1VSTD1pbml0LXVuby1jc3MubWpzLm1hcAo="};var l=t=>t.useMermaid||t.useFontAwesome||t.useUnoCSS?`
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
${t.useMermaid?`data-extrajs-mermaid-js="${o.INIT_MERMAID}"`:""}
${t.useFontAwesome?`data-extrajs-font-awesome="${o.INIT_FONT_AWESOME}"`:""}
${t.useUnoCSS?`data-extrajs-uno-css="${o.INIT_UNO_CSS}"`:""}
${`data-extrajs-init="${btoa(l(t))}"`}
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
<\/script>`:"";var Z={discardFrontMatter:!0,useMermaid:!1,mermaidUrl:"https://esm.sh/mermaid",useFontAwesome:!1,fontAwesomeUrl:"https://esm.sh/@fortawesome",useUnoCSS:!1,unoCSSUrl:"https://esm.sh/@unocss",unoCSSPresetIconCDN:"https://esm.sh/",outputScriptTag:!0};function u(t,e){let{renderer:{render:i},parse:d}=t,a={};e.discardFrontMatter&&t.use(S,n=>{}),t.parse=(n,s)=>(a=p(n).data.extrajs??{},d.call(t,n,s)),t.renderer.render=function(...n){let s={...Z,...e,...a.useMermaid?{}:{useMermaid:!1},...a.useFontAwesome?{}:{useFontAwesome:!1},...a.useUnoCSS?{}:{useUnoCSS:!1}};return i.apply(t.renderer,n)+m(s,a)+c(s,a)}}var r=u;var L=r;export{c as createScriptTag,m as createTemplateTag,L as default,l as initAll};
//# sourceMappingURL=index.mjs.map
