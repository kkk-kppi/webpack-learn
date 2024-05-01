import Vue from "vue";
import App from './App.vue'
// common & font css
import './assets/css/common.css'
import './assets/css/font.css'
// vue-router
import AppRouter from "./router";
// vuex
import Store from "./store";


function AppBootstrap() {

    // 创建app实例
    // 指定router和store
    const app = new Vue({
        store: Store,
        router: AppRouter,
        render: (h) => h(App)
    })


    // 挂载App
    app.$mount("#app")
}
AppBootstrap()