<template>
  <div id="app-template-error" @click="onClick">
    <h4>This is a template error.vue</h4>
    <div>组件加载失败或超时！请重试，如仍失败，请联系管理员反馈页面错误~</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "template-error",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    onClick() {
      console.log("handle on click......");
      this.count += 1;
    },
  },
});
</script>

<style>
div {
  color: red;
  font-size: 20px;
}
</style>
