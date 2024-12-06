(() => {
  // src/preview.ts
  var init = async () => {
    const optionsScript = document.getElementById("extrajs")?.getAttribute(
      "data-extrajs-options"
    );
    const frontMatterScript = document.getElementById("extrajs")?.getAttribute(
      "data-extrajs-frontMatter"
    );
    const initScript = document.getElementById("extrajs")?.getAttribute(
      "data-extrajs-init"
    );
    if (optionsScript && frontMatterScript && initScript) {
      const [
        { default: init2 },
        { default: options },
        { default: frontMatter }
      ] = await Promise.all([
        import("data:text/javascript;base64," + initScript),
        import("data:text/javascript;base64," + optionsScript),
        import("data:text/javascript;base64," + frontMatterScript)
      ]);
      await init2(options, frontMatter);
    }
  };
  window.removeEventListener("vscode.markdown.updateContent", init);
  window.addEventListener("vscode.markdown.updateContent", init);
  init();
})();
//# sourceMappingURL=preview.js.map
