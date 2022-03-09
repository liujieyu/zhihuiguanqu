<template>
  <div style>
    <div style="display: flex;flex-wrap: wrap;">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        style="margin: 50px;display: flex;flex-wrap: wrap;"
      >
        <el-form-item label="用户名:" prop="login">
          <el-input v-model="form.login" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="form.name" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="登录密码:" prop="passwd">
          <el-input v-model="form.passwd" disabled placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码:" prop="confirmPasswd">
          <el-input v-model="form.confirmPasswd" placeholder="请输入" style="width:300px" show-password></el-input>
        </el-form-item> -->
        <el-form-item label="所属角色:" prop="role">
          <el-select v-model="form.role.id" placeholder="请选择" style="width:300px">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="form.status" placeholder="请选择" style="width:300px">
            <el-option label="正常" value="NORMAL"></el-option>
            <el-option label="冻结" value="FREEZE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位:">
          <el-input v-model="form.enterprise" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="部门:">
          <el-input v-model="form.department" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="职务:">
          <el-input v-model="form.position" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2" style="width: 230px;">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期:">
          <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" style="width:300px" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="form.phone" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入" style="width:700px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 320px;margin: 0px auto;">
      <el-button type="primary" @click="Edit()">确定</el-button>
      <el-button type="info" @click="del()" style="float: right;">取消</el-button>
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
        id:'',
        login: "",
        name: "",
        passwd: "",
        confirmPasswd: "",
        role: "",
        status: "",
        enterprise: "",
        department: "",
        position: "",
        radio: "",
        birthday: "",
        phone: "",
        remark: ""
      },
      roles:[],
      rules: {
        login: [{ required: true, message: "用户名不能为空" }],
        name: [{ required: true, message: "姓名不能为空" }],
        passwd: [{ required: true, message: "登录密码不能为空" }],
        confirmPasswd: [{ required: true, message: "确认密码不能为空" }],
        role: [{ required: true, message: "所属角色不能为空" }],
        status: [{ required: true, message: "状态不能为空" }]
      }
    };
  },

  mounted() {
    this.Reload()
  },

  methods: {
    Reload(){
      //获取数据
      this.axios.get('/guanqu/web/users/'+this.id).then((res) => {
        this.form = res.data;
        this.form.confirmPasswd = this.form.passwd;
      });
      this.axios.get('/guanqu/web/sys-roles/page?size=99999').then((res) => {
        this.roles = res.data.list;
      });
    },
    del(){
      this.$emit("closewindows");
    },
    Edit() {
      this.$confirm("是否确认修改内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (
            !this.form.login ||
            !this.form.name ||
            !this.form.role ||
            !this.form.status
          ) {
            this.$message({
              type: "error",
              message: "必填项未输入，修改用户失败"
            });
          }else{
            this.axios.put('/guanqu/web/users/',{birthday:this.form.birthday,department:this.form.department,enterprise:this.form.enterprise,id:this.form.id,login:this.form.login,name:this.form.name,phone:this.form.phone,position:this.form.position,remark:this.form.remark,roleId:this.form.role.id,sex:this.form.sex,status:this.form.status}).then((res) => {
                this.$message({
                  type: "success",
                  message: "修改用户成功!"
                });
                this.Reload();
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
    }
  },

  computed: {},

  watch: {}
};
</script>


<style>
</style>
