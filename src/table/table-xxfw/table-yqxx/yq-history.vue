<template>
  <div>
    <Content :style="{padding: '12px 24px 24px 24px', background: '#fff'}">
      <Row :gutter="16">
        <Col :span="span1">
          <Row :gutter="16" type="flex" justify="start" z style="margin-top: 10px;line-height: 32px;">
            <Col>时间:</Col>
            <Col>             
                <el-date-picker
                        v-model="table.yuqing.date"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="yuqingDatePickerChange"
                        :picker-options="table.yuqing.datePickerOptions[select.yuqing_select]"
                        unlink-panels
                        :type="table.yuqing.datePickerType"
                        size="mini"
                        style="min-width: 360px"
                        v-show="table.yuqing.datePickerType != 'yearrange'"
                ></el-date-picker>
                <!--年表-->
                <div class="div_year" v-show="table.yuqing.datePickerType == 'yearrange'">
                    <el-date-picker
                            class="wAh"
                            size="mini"
                            v-model="table.yuqing.start_year"
                            value-format="yyyy"
                            type="year"
                            placeholder="选择年">
                    </el-date-picker>
                      &nbsp;&nbsp;至&nbsp;&nbsp;
                    <el-date-picker
                            class="wAh"
                            size="mini"
                            v-model="table.yuqing.end_year"
                            type="year"
                            value-format="yyyy"
                            placeholder="选择年">
                    </el-date-picker>
                    <el-button style="margin-left: 20px"
                                type="primary" @click="search_yuqing('yearTable')" size="mini" plain>查询</el-button>
                </div>
            </Col>
            <Col>
              时段类别：
              <Select v-model="select.yuqing_select" @on-change="optionchange" style="width:130px;margin-right: 20px;" >
                  <Option v-for="item in select.yuqingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <div class="switch" @click="Menu_toggle">
            <i class="el-icon-d-arrow-left" v-if="Menu.show_Controller"></i>
            <i class="el-icon-d-arrow-right" v-if="!Menu.show_Controller"></i>
          </div>
          <Divider style="margin-top:20px;"/>
          <Row>
                <Col style='font-size: 14px;' class="borsLine">站名：{{siteno}}&nbsp;累计降雨：{{jiangyu_tongji.rainSum}}mm&nbsp;平均{{biao_yuqing}}降雨：{{jiangyu_tongji.rainVag}}mm&nbsp;最大{{biao_yuqing}}降雨：{{jiangyu_tongji.rainMax}}mm&nbsp;
              单位：降雨量 mm&nbsp;&nbsp;&nbsp;&nbsp;<font style="color:#F7ED23;">黄色：{{yqyjtext.huangse}}mm</font>&nbsp;&nbsp;<font style="color:#F77823;">橙色：{{yqyjtext.chengse}}mm</font>&nbsp;&nbsp;<font style="color:#F72323;">红色：{{yqyjtext.hongse}}mm</font></Col>
            </Row>
          <Row :gutter="24" style="display: flex;">
            <Col style="width: 480px;">
              <el-table
                  :data="table.yuqing.Rows_filter"
                  border
                  :height="theight"
                  :loading="table.yuqing.loading"
                  @sort-change="sort_change"
                  style="width: 480px;">
               <el-table-column
                    label=" "
                    type="index"
                    align="center"
                    width="60"
                    :index="indexMethod">
              </el-table-column>
              <el-table-column
                        v-for="(item,index) in table.yuqing.activeColumns"
                        :prop="item.prop"
                        :align="item.align"
                        :label="item.label"
                        :min-width="item.width"
                        :sortable="item.sortable"
                        :show-overflow-tooltip="true"
                ></el-table-column>
                </el-table>            
              <div style="margin: 10px 0px 0px 10px;overflow: hidden">
                <div style="float: right;">
                  <Page
                    :total="list_input.total"
                    :current="list_input.current"
                    show-sizer
                    :page-size="list_input.pagesize"
                    :page-size-opts="list_input.pagesizeopts"
                    @on-change="CurrentChange"
                    @on-page-size-change="PagesizeChange"
                    size="small"
                    show-total
                    show-elevator
                  ></Page>
                </div>
              </div>
            </Col>
            <Col span="14">
              <div ref="achart" v-show="table.yuqing.Rows_filter.length>0"  :style="{'width': '100%','height': chartheight+'px','margin-top': '1%'}"></div>
              <div ref="noachart" v-show="table.yuqing.Rows_filter.length==0"  :style="{'width': '100%','height': chartheight+'px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center','margin-top': '1%'}">暂无雨情图数据</div>
            </Col>
          </Row>
        </Col>
        <transition name="el-fade-in-linear">
        <Col :span="span2" v-show="show1">
          <Row style="margin-top: 10px;line-height: 32px;">
            <Col>
              <Input search enter-button suffix="ios-search" placeholder="请输入行政区划或者站点名称" style="width: 250px;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
            </Col>
          </Row>
          <Row style="margin-top: 30px;margin-left: 20px;">
            <Col :style="{'overflow-y': 'auto', height: (theight+30)+'px'}">
              <el-tree
               
                class="filter-tree"
                :data="Treedata"
                highlight-current="true"
                node-key="id"
                :default-expanded-keys="expandedarray"
                :filter-node-method="filterNode"
                @node-click="xzqh_tree"
                ref="tree">
              </el-tree>
            </Col>
          </Row>
        </Col>
      </transition>
      </Row>
    </Content>
  </div>
</template>

<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import App from "@/App.vue";
import { debug } from 'console';
export default {
  data() {
    return {
      loading: false,
      theight:window.innerHeight-330,
      chartheight:(window.innerHeight-330)>430?430:(window.innerHeight-330),
      show1:true,
      span1:'19',
      span2:'5',
      // 统计降雨数据的表名
      biao_yuqing: '',
      // 降雨统计
      jiangyu_tongji: {
        rainSum: '',
        rainVag: '',
        rainMax: ''
      }, 
      table:{   
      // 雨情
        yuqing: {
            // 表头设置
            columns: {
                // 小时表
                hourTable: [
                    {
                        label: "时间",
                        prop: "DT",
                        width: 180,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        label: "降雨量",
                        width: 130,
                        prop: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 日表
                dayTable: [
                    {
                        label: "日期",
                        prop: "TM",
                        width: 180,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        label: "降雨量",
                         width: 130,
                        prop: "p",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 旬表
                tenDaysTable: [
                    {
                        label: "时间",
                        prop: "DT",
                        width: 180,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        label: "降雨量",
                        width: 130,
                        prop: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 月表
                monthTable: [
                    {
                        label: "时间",
                        prop: "DT",
                        width: 180,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        label: "降雨量",
                        width: 130,
                        prop: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 年表
                yearTable: [
                    {
                        label: "时间",
                        prop: "YR",
                        width: 180,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        label: "降雨量",
                        width: 130,
                        prop: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ]
            },
            // 正在激活的表头
            activeColumns: [],
            // 表体内容
            Rows: [],
            // 过滤后的表体内容
            Rows_filter: [],
            // 日期时间选择器的选项配置
            datePickerOptions: {
                historyTable: {
                    shortcuts: [
                        {
                            text: "最近6小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 6);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近12小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 12);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近24小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近36小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 36);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近72小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 72);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                hourTable: {
                    shortcuts: [
                        {
                            text: "最近6小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 6);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近12小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 12);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近24小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近36小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 36);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近72小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 72);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                dayTable: {
                    shortcuts: [
                        {
                            text: "最近10天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 10);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近15天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近30天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近60天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近90天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                monthTable: {
                    shortcuts: []
                }
            },
            // 日期时间选择器类型
            datePickerType: "date",
            // 日期时间选择器值
            date: null,
            // 开始年
            start_year: null,
            //结束年
            end_year: null,

            tenDays_value: null,

            tenDays_lable: null,
            btn_tenday: null,
        },
      },
      Treedata:[],
      expandedarray:[],
      filterTreeData:[],
      GD:'',
      data1: [],
      date:'',
      searchs:"",
      siteno:'',
      yqyjtext:{huangse:'',chengse:'',hongse:''},
      yqyjinfo:{houryj:{},dateyj:{},periodyj:{yellow:100,orange:180,red:250},monthyj:{yellow:150,orange:250,red:400},yearyj:{yellow:1400,orange:1650,red:2000}},
      timesearch:'',
      dialogwidth:(520/window.innerWidth*100)+"%",
      select:{
        // 降雨数据历史表
        yuqingList: [
            {
                value: "hourTable",
                size: "small",
                label: "小时降雨"
            },
            {
                value: "dayTable",
                size: "small",
                label: "日降雨"
            },
            {
                value: "tenDaysTable",
                size: "small",
                label: "旬降雨"
            },
            {
                value: "monthTable",
                size: "small",
                label: "月降雨"
            },
            {
                value: "yearTable",
                size: "small",
                label: "年降雨"
            }
        ],
        // 降雨数据历史表绑定值
        yuqing_select: "hourTable",
      },
      echarts:{
        TM:[],
        Q:[],
        Z:[],
      },
      form:{
        searchmsg:'',
        date:'',
        field:'',
      },
      tree_filter_node:[],
      searchmsg:'',
      MaxY1:0,
      MaxY2:0,
      MinY1:0,
      MinY2:0,
      data2:[],
      Menu: { show_Controller: false },
      list_input: {
        total: 100,
        pagesize: 50,
        pagesizeopts: [10, 20, 50, 75, 100, 200],
        current: 1
      },
      tree_index:0,
      tree_index_list:[],
    };
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
    //获取行政区划树
    this.axios.get("/guanqu/info/xzqhtree?TYPE=5").then(res => {
      this.Treedata = res.data;
      this.expandedarray.push(this.Treedata[0].id);
      this.expandedarray.push(this.Treedata[0].children[0].id);
      var stcd=this.Treedata[0].children[0].children[0].value;
      this.searchs = stcd;    
      this.siteno = this.Treedata[0].children[0].children[0].label;
       this.biao_yuqing = '小时';
        this.table["yuqing"].date = null;
        this.setDatePickerType_yuqing(this.select.yuqing_select); // 设置日期时间选择器的类型
        this.setActiveColumns_yuqing(this.select.yuqing_select); // 设置水情历史数据表 当前激活的表头
        if (this[`setTableDefaultDate_yuqing_${this.select.yuqing_select}`]) {
            this[`setTableDefaultDate_yuqing_${this.select.yuqing_select}`]();
        }
      this.axios.get("/alarm/rainalarm", {
            params: {stcd:stcd}
        }).then(res => {
            var data=res.data.rows;
            this.yqyjinfo.houryj.yellow=data[0].OH_P;
            this.yqyjinfo.houryj.orange=data[1].OH_P;
            this.yqyjinfo.houryj.red=data[2].OH_P;
            this.yqyjinfo.dateyj.yellow=data[0].OD_P;
            this.yqyjinfo.dateyj.orange=data[1].OD_P;
            this.yqyjinfo.dateyj.red=data[2].OD_P;
            this.Reload();
        });
      
    });
  },
  methods: {
    // 设置 xx表格 时间选择器值
    setTableDate(tableName, val) {
      this.table[tableName].date = val;
    },
    // 设置降雨数据小时表默认查询日期
    setTableDefaultDate_yuqing_hourTable() {
        const end = new Date();
        const start = eightPointOfTheDay();
        var timeSlot = [start, end];
        this.setTableDate("yuqing", timeSlot);
        function eightPointOfTheDay() {
            var date = new Date();
            date.setHours(8);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        }
    },
    // 设置降雨数据日表默认查询日期
    setTableDefaultDate_yuqing_dayTable() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        var timeSlot = [start, end];
        this.setTableDate("yuqing", timeSlot);
    },
    // 设置降雨数据旬表默认查询日期
    setTableDefaultDate_yuqing_tenDaysTable() {
        const end = new Date();
        const start = new Date();
        console.log(start.getTime());
        if(start.getHours() < 8){
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6);
        }
        var timeSlot = [start, end];
        this.setTableDate("yuqing", timeSlot);
    },
    // 设置降雨数据月表默认查询日期
    setTableDefaultDate_yuqing_monthTable() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 160);
        var timeSlot = [start, end];
        this.setTableDate("yuqing", timeSlot);
    },
    // 设置降雨数据旬表默认查询日期
    setTableDefaultDate_yuqing_tenDaysTable() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
        var timeSlot = [start, end];
        this.setTableDate("yuqing", timeSlot);
    },
    // 设置降雨数据旬表默认查询日期
    setTableDefaultDate_yuqing_yearTable() {
        const end = new Date();
        const start = new Date();
        console.log(start.getHours(),start.getTime());
        if(start.getHours() < 8){
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12 * 5);
        }
        var timeSlot = [start, end];
        this.setTableDate("yuqing", timeSlot);
    },
     // 设置日期时间选择器的类型
    setDatePickerType_yuqing(tableType) {
        var datePickerType;
        switch (tableType) {
            case "historyTable":
                datePickerType = "datetimerange";
                break;
            case "hourTable":
                datePickerType = "datetimerange";
                break;
            case "dayTable":
                datePickerType = "daterange";
                break;
            case "tenDaysTable":
                datePickerType = "monthrange";
                break;
            case "monthTable":
                datePickerType = "monthrange";
                break;
            case "yearTable":
                datePickerType = "yearrange";
                this.table.yuqing.start_year = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 365 * 5);
                this.table.yuqing.end_year = new Date();
                break;
        }
        this.table["yuqing"].datePickerType = datePickerType;
    },
    yuqingDatePickerChange(item) {
        this.table.yuqing.currentPage = 1;
        this.Reload();
    },
    setActiveColumns_yuqing(tableType) {
        console.log('********',tableType);
        this.table.yuqing.activeColumns = this.table.yuqing.columns[tableType];
        this.select.yuqing_select = tableType;
    },
    sort_change(column){
              console.log(column);
              if (column.order == 'ascending') {
                this.form.field = column.prop;
                this.ReloadBysort();
              }
              if (column.order == 'descending') {
                this.form.field = column.prop+' desc';
                this.ReloadBysort();
              }
              if (column.order == null) {
                this.form.field = '';
                this.ReloadBysort();
              }
    },
    filterNode(value, Treedata, node) {  
      if (!value){
        this.filterTreeData.push(Treedata);
        return true;
      } 
      if(Treedata.label.indexOf(value) !== -1){
        this.filterTreeData.push(Treedata);
        return true;
      }else{
        if(this.filterTreeData.length==0){
          return false;
        }else{
          var nodedata=this.filterTreeData[this.filterTreeData.length-1];
          if(nodedata.level==3){
            return false;
          }else{
            if(nodedata.level>=Treedata.level){
              return false;
            }else{
              var parent=Treedata.parent;
                if(parent.indexOf(nodedata.value)>-1){
                  return true;
                }else{
                  return false;
                }     
            }
          }
          
        }
        
      }
      
    },
    Menu_toggle() {
      this.Menu.show_Controller = !this.Menu.show_Controller;
      this.show1 = !this.show1;
      if (this.show1 == true ) {
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
      }else{
        this.span1 = '24';
        this.span2 = '0';
        this.data2 = {}
      }
      this.Reload();
    },

    // 监听动态参数事件处理函数
    test1(agmt) {
      this.Menu.show_Controller = !agmt;
      // this.show1 = agmt;
      if (agmt) {
        if(this.span1 == '24'){
          this.span2 = '0';
          this.asyncExecute();
          return
        }
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
        this.asyncExecute()
      } else {
        if(this.span1 == '24'){
          this.span2 = '0';
          this.asyncExecute();
          return;
        }
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
        this.asyncExecute()
      }
    },
    // 异步刷新，重新绘图
    asyncExecute(){
      setTimeout(this.Reload, 100)
    },
    xzqh_tree(data){
      console.log(data);
      if (data.level==3) {
        this.searchs = data.value;
        this.siteno=data.label;
        this.list_input.current = 1;
        this.form.field = '';
        this.axios.get("/alarm/rainalarm", {
            params: {stcd:this.searchs}
        }).then(res => {
            var data=res.data.rows;
            this.yqyjinfo.houryj.yellow=data[0].OH_P;
            this.yqyjinfo.houryj.orange=data[1].OH_P;
            this.yqyjinfo.houryj.red=data[2].OH_P;
            this.yqyjinfo.dateyj.yellow=data[0].OD_P;
            this.yqyjinfo.dateyj.orange=data[1].OD_P;
            this.yqyjinfo.dateyj.red=data[2].OD_P;
            this.Reload();
        });
      }
    },
    optionchange(tableType){
       console.log(tableType)
        let tabName = ''
        switch (tableType) {
            case 'hourTable':
                tabName = '小时';
                break
            case 'dayTable':
                tabName = '日';
                break
            case  'tenDaysTable':
                tabName = '旬';
                break
            case  'monthTable':
                tabName = '月';
                break
            case  'yearTable':
                tabName = '年'
        }
        this.biao_yuqing = tabName;
        this.list_input.current = 1;
        this.form.field = '';
        this.table["yuqing"].date = null;
        this.setDatePickerType_yuqing(tableType); // 设置日期时间选择器的类型
        this.setActiveColumns_yuqing(tableType); // 设置水情历史数据表 当前激活的表头
        if (this[`setTableDefaultDate_yuqing_${tableType}`]) {
            this[`setTableDefaultDate_yuqing_${tableType}`]();
        }
        this.axios.get("/alarm/rainalarm", {
            params: {stcd:this.searchs}
        }).then(res => {
            var data=res.data.rows;
            this.yqyjinfo.houryj.yellow=data[0].OH_P;
            this.yqyjinfo.houryj.orange=data[1].OH_P;
            this.yqyjinfo.houryj.red=data[2].OH_P;
            this.yqyjinfo.dateyj.yellow=data[0].OD_P;
            this.yqyjinfo.dateyj.orange=data[1].OD_P;
            this.yqyjinfo.dateyj.red=data[2].OD_P;
            this.Reload();
        });        
    },
    search(){
      this.filterTreeData = [];
      this.$refs.tree.filter(this.searchmsg);
      if (this.searchmsg != '') {
        this.filterTreeData.some((val, index) => {
        if(index==0 && val.level==1){
          this.expandedarray=[val.id,val.children[0].id];
          this.searchs=val.children[0].children[0].value;
          this.siteno=val.children[0].children[0].label;
          return true;
        }else if(index==0 && val.level==2){
          this.expandedarray=[val.id];
          this.searchs=val.children[0].value;
          this.siteno=val.children[0].label;
          return true;
        }else if(index==0 && val.level==3){
          this.searchs = val.value;
          this.siteno=val.label;
          return true;
        }
      });
        this.list_input.current = 1;
        this.form.field = '';
        this.axios.get("/alarm/rainalarm", {
            params: {stcd:this.searchs}
        }).then(res => {
            var data=res.data.rows;
            this.yqyjinfo.houryj.yellow=data[0].OH_P;
            this.yqyjinfo.houryj.orange=data[1].OH_P;
            this.yqyjinfo.houryj.red=data[2].OH_P;
            this.yqyjinfo.dateyj.yellow=data[0].OD_P;
            this.yqyjinfo.dateyj.orange=data[1].OD_P;
            this.yqyjinfo.dateyj.red=data[2].OD_P;
            this.Reload();
        });
      }else{
        this.$refs.tree.root.childNodes.forEach((e)=>{
            e.expanded=false;
        }); 
        this.expandedarray=[this.Treedata[0].id,this.Treedata[0].children[0].id];
        this.searchs = this.Treedata[0].children[0].children[0].value;   
        this.siteno= this.Treedata[0].children[0].children[0].label;  
        this.list_input.current = 1;
        this.form.field = '';  
        this.axios.get("/alarm/rainalarm", {
            params: {stcd:this.searchs}
        }).then(res => {
            var data=res.data.rows;
            this.yqyjinfo.houryj.yellow=data[0].OH_P;
            this.yqyjinfo.houryj.orange=data[1].OH_P;
            this.yqyjinfo.houryj.red=data[2].OH_P;
            this.yqyjinfo.dateyj.yellow=data[0].OD_P;
            this.yqyjinfo.dateyj.orange=data[1].OD_P;
            this.yqyjinfo.dateyj.red=data[2].OD_P;
            this.Reload();
        });
      }
    },
    timechange(){
      console.log(this.form.date);
      this.Reload();
    },
    drawchart() {
      var achart = this.$echarts.init(this.$refs.achart);
      console.log(this.data2);
      achart.resize();
      achart.setOption({
        title: { text: this.data2.showname },
        tooltip: {
          trigger: "axis"
        },
        color:["#6C84CE"],
        legend: {
          data: [ this.data2.y1.name],
          y: "bottom"
        },
        toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              magicType: { show: true, type: ["line", "bar"] },
              saveAsImage: { show: true }
            }
          },
        calculable: true,
        animation: true,
        xAxis: [
          {
            type: "category",
            //boundaryGap: false,
            data:this.data2.x.list,
          }
        ],
        yAxis: [
          {
            name: `${this.data2.y1.name}mm`,
            type: "value",
            axisLabel: {
                formatter: "{value} "
            },
            min:this.data2.y1.min,
            max:this.data2.y1.max,
          },
        ],
        series: [
          {
            name: this.data2.y1.name,
            type: "bar",
            barMaxWidth:50,
            data: this.data2.y1.list,
            showBackground: true,
          },
        ]
      });
    },
    err(){
      this.$Message.warning('该功能还在开发中...');
    },
    getNowDayString(now){
      return now.getFullYear()+"-"+((now.getMonth()+1)<10?"0"+(now.getMonth()+1):(now.getMonth()+1))+"-"+(now.getDate()<10?"0"+now.getDate():now.getDate());
    },
    //获取测站编号列表
    getMpcdList(callback){
      this.axios.get("/guanqu/info/cdbhlist?TYPE=1&STCD="+this.searchs).then(res => {
        this.select.sllmpsdList=res.data;
        this.select.shenliuliang_select=res.data[0].value;
        if (typeof callback == "function") {
          callback(this.select.shenliuliang_select);
        }
      });
    },
    ReloadBysort(){
      var tableType = this.select.yuqing_select;
        this.letTableLoading("yuqing"); // 表格加载中
        // 传递参数
        var body = {
            STCD: this.searchs,
            _page: this.list_input.current,
            _page_size: this.list_input.pagesize
        };

        // 如果有选择排序，则传递排序参数
        if (this.form.field!=null && this.form.field!='') {
            body._orderby = this.form.field;
        } else {
            switch (tableType) {
                case "hourTable":
                    body._orderby = `DT `;
                    break;

                case "dayTable":
                    body._orderby = `tm `;
                    break;

                case "tenDaysTable":
                    body._orderby = `dt `;
                    break;

                case "monthTable":
                    body._orderby = `dt `;
                    break;

                case "yearTable":
                    body._orderby = `YR `;
                    break;
            }
        }
        // 如果有选择日期进行查询，根据表格类型传递参数
        if (this.table.yuqing.date && tableType !== "yearTable") {
            switch (tableType) {
                case "dayTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    console.log(DTT[1].substr(0,10),DTT[2].substr(0,10))
                    body.Time_min = DTT[1].substr(0,10);
                    body.Time_max = DTT[2].substr(0,10);
                    break;
                case "hourTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    body.Time_min = DTT[1];
                    body.Time_max = DTT[2];
                    break;
                case "tenDaysTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    body.Time_min = `${DTT[1].substr(0,7)}-01`;
                    body.Time_max = `${DTT[2].substr(0,7)}-01`;
                    break;
                case "monthTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date, "monthTable")
                        .split(",");
                    body.Time_min = `${DTT[1].substr(0,7)}-01`;
                    body.Time_max = `${DTT[2].substr(0,7)}-01`;
                    break;

            }
        }
        if (tableType === "yearTable") {
            var start_year = this.table.yuqing.start_year;
            var end_year = this.table.yuqing.end_year;
            if (start_year) {
                var start = new Date(start_year),
                    end = end_year ? new Date(end_year) : new Date();
                body.Time_min = start.getFullYear()
                body.Time_max = end.getFullYear()
            }
        }
      this.loading = true;
      this.$GetData.Survey_History_YQ(
        tableType,
        body,
        {
          default: true,
          myFilter: data => {
            data.map(val => {
              if(val.P==''){
                val.P='0.0';
              }
              if(val.p==''){
                val.p='0.0';
              }
              val.currentPage = body._page;
              val.pageSizes = body._page_size;
              return val;
            });
            return data;
          }
        },
        data => {
          this.table.yuqing.Rows_filter = data.data;
          this.list_input.total = data.total;
          this.cancelTableLoading("yuqing"); // 取消表格加载
        }
      );
    },
     // 表格加载中
    letTableLoading(tableName) {
      this.table[tableName].loading = true;
    },
    // 取消表格加载
    cancelTableLoading(tableName) {
      this.table[tableName].loading = false;
    },
    Reload() {     
       var tableType = this.select.yuqing_select;
        this.letTableLoading("yuqing"); // 表格加载中
        switch (tableType) {
                case "hourTable":
                    this.yqyjtext.huangse=this.yqyjinfo.houryj.yellow;
                    this.yqyjtext.chengse=this.yqyjinfo.houryj.orange;
                    this.yqyjtext.hongse=this.yqyjinfo.houryj.red;
                    break;

                case "dayTable":
                    this.yqyjtext.huangse=this.yqyjinfo.dateyj.yellow;
                    this.yqyjtext.chengse=this.yqyjinfo.dateyj.orange;
                    this.yqyjtext.hongse=this.yqyjinfo.dateyj.red;
                    break;

                case "tenDaysTable":
                    this.yqyjtext.huangse=this.yqyjinfo.periodyj.yellow;
                    this.yqyjtext.chengse=this.yqyjinfo.periodyj.orange;
                    this.yqyjtext.hongse=this.yqyjinfo.periodyj.red;
                    break;

                case "monthTable":
                    this.yqyjtext.huangse=this.yqyjinfo.monthyj.yellow;
                    this.yqyjtext.chengse=this.yqyjinfo.monthyj.orange;
                    this.yqyjtext.hongse=this.yqyjinfo.monthyj.red;
                    break;

                case "yearTable":
                    this.yqyjtext.huangse=this.yqyjinfo.yearyj.yellow;
                    this.yqyjtext.chengse=this.yqyjinfo.yearyj.orange;
                    this.yqyjtext.hongse=this.yqyjinfo.yearyj.red;
                    break;
            }
        // 传递参数
        var body = {
            STCD: this.searchs,
            _page: this.list_input.current,
            _page_size: this.list_input.pagesize
        };

        // 如果有选择排序，则传递排序参数
        if (this.form.field!=null && this.form.field!='') {
            body._orderby = _this.form.field;
        } else {
            switch (tableType) {
                case "hourTable":
                    body._orderby = `DT `;
                    break;

                case "dayTable":
                    body._orderby = `tm `;
                    break;

                case "tenDaysTable":
                    body._orderby = `dt `;
                    break;

                case "monthTable":
                    body._orderby = `dt `;
                    break;

                case "yearTable":
                    body._orderby = `YR `;
                    break;
            }
        }
        // 如果有选择日期进行查询，根据表格类型传递参数
        if (this.table.yuqing.date && tableType !== "yearTable") {
            switch (tableType) {
                case "dayTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    console.log(DTT[1].substr(0,10),DTT[2].substr(0,10))
                    body.Time_min = DTT[1].substr(0,10);
                    body.Time_max = DTT[2].substr(0,10);
                    break;
                case "hourTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    body.Time_min = DTT[1];
                    body.Time_max = DTT[2];
                    break;
                case "tenDaysTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    body.Time_min = `${DTT[1].substr(0,7)}-01`;
                    body.Time_max = `${DTT[2].substr(0,7)}-01`;
                    break;
                case "monthTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date, "monthTable")
                        .split(",");
                    body.Time_min = `${DTT[1].substr(0,7)}-01`;
                    body.Time_max = `${DTT[2].substr(0,7)}-01`;
                    break;

            }
        }
        if (tableType === "yearTable") {
            var start_year = this.table.yuqing.start_year;
            var end_year = this.table.yuqing.end_year;
            if (start_year) {
                var start = new Date(start_year),
                    end = end_year ? new Date(end_year) : new Date();
                body.Time_min = start.getFullYear()
                body.Time_max = end.getFullYear()
            }
        }
      this.loading = true;
      this.$GetData.Survey_History_YQ(
        tableType,
        body,
        {
          default: true,
          myFilter: data => {
            data.map(val => {
              if(val.P==''){
                val.P='0.0';
              }
              if(val.p==''){
                val.p='0.0';
              }
              val.currentPage = body._page;
              val.pageSizes = body._page_size;
              return val;
            });
            return data;
          }
        },
        data => {
          this.table.yuqing.Rows_filter = data.data;
          this.list_input.total = data.total;
          body._page = 1;
          body._page_size = 999999999;
          this.$GetData.Survey_History_YQ(
            tableType,
            body,
            {
              default: true,
              myFilter: data => {
                data.map(val => {
                  if(val.P==''){
                    val.P='0.0';
                  }
                  if(val.p==''){
                    val.p='0.0';
                  }
                  return val;
                });
                return data;
              }
            },
            chartData => {
              this.data2=chartData.data;
              if(this.data2==null || this.data2.length==0){            
                return;
              }
               // 雨情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
            this.data2 = this.$App.transform_YQ_data_into_ehart_data(this.data2, tableType);
            var ydata=[],yjobj={};
            switch (tableType) {
              case "hourTable":
                yjobj=this.yqyjinfo.houryj;
                break;
              case "dayTable":
                yjobj=this.yqyjinfo.dateyj;
                break;
              case "tenDaysTable":
                yjobj=this.yqyjinfo.periodyj;
                break;
              case "monthTable":
                yjobj=this.yqyjinfo.monthyj;
                break;
              case "yearTable":
                yjobj=this.yqyjinfo.yearyj;
                break;
              default: yjobj=this.yqyjinfo.houryj;
            }
            for(var s=0; s<this.data2.y1.list.length;s++){
              var yobj=new Object();    
              yobj.itemStyle={color:''};          
              var yval=this.data2.y1.list[s];
              console.log(yval);
              yobj.value=yval;
              if(yval<yjobj.yellow){
                yobj.itemStyle.color="#6C84CE";
              }else if(yval>=yjobj.yellow && yval<yjobj.orange){
                yobj.itemStyle.color="#F7ED23";
              }else if(yval>=yjobj.orange && yval<yjobj.red){
                yobj.itemStyle.color="#F77823";
              }else{
                yobj.itemStyle.color="#F72323";
              }
              ydata.push(yobj);
            }
            this.data2.y1.list=ydata;
            this.data2.x.list = this.data2.x.list;
            var showname=this.data2.chartName;
            var mintime=this.data2.x.list[0].slice(0, 13),maxtime=this.data2.x.list[this.data2.x.list.length-1].slice(0, 13);
            var now=new Date();
            if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==now.getFullYear()){
              for(var i=0;i<this.data2.x.list.length;i++){
                var time=this.data2.x.list[i].substr(5);
                this.data2.x.list[i]=time;
              }
            }
            if(tableType=="hourTable"){               
                var nowdate=this.getNowDayString(now);
                if(now.getHours()<8){
                    var day1 = new Date();
                    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
                    day1.setHours(8);
                    day1.setMinutes(0);
                    day1.setSeconds(0);
                    var lastday=this.getNowDayString(day1);
                    if(mintime>=lastday+" 08" && maxtime<=nowdate+" 0"+now.getHours()){
                        showname = "今日雨量图";
                    }
                }else{
                    if(mintime>=nowdate+" 00" && maxtime<=nowdate+" "+now.getHours()){
                        showname = "今日雨量图";
                        for(var i=0;i<this.data2.x.list.length;i++){
                          var time=this.data2.x.list[i].split(" ");
                          this.data2.x.list[i]=time[1];
                        }
                    }
                }          
            }
             switch (this.data2.chartName) {
                case "小时表":
                    if(showname!="今日雨量图"){
                      showname="小时雨量图";
                     }                  
                    break;
                case "日表":
                    showname="日雨量图";
                    break;
                case "月表":
                    showname="月雨量图";
                    break;
                case "旬表":
                    showname="旬雨量图";
                    break;
                case "年表":
                    showname="年雨量图";
                    break;
                } 
              this.data2.showname=showname;   
              console.log(this.data2);    
              this.drawchart();
            }
          );
        }
      );
      let obj = {};
                obj.Time_max = body.Time_max;
                obj.Time_min = body.Time_min;
                obj.STCD = body.STCD;
                this.$GetData.statistics_rain_YQ(tableType, obj, false, (data) => {
                    var d = data.data;
                    this.jiangyu_tongji.rainSum = d.LeiJiYuLiang;
                    this.jiangyu_tongji.rainVag = d.PingJunJiangYu;
                    this.jiangyu_tongji.rainMax = d.ZuiDaJiangYu;
                })
                this.cancelTableLoading("yuqing"); // 取消表格加载
    },
    indexMethod(index){
      return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
    },
    // 处理页码切换
    CurrentChange(index) {
      // console.log(index);
      this.list_input.current = index;
      this.ReloadBysort();
    },
    // 处理每页显示条数切换
    PagesizeChange(pagesize) {
      // console.log(pagesize)
      this.list_input.pagesize = pagesize;
      this.ReloadBysort();
    }
  },
  created() {
  },
  computed:{
    balabala(){
      //console.log(this.$store.state.anniu);
      return this.$store.state.anniu
    }
  },
  watch:{
    // 'this.$store.state.anniu': function(){
    //   console.log(this.$store.state.anniu);
    // }
    balabala(curVal,oldVal){
      console.log(curVal);
      this.test1(curVal)
    }
  }

};
</script>

<style type="text/css" lang="less">
.switch{
  position: absolute;
  right: 0;
  top: 0;
  height: 55px;
  display: flex;
  align-items: center;
  background: white;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: #7eb7f0 2px solid;
  border-right: 0;
}
</style>
