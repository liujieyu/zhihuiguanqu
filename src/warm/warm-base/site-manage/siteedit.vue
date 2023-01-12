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
    <el-form-item label="站点编号：" prop="stcd">
          <el-input v-model="form.stcd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="站点名称：" prop="rtunm">
          <el-input v-model="form.rtunm" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="河流名称：" prop="rvcd">
          <el-input v-model="form.rvcd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="水系名称：" prop="hnnm" >
          <el-input v-model="form.hnnm" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>       
        <el-form-item label="流域名称：" prop="ctcd" >
          <el-input v-model="form.ctcd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="行政区划：" prop="addvcd" >
            <el-cascader
                clearable
                size="small"
                style="width: 180px"
                placeholder="请选择"
                :options="adressList"
                v-model="form.addvcd"
                @change="handleChange"
                ref="xzqhcascader"
                change-on-select
            ></el-cascader>
        </el-form-item>   
        <el-form-item label="经度：" prop="lgtd1" >
          <el-input v-model="form.lgtd1" placeholder="请输入" style="width:180px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.lgtd1=null:form.lgtd1=parseFloat(value):form.lgtd1=value}"></el-input>
        </el-form-item>
        <el-form-item label="纬度：" prop="lttd1" >
          <el-input v-model="form.lttd1" placeholder="请输入" style="width:180px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.lttd1=null:form.lttd1=parseFloat(value):form.lttd1=value}"></el-input>
        </el-form-item>  
        <el-form-item label="基面名称：" prop="dtmnm">
          <el-input v-model="form.dtmnm" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="基面高程：" prop="dtmel" >
          <el-input v-model="form.dtmel" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.dtmel=null:form.dtmel=parseFloat(value):form.dtmel=value}"></el-input>m
        </el-form-item> 
        <el-form-item label="基面修正值：" prop="dtpr">
          <el-input v-model="form.dtpr" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.dtpr=null:form.dtpr=parseFloat(value):form.dtpr=value}"></el-input>m
        </el-form-item>
        <el-form-item label="站类：" prop="sttp" >
          <el-select v-model="form.sttp"  style="width:180px" placeholder="请选择">
                <el-option label="水库站" value="RR"></el-option>
            </el-select>
        </el-form-item>    
        <el-form-item label="报讯等级：" prop="frgrd" >
            <el-input v-model="form.frgrd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="集水面积：" prop="drna" >
            <el-input v-model="form.drna" placeholder="请输入" style="width:162px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.drna=null:form.drna=parseFloat(value):form.drna=value}"></el-input>m²
        </el-form-item>
        <el-form-item label="监测要素：" prop="types">
          <el-select v-model="form.types" multiple placeholder="请选择" style="width:180px" >
                <el-option
                v-for="item in typelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="等级：" prop="stgr">
          <el-select v-model="form.stgr" placeholder="请选择" style="width:180px" >
                <el-option
                v-for="item in stgrlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="建设单位：" prop="dlog" >
          <el-input v-model="form.dlog" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>       
        <el-form-item label="管理单位：" prop="admauth" >
          <el-input v-model="form.admauth" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="拼音码：" prop="phcd" >
            <el-input v-model="form.phcd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="启用标志：" prop="usfl" >
          <el-select v-model="form.usfl"  style="width:180px" placeholder="请选择">
                <el-option label="启用" value="Y"></el-option>
                <el-option label="停用" value="N"></el-option>
            </el-select>
        </el-form-item> 
        <el-form-item label="建站时间：" prop="addtime">
          <el-date-picker v-model="form.addtime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间：" prop="dtuptm">
          <el-date-picker v-model="form.dtuptm" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
        </el-form-item>        
        <el-form-item label="备注：" prop="comments">
            <el-input type="textarea" v-model="form.comments" style="width:470px;"></el-input>
        </el-form-item>          
        <el-form-item>
            <el-button type="primary" @click="onSubmit" style="margin-right:50px;margin-left:110px;" size="small">保存</el-button>
            <el-button type="info" @click="onCannel" size="small">取消</el-button>
        </el-form-item>
</el-form>
</template>

<script>
import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
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
        rtunm: "",
        rvcd: "",
        hnnm: "",
        ctcd: "",
        lgtd1:"",       
        lttd1: "",
        stlc:"",
        addvcd:"",
        dtmnm:"",
        dtmel:"",
        dtpr:"",
        sttp:"RR",
        frgrd:"",
        drna:"",
        phcd:"",
        usfl:"Y",
        comments:"",
        addtime:"",
        dtuptm:"",
        dlog:"",
        admauth:"",
        types:['1','2','8'],
        stgr:"",
        ystcd:""
      },
      routerurl:'/guanqu/manage/addsiteinfo',
      stgrlist:[],
      typelist:[],
      adressList:[],
      rules: {
        stcd: [{ required: true, message: "站点编码不能为空",trigger: 'change'}],
        rtunm: [{ required: true, message: "站点名称不能为空",trigger: 'blur'}],
        lgtd1: [{ required: true, message: "经度不能为空",trigger: 'blur'}],
        lttd1: [{ required: true, message: "纬度不能为空",trigger: 'blur'}],
        addvcd: [{ required: true, message: "请选择行政区划",trigger: 'change'}],
        dtmnm: [{ required: true, message: "基面名称不能为空",trigger: 'blur'}],  
        dtmel: [{ required: true, message: "基面高程不能为空",trigger: 'blur'}], 
        dtpr:[{ required: true, message: "基面修正值不能为空",trigger: 'blur'}],
        sttp: [{ required: true, message: "请选择站类",trigger: 'change'}],
        addtime: [{ required: true, message: "请选择建站时间",trigger: 'change'}],
        dtuptm: [{ required: true, message: "请选择更新时间",trigger: 'change'}],
        types: [{ required: true, message: "请选择监测要素",trigger: 'change'}],
        stgr: [{ required: true, message: "请选择等级",trigger: 'change'}],     
      },
    };
  },
  // 引入过滤方法到此组件
  mixins: [WarmDataConfig,GetDataMethods],
  mounted() {  
    this.form.dtuptm=this.getTodayDate();
    this.form.addtime=this.form.dtuptm;
      //行政区划
    this.getTableData_WRP_AD_B(data => {
        this.adressList = data[0].children;
    });
    //等级
    this.Get_WrpFieldinfo('ST_STBPRP_B','STGR',data => {
         this.stgrlist = data;                
    });
    //监测要素
    this.Get_WrpFieldinfo('ST_STBPRP_F','TYPE',data => {
         this.typelist = data;                
    });
    this.Reload();
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
        this.routerurl='/guanqu/manage/updatesiteinfo';
        this.axios.get('/guanqu/base/findsitebyid',{params:{ID:this.info.id}}).then((res)=>{
          this.form=res.data;
          this.form.types=this.form.types.split(",");
          if(this.form.addvcd.endsWith("000")){
            this.form.addvcd=[this.form.addvcd];
          }else{
            var town=this.form.addvcd.substring(0,9)+"000";
            var country=this.form.addvcd;
            this.form.addvcd=[town,country];
          }
          this.form.addtime=this.form.addtime.substring(0,19);
          this.form.dtuptm=this.form.dtuptm.substring(0,19);
          this.form.ystcd=this.info.stcd;
        }); 
      }else{
        this.routerurl='/guanqu/manage/addsiteinfo';
      }
    },
    //可输入可选择 tp
    tpblur(e){
        if(e.target.value.trim()!=""){
            this.form.tp=e.target.value;
        }
        
    },
    //选择行政区划获取站址
    handleChange(value){
        console.log(this.$refs["xzqhcascader"].getCheckedNodes()[0].pathLabels+","+value);
        var patharry=this.$refs["xzqhcascader"].getCheckedNodes()[0].pathLabels;
        for(var i=0;i<patharry.length;i++){
            this.form.stlc+=patharry[i];
        }
    },
    onSubmit(){
      this.$refs['slylform'].validate((valid) => {
          if (valid) {            
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.stcd!=this.form.stcd)){
              this.axios.get('/guanqu/base/checkstcd',{params:{STCD:this.form.stcd}}).then((res)=>{
                var status=res.data.checksign;
                if(status=="yes"){
                  this.$message.error(res.data.warning);
                }else{
                  this.loading=true;
                  if (this.form.addvcd.length == 1) {
                        var str2 = this.form.addvcd[0];
                        this.form.addvcd = str2;
                  }
                  if (this.form.addvcd.length == 2) {
                        var str3 = this.form.addvcd[1];
                        this.form.addvcd = str3;
                  }
                  this.form.types=this.form.types.toString();
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
              if (this.form.addvcd.length == 1) {
                        var str2 = this.form.addvcd[0];
                        this.form.addvcd = str2;
                }
                if (this.form.addvcd.length == 2) {
                    var str3 = this.form.addvcd[1];
                    this.form.addvcd = str3;
                }
                this.form.types=this.form.types.toString();
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