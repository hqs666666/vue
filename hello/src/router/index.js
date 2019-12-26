import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index'),
      children: [
        {
          path: '',
          name: "首页",
          component: () => import('@/views/home'),
          meta: {
            title: '首页'
          }
        },
        {
          path: 'details/:id',
          name: "详情",
          component: () => import('@/views/details/index'),
          meta: {
            title: '详情'
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router;
