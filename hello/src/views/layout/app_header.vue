<template>
  <div class="header">
    <div class="header-logo">
      <img width="60" alt="Vue logo" src="../../assets/logo.png" />
    </div>
    <div class="header-text">财务管理系统</div>
  </div>
</template>

<script>
export default {
  name: "app-header"
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.header {
  background: #009900;
  height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: #fff;
  font-size: 14px;
  z-index: 999;
}
.header-logo {
  padding-left: 15%;
  width: 60px;
}
.header-text {
  line-height: 60px;
  font-size: 24px;
}
</style>