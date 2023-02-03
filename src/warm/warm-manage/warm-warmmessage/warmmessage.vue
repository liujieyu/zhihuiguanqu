<template>
	<div>
		<Content>
            <div ref="first">
            <Card class="cardcss">
                <p slot="title">预警短信信息输入</p>
            <el-form ref="form" :model="form" label-width="100px" size="small">
                <el-form-item label="发送平台：">
                    <RadioGroup v-model="form.plan">
                        <Radio v-for="item in planlist" :label="item.value" size="large" name="plans">{{item.label}}</Radio>
                    </RadioGroup>
                </el-form-item>
                <el-form-item label="预警等级：">
                    <Select v-model="form.yjdj"  style="width:200px;" clearable>
                        <Option v-for="item in yjdjlist" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </el-form-item>
                <el-form-item label="短信内容：">
                    <Input type="textarea" v-model="form.content" :rows="4" :value="form.content" clearable style="width:98%" />
                    <div style="color:red;font-size:11px;">(短信内容不超过70个汉字)</div>
                </el-form-item>
            </el-form>
            <Footer class="footer">
            <Button  type="primary" @click="nextstep(2)" icon="md-arrow-round-down" size="large">下一步</Button>
            <Button  @click="clearOne" style="margin-left:20px;" icon="md-trash" size="large">清空</Button>
            </Footer>
            </Card>
            </div>
            <div ref="second" style="display:none;">
                <Card class="cardcss">
                <p slot="title">发送对象选择</p>
                    <el-table
                        :data="form.allinfo"
                        border
                        style="width: 100%"
                        >
                        <el-table-column label="人员类型" align="left" width="160" >
                          <template slot-scope="scope">
                          <Checkbox :label="scope.row.type"  :name="scope.row.type" size="large" @on-change="checkone(scope.row.type,$event)">{{scope.row.title}}</Checkbox>
                           </template>
                        </el-table-column>
                        <el-table-column
                          prop="manname"
                          label="已选择人员"
                          align="center"
                          min-width="200">
                        </el-table-column>
                      </el-table>
                    <Footer class="footer">
                    <Button  type="primary" @click="prestep(1)" icon="md-arrow-round-up" size="large">上一步</Button>
                    <Button  type="primary" @click="nextstep(3)" style="margin-left:20px;" icon="md-arrow-round-down" size="large">下一步</Button>
                    <Button  @click="clearTwo" style="margin-left:20px;" icon="md-trash" size="large">清空</Button>
                    </Footer>
               </Card>
            </div>
            <div ref="third" style="display:none;">
              <Card class="cardcss">
                <p slot="title">预警短信信息核对</p>
                <table style="border: 1px solid #C7CCD6" cellspacing="0" width="100%" class="warm_detail">
                <tr>
                  <td align="right" class="dt_name">发送平台：</td>
                  <td align="left" class="dt_vale" style="padding-left:10px;">{{ form.planname || "&nbsp;" }}</td>
                </tr>
                <tr>
                    <td align="right" class="dt_name" >预警等级：</td>
                  <td align="left" class="dt_vale" style="padding-left:10px;">{{form.yjdjname|| "&nbsp;"}}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">预警内容：</td>
                  <td align="left" class="dt_vale" style="padding-left:10px;border-bottom:0px;">{{ form.content || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name" style="border-bottom:0px;">发送对象：</td>
                  <td align="left" class="dt_vale" style="border-bottom:0px;">
                      <table cellspacing="0" style="width:100%;">
                          <tr v-for="item in form.allinfo" v-if="item.count>0">
                              <td style="width:150px;border-top: 1px solid #C7CCD6;border-right: 1px solid #C7CCD6;padding-left:10px;">
                                  <Badge :count="item.count">
                                    <Avatar shape="square" icon="ios-person" />
                                </Badge>
                                <div style="display:block-inline;float:right;">
                               {{item.title}}：
                               </div>
                              </td>
                              <td style="border-top: 1px solid #C7CCD6;padding:10px 5px 5px 10px;">
                                  {{item.manname}}
                              </td>
                          </tr>
                      </table>
                  </td>
                </tr>
              </table>
                <Footer class="footer">
                    <Button type="primary" @click="prestep(2)" icon="md-arrow-round-up" size="large">上一步</Button>
                    <Button type="primary" @click="onSubmit" style="margin-left:20px;" icon="md-cloud-upload" size="large">发送</Button>
                </Footer>
              </Card>
            </div>
        </Content>
    </div>
</template>
<script type="text/javascript">
        import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
	export default {
        props: {
            maninfo: {}
        },
        data(){
            return{
                social:[],
                planlist:[],
                typelist:[],
                yjdjlist:[],
                mancount:0,
                form:{
                    plan:'',
                    planname:'',
                    phone:'',
                    name:'',
                    content:'',
                    yjdj:'',
                    yjdjname:'',
                    allinfo:[]
                },
            }
        },
        // 引入过滤方法到此组件
        mixins: [WarmDataConfig],
        mounted(){
            this.Reload();
        },
        methods:{
            Reload(){
                //发送平台
                this.Get_SysForminfo('DXFS20190921',1,data => {
                    this.planlist = data;
                    this.form.plan=data[0].value;
                });
                //预警等级
                this.Get_SysFieldinfo('YJDXFB20190926',1,data => {
                    this.yjdjlist = data;
                });
               // this.Get_WrpFieldinfo('ST_AlarmInfo','Alarm',data => {
               //     this.yjdjlist = data;
                //});
                //发送对象
                this.Get_WrpFieldinfo('WRP_MAN','TYPES',data => {
                    var typelist = data;
                    this.tabledata=new Array();
                    this.form.allinfo=new Array();
                    for(var i=0;i<typelist.length;i++){
                        var info=new Object();
                        info.type=typelist[i].value;
                        info.title=typelist[i].label;
                        info.manname="";
                        info.count=0;
                        info.itype="fasongrenyuan";
                        info.list=new Array();
                        this.form.allinfo.push(info);
                    }
                });
            },
            //选择人员
            checkone(val,event){
                if(event){
                    for(var i=0;i<this.form.allinfo.length;i++){
                        if(val==this.form.allinfo[i].type){
                            this.$emit('showdailog', this.form.allinfo[i]);
                        }
                    }
                }else{
                    for(var i=0;i<this.form.allinfo.length;i++){
                        if(val==this.form.allinfo[i].type){
                            this.form.allinfo[i].manname="";
                            this.form.allinfo[i].count=0;
                            this.form.allinfo[i].list=new Array();
                            break;
                        }
                    }
                }
            },
           //设置手机号码
           showphone(dataobj){              
               for(var i=0;i<this.form.allinfo.length;i++){
                        if(dataobj.type==this.form.allinfo[i].type){
                            this.form.allinfo[i].list=dataobj.list;
                            this.form.allinfo[i].count=dataobj.list.length;
                            var names="";
                            for(var t=0;t<this.form.allinfo[i].list.length;t++){
                                names+=this.form.allinfo[i].list[t].NM+"，";
                            }
                            this.form.allinfo[i].manname=names.substr(0,names.length-1);
                            break;
                        }
                    }
                
                
           },
           //取消复选框选中
           cancelcheck(val){
               document.getElementsByName(val)[0].click();
           },
           onSubmit(){
            var appid="预警短信 "+this.form.yjdjname;
            var sender=this.form.planname;
            var tablename=this.form.plan;
            var content=this.form.content;

            var count=0;
            for(var i=0;i<this.form.allinfo.length;i++){
                    if(this.form.allinfo[i].list.length>0){
                        for(var t=0;t<this.form.allinfo[i].list.length;t++){
                            var receiver=this.form.allinfo[i].list[t].MOBILE;
                            var addtion1=this.form.allinfo[i].list[t].NM;
                            var addtion2=this.form.allinfo[i].list[t].UNIT;
                            var addtion3=this.form.allinfo[i].list[t].ZW;                        
                            let postData=new Object();
                            postData["appid"]=appid;
                            postData["sender"]=sender;
                            postData["tablename"]=tablename;
                            postData["receiver"]=receiver;
                            postData["addtion1"]=addtion1;
                            postData["addtion2"]=addtion2;
                            postData["addtion3"]=addtion3;
                            postData["content"]=content;
                            this.axios.post('/alarm/addmessage',postData).then((res)=>{
                                if(res.data=="ok"){
                                    count+=1;
                                }                   
                            }); 
                        }
                    }
                }
              var successtime=  setInterval(() => {
                    if(this.mancount==count){
                        this.$message({message:'预警短信发送成功！',type:'success'});
                        clearInterval(successtime);
                        this.clearOne();
                        this.clearTwo();
                        this.$refs['first'].style.display="";
                        this.$refs['third'].style.display="none";
                    }
                }, 500);
           }, 
           clearOne(){
               this.form.plan=this.planlist[0].value;
               this.form.yjdj="";
               this.form.content="";
           },
           clearTwo(){
               for(var i=0;i<this.form.allinfo.length;i++){
                   var box=document.getElementsByName(this.form.allinfo[i].type);
                   if (box[0].checked==true) {
                      box[0].click();
                   }
               }
           },
           nextstep(step){
               //第一步验证
               if(step==2){
                   if(typeof(this.form.yjdj)=="undefined" || this.form.yjdj==""){
                       this.$message({message:'请选择预警等级！',type:'warning'});
                       return;
                   }
                   var str=this.form.content;
                    if(str.replace(" ","")==""){
                        this.$message({message:'请输入短信内容！',type:'warning'});
                        return;
                    }
                    if(this.strlen(str)>=140){
                        this.$message({message:'短信内容不能超过70个汉字！',type:'warning'});
                        return;
                    }
                    //发送平台名称
                    for(var t=0;t<this.planlist.length;t++){
                        if(this.form.plan==this.planlist[t].value){
                            this.form.planname=this.planlist[t].label;
                            break;
                        }
                    }
                    //预警等级名称
                    for(var t=0;t<this.yjdjlist.length;t++){
                        if(this.form.yjdj==this.yjdjlist[t]){
                            this.form.yjdjname=this.yjdjlist[t];
                            break;
                        }
                    }
                    this.$refs['first'].style.display="none";
                    this.$refs['second'].style.display="";
               }//第二步验证
               else{
                   this.mancount=0;
                   for(var i=0;i<this.form.allinfo.length;i++){
                      this.mancount+=this.form.allinfo[i].list.length;
                   }
                   if(this.mancount==0){
                       this.$message({message:'请选择发送对象！',type:'warning'});
                        return;
                   }
                   this.$refs['second'].style.display="none";
                   this.$refs['third'].style.display="";
               }
           },
           prestep(step){
               if(step==1){
                  this.$refs['first'].style.display="";
                  this.$refs['second'].style.display="none"; 
               }else if(step==2){
                  this.$refs['second'].style.display="";
                  this.$refs['third'].style.display="none";
               }
           }
        }
    }
</script>
<style lang="less" scope>
@import "../../../components/Details/common/common.less";
.cardcss{
    width:90%;
    margin-left:16px;
}
.footer{
background:#fff;
text-align:center;
}
.warm_detail {
  td {
    height: 45px;
    border-top: none;
    border-color: #C7CCD6;
  }

  .dt_name {
    width: 18px;
    border-right: #C7CCD6 1px solid;
    border-bottom: #C7CCD6 1px solid;
  }

  .dt_vale {
    width: 82%;
    border-bottom: #C7CCD6 1px solid;
  }
}
.nav {
    height: 50px;
    border-top: #C7CCD6 1px solid;
}
 
.nav ul {
    list-style: none;
}
 
.nav li {
    display: inline;
    line-height: 40px;
    float:left;
    padding-left: 10px;
    padding-top: 10px;
}

</style>