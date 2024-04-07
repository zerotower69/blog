import type { BytemdPlugin } from "bytemd";
export type Locale = {};
export type ExcludeItem = string | RegExp;
export interface WebInfo {
    title: string;
    desc: string;
    icon: string;
    baseUrl: string;
    host: string;
    url: string;
}
export interface ByteMDPluginCardLinkOptions {
    /**
     * switch languages as you like.
     */
    locale?: Locale;
    /**
     * indicate links which don't need to transform.
     */
    exclude?: ExcludeItem | ExcludeItem[];
    /**
     * will be using to fetch the info of web
     */
    loadInfoApi?: (url: string) => Promise<Partial<WebInfo>>;
    /**
     * define the value of the property [href] of a element,
     * default: blank
     */
    openMode: "self" | "blank";
    /**
     * when loadInfoApi timeout>= options.timeout, using default data
     * default: 30s
     */
    timeout?: number;
    /**
     * will be using then webinfo hasn't the icon property or loading icon occur error.
     * default: https://bpic.588ku.com/element_origin_min_pic/00/72/81/9356def45e71de5.jpg
     */
    defaultIcon?: String;
    /**
     * skeleton card root class, you can use it to change the styles of skeleton card.
     */
    skeletonWrapClass?: string;
    /**
     * data card root class, you can use it to change the styles of data card
     */
    dataWrapClass?: string;
}
export default function cardLink(options?: ByteMDPluginCardLinkOptions): BytemdPlugin;
export declare const classNameToArray: (cls?: string) => string[];
export declare const hasClass: (el: Element, cls: string) => boolean;
export declare const addClass: (el: Element, cls: string) => void;
export declare const removeClass: (el: Element, cls: string) => void;
