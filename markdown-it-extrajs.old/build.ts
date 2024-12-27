import { build, stop } from "esbuild";
import replacePlaceholdersInFile from "./embedjs.ts";

await build({
  entryPoints: [
    "src/init-all.ts",
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
    "INIT_ALL": "./dist/init-all.mjs",
  },
  "./src/base64js.ts",
);

stop();
