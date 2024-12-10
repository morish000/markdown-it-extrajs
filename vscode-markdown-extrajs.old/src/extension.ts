// @deno-types="@types/vscode"
import type { ExtensionContext, WorkspaceConfiguration } from "vscode";
// @deno-types="@types/markdown-it"
import type MarkdownIt from "markdown-it";
import extraJsPlugin, {
  type ExtraJSOptions,
} from "@morish000/markdown-it-extrajs";

// deno-lint-ignore no-explicit-any
declare const require: (path: string) => any;
const requireWrapper = (path: string) => require(path);
const vscode = requireWrapper("vscode");

export function activate(_context: ExtensionContext) {
  return {
    extendMarkdownIt(md: MarkdownIt) {
      const config = vscode.workspace
        .getConfiguration(
          "markdownExtraJS",
        ) as WorkspaceConfiguration;

      const options: ExtraJSOptions = {
        discardFrontMatter: config.get<boolean>(
          "discardFrontMatter",
          true,
        ),
        outputScriptTag: config.get<boolean>("outputScriptTag", false),
        useMermaid: config.get<boolean>("useMermaid", true),
        useFontAwesome: config.get<boolean>("useFontAwesome", true),
        useUnoCSS: config.get<boolean>("useUnoCSS", true),
        mermaidUrl: config.get<string>("mermaidUrl", "https://esm.sh/mermaid"),
        mermaidElkUrl: config.get<string>(
          "mermaidElkUrl",
          "https://esm.sh/@mermaid-js/layout-elk",
        ),
        fontAwesomeUrl: config.get<string>(
          "fontAwesomeUrl",
          "https://esm.sh/@fortawesome",
        ),
        unoCSSUrl: config.get<string>("unoCSSUrl", "https://esm.sh/@unocss"),
        iconifyJsonCDN: config.get<string>(
          "iconifyJsonCDN",
          "https://esm.sh",
        ),
      };

      return md.use(extraJsPlugin, options);
    },
  };
}
