import { build, stop } from "esbuild";
import defines from "./define.ts";

await build({
  entryPoints: [
    "src/init-font-awesome.ts",
    "src/init-mermaid.ts",
    "src/init-uno-css.ts",
  ],
  outdir: "dist",
  format: "esm",
  bundle: true,
  minify: true,
  sourcemap: true,
  external: ["@fortawesome/fontawesome-svg-core"],
  resolveExtensions: [".ts", ".mjs", ".js"],
  outExtension: {
    ".js": ".mjs",
  },
});

await build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  format: "esm",
  bundle: true,
  define: defines,
  minify: true,
  sourcemap: true,
  external: [
    "@fortawesome/fontawesome-svg-core",
    "markdown-it",
    "markdown-it-front-matter",
    "gray-matter",
    "@unocss",
    "@unocss/preset-icons",
    "@unocss/preset-wind",
    "@unocss/preset-mini",
    "@unocss/preset-attributify",
    "@unocss/preset-typography",
    "@unocss/preset-web-fonts",
    "@unocss/preset-tagify",
  ],
  resolveExtensions: [".ts", ".mjs", ".js"],
  outExtension: {
    ".js": ".mjs",
  },
});

stop();
