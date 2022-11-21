<template>
<div>
                 <el-table
                    :data="dmtzdata"
                    border
                    style="width:521px;"
                    header-cell-style="padding:4px 0px;"
                    size="small"
                    height="180"
                    empty-text="暂无站点数据"
                    >
                        <el-table-column align="center" prop="damscd" label="特征点编号"  :width="130">
                            <template slot-scope="scope">
                                {{ scope.row.damscd }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="damsnm" label="特征点名称" :width="150">
                            <template slot-scope="scope">
                                {{ scope.row.damsnm }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="redi" label="起点距(m)"  :width="120">
                            <template slot-scope="scope">
                                {{ scope.row.redi }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="poel" label="高程(m)"  :width="120">
                            <template slot-scope="scope">
                                {{ scope.row.poel }}
                            </template>
                        </el-table-column>
                    </el-table>
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
        dmtzdata:[{damscd:'0101001',damsnm:'测试特征名称',redi:123.45,poel:345.12}],
    };
  },
   mixins: [FilterMethods, GetDataMethods],
   methods: {

   },
     mounted() {
        //断面特征信息
        this.axios.get("/guanqu/detail/dmtzinfo", {
            params: {DAMCD:this.info.damcd}
        }).then(res => {
            this.dmtzdata=res.data.dmtzinfo;
        });
     }
}
</script>