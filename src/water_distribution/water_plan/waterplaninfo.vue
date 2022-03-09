<template>
  <div>
    <Content :style="{padding: '24px', background: '#fff'}">
      <Row type="flex" :gutter="16" justify="end" align="left">
        <Col align="left" fixed="left">
          查询年份：
          <el-select v-model="value" size="small" placeholder="请选择">
            <el-option
              v-for="item in metype"
              :key="item.value"
              :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </Col>
        <Col>
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">查询</Button>
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
        </col>
      </Row>
      <Divider/>
      <el-table
        :data="tableData"
        :height="theight"
        style="width: 100%">
        <el-table-column
          prop="B_TM"
          label="开始日期"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="E_TM"
          label="结束日期"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="Long"
          label="时长"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="W_Pro"
          label="配水项目"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column label="总干渠" align="center">
          <el-table-column label="大坝管理所" align="center">
            <el-table-column
              prop="Canal1"
              label="渠首"
              width="80"
              align="center">
            </el-table-column> 
            <el-table-column
              prop="Canal2"
              label="胜溪"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="Canal3"
              label="桃源"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="Canal4"
              label="西塘"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="Canal5"
              label="谢家冲"
              width="80"
              align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column label="横双管理所" align="center">
            <el-table-column
              prop="Canal6"
              label="石牛坝"
              width="80"
              align="center">
            </el-table-column> 
            <el-table-column
              prop="Canal7"
              label="南岭冲"
              width="80"
              align="center">
            </el-table-column> 
              <el-table-column
              prop="Canal8"
              label="烂泥"
              width="80"
              align="center">
            </el-table-column> 
          </el-table-column>
          <el-table-column label="煤炭坝管理所" align="center">
            <el-table-column
              prop="Canal9"
              label="塘湾"
              width="80"
              align="center">
            </el-table-column> 
            <el-table-column
              prop="Canal10"
              label="煤衡"
              width="80"
              align="center">
            </el-table-column> 
            <el-table-column
              prop="Canal11"
              label="东风"
              width="80"
              align="center">
            </el-table-column> 
            <el-table-column
              prop="Canal12"
              label="陈家坡"
              width="80"
              align="center">
            </el-table-column> 
            <el-table-column
              prop="Canal13"
              label="白竹冲"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="Canal14"
              label="金木坑"
              width="80"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="Canal15"
              label="南干渠首"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="Canal16"
              label="北干渠首"
              width="80"
              align="center">
            </el-table-column>  
          </el-table-column>
        </el-table-column>
        <el-table-column  label="峡山干渠">
          <el-table-column label="横双管理所">
            <el-table-column
              prop="Canal17"
              label="渠首"
              width="100"
              align="center">
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="沙河干渠" align="center">
          <el-table-column label="沙河管理所" align="center">
            <el-table-column
              prop="Canal18"
              label="左干渠首"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="Canal19"
              label="右干渠首"
              width="80"
              align="center">
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="date"
          label="太阳坝干渠"
          width="100"
          align="center">          
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
        theight:window.innerHeight-282,
        tableheight:'',
        metype:
        [
          {
            value:'2010',
            label:'2010年', 
          },
          {
            value:'2011',
            label:'2011年', 
          },
          {
            value:'2012',
            label:'2012年',
          },
          {
            value:'2013',
            label:'2013年', 
          },
          {
            value:'2014',
            label:'2014年', 
          },
          {
            value:'2015',
            label:'2015年',
          },
          {
            value:'2016',
            label:'2016年', 
          },
          {
            value:'2017',
            label:'2017年', 
          },
          {
            value:'2018',
            label:'2018年',
          },
          {
            value:'2019',
            label:'2019年',
          },
        ],
        
        form:{
          searchmsg:'',
        }        
      }
    
    }, 
    mounted(){
    },
  }
</script>

<style type="text/css">
  .ivu-divider-horizontal, .ivu-row 
  {
    margin-bottom: 12px;
  }
  .el-table th {  background-color: #f8f8f9;color:#515a6e;} 
  .el-table td, .el-table th { padding: 3px 0;}
  .el-table .el-table__row td {padding: 6px 0;}
  .searchcon {padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:24px;background: #fff;}
  .rowtocol .ivu-col {margin-top:12px;}
</style>