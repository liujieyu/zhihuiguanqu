<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 26px 0'}">
      <BreadcrumbItem>系统权限</BreadcrumbItem>
      <BreadcrumbItem>后台操作日志</BreadcrumbItem>
    </Breadcrumb>

    <!-- 按钮与筛选 -->
    <el-row :gutter="0" type="flex" justify="space-between" style="margin: 22px 0;">
      <!-- 按钮 -->
      <el-col style="display:flex;line-height: 32px;">

        时间段：
        <el-date-picker
          v-model="timeValue"
          size="small"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          style="margin-right: 30px;"
          @change="ReLoad()"
        ></el-date-picker>操作类型：
        <el-select
          v-model="caoz_value"
          style="margin-right: 30px; width: 150px;"
          placeholder="请选择"
          size="small"
          clearable
          @change="ReLoad()"
        >
          <el-option v-for="item in c_type" :key="item.label" :label="item.label" :value="item.value"></el-option>
        </el-select>

        <el-input
          v-model="value"
          size="small"
          placeholder="请输入用户名称"
          class="input-with-select"

          auto-complete="true"
          style="width: 200px;"
          :clearable="true"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      <!--
        <el-button-group style="margin-left: 20px;">
          <el-button type="primary" size="small">导出</el-button>
        </el-button-group>
        -->
      </el-col>

      <!-- <el-col
        :span="0"
        style="display: flex;justify-content: flex-end;align-items: center;font-size: 14px;"
      ></el-col> -->
    </el-row>

    <el-table :data="tableData" border :height="theight" style="width: 100%" @sort-change="sort_change">
      <el-table-column
        label=" "
        type="index"
        align="center"
        width="60"
        :index="indexMethod">
      </el-table-column>
      <el-table-column sortable property="webUser.name" label="操作用户名" width="120"></el-table-column>
      <el-table-column sortable property="content" label="日志内容" width="120"></el-table-column>
      <el-table-column sortable property="type" label="日志类型" width="120"></el-table-column>
      <el-table-column sortable property="time" label="操作时间" width="160">
        <template slot-scope="scope"> 
          {{scope.row.time}}
        </template>
      </el-table-column>
      <el-table-column sortable property="loginIp" label="操作IP" width="100"></el-table-column>
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
      caoz_value:'',
      c_type: [
        { label: "登录",value:'登录' },
        { label: "新增",value:'新增' },
        { label: "修改",value:'修改' },
        { label: "删除",value:'删除' },
      ],
      list_input: {
        value: "",
        search: "",
        pages: 1,
        page: 1,
        page_size: 10,
        total: 100,
        filter: {},
        field:'time,desc',
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
      this.axios.get('/guanqu/web/user-u-Log/page',{params:{page:this.list_input.page-1,size:this.list_input.page_size,type:this.caoz_value,name:this.value,dateStart:this.timeValue[0],dateEnd:this.timeValue[1],sort:this.list_input.field}}).then((res) => {
        this.tableData = res.data.list;
        this.list_input.total = res.data.totalCount;
        this.tableData.forEach((item)=>{
          var date = new Date(item.time)
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
          item.time = `${year}-${mon}-${day} ${hours}:${minutes}:${seconds}`;
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
