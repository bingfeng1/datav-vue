<template>
  <vue-draggable-resizable
    :w="width"
    :h="height"
    @dragging="onDrag"
    @resizing="onResize"
    :parent="true"
    :scale="scale"
  >
    <v-chart :options="option" :autoresize="true" style="width:100%;height:100%" />
  </vue-draggable-resizable>
</template>

<script>
export default {
  props: {
    scale: Number
  },
  data() {
    return {
      width: 600,
      height: 600,
      x: 0,
      y: 0,
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      }
    };
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    }
  }
};
</script>