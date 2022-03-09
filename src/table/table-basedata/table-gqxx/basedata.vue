<template>
	<div>
		<Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start">
                        <Col>
                            灌区规模:
                            <Select v-model="gqgm.Field" style="width:120px;margin-left: 5px;margin-right: 20px;" @on-change="GQGMsearch" clearable>
                                <Option v-for="item in gqgm.IRASC" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            水源工程类别:
                            <Select v-model="sygclb.Field" style="width:120px;margin-left: 5px;margin-right: 20px;" @on-change="SYGCsearch" clearable>
                                <Option v-for="item in sygclb.IARHWPRTP" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入灌区名称" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                        </Col>
                    </Row>
                    <Divider />
                    <el-table
                        :data="data"
                        border
                        height="450"
                        v-loading="loading"
                        style="width: 100%"
                        >
                        <el-table-column
                          label=" "
                          type="index"
                          align="center"
                          width="65"
                          fixed="left"
                          :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                          prop="IRANM"
                          label="灌区名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="WTPLNM"
                          label="水源名称"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="IARHWPRTP"
                          label="水源工程类别"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="IRASC"
                          label="灌区规模"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="DTST"
                          label="排水标准"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="IRRN"
                          label="灌溉范围"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="DSYFL"
                          label="设计年引水量(10⁸m³)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="INGYFL"
                          label="正常年引水量(10⁸m³)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DSIRAR"
                          label="设计灌溉面积(亩)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ACIRAR"
                          label="实际灌溉面积(亩)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="CNHDDVFL"
                          label="渠首设计引水流量(m³/s)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="CNINGYFL"
                          label="渠首正常年引水流量(m³/s)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="MNCHLEN"
                          label="总干渠长度(km)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ANPP"
                          label="年降水情况(mm)"
                          align="center"
                          >
                        </el-table-column>
                      </el-table>
                    <!-- <Table border :columns="columns1" :data="data" :loading="loading" height="550"></Table> -->
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page
                            :total="list_input.total"
                            :current="list_input.current" show-sizer
                            :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                            @on-change="CurrentChange"
                            @on-page-size-change="PagesizeChange"
                            size="small"
                            show-total
                            show-elevator
                            ></Page>
                        </div>
                    </div>
                </Content>
	</div>
</template>

<script type="text/javascript">
	export default {
        data(){
            return{
                loading:false,
                date:'',
                data:[],
                sygclb:{
                  IARHWPRTP:[],
                  Field:'',
                },
                gqgm:{
                  IRASC:[],
                  Field:'',
                },
                form:{
                   searchmsg:'',
                },
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
                searchs: ''
            }
        },
        mounted(){
            this.Reload();
        },
        methods:{
            //灌区规模筛选
            GQGMsearch(){
              this.Reload();
            },
            //水源工程筛选
            SYGCsearch(){
              this.Reload();
            },
            //未开发功能提示
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            //搜索框方法
            search(){
              if (this.form.searchmsg !== '') {
                this.searchs = '&IRANM='+this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload();
            },
            //自定义列表首列id
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
            //时间选择器
            timechange(date){
                console.log(date);
                this.date = date;
            },
            //获取列表数据
            Reload(){
                this.loading = true;
                this.axios.get('/guanqu/jichuxinxi/guanqu_jiben?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{IARHWPRTP:this.sygclb.Field,IRASC:this.gqgm.Field}}).then((res)=>{
                    // IRANM:this.form.searchmsg
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {


                    }
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=IARHWPRTP').then((res)=>{
                  this.sygclb.IARHWPRTP = res.data.list;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=IRASC').then((res)=>{
                  this.gqgm.IRASC = res.data.list;
                });
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
              this.list_input.current = index;
              this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
              this.list_input.pagesize = pagesize;
              this.Reload();
            },
        },
    }
</script>

<style type="text/css">

</style>
