<template>
<Header class="header">
    <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo" @click="turnHome">假装是个logo</div>
        <div class="layout-nav">
            <div class="demo-avatar">
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                <Dropdown trigger="click" @on-click="clickMenu">
                    <a href="javascript:void(0)" class="name">
                        <span>{{username}}</span>
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="exit">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

        </div>
    </Menu>
</Header>
</template>

<script>
import {removeToken} from "@/utils/auth"
export default {
    name: "navbar",
    data(){
        return{
            username:this.$store.getters.user.name
        }
    },
    methods: {
        turnHome: function () {
            this.$router.push('/');
        },
        clickMenu:function(name){
            if(name === "exit"){
                removeToken();
                localStorage.removeItem('store');
                this.$router.push('/login');
            }
        }
    }
}
</script>

<style>
.header {
    position: fixed;
    width: 100%;
}

.layout-logo {
    color: white;
    float: left;
    cursor: pointer;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}

.demo-avatar{
    text-align: right;
}

.name{
    color: white;
}
</style>
