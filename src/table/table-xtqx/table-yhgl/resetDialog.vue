<template>
  <div style>
    <div style="display: flex;flex-wrap: wrap;">
      <el-form ref="form" :model="form" label-width="100px" style="margin: 50px;">
        <el-form-item label="新密码:" prop="newPasswd">
          <el-input v-model="form.newPasswd" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="旧密码:" prop="oldPasswd">
          <el-input v-model="form.oldPasswd" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex;justify-content: flex-end;">
      <el-button type="info" @click="del()" style>取消</el-button>
      <el-button type="primary" @click="Edit()">确定</el-button>
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
      form: {
        newPasswd: "",
        oldPasswd: ""
      }
      //   rules: {
      //     username: [{ required: true, message: "用户名不能为空" }],
      //     name: [{ required: true, message: "姓名不能为空" }],
      //     newPasswd: [{ required: true, message: "登录密码不能为空" }],
      //     oldPasswd: [{ required: true, message: "确认密码不能为空" }],
      //     role: [{ required: true, message: "所属角色不能为空" }],
      //     stutas: [{ required: true, message: "状态不能为空" }]
      //   }
    };
  },

  mounted() {
    console.log(this.id);
  },

  methods: {
    Edit() {
    
          if (!this.form.newPasswd||!this.form.oldPasswd) {
            this.$message({
              type: "error",
              message: "新密码和旧密码不能为空!"
            });
          }else
          if (this.form.newPasswd == this.form.oldPasswd) {
            this.$message({
              type: "error",
              message: "旧密码不能和新密码一样!"
            });
          }else{
            this.axios.put('/guanqu/web/users/'+this.id+'/passwd',{newPasswd:this.form.newPasswd,oldPasswd:this.form.oldPasswd}).then((res) => {
              if (res.data.errcode == '400') {
                this.$message.error(res.data.message);
              }else{
                this.$message({
                  type: "success",
                  message: "重置密码成功!"
                });
                this.$emit("closewindows");
              }
            });
          }
          
        
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
