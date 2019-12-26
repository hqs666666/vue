<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import AppHeader from "./app_header.vue";
export default {
  name: "layout",
  components: {
    "app-header": AppHeader
  }
};
</script>
<style scoped>
.container {
  margin-top: 60px;
  padding: 10px;
}
</style>