---
marp: true
style: |
  pre.mermaid {
    all: unset;
  },
  .mermaid svg {
    max-height: 100% !important;
    max-width: 100% !important;
  }
extrajs:
  useMermaid: true
  useFontAwesome: true
  useUnoCSS: true
  presetIcons:
    autoInstall: true
    extraProperties:
      display: inline-block
  presetAttributify:
    prefix: "un-"
    prefixedOnly: true
    ignoreAttributes:
      - style
---

<h1>h1 tag escape.</h1>

# Title

---

# UnoCSS Attributes Mode

<div class="text-blue-500" un-cloak>
  This text will only be visible in blue color.
</div>
<div un-text="red-500" un-cloak>
  This text will only be visible in red color.
</div>
<div un-text-green="500" un-cloak>
  This text will only be visible in geen color.
</div>
<div un-text-yellow-500 un-cloak>
  This text will only be visible in yellow color.
</div>

---

# UnoCSS icons

<div class="i-ph-anchor-simple-thin"></div>
<div class="i-mdi-alarm text-orange-400"></div>
<div class="i-logos-vue text-3xl"></div>
<div class="i-carbon-sun dark:i-carbon-moon" un-cloak></div>
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"></div>
<div class="i-flagpack:jp"></div>
<div class="i-flagpack:us"></div>
<div class="i-tdesign:arrow-right-circle-filled"></div>
<div style="color: red;">
  <div class="i-fa6-solid:user"></div>
  <i class="i-fa6-solid:user"></i>
  <i class="i-fa6-regular:address-book"></i>
  <i class="i-fa6-brands:github"></i>
</div>

---

# Font Awesome

## Solid icons

- <i class="fas fa-alien"></i>
- <i class="fas fa-check-circle" style="margin-right: 10px; color: red;"></i>
- <i class="fas fa-user" style="margin-right: 10px; color: blue;"></i> Morish 000
- <i class="fas fa-envelope" style="margin-right: 10px; color: blue;"></i> morish000&#64;example.com
- <i class="fas fa-phone" style="margin-right: 10px; color: blue;"></i> 000-000-0000
- <i class="fas fa-fax" style="margin-right: 10px; color: blue;"></i> 000-000-0000

---

## Regular Icon

<i class="fa-regular fa-address-card"></i>

## Brand Icon

<i class="fa-brands fa-twitter"></i>

---

# Mermaid

<div style="display: flex;">
<pre class="mermaid" style="transform: translateX(0%) translateY(0%) scale(1.0);">
  graph TD
  A[Enter Chart Definition] --> B(Preview)
  B --> C{decide}
  C --> D[Keep]
  C --> E[Edit Definition]
  E --> B
  D --> F[Save Image and Code]
  F --> B
</pre>
</div>