<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
      <BreadcrumbItem>系统权限</BreadcrumbItem>
      <BreadcrumbItem>角色管理</BreadcrumbItem>
    </Breadcrumb>

    <!-- 按钮与筛选 -->
    <el-row :gutter="0" type="flex" justify="space-between" style="margin: 30px 0;">
      <!-- 按钮 -->
      <el-col :span="24">
        <el-input
          v-model="value"
          size="small"
          placeholder
          class="input-with-select"
          auto-complete="true"
          style="padding-top: 15px;width: 200px;float: left;"
          :clearable="true"
        >
          <el-button slot="append" icon="el-icon-search" @click="ReLoad()"></el-button>
        </el-input>
        <div style="float: left;margin-left: 20px; margin-top: 15px;">
          <el-button type="primary" size="small" @click="dialog_add_showing=true">新增</el-button>
          <!-- <el-button type="primary" size="small" @click="dialog_edit_showing=true">修改</el-button> -->
          <!-- <el-button type="primary" size="small">删除</el-button> -->
          <!-- <el-button type="primary" size="small" @click="dialog_power_showing=true">赋权</el-button> -->
          <el-button type="primary" size="small">导出</el-button>
          <el-button type="primary" size="small" @click="piliangDel()">批量删除</el-button>
        </div>
      </el-col>

      <!-- <el-col
        :span="8"
        style="display: flex;justify-content:space-between;align-items: center;font-size: 14px;"
      >
      <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary" size="small">修改</el-button>
          <el-button type="primary" size="small">删除</el-button>
      </el-col>
      <el-col
        :span="8"
        style="display: flex;justify-content:space-between;align-items: center;font-size: 14px;"
      >
       
          <el-button type="primary" size="small">赋权</el-button>
          <el-button type="primary" size="small">导出</el-button>
          <el-button type="primary" size="small">批量删除</el-button>
      </el-col>-->
    </el-row>

    <el-table :data="tableData" border height="550" style="width: 100%" @selection-change="selectRow" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        label=" "
        type="index"
        align="center"
        width="65"
        :index="indexMethod">
      </el-table-column>
      <el-table-column property="name" label="角色名" width="120"></el-table-column>
      <el-table-column property="grade" label="等级" width="100"></el-table-column>
      <el-table-column property="ctime" label="创建时间" width="160">
        <template slot-scope="scope"> 
          {{scope.row.ctime}}
        </template>
      </el-table-column>
      <el-table-column property="creator" label="创建人"></el-table-column>
      <el-table-column property="upTime" label="最后一次修改时间" width="160">
        <template slot-scope="scope"> 
          {{scope.row.upTime}}
        </template>
      </el-table-column>
      <el-table-column property="modifier" label="最后一次修改人" width="120"></el-table-column>
      <el-table-column property="remark" label="备注" ></el-table-column>
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="item=scope.row;dialog_edit_showing=true">修改</el-button>
          <el-button type="primary" size="small" @click="item=scope.row;dialog_power_showing=true;">赋权</el-button>
          <el-button type="primary" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row type="flex">
      <el-col>
        <div style="margin-top:30px;font-size: 14px;color: rgb(166,173,180);">
          共{{list_input.total}}条记录
          第{{list_input.page}}/{{list_input.pages}}页
        </div>
      </el-col>
      <el-col>
        <el-pagination
          style="margin:20px 0;float: right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[10, 20, 50, 100]"
          :current-page="list_input.page"
          :page-size="list_input.page_size"
          layout=" prev, pager, next, sizes, jumper"
          :total="list_input.total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="dialog_add_showing" width="1200px" append-to-body>
      <ADDDIALOG v-if="dialog_add_showing" @closewindows="dialog_add_showing=false;ReLoad()"></ADDDIALOG>
    </el-dialog>
    <!-- 修改-->
    <el-dialog title="修改" :visible.sync="dialog_edit_showing" width="1200px" append-to-body>
      <EDITDIALOG :id="item.id" v-if="dialog_edit_showing" @closewindows="dialog_edit_showing=false;ReLoad()"></EDITDIALOG>
    </el-dialog>
    <!-- 赋权-->
    <el-dialog title="赋权" :visible.sync="dialog_power_showing" width="1200px" append-to-body>
      <POWERDIALOG :id="item.id" v-if="dialog_power_showing" @closewindows="dialog_power_showing=false;ReLoad()"></POWERDIALOG>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import ADDDIALOG from "@/table/table-xtqx/table-jsgl/addDialog.vue";
import EDITDIALOG from "@/table/table-xtqx/table-jsgl/editDialog.vue";
import POWERDIALOG from "@/table/table-xtqx/table-jsgl/powerDialog.vue";
import Utils from '@/assets/utils.js';
// import {constants} from 'crypto';
// import App from "@/App.vue";
// import Table from "@/page/Table.vue"
// import DETAIL from "@/table/table-xtqx/table-cdgl/detail.vue";
// import EDIT from "@/table/table-xtqx/table-cdgl/edit.vue";
//   import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
//   import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
export default {
  data() {
    return {
      loading:false,
      value: "",
      timeValue: "",
      idList: [],
      item:{},
      list_input: {
        value: "",
        search: "",
        pages: 1,
        page: 1,
        page_size: 10,
        total: 100,
        filter: {}
      },
      dialog_add_showing: false,
      dialog_edit_showing:false,
      dialog_power_showing:false,
      tableData: []
    };
  },

  mounted() {
    this.ReLoad();
  },
  methods: {
    ReLoad(){
      this.loading = true;
      this.axios.get('/guanqu/web/sys-roles/page',{params:{page:this.list_input.page-1,size:this.list_input.page_size,name:this.value}}).then((res) => {
        this.tableData = res.data.list;
        this.list_input.total = res.data.totalCount;
        Utils.$emit('demo','msg');
        // console.log(this.$Table)
        this.loading = false;
        this.tableData.forEach((item)=>{
          var date = new Date(item.ctime)
          var date2 = new Date(item.upTime)
          var year = date.getFullYear();
          var year2 = date2.getFullYear();
          var mon = date.getMonth()+1;
          var mon2 = date2.getMonth()+1;
          if (mon<10) {
            mon = `0${mon}`;
          }
          if (mon2<10) {
            mon2 = `0${mon2}`;
          }
          var day = date.getDate();
          var day2 = date2.getDate();
          if (day<10) {
            day = `0${day}`;
          }
          if (day2<10) {
            day2 = `0${day2}`;
          }

          var hours = date.getHours();
          var hours2 = date2.getHours();
          if (hours<10) {
            hours = `0${hours}`;
          }
          if (hours2<10) {
            hours2 = `0${hours2}`;
          }
          var minutes = date.getMinutes();
          var minutes2 = date2.getMinutes();
          if (minutes<10) {
            minutes = `0${minutes}`;
          }
          if (minutes2<10) {
            minutes2 = `0${minutes2}`;
          }
          var seconds = date.getSeconds();
          var seconds2 = date2.getSeconds();
          if (seconds<10) {
            seconds = `0${seconds}`;
          }
          if (seconds2<10) {
            seconds2 = `0${seconds2}`;
          }
          item.ctime = `${year}-${mon}-${day} ${hours}:${minutes}:${seconds}`;
          item.upTime = `${year2}-${mon2}-${day2} ${hours2}:${minutes2}:${seconds2}`;
        })

      });
    },
    //分页方法
    handleSizeChange(val) {
      console.log(val);
      this.list_input.page = 1;
      this.list_input.page_size = val;
      this.ReLoad();
    },
    indexMethod(index) {
      return index + 1 + (this.list_input.page_size * (this.list_input.page - 1));
    },
    handleCurrentChange(val) {
      this.list_input.page = val;
      this.ReLoad();
    },
    //删除
    del(row) {
      console.log(row);
      this.$confirm("是否确认删除此角色", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.delete('/guanqu/web/sys-roles/'+row.id).then((res) => {
            this.$message({
              type: "success",
              message: "删除角色成功!"
            });
            this.ReLoad();
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "error",
          //   message: "网络错误！删除角色失败！"
          // });
        });
    },
    //批量选中
    selectRow(selection) {
      // this.idList = selection;
      this.idList = [];
      selection.forEach((val, index, array) => {
        this.idList.push(val.id);
      });
      console.log(this.idList);
    },
    //批量删除
    piliangDel() {
      this.$confirm("是否确认批量删除已选用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.idList.length == 0) {
            this.$message({
              type: "error",
              message: "未选择用户，删除用户失败"
            });
          }else{
            this.axios.delete('/guanqu/web/sys-roles/batch-v1',{data:this.idList}).then((res) => {
                this.$message({
                  type: "success",
                  message: "删除用户成功!"
                });
                this.ReLoad();
            });
          }
        })
        .catch(() => {
          // this.$message({
          //   type: "error",
          //   message: "网络错误！删除用户失败！"
          // });
        });
    }
  },
  computed: {},
  components: {
    ADDDIALOG,
    EDITDIALOG,
    POWERDIALOG
    // YSH,
    // NYYSDY,
    // GYYSDY
  }
};
</script>

<style type="text/css">
.el-input__inner {
  /* padding-top: 15px; */
}
.el-button {
}
</style>
