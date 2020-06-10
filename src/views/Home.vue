<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <!-- 模板具体的增删改查部分 -->
      <el-main>
        <el-row>
          <el-col :span="2" v-for="item in s_templates" :key="item.id">
            <router-link :to="`/screen_option/${item.id}`">
              <el-card>
                {{item.name}}
              </el-card>
            </router-link>
          </el-col>
          <el-col :span="2">
            <router-link :to="`/screen_option`">
              <el-card>
                123
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 模板数据，先试用模拟数据
  name:'Home',
  data(){
    return {
      s_templates:[
        {
          name:'大屏1',
          id:'1'  // 数据库自带
        }
      ]
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

</style>