<template>
  <div>
    <header>头部操作部分，控制以下部分</header>
    <main class="flex">
      <div style="flex:1">图层叠加</div>
      <div style="flex:1">组件列表</div>
      <div style="flex:6;position:relative;overflow:auto;" ref="showScreen">
        <div :style="screen">
          <LineChart :scale="scale"></LineChart>
        </div>
      </div>
      <div style="flex:1.5">组件配置</div>
    </main>
  </div>
</template>

<script>
import { LineChart } from "@/components/chart";
export default {
  data() {
    return {
      width: 1920,
      height: 1080,
      scale: 1
    };
  },
  created() {
    this.init();
  },
  computed: {
    screen() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        position: "absolute",
        left: 0,
        top: 0,
        margin: 0,
        padding: 0,
        outline: "1px solid red",
        transform:`scale(${this.scale})`,
        "transform-origin": "left top"
      };
    }
  },
  methods: {
    // 页面初始化操作
    init() {
      let { id } = this.$route.params;
      if (id) {
        // 这里进入数据库查询，并将相关组件进行页面布局操作
      } else {
        //   进入配置设置页面，默认1080p
      }

      // 这里计算大小比例
      this.$nextTick(() => {
        // 获取当前外层的大小
        let { clientWidth, clientHeight } = this.$refs.showScreen;

        // 当前需要绘制大屏的大小
        let widthPer = clientWidth / this.width;
        let heightPer = clientHeight / this.height;

        if (widthPer > heightPer) {
          heightPer = widthPer;
        }

        widthPer = widthPer.toFixed(2);
        this.scale = +widthPer
      });
    }
  },
  components: {
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