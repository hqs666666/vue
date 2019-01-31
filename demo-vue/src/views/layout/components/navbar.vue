<template>
<Header class="header">
    <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo" @click="turnHome">假装是个logo</div>
        <div class="layout-nav">
            <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            Item 1
            </MenuItem>
            <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Item 2
            </MenuItem>
            <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            Item 3
            </MenuItem>
            <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            Item 4
            </MenuItem>
        </div>
    </Menu>
</Header>
</template>

<script>
export default {
    name: "navbar",
    methods:{
        turnHome:function(){
            this.$router.push('/');
        }
    }
}
</script>

<style>
.header {
    position: fixed;
    width: 100%;
}
.layout-logo{
    color: white;
    float: left;
    cursor: pointer;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
