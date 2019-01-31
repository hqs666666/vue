<template>
<Content class="content">
    <Layout>
        <Sider hide-trigger class="sider">
            <Menu theme="light" width="auto" @on-select="turnUrl" :accordion="accordion" :active-name="active" :open-names="opennames">
                <Submenu v-for="item in menus" :key="item.name" :name="item.name">
                    <template :slot="item.slot">
                        <Icon :type="item.type"></Icon>
                        {{item.value}}
                    </template>
                    <MenuItem v-for="mitem in item.children" :key="mitem.name" :name="mitem.name">
                    {{mitem.value}}
                    </MenuItem>
                </Submenu>
            </Menu>
        </Sider>
    </Layout>
</Content>
</template>

<script>
export default {
    name: "sidebar",
    data() {
        return {
            accordion: true,
            active: "/",
            opennames:[],
            menus: [{
                    name: "user",
                    slot: "title",
                    type: "ios-contacts",
                    value: "用户管理",
                    children: [{
                        value: "用户列表",
                        name: "/user/list"
                    }, {
                        value: "用户组管理",
                        name: "/user/group"
                    }]
                },
                {
                    name: "log",
                    slot: "title",
                    type: "ios-paper",
                    value: "日志信息",
                    children: [{
                        value: "操作日志",
                        name: "/log/info"
                    }, {
                        value: "异常日志",
                        name: "/log/fail"
                    }]
                },
            ]
        }
    },
    created: function () {
        this.init();
    },
    methods: {
        turnUrl: function (name) {
            this.$router.push(name);
        },
        init: function () {
            var currentPath = this.$router.history.current.path;
            var array = currentPath.split('/')
            this.opennames.push(array[1]);
            this.active = currentPath;
        },
    }
}
</script>

<style scoped>
.content {
    min-height: 280px;
    background: #fff;
    position: fixed;
    top: 65px;
}

.sider {
    background: #fff;
}
</style>
