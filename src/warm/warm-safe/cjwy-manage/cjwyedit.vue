<template>
<el-form
        :v-loading="loading"
        ref="slylform"
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
        <el-form-item label="仪器编号：" prop="dvcd" >
          <el-input v-model="form.dvcd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>       
        <el-form-item label="桩号：" prop="ch" >
          <el-input v-model="form.ch" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="轴距：" prop="ofax" >
          <el-input v-model="form.ofax" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.ofax=null:form.ofax=parseFloat(value):form.ofax=value}"></el-input>m
        </el-form-item>
        <el-form-item label="初始高程：" prop="inel" >
          <el-input v-model="form.inel" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.inel=null:form.inel=parseFloat(value):form.inel=value}"></el-input>m
        </el-form-item>
        <el-form-item label="位移阈值：" prop="vrds">
          <el-input v-model="form.vrds" placeholder="请输入" style="width:156px;" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.vrds=null:form.vrds=parseFloat(value):form.vrds=value}"></el-input>mm
        </el-form-item>   
        <el-form-item label="经度：" prop="eslg" >
          <el-input v-model="form.eslg" placeholder="请输入" style="width:180px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.eslg=null:form.eslg=parseFloat(value):form.eslg=value}"></el-input>
        </el-form-item>
        <el-form-item label="纬度：" prop="nrlt" >
          <el-input v-model="form.nrlt" placeholder="请输入" style="width:180px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.nrlt=null:form.nrlt=parseFloat(value):form.nrlt=value}"></el-input>
        </el-form-item>     
        <el-form-item label="型式：" prop="tp" >
          <el-select v-model="form.tp" filterable allow-create placeholder="请输入或选择" style="width:180px" @blur="tpblur">
                <el-option label="综合标" value="综合标"></el-option>
                <el-option label="混凝土嵌心标" value="混凝土嵌心标"></el-option>
                <el-option label="墙上标" value="墙上标"></el-option>
                <el-option label="钢管标" value="钢管标"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="安装日期：" prop="indt" >
          <el-date-picker v-model="form.indt" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="测定日期：" prop="dtdt" >
          <el-date-picker v-model="form.dtdt" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间：" prop="dtuptm" >
          <el-date-picker v-model="form.dtuptm" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
        </el-form-item>  
        <el-form-item label="基础情况：" prop="bsin">
            <el-input type="textarea" v-model="form.bsin" style="width:180px;"></el-input>
        </el-form-item>        
        <el-form-item label="备注：" prop="rm">
            <el-input type="textarea" v-model="form.rm" style="width:180px;"></el-input>
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
        stcd: "",
        damcd: "",
        mpcd: "",
        ch: "",
        ofax: "",
        inel:"",       
        vrds: "",
        tp:"",
        bsin:"",
        indt:"",
        dtdt:"",
        dvcd:"",
        eslg:"",
        nrlt:"",
        rm:"",
        dtuptm:"",
      },
      routerurl:'/guanqu/manage/addcjwyinfo',
      stcdlist:[],
      damcdlist:[],
      rules: {
        stcd: [{ required: true, message: "请选择监测站点",trigger: 'change'}],
        damcd: [{ required: true, message: "断面编号不能为空",trigger: 'blur'},{ min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}],
        mpcd: [{ required: true, message: "测点编号不能为空",trigger: 'blur'},{ min: 6, max: 8, message: '长度在6到8个字符', trigger: 'blur'}],
        ch: [{ required: true, message: "桩号不能为空",trigger: 'blur'},{ min: 1, max: 9, message: '长度在1到9个字符', trigger: 'blur'}],
        ofax: [{ required: true, message: "轴距不能为空",trigger: 'blur'}],  
        dvcd: [{ required: true, message: "仪器编号不能为空",trigger: 'blur'}], 
        inel:[{ required: true, message: "初始高程不能为空",trigger: 'blur'}],
        dtdt: [{ required: true, message: "请选择测定日期",trigger: 'change'}],
        dtuptm: [{ required: true, message: "请选择更新时间",trigger: 'change'}],
        eslg: [{ required: true, message: "经度不能为空",trigger: 'blur'}],
        nrlt: [{ required: true, message: "纬度不能为空",trigger: 'blur'}],
        vrds:[{ required: true, message: "位移阈值不能为空",trigger: 'blur'}],      
      },
    };
  },
  // 引入过滤方法到此组件
  mixins: [WarmDataConfig],
  mounted() {  
    this.form.dtuptm=this.getTodayDate();
    this.form.indt=this.form.dtuptm.substring(0,10);
    this.form.dtdt=this.form.indt;
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
        this.routerurl='/guanqu/manage/updatecjwyinfo';
        this.axios.get('/guanqu/manage/cjwydetail',{params:{ID:this.info.id}}).then((res)=>{
          this.form=res.data;
          this.getDamcd(this.form.stcd);
        }); 
      }else{
        this.routerurl='/guanqu/manage/addcjwyinfo';
      }
    },
    //可输入可选择 tp
    tpblur(e){
        if(e.target.value.trim()!=""){
            this.form.tp=e.target.value;
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
      this.$refs['slylform'].validate((valid) => {
          if (valid) {            
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.mpcd!=this.form.mpcd)){
              this.axios.get('/guanqu/base/checkmpcd',{params:{MPCD:this.form.mpcd,TYPE:4}}).then((res)=>{
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
      //this.$refs['slylform'].resetFields();
      //this.form.dtuptim=this.getTodayDate();
    },
  },

  computed: {},

  watch: {}
};
</script>


<style>
</style>