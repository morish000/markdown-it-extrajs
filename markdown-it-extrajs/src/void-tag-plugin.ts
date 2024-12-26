// @deno-types="@types/markdown-it"
import type MarkdownIt from "markdown-it";

const voidTagPlugin = (
  md: MarkdownIt,
  name: string,
  options: {
    tag: string;
    marker: string;
    markerCount: number;
    isVoidElement: boolean;
  },
): void => {
  const markerStr = options.marker;
  const markerChar = markerStr.charCodeAt(0);
  const markerCount = options.markerCount;
  const isVoidElement = options.isVoidElement;

  const voidTagRule = (state, silent) => {
    const max = state.posMax;
    const start = state.pos;

    if (state.src.charCodeAt(start) !== markerChar) return false;
    if (silent) return false;

    let pos = start + 1;
    let markerLen = 1;

    while (pos < max && state.src.charCodeAt(pos) === markerChar) {
      pos++;
      markerLen++;
    }

    if (markerLen < markerCount) return false;

    if (pos < max && state.src.charCodeAt(pos) !== "!".charCodeAt(0)) {
      return false;
    }

    if (silent) return true;

    state.pos = pos + 1;

    const tokenOpen = state.push(
      `void_tag_${name}_open`,
      options.tag,
      isVoidElement ? 0 : 1,
    );
    tokenOpen.markup = markerStr;
    tokenOpen.block = false;

    if (!isVoidElement) {
      const tokenClose = state.push(`void_tag_${name}_close`, options.tag, -1);
      tokenClose.markup = markerStr;
      tokenClose.block = false;
    }

    return true;
  };

  md.inline.ruler.before("emphasis", `void_tag_${name}`, voidTagRule);
};

export default voidTagPlugin;
