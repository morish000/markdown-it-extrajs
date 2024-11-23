export const initMermaid = (
    url: string = "https://esm.sh/mermaid",
) => `export default async () => {
    const mermaid = await import("${url}");
    mermaid.default.init();
};`;

export default initMermaid;
