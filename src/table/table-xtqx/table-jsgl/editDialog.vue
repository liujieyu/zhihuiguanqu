<template>
  <div style>
    <div style="display: flex;flex-wrap: wrap;">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" size="mini">
        <el-form-item label="角色名:" prop="name">
          <el-input v-model="form.name" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="角色等级:">
          <el-input v-model="form.grade" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" v-model="form.description" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark" style="width:250px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 250px;margin: 0px auto;">
      <el-button type="primary" @click="EDIT()" size="small" style="margin-left:40px;">确定</el-button>
      <el-button type="info" style="margin-left:50px;" @click="del" size="small">取消</el-button>
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
        name: "",
        grade: "",
        description: "",
        remark: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "不能为空" }]
      }
    };
  },

  mounted() {
    console.log(this.id);
    this.Reload();
  },

  methods: {
    Reload(){
      this.axios.get('/guanqu/web/sys-roles/'+this.id+'/vo').then((res) => {
        this.form = res.data;
      });
    },
    EDIT() {
      this.$confirm("是否确认修改内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.form.name) {
            this.$message({
              type: "error",
              message: "必填项未输入，修改用户失败"
            });
          }else{
            this.axios.put('/guanqu/web/sys-roles/',{id:this.id,name:this.form.name,grade:this.form.grade,description:this.form.description,remark:this.form.remark}).then((res) => {
                this.$message({
                  type: "success",
                  message: "修改用户成功!"
                });
                this.$emit("closewindows");
                this.Reload();
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
