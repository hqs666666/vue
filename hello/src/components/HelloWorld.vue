<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="item in data" :value="item.id" :key="item.id">{{item.userName}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import QS from "qs";
import Cookies from "js-cookie";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      data: []
    };
  },
  created() {
    var sessionId = Cookies.get("Finance_SessionId");
    console.log(sessionId);
    if(!sessionId) window.location.href = "http://crm.t.cn";

    var tokeninfo = JSON.parse(sessionId);
    console.log(tokeninfo);
    var access_token = tokeninfo.access_token;
    var token_type = tokeninfo.token_type;
    console.log(access_token, token_type);
    if(!access_token) window.location.href = "http://crm.t.cn";

    this.getApi()
      .then(res => {
        console.log(res);
        this.data = res.data;
      })
      .catch(err => console.log(err));
  },
  methods: {
    getApi(token, token_type) {
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = token_type + " " + token;
          return config;
        },
        function(error) {
          return Promise.reject(error);
        }
      );

      return new Promise((resolve, reject) => {
        axios
          .get("http://api.t.cn/home", { pageIndex: 1, pageSize: 10 })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err.data);
          });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
