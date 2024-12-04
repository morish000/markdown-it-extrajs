// deno-lint-ignore-file no-window no-window-prefix
import { icons } from "@unocss/preset-icons/core";
import type { IconifyJSON } from "@iconify/types";

const iconLoader = (key: string) => () =>
  import(`https://esm.sh/@iconify-json/${key}/index.mjs`).then((i) => i.icons);

const iconCollections: () => Record<string, () => Promise<IconifyJSON>> =
  () => {
    const collections: Record<string, () => Promise<IconifyJSON>> = {};

    icons.forEach((key: string) => {
      collections[key] = iconLoader(key);
    });

    return collections;
  };

const unoCSSIcons = () => ({
  presetIcons: {
    collections: {
      ...iconCollections(),
    },
  },
});

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
    await init(options, frontMatter, unoCSSIcons());
  }
};

window.removeEventListener("vscode.markdown.updateContent", init);
window.addEventListener("vscode.markdown.updateContent", init);
init();
