<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<style>
#app {
  color: red;
  font-size: 20px;
}
/* 一级路由包裹容器 */
#app-wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
/* 加载一级路由容器的loading模板和加载错误显示模板 */
#app-page-loading, #app-page-error{
  height: 100%;
  width: 100%;
}
</style>
