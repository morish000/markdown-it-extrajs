var l=async(r={},n={})=>{try{let[t,a,i,c]=await Promise.all([import(r.fontAwesomeUrl+"/fontawesome-svg-core"),import(r.fontAwesomeUrl+"/free-solid-svg-icons"),import(r.fontAwesomeUrl+"/free-regular-svg-icons"),import(r.fontAwesomeUrl+"/free-brands-svg-icons")]),s=e=>Object.entries(e).filter(([o,m])=>o!=="prefix"&&o!=="default"&&typeof m!="string").map(([,o])=>o),f=[...s(a),...s(i),...s(c)];if(["familyPrefix","cssPrefix","styleDefault","familyDefault","replacementClass","autoReplaceSvg","autoA11y","searchPseudoElements","keepOriginalSource","measurePerformance","mutateApproach","showMissingIcons"].forEach(e=>n.fontAwesomeConfig?.[e]&&(t.config[e]=n.fontAwesomeConfig[e])),t.config.observeMutations=!1,t.config.autoAddCss=!1,t.library.add(...f),t.dom.i2svg(),!document.getElementById("extrajs-fontawesome")){let e=document.createElement("style");e.id="extrajs-fontawesome",e.textContent=t.dom.css(),document.head.appendChild(e),new MutationObserver(()=>{e&&e.textContent===""&&(e.textContent=t.dom.css())}).observe(e,{characterData:!0,childList:!0,subtree:!0})}}catch(t){throw t}};export{l as default};
//# sourceMappingURL=init-font-awesome.mjs.map
