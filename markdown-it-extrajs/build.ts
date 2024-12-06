import { build, stop } from "esbuild";
import replacePlaceholdersInFile from "./embedjs.ts";

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
  external: ["@fortawesome/fontawesome-svg-core", "mermaid", "@unocss"],
  resolveExtensions: [".ts", ".mjs", ".js"],
  outExtension: {
    ".js": ".mjs",
  },
});

replacePlaceholdersInFile(
  "./base64js_template.ts",
  {
    "INIT_MERMAID": "./dist/init-mermaid.mjs",
    "INIT_FONT_AWESOME": "./dist/init-font-awesome.mjs",
    "INIT_UNO_CSS": "./dist/init-uno-css.mjs",
  },
  "./src/base64js.ts",
);

stop();
