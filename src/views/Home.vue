<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <!-- 模板具体的增删改查部分 -->
      <el-main>
        <el-row :gutter="10">
          <el-col :span="2" v-for="item in s_templates" :key="item._id">
            <router-link :to="`/screen_option/${item._id}`">
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

      <!-- 新增大屏弹出层 -->
      <el-dialog :visible.sync="createShow" width="80%" title="增加大屏">
        <CreateTemplate />
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import {reqGetLargeScreen} from '@/api'
export default {
  // 模板数据，先试用模拟数据
  name: "Home",
  data() {
    return {
      s_templates: [
        
      ],
      createShow: false
    };
  },
  created() {
    // 获取已创建的大屏
    this.getTemplate()
  },
  components: {
    CreateTemplate: () => import("@/components/home/CreateTemplate")
  },
  methods: {
    addTemplate() {
      this.createShow = true;
    },
    async getTemplate(){
      let {data} = await reqGetLargeScreen()
      this.s_templates = data
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

.el-message-box.msgBox {
  width: 700px;
}
</style>