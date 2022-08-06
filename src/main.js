import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import axios from "axios";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { router } from "./router";
import "./router";
import "./assets/mock";

const myApp = createApp(App);

myApp.config.globalProperties.$axios = axios;

const plusIcons = new Map(Object.entries(ElementPlusIconsVue));
plusIcons.forEach((item, key) => {
  myApp.component(key, item);
});

myApp
  .use(router) // 这里将 createRouteer 路由器放入，和 vue-router@3.1.3 的区别是，vue-router4 没有默认导出，import VueRouter from "vue-router" 会报错没有默认导出
  .use(ElementPlus)
  .mount("#app");
