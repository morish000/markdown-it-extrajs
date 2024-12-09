var h={discardFrontMatter:!0,outputScriptTag:!0,useMermaid:!1,useFontAwesome:!1,useUnoCSS:!1,mermaidUrl:"https://esm.sh/mermaid",mermaidElkUrl:"https://esm.sh/@mermaid-js/layout-elk",fontAwesomeUrl:"https://esm.sh/@fortawesome",unoCSSUrl:"https://esm.sh/@unocss",iconifyJsonCDN:"https://esm.sh"};var f=async(e=h.unoCSSUrl)=>await import(`${e}/preset-icons/core`).then(t=>t.icons),y=(e=h.iconifyJsonCDN)=>t=>()=>import(`${e}/@iconify-json/${t}`).then(o=>o.icons);function b(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];var r=Array.from(typeof e=="string"?[e]:e);r[r.length-1]=r[r.length-1].replace(/\r?\n([\t ]*)$/,"");var p=r.reduce(function(c,i){var n=i.match(/\n([\t ]+|(?!\s).)/g);return n?c.concat(n.map(function(m){var u,s;return(s=(u=m.match(/[\t ]/g))===null||u===void 0?void 0:u.length)!==null&&s!==void 0?s:0})):c},[]);if(p.length){var d=new RegExp(`
[	 ]{`+Math.min.apply(Math,p)+"}","g");r=r.map(function(c){return c.replace(d,`
`)})}r[0]=r[0].replace(/^\r?\n/,"");var l=r[0];return t.forEach(function(c,i){var n=l.match(/(?:^|\n)( *)$/),m=n?n[1]:"",u=c;typeof c=="string"&&c.includes(`
`)&&(u=String(c).split(`
`).map(function(s,S){return S===0?s:""+m+s}).join(`
`)),l+=u+r[i+1]}),l}var g,R=new Uint8Array(16);function v(){if(!g&&(g=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!g))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return g(R)}var a=[];for(let e=0;e<256;++e)a.push((e+256).toString(16).slice(1));function E(e,t=0){return a[e[t+0]]+a[e[t+1]]+a[e[t+2]]+a[e[t+3]]+"-"+a[e[t+4]]+a[e[t+5]]+"-"+a[e[t+6]]+a[e[t+7]]+"-"+a[e[t+8]]+a[e[t+9]]+"-"+a[e[t+10]]+a[e[t+11]]+a[e[t+12]]+a[e[t+13]]+a[e[t+14]]+a[e[t+15]]}var D=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),U={randomUUID:D};function L(e,t,o){if(U.randomUUID&&!t&&!e)return U.randomUUID();e=e||{};let r=e.random||(e.rng||v)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){o=o||0;for(let p=0;p<16;++p)t[o+p]=r[p];return t}return E(r)}var C=L;var P=async(e={},t={})=>{let o=function(r){let p=document.createElement("div");return r=encodeURIComponent(r).replace(/%26/g,"&").replace(/%23/g,"#").replace(/%3B/g,";"),p.innerHTML=r,decodeURIComponent(p.textContent)};if(e.mermaidUrl){let{default:r}=await import(e.mermaidUrl);if(e.mermaidElkUrl){let{default:n}=await import(e.mermaidElkUrl);r.registerLayoutLoaders(n)}let p=y(e.iconifyJsonCDN),d=await f(e.unoCSSUrl),l=()=>{let n=[];return d.forEach(m=>{n.push({name:m,loader:p(m)})}),n};r.registerIconPacks(l()),r.initialize({...t.mermaidConfig??{},startOnLoad:!1,suppressErrorRendering:!0});let i=Array.from(document.querySelectorAll(".mermaid")).map(async n=>{if(n.getAttribute("data-processed"))return;n.setAttribute("data-processed","true");let m=n.innerHTML;if(n.querySelectorAll("svg").forEach(u=>u.remove()),m){let u=`mermaid-${C()}`,s=await r.render(u,b(o(m)).trim().replace(/<br\s*\/?>/gi,"<br/>"));n.innerHTML=s.svg,s.bindFunctions?.(n)}}).map(n=>n.catch(m=>console.error(m)));await Promise.all(i)}};var O=async(e={},t={})=>{try{let[o,r,p,d]=await Promise.all([import(e.fontAwesomeUrl+"/fontawesome-svg-core"),import(e.fontAwesomeUrl+"/free-solid-svg-icons"),import(e.fontAwesomeUrl+"/free-regular-svg-icons"),import(e.fontAwesomeUrl+"/free-brands-svg-icons")]),l=i=>Object.entries(i).filter(([n,m])=>n!=="prefix"&&n!=="default"&&typeof m!="string").map(([,n])=>n),c=[...l(r),...l(p),...l(d)];if(["familyPrefix","cssPrefix","styleDefault","familyDefault","replacementClass","autoReplaceSvg","autoA11y","searchPseudoElements","keepOriginalSource","measurePerformance","mutateApproach","showMissingIcons"].forEach(i=>t.fontAwesomeConfig?.[i]&&(o.config[i]=t.fontAwesomeConfig[i])),o.config.observeMutations=!1,o.config.autoAddCss=!1,o.library.add(...c),o.dom.i2svg(),!document.getElementById("extrajs-fontawesome")){let i=document.createElement("style");i.id="extrajs-fontawesome",i.textContent=o.dom.css(),document.head.appendChild(i),new MutationObserver(()=>{i&&i.textContent===""&&(i.textContent=o.dom.css())}).observe(i,{characterData:!0,childList:!0,subtree:!0})}}catch(o){throw o}};var J=async(e={},t={})=>{let[{default:o},{default:r},{default:p},{default:d},{default:l},{default:c},{default:i},{default:n},{default:m},{default:u}]=await Promise.all([import(e.unoCSSUrl+"/runtime"),t.presetWind?import(e.unoCSSUrl+"/preset-wind"):Promise.resolve({}),!t.presetWind&&t.presetMini?import(e.unoCSSUrl+"/preset-mini"):Promise.resolve({}),!t.presetWind&&!t.presetMini?import(e.unoCSSUrl+"/preset-uno"):Promise.resolve({}),t.presetIcons?import(e.unoCSSUrl+"/preset-icons/browser"):Promise.resolve({}),t.presetAttributify?import(e.unoCSSUrl+"/preset-attributify"):Promise.resolve({}),t.presetTypography?import(e.unoCSSUrl+"/preset-typography"):Promise.resolve({}),t.presetWebFonts?import(e.unoCSSUrl+"/preset-web-fonts"):Promise.resolve({}),t.presetTagify?import(e.unoCSSUrl+"/preset-tagify"):Promise.resolve({}),t.presetRemToPx?import(e.unoCSSUrl+"/preset-rem-to-px"):Promise.resolve({})]),s=[];if(t.presetWind?s.push(r(t.presetWind)):t.presetMini?s.push(p(t.presetMini)):s.push(d()),t.presetIcons){let x={...t.presetIcons},F=y(e.iconifyJsonCDN),T=await f(e.unoCSSUrl),A=()=>{let I={};return T.forEach(w=>{I[w]=F(w)}),I};x.autoInstall=!1,x.collections={...A()},s.push(l(x))}t.presetAttributify&&s.push(c(t.presetAttributify)),t.presetTypography&&s.push(i(t.presetTypography)),t.presetWebFonts&&s.push(n(t.presetWebFonts)),t.presetTagify&&s.push(m(t.presetTagify)),t.presetRemToPx&&s.push(u());let S=t.rules??[];o({defaults:{rules:S,presets:s}})};var ie=async(e={},t={})=>{let o=[];e.useMermaid&&o.push(P(e,t)),e.useFontAwesome&&o.push(O(e,t)),e.useUnoCSS&&o.push(J(e,t)),o.length>0&&await Promise.all(o)};export{ie as initAll};
//# sourceMappingURL=init-all.mjs.map
