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
        height="370"
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
           prop="XHWL"
           label="I级(校核洪水位)"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="180">
        </el-table-column>
        <el-table-column
           prop="ZCWL"
           label="II级(正常蓄水位)"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="180">
        </el-table-column>
        <el-table-column
           prop="FWL"
           label="III级(汛限水位)"
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
        tableheight:'',
        data:
        [
          {
            ROWID:'1',
            STNM:'坝前水位站',
            XHWL:'2524.120',
            ZCWL:'2520.200',
            FWL:'2518.200',
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
                window.location.href='/'+this.$WarmTable+'/excel/exporttarget/3';
      },
    }
  }
</script>
