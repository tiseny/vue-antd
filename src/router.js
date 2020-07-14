import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('./views/login/login')
    },
    {
      path: '/register',
      name: '注册',
      component: () => import('./views/login/register')
    },
    {
      path: '/seniorAdmin',
      name: '用户权限管理',
      component: () => import('./views/seniorAdmin/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sysSetting',
      name: '系统设置',
      component: () => import('./views/seniorAdmin/sysSetting/sysSetting'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/logs',
      name: '用户日志',
      component: () => import('./views/seniorAdmin/logs/logs'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/adminReport',
      name: '首页报表',
      component: () => import('./views/admin/index'),
      meta: {
        requireAuth: true
      }
    },
    
    {
      path: '/user',
      name: '个人中心',
      component: () => import('./views/user/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/test',
      name: '测试',
      component: () => import('./views/test/index'),
      meta: {
        requireAuth: true
      }
    }
  ]
})


/**
 * 全局路由守卫
 */
router.beforeEach((to, from, next) => {
  if( !to.meta.requireAuth){
    next()
  } else {
    if(sessionStorage.getItem('role') !== '' && sessionStorage.getItem('role') !== undefined && sessionStorage.getItem('role') !== null){
      next()
    }else {
      next({path: '/login'})
    }
  }
})


export default router