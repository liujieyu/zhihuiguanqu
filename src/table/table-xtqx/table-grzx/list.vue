<template>
  <div style>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
      <BreadcrumbItem>系统权限</BreadcrumbItem>
      <BreadcrumbItem>个人中心</BreadcrumbItem>
    </Breadcrumb>
    <el-button type="primary" @click="edit()" size="small">修改</el-button>

    <div style="display: flex;margin: 0 auto;">
      <el-form ref="form" :model="form" label-width="100px" style="margin: 50px;" size="mini">
        <el-form-item label="用户名:">{{this.form.login}}</el-form-item>
        <el-form-item label="角色:">{{this.form.role.name}}</el-form-item>
        <el-form-item label="单位:">{{this.form.enterprise}}</el-form-item>
        <el-form-item label="职务:">{{this.form.position}}</el-form-item>
        <el-form-item label="性别:">{{this.form.sex=='1'?'男':(this.form.sex=='2'?'女':'')}}</el-form-item>
      </el-form>
      <el-form label-width="100px" style="margin: 50px;">
        <el-form-item label="姓名:">{{this.form.name}}</el-form-item>
        <el-form-item label="状态:">{{this.form.status=='NORMAL'?'正常':'冻结'}}</el-form-item>
        <el-form-item label="部门:">{{this.form.department}}</el-form-item>
        <el-form-item label="联系电话:">{{this.form.phone}}</el-form-item>
        <el-form-item label="出生日期:">{{this.form.birthday}}</el-form-item>
      </el-form>
    </div>

    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialog_edit_showing" width="870px" append-to-body>
      <EDIT
        v-if="dialog_edit_showing"
        @closewindows="dialog_edit_showing=false; ReLoad();"
      ></EDIT>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import EDIT from '@/table/table-xtqx/table-grzx/editDialog.vue'
//   import YSH from '@/table/table-basedata/table-ysh/ysh.vue'
//   import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
//   import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
export default {
  props: [],
  data() {
    return {
      dialog_edit_showing:false,
      item: {},
      form: {}
    };
  },

  mounted() {
    this.ReLoad();
  },
  methods: {
    edit(){
      this.item = this.from;
      this.dialog_edit_showing = true;
    },
    ReLoad(){
      this.axios.get('/guanqu/web/users/online-user').then((res) => {
        this.form = res.data;
        // this.tableData = res.data.list;
        // this.list_input.total = res.data.totalCount;
      });
    },
    del() {
      this.$confirm("您确定删除【XXX】菜单吗?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除菜单成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "网络错误！删除菜单失败！"
          });
        });
    },
    openEdit() {
      this.$emit("showEdit");
    }
  },
  computed: {},
  components: {
      EDIT
  }
};
</script>

<style type="text/css">
</style>
