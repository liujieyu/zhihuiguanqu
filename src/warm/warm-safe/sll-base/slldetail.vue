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
                          >{{ base.sllInfo.mpcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sllInfo.damcd || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">仪器编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.dvcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">设施名称：</td>
                          <td
                            align="center"
                            class="dt_vale" 
                          >{{ base.sllInfo.dhname || "&nbsp;" }}</td>                          
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">经度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.eslg || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">纬度：</td>
                          <td align="center" class="dt_vale">{{ base.sllInfo.nrlt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">桩号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.ch || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">轴距：</td>
                          <td align="center" class="dt_vale">{{ base.sllInfo.ofax>=0?('下游'+base.sllInfo.ofax):('上游'+(-base.sllInfo.ofax)) || "&nbsp;" }}m</td>
                        </tr>                     
                        <tr>
                          <td align="right" class="dt_name">高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.el || "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">测量方式：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sllInfo.ltype || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">渗流阈值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.spprwl || "&nbsp;" }}L/s</td>
                          <td align="right" class="dt_name">测量最小值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sllInfo.tdmin || "&nbsp;" }}L/s</td>
                        </tr>                        
                         <tr>
                          <td align="right" class="dt_name">安装日期：</td>
                          <td align="center" class="dt_vale" 
                              style="border-right: 1px solid #EBEEF5">{{ base.sllInfo.indt || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">更新时间：</td>
                          <td align="center" class="dt_vale">{{ base.sllInfo.dtuptm || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">安装信息：</td>
                          <td align="center" class="dt_vale" 
                              style="border-right: 1px solid #EBEEF5">{{ base.sllInfo.setinfo || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">测点备注：</td>
                          <td align="center" class="dt_vale">{{ base.sllInfo.rm || "&nbsp;" }}</td>
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
            sllInfo:{},
        },
    };
  },
   mixins: [FilterMethods, GetDataMethods],
   methods: {

   },
     mounted() {
        //渗流量详情
        this.axios.get("/guanqu/detail/sllinfo", {
            params: {MPCD:this.info.mpcd}
        }).then(res => {
            var data=res.data.sllinfo;
            this.base.sllInfo=data[0];
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