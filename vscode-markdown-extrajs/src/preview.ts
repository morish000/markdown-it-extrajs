import { initAll } from "@morish000/markdown-it-extrajs/scripts";

const init = async () => {
  const optionsStr = document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-options",
  );
  const frontMatterStr = document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-frontMatter",
  );
  if (optionsStr && frontMatterStr) {
    await initAll(JSON.parse(atob(optionsStr)), JSON.parse(atob(frontMatterStr)));
  }
};

window.addEventListener("vscode.markdown.updateContent", init);
init();
