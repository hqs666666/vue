<template>
    <div class="layout">
        <navbar class="app-navbar"></navbar>
        <sidebar class="app-sidebar"></sidebar>
        <appmain class="app-appmain"></appmain>
        <appfooter class="app-footer"></appfooter>
    </div>
</template>

<script>
import SideBar from "./components/sidebar.vue";
import NarBar from "./components/navbar.vue";
import AppMain from "./components/appmain.vue";
import AppFooter from "./components/appfooter.vue";

export default {
    name:"layout",
    components:{
        "sidebar":SideBar,
        "navbar":NarBar,
        "appmain":AppMain,
        "appfooter":AppFooter
    }
}
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
</style>
