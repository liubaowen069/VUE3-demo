/**
* @author liubaowen
* @createDate 2021/07/17 09:38:38
* 
*/

import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
  } from 'vue-router'
  import Home from '@/views/home.vue'
  import Layout from '@/layout/layout.vue'
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: '登录页',
      component: () => import('@/views/login.vue'),
      children: [
      ]
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      meta: { title: '首页', isShow: true },
      children: [
      ]
    },
    {
      path: '/user',
      name:'用户管理',
      component: Layout,
      meta: { title: '用户管理', isShow: true },
      children: [
        {
          path: '/userInfo',
          name:'用户信息',
          meta: { title: '用户信息', isShow: true },
          component: () => import('@/views/user/userInfo/index.vue')
        },
        {
          path: '/account',
          name:'账号管理',
          meta: { title: '账号管理', isShow: true },
          component: () => import('@/views/user/account/index.vue')
        }
      ]
    },
    
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router
  