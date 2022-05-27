import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/permission";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "./style/index.css"; //全局样式
import vueI18n from './locales/index'
// svg component
// 二维码插件
import QrcodeVue from 'qrcode.vue'
import * as ElIconModules from '@element-plus/icons-vue';
// 扫码
import { QrStream } from 'vue3-qr-reader';

import { List, Button } from 'vant';

import VConsole from "vconsole";
import { HOST } from '@/assets/constant';
for (let k in HOST) {
  if (window.location.hostname === HOST[k]) {
    new VConsole();
  }
}

const app = createApp(App);

// ----- start （注册常用组件）
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 组件文件夹的相对路径
  './components',
  // 是否查找子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
)
const requireLayout = require.context(
  // 组件文件夹的相对路径
  './layout',
  // 是否查找子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  if (fileName) {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    let param = fileName?.split('/') //.pop().replace(/\.\w+$/, '')
    let param2 = param?.pop()
    let param3 = param2?.replace(/\.\w+$/, '')
    // // 获取组件的 PascalCase 名
    const componentName = upperFirst(camelCase(param3))
    app.component(
      componentName,
      componentConfig.default || componentConfig
    )
  }
})
requireLayout.keys().forEach(fileName => {
  if (fileName) {
    // 获取组件配置
    const componentConfig = requireLayout(fileName)
    let param = fileName?.split('/') //.pop().replace(/\.\w+$/, '')
    let param2 = param?.pop()
    let param3 = param2?.replace(/\.\w+$/, '')
    // // 获取组件的 PascalCase 名
    const componentName = upperFirst(camelCase(param3))
    app.component(
      componentName,
      componentConfig.default || componentConfig
    )
  }
})
// ----- end （注册常用组件）

// web3-------
import Web3 from "web3";
let web3
if (typeof web3 !== "undefined" && web3) {
  web3 = new Web3(web3['currentProvider']);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider((window as any).WEB3_PROVIDER_HTTP));
}
app.config.globalProperties.$web3 = web3  //全局变量
// ----- end (web3)

document.title = (window as any).TITLE

// 全局引入icon
Object.keys(ElIconModules).forEach(function (key) {
  app.component(ElIconModules[key].name, ElIconModules[key]);
});
// 全局设置 svg 组件
app.component('qrcode-vue', QrcodeVue)

app.component('qr-stream', QrStream)
app.use(List);
app.use(Button);
app.use(ElementPlus, { size: 'large', zIndex: 3000 })
app.use(vueI18n);
app.use(store)
app.use(router)
app.mount("#app");
