import type {} from "unist-util-visit";
export interface MDASTCode extends Node {
  lang?: string;
  meta: null | string;
  value: string;
}

/**
 * The MDAST node after code-extra has transformed it
 */
export interface MDASTCodeExtra extends MDASTCode {
  // TODO
}