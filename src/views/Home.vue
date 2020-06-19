<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <!-- 模板具体的增删改查部分 -->
      <el-main>
        <el-row :gutter="10">
          <el-col :span="2" v-for="item in s_templates" :key="item.id">
            <router-link :to="`/screen_option/${item.id}`">
              <el-card class="middle">{{item.name}}</el-card>
            </router-link>
          </el-col>
          <!-- 新增模板 -->
          <el-col :span="2">
            <el-card class="middle" @click.native="addTemplate">
              <i class="el-icon-plus"></i>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CreateTemplate from '@/components/home/CreateTemplate'
export default {
  // 模板数据，先试用模拟数据
  name: "Home",
  data() {
    return {
      s_templates: [
        {
          id: 1,
          name: "test"
        }
      ]
    };
  },
  methods: {
    // 添加模板
    addTemplate() {
      // 1、弹出，需要显示的模板名称
      // const h = this.$createElement;
      this.$elMsgBox({
          title: "消息",
          // 弹出表单层
          message: <CreateTemplate/>,
          customClass:"msgBox",
          showConfirmButton: false,
          beforeClose: (action, instance, done) => {
            console.log('关闭',action,instance,done)
            done()
          }
        })
    }
  }
};
</script>


<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
}

.el-message-box.msgBox{
  width: 700px;
}
</style>