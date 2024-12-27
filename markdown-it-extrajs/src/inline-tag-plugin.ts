// @deno-types="@types/markdown-it"
import type MarkdownIt from "markdown-it";
// "@types/markdown-it/lib/rules_inline/state_inline.mjs"
// import type StateInline from "markdown-it/lib/rules_inline/state_inline.mjs";
// import type { Delimiter } from "markdown-it/lib/rules_inline/state_inline.mjs";

const inlineTagPlugin = (
  md: MarkdownIt,
  name: string,
  options: {
    tag: string;
    marker: string;
    markerCount: number;
    endMarker?: string;
  },
): void => {
  const markerStr = options.marker;
  const markerChar = markerStr.charCodeAt(0);
  const markerCount = options.markerCount;
  const endMarkerStr = options.endMarker || markerStr;
  const endMarkerChar = endMarkerStr.charCodeAt(0);

  // deno-lint-ignore no-explicit-any
  const tokenize = (state: any, /* StateInline */ silent: boolean) => {
    const start = state.pos;
    const marker = state.src.charCodeAt(start);

    if (silent) return false;

    if (marker !== markerChar && marker !== endMarkerChar) return false;

    const scanned = state.scanDelims(state.pos, true);
    let len = scanned.length;
    const ch = String.fromCharCode(marker);

    if (len < markerCount) return false;

    const loneMarkerCount = len % markerCount;
    if (loneMarkerCount) {
      const token = state.push("text", "", 0);
      token.content = ch.repeat(loneMarkerCount);
      len -= loneMarkerCount;
    }

    const canOpen = (marker === markerChar) && scanned.can_open;
    const canClose = (marker === endMarkerChar) && scanned.can_close;

    const tokenContent = ch.repeat(markerCount);
    for (let i = 0; i < len; i += markerCount) {
      const token = state.push("text", "", 0);
      token.content = tokenContent;
      if (!canOpen && !canClose) continue;
      state.delimiters.push({
        marker,
        length: markerCount,
        token: state.tokens.length - 1,
        end: -1,
        open: canOpen,
        close: canClose,
      });
    }

    state.pos += scanned.length;

    return true;
  };

  // deno-lint-ignore no-explicit-any
  const postProcess = (state: any /* StateInline */) => {
    const delimiters = state.delimiters;
    const loneMarkers: number[] = [];
    const stack: typeof delimiters = [];

    if (markerStr !== endMarkerStr) {
      for (let i = 0; i < delimiters.length; i++) {
        const delim = delimiters[i];
        if (delim.marker === markerChar) {
          stack.push(delim);
        } else if (delim.marker === endMarkerChar) {
          if (stack.length > 0) {
            const startDelim = stack.pop(); // as Delimiter;
            startDelim.open = true;
            startDelim.end = i;
            delim.end = -1;
            delim.close = true;
          }
        }
      }
    }

    const loneMarkerRegExp = new RegExp(`^(${endMarkerStr})+$`);
    for (let i = 0; i < delimiters.length; i++) {
      const startDelim = delimiters[i];
      if (startDelim.marker !== markerChar) {
        continue;
      }
      if (startDelim.end === -1) {
        continue;
      }

      const endDelim = delimiters[startDelim.end];

      const tokenOpen = state.tokens[startDelim.token];
      tokenOpen.type = `inline_tag_${name}_open`;
      tokenOpen.tag = options.tag;
      tokenOpen.nesting = 1;
      tokenOpen.content = "";

      const tokenClose = state.tokens[endDelim.token];
      tokenClose.type = `inline_tag_${name}_close`;
      tokenClose.tag = options.tag;
      tokenClose.nesting = -1;
      tokenClose.content = "";

      if (
        state.tokens[endDelim.token - 1].type === "text" &&
        loneMarkerRegExp.test(state.tokens[endDelim.token - 1].content)
      ) {
        loneMarkers.push(endDelim.token - 1);
      }
    }

    while (loneMarkers.length) {
      const i = loneMarkers.pop();
      if (i === undefined) continue;

      let j = i + 1;

      while (
        j < state.tokens.length &&
        state.tokens[j].type === `inline_tag_${name}_close`
      ) {
        j++;
      }

      j--;

      if (i !== j) {
        const token = state.tokens[j];
        state.tokens[j] = state.tokens[i];
        state.tokens[i] = token;
      }
    }
    return true;
  };

  md.inline.ruler.before("emphasis", `inline_tag_${name}`, tokenize);
  md.inline.ruler2.before("emphasis", `inline_tag_${name}`, postProcess);
};

export default inlineTagPlugin;
