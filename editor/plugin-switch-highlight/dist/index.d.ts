import type { BytemdPlugin } from "bytemd";
export interface BytemdPluginSwitchHighlightOptions {
    /**
     * using inline svg
     */
    icon?: string;
    /**
     * highlight key in your formatter, default: theme
     */
    highlightKey?: string;
    /**
     * you can use different languages for as you like!
     */
    locale?: string;
    /**
     * using cdn highlight styles:
     * jsdeliver
     */
    cdn?: string[];
    highlights?: string[];
}
export default function switchHighlight(options?: BytemdPluginSwitchHighlightOptions): BytemdPlugin;
