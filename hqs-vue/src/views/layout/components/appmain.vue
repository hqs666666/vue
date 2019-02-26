<template>
<Content class="content">
    <Breadcrumb class="bread">
        <BreadcrumbItem v-for="item in breadcrumbs" :key="item.path">
            {{item.name}}
        </BreadcrumbItem>
    </Breadcrumb>
    <router-view />
</Content>
</template>

<script>
export default {
    name: "appmain",
    data() {
        return {
            breadcrumbs: null,
        }
    },
    watch: {
        $route: function () {
            this.getBreadcrumb();
        }
    },
    created: function () {
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb: function () {
            let matched = this.$route.matched.filter(item => item.name);
            this.breadcrumbs = matched;
        }
    }
}
</script>

<style scoped>
.content {
    padding: 80px 15px 15px 215px;
    background: #fff;
    width: 100%;
    height: auto;
}

.bread {
    padding: 0 0 15px 0;
}
</style>
