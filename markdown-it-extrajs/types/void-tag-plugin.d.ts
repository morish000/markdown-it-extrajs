import type MarkdownIt from "markdown-it";
declare const voidTagPlugin: (md: MarkdownIt, name: string, options: {
    tag: string;
    marker: string;
    markerCount: number;
    isVoidElement: boolean;
}) => void;
export default voidTagPlugin;
