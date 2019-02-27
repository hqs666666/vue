<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
import {decrypt,encrypt} from '@/utils/secret'
import { getToken } from '@/utils/auth'
export default {
    name: 'App',
    beforeCreate:function(){    //页面创建前
        this.$Spin.show();
    },
    created:function(){     //页面创建后
        this.$Spin.hide();
        //页面加载完成，初始化store
        if(localStorage.getItem('store')){
            var decryptStore = decrypt(localStorage.getItem("store"));
            this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(decryptStore)));
        }

        //监听页面刷新，刷新前保存store信息
        window.addEventListener('beforeunload', () => {
            if(getToken()){
                var store = encrypt(JSON.stringify(this.$store.state));
                localStorage.setItem('store',store);
            }
        });

        //定时刷新token
        window.setInterval(function(){
            this.$store.dispatch("Refresh", {token: this.$store.getters.user.refreshToken})
            .catch((err) => {
                console.log(err);
                this.$Message.error('会话已过期，请重新登录');
                this.$router.push('/login');
            });
        },this.$store.getters.user.nextRefreshMillisecond);
    }
}
</script>
