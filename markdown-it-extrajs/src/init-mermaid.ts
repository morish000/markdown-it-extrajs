import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";

export const initMermaid = (
  options: ExtraJSOptions,
  _frontMatter: ExtraJSFrontMatter,
) =>
  `export default async (_ = {}) => {
    const mermaid = await import("${options.mermaidUrl}");
    mermaid.default.init();
};`;

export default initMermaid;
