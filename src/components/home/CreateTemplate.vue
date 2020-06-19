<template>
  <el-form ref="form" :model="form" label-width="80px">
      <!-- 这里设置模板中文名 -->
    <el-form-item label="模板名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <!-- 宽高可联动调整 -->
    <el-row type="flex" align="middle" justify="space-between">
      <el-col :span="10">
        <el-form-item label="模板宽度" style="margin-bottom:0">
          <el-input-number v-model="form.width" controls-position="right" :min="1"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-switch v-model="lock" active-text="锁定" @change="getPer"></el-switch>
      </el-col>
      <el-col :span="10">
        <el-form-item label="模板高度" style="margin-bottom:0">
          <el-input-number v-model="form.height" controls-position="right" :min="1"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item style="margin-top:22px" class="right">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        width: 1920,
        height: 1080
      },
      lock: true,
      per: 1920 / 1080
    };
  },
  watch: {
    ["form.width"](newValue) {
      if (this.lock) {
        this.form.height = (newValue / this.per).toFixed(0);
      }
    },
    ["form.height"](newValue) {
      if (this.lock) {
        this.form.width = (newValue * this.per).toFixed(0);
      }
    }
  },
  methods: {
    onSubmit() {
      // 2、根据提交内容传给数据库
      

      // 3、根据得到的数据库id，作为参数跳转路由
    },
    getPer(e) {
      if (e) {
        this.per = this.form.width / this.form.height;
      }
    }
  }
};
</script>