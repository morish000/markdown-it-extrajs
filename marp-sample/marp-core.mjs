import { Marp } from "@marp-team/marp-core";
import fs from "fs";
import extraJsPlugin from "@morish000/markdown-it-extrajs";

const marp = new Marp({ html: true });
marp.use(extraJsPlugin, {
    discardFrontMatter: false,
    useMermaid: true,
    useFontAwesome: true,
    useUnoCSS: true,
    outputScriptTag: true,
})

const markdown = fs.readFileSync('./sample.md', 'utf8');

const { html, css } = marp.render(markdown);

const output = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marp Presentation</title>
  <style>${css}</style>
</head>
<body>
  ${html}
</body>
</html>`;

fs.writeFileSync('./dist/sample_marp-core.html', output);
