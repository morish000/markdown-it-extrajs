---
marp: true
style: |
  pre.mermaid {
    all: unset;
    max-height: 100% !important;
    max-width: 100% !important;
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
    extraProperties:
      display: inline-block
  presetAttributify:
    prefix: "un-"
    prefixedOnly: true
  presetTagify:
    prefix: "un-"
  rules:
    -
      - text-box-1
      - display: 'block'
        font-size: 48px
        color: white
        background-color: black
        padding: 50px
        border-radius: 16px
    -
      - text-box-2
      - display: block
        font-size: 48px
        color: red
        background-color: yellow
        padding: 50px
        border-radius: 16px
    -
      - red
      - display: inline
        color: red
    -
      - blue
      - display: inline
        color: blue
    -
      - danger
      - display: inline
        color: red
        font-weight: bold
    -
      - warning
      - display: inline
        color: blue
        font-weight: bold
    -
      - /^m-(.+)px-sample$/
      - margin: ${m}px
    -
      - /^p-(.+)px-sample$/
      - padding: ${m}px
---

# Title

---

# UnoCSS Attributes Mode

<div class="text-blue-500" un-cloak>
  <un-p-25px-sample>This text will only be visible in blue color.</un-p-25px-sample>
</div>
<div un-text="red-500" un-cloak>
  <un-p-50px-sample>This text will only be visible in red color.</un-p-50px-sample>
</div>
<div un-text-green="500" un-cloak>
  <un-m-75px-sample>This text will only be visible in geen color.</un-m-75px-sample>
</div>
<div un-text-yellow-500 un-cloak>
  <un-m-100px-sample>This text will only be visible in yellow color.</un-m-100px-sample>
</div>

---

# UnoCSS icons

<div>
  <div class="i-ph-anchor-simple-thin"></div>
  <div class="i-mdi-alarm text-orange-400"></div>
  <div class="i-logos-vue text-3xl"></div>
  <div class="i-carbon-sun dark:i-carbon-moon" un-cloak></div>
  <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"></div>
  <div class="i-flagpack:jp"></div>
  <div class="i-flagpack:us"></div>
  <div class="i-tdesign:arrow-right-circle-filled"></div>
</div>
<div style="color: red;">
  <div class="i-fa6-solid:user"></div>
  <i class="i-fa6-solid:user"></i>
  <i class="i-fa6-regular:address-book"></i>
  <i class="i-fa6-brands:github"></i>
</div>

---

# UnoCSS Rules(Attributes Mode)

<div un-text-box-1>
  This is a sample text with UnoCSS styles applied.
</div>
<div un-text-box-2>
  Sample 2.
</div>

---

# UnoCSS(Tagify Mode: block)

<un-text-box-1>
  This is a sample text with UnoCSS styles applied.
</un-text-box-1>
<un-text-box-2>
  Sample 2.
</un-text-box-2>

---

# UnoCSS(Tagify Mode: inline)

Please proceed with caution as <un-danger>danger!!</un-danger> zones can cause severe injuries. Make sure to follow the instructions carefully to avoid any <un-warning>warning!</un-warning> signs. Areas marked with <un-red>color red</un-red> indicate critical errors, while <un-blue>color blue</un-blue> denotes informational content.

---

# Font Awesome

## Solid icons

- <i class="fas fa-alien"></i>
- <i class="fas fa-check-circle" style="margin-right: 10px; color: red;"></i>
- <i class="fas fa-user" style="margin-right: 10px; color: blue;"></i>Morish 000
- <i class="fas fa-envelope" style="margin-right: 10px; color: blue;"></i>morish000@example.com
- <i class="fas fa-phone" style="margin-right: 10px; color: blue;"></i>000-000-0000
- <i class="fas fa-fax" style="margin-right: 10px; color: blue;"></i>000-000-0000

---

## Regular Icon

<i class="fa-regular fa-address-card"></i>

## Brand Icon

<i class="fa-brands fa-twitter"></i>

---

# Mermaid(sequence)

<pre class="mermaid" style="background-color: white;">
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
</pre>

---

# Mermaid(flowchart: use ELK)

<pre class="mermaid" style="background-color: white;">
%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
flowchart TD
  A[Enter Chart Definition] --> B(Preview)
  B --> C{decide}
  C --> D[Keep]
  C --> E[Edit Definition]
  E --> B
  D --> F[Save Image and <br/> Code]
  F --> B
</pre>

---

# Mermaid(architecture: use icon)

<pre class="mermaid" style="background-color: white;">
architecture-beta
    group api(logos:aws-lambda)[API]

    service db(logos:aws-aurora)[Database] in api
    service disk1(logos:aws-glacier)[Storage] in api
    service disk2(logos:aws-s3)[Storage] in api
    service server(logos:aws-ec2)[Server] in api

    db:L -- R:server
    disk1:T -- B:server
    disk2:T -- B:db
</pre>
