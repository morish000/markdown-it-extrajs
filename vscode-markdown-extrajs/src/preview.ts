import { initAll } from "@morish000/markdown-it-extrajs";

const init = async () => {
  const optionsStr = document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-options",
  );
  const frontMatterStr = document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-frontMatter",
  );
  if (optionsStr && frontMatterStr) {
    await initAll(
      JSON.parse(btoa(optionsStr)),
      JSON.parse(btoa(frontMatterStr)),
    );
  }
};

// deno-lint-ignore no-window no-window-prefix
window.removeEventListener("vscode.markdown.updateContent", init);
// deno-lint-ignore no-window no-window-prefix
window.addEventListener("vscode.markdown.updateContent", init);
init();
