<template>
	<div>
		<Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start" style="display: flex;justify-content: flex-start">

                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入机构名称" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                            <!-- <Button type="primary" @click="err" style="width: auto;margin-right: 20px;">打印</Button> -->
                        </Col>
                    </Row>
                    <!-- <Row type="flex" style="margin: 10px;" :gutter="16" justify="end">
                        <Col>
                        时间:
                            <el-date-picker
                              v-model="form.date"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              size="mini"
                              :clearable="false"
                              @change="timechange">
                            </el-date-picker>
                        </Col>
                    </Row> -->
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
                          prop="Organ_Name"
                          label="机构名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="Male_Employee_Number"
                          label="男职工人数"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="FeMale_Employee_Number"
                          label="女职工人数"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Senior_Number"
                          label="高工人数"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Engineer_Number"
                          label="工程师人数"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Upper_Major"
                          label="大专以上人数"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DSIRAR"
                          label="上级机构"
                          align="center"
                          >
                        </el-table-column>
                        <!-- <el-table-column
                          prop="ACIRAR"
                          label="归属灌区"
                          align="center"
                          width="160"
                          >
                        </el-table-column> -->
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
                searchs: '',
                form:{
                  searchmsg:'',
                },
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
            }
        },
        mounted(){
            this.Reload();
        },
        methods:{
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            search(){
              if (this.form.searchmsg !== '') {
                this.searchs = '&Organ_Name='+this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload();
            },
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
            timechange(date){
                console.log(date);
                this.date = date;
            },
            Reload(){
                this.loading = true;
                this.axios.get('/guanqu/admin/WRP_IrrBSManageInstitution?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {


                    }
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
