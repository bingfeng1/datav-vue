import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 如果没有id参数，那就进入初始化模板页面
  {
    path: '/screen_option',
    name: 'screen_option',
    component: () => import(/* webpackChunkName: "option" */ '@/views/ScreenOption.vue')
  },
  // 如果有参数，那就根据参数进入修改页面
  {
    path: '/screen_option/:id',
    name: 'screen_option',
    component: () => import(/* webpackChunkName: "option" */ '@/views/ScreenOption.vue')
  },
  {
    path: '/test',
    component: () => import(/* webpackChunkName: "option" */ '@/components/chart/ListMove_Left.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
