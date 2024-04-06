import type { BytemdPlugin } from "bytemd";
export interface BytemdPluginSwitchThemeOptions {
    /**
     * using inline svg
     */
    icon?: string;
    /**
     * theme key in your formatter, default: theme
     */
    themeKey?: string;
    locale?: string;
}
export default function switchTheme(options?: BytemdPluginSwitchThemeOptions): BytemdPlugin;
