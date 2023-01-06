<template>
<el-form
        :v-loading="loading"
        ref="sllform"
        :model="form"
        :rules="rules"
        size="mini"
        label-width="110px"
        style="display: flex;flex-wrap: wrap;"
      >
    <el-form-item label="监测站点：" prop="stcd">
          <el-select v-model="form.stcd" filterable placeholder="请选择" style="width:180px" @change="getDamcd">
                <el-option
                v-for="item in stcdlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="断面编号：" prop="damcd">
          <el-select v-model="form.damcd" filterable placeholder="请选择" style="width:180px">
                <el-option
                v-for="item in damcdlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="测点编号：" prop="mpcd">
          <el-input v-model="form.mpcd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="仪器编号：" prop="dvcd">
          <el-input v-model="form.dvcd" placeholder="请输入" style="width:180px;"></el-input>
        </el-form-item>       
        <el-form-item label="经度：" prop="eslg" >
          <el-input v-model="form.eslg" placeholder="请输入" style="width:180px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.eslg=null:form.eslg=parseFloat(value):form.eslg=value}"></el-input>
        </el-form-item>
        <el-form-item label="纬度：" prop="nrlt" >
          <el-input v-model="form.nrlt" placeholder="请输入" style="width:180px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.nrlt=null:form.nrlt=parseFloat(value):form.nrlt=value}"></el-input>
        </el-form-item>
        <el-form-item label="桩号：" prop="ch" >
          <el-input v-model="form.ch" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="轴距：" prop="ofax" >
          <el-select v-model="ofaxfh" placeholder="请选择" style="width:80px">
                <el-option  key="-"  label="上游"  value="-"></el-option>
                <el-option  key="+"  label="下游"  value="+"></el-option>
            </el-select>
          <el-input v-model="form.ofax" placeholder="请输入" style="width:88px"></el-input>m
        </el-form-item>
        <el-form-item label="高程：" prop="el" >
          <el-input v-model="form.el" placeholder="请输入" style="width:168px"></el-input>m
        </el-form-item>
        <el-form-item label="设施名称：" prop="dhname">
          <el-input v-model="form.dhname" placeholder="请输入" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="测量方式：" prop="ltype" >
          <el-select v-model="form.ltype" filterable placeholder="请选择" style="width:180px">
                <el-option
                v-for="item in ltypelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="渗流阈值：" prop="spprwl" >
          <el-input v-model="form.spprwl" placeholder="请输入" style="width:144px"></el-input>L/s
        </el-form-item>
        <el-form-item label="测量最小值：" prop="tdmin" >
          <el-input v-model="form.tdmin" placeholder="请输入" style="width:144px"></el-input>L/s
        </el-form-item> 
        <el-form-item label="安装日期：" prop="indt" >
          <el-date-picker v-model="form.indt" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:180px;"></el-date-picker>
        </el-form-item>                     
        <el-form-item label="安装信息：" prop="setinfo">
            <el-input type="textarea" v-model="form.setinfo" style="width:180px;"></el-input>
        </el-form-item>     
        <el-form-item label="测点备注：" prop="rm">
            <el-input type="textarea" v-model="form.rm" style="width:180px;"></el-input>
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
export default {
  props: {
    info: {},
  },

  data() {
    return {
      loading:false,
      form: {
        id:"",
        sbid:"",
        stcd: "",
        damcd: "",
        mpcd: "",
        ch: "",
        ofax: "",
        el: "",
        indt: "",
        dvcd:"",
        eslg:"",
        nrlt:"",
        rm:"",
        dtuptm:"",
        ltype:"",
        dhname:"",
        setinfo:"",
        tdmin:"",
        spprwl:"",
      },
      routerurl:'/guanqu/manage/addsllinfo',
      stcdlist:[],
      damcdlist:[],
      ltypelist:[],
      ofaxfh:"+",
      rules: {
        stcd: [{ required: true, message: "请选择监测站点",trigger: 'change'}],
        damcd: [{ required: true, message: "断面编号不能为空",trigger: 'blur'},{ min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}],
        mpcd: [{ required: true, message: "测点编号不能为空",trigger: 'blur'},{ min: 6, max: 8, message: '长度在6到8个字符', trigger: 'blur'}],
        ch: [{ required: true, message: "桩号不能为空",trigger: 'blur'},{ min: 1, max: 9, message: '长度在1到9个字符', trigger: 'blur'}],
        ofax: [{ required: true, message: "轴距不能为空",trigger: 'blur'}],  
        dvcd: [{ required: true, message: "仪器编号不能为空",trigger: 'blur'}], 
        dtuptm: [{ required: true, message: "请选择更新时间",trigger: 'change'}],
        ltype: [{ required: true, message: "请选择测量方式",trigger: 'change'}],
        dhname:[{ required: true, message: "设施名称不能为空",trigger: 'blur'}], 
        spprwl:[{ required: true, message: "渗流阈值不能为空",trigger: 'blur'}], 
      },
    };
  },
  // 引入过滤方法到此组件
  mixins: [WarmDataConfig],
  mounted() {  
    this.form.dtuptm=this.getTodayDate();
    this.form.indt=this.form.dtuptm.substring(0,10);
    this.Get_WrpFieldinfo('WRP_SPG_LSY','LTYPE',data => {
         this.ltypelist = data;                
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
        this.routerurl='/guanqu/manage/updatesllinfo';
        this.axios.get('/guanqu/manage/slldetail',{params:{ID:this.info.id,SBID:this.info.sbid}}).then((res)=>{
          this.form=res.data;
          if(this.form.ofax<0){
            this.ofaxfh="-";
            this.form.ofax=-this.form.ofax;
          }else{
            this.ofaxfh="+";
          }
          this.getDamcd(this.form.stcd);
        }); 
      }else{
        this.routerurl='/guanqu/manage/addsllinfo';
      }
    },
    //获取断面编码列表
    getDamcd(stcd){
        //获取断面编码列表
      this.axios.get('/guanqu/list/damcdbystcd',{params:{STCD:stcd}}).then((res)=>{
          this.damcdlist=res.data; 
          this.form.damcd=this.damcdlist[0].value;        
        });
    },
    onSubmit(){
      this.$refs['sllform'].validate((valid) => {
          if (valid) {            
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.mpcd!=this.form.mpcd)){
              this.axios.get('/guanqu/base/checkmpcd',{params:{MPCD:this.form.mpcd,TYPE:1}}).then((res)=>{
                var status=res.data.checksign;
                if(status=="yes"){
                  this.$message.error(res.data.warning);
                }else{
                  this.loading=true;
                  if(this.ofaxfh=="-"){
                      this.form.ofax=-this.form.ofax;
                  }
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
              if(this.ofaxfh=="-"){
                  this.form.ofax=-this.form.ofax;
              }
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
      //this.$refs['sllform'].resetFields();
      //this.form.dtuptim=this.getTodayDate();
    },
  },

  computed: {},

  watch: {}
};
</script>


<style>
</style>