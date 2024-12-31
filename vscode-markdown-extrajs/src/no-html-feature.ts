import type MarkdownIt from "markdown-it";
import type { Options } from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import type { Marp } from "@marp-team/marp-core";
import markdownItAttrs from "markdown-it-attrs";
import inlineTagPlugin from "@morish000/markdown-it-extrajs/inline-tag-plugin";
import blockTagPlugin from "@morish000/markdown-it-extrajs/block-tag-plugin";
import voidTagPlugin from "@morish000/markdown-it-extrajs/void-tag-plugin";

const divOptions = {
  tag: "div", marker: ":", markerCount: 3
};

const preOptions = {
  tag: "pre",
  marker: "[",
  endMarker: "]",
  markerCount: 3
};

const spanOptions = {
  tag: "span",
  marker: "[",
  endMarker: "]",
  markerCount: 2
};

const iOptions = {
  tag: "i",
  marker: "@",
  isVoidElement: false,
  markerCount: 2
};

export const noHTMLPluginForMarkdownIt = (md: MarkdownIt): MarkdownIt => {
  return md.use(blockTagPlugin, "div", divOptions)
    .use(blockTagPlugin, "pre", preOptions)
    .use(inlineTagPlugin, "span", spanOptions)
    .use(voidTagPlugin, "i", iOptions)
    .use(markdownItAttrs);
};

export const noHTMLPluginForMarp = (marp: Marp): Marp => {
  return marp.use(blockTagPlugin, "div", divOptions)
    .use(blockTagPlugin, "pre", preOptions)
    .use(inlineTagPlugin, "span", spanOptions)
    .use(voidTagPlugin, "i", iOptions)
    .use(markdownItAttrs);
};

export const noHTMLPluginForMarpVSCode = function (md: MarkdownIt): MarkdownIt {
  const parseArgsKey = Symbol('parse-args');
  const getSymbolProperty = (obj: any, symbolDescription: string): any => {
    for (const key of Reflect.ownKeys(obj)) {
      if (typeof key === 'symbol') {
        if (key.description === symbolDescription) {
          return obj[key];
        }
      }
    }

    return undefined;
  };

  const { renderer: { render }, parse } = md;
  md.parse = function (...args: [src: string, env: any]): Token[] {
    (md as any)[parseArgsKey] = args;
    return parse.apply(md, args);
  };
  md.renderer.render = function (...args: [tokens: Token[], options: Options, env: any]): string {
    let marpVSCode = getSymbolProperty(md, 'marp-vscode') as Marp;
    const parseArgs = (md as any)[parseArgsKey] as [src: string, env: any];
    if (marpVSCode?.markdown && parseArgs) {
      marpVSCode = noHTMLPluginForMarp(marpVSCode);
      return render.apply(
        md.renderer,
        [marpVSCode.markdown.parse.apply(marpVSCode.markdown, parseArgs),
        ...(args.slice(1) as [options: Options, env: any])]);
    } else {
      return render.apply(md.renderer, args);
    }
  };
  return md;
};
