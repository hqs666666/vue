<template>
    <div class="layout">
        <navbar class="app-navbar"></navbar>
        <sidebar class="app-sidebar"></sidebar>
        <appmain class="app-appmain"></appmain>
    </div>
</template>

<script>
import SideBar from "./components/sidebar.vue";
import NarBar from "./components/navbar.vue";
import AppMain from "./components/appmain.vue";

export default {
    name:"layout",
    components:{
        "sidebar":SideBar,
        "navbar":NarBar,
        "appmain":AppMain
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
}
</style>
