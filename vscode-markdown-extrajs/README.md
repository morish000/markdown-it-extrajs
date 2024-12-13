# MarkdownIt Extra JS Plugin For VSCode

This project is currently under development. It is not yet ready for official
release, and the functionality or API may change.

# Overview

This project is designed to enable JavaScript for [UnoCSS](https://unocss.dev/),
[Mermaid](https://mermaid.js.org/), and [Font Awesome](https://fontawesome.com/)
in Markdown and Marp.

This works only in an online environment because it loads JavaScript packages
and icon data on demand.

- It does not extend the Markdown syntax.
- You need to enable HTML tags in Markdown to use it.
- Settings are written in the Front Matter of Markdown.

A simple working example is
[sample.md](https://github.com/morish000/markdown-it-extrajs/blob/main/vscode-markdown-extrajs/sample.md?plain=1).

- To enable Marp, you need
  [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode).
- If you set the "marp: true" to false, you can preview it as regular Markdown.

# Front Matter

```
extrajs:                      # Root element
  useMermaid: [boolean]       # Enables Mermaid.js. Default is false.
  useFontAwesome: [boolean]   # Enables FontAwesome. Default is false.
  useUnoCSS: [boolean]        # Enables UnoCSS. Default is false.
  mermaidConfig: [Object]     # Parameters for the Mermaid.js initialize function
  fontAwesomeConfig: [Object] # Configuration for FontAwesome
  rules: [Object]             # Rules for UnoCSS
  presetWind: [Object]        # Options for the UnoCSS Wind preset
  presetMini: [Object]        # Options for the UnoCSS Mini preset
  presetIcons: [Object]       # Options for the UnoCSS Icons preset
  presetAttributify: [Object] # Options for the UnoCSS Attributify preset
  presetTypography: [Object]  # Options for the UnoCSS Typography preset
  presetWebFonts: [Object]    # Options for the UnoCSS Web Fonts preset
  presetTagify: [Object]      # Options for the UnoCSS Tagify preset
  presetRemToPx: [boolean]    # Enables the Rem to px preset. Default is false.
```

Only one of presetWind, presetMini, or presetUno will be active.\
If presetWind is set, it will be active. If presetWind is not set and presetMini
is set, then presetMini will be active.\
If neither is set, presetUno will be active.\
Other UnoCSS settings will not activate their presets if they are not set.

- [mermaidConfig](https://mermaid.js.org/config/setup/interfaces/mermaid.Mermaid.html#initialize)
- [fontAwesomeConfig](https://docs.fontawesome.com/apis/javascript/configuration)
- [rules](https://unocss.dev/config/rules)
- [presetWind](https://unocss.dev/presets/wind)
- [presetMini](https://unocss.dev/presets/mini)
- [presetIcons](https://unocss.dev/presets/icons)
- [presetAttributify](https://unocss.dev/presets/attributify)
- [presetTypography](https://unocss.dev/presets/typography)
- [presetWebFonts](https://unocss.dev/presets/web-fonts)
- [presetTagify](https://unocss.dev/presets/tagify)
- [presetRemToPx](https://unocss.dev/presets/rem-to-px)

## Note

- Some settings required for operation will be forcibly overwritten.
- Due to the YAML format, only static settings are valid. Settings that require
  regular expression literals, template literals, functions, etc., cannot be
  configured.
- If you have installed
  [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid),
  set `useMermaid` to false. The default is false.

# VSCode Settings

| name               | default                                 |
| ------------------ | --------------------------------------- |
| discardFrontMatter | false (usually no need to change)       |
| outputScriptTag    | false (usually no need to change)       |
| useMermaid         | true                                    |
| useFontAwesome     | true                                    |
| useUnoCSS          | true                                    |
| mermaidUrl         | "https://esm.sh/mermaid"                |
| mermaidElkUrl      | "https://esm.sh/@mermaid-js/layout-elk" |
| fontAwesomeUrl     | "https://esm.sh/@fortawesome"           |
| unoCSSUrl          | "https://esm.sh/@unocss"                |
| iconifyJsonCDN     | "https://esm.sh"                        |

useMermaid, useFontAwesome, and useUnoCSS will only be enabled if both the
VSCode setting and the Front Matter setting are set to true.

# Exports

With the Markdown file opened in an active editor, select the following from the command palette:

```
> Markdown ExtraJS: Export Script-Embedded File
```

## For non-Marp (if "marp: true" is not set in the Front Matter)

Exports a ".html" file.

## For Marp

Exports a ".md" file.
This file has embedded script tags, which might not be previewable due to VSCode's security settings.
However, you can export it to HTML or PDF using Marp for VSCode with HTML tags enabled.

When exporting to formats other than HTML, the headless browser executed by Puppeteer will download a large amount of JavaScript/icon data, which can take considerable time on the first run. If you encounter a timeout error, consider adjusting the VSCode settings (the default value is 30000 ms).

| Setting                          | Value  |
| -------------------------------- | ------ |
| markdownExtraJS.puppeteerTimeout | 120000 |

Subsequent runs should be faster due to caching.

This setting adjusts the `process.env.PUPPETEER_TIMEOUT` in VSCode, which may affect Puppeteer instances launched from VSCode. If it is no longer needed, set a negative value (e.g., -1) and restart VSCode.

# Simplified Support for UnoCSS Dynamic Rules and String Replacement

Using `eval` or the `Function` constructor in VSCode's Markdown preview violates security policies, so I have implemented a simple string replacement feature.  
This allows for basic string replacement for text that matches a regular expression.

- [Dynamic rules](https://unocss.dev/config/rules#dynamic-rules)

Note that this method does not support advanced features such as "CSS Rules Fallback," "Special symbols," "Multi-selector rules," and "Fully controlled rules."

## Example Configuration

The following settings in FrontMatter:
```yaml
extrajs:
  rules:
    -
      - /^m-(\d+)$/
      - margin: ${m}em
    -
      - /^p-(\d+)$/
      - padding: ${m[1]}em
```

Correspond to the following Dynamic Rules configuration:
```javascript
rules: [
  [/^m-(\d+)$/, ([, m]) => ({ margin: `${m}em` })],
  [/^p-(\d+)$/, m => ({ padding: `${m[1]}em` })],
]
```

## Notes

- `m` is a fixed match group.
- `${m}` and `${m[1]}` mean the same thing.
- Since this is not a literal template, `${m}` and `${m[n]}` are simply replaced as strings.
- If the index does not exist, the replacement is not performed.

# Known Issues

- The initial run may take some time due to large download sizes, but subsequent
  runs will improve with caching.
- If you edit UnoCSS Front Matter, a reload of the preview window is required
  for the changes to take effect. Please execute 'Refresh Preview' in the
  preview window.
- Occasionally, Mermaid.js fails to render; please execute 'Refresh Preview' in
  the preview window.

# License

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/morish000/markdown-it-extrajs/blob/main/vscode-markdown-extrajs/LICENSE)
file for details.