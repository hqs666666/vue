<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    this.onload();
  },
  methods: {
    onload() {
      //页面初始化，验证登录状态
      this.$store.dispatch("login");

      //页面加载初始化store
      localStorage.getItem("store") &&
        this.$store.replaceState(
          Object.assign(
            this.$store.state,
            JSON.parse(localStorage.getItem("store"))
          )
        );

      //页面刷新重新获取token
      window.addEventListener("beforeunload", () => {
        this.$store.dispatch("refreshToken");
      });

      //定时刷新token（提前一分钟）
      var expireIn = this.$store.getters.getExpireIn;
      setInterval(_ => {
        this.$store.dispatch("refreshToken");
      }, (expireIn - 60) * 1000);
    }
  }
};
</script>
