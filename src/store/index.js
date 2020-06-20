import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 缩放比例
    scale:1,
    // 激活的可移动区域
    activeArea:[

    ],
  },
  mutations: {
    setScale(state,num){
      state.scale = num
    },
    // 增加单个激活区域
    setSimpleActiveArea(state,area){
      state.activeArea = [area]
    },
    // 增加多个激活区域
    setMultipleActiveArea(state,area){
      state.activeArea = [...state.activeArea,area]
    },
    // 取消激活
    clearAcriveArea(state){
      state.activeArea = []
    },

  },
  actions: {
  },
  modules: {
  }
})
