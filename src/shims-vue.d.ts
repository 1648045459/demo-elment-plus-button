/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'

declare module 'base58check';
declare module 'csprng';
declare module 'nprogress';
declare module 'vue3-qr-reader';