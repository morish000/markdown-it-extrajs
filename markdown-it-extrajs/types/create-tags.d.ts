import type { ExtraJSFrontMatter, ExtraJSOptions } from "./types.js";
export declare const escapeScriptClosingTags: (str: string) => string;
export declare const escapeForHTML: (str: string) => string;
export declare const createTemplateTag: (options: ExtraJSOptions, frontMatter: ExtraJSFrontMatter) => string;
export declare const createScriptTag: (options: ExtraJSOptions, frontMatter: ExtraJSFrontMatter) => string;
