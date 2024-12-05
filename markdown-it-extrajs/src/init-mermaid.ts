import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.ts";

export default async (
  options: ExtraJSOptions = {},
  _frontMatter: ExtraJSFrontMatter = {},
  _conf: ExtraJSFrontMatter = {},
) => {
  if (options.mermaidUrl) {
    const mermaid = await import(options.mermaidUrl);
    mermaid.default.initialize();
    mermaid.default.run();
  }
};
