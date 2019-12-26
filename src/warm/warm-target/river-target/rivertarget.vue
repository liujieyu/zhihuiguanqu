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
           prop="XHWL"
           label="I级(校核洪水位)"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="180">
        </el-table-column>
        <el-table-column
           prop="BZWL"
           label="II级(保证水位)"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="180">
        </el-table-column>
        <el-table-column
           prop="AWL"
           label="III级(警戒水位)"
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
  import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
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
            STNM:'入库流量站',
            XHWL:'2713.50',
            BZWL:'2713.00',
            AWL:'2712.500',
          },
        ], 
        form:
        {
          searchmsg:'',
        }
      }
    }, 
    mounted()
    {
    },
    methods:{
      exportToExcel() {
                window.location.href='/'+this.$WarmTable+'/excel/exporttarget/2';
      },
    }
  }
</script>