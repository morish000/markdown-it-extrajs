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
- If you set `"marp: true"` to `false`, you can preview it as regular Markdown.

> **Security**  
> This extension runs JavaScript in Markdown Preview.  
> There is a setting to enable the extension only in trusted workspaces:  
> > `markdownExtraJS.feature.requireTrustedWorkspace`  
>
> The default setting is `false` (the extension works in untrusted workspaces).  
> By setting it to `true`, you can restrict the extension to run only in trusted workspaces.

# Front Matter

```yaml
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
  preflightStyle: [string]    # The static CSS string returned by the getCSS method in UnoCSS Preflights.
```

Only one of `presetWind`, `presetMini`, or `presetUno` will be active.\
If `presetWind` is set, it will be active. If `presetWind` is not set and `presetMini`
is set, then `presetMini` will be active.\
If neither is set, `presetUno` will be active.\
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
- Reference: [Preflights](https://unocss.dev/config/preflights)

## Note

- Some settings required for operation will be forcibly overwritten.
- Due to the YAML format, only static settings are valid. Settings that require
  regular expression literals, template literals, functions, etc., cannot be
  configured.
- If you have installed
  [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid),
  set `useMermaid` to false. The default is false.

# VSCode Settings

| name                 | default                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------- |
| discardFrontMatter   | false (usually no need to change)                                                         |
| outputScriptTag      | false (usually no need to change)                                                         |
| useMermaid           | true                                                                                      |
| useFontAwesome       | true                                                                                      |
| useUnoCSS            | true                                                                                      |
| mermaidUrl           | "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs"                           |
| mermaidElkUrl        | "https://cdn.jsdelivr.net/npm/@mermaid-js/layout-elk/dist/mermaid-layout-elk.esm.min.mjs" |
| fontAwesomeUrl       | "https://esm.sh/@fortawesome"                                                             |
| unoCSSUrl            | "https://esm.sh/@unocss"                                                                  |
| iconifyJsonCDN       | "https://esm.sh"                                                                          |
| iconifyJsonCDNParams | "bundle=true"                                                                             |

`useMermaid`, `useFontAwesome`, and `useUnoCSS` will only be enabled if both the
VSCode setting and the Front Matter setting are set to true.

# Exports

## Export Script-Embedded File

With the Markdown file opened in an active editor, select the following from the command palette:

```
> Markdown ExtraJS: Export Script-Embedded File
```

### For non-Marp (if "marp: true" is not set in the Front Matter)

Exports a ".html" file.

### For Marp

Exports a ".md" file.
This file has embedded script tags, which might not be previewable due to VSCode's security settings.
However, you can export it to HTML or PDF using Marp for VSCode with HTML tags enabled.

When exporting to formats other than HTML, the headless browser executed by Puppeteer will download a large amount of JavaScript and icon data,
which can take considerable time on the first run.
If you encounter a timeout error, try retrying a few times. Currently, there is no method to set the timeout externally.

## Export HTML File

With the Markdown file opened in an active editor, select the following from the command palette:

```
> Markdown ExtraJS: Export HTML File
```

> **HTML `lang` Attribute**  
> By setting `markdownExtraJS.export.htmlLang` in the VSCode settings, you can specify the `lang` attribute for the exported HTML tags.  
> The default setting is unset (null).

### For non-Marp (if "marp: true" is not set in the Front Matter)

It is the same as a Script-Embedded File.

### For Marp

Outputs the HTML file generated by Marp-Core.  
Although the slide controller is not displayed, you can perform the following operations:

| Device   | Event               | Action                             |
| -------- | ------------------- | ---------------------------------- |
| Keyboard | Right, Down         | Next page                          |
| Keyboard | Left, Up            | Previous page                      |
| Keyboard | PageDown, End       | Last page                          |
| Keyboard | PageUp, Home        | First page                         |
| Mouse    | Wheel (down)        | Next page                          |
| Mouse    | Wheel (up)          | Previous page                      |
| Mouse    | Left click          | Next page (Last page → First page) |
| Touchpad | Flick (right, down) | Next page                          |
| Touchpad | Flick (left, up)    | Previous page                      |

Only for the mouse left click, clicking on the last page will return to the first page.  
For other events, it will stop at the first or last page.

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

# Support for UnoCSS Preflights

It is possible to return a static CSS string as one of the Preflights.

## Example Configuration

The following settings in FrontMatter:
```yaml
extrajs:
  preflightStyle: |
    div.preflight-g {
      color: green;
    }
    div.preflight-y {
      color: yellow;
    }
```

This corresponds to the following UnoCSS configuration:
```javascript
preflights: [
  {
    getCSS: () => `
      div.preflight-g {
        color: green;
      }
      div.preflight-y {
        color: yellow;
      }
    `,
  },
]
```

# Options for Not Using HTML Tags

There are times when you may not want to use HTML tags in Markdown.
This extension includes a Markdown-it plugin for outputting frequently used HTML tags.
This feature is disabled by default due to potential conflicts with other Markdown extensions.
To enable it, change the following setting to `true`.

> `markdownExtraJS.feature.useNoHTML`

When this option is set to `true`, you can write in the following way:
- Specify style classes using [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs).
- The `<p>` tag is created by Markdown-it by default.

## `div` Tag

```markdown
::: div { .class1 .class2 }
sample
:::
```

```html
<div data-block-tag-name="div" class="class1 class2">
  <p>sample</p>
</div>
```

## `pre` Tag

Can be used with Mermaid.js.

```markdown
[[[ pre { .mermaid .class1 }
sample
]]]
```

```html
<pre data-block-tag-name="pre" class="mermaid class1">
sample
</pre>
```

## `span` Tag

```markdown
this is [[sample]]{ .class1 .class2 }.
```

```html
<p>this is <span data-inline-tag-name="span" class="class1 class2="">sample</span>.</p>
```

## `i` Tag

Can be used for icons.

```markdown
@@!{ .class1 .class2 }
```

```html
<p><i data-void-tag-name="i" class="class1 class2"></i></p>
```

## Note

If you want to export Markdown documents using these features, you need to use this extension.
The Markdown-it extensions used in this extension are registered in the npm registry, so it is possible to create your own export program.

- [@morish000/markdown-it-extrajs](https://www.npmjs.com/package/@morish000/markdown-it-extrajs)

# Export PDF (Experimental)

Due to environmental dependencies, the PDF Export feature has been added experimentally.  

You can choose either Playwright or Puppeteer to export PDFs.  
You can select which to use by changing the following setting in VSCode.  
The default is Playwright.

> markdownExtraJS.export.browserAutomation

## Using Playwright

Playwright is required to run this feature. Currently, Playwright's PDF Export seems to support only Chromium.

If Playwright is not installed, please run the following to install it:

```
> npx playwright install
> npx playwright install-deps chromium
```

> Refer to the official site for more information: [Browsers](https://playwright.dev/docs/browsers)

## Using Puppeteer

The version of Chromium used by Puppeteer is automatically installed during the first export.  
This Chromium version is not updated automatically. To update it, select and run the following from the VSCode command palette:

> Markdown ExtraJS: Install Chromium for Puppeteer (experimental)

Running this command will always install the latest build.

## Executing the PDF Export

With the Markdown editor active, select the following from the command palette:

```
> Markdown ExtraJS: Export PDF File (experimental)
```

PDF export settings can be configured in Front Matter and VSCode settings.

## Front Matter

```yaml
extrajs:     # Extrajs options
  ...
pdfOptions:  # PDF options
  ...
```

Refer to Playwright's [official documentation](https://playwright.dev/docs/next/api/class-page#page-pdf) or Puppeteer's [official documentation](https://pptr.dev/api/puppeteer.pdfoptions) for available `pdfOptions` settings.

Most of the same options are available for both Playwright and Puppeteer, but there are some differences.  
For example, `waitForFonts` is only defined in Puppeteer.

The following settings are configured by default:

### Common

```javascript
{
  printBackground: true
}
```

### Marp

```javascript
{
  preferCSSPageSize: true,
  margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
}
```

### Non-Marp

```javascript
{
  format: "A4",
  displayHeaderFooter: true,
  headerTemplate: `
  <div style="font-size: 12px; width: 100%; text-align: center; margin-top: 10px;">
    ${title}
  </div>`,
  footerTemplate: `
  <div style="font-size: 12px; width: 100%; text-align: center; margin-top: 10px;">
    <span class="pageNumber"></span> / <span class="totalPages"></span>
  </div>`,
  margin: { top: '40px', right: '40px', bottom: '40px', left: '40px' }
}
```

In the header, `${title}` will be replaced with the `title` from the Front Matter, or the file name (without extension) if not set.

## VSCode Settings

The following settings are available under `markdownExtraJS.playwright`:

| name           | default |
| -------------- | ------- |
| waitTimeout    | 30000   |
| executablePath | null    |
| devtools       | false   |
| headless       | true    |
| timeout        | 30000   |
| locale         | null    |
| offline        | false   |
| timezoneId     | null    |
| useProxy       | false   |

The following settings are available under `markdownExtraJS.puppeteer`:

| name           | default |
| -------------- | ------- |
| waitTimeout    | 30000   |
| executablePath | null    |
| devtools       | false   |
| headless       | true    |
| timeout        | 30000   |
| locale         | null    |
| timezoneId     | null    |
| useProxy       | false   |

### Note: Proxy

If `useProxy` is set to `true`, proxy settings will be retrieved from environment variables.  
Although the exact reason has not been investigated, it appears that the feature might work without configuring a proxy. Adjust settings as needed.

| name                      | value                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| HTTP_PROXY (or http_proxy) | `http://host:port`. <br>If authentication is required: `http://username:password@host:port`                                      |
| NO_PROXY (or no_proxy)    | <ul><li>Playwright: Set this for the bypass property. [Reference](https://playwright.dev/docs/next/api/class-apirequest#api-request-new-context-option-proxy)</li><li>Puppeteer: Unfortunately, there is no official method to set this currently. [Using Proxies with Puppeteer](https://puppeteer.guide/posts/proxies/)</li></ul> |

## Page Breaks

For PDF page breaks, use CSS properties [break-before](https://developer.mozilla.org/en-US/docs/Web/CSS/break-before) and [break-after](https://developer.mozilla.org/en-US/docs/Web/CSS/break-after). This is not necessary for Marp.

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