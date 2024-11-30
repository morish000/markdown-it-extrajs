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
        useMermaid: config.get<boolean>("useMermaid", true),
        mermaidUrl: config.get<string>("mermaidUrl", "https://esm.sh/mermaid"),
        useFontAwesome: config.get<boolean>("useFontAwesome", true),
        fontAwesomeUrl: config.get<string>(
          "fontAwesomeUrl",
          "https://esm.sh/@fortawesome",
        ),
        useUnoCSS: config.get<boolean>("useUnoCSS", true),
        unoCSSUrl: config.get<string>("unoCSSUrl", "https://esm.sh/@unocss"),
        unoCSSPresetIconCDN: config.get<string>(
          "unoCSSPresetIconCDN",
          "https://esm.sh/",
        ),
        outputScriptTag: config.get<boolean>("outputScriptTag", false),
        useBundleIconifyJson: config.get<boolean>("useBundleIconifyJson", true),
      };

      return md.use(extraJsPlugin, options);
    },
  };
}
