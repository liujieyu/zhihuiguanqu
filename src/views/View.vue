<template>
    <div id="view" style="min-width: 960px;;height:100%;">
    <el-scrollbar style="height:100%;" wrap-style="overflow-x:hidden;">
        <div class="layout">
            <Layout>
                <Header>
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <Row type="flex" justify="space-between" align="middle" class="layout-logo">
                            <img src="../assets/logo.png" style="height: 54px; margin-right: 20px;"/>
                            <p>
                                黄材灌区综合信息管理平台
                            </p>
                        </Row>
                        <div class="layout-nav">
                            <MenuItem name="1">
                                <div class="m-message" style="text-align: right;">
                                    <p>
                                        <Icon type="md-partly-sunny" style="font-size: 24px;"/>
                                        15°C-20°C 晴 北风一级
                                    </p>
                                    <p>2019-03-07 15:00</p>
                                </div>
                            </MenuItem>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-person"></Icon>
                                </template>
                                <MenuItem name="2-1" @click.native="userInfoShow = true">个人信息</MenuItem>
                                <MenuItem name="2-2" @click.native="passwordChangeShow = true">密码修改</MenuItem>
                                <MenuItem name="2-3" @click.native="outlogin">注销</MenuItem>
                            </Submenu>
                            <Menu-item name="3">
                                <Icon type="md-settings"/>
                            </Menu-item>
                        </div>
                    </Menu>
                </Header>
                <Content>
                    <Row type="flex" justify="space-around" class="code-row-bg"
                         style="max-width: 1200px;width: 100%;margin: 20px auto;">
                        <i-col>
                            <a class="m-icon" target="_blank" @click="toHomeLink">
                                <Icon type="ios-water"/>
                            </a>
                            <!-- <a class="m-icon" target="_blank" :href="token">
                                <Icon type="ios-water"/>
                            </a> -->
                            <p>量测水</p>
                        </i-col>
                        <i-col>
                            <a class="m-icon" @click="yuliu">
                                <Icon type="ios-analytics" />
                            </a>
                            <p>防汛</p>
                        </i-col>
                        <i-col>
                            <a class="m-icon" @click="yuliu">
                                <Icon type="md-build" />
                            </a>
                            <p>工程管理</p>
                        </i-col>
                        <i-col>
                          <!-- href="http://183.215.1.210:8088/minbingguanqu/login.htm" -->
                            <a class="m-icon"  target="_blank" @click="yuliu">
                                <Icon type="ios-analytics-outline" />
                            </a>
                            <p>农业改革</p>
                        </i-col>
                        <i-col>
                          <!-- href="http://220.168.151.24:4000/disaster-warning/login.htm" -->
                            <a class="m-icon" target="_blank" @click="yuliu">
                                <Icon type="ios-film" />
                            </a>
                            <p>水库视频</p>
                        </i-col>
                        <i-col>
                            <a class="m-icon" @click="yuliu">
                                <Icon type="ios-apps"/>
                            </a>
                            <p>更多微应用</p>
                        </i-col>
                    </Row>
                    <div class="m-content">
                        <Row type="flex" justify="space-between">
                            <Col span="12" style="padding-right: 10px;">
                                <Card dis-hover class="m-card">
                                    <div style="">
                                        <p slot="title">今日雨情图</p>
                                        <div ref="achart" style="height:350px;"></div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12" style="padding-left: 10px;">
                                <Card dis-hover class="m-card" style="">
                                    <div style="width: 560px;">
                                        <p slot="title">今日流量表</p>
                                        <el-table
                                        :data="liuliangData"
                                        border
                                        v-loading="loading"
                                        height="350"
                                        size="mini"
                                        row-style="height:35px"
                                        cell-style="padding:2px"
                                        style="width: 558px;">
                                        <el-table-column
                                        label=" "
                                        type="index"
                                        align="center"
                                        width="65"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                          prop="STNM"
                                          align="center"
                                          label="站名"
                                          width="">
                                        </el-table-column>
                                        <el-table-column
                                          prop="TM"
                                          align="center"
                                          label="时间"
                                          width="140">
                                        </el-table-column>
                                        <el-table-column
                                          prop="Q"
                                          align="center"
                                          label="流量"
                                          width="75">
                                        </el-table-column>
                                        <el-table-column
                                          prop="Z"
                                          align="center"
                                          label="水位"
                                          width="75">
                                        </el-table-column>
                                        <el-table-column
                                          prop="WPTN"
                                          align="center"
                                          label="水势"
                                          width="75">
                                        <template slot-scope="scope">
                                            <span :style="{color: scope.row.WPTN == 4? 'blue' : scope.row.WPTN == 5?'red' : 'black'}">{{scope.row.WPTN==4?'↓':(scope.row.WPTN==5?'↑':'-')}}</span>
                                        </template>
                                        </el-table-column>
                                      </el-table>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between" style="margin-top: 20px;">
                            <Col span="12" style="padding-right: 10px;">
                                <Card dis-hover class="m-card">
                                    <div>
                                        <p slot="title">今日水库表</p>
                                        <el-table
                                        :data="shuikuData"
                                        border
                                        v-loading="loading"
                                        height="350"
                                        size="mini"
                                        row-style="height:35px"
                                        cell-style="padding:2px"
                                        style="width: 558px;">
                                        <el-table-column
                                        label=" "
                                        type="index"
                                        align="center"
                                        width="65"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                          prop="STNM"
                                          align="center"
                                          label="站名"
                                          width="">
                                        </el-table-column>
                                        <el-table-column
                                          prop="tm"
                                          align="center"
                                          label="时间"
                                          width="140">
                                        </el-table-column>
                                        <el-table-column
                                          prop="jxx"
                                          align="center"
                                          label="距汛限"
                                          width="75">
                                        </el-table-column>
                                        <el-table-column
                                          prop="RZ"
                                          align="center"
                                          label="水位"
                                          width="75">
                                        </el-table-column>
                                        <el-table-column
                                          align="center"
                                          label="水势"
                                          width="75">
                                        <template slot-scope="scope">
                                            <span :style="{color: scope.row.RWPTN == 4? 'blue' : scope.row.RWPTN == 5?'red' : 'black'}">{{scope.row.RWPTN==4?'↓':(scope.row.RWPTN==5?'↑':'-')}}</span>
                                        </template>
                                        </el-table-column>
                                      </el-table>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12" style="padding-left: 10px;">
                                <Card dis-hover class="m-card">
                                    <div>
                                    <p slot="title">运行工况表</p>
                                        <el-table
                                        :data="gongkuangData"
                                        border
                                        v-loading="loading"
                                        height="350"
                                        size="mini"
                                        row-style="height:35px"
                                        cell-style="padding:2px"
                                        style="width: 558px;">
                                        <el-table-column
                                        label=" "
                                        type="index"
                                        align="center"
                                        width="65"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                          prop="STNM"
                                          align="center"
                                          label="站名"
                                          width="">
                                        </el-table-column>
                                        <el-table-column
                                          prop="tm"
                                          align="center"
                                          label="时间"
                                          width="140">
                                        </el-table-column>
                                        <el-table-column
                                          prop="vol"
                                          align="center"
                                          label="电压"
                                          width="75">
                                          <template slot-scope="scope">
                                              <span :style="{color: scope.row.vol<scope.row.VOLMIN||scope.row.vol>scope.row.VOLMAX? 'red' : 'black' }">{{scope.row.vol}}</span>
                                          </template>
                                        </el-table-column>
                                        <el-table-column
                                          prop="CS"
                                          align="center"
                                          label="通讯状态"
                                          width="75">
                                          <template slot-scope="scope">
                                              <span :style="{color: scope.row.CS=='正常'? 'black' : 'red' }">{{scope.row.CS}}</span>
                                          </template>
                                        </el-table-column>
                                      </el-table>
                                  </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </div>
        
        <Drawer title="个人信息" placement="left" width="500px" :closable="false" v-model="userInfoShow">
            <Row type="flex" align="middle" class="row-user">
                <Col span="8">
                    姓名：
                </Col>
                <Col>
                    张三
                </Col>
            </Row>
            <Row type="flex" align="middle" class="row-user">
                <Col span="8">
                    性别：
                </Col>
                <Col>
                    男
                </Col>
            </Row>
            <Row type="flex" align="middle" class="row-user">
                <Col span="8">
                    年龄：
                </Col>
                <Col>
                    28
                </Col>
            </Row>
            <Row type="flex" align="middle" class="row-user">
                <Col span="8">
                    手机号码：
                </Col>
                <Col>
                    18088888888
                </Col>
            </Row>
            <Row type="flex" align="middle" class="row-user">
                <Col span="8">
                    部门：
                </Col>
                <Col>
                    技术部
                </Col>
            </Row>
            <Row type="flex" align="middle" class="row-user">
                <Col span="8">
                    职务：
                </Col>
                <Col>
                    检测员
                </Col>
            </Row>
        </Drawer>

        <Drawer title="密码修改" placement="left" width="500px" :closable="false" v-model="passwordChangeShow">
            <Row type="flex" align="middle" class="row-pwd">
                <Col span="4">
                    旧密码：
                </Col>
                <Col span="12">
                    <Input type="password" v-model="password" placeholder=""/>
                </Col>
            </Row>
            <Row type="flex" align="middle" class="row-pwd">
                <Col span="4">
                    新密码：
                </Col>
                <Col span="12">
                    <Input type="password" v-model="nPassword" placeholder=""/>
                </Col>
            </Row>
            <Row type="flex" align="middle" class="row-pwd">
                <Col span="4">
                    确认密码：
                </Col>
                <Col span="12">
                    <Input type="password" v-model="n2Password" placeholder=""/>
                </Col>
            </Row>
            <Row type="flex" class="row-pwd">
                <Col span="4">
                </Col>
                <Col span="12">
                    <Button type="primary">确认</Button>
                </Col>
            </Row>
        </Drawer>

        <Footer class="layout-footer-center">2019 &copy; 湖南智慧灌区综合信息管理平台 版权所有</Footer>
    </el-scrollbar>
    </div>
</template>

<script>
    export default {
        // name: "View",
        data() {
            return {
                userInfoShow: false,
                passwordChangeShow: false,

                password: '',
                nPassword: '',
                n2Password: '',

                columns1: [
                    {
                        title: '序号',
                        key: 'id',
                        width: 60,
                    },
                    {
                        title: '站名',
                        key: 'name',
                        width: 60,
                    },
                    {
                        title: '时间',
                        key: 'date'
                    },
                    {
                        title: '流量(m³/s)',
                        key: 'liu'
                    },
                    {
                        title: '水位(m)',
                        key: 'wei',
                        width: 80,
                    },
                    {
                        title: '水势',
                        key: 'shi',
                        width: 60,
                    },
                    {
                        title: '管区渠道',
                        key: 'qu'
                    },
                ],
                data1: [
                    {
                        id: '1',
                        name: 'A站',
                        date: '2016-10-03',
                        liu: '10',
                        wei: '8',
                        age: 18,
                        qu: '北总干渠',
                    },
                    {
                        id: '2',
                        name: 'B站',
                        date: '2016-10-03',
                        liu: '10',
                        wei: '8',
                        age: 18,
                        qu: '北总干渠',
                    },
                    {
                        id: '3',
                        name: 'C站',
                        date: '2016-10-03',
                        liu: '10',
                        wei: '8',
                        age: 18,
                        qu: '北总干渠',
                    },
                    {
                        id: '4',
                        name: 'D站',
                        date: '2016-10-03',
                        liu: '10',
                        wei: '8',
                        age: 18,
                        qu: '北总干渠',
                    },
                    {
                        id: '5',
                        name: 'E站',
                        date: '2016-10-03',
                        liu: '10',
                        wei: '8',
                        age: 18,
                        qu: '北总干渠',
                    },
                    {
                        id: '6',
                        name: 'F站',
                        date: '2016-10-03',
                        liu: '10',
                        wei: '8',
                        age: 18,
                        qu: '北总干渠',
                    },
                    {
                        id: '7',
                        name: 'G站',
                        date: '2016-10-03',
                        liu: '10',
                        wei: '8',
                        age: 18,
                        qu: '北总干渠',
                    },
                    {
                        id: '8',
                        name: 'H站',
                        date: '2016-10-03',
                        liu: '10',
                        wei: '8',
                        age: 18,
                        qu: '北总干渠',
                    },
                ],

                columns2: [
                    {
                        title: '序号',
                        key: 'id',
                        width: 60,
                    },
                    {
                        title: '站名',
                        key: 'name',
                        width: 60,
                    },
                    {
                        title: '时间',
                        key: 'date'
                    },
                    {
                        title: '流量(m³/s)',
                        key: 'liu'
                    },
                    {
                        title: '闸阀前水位(m)',
                        key: 'qwei',
                    },
                    {
                        title: '闸阀前水势',
                        key: 'qshi',
                    },
                    {
                        title: '闸阀后水位(m)',
                        key: 'hwei',
                    },
                    {
                        title: '闸阀后水势',
                        key: 'hshi',
                    },
                    {
                        title: '管区渠道',
                        key: 'qu'
                    },
                ],
                data2: [
                    {
                        id: '1',
                        name: 'A站',
                        date: '2016-10-03',
                        liu: '10',
                        qwei: '8',
                        qshi:'',
                        hwei: '5',
                        hshi:'',
                        qu: '北总干渠',
                    },
                    {
                        id: '2',
                        name: 'B站',
                        date: '2016-10-03',
                        liu: '10',
                        qwei: '8',
                        qshi:'',
                        hwei: '5',
                        hshi:'',
                        qu: '北总干渠',
                    },
                    {
                        id: '3',
                        name: 'C站',
                        date: '2016-10-03',
                        liu: '10',
                        qwei: '8',
                        qshi:'',
                        hwei: '5',
                        hshi:'',
                        qu: '北总干渠',
                    },
                    {
                        id: '4',
                        name: 'D站',
                        date: '2016-10-03',
                        liu: '10',
                        qwei: '8',
                        qshi:'',
                        hwei: '5',
                        hshi:'',
                        qu: '北总干渠',
                    },
                    {
                        id: '5',
                        name: 'E站',
                        date: '2016-10-03',
                        liu: '10',
                        qwei: '8',
                        qshi:'',
                        hwei: '5',
                        hshi:'',
                        qu: '北总干渠',
                    },
                    {
                        id: '6',
                        name: 'F站',
                        date: '2016-10-03',
                        liu: '10',
                        qwei: '8',
                        qshi:'',
                        hwei: '5',
                        hshi:'',
                        qu: '北总干渠',
                    },
                    {
                        id: '7',
                        name: 'G站',
                        date: '2016-10-03',
                        liu: '10',
                        qwei: '8',
                        qshi:'',
                        hwei: '5',
                        hshi:'',
                        qu: '北总干渠',
                    },
                    {
                        id: '8',
                        name: 'H站',
                        date: '2016-10-03',
                        liu: '10',
                        qwei: '8',
                        qshi:'',
                        hwei: '5',
                        hshi:'',
                        qu: '北总干渠',
                    },
                ],

                
                form:{
                    starttime:'',
                    overtime:'',
                    STNM:[],
                    P:[],
                },
                yuqinglist:[],
                liuliangData:[],
                shuikuData:[],
                gongkuangData:[],
                loading:false,
                token:null,
            }
        },
        mounted(){
            var username=this.Cook.get("username");
            if(username==null || username==''){
                this.$router.push({path: '/login'});
                return;
            }
            this.getinittime();
            this.Load();
            this.token = 'http://localhost:8080';
        },
        methods: {
            toHomeLink(){
                this.$router.push({path: '/home'});
            },
            yuliu(){
              this.$message('预留接口');
            },
            outlogin(){
              this.axios.delete('/guanqu/web/user/logout').then((res)=>{
                console.log(res);
                this.Cook.set("username",null);
                this.$router.push({path: '/login'});
              });
            },
            Load(){
                this.loading = true;
                this.axios.post('/guanqu/yuqing/gis',{Time_min:this.form.starttime,Time_max:this.form.overtime}).then((res)=>{
                    this.yuqinglist = res.data.features;
                    for (var i = 0;i<this.yuqinglist.length ; i++) {
                        if (this.yuqinglist[i].rowinfo.p==null) {
                            this.yuqinglist[i].rowinfo.p = 0;
                        }
                        this.form.STNM.push(this.yuqinglist[i].rowinfo.STNM);
                        this.form.P.push(this.yuqinglist[i].rowinfo.p);
                    }
                    console.log(this.form.STNM,this.form.P);
                    this.drawchart();
                });
                this.axios.get('/guanqu/qudaoshuiqing/gis').then((res)=>{
                    var tableData = new Array();
                    res.data.features.forEach((val, index, array) => {
                        if (val.rowinfo.Q==0.000) {
                            val.rowinfo.Q='';
                        }
                        if (val.rowinfo.Z==0.000) {
                            val.rowinfo.Z='';
                        }else{
                            val.rowinfo.Z = this.Z_Filter(val.rowinfo.Z);
                        }
                        tableData.push(val.rowinfo);
                    });
                    this.liuliangData = tableData;
                    this.loading = false;
                });
                this.axios.get('/guanqu/shuikushuiqing/gis').then((res)=>{
                    var tableData = new Array();
                    res.data.features.forEach((val, index, array) => {
                        if (val.rowinfo.RZ==0.000) {
                            val.rowinfo.RZ='';
                        }else{
                            val.rowinfo.RZ = this.Z_Filter(val.rowinfo.RZ);
                        }
                        tableData.push(val.rowinfo);
                    });
                    this.shuikuData = tableData;
                    this.loading = false;
                    // console.log(tableData);
                });
                this.axios.get('/guanqu/gongkuang/gis').then((res)=>{
                    var tableData = new Array();
                    res.data.features.forEach((val, index, array) => {
                        if (val.rowinfo.vol==0.00) {
                            val.rowinfo.vol='';
                        }else{
                            val.rowinfo.vol = this.Z_Filter(val.rowinfo.vol,1);
                        }
                        tableData.push(val.rowinfo);
                    });
                    this.gongkuangData = tableData;
                    // console.log(tableData);
                    this.loading = false;
                });
            },
            // 水位过滤器
            Z_Filter(Z, figure) {
                if (Z) {
                    var Z = parseFloat(Z);

                    if (Z !== 0) {
                        return Z.toFixed(figure || 2);
                    }
                    return '';
                } else {
                    return ''
                }

            },
            //绘画Echart图
            drawchart() {
              var achart = this.$echarts.init(this.$refs.achart);
              console.log(achart);
              achart.resize();
              achart.setOption({
                title: { text: "" },
                tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},

                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    legend: {
                        data:['雨量',]
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.form.STNM,
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name : '雨量',
                            axisLabel : {
                                formatter: '{value} mm'
                            },

                        },
                    ],
                    series : [

                        {
                            name:'雨量',
                            type:'bar',
                            data:this.form.P,
                            barWidth:20,
                        },
                    ],
                    itemStyle: {
                        color: '#2d8cf0',
                    }
              });
            },
            //获取默认时间
            getinittime(){
              var date = new Date();
              var YR = date.getFullYear();
              var MON = date.getMonth()+1
              var datearray = new Array();
              if (parseInt(MON)<10) {
                MON = `0${MON}`;
              }
              var Day = date.getDate();
              if (parseInt(Day)<10) {
                Day = `0${Day}`;
              }
              var Hour = date.getHours();
              if (parseInt(Hour)<10) {
                Hour = `0${Hour}`;
              }
              if (date.getHours()<8) {
                 //昨天的时间
                var day1 = new Date();
                day1.setTime(day1.getTime()-24*60*60*1000);
                day1.setHours(8);
                day1.setMinutes(0);
                day1.setSeconds(0);
                var Hour2 = day1.getHours();
                var MON2 = day1.getMonth()+1;
                var DAY2 = day1.getDate();
                if (parseInt(Hour2)<10) {
                  Hour2 = `0${Hour2}`;
                }
                if (parseInt(MON2)<10) {
                  MON2 = `0${MON2}`;
                }
                if (parseInt(DAY2)<10) {
                  DAY2 = `0${DAY2}`;
                }
                var s1 = `${day1.getFullYear()}-${MON2}-${DAY2} ${Hour2}:00:00`
                datearray[0] = s1;
                datearray[1] = `${YR}-${MON}-${Day} ${date.getHours()}:00:00`;
                console.log('time1',s1,'time2',datearray[1]);
              }else{
                datearray[0] = `${YR}-${MON}-${Day} 08:00:00`;
                datearray[1] = `${YR}-${MON}-${Day} ${Hour}:00:00`;
              }
              this.form.starttime = datearray[0];
              this.form.overtime = datearray[1];
            },
            routerLink() {
                this.$router.push({path: '/main'});
            },
            drawLine() {
                //基于准本好的DOM，初始化echarts实例
                let chartmainbar = this.$echarts.init(document.getElementById("chartmainbar"));
                //绘制图表
                chartmainbar.setOption(this.option1);
                //点击事件
                chartmainbar.on('click', function (params) {
                    console.log(params);
                });
            },
        }
    }
</script>

<style scoped>

    .ivu-layout-header {
        background: #409EFF;
        padding: 0 20px;
        height: 64px;
        line-height: 64px;
    }

    .ivu-menu-dark {
        background: #409EFF;
    }

    .ivu-icon {
        color: #fff;
        font-size: 34px;
    }

    .ivu-menu-horizontal {
        line-height: 64px;
    }

    .layout {
        background: #f5f7f9;
        position: relative;
        /*border-radius: 4px;*/
        overflow: hidden;
        width: 100%;
        padding-bottom: 40px;
    }

    .layout-logo {
        float: left;
        color: #fff;
        font-size: 24px;
        margin-left: 25px;
    }

    .layout-nav {
        margin: 0 auto;
        float: right;
        color: #fff;
    }

    .m-message {
        line-height: 26px;
        margin-top: 8px;
    }

    .layout-footer-center {
        text-align: center;
        background-color: #fff;
    }

    .m-icon .ivu-icon {
        color: #409EFF;
        font-size: 54px;
        border: 1px solid #ececec;
        border-radius: 5px;
        background-color: #fff;
        padding: 5px;
        margin-bottom: 10px;
    }

    .m-icon .ivu-icon:hover {
        box-shadow: 0 1px 20px rgba(74, 74, 74, 0.1);
        border: 1px solid #fff;
    }

    .code-row-bg .ivu-col {
        text-align: center;
        font-size: 18px;
    }

    .m-content {
        max-width: 1200px;
        min-width: 920px;
        margin: auto;
    }

    @media ( max-width: 1240px ) {
        .m-content {
            margin: 0 20px;
        }
    }

    @media ( min-width: 1920px ) {
        .m-content {
            max-width: 1600px;
            width: calc( 100vw - 720px );
        }
    }

    .m-card {
        min-height: 390px;
    }

    @media ( max-width: 1240px ) {
        .m-card {
            height: calc(((100vw - 40px) / 2 - 10px) * 36 / 59);
            min-height: calc(450px * 36 / 59);
        }
    }

    @media ( min-width: 1920px ) {
        .m-card {
            height: calc((100vw - 720px) / 2 * 36 / 59);
            max-height: calc((1600px / 2 - 10px) * 36 / 59);
        }
    }

    .row-user {
        margin-top: 10px;
        margin-left: 120px;
        font-size: 16px;
    }

    .row-pwd {
        margin-top: 20px;
        margin-left: 40px;
    }
</style>


