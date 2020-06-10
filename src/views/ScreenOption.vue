<template>
  <div>
    <header>头部操作部分，控制以下部分</header>
    <main class="flex">
      <div style="flex:1">图层叠加</div>
      <div style="flex:1">组件列表</div>
      <div style="flex:6">
        <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
          <LineChart></LineChart>
        </div>
      </div>
      <div style="flex:1.5">组件配置</div>
    </main>
  </div>
</template>

<script>
import {LineChart} from '@/components/chart'
export default {
  
  beforeMount() {},
  methods: {
    // 页面初始化操作
    init() {
      let { id } = this.$route.params;
      if (id) {
        // 这里进入数据库查询，并将相关组件进行页面布局操作
      } else {
        //   进入配置设置页面，默认1080p
      }
    }
  },
  components:{
      LineChart
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 60px;
}
main {
  height: calc(100vh - 60px);
}
main > div {
  outline: 1px solid black;
  margin: 8px;
}
.flex {
  display: flex;
}
</style>