// @deno-types="@types/markdown-it"
import type MarkdownIt from "markdown-it";
// "@types/markdown-it/lib/rules_block/state_block.mjs"
// import type StateBlock from "markdown-it/lib/rules_block/state_block.mjs";

const blockTagPlugin = (
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

  const blockTagRule = (
    // deno-lint-ignore no-explicit-any
    state: any, /* StateBlock */
    startLine: number,
    endLine: number,
    silent: boolean,
  ) => {
    let start = state.bMarks[startLine];
    let max = state.eMarks[startLine];

    if (markerChar !== state.src.charCodeAt(start)) return false;

    let pos: number;
    for (pos = start + 1; pos <= max; pos++) {
      if (markerStr !== state.src[pos]) {
        break;
      }
    }

    const count = pos - start;
    if (count < markerCount) return false;

    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max).trim();

    const nameAttr = params.split(" ")[0];
    if (!nameAttr) return false;

    if (silent) return true;

    const stack: { type: "open" | "close"; line: number }[] = [{
      type: "open",
      line: startLine,
    }];
    let autoClosed = false;

    let nextLine = startLine;
    for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
      start = state.bMarks[nextLine];
      max = state.eMarks[nextLine];

      if (markerChar === state.src.charCodeAt(start)) {
        for (pos = start + 1; pos <= max; pos++) {
          if (markerStr !== state.src[pos]) break;
        }

        const openCount = pos - start;
        if (openCount >= markerCount) {
          const newParams = state.src.slice(pos, max).trim();
          const newNameAttr = newParams.split(" ")[0];
          if (newNameAttr) {
            stack.push({ type: "open", line: nextLine });
          } else if (markerChar === endMarkerChar) {
            pos = state.skipSpaces(pos);
            if (pos < max) continue;

            stack.push({ type: "close", line: nextLine });
            if (
              stack.filter((s) => s.type === "open").length ===
                stack.filter((s) => s.type === "close").length
            ) {
              autoClosed = true;
              break;
            }
          }
          continue;
        }
      }

      if (endMarkerChar === state.src.charCodeAt(start)) {
        for (pos = start + 1; pos <= max; pos++) {
          if (endMarkerStr !== state.src[pos]) break;
        }

        const closeCount = pos - start;
        if (closeCount >= markerCount) {
          pos = state.skipSpaces(pos);
          if (pos < max) continue;

          stack.push({ type: "close", line: nextLine });
          if (
            stack.filter((s) => s.type === "open").length ===
              stack.filter((s) => s.type === "close").length
          ) {
            autoClosed = true;
            break;
          }
        }
      }
    }

    const tokenOpen = state.push(`block_tag_${name}_open`, options.tag, 1);
    tokenOpen.markup = markup;
    tokenOpen.block = true;
    tokenOpen.info = params;
    tokenOpen.map = [startLine, nextLine];
    tokenOpen.attrJoin("name", nameAttr);

    if (options.tag === "pre") {
      const content = state.getLines(
        startLine + 1,
        nextLine,
        state.blkIndent,
        true,
      );
      const token = state.push("text", "", 0);
      token.content = content;
    } else {
      state.md.block.tokenize(state, startLine + 1, nextLine);
    }

    if (autoClosed) {
      const tokenClose = state.push(`block_tag_${name}_close`, options.tag, -1);
      tokenClose.markup = state.src.slice(start, pos);
      tokenClose.block = true;
      tokenClose.map = [startLine, nextLine];
    }

    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  md.block.ruler.before("fence", `block_tag_${name}`, blockTagRule, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });
};

export default blockTagPlugin;
