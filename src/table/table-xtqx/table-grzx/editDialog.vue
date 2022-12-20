<template>
  <div style>
    <div style="display: flex;flex-wrap: wrap;">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        style="display: flex;flex-wrap: wrap;" size="mini"
      >
        <el-form-item label="用户名:" prop="login">
          <el-input v-model="form.login" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="form.name" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="pasw" style="width:300px">
          {{form.role.name}}
        </el-form-item>
        <el-form-item label="状态:" prop="cs_pasw" style="width: 300px; margin-left: 100px;">
          {{form.status=='NORMAL'?'正常':'冻结'}}
        </el-form-item>
        <el-form-item label="职务:" prop="role" >
          <el-input v-model="form.position" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="status" >
           <el-input v-model="form.phone" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="性别:" >
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2" style="width: 231px;">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" style="width:300px" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.Passwd" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <!-- {{form}} -->
    </div>
    <div style="width: 320px;margin: 0px auto;">
      <el-button type="primary" @click="Edit()" size="small">确定</el-button>
      <el-button type="info" @click="del()" style="float: right;" size="small">取消</el-button>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    id: ""
  },

  data() {
    return {
      form: {},
      rules: {
        certno: [{ required: true, message: "不能为空" }]
      }
    };
  },

  mounted() {
    this.Relaod();
  },

  methods: {
    Relaod(){
      this.axios.get('/guanqu/web/users/online-user').then((res) => {
        this.form = res.data;
      });
    },
      Edit(){
        this.$confirm("是否确认修改内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.form.Passwd) {
            this.axios.put('/guanqu/web/users/online-user',{login:this.form.login,name:this.form.name,position:this.form.position,phone:this.form.phone,sex:this.form.sex,birthday:this.form.birthday}).then((res) => {
                this.$message({
                  type: "success",
                  message: "修改用户成功!"
                });
                this.Relaod();
                this.$emit("closewindows");
            });
          }else{
            this.axios.put('/guanqu/web/users/online-user',{login:this.form.login,name:this.form.name,position:this.form.position,phone:this.form.phone,sex:this.form.sex,birthday:this.form.birthday,newPasswd:this.form.Passwd}).then((res) => {
                this.$message({
                  type: "success",
                  message: "修改用户成功!"
                });
                this.Relaod();
                this.$emit("closewindows");
            });
          }  
        })
        .catch(() => {
          // this.$message({
          //   type: "error",
          //   message: "网络错误！修改用户失败！"
          // });
        });
      },
      del(){
        this.$emit("closewindows");
      },
  },

  computed: {},

  watch: {}
};
</script>


<style>
</style>
