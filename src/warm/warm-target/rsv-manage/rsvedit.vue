<template>
<el-form
        :v-loading="loading"
        ref="alarmform"
        :model="form"
        :rules="rules"
        size="mini"
        label-width="130px"
        style="display: flex;flex-wrap: wrap;"
      >
    <el-form-item label="监测站点：" prop="stcd">
          <el-select v-model="form.stcd" filterable placeholder="请选择" style="width:180px">
                <el-option
                v-for="item in stcdlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="水库类型：" prop="rsvrtp">
          <el-select v-model="form.rsvrtp" filterable placeholder="请选择" style="width:180px">
                <el-option
                v-for="item in rsvrtplist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="坝顶高程：" prop="damel">
          <el-input v-model="form.damel" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.damel=null:form.damel=parseFloat(value):form.damel=value}"></el-input>m
        </el-form-item>        
        <el-form-item label="校核洪水位：" prop="chfl">
          <el-input v-model="form.chfl" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.chfl=null:form.chfl=parseFloat(value):form.chfl=value}"></el-input>m
        </el-form-item>
        <el-form-item label="4-6月汛限水位：" prop="FWL">
          <el-input v-model="form.FWL" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.FWL=null:form.FWL=parseFloat(value):form.FWL=value}"></el-input>m
        </el-form-item>
        <el-form-item label="7-9月汛限水位：" prop="FWL79">
          <el-input v-model="form.FWL79" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.FWL79=null:form.FWL79=parseFloat(value):form.FWL79=value}"></el-input>m
        </el-form-item>
        <el-form-item label="设计洪水位：" prop="dsfl" >
          <el-input v-model="form.dsfl" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.dsfl=null:form.dsfl=parseFloat(value):form.dsfl=value}"></el-input>m
        </el-form-item>
        <el-form-item label="正常高水位：" prop="normz">
          <el-input v-model="form.normz" placeholder="请输入" style="width:168px;" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.normz=null:form.normz=parseFloat(value):form.normz=value}"></el-input>m
        </el-form-item>   
        <el-form-item label="死水位：" prop="ddwz" >
          <el-input v-model="form.ddwz" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.ddwz=null:form.ddwz=parseFloat(value):form.ddwz=value}"></el-input>m
        </el-form-item>
        <el-form-item label="兴利水位：" prop="actz" >
          <el-input v-model="form.actz" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.actz=null:form.actz=parseFloat(value):form.actz=value}"></el-input>m
        </el-form-item>
        <el-form-item label="历史最高水位：" prop="hhrz" >
          <el-input v-model="form.hhrz" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.hhrz=null:form.hhrz=parseFloat(value):form.hhrz=value}"></el-input>m
        </el-form-item>    
        <el-form-item label="低水位告警：" prop="laz" >
          <el-input v-model="form.laz" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.laz=null:form.laz=parseFloat(value):form.laz=value}"></el-input>m
        </el-form-item> 
        <el-form-item label="总库容：" prop="ttcp" >
          <el-input v-model="form.ttcp" placeholder="请输入" style="width:150px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.ttcp=null:form.ttcp=parseFloat(value):form.ttcp=value}"></el-input>万m³
        </el-form-item> 
        <el-form-item label="防洪库容：" prop="fldcp" >
          <el-input v-model="form.fldcp" placeholder="请输入" style="width:150px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.fldcp=null:form.fldcp=parseFloat(value):form.fldcp=value}"></el-input>万m³
        </el-form-item> 
        <el-form-item label="兴利库容：" prop="actcp" >
          <el-input v-model="form.actcp" placeholder="请输入" style="width:150px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.actcp=null:form.actcp=parseFloat(value):form.actcp=value}"></el-input>万m³
        </el-form-item> 
        <el-form-item label="死库容：" prop="ddcp" >
          <el-input v-model="form.ddcp" placeholder="请输入" style="width:150px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.ddcp=null:form.ddcp=parseFloat(value):form.ddcp=value}"></el-input>万m³
        </el-form-item>        
        <el-form-item label="历史最大库容：" prop="hmxw" >
          <el-input v-model="form.hmxw" placeholder="请输入" style="width:150px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.hmxw=null:form.hmxw=parseFloat(value):form.hmxw=value}"></el-input>万m³
        </el-form-item>
        <el-form-item label="预报流量标准：" prop="sfq" >
          <el-input v-model="form.sfq" placeholder="请输入" style="width:150px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.sfq=null:form.sfq=parseFloat(value):form.sfq=value}"></el-input>m³/s
        </el-form-item>     
        <el-form-item label="创建时间：" prop="moditime" >
          <el-date-picker v-model="form.moditime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
        </el-form-item> 
        <el-form-item label="更新时间：" prop="dtuptm" >
          <el-date-picker v-model="form.dtuptm" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
        </el-form-item>            
        <el-form-item>
            <el-button type="primary" @click="onSubmit" style="margin-right:50px;margin-left:110px;" size="small">保存</el-button>
            <el-button type="info" @click="onCannel" size="small">取消</el-button>
        </el-form-item>
</el-form>
</template>

<script>
import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
import { debug } from 'console';
export default {
  props: {
    info: {},
  },

  data() {
    return {
      loading:false,
      form: {
        id:"",
        alarmid:"",
        stcd: "",
        rsvrtp: "",
        damel: "",
        chfl: "",
        dsfl: "",
        normz:"",       
        ddwz: "",
        actz:"",
        ttcp:"",
        fldcp:"",
        actcp:"",
        ddcp:"",
        hhrz:"",
        hmxw:"",
        laz:"",
        sfq:"",
        moditime:"",
        dtuptm:"",
        FWL:"",
        FWL79:"",
      },
      routerurl:'/guanqu/rsvalarm/addinfo',
      stcdlist:[],
      rsvrtplist:[],
      rules: {
        stcd: [{ required: true, message: "请选择监测站点",trigger: 'change'}],
        rsvrtp: [{ required: true, message: "请选择水库类型",trigger: 'change'}],
        damel: [{ required: true, message: "坝顶高程不能为空",trigger: 'blur'}],
        chfl: [{ required: true, message: "校核洪水位不能为空",trigger: 'blur'}],
        FWL: [{ required: true, message: "4-6月汛限水位不能为空",trigger: 'blur'}],  
        FWL79: [{ required: true, message: "7-9月汛限水位不能为空",trigger: 'blur'}], 
        ddwz:[{ required: true, message: "死水位不能为空",trigger: 'blur'}],
        fldcp: [{ required: true, message: "防洪库容不能为空",trigger: 'blur'}],
        ddcp: [{ required: true, message: "死库容不能为空",trigger: 'blur'}],
        moditime: [{ required: true, message: "请选择创建时间",trigger: 'change'}],
        dtuptm: [{ required: true, message: "请选择更新时间",trigger: 'change'}],     
      },
    };
  },
  // 引入过滤方法到此组件
  mixins: [WarmDataConfig],
  mounted() {  
    this.form.dtuptm=this.getTodayDate();
    this.form.moditime=this.getTodayDate();
    this.Get_WrpFieldinfo('ST_RSVR_R1','LEVEL',data => {
         this.rsvrtplist = data;                
    });
      //监测站点列表
      this.axios.get('/guanqu/base/stcdlist').then((res)=>{
          this.stcdlist=res.data;         
          this.Reload();
      }); 
  },

  methods: {
    //获取今日日期时间
    getTodayDate(){
      var date = new Date();
          var Month = date.getMonth()+1;
          var Hours = date.getHours();
          var Minutes = date.getMinutes();
          var Seconds = date.getSeconds();
          if (Hours<10) {
            Hours = `0${Hours}`
          }
          if (Minutes<10) {
            Minutes = `0${Minutes}`
          }
          if (Seconds<10) {
            Seconds = `0${Seconds}`
          }
          if (Month<10) {
            Month = `0${Month}`
          }
        return `${date.getFullYear()}-${Month}-${date.getDate()} ${Hours}:${Minutes}:${Seconds}`;
    },
    Reload(){  
      if(this.info.editsign=="update"){
        this.routerurl='/guanqu/rsvalarm/updateinfo';
        this.axios.get('/guanqu/rsvalarm/detail',{params:{ID:this.info.id}}).then((res)=>{
          this.form=res.data;
          this.form.dtuptm=this.getTodayDate();
        }); 
      }else{
        this.routerurl='/guanqu/rsvalarm/addinfo';
      }
    },
    onSubmit(){
      this.$refs['alarmform'].validate((valid) => {
          if (valid) {            
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.stcd!=this.form.stcd)){
              this.axios.get('/guanqu/rsvalarm/checkstcd',{params:{stcd:this.form.stcd}}).then((res)=>{
                var status=res.data.checksign;
                if(status=="yes"){
                  this.$message.error(res.data.warning);
                }else{
                  this.loading=true;
                  this.axios.post(this.routerurl,this.form).then((res) => {
                    this.loading=false;
                    this.$emit("closewindows");
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                  });
                }
              });
            }else{
              this.loading=true;
              this.axios.post(this.routerurl,this.form).then((res) => {
                   this.loading=false;
                    this.$emit("closewindows");
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                  });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    onCannel(){
      this.$emit("closewindows");
      //this.$refs['alarmform'].resetFields();
      //this.form.dtuptim=this.getTodayDate();
    },
  },

  computed: {},

  watch: {}
};
</script>


<style>
</style>