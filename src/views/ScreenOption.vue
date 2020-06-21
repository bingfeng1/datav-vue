<template>
  <div>
    <header class="testdo">头部操作部分，控制以下部分</header>
    <main class="flex">
      <div style="flex:1">
        <ul>
          <li
            v-for="item in my_components"
            :key="item._id"
            @click="deleteComponent(item._id)"
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
          <DragResizeDiv v-for="item in my_components" :key="item._id" :item="item">
            <component :is="item.codeName" :item="item"></component>
          </DragResizeDiv>
        </div>
      </div>
      <div style="flex:1.5">组件配置</div>
    </main>
  </div>
</template>

<script>
import {
  reqGetComponents,
  reqGetLargeScreenById,
  reqPostCustomComponent,
  reqDeleteCustomComponentById,
  reqGetCusteomComponent
} from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      width: 1920,
      height: 1080,
      // 所有已拥有的组件
      componentList: [],
      // 本模板添加的组件
      my_components: [],
      // 模板id
      template_id: ""
    };
  },
  components: {
    // 拖动组件
    DragResizeDiv: () => import("@/components/common/DragResizeDiv"),
    LineChart: () => import("@/components/chart/Line"),
    TestChart: () => import("@/components/chart/Test3D"),
    ListMoveTop: () => import("@/components/chart/ListMove_Top"),
    ListMoveLeft: () => import("@/components/chart/ListMove_Left"),
    UserDefineChart: () => import("@/components/chart/UserDefineChart")
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
    async init() {
      let { id } = this.$route.params;
      this.template_id = id;
      // 查寻数据库所保存的长宽属性
      let { data: screenConfig } = await reqGetLargeScreenById(id);

      // 将模板的长宽放入
      let { width, height } = screenConfig;
      this.width = width;
      this.height = height;

      // 这里进入数据库查询，并将相关组件进行页面布局操作
      let { data } = await reqGetComponents();
      this.componentList = [...data];

      // 获取本大屏已使用的组件
      let { data: s_data } = await reqGetCusteomComponent(id);
      this.my_components = [...s_data];

      // 这里计算大小比例
      this.$nextTick(() => {
        // 获取当前外层的大小
        let { clientWidth, clientHeight } = this.$refs.showScreen;

        // 当前需要绘制大屏的大小
        let widthPer = clientWidth / this.width;
        let heightPer = clientHeight / this.height;

        // 获取合理的长宽比（后期需要使用类似图片放大镜效果，这里临时使用）
        if (widthPer > heightPer) {
          widthPer = heightPer;
        }

        widthPer = widthPer.toFixed(2);
        this.$store.commit("setScale", +widthPer);
      });
    },

    // 增加组件
    async addComponent(item) {
      // 这里应该需要触发数据库，从后端生成一个id，再返回给页面
      // 保存在数据库
      let { data } = await reqPostCustomComponent({
        ...item,
        parent_id: this.template_id // 这里需要大屏组件的id
      });

      this.my_components.push(data);
    },

    // 删除组件
    async deleteComponent(id) {
      // 根据id删除
      let { data } = await reqDeleteCustomComponentById(id);
      // 如果有删除条目（通过id删除，一定唯一）
      if (data.deletedCount === 1) {
        // 在数组中排除
        let index = this.my_components.findIndex(item => {
          return item._id === id;
        });

        this.my_components.splice(index, 1);
      } else {
        // 这里是删除发生错误
        this.$message({
          message: "删除失败，删除的id:" + id,
          type: "error"
        });
        console.error("删除失败的组件id:" + id);
      }
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