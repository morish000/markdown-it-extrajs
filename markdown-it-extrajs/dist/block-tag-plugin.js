const blockTagPlugin = (md, name, options) => {
  const markerStr = options.marker.charAt(0);
  const markerCount = options.markerCount;
  const endMarkerStr = options.endMarker ? options.endMarker.charAt(0) : markerStr;
  const blockTagRule = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (markerStr !== state.src[start]) return false;
    let pos;
    for (pos = start + 1; pos <= max; pos++) {
      if (markerStr !== state.src[pos]) {
        break;
      }
    }
    const count = pos - start;
    if (count < markerCount) return false;
    const params = state.src.slice(pos, max).trim();
    const nameAttr = params.split(" ")[0];
    if (!nameAttr || name !== nameAttr) return false;
    const markup = `${state.src.slice(start, pos)} ${nameAttr}`;
    if (silent) return true;
    const stack = [{
      type: "open",
      line: startLine
    }];
    let autoClosed = false;
    let nextLine;
    let markupEnd = "<!-- auto-closed -->";
    for (nextLine = startLine + 1; nextLine <= endLine; nextLine++) {
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (markerStr === state.src[start]) {
        for (pos = start + 1; pos <= max; pos++) {
          if (markerStr !== state.src[pos]) break;
        }
        const openCount = pos - start;
        if (openCount >= markerCount) {
          const newParams = state.src.slice(pos, max).trim();
          const newNameAttr = newParams.split(" ")[0];
          if (newNameAttr) {
            stack.push({ type: "open", line: nextLine });
          } else if (markerStr === endMarkerStr) {
            pos = state.skipSpaces(pos);
            if (pos < max) continue;
            stack.push({ type: "close", line: nextLine });
            if (stack.filter((s) => s.type === "open").length === stack.filter((s) => s.type === "close").length) {
              markupEnd = state.src.slice(start, pos);
              autoClosed = true;
              break;
            }
          }
          continue;
        }
      }
      if (endMarkerStr === state.src[start]) {
        for (pos = start + 1; pos <= max; pos++) {
          if (endMarkerStr !== state.src[pos]) break;
        }
        const closeCount = pos - start;
        if (closeCount >= markerCount) {
          pos = state.skipSpaces(pos);
          if (pos < max) continue;
          stack.push({ type: "close", line: nextLine });
          if (stack.filter((s) => s.type === "open").length === stack.filter((s) => s.type === "close").length) {
            markupEnd = state.src.slice(start, pos);
            autoClosed = true;
            break;
          }
        }
      }
    }
    const lineMaxOrg = state.lineMax;
    state.lineMax = nextLine;
    const tokenOpen = state.push(`block_tag_${name}_open`, options.tag, 1);
    tokenOpen.markup = markup;
    tokenOpen.block = true;
    tokenOpen.info = params;
    tokenOpen.map = [startLine, nextLine - (autoClosed ? 0 : 1)];
    tokenOpen.attrJoin("data-block-tag-name", nameAttr);
    if (options.tag === "pre") {
      const content = state.getLines(
        startLine + 1,
        nextLine,
        state.blkIndent,
        true
      );
      const token = state.push("text", "", 0);
      token.content = content;
    } else {
      state.md.block.tokenize(state, startLine + 1, nextLine);
    }
    const tokenClose = state.push(`block_tag_${name}_close`, options.tag, -1);
    tokenClose.markup = markupEnd;
    tokenClose.block = true;
    tokenClose.map = [startLine, nextLine - (autoClosed ? 0 : 1)];
    state.lineMax = lineMaxOrg;
    state.line = nextLine + (autoClosed ? 1 : 0);
    return true;
  };
  md.block.ruler.before("fence", `block_tag_${name}`, blockTagRule, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
};
var block_tag_plugin_default = blockTagPlugin;
export {
  block_tag_plugin_default as default
};
//# sourceMappingURL=block-tag-plugin.js.map
