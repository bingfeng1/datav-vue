<template>
  <div class="listmove">
    <table ref="table" @mouseenter="stopMove" @mouseleave="startMove">
      <tbody :class="animated&&'move'">
        <tr v-for="item in lists" :key="item.name">
          <td>{{item.date}}</td>
          <td>{{item.name}}</td>
          <td>{{item.address}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: undefined,
      firstTop: 0,
      animated: false,
      lists: [
        {
          date: "2016-05-02",
          name: "1",
          address:
            "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路"
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
    startMove() {
      this.timer = setInterval(() => {
        this.animated = true;
        this.listMove()
      }, 2000);
    },
    listMove(){
      setTimeout(() => {
        this.animated = false;
        this.lists.push(this.lists.shift());
      }, 1000);

    },
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

.move {
  transform: translateY(-40px);
  transition: all 1s linear;
}

table td {
  padding: 0 16px;
  height: 40px;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>