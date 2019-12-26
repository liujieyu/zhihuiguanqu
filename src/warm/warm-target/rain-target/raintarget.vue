<template>
  <div>
	<Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col>
          <Input search enter-button suffix="ios-search" placeholder="请输入站名：" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
        </Col>
        <Col>
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportToExcel">导出</Button>
        </col>
      </Row>
      <Row class="fgline"></Row>
      <el-table
        :data="data"
        border
        :height="tableheight"
        v-loading="loading"
        style="width: 100%"
        @cell-click="cellclick"
        @sort-change="sort_change">
        <el-table-column
          label=" "
          prop="ROWID"
          align="center"
          width="65"
          fixed="left">
        </el-table-column>
        <el-table-column
           prop="STNM"
           label="站名"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="150">
        </el-table-column>
        <el-table-column
           prop="TH_P"
           label="I级(3H降雨)"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="180">
        </el-table-column>
        <el-table-column
           prop="SH_P"
           label="II级(6H降雨)"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="180">
        </el-table-column>
        <el-table-column
           prop="TWH_P"
           label="III级(12H降雨)"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="180">
        </el-table-column>
        <el-table-column
           prop="OD_P"
           label="IV级(24H降雨)"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="180">
        </el-table-column>
      </el-table>
    </Content>
  </div>
</template>

<script type="text/javascript">
  import FilterMethods from "@/assets/commonJS/FilterMethods";
  import GetDataMethods from "@/assets/commonJS/GetDataMethods";
  export default 
  {
    data()
    {
      return{
        loading:false,
        tableheight:window.innerHeight-202,       
        data:
        [
          {
            ROWID:'1',
            STNM:'预警雨量站',
            TH_P:'24.1',
            SH_P:'24.1',
            TWH_P:'24.1',
            OD_P:'24.1',
          },
          {
            ROWID:'2',
            STNM:'坝上雨量站',
            TH_P:'24.1',
            SH_P:'24.1',
            TWH_P:'24.1',
            OD_P:'24.1',
          },
          {
            ROWID:'3',
            STNM:'入库雨量站',
            TH_P:'24.1',
            SH_P:'24.1',
            TWH_P:'24.1',
            OD_P:'24.1',
          },
        ],
        form:{
          searchmsg:'',
        }
      }
    }, 
    mounted(){
    },
    methods:{
      exportToExcel() {
              window.location.href='/'+this.$WarmTable+'/excel/exporttarget/1';
             },
    }
  }
</script>
