export const initMermaid = () =>
  `export default async (options = {}, _frontMatter = {}, _conf = {}) => {
    const mermaid = await import(options.mermaidUrl);
    mermaid.default.init();
};`;

export default initMermaid;
