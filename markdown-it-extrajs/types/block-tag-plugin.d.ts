import type MarkdownIt from "markdown-it";
declare const blockTagPlugin: (md: MarkdownIt, name: string, options: {
    tag: string;
    marker: string;
    markerCount: number;
    endMarker?: string;
}) => void;
export default blockTagPlugin;
