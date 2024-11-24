import extraJsPlugin from "@morish000/markdown-it-extrajs";

export default ({ marp }) => {
    marp.use(extraJsPlugin, {
        discardFrontMatter: false,
        useMermaid: true,
        useFontAwesome: true,
        useUnoCSS: true,
        outputScriptTag: true,
    });
    return marp;
};
