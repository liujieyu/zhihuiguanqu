<template>
	<div>
		<Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start">
                        <Col>
                            岗位:
                            <Select v-model="gw.Field" style="width:120px;margin-left: 5px;margin-right: 20px;" @on-change="GWsearch" clearable>
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            性别:
                            <Select v-model="xb.Field" style="width:120px;margin-left: 5px;margin-right: 20px;" @on-change="XBsearch" clearable>
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            职称:
                            <Select v-model="zc.Field" style="width:120px;margin-left: 5px;margin-right: 20px;" @on-change="ZCsearch" clearable>
                                <Option v-for="item in zc.Positional_Title" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            学历:
                            <Select v-model="xl.Field" style="width:120px;margin-left: 5px;margin-right: 20px;" @on-change="XLsearch" clearable>
                                <Option v-for="item in xl.Educastional_Level" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>

                        <Col>
                            <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入姓名" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
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
                          prop="Personal_Name"
                          label="姓名"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="Sex"
                          label="性别"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="Age"
                          label="年龄"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Offical_Rank"
                          label="职务"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Positional_Title"
                          label="职称"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Educastional_Level"
                          label="学历"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Work_Time"
                          label="参加工作时间"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Working_Life"
                          label="工作年限"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="机构"
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
                form:{
                   searchmsg:'',
                },
                gw:{
                  Post_Code:[],
                  Field:'',
                },
                xb:{
                  Sex:[],
                  Field:'',
                },
                zc:{
                  Positional_Title:[],
                  Field:'',
                },
                xl:{
                  Educastional_Level:[],
                  Field:'',
                },
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
                searchs: '',
            }
        },
        mounted(){
            this.GetFilterMethods();
            this.Reload();
        },
        methods:{
            GWsearch(){
              this.Reload();
            },
            XBsearch(){
              this.Reload();
            },
            ZCsearch(){
              this.Reload();
            },
            XLsearch(){
              this.Reload();
            },
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&Personal_Name=like,'+this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload();
            },
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
            Reload(){
                this.loading = true;
                this.axios.get('/guanqu/admin/WRP_IrrBSPerson?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{Post_Code:this.gw.Field,Sex:this.xb.Field,Positional_Title:this.zc.Field,Educastional_Level:this.xl.Field}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {


                    }
                });
            },
            //获取筛选数据
            GetFilterMethods(){
              //获取岗位筛选
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Post_Code').then((res)=>{
                  this.gw.Post_Code = res.data.list;
                });
                //获取性别筛选
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Sex').then((res)=>{
                  this.xb.Sex = res.data.list;
                });
                //获取职称筛选
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Positional_Title').then((res)=>{
                  this.zc.Positional_Title = res.data.list;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Educastional_Level').then((res)=>{
                  this.xl.Educastional_Level = res.data.list;
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
