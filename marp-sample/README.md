# Marp CLI Example

This project is currently under development. It is not yet ready for official release, and the functionality or API may change.

# Overview

This is a sample for running `markdown-it-extrajs` with Marp CLI.  
It converts [sample.md](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/sample.md?plain=1) to HTML, PDF, and PPTX.

## HTML Output

```sh
npm run html
```

- Outputs [./dist/sample.html](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/dist/sample.html).

## PDF Output

```sh
npm run pdf
```

- Outputs [./dist/sample.pdf](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/dist/sample.pdf).

## PPTX Output

```sh
npm run pptx
```

- Outputs [./dist/sample.pptx](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/dist/sample.pptx).

## Debug Mode

```sh
npm run puppeteer
```

Outputs HTML to PDF using Puppeteer without using Marp CLI. Handles and outputs `console.log` for debugging.

- Converts [./dist/sample.html](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/dist/sample.html) to PDF.
- Outputs [./dist/sample_puppeteer.pdf](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/dist/sample_puppeteer.pdf).

```sh
npm run playwright
```

Outputs HTML to PDF using Playwright without using Marp CLI. Handles and outputs `console.log` for debugging.

- Converts [./dist/sample.html](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/dist/sample.html) to PDF.
- Outputs [./dist/sample_playwright.pdf](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/dist/sample_playwright.pdf).

## Marp Core Example

A sample for exporting HTML from Marp Markdown using Marp core.

```sh
npm run marp-core
```

- Outputs [./dist/sample_marp-core.html](https://github.com/morish000/markdown-it-extrajs/blob/main/marp-sample/dist/sample_marp-core.html)

# Known Issues

Occasionally, Mermaid.js fails to render. Running it again will likely succeed.

# License

This project is licensed under the MIT License. See the
[LICENSE](https://github.com/morish000/markdown-it-extrajs/blob/main/vscode-markdown-extrajs/LICENSE)
file for details.
