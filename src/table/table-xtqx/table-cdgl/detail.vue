<template>
  <div>
    <h2>菜单信息</h2>

    <el-form ref="form" :model="form" label-width="140px" style="margin: 30px;">
      <el-form-item label="菜单名称:">{{this.form.name}}</el-form-item>
      <el-form-item label="URL:">{{this.form.url}}</el-form-item>
      <el-form-item label="排序:">
        <el-input-number v-model="form.index" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="创建时间:">{{this.form.ctime.replace('T',' ').substr(0,19)}}</el-form-item>
      <el-form-item label="创建人:">{{this.form.creator}}</el-form-item>
      <el-form-item label="最后一次修改时间:">{{this.form.upTime.replace('T',' ').substr(0,19)}}</el-form-item>
      <el-form-item label="最后一次修改人:">{{this.form.modifier}}</el-form-item>
      <el-form-item label="位置:">{{this.form.position}}</el-form-item>
      <el-form-item label="菜单类型:">{{this.form.type}}</el-form-item>
      <el-form-item label="图标:">
        <i class="el-icon-help"></i>
      </el-form-item>
      <el-form-item label="备注:">{{this.form.remark}}</el-form-item>

      <el-form-item style="margin-top: 40px;">
        <el-button type="primary" @click="openEdit()">修改菜单</el-button>
        <el-button type="primary" @click="del()" style="margin-left: 70px;">删除菜单</el-button>
        <el-button type="primary" @click="close()" style="margin-left: 70px;">关闭</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="修改" :visible.sync="dialog_edit_showing" width="800px" destroy-on-close append-to-body>
      <EDIT :id="menu.id" v-if="dialog_edit_showing" @closewindows="dialog_edit_showing=false; Reload();"></EDIT>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
//   import YSH from '@/table/table-basedata/table-ysh/ysh.vue'
//   import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
//   import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
import EDIT from "@/table/table-xtqx/table-cdgl/edit.vue";

export default {
  props: {
    id: ""
  },
  data() {
    return {
      form: {},
      dialog_edit_showing:false,
      menu:{id:''},
    };
  },

  mounted() {
    console.log(this.id);
    this.Reload()
  },
  methods: {
    Reload(){
      this.axios.get('/guanqu/web/menus/'+this.id).then((res) => {
        this.form = res.data;
      });
    },
    del() {
      this.$confirm("您确定删除该菜单吗?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.delete('/guanqu/web/menus/'+this.id).then((res) => {
            // this.form = res.data;
            this.$emit("closewindows");
            this.$message({
              type: "success",
              message: "删除菜单成功!"
            });
          });
          
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消删除"
          });
        });
    },
    openEdit(){
      this.menu.id = this.form.id;
      this.dialog_edit_showing = true;
    },
    close(){
      this.$emit("closewindows");
    },
  },
  computed: {},
  components: {EDIT}
};
</script>

<style type="text/css">
</style>
