<template>
<el-form
        ref="slylform"
        :model="form"
        :rules="rules"
        size="mini"
        label-width="120px"
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
        <el-form-item label="监测部位：" prop="msps">
          <el-select v-model="form.msps" filterable placeholder="请选择" style="width:180px">
                <el-option
                v-for="item in info.typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>       
        <el-form-item label="桩号：" prop="ch" >
          <el-input v-model="form.ch" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="坝轴距：" prop="ofax" >
          <el-select v-model="ofaxfh" placeholder="请选择" style="width:80px">
                <el-option  key="-"  label="上游"  value="-"></el-option>
                <el-option  key="+"  label="下游"  value="+"></el-option>
            </el-select>
          <el-input v-model="form.ofax" placeholder="请输入" style="width:88px"></el-input>m
        </el-form-item>
        <el-form-item label="进水段底高程：" prop="ipbtel" >
          <el-input v-model="form.ipbtel" placeholder="请输入" style="width:168px"></el-input>m
        </el-form-item>
        <el-form-item label="进水段顶高程：" prop="iptpel">
          <el-input v-model="form.iptpel" placeholder="请输入" style="width:168px;"></el-input>m
        </el-form-item>
        <el-form-item label="管口高程：" prop="tbtpel" >
          <el-input v-model="form.tbtpel" placeholder="请输入" style="width:168px"></el-input>m
        </el-form-item>
        <el-form-item label="管底高程：" prop="tbbtel">
          <el-input v-model="form.tbbtel" placeholder="请输入" style="width:168px;"></el-input>m
        </el-form-item>
        <el-form-item label="水位阈值高程：" prop="pztbtel" >
          <el-input v-model="form.pztbtel" placeholder="请输入" style="width:168px"></el-input>m
        </el-form-item>
        <el-form-item label="安装高程：" prop="tdmin" >
          <el-input v-model="form.tdmin" placeholder="请输入" style="width:168px"></el-input>m
        </el-form-item>
        <el-form-item label="仪器编号：" prop="dvcd" >
          <el-input v-model="form.dvcd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item> 
        <el-form-item label="监测类型：" prop="mstp" >
          <el-select v-model="form.mstp" filterable placeholder="请选择" style="width:180px">
                <el-option
                v-for="item in mstplist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="经度：" prop="eslg" >
          <el-input v-model="form.eslg" placeholder="请输入" style="width:180px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.eslg=null:form.eslg=parseFloat(value):form.eslg=value}"></el-input>
        </el-form-item>
        <el-form-item label="纬度：" prop="nrlt" >
          <el-input v-model="form.nrlt" placeholder="请输入" style="width:180px" @input="checknum"></el-input>
        </el-form-item>    
        <el-form-item label="备注：" prop="rm">
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
      form: {
        id:"",
        sbid:"",
        stcd: "",
        damcd: "",
        mpcd: "",
        ch: "",
        ofax: "",       
        msps: "",
        ipbtel: "",
        iptpel: "",
        tbtpel:"",
        tbbtel:"",
        pztbtel:"",
        el:"",
        dvcd:"",
        mstp:"",
        eslg:"",
        nrlt:"",
        rm:"",
        dtuptm:"",
      },
      routerurl:'/guanqu/manage/addslylinfo',
      stcdlist:[],
      damcdlist:[],
      mstplist:[],
      ofaxfh:"+",
      rules: {
        stcd: [{ required: true, message: "请选择监测站点",trigger: 'change'}],
        damcd: [{ required: true, message: "断面编号不能为空",trigger: 'blur'},{ min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}],
        mpcd: [{ required: true, message: "测点编号不能为空",trigger: 'blur'},{ min: 6, max: 8, message: '长度在6到8个字符', trigger: 'blur'}],
        ch: [{ required: true, message: "桩号不能为空",trigger: 'blur'},{ min: 1, max: 9, message: '长度在1到9个字符', trigger: 'blur'}],
        ofax: [{ required: true, message: "轴距数值型不能为空",trigger: 'blur'}],  
        dvcd: [{ required: true, message: "仪器编号不能为空",trigger: 'blur'}], 
        msps: [{ required: true, message: "监测部位不能为空",trigger: 'change'}],
        mstp: [{ required: true, message: "监测类型不能为空",trigger: 'change'}],
        dtuptm: [{ required: true, message: "请选择更新时间",trigger: 'change'}],
        tbtpel: [{ required: true, message: "管口高程不能为空",trigger: 'blur'}],
        tbbtel: [{ required: true, message: "管底高程不能为空",trigger: 'blur'}],
        pztbtel:[{ required: true, message: "水位阈值高程不能为空",trigger: 'blur'}],      
      },
    };
  },
  // 引入过滤方法到此组件
  mixins: [WarmDataConfig],
  mounted() {  
    this.form.dtuptm=this.getTodayDate();
    this.Get_WrpFieldinfo('WRP_SPG_PZTB','MSTP',data => {
         this.mstplist = data;                
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
        this.routerurl='/guanqu/manage/updateslylinfo';
        this.axios.get('/guanqu/manage/slyldetail',{params:{ID:this.info.id}}).then((res)=>{
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
        this.routerurl='/guanqu/manage/addslylinfo';
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
             if(this.ofaxfh=="-"){
                this.form.ofax=-this.form.ofax;
             }
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.mpcd!=this.form.mpcd)){
              this.axios.get('/guanqu/base/checkmpcd',{params:{MPCD:this.form.mpcd,TYPE:2}}).then((res)=>{
                var status=res.data.checksign;
                if(status=="yes"){
                  this.$message.error(res.data.warning);
                }else{
                  this.axios.post(this.routerurl,this.form).then((res) => {
                    this.$emit("closewindows");
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                  });
                }
              });
            }else{
              this.axios.post(this.routerurl,this.form).then((res) => {
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