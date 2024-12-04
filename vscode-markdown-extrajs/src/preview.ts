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

const unoCSSIcons2 = () => ({
  presetIcons: {
    collections: {
      ...iconCollections(),
    },
  },
});

const init = async () => {
  const initScript = window.document.getElementById("extrajs")?.getAttribute(
    "data-extrajs-init",
  );
  if (initScript) {
    const init = await import("data:text/javascript;base64," + initScript);
    await init.default(unoCSSIcons2());
  }
};

window.removeEventListener("vscode.markdown.updateContent", init);
window.addEventListener("vscode.markdown.updateContent", init);
init();
