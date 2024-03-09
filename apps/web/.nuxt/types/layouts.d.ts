import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "footer" | "header"
declare module "../../../../node_modules/.pnpm/nuxt@3.10.3_less@4.2.0_vite@5.1.5/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}