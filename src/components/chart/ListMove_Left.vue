<template>
  <div class="listmove">
    <ul ref="list" @mouseenter="stopMove" @mouseleave="startMove">
      <li v-for="item in lists" :key="item.name" :style="animated&&move">
        <span>{{item.date}}</span>
        <span>{{item.name}}</span>
        <span>{{item.address}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: undefined,
      maxWidth: 0,
      animated: false,
      lists: [
        {
          date: "2016-05-02",
          name: "1",
          address: "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路"
        },
        {
          date: "2016-05-04",
          name: "2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "3",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    stopMove() {
      clearInterval(this.timer);
    },
    async startMove() {
      // 这里先获取最长的那一条
      let tds = Array.from(this.$refs.list.querySelectorAll("li"));
      let allWidths = tds.map(v => v.scrollWidth);
      // 获取最大的长度
      this.maxWidth = Math.max(...allWidths) + 100;
      await this.$nextTick();
      this.timer = setInterval(() => {
        this.animated = true;
        this.listMove()
      }, 6000);
    },
    listMove() {
      setTimeout(() => {
        this.animated = false;
      }, 5000);
    }
  },
  computed: {
    move() {
      // this.startMove()
      return {
        transform: `translateX(-${this.maxWidth}px)`,
        transition: `all 5s linear`
      };
    }
  },
  mounted() {
    this.startMove();
  }
};
</script>

<style lang="scss" scoped>
.listmove {
  height: 100%;
  overflow: auto;
}

ul {
  max-width: 300px;
  overflow: hidden;
}

li {
  padding: 0 16px;
  height: 40px;
  white-space: nowrap;
}
</style>