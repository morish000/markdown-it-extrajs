var d={discardFrontMatter:!0,outputScriptTag:!0,useMermaid:!1,useFontAwesome:!1,useUnoCSS:!1,mermaidUrl:"https://esm.sh/mermaid",mermaidElkUrl:"https://esm.sh/@mermaid-js/layout-elk",fontAwesomeUrl:"https://esm.sh/@fortawesome",unoCSSUrl:"https://esm.sh/@unocss",iconifyJsonCDN:"https://esm.sh"};var l=async(r=d.unoCSSUrl)=>await import(`${r}/preset-icons/core`).then(s=>s.icons),g=(r=d.iconifyJsonCDN)=>s=>()=>import(`${r}/@iconify-json/${s}`).then(i=>i.icons);function y(r){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];var t=Array.from(typeof r=="string"?[r]:r);t[t.length-1]=t[t.length-1].replace(/\r?\n([\t ]*)$/,"");var p=t.reduce(function(n,e){var o=e.match(/\n([\t ]+|(?!\s).)/g);return o?n.concat(o.map(function(a){var m,c;return(c=(m=a.match(/[\t ]/g))===null||m===void 0?void 0:m.length)!==null&&c!==void 0?c:0})):n},[]);if(p.length){var u=new RegExp(`
[	 ]{`+Math.min.apply(Math,p)+"}","g");t=t.map(function(n){return n.replace(u,`
`)})}t[0]=t[0].replace(/^\r?\n/,"");var f=t[0];return s.forEach(function(n,e){var o=f.match(/(?:^|\n)( *)$/),a=o?o[1]:"",m=n;typeof n=="string"&&n.includes(`
`)&&(m=String(n).split(`
`).map(function(c,S){return S===0?c:""+a+c}).join(`
`)),f+=m+t[e+1]}),f}var E=async(r={},s={})=>{let i=function(t){let p=document.createElement("div");return t=encodeURIComponent(t).replace(/%26/g,"&").replace(/%23/g,"#").replace(/%3B/g,";"),p.innerHTML=t,decodeURIComponent(p.textContent)};if(r.mermaidUrl){let{default:t}=await import(r.mermaidUrl);if(r.mermaidElkUrl){let{default:e}=await import(r.mermaidElkUrl);t.registerLayoutLoaders(e)}let p=g(r.iconifyJsonCDN),u=await l(r.unoCSSUrl),f=()=>{let e=[];return u.forEach(o=>{e.push({name:o,loader:p(o)})}),e};t.registerIconPacks(f()),t.initialize({...s.mermaidConfig??{},startOnLoad:!1,suppressErrorRendering:!0}),document.querySelectorAll(".mermaid").forEach(async e=>{if(e.getAttribute("data-processed"))return;e.setAttribute("data-processed","true");let o=e.textContent;if(e.querySelectorAll("svg").forEach(a=>a.remove()),o){let a=await t.render(`mermaid-${crypto.randomUUID()}`,y(i(o)).trim().replace(/<br\s*\/?>/gi,"<br/>"));e.innerHTML=a.svg,a.bindFunctions?.(e)}})}};export{E as default};
//# sourceMappingURL=init-mermaid.mjs.map
