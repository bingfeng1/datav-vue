
<template>
  <vue-draggable-resizable
    :w="width"
    :h="height"
    :x="x"
    :y="y"
    @dragging="onDrag"
    @resizing="onResize"
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
import { debounce } from "@/util";
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
    onResize: debounce((_this, x, y, width, height) => {
      _this.x = x*_this.scale
      _this.y = y*_this.scale
      _this.width = width*_this.scale
      _this.height = height*_this.scale
      
    }, 2000),
    // 调整方位
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
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
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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