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
          <el-input v-model="form.passwd" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPasswd" >
          <el-input v-model="form.confirmPasswd" placeholder="请输入" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="所属角色:" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择" style="width:300px">
            <el-option
              v-for="item in role"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="form.status" placeholder="请选择" style="width:300px" clearable>
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
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option
              v-for="item in sexoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:">
          <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" style="width:300px" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="form.phone" placeholder="请输入" style="width:300px" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入" style="width:700px"></el-input>
        </el-form-item>
      </el-form>

    </div>
    <div style="width: 320px;margin: 0px auto;">
      <el-button type="primary" @click="Add()">确定</el-button>
      <el-button type="info" @click="del()" style="float: right;">取消</el-button>
    </div>
    <!-- {{form}} -->
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
        login: "",
        name: "",
        passwd: "",
        confirmPasswd: "",
        roleId: "",
        status: "",
        enterprise: "",
        department: "",
        position: "",
        radio: "",
        birthday: "",
        phone: "",
        remark:''
      },
      rules: {
        login: [{ required: true, message: "用户名不能为空" }],
        name: [{ required: true, message: "姓名不能为空" }],
        passwd: [{ required: true, message: "登录密码不能为空" }],
        confirmPasswd: [{ required: true, message: "确认密码不能为空" }],
        roleId: [{ required: true, message: "所属角色不能为空" }],
        status: [{ required: true, message: "状态不能为空",trigger: 'change'}],   
      },
      sexoptions:[
        {
          label:'男',
          value:0,
        },
        {
          label:'女',
          value:1,
        },
      ],
      role:[],
    };
  },

  mounted() {
    this.Reload()
  },

  methods: {
    Reload(){
      //获取角色
      this.axios.get('/guanqu/web/sys-roles/page?size=99999').then((res) => {
        this.role = res.data.list;
      });
    },
    Add() {
      if (!this.form.login||!this.form.name||!this.form.passwd||!this.form.confirmPasswd||!this.form.roleId||!this.form.status) {
            this.$message({
              type: "error",
              message: "必填项未输入，新增用户失败"
            });
          }else{
            this.axios.post('/guanqu/web/users/',{birthday:this.form.birthday,confirmPasswd:this.form.confirmPasswd,department:this.form.department,enterprise:this.form.enterprise,login:this.form.login,name:this.form.name,passwd:this.form.passwd,phone:this.form.phone,position:this.form.position,remark:this.form.remark,roleId:this.form.roleId,sex:this.form.sex,status :this.form.status }).then((res) => {

                if (res.data.errcode == '400') {
                  this.$message.error(res.data.message);
                }else{
                  this.$emit("closewindows");
                  this.$message({
                    type: "success",
                    message: "新增用户成功!"
                  });
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
