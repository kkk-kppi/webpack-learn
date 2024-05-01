<template>
  <div id="app-wrapper">
    <div>this is a <strong>Index.vue</strong>：{{ count }}</div>
    <div class="app-wrapper__layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "index",
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
    onGoHome() {
      this.$router.push({ name: "index-home" });
    },
    onGoUserHome() {
      this.$router.push({ name: "index-user-home", params: { user: "12345" } });
    },
  },
  beforeRouteEnter(to, from, next) {
    next()
  },
});
</script>

<style>
.app-wrapper__layout {
  height: calc(100% - 50px);
}
</style>
