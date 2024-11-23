import { build, stop } from "esbuild";

await build({
  entryPoints: [
    "src/index.ts",
    "src/create-tags.ts",
  ],
  outdir: "dist/esm",
  format: "esm",
  bundle: true,
  minify: true,
  sourcemap: true,
  external: ["markdown-it-front-matter", "gray-matter"],
  resolveExtensions: [".ts", ".mjs", ".js"],
  outExtension: {
    ".js": ".mjs",
  },
});

await build({
  entryPoints: [
    "src/index.ts",
    "src/create-tags.ts",
  ],
  outdir: "dist/cjs",
  format: "cjs",
  bundle: true,
  minify: true,
  sourcemap: true,
  external: ["markdown-it-front-matter", "gray-matter"],
  resolveExtensions: [".ts", ".mjs", ".js"],
  outExtension: {
    ".js": ".cjs",
  },
});

stop();
