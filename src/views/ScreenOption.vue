<template>
  <div>
    <header class="testdo">头部操作部分，控制以下部分</header>
    <main class="flex">
      <div style="flex:1">
        <ul>
          <li
            v-for="item in my_components"
            :key="item.my_id"
            @click="deleteComponent(item.my_id)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div style="flex:1">
        <ul>
          <li v-for="item in componentList" :key="item.id" @click="addComponent(item)">{{item.name}}</li>
        </ul>
      </div>
      <div style="flex:6;position:relative;overflow:auto;" ref="showScreen">
        <div :style="screen">
          <DragResizeDiv v-for="item in my_components" :key="item.my_id">
            <component :is="item.codeName"></component>
          </DragResizeDiv>
        </div>
      </div>
      <div style="flex:1.5">组件配置</div>
    </main>
  </div>
</template>

<script>
import { getUuid } from "@/util";
import { reqGetComponents } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      width: 1920,
      height: 1080,
      // 所有已拥有的组件
      componentList: [],
      // 本模板添加的组件
      my_components: []
    };
  },
  components: {
    // 拖动组件
    DragResizeDiv: () => import("@/components/common/DragResizeDiv"),
    LineChart: () => import("@/components/chart/Line"),
    TestChart: () => import("@/components/chart/Test3D"),
    ListMoveTop: () => import("@/components/chart/ListMove_Top"),
    ListMoveLeft: () => import("@/components/chart/ListMove_Left")
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
    },
    ...mapState(["scale"])
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
        this.$store.commit("setScale", +widthPer);
      });
    },

    // 增加组件
    addComponent(item) {
      let _item = Object.assign({}, item);
      _item.my_id = getUuid();
      this.my_components.push(_item);
    },

    // 删除组件
    deleteComponent(id) {
      console.log(id);
      let index = this.my_components.findIndex(item => {
        return item.my_id === id;
      });
      this.my_components.splice(index, 1);
    }
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

.testdo {
  animation: todo 5s ease-in;
  display: inline-block;
  @keyframes todo {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>