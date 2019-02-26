import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '后台管理',
      component: () => import('@/views/layout/layout'),
      children:[
        {
          path:'',
          name:'首页',
          component: () => import("@/views/home/index"),
        },
        {
          path:'user',
          name:'用户',
          component: () => import("@/views/user/router"),
          redirect:'/user/list',
          children:[
            {
              path:'list',
              name:'用户列表',
              component: () => import("@/views/user/list"),
            },
            {
              path:'group',
              name:'用户组管理',
              component: () => import('@/views/user/group'),
            }
          ]
        },
        {
          path:'/log/info',
          name:'操作日志',
          component: () => import("@/views/log/info"),
        },
        {
          path:'/log/fail',
          name:'操作日志',
          component: () => import("@/views/log/fail"),
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: () => import("@/views/home/login")
    }
  ]
})
