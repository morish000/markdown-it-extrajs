import { build, stop } from "esbuild";
import { readdirSync } from 'fs';
import { resolve } from 'path';
import replacePlaceholdersInFile from "./embedjs.ts";

await build({
  entryPoints: [
    "src/init-all.ts",
  ],
  outfile: "dist/init-all-bundle.js",
  format: "esm",
  bundle: true,
  minify: true,
  sourcemap: true,
  external: [
    "@fortawesome/fontawesome-svg-core",
    "@unocss/core",
    "@unocss/preset-attributify",
    "@unocss/preset-icons",
    "@unocss/preset-mini",
    "@unocss/preset-tagify",
    "@unocss/preset-typography",
    "@unocss/preset-web-fonts",
    "@unocss/preset-wind",
    "@unocss/runtime",
    "mermaid"
  ],
  resolveExtensions: [".ts", ".mjs", ".js"],
});

replacePlaceholdersInFile(
  "./base64js_template.ts",
  {
    "INIT_ALL": "./dist/init-all-bundle.js",
  },
  "./src/base64js.ts",
);

const srcDir = './src';
const entryPoints = readdirSync(srcDir)
  .filter(file => file.endsWith('.ts'))
  .map(file => resolve(srcDir, file));

await build({
  entryPoints,
  outdir: "dist",
  format: "esm",
  bundle: false,
  minify: false,
  sourcemap: true,
  resolveExtensions: [".ts", ".mjs", ".js"]
});

stop();
