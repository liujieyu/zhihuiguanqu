<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
      <BreadcrumbItem>闸阀控制</BreadcrumbItem>
      <BreadcrumbItem>实时控制</BreadcrumbItem>
    </Breadcrumb>

    <div>
      <Content :style="{padding: '24px', background: '#fff'}">
        <!-- 查询栏 -->
        <div>
          <Row type="flex" :gutter="16" justify="start">
            <Col>
              行政区划:
              <el-cascader clearable size="small" style="width: 160px" placeholder="请选择地址" :options="form.adressList" v-model="form.model_adress" @change="kaidulishibiao_init" change-on-select></el-cascader>
            </Col>
            <Col>
              渠道:
              <el-cascader clearable size="small" style="width: 160px" placeholder="请选择渠道" :options="form.qudaoList" v-model="form.model_qudao" @change="kaidulishibiao_init" change-on-select></el-cascader>
            </Col>
            <Col>
              管理机构:
              <el-cascader clearable size="small" style="width: 160px" placeholder="请选择管理机构" :options="form.guanliList" v-model="form.model_guanli" @change="kaidulishibiao_init" change-on-select></el-cascader>
            </Col>
            <Col>
              站点类型:
              <el-select v-model="form.model_site" style="width: 160px" multiple collapse-tags clearable size="small" @change="kaidulishibiao_init" placeholder="站点类型">
                  <el-option v-for="item in form.siteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </Col>
            <Col>
              <!-- 站名模糊搜索 -->
              <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="kaidulishibiao_init" v-model="form.search_str"/>
            </Col>
            <Col>
              <Button type="primary" style="width: auto;" @click="err">导出</Button>
            </Col>
          </Row>
        </div>

        <Divider />
        <!-- 统计栏 -->
        <Row style="font-size: 16px;">
          <Col class="borsLine">
            共{{counter.total}}个站点
          </Col>
        </Row>

        <Divider style="margin-top: 0;" />
        <!-- 图块数据展示栏 -->
        <div>
          <Row type="flex" style="flex-wrap:wrap;" :gutter="24" v-loading="loading">
            <Col span="6" v-for="(item,index) in table.SSXX.Rows" style="margin-top: 20px;">
              <Card>
                <div slot="title">
                  <img
                    class="kaidulishi_img"
                    :src="`/guanqu/gis/pic_content?id=${item.rowinfo.STCD}`"
                    style="width: 100%;cursor:pointer"
                    @click="fangda(table.kaidulishi.Rows,index)"
                  />
                </div>
                <Row>
                  <Col span="6">站名:</Col>
                  <Col span="6">
                    <span class="site_name" @click="show_details(item)">{{ item.rowinfo.STNM }}</span>
                  </Col>
                  <Col span="6">当前开度:</Col>
                  <Col span="6">{{ item.rowinfo.OD }}</Col>
                </Row>
                <Row>
                  <Col span="6">当前状态:</Col>
                  <Col>{{ item.rowinfo.state }}</Col>
                </Row>
                <Row>
                  <Col span="6">闸前水深:</Col>
                  <Col span="6">{{ $FilterData.Float_Filter(item.rowinfo.upz) + "m" }}</Col>
                  <Col span="6">闸后水深:</Col>
                  <Col span="6">{{ $FilterData.Float_Filter(item.rowinfo.dwz) + "m" }}</Col>
                </Row>
                <Row>
                  <Col span="6">过闸流量:</Col>
                  <Col>{{ $FilterData.Float_Filter(item.rowinfo.q, 3) + "m³/s" }}</Col>
                </Row>
                <Row>
                  <Col span="6">闸门开度:</Col>
                  <Col>{{ item.rowinfo.OD }}</Col>
                </Row>
                <Row>
                  <Col span="6">所在渠道:</Col>
                  <Col></Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>



        <!-- 控制窗口 -->
        <el-dialog :title="'执行控制： '+kz.STNM" :visible.sync="dialogTableVisible" width="1350px" :fullscreen="false" :close-on-click-modal="false">
          <div v-if="dialogTableVisible" id="dialog_congzhi">
            <Row type="flex" justify="center" align="middle" :gutter="20" style="margin: 0 0 20px 0;">
              <Col span="12">
                <div>
                      <el-table :data="kz_lishi" height="480" border>
                        <el-table-column prop="TM" label="时间" width="140"></el-table-column>
                        <el-table-column prop="OD" label="开度(m)" width=""></el-table-column>
                        <el-table-column prop="UPZ" label="闸前水深(m)" width=""></el-table-column>
                        <el-table-column prop="DWZ" label="闸后水深(m)" width=""></el-table-column>
                        <el-table-column prop="Q" label="过闸流量(m³/s)" width=""></el-table-column>
                      </el-table>
                </div>
              </Col>
              <Col span="12">
                <div style="margin: 10px auto;  width: 640px; height:480px; padding: 0; ">
                  <iframe style="width: 640px; height:480px; border: 0px solid red; border: 1px solid black;" id="video" :src="video_iframe"></iframe>
                </div>
              </Col>
            </Row>

            <Row style="margin:10px 10px" :gutter="20">
              <div style="text-align: center;"> <header>开度: {{ kz.OD }} m (最大允许： {{ kz.MAX }} m)</header> </div>
            </Row>

            <el-row style="text-align: center;">
              <div style="margin: 10px">
                <el-slider v-model="kz.OD" :min="0" :step="0.01" :max="kz.MAX"></el-slider>
              </div>
              <div style="margin: 10px">
                  <el-button type="danger" @click="run" :loading="run_button">执行</el-button>
                  <el-button type="" @click="dialogTableVisible=false">关闭窗口</el-button>
              </div>
            </el-row>
          </div>
        </el-dialog>






      </Content>
    </div>
  </div>
</template>

<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import Image from "@/assets/image/shuizha.jpg";
//import { setTimeout, setInterval, clearInterval } from "timers";
export default {
  data() {
    return {
      run_button:false,
      table: {
        kaidulishi: {
          Rows: [],
          loading: false
        },
        SSXX: {
          Rows: [],
          loading: false
        }
      },
      details: {
        rowinfo: null,
        current_OD: 0.5,
        split: 0.3,
        Interval: null
      },

      // koen
      kz:{
          OD:0,
          STCD:'',
          STNM:'',
          MAX:10,
      },
      kz_lishi: [],
      counter: {total:0 },


      marks: {
        0: "0",
        50: {
          style: {
            color: "#1989FA"
          },
          label: this.$createElement("strong", "1.00")
        },
        100: "2"
      },
      dialogTableVisible: false,
      loading: false,
      activeNames: [],
      list_input: {
        total: 100,
        pagesize: 48,
        pagesizeopts: [10, 20, 48, 75, 100, 200],
        current: 1
      },
      form: {
        adressList: [],
        qudaoList: [],
        siteList: [
          {
            value: "1",
            label: "闸门"
          },
          {
            value: "2",
            label: "阀门"
          }
        ],
        model_site: [],
        model_adress: "",
        zdlx: "",
        model_qudao: "",
        model_guanli: "",
        date: "",
        search_str: null,
        xzqh: "",
        qd: ""
      },
      timesearch: "",
      data: [],
      list: [
        {
          Image: Image
        },
        {
          Image: Image
        },
        {
          Image: Image
        },
        {
          Image: Image
        },
        {
          Image: Image
        }
      ],
      searchs: "",
      STNMSlength: 0,
      STNMlength: 0,
      item:{},
      video_iframe:'',
    };
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods, GetDataMethods],



  methods: {
    //绘制闸门图
    drawchart(Hight,OD) {
      var achart = this.$echarts.init(document.getElementById(achart));
      console.log('+++++++++++++++++++',Hight,OD);
      achart.resize();
      achart.setOption({
        xAxis: {
          type: 'category',
          data: ['闸门']
      },
      yAxis: [
      {
          inverse: true,
          type: 'value',
          min:0,
          max:Hight,
          axisLabel:{
            show:false,
          }
      },
      {
          name: "闸门高度",
          type: 'value',
          min:0,
          max:Hight,
      }
      ],
      series: [{
          data: [Hight-OD],
          type: 'bar'
      }]
      });
    },
    formatTooltip(val) {
      return val / (100 / 2);
    },
    handleChange(val) {
      console.log(val);
    },
    fangda(data, index) {
      // data = data.map(val => {
      //   // val.url = val.Image;
      //   return val;
      // });
      // console.log(item);
      this.$App.enlarge_img(data, index);
    },
    // 分页过滤
    pageFilter(currentPage, pageSizes) {
      var _currentPage = currentPage || this.table.currentPage;
      var _pageSizes = pageSizes || this.table.pageSizes;
      // 截取数组
      var newList = this.table.Rows_filter.slice(
        (_currentPage - 1) * _pageSizes,
        _currentPage * _pageSizes
      );

      return newList;
    },
    gobox(item) {
      console.log(item);
      var evt = new Object();
      evt.graphic = new Object();
      evt.graphic.attributes = item;
      evt.graphic.attributes.itype = "tuxiang";
      evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(item));
      evt.graphic.attributes.STNM = evt.graphic.attributes.stnm;
      evt.graphic.attributes.STCD = evt.graphic.attributes.stcd;
      evt.graphic.attributes.rowinfo.STNM = evt.graphic.attributes.rowinfo.stnm;
      evt.graphic.attributes.rowinfo.STCD = evt.graphic.attributes.rowinfo.stcd;
      // evt.graphic.attributes.rowinfo.tableType = {
      //   tx: "historyTable"
      // };
      var v = new Object();
      v.itype = "tuxiang";
      console.log("evt", evt);
      this.$App.showDrawer(evt, v);
    },
    Reload() {
      this.loading = true;
      if (this.form.model_adress.length == 0) {
        this.form.xzqh = "";
      }
      if (this.form.model_adress.length == 1) {
        var str1 = this.form.model_adress[0];
        str1 = str1.substring(0, 6);
        this.form.xzqh = str1;
      }
      if (this.form.model_adress.length == 2) {
        var str2 = this.form.model_adress[1];
        str2 = str2.substring(0, 9);
        this.form.xzqh = str2;
      }
      if (this.form.model_adress.length == 3) {
        var str3 = this.form.model_adress[2];
        str3 = str3.substring(0, 12);
        this.form.xzqh = str3;
      }
      if (this.form.model_qudao.length == 0) {
        this.form.qd = "";
      }
      if (this.form.model_qudao.length == 1) {
                    // var str4 = this.form.model_qudao[0];
                    // str4 = str4.substring(0, 5);
                    this.form.qd = this.form.model_qudao[0];
                }
                if (this.form.model_qudao.length == 2) {
                    // var str5 = this.form.model_qudao[1];
                    // str5 = str5.substring(0, 9);
                    this.form.qd = this.form.model_qudao[1];
                }
      // this.axios.get('/guanqu/table/ST_JPG_H?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{ADDVCD:this.form.xzqh,Canal_Code:this.form.qd}}).then((res)=>{
      //     this.loading = false;
      // });
      this.axios
        .get(
          "/guanqu/tuxiang/index?_page_size=" +
            this.list_input.pagesize +
            "&_page=" +
            this.list_input.current +
            this.searchs,
          { params: { ADDVCD: this.form.xzqh, Canal_Code: this.form.qd } }
        )
        .then(res => {
          this.loading = false;
          this.data = res.data.rows;
          this.list_input.total = res.data.total;
          for (var i = 0; i < this.data.length; i++) {
            this.data[i].TM = this.data[i].TM.replace(".000", "").replace(
              "20",
              ""
            );
          }
          this.data.forEach((val, index, array) => {
            var Image =
              "http://v3.yingmen.vip/guanqu/gis/pic_content?id=" + val.stcd;
            this.axios
              .get("/guanqu/tuxiang/details?STCD=" + val.stcd)
              .then(res => {
                if (res.data.GUANLIAN_YAOSU.length != 0) {
                  val.GUANLIAN_YAOSU = res.data.GUANLIAN_YAOSU;
                }
              });
            val.Image = Image;
          });
          console.log("关联要素", this.data);
        });
      this.axios
        .get("/guanqu/tuxiang/index?_page_size=99999", {
          params: { ADDVCD: this.form.xzqh, Canal_Code: this.form.qd }
        })
        .then(res => {
          this.STNMSlength = res.data.total;
        });
      this.getTableData_WRP_AD_B(data => {
        this.form.adressList = data;
      });
      // 获取输排水渠道数据,然后设置渠道选择框选项
      this.getTableData_WRP_IrrBTCanalSystem(data => {
        this.form.qudaoList = data;
      });
    },
    err() {
      this.$Message.warning("该功能还在开发中...");
    },
    // 处理页码切换
    CurrentChange(index) {
      // console.log(index);
      this.list_input.current = index;
      this.Reload();
    },
    // 处理每页显示条数切换
    PagesizeChange(pagesize) {
      // console.log(pagesize)
      this.list_input.pagesize = pagesize;
      this.Reload();
    },
    // 排序
    sort_change_shuiqing() {},



    // 执行闸阀控制
    // koen 2019-8-2
    run() {
      //return;
      this.run_button = true;

      this.axios.put("/guanqu/zhafakongzhi/shishi",{ KZKD: this.kz.OD, STCD: this.kz.STCD }).then(res => {
        this.run_button = false;
        this.$message({ message: '恭喜你，成功执行', type: 'success' });
      });
    },



    //显示控制窗口
    //koen 2019-8-2
    show_details(item) {
      console.log(item);

      this.dialogTableVisible = true;
      this.kz.OD = parseFloat(item.rowinfo.OD);
      this.kz.STCD = item.rowinfo.STCD;
      this.kz.STNM = item.rowinfo.STNM;
      this.kz.MAX = item.rowinfo.Strobe_Hight;

      this.reload_h();
      // this.shipin(this.kz.STCD);
      this.details.rowinfo = item.rowinfo;

      // 获取详情数据
      this.axios.get(`/guanqu/gis/details?ID=${item.rowinfo.STCD}&pk=STCD`).then(res => {
         var details_data = res.data;
         this.item = res.data;
         if (!details_data.CSTYPE) {

         }
        if (details_data.CSTYPE==3) {
          var video_iframe = document.getElementById("video");
          video_iframe.src = 'em-playvideo.html?61.187.248.226:8866'+','+details_data.PUID+','+details_data.IDX+','+details_data.STNM
        }
        if (details_data.CSTYPE==1) {
          var video_iframe = document.getElementById("video");
          // details_data.WWWPath
          video_iframe.src = details_data.WWWPath;
        }
         //video_iframe.src = 'em-playvideo_detail.html?61.187.248.226:8866'+','+details_data.PUID+','+details_data.IDX+','+details_data.STNM
         this.boxLoading = false;
      });
    },


    // shipin(STCD){
    //   this.axios.get('/guanqu/gis/details?ID='+STCD+'&pk=STCD').then(res => {
    //     this.item = res.data;
    //   });
    // },


    //定时刷新当前闸阀历史表
    //以便观察控制是否成功
    reload_h(){
      if (!this.dialogTableVisible) return;

      //var date = this.$App.xPointToNowOfTheDay(-72);
      //var DTT = this.$FilterData.elDatePicker_Filter(date).split(",");
      this.$GetData.Survey_History_ZFZT("historyTable", {
          STCD: this.kz.STCD,
          //Time_min: `${DTT[1]}`,
          //Time_max: `${DTT[2]}`,
          _orderby: 'TM desc',
          _page_size: 10,
      },res => {
          // console.log(res);
          this.kz_lishi = res;
          for (var i = 0;i<this.kz_lishi.length ; i++) {
            this.kz_lishi[i].UPZ = this.Z_Filter(this.kz_lishi[i].UPZ);
            this.kz_lishi[i].DWZ = this.Z_Filter(this.kz_lishi[i].DWZ);
          }
          this.axios.post('/guanqu/zhafazhuangtai/gis',{STCD:this.kz.STCD}).then(res => {
             this.item = res.data.features[0];
             // console.log('++++++++++',this.item,this.kz_lishi[0])
             this.drawchart(this.item.rowinfo.Strobe_Hight,this.kz_lishi[0].OD);
          });
        });
    },





    kaidulishibiao_init() {
      let body = new Object();

      // 如果输入框有内容，添加站名过滤字段
      if (this.form.search_str && new String(this.form.search_str).length != 0) {
        body["STNM"] = `${this.form.search_str}`;
      } else {
        // body["STNM"] = null;
      }
      // 如果地址选择框有内容，添加行政区划过滤字段
      if (this.form.model_adress && this.form.model_adress.length != 0) {
        body["ADDVCD"] = `${this.$App.ADDVCD_Array_Filter(
          this.form.model_adress
        )}`;
      } else {
        // body["ADDVCD"] = null;
      }
      // 如果渠道选择框有内容，添加渠道过滤字段
      if (this.form.model_qudao && this.form.model_qudao.length != 0) {
        body["Canal_Code"] = `${this.$App.Canal_Code_Array_Filter(
          this.form.model_qudao
        )}`;
      } else {
        // body["Canal_Code"] = null;
      }
      // 如果站点类型选择框有内容，添加行政区划过滤字段
      if (this.form.model_site && this.form.model_site.length != 0) {
        body["CTYPE"] = this.form.model_site.join(",");
      } else {
        // body["CTYPE"] = null;
      }
      console.log(this.form.model_status1);
      // 如果状态选择框有内容，添加行政区划过滤字段
      if (this.form.model_status1) {
        body["_status"] = this.form.model_status1.join(",");
      } else {
        // body["_status"] = null;
      }

      this.$GetData.getFeatrueLayer("zhafazhuangtai", body, res => {
        var data = res.data.features;
        data = data.map(val => {
          val.url = `http://v3.yingmen.vip/guanqu/gis/pic_content?id=${val.rowinfo.STCD}`;
          return val;
        });
        console.warn("data", data);
        this.table.SSXX.Rows = data;


        this.counter.total = data.length;
      });
    }
  },

  destroyed() {
    clearInterval(this.zk_Interval);
  },


  mounted() {
    //启动定时刷新机制
    this.zk_Interval = setInterval(()=>{ this.reload_h(); }, 5000);


    // 获取行政区划数据,然后设置地址选择框选项
      this.getTableData_WRP_AD_B(data => {
        this.form.adressList = data;
      });

    // 获取输排水渠道数据,然后设置渠道选择框选项
      this.getTableData_WRP_IrrBTCanalSystem(data => {
        this.form.qudaoList = data;
      });

    this.kaidulishibiao_init();
  }
};
</script>





<style lang="less" scoped>
header {
  background: #52a7fe;
  line-height: 2rem;
  padding-left: 1rem;
  color: white;
  font-size: 20px;
}
</style>

<style type="text/css" lang="less" >
.kaidulishi_img {
  width: 235px;
  height: 176px;
}

.site_name {
  cursor: pointer;
  color: rgb(82, 167, 254);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 83px;
  display: inline-block;
}

.el-dialog__body {
  height: 80%;
  #dialog_congzhi {
    height: 100%;
    border: 0px solid rgb(200, 200, 200);
    .ivu-split-wrapper {
      height: 80%;
    }

    // 单位栏
    .company {
      text-align: center;
      span {
        line-height: 2rem;
      }
    }

    #table_kaidulishi {
      position: absolute;
      top: 4rem;
      left: 0;
      bottom: 0;
      right: 0;
    }

    // 开度历史表
    .ivu-table-wrapper {
      height: 100%;
      // 开度历史表主体
      .ivu-table-body {
        position: absolute;
        top: 32px;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }
  }
}
</style>
