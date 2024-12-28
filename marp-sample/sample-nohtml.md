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
    -
      - /^p-(\d+)m-(\d+)px$/
      - padding: ${m[1]}px
        margin: ${m[2]}px
  preflightStyle: |
    div.preflight-g {
      color: green;
    }
    div.preflight-y {
      color: yellow;
    }
---

# Title

---

# UnoCSS Attributes Mode

::: div { .text-blue-500 }
  ==This text will only be visible in blue color.=={ .p-25px-sample }
:::
::: div { .text-red-500 }
  ==This text will only be visible in red color.=={ .m-50px-sample }
:::
::: div { .text-green-500 }
  ==This text will only be visible in geen color.=={ .p-50px-sample .m-50px-sample }
:::
::: div { .text-yellow-500 }
  ==This text will only be visible in yellow color.=={ .p-50m-50px }
:::

---

# UnoCSS icons

::: div
::: div { .i-ph-anchor-simple-thin }
:::
::: div { .i-mdi-alarm .text-orange-400 }
:::
::: div { .i-logos-vue .text-3xl }
:::
::: div { .i-carbon-sun .dark:i-carbon-moon }
:::
::: div { .i-twemoji-grinning-face-with-smiling-eyes .hover:i-twemoji-face-with-tears-of-joy }
:::
::: div { .i-flagpack:jp }
:::
::: div { .i-flagpack:us }
:::
::: div { .i-tdesign:arrow-right-circle-filled }
:::
:::
::: div { style="color: red;" }
::: div { .i-fa6-solid:user }
:::
@@!{ .i-fa6-solid:user }@@!{ .i-fa6-regular:address-book }@@!{ .i-fa6-brands:github }
:::

---

# UnoCSS Rules(Attributes Mode)

::: div { .text-box-1 }
  This is a sample text with UnoCSS styles applied.
:::
::: div { .text-box-2 }
  Sample 2.
:::

---

# UnoCSS(Tagify Mode: block)

::: div { .text-box-1 }
  This is a sample text with UnoCSS styles applied.
:::
::: div { .text-box-2 }
  Sample 2.
:::

---

# UnoCSS(Tagify Mode: inline)

Please proceed with caution as ==danger!!=={ .danger } zones can cause severe injuries. Make sure to follow the instructions carefully to avoid any ==warning!=={ .warning } signs. Areas marked with ==color red=={ .red } indicate critical errors, while ==color blue=={ .blue } denotes informational content.

---

# Font Awesome

## Solid icons

- @@!{ .fas .fa-alien }
- @@!{ .fas .fa-check-circle style="margin-right: 10px; color: red;" }
- @@!{ .fas .fa-user style="margin-right: 10px; color: blue;" }Morish 000
- @@!{ .fas .fa-envelope style="margin-right: 10px; color: blue;" }morish000@example.com
- @@!{ .fas .fa-phone style="margin-right: 10px; color: blue;" }000-000-0000
- @@!{ .fas .fa-fax style="margin-right: 10px; color: blue;" }000-000-0000

---

## Regular Icon

@@!{ .fa-regular .fa-address-card }

## Brand Icon

@@!{ .fa-brands .fa-twitter }

---

# Mermaid(sequence)

[[[ pre { .mermaid style="background-color: white;" }
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
]]]

---

# Mermaid(flowchart: use ELK)

[[[ pre { .mermaid style="background-color: white;" }
%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
flowchart TD
  A[Enter Chart Definition] --> B(Preview)
  B --> C{decide}
  C --> D[Keep]
  C --> E[Edit Definition]
  E --> B
  D --> F[Save Image and <br/> Code]
  F --> B
]]]

---

# Mermaid(architecture: use icon)

[[[ pre { .mermaid style="background-color: white;" }
architecture-beta
    group api(logos:aws-lambda)[API]

    service db(logos:aws-aurora)[Database] in api
    service disk1(logos:aws-glacier)[Storage] in api
    service disk2(logos:aws-s3)[Storage] in api
    service server(logos:aws-ec2)[Server] in api

    db:L -- R:server
    disk1:T -- B:server
    disk2:T -- B:db
]]]

---

# KaTex

Inline math: $x^2$

Math block:

$$
\displaystyle
\left( \sum_{k=1}^n a_k b_k \right)^2
\leq
\left( \sum_{k=1}^n a_k^2 \right)
\left( \sum_{k=1}^n b_k^2 \right)
$$

---

# preflight

::: div { .preflight-g }
This text will turn green.
:::
::: div { .preflight-y }
This text will turn yellow.
:::