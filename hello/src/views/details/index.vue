<template>
  <div>{{id}}</div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      id: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
  }
};
</script>