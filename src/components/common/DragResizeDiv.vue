
<template>
  <vue-draggable-resizable
    :w="width"
    :h="height"
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
export default {
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
  methods: {
    // 调整大小
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    // 调整方位
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    },
    // 当激活时
    onActivated() {
      // this.$store.commit("setOption", this.option);
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