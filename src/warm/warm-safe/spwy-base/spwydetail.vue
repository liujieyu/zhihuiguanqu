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
                          >{{ base.wybxInfo.mpcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.wybxInfo.damcd || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">经度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.eslg || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">纬度：</td>
                          <td align="center" class="dt_vale">{{ base.wybxInfo.nrlt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">桩号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.ch || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">轴距：</td>
                          <td align="center" class="dt_vale">{{ base.wybxInfo.ofax || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">基准值X：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.stvlx || "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">基准值Y：</td>
                          <td align="center" class="dt_vale">{{ base.wybxInfo.stvly || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">位移阈值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.xyhrds || "&nbsp;" }}mm</td>
                          <td align="right" class="dt_name">高程：</td>
                          <td align="center" class="dt_vale">{{ base.wybxInfo.el || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">型式：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.tp|| "&nbsp;" }}</td>
                          <td align="right" class="dt_name">基础情况：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.wybxInfo.bsin || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">仪器编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.dvcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">安装日期：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.wybxInfo.indt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">测定日期：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.dtdt || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">更新时间：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.wybxInfo.dtuptm || "&nbsp;" }}</td>
                        </tr>
                      </table>  
</div>
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods"; // 过滤方法
import GetDataMethods from "@/assets/commonJS/GetDataMethods"; // 获取数据方法
import { debug } from 'console';
export default {
  props: {
    info: {}
  },
  data() {
    return {
        base:{
            wybxInfo:{},
        },
    };
  },
   mixins: [FilterMethods, GetDataMethods],
   methods: {

   },
     mounted() {
        //位移变形详情
        this.axios.get("/guanqu/detail/spwyinfo", {
            params: {MPCD:this.info.mpcd}
        }).then(res => {
            var data=res.data.spwyinfo;
            this.base.wybxInfo=data[0];
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
    background-color: #F6FAFF;
  }

  .dt_vale {
    width: 30%;
    border-right: none;
    border-left: none;
  }
}
</style>