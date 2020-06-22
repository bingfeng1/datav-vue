
<template>
  <vue-draggable-resizable
    :w="width"
    :h="height"
    :x="x"
    :y="y"
    @dragstop="onDrag"
    @resizestop="onResize"
    :scale="scale"
    :parent="true"
    @activated="onActivated"
  >
    <!-- 内容区域，尝试使用多层嵌套完成 -->
    <div class="container">
      <slot />
    </div>
  </vue-draggable-resizable>
</template>


<script>
import { mapState } from "vuex";
import { reqPutCustomComponent } from "@/api";
export default {
  props: ["item"],
  data() {
    return {
      width: 600,
      height: 600,
      x: 0,
      y: 0
    };
  },
  computed: {
    ...mapState(["scale"])
  },
  created() {
    this.mergeAttr();
  },
  methods: {
    // 调整大小
    onResize(x, y, width, height) {
      // 这里的参数，都将存入数据库，用于update
      let _id = this.item._id;
      let attr = {
        x,
        y,
        width,
        height
      };
      reqPutCustomComponent({
        _id,
        attr
      }).then(res => {
        if (res.data._id) {
          this.$message({
            type: "success",
            message: "数据更新成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "数据更新失败"
          });
        }
      });
    },
    // 调整方位
    onDrag(x, y) {
      // 这里的参数，都将存入数据库，用于update
      let _id = this.item._id;
      let attr = {
        x,
        y,
        width: this.width,
        height: this.height
      };
      reqPutCustomComponent({
        _id,
        attr
      }).then(res => {
        if (res.data._id) {
          this.$message({
            type: "success",
            message: "数据更新成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "数据更新失败"
          });
        }
      });
    },
    // 当激活时
    onActivated() {
      // this.$store.commit("setOption", this.option);
    },
    // 合并传入的参数
    mergeAttr() {
      // 合并属性
      if (this.item.attr) {
        let { x, y, width, height } = this.item.attr;
        x && (this.x = x);
        y && (this.y = y);
        width && (this.width = width);
        height && (this.height = height);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>