<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
      <BreadcrumbItem>系统权限</BreadcrumbItem>
      <BreadcrumbItem>在线用户</BreadcrumbItem>
    </Breadcrumb>

    <!-- 按钮与筛选 -->
    <el-row :gutter="0" type="flex" justify="space-between" style="margin: 22px 0;">
      <!-- 按钮 -->
      <el-col :span="24">
        <!-- <el-button-group style="margin-right: 10px;">
                    <el-button size="small" type="primary" @click="drawer_xinzeng = true" icon="el-icon-plus">新建申请表</el-button>
                </el-button-group>
                <el-button-group style="margin-right: 10px;">
                    <el-button size="small" @click="dialog_daoru_showing = true" :loading="loading">导入</el-button>
        </el-button-group>-->
        

        <el-input
          v-model="value"
          size="small"
          placeholder="请输入用户名"
          class="input-with-select"

          auto-complete="true"
          style="width: 200px;"
          :clearable="true"
        >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>

      <el-col
        :span="0"
        style="display: flex;justify-content: flex-end;align-items: center;font-size: 14px;"
      ></el-col>
    </el-row>

    <el-table :data="tableData" border :height="theight" style="width: 100%" @sort-change="sort_change">
      <el-table-column
        label=" "
        type="index"
        align="center"
        width="55"
        :index="indexMethod">
      </el-table-column>
      <el-table-column sortable property="webUser.login" label="用户名" width="100" align="center"></el-table-column>
      <el-table-column sortable property="webUser.name" label="姓名" width="100" align="center"></el-table-column>
      <el-table-column sortable property="webUser.phone" label="联系电话" width="130" align="center"></el-table-column>
      <el-table-column sortable property="webUser.role.name" label="角色" width="100" align="center"></el-table-column>
      <el-table-column sortable property="loginTime" label="登录时间" width="160" align="center">
        <template slot-scope="scope"> 
          {{scope.row.loginTime}}
        </template>
      </el-table-column>
      <el-table-column sortable property="loginIp" label="登录ip" width="130" align="center"></el-table-column>
      <el-table-column sortable property="browser" label="浏览器"></el-table-column>
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
          style="margin:10px 0;float: right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[10, 20, 50, 100]"
          :current-page="list_input.page"
          :page-size="list_input.page_size"
          layout=" prev, pager, next, sizes, jumper"
          :total="list_input.total"
          small
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
// import ADD from "@/table/table-xtqx/table-cdgl/add.vue";
// import DETAIL from "@/table/table-xtqx/table-cdgl/detail.vue";
// import EDIT from "@/table/table-xtqx/table-cdgl/edit.vue";
//   import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
//   import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
export default {
  data() {
    return {
      value: "",
      theight:(window.innerWidth>=1280)?window.innerHeight-233:window.innerHeight-265,
      timeValue: "",
      list_input: {
        value: "",
        search: "",
        pages: 1,
        page: 1,
        page_size: 10,
        total: 100,
        filter: {},
        field:'loginTime,desc'
      },
      tableData: []
    };
  },

  mounted() {
    this.ReLoad();
  },
  methods: {
    sort_change(column) {
                console.log(column);
                if (column.order == 'ascending') {
                    this.list_input.field = column.prop+',asc';
                    this.ReLoad();
                }
                if (column.order == 'descending') {
                    this.list_input.field = column.prop+',desc';
                    this.ReLoad();
                }
                if (column.order == null) {
                    this.list_input.field = '';
                    this.ReLoad();
                }
    },
    search(){
      this.list_input.page = 1;
      this.ReLoad();
    },
    ReLoad(){
      // this.axios.post('/guanqu/ext-web/authenticate',{username:'admin',password:'admin'}).then((res) => {

      // });
      //获取列表
      this.axios.get('/guanqu/web/online-web-user/page',{params:{page:this.list_input.page-1,size:this.list_input.page_size,name:this.value,sort:this.list_input.field}}).then((res) => {
        this.tableData = res.data.list;
        this.list_input.total = res.data.totalCount;
        this.tableData.forEach((item)=>{
          var date = new Date(item.loginTime)
          var year = date.getFullYear();
          var mon = date.getMonth()+1;
          if (mon<10) {
            mon = `0${mon}`;
          }
          var day = date.getDate();
          if (day<10) {
            day = `0${day}`;
          }
          var hours = date.getHours();
          if (hours<10) {
            hours = `0${hours}`;
          }
          var minutes = date.getMinutes();
          if (minutes<10) {
            minutes = `0${minutes}`;
          }
          var seconds = date.getSeconds();
          if (seconds<10) {
            seconds = `0${seconds}`;
          }
          item.loginTime = `${year}-${mon}-${day} ${hours}:${minutes}:${seconds}`;
        });
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
    }
  },
  computed: {},
  components: {
    // YSH,
    // NYYSDY,
    // GYYSDY
  }
};
</script>

<style type="text/css">
</style>
