<template>
  <div v-loading="boxLoading">
     <el-tabs type="border-card" v-model="activeName">
      <!-- 站点信息 -->
      <el-tab-pane name="zhandianxinxi">
        <span slot="label">
          <i class="el-icon-tickets"></i> 站点预警详情
        </span>
        <div>
    <!-- 信息内容 -->
            <div>
    <table cellspacing="0" width="100%" class="table_detail">
                <tr>
                  <td align="right" class="dt_name">测站名称：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.STNM || "&nbsp;" }}</td>
                  <td align="right" class="dt_name" >监测类型：</td>
                  <td align="center" class="dt_vale">{{siteInfo.JCTYPE|| "&nbsp;"}}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">预警状态：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.SIGNNAME || "&nbsp;" }}</td>
                  <td align="center" class="dt_vale" colspan="2">
                    <Button @click="showjiance(item.ID,item.NAME)" size="small" type="info" v-for="item in siteInfo.TYPES" style="margin-left:7px;">{{ item.NAME }}</Button>
                  </td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">预警等级：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.ALARMNAME || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">预警时间：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.TMSTR || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">测量值：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.MV || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">预警指标：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.AlARMV || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">站址：</td>
                  <td align="center" class="dt_vale" colspan="3">{{ siteInfo.ADNM || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">预警内容：</td>
                  <td align="center" class="dt_vale" colspan="3" style="padding-left:10px;padding-right:10px;">{{ siteInfo.CONTENTS || "&nbsp;" }}</td>
                </tr>
              </table>
              </div>
        </div>
    </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
export default {
    props: {
    info: {}
  },
  data() {
    return {
        // 激活标签栏
      activeName: "zhandianxinxi",
       // 站点
      siteInfo: {},
      // 整块区域的加载控制
      boxLoading: false
    }
  },
  methods: {
      // 加载站点数据
    loadSiteData(data) {
      this.siteInfo = data;
    },
    // 组件加载中
    componentLoading() {
      this.boxLoading = true;
    },
    // 取消组件加载
    cancelComponentLoading() {
      this.boxLoading = false;
    },
    showjiance(type,typename){
        var evt = new Object();
              evt.graphic = new Object();
              evt.graphic.attributes = new Object();
              evt.graphic.attributes.STNM=this.info.STNM;
              evt.graphic.attributes.rowinfo=new Object();
              evt.graphic.attributes.rowinfo.STCD=this.info.STCD;
              evt.graphic.attributes.rowinfo.STNM=this.info.STNM;
              var v = new Object;                         
        switch(type){
            case "1":v.itype = "yuqing";evt.graphic.attributes.rowinfo.tableType = {qdsq: "hourTable"};
                   break;
            case "2":v.itype = "shuikushuiqing";evt.graphic.attributes.rowinfo.tableType = {qdsq: "historyTable"};
                   break;
            case "3":v.itype = "hedaoshuiqing";evt.graphic.attributes.rowinfo.tableType = {qdsq: "historyTable"};
                   break;
            case "4":v.itype = "qudaoshuiqing";evt.graphic.attributes.rowinfo.tableType = {qdsq: "historyTable"};
                   break;
            case "5":v.itype = "zhafashuiqing";evt.graphic.attributes.rowinfo.tableType = {zfsq: "historyTable"};           
                   break;
        }
              this.$App.showDrawer(evt, v);
    }
  },
  mounted() {
      // 组件加载中
    this.componentLoading();
      // 获取详情数据
    this.axios
      .get(`/alarm/siteinfo/${this.info.rowinfo.STCD}&${this.info.rowinfo.TMSTR}`)
      .then(res => {
        var sitedata=res.data;
        var types=sitedata.TYPENAME.split(",");
        var sitetype=new Array();
        var jctype="";
        for(var i=0;i<types.length;i++){
            var t_obj=new Object();
            t_obj.NAME=types[i].split("-")[0];
            t_obj.ID=types[i].split("-")[1];
            sitetype.push(t_obj);
            jctype+=t_obj.NAME;
            if(i<types.length-1){
              jctype+=",";
            }
        }
        sitedata.TYPES=sitetype;
        sitedata.JCTYPE=jctype;
        // 加载站点数据
        this.loadSiteData(sitedata);
        // 加载取消
        this.cancelComponentLoading();
      });
  }
};
</script>

<style lang="less" scope>
@import "../../components/Details/common/common.less";
</style>