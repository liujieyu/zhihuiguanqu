<template>
  <div v-loading="boxLoading">
              <table cellspacing="0" width="100%" class="table_detail">
                <tr>
                  <td align="right" class="dt_name">短信类型：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ boxsendInfo.APPID || "&nbsp;" }}</td>
                  <td align="right" class="dt_name" >发送结果：</td>
                  <td align="center" class="dt_vale">{{boxsendInfo.RESULT|| "&nbsp;"}}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">接收号码：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ boxsendInfo.RECEIVER || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">发送对象：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ boxsendInfo.ADDTION1 || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">对象单位：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ boxsendInfo.ADDTION2 || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">对象职务：</td>
                  <td align="center" class="dt_vale">{{ boxsendInfo.ADDTION3 || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">发送时间：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ boxsendInfo.SENDTIME || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">优先级：</td>
                  <td align="center" class="dt_vale">{{ boxsendInfo.PRI || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">短信内容：</td>
                  <td align="center" class="dt_vale" colspan="3" style="padding-left:10px;padding-right:10px;">{{ boxsendInfo.CONTENT || "&nbsp;" }}</td>
                </tr>
              </table>
  </div>
</template>

<script type="text/javascript">
export default {
    props: {
    info: {}
  },
  data() {
    return {
       // 站点
      boxsendInfo: {},
      // 整块区域的加载控制
      boxLoading: false
    }
  },
  methods: {
      // 加载站点数据
    loadBoxData(data) {
      this.boxsendInfo = data;
    },
    // 组件加载中
    componentLoading() {
      this.boxLoading = true;
    },
    // 取消组件加载
    cancelComponentLoading() {
      this.boxLoading = false;
    }
  },
  mounted() {
      // 组件加载中
    this.componentLoading();
      // 获取详情数据
    this.axios
      .get(`/alarm/boxinfo/${this.info.rowinfo.TABLENAME}&${this.info.rowinfo.ID}`)
      .then(res => {
        var boxdata=res.data;
            boxdata.RESULT=this.info.rowinfo.RESULT;
        // 加载站点数据
        this.loadBoxData(boxdata);
        // 加载取消
        this.cancelComponentLoading();     
      });
  }
};
</script>

<style lang="less" scope>
@import "../../components/Details/common/common.less";
</style>