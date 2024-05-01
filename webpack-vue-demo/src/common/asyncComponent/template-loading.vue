<template>
  <div id="app-template-loading" @click="onClick">
    this is a App.vue：{{ count }}
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "template-loading",
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
