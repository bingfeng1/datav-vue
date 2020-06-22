
<template>
  <vue-draggable-resizable
    :w="m_item.attr.width"
    :h="m_item.attr.height"
    :x="m_item.attr.x"
    :y="m_item.attr.y"
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
  computed: {
    ...mapState(["scale"]),
    m_item() {
      let _item = { ...this.item };
      return _item;
    }
  },
  methods: {
    // 调整大小
    onResize(x, y, width, height) {
      // 这里的参数，都将存入数据库，用于update
      let _id = this.m_item._id;
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
      let _id = this.m_item._id;
      let attr = {
        x,
        y,
        width: this.m_item.attr.width,
        height: this.m_item.attr.height
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
      // this.$store.commit("setOption", this.item);
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