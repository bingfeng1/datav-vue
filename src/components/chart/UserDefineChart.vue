<template>
  <v-chart :options="option" :autoresize="true" style="width:100%;height:100%" />
</template>

<script>
export default {
  props:{
    options:{
      type:Object
    }
  },
  data() {
    return {
      m_option: {
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
  computed: {
    option(){
      console.log(this.options)
      return this.m_option
    }
  },
  methods: {}
};
</script>