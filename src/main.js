import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入使用的elementui
import 'element-ui/lib/theme-chalk/index.css';
import '@/config/element'

import '@/assets/css/common.scss'

import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts'


// 拖动
import VueDraggableResizable from 'vue-draggable-resizable'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'


// 注册组件后即可使用
Vue.component('v-chart', ECharts)

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
