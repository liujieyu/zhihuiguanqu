<template>
  <div style>
    <div style="display: flex;flex-wrap: wrap;">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" size="mini">
        <el-form-item label="角色名:" prop="name">
          <el-input v-model="form.name" style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="角色等级:">
          <el-input-number v-model="form.grade" :min="1"></el-input-number>
          ≥自身等级
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" v-model="form.description" style="width:600px"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark" style="width:600px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 320px;margin: 0px auto;">
      <el-button type="primary" @click="ADD()" size="small">确定</el-button>
      <el-button type="info" style="float: right;" @click="del" size="small">取消</el-button>
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
    
  },

  methods: {
    ADD() {
      this.$confirm("是否确认新增内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.form.name) {
            this.$message({
              type: "error",
              message: "必填项未输入，新增用户失败"
            });
            return;
          }else{
            this.axios.post('/guanqu/web/sys-roles/',{name:this.form.name,grade:this.form.grade,description:this.form.description,remark:this.form.remark}).then((res) => {
              this.$message({
                type: "success",
                message: "新增用户成功!"
              });
              this.$emit("closewindows");
            });
          }
        })
        .catch(() => {
          // this.$message({
          //   type: "error",
          //   message: "网络错误！新增用户失败！"
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
