const init = async () => {
  const optionsScript = document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-options",
  );
  const frontMatterScript = document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-frontMatter",
  );
  const initScript = document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-init",
  );
  if (optionsScript && frontMatterScript && initScript) {
    const [
      { default: init },
      { default: options },
      { default: frontMatter },
    ] = await Promise.all([
      import("data:text/javascript;base64," + initScript),
      import("data:text/javascript;base64," + optionsScript),
      import("data:text/javascript;base64," + frontMatterScript),
    ]);
    await init(options, frontMatter);
  }
};

// deno-lint-ignore no-window no-window-prefix
window.removeEventListener("vscode.markdown.updateContent", init);
// deno-lint-ignore no-window no-window-prefix
window.addEventListener("vscode.markdown.updateContent", init);
init();
