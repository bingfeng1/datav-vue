import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 缩放比例
    scale:1,
    // echarts图的设置项，每次激活的时候传入，取消激活则清空
    option:{

    }
  },
  mutations: {
    setScale(state,num){
      state.scale = num
    },
    setOption(state,option){
      state.option = option
    }
  },
  actions: {
  },
  modules: {
  }
})
