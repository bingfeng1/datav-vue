<template>
  <div>
    <header>头部操作部分，控制以下部分</header>
    <main class="flex">
      <div style="flex:1">图层叠加</div>
      <div style="flex:1">
        <ul>
          <li v-for="item in componentList" :key="item.id" @click="addComponent(item)">{{item.name}}</li>
        </ul>
      </div>
      <div style="flex:6;position:relative;overflow:auto;" ref="showScreen">
        <div :style="screen">
          <component
            v-for="item in my_components"
            :is="item.codeName"
            :key="item.id"
            :scale="scale"
          ></component>
        </div>
      </div>
      <div style="flex:1.5">组件配置</div>
    </main>
  </div>
</template>

<script>
import { reqGetComponents } from "@/api";
export default {
  data() {
    return {
      width: 1920,
      height: 1080,
      scale: 1,
      componentList: [],
      my_components: []
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
        transform: `scale(${this.scale})`,
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
        reqGetComponents().then(res => {
          // console.log(res)
          let { data } = res;
          console.log(data)
          this.my_components = [...data];
          this.componentList = [...data];
        });
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
        this.scale = +widthPer;
      });
    },


    addComponent(item){
      this.my_components.push(item);  
    }
  },
  components: {
    LineChart: () => import("@/components/chart/line")
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