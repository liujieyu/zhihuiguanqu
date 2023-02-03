<template>
<div>
                     <table
                        style="border: 1px solid #EBEEF5"
                        border
                        cellspacing="0"
                        width="100%"
                        class="site_detail"
                      >
                        <tr>
                          <td align="right" class="dt_name">测点编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.mpcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sygInfo.damcd || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">经度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.eslg || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">纬度：</td>
                          <td align="center" class="dt_vale">{{ base.sygInfo.nrlt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">桩号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.ch || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">坝轴距：</td>
                          <td align="center" class="dt_vale">{{ base.sygInfo.ofax>=0?('下游'+base.sygInfo.ofax):('上游'+(-base.sygInfo.ofax)) || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">监测部位：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.msps || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">监测类型：</td>
                          <td align="center" class="dt_vale">{{ base.sygInfo.mstp || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">渗压阈值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.pztbtel || "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">安装高程：</td>
                          <td align="center" class="dt_vale">{{ base.sygInfo.el || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">进水段底高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.ipbtel|| "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">进水段顶高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sygInfo.iptpel || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">管口高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.tbtpel || "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">管底高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sygInfo.tbbtel || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">仪器编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.dvcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">更新时间：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sygInfo.dtuptm || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">备注：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            colspan="3"
                          >{{ base.sygInfo.rm || "&nbsp;" }}</td>
                        </tr>
                      </table>  
</div>
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods"; // 过滤方法
import GetDataMethods from "@/assets/commonJS/GetDataMethods"; // 获取数据方法
export default {
  props: {
    info: {}
  },
  data() {
    return {
        base:{
            sygInfo:{},
        },
    };
  },
   mixins: [FilterMethods, GetDataMethods],
   methods: {

   },
     mounted() {
        //渗流压力详情
        this.axios.get("/guanqu/detail/syginfo", {
            params: {MPCD:this.info.mpcd}
        }).then(res => {
            var data=res.data.syginfo;
            this.base.sygInfo=data[0];
        });
     }
}
</script>
<style lang="less" scope>
.site_detail {
  td {
    height: 32px;
    border-top: none;
    border-color: #EBEEF5;
    font-size: 12px;
  }

  .dt_name {
    width: 20%;
    border-left: none;
    font-weight: bold;
    background-color: #F5F8FE;
  }

  .dt_vale {
    width: 30%;
    border-right: none;
    border-left: none;
  }
}
</style>