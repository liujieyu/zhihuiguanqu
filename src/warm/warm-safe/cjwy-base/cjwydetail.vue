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
                          >{{ base.cjbxInfo.mpcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.cjbxInfo.damcd || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">经度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.eslg || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">纬度：</td>
                          <td align="center" class="dt_vale">{{ base.cjbxInfo.nrlt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">位移阈值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.vrds || "&nbsp;" }}mm</td>
                          <td align="right" class="dt_name">初始高程：</td>
                          <td align="center" class="dt_vale">{{ base.cjbxInfo.inel || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">型式：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.tp|| "&nbsp;" }}</td>
                          <td align="right" class="dt_name">基础情况：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.cjbxInfo.bsin || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">仪器编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.dvcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">安装日期：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.cjbxInfo.indt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">测定日期：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.dtdt || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">更新时间：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.cjbxInfo.dtuptm || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">备注：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            colspan="3"
                          >{{ base.cjbxInfo.rm || "&nbsp;" }}</td>
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
            cjbxInfo:{},
        },
    };
  },
   mixins: [FilterMethods, GetDataMethods],
   methods: {

   },
     mounted() {
        //位移变形详情
        this.axios.get("/guanqu/detail/czwyinfo", {
            params: {MPCD:this.info.mpcd}
        }).then(res => {
            var data=res.data.czwyinfo;
            this.base.cjbxInfo=data[0];
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