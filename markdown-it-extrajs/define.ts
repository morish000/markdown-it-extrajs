async function getBase64Contents(filePath: string): Promise<string> {
  const content = await Deno.readFile(filePath);
  return btoa(new TextDecoder().decode(content));
}

const replaceMappings: Record<string, string> = {
  "SRC_BASE64.INIT_MERMAID": "dist/init-mermaid.mjs",
  "SRC_BASE64.INIT_FONT_AWESOME": "dist/init-font-awesome.mjs",
  "SRC_BASE64.INIT_UNO_CSS": "dist/init-uno-css.mjs",
};

const defines: Record<string, string> = {};

for (const [key, filePath] of Object.entries(replaceMappings)) {
  defines[`${key}`] = `"${await getBase64Contents(filePath)}"`;
}

declare global {
  // deno-lint-ignore no-var
  var SRC_BASE64: Record<string, string>;
}

globalThis.SRC_BASE64 = {
  INIT_MERMAID: defines["SRC_BASE64.INIT_MERMAID"],
  INIT_FONT_AWESOME: defines["SRC_BASE64.INIT_FONT_AWESOME"],
  INIT_UNO_CSS: defines["SRC_BASE64.INIT_UNO_CSS"],
};

export default defines;
