<template>
	<div>
		<Content>
            <Card class="cardcss">
            <p slot="title">短信信息输入</p>
            <el-form ref="form" :model="form" label-width="100px" size="small">
                <el-form-item label="发送平台：">
                    <RadioGroup v-model="form.plan">
                        <Radio v-for="item in planlist" :label="item.value" size="large" name="plans">{{item.label}}</Radio>
                    </RadioGroup>
                </el-form-item>
                <el-form-item label="人员类型：">
                    <Checkbox v-for="item in typelist" :label="item.value"  :name="item.value" size="large" @on-change="checkone(item.value,$event)">{{item.label}}</Checkbox>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <Input v-model="form.phone" :value="form.phone" clearable style="width:98%"/>
                    <div style="color:red;font-size:11px;">(手机号码之间请用英文标点“,”隔开)</div>
                </el-form-item>
                <el-form-item label="短信内容：">
                    <Input type="textarea" v-model="form.content" :rows="4" :value="form.content" clearable style="width:98%" />
                    <div style="color:red;font-size:11px;">(短信内容不超过70个汉字)</div>
                </el-form-item>
            </el-form>
            <Footer class="footer">
            <Button  type="primary" @click="onSubmit" icon="md-cloud-upload" size="large">发送</Button>
            <Button  @click="onClear" style="margin-left:20px;" icon="md-trash" size="large">清空</Button>
            </Footer>
            </Card>
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
                form:{
                    plan:'',
                    phone:'',
                    name:'',
                    content:'',
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
                this.Get_SysForminfo('DXFS20190921',1,data => {
                    this.planlist = data;
                    this.form.plan=data[0].value;
                });
                this.Get_WrpFieldinfo('WRP_MAN','TYPES',data => {
                    this.typelist = data;
                    this.form.allinfo=new Array();
                    for(var i=0;i<this.typelist.length;i++){
                        var info=new Object();
                        info.type=this.typelist[i].value;
                        info.title=this.typelist[i].label;
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
                    var typephone="";
                    this.form.phone+=",";
                    for(var i=0;i<this.form.allinfo.length;i++){
                        if(val==this.form.allinfo[i].type){

                            for(var t=0;t<this.form.allinfo[i].list.length;t++){
                                typephone+=this.form.allinfo[i].list[t].MOBILE+","; 
                                 this.form.phone=this.form.phone.replace(this.form.allinfo[i].list[t].MOBILE+",","");                         
                            }
                            this.form.allinfo[i].list=new Array();
                            break;
                        }
                    }
                    this.form.phone=this.form.phone.substr(0,this.form.phone.length-1);
                }
            },
           //设置手机号码
           showphone(dataobj){
               var phonestr="";
               for(var i=0;i<this.form.allinfo.length;i++){
                        if(dataobj.type==this.form.allinfo[i].type){
                            this.form.allinfo[i].list=dataobj.list;
                            for(var t=0;t<this.form.allinfo[i].list.length;t++){
                                phonestr+=this.form.allinfo[i].list[t].MOBILE+",";
                            }
                            break;
                        }
                    }
                if(phonestr!=""){
                    if(this.form.phone==""){
                        this.form.phone+=phonestr.substr(0,phonestr.length-1);
                    }else{
                        this.form.phone+=","+phonestr.substr(0,phonestr.length-1); 
                    }
                }
                
                
           },
           //取消复选框选中
           cancelcheck(val){
               document.getElementsByName(val)[0].click();
           },
           onSubmit(){
            if(this.form.phone==""){
                this.$message({message:'请选择要发送短信的人员或输入手机号码！',type:'warning'});
                return;
            }
            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            var phones=this.form.phone.split(",");
            for(var h=0;h<phones.length;h++){
                if(!(myreg.test(phones[h]))){ 
                    this.$message({message:'手机号码 “'+phones[h]+'” 异常！',type:'warning'});  
                    return; 
                }
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
            var appid="普通短信";
            var sender="";
            var tablename=this.form.plan;
            for(var t=0;t<this.planlist.length;t++){
                if(this.form.plan==this.planlist[t].value){
                    sender=this.planlist[t].label;
                    break;
                }
            }
            var content=this.form.content;

            var sendlen=phones.length;
            var count=0;
            for(var s=0;s<sendlen;s++){
                var sign=0;
                for(var i=0;i<this.form.allinfo.length;i++){
                    if(this.form.allinfo[i].list.length>0){
                        for(var t=0;t<this.form.allinfo[i].list.length;t++){
                            var receiver=this.form.allinfo[i].list[t].MOBILE;
                            var addtion1=this.form.allinfo[i].list[t].NM;
                            var addtion2=this.form.allinfo[i].list[t].UNIT;
                            var addtion3=this.form.allinfo[i].list[t].ZW; 
                         if(phones[s]==receiver){
                            sign=1;                       
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
                }
                if(sign==0){
                    let postData=new Object();
                            postData["appid"]=appid;
                            postData["sender"]=sender;
                            postData["tablename"]=tablename;
                            postData["receiver"]=phones[s];
                            postData["addtion1"]="";
                            postData["addtion2"]="";
                            postData["addtion3"]="";
                            postData["content"]=content;
                            this.axios.post('/alarm/addmessage',postData).then((res)=>{
                                if(res.data=="ok"){
                                    count+=1;
                                }                   
                            });
                }
            }
              var successtime=  setInterval(() => {
                    if(sendlen==count){
                        this.$message({message:'短信发送成功！',type:'success'});
                        clearInterval(successtime);
                        this.onClear();
                    }
                }, 500);
           },
           onClear(){
               this.form.plan=this.planlist[0].value;
               for(var i=0;i<this.form.allinfo.length;i++){
                   var box=document.getElementsByName(this.form.allinfo[i].type);
                   if (box[0].checked==true) {
                      box[0].click();
                   }
               }
                this.form.phone="";
                this.form.content="";
           } 
        }
    }
</script>
<style lang="less" scope>
.cardcss{
    width:90%;
    margin-left:16px;
}
.footer{
background:#fff;
text-align:center;
}
</style>
