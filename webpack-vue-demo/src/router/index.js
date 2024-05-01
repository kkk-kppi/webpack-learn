import Vue from "vue";
import VueRouter from "vue-router";
// asyncComponent
// import AsyncComponent from "@/common/asyncComponent";

Vue.use(VueRouter)

const Router = new VueRouter({
    mode: 'history',
    // ERROR: Uncaught ReferenceError: process is not defined
    // because not handle at webpack.config.js
    base: process.env.APP_BASE_URL || '/',
    routes: []
})

export default Router