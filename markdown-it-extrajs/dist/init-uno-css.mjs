var h=async(t={},n={},i={})=>{let e={...n};e.presetIcons&&(e.presetIcons.cdn=t.unoCSSPresetIconCDN);let[{default:p},{default:o},{default:u},{default:a},{default:l},{default:f},{default:S},{default:c},{default:y},{default:m}]=await Promise.all([import(t.unoCSSUrl+"/runtime"),import(t.unoCSSUrl+"/preset-icons/browser"),import(t.unoCSSUrl+"/preset-uno"),import(t.unoCSSUrl+"/preset-wind"),import(t.unoCSSUrl+"/preset-mini"),import(t.unoCSSUrl+"/preset-attributify"),import(t.unoCSSUrl+"/preset-typography"),import(t.unoCSSUrl+"/preset-web-fonts"),import(t.unoCSSUrl+"/preset-tagify"),import(t.unoCSSUrl+"/preset-rem-to-px")]),r=[];if(e.presetWind?r.push(a(e.presetWind)):e.presetMini?r.push(l(e.presetMini)):r.push(u()),e.presetIcons){let s={...e.presetIcons};i?.presetIcons?.collections&&t.useBundleIconifyJson&&(s.autoInstall=!1,s.collections=i.presetIcons.collections),r.push(o(s))}e.presetAttributify&&r.push(f(e.presetAttributify)),e.presetTypography&&r.push(S(e.presetTypography)),e.presetWebFonts&&r.push(c(e.presetWebFonts)),e.presetTagify&&r.push(y(e.presetTagify)),e.presetRemToPx&&r.push(m());let d=e.rules??[];p({defaults:{rules:d,presets:r}})};export{h as default};
//# sourceMappingURL=init-uno-css.mjs.map
