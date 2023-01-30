<template>
<el-form
        :v-loading="loading"
        ref="rainalarmform"
        :model="form"
        :rules="rules"
        size="mini"
        label-width="120px"
        style="display: flex;flex-wrap: wrap;"
      >
      <el-form-item label="监测站点：" prop="stcd">
          <el-select ref="site" v-model="form.stcd" filterable placeholder="请选择" style="width:180px" @change="getLabel">
                <el-option
                v-for="item in stcdlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="预警等级：" prop="ewl">
          <el-select v-model="form.ewl" filterable placeholder="请选择" style="width:180px" >
                <el-option
                v-for="item in alarmtypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="1H降雨阈值：" prop="ohP">
          <el-input v-model="form.ohP" placeholder="请输入" style="width:156px" @input="(value)=>{form.ohP=value.replace(/[^\d]/g,'')}"></el-input>mm
        </el-form-item>
        <el-form-item label="3H降雨阈值：" prop="thP" >
          <el-input v-model="form.thP" placeholder="请输入" style="width:156px" @input="(value)=>{form.thP=value.replace(/[^\d]/g,'')}"></el-input>mm
        </el-form-item>       
        <el-form-item label="6H降雨阈值：" prop="shP" >
          <el-input v-model="form.shP" placeholder="请输入" style="width:156px" @input="(value)=>{form.shP=value.replace(/[^\d]/g,'')}"></el-input>mm
        </el-form-item>
        <el-form-item label="12H降雨阈值：" prop="twhP" >
          <el-input v-model="form.twhP" placeholder="请输入" style="width:156px" @input="(value)=>{form.twhP=value.replace(/[^\d]/g,'')}"></el-input>mm
        </el-form-item>
        <el-form-item label="24H降雨阈值：" prop="odP" >
          <el-input v-model="form.odP" placeholder="请输入" style="width:156px" @input="(value)=>{form.odP=value.replace(/[^\d]/g,'')}"></el-input>mm
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
        stnm:"",
        ewl: "",
        ohP: "",
        thP:"",       
        shP: "",
        twhP:"",
        odP:"",
      },
      routerurl:'/guanqu/rain/addalarm',
      stcdlist:[],
      alarmtypes:[],
      rules: {
        stcd: [{ required: true, message: "请选择监测站点",trigger: 'change'}],
        ewl: [{ required: true, message: "请选择预警等级",trigger: 'change'}],
        ohP: [{ required: true, message: "1H降雨阈值不能为空",trigger: 'blur'}],
        thP: [{ required: true, message: "3H降雨阈值不能为空",trigger: 'blur'}],
        shP: [{ required: true, message: "6H降雨阈值不能为空",trigger: 'blur'}],
        twhP: [{ required: true, message: "12H降雨阈值不能为空",trigger: 'blur'}],
        odP: [{ required: true, message: "24H降雨阈值不能为空",trigger: 'blur'}],    
      },
    };
  },
  // 引入过滤方法到此组件
  mixins: [WarmDataConfig],
  mounted() { 
       //预警等级
      this.Get_WrpFieldinfo('ST_PP_Alarm','EWL',data => {
          this.alarmtypes = data;
      }); 
      //监测站点列表
      this.axios.get('/guanqu/base/stcdlist').then((res)=>{
          this.stcdlist=res.data;         
          this.Reload();
      }); 
  },

  methods: {
    Reload(){  
      if(this.info.editsign=="update"){
        this.routerurl='/guanqu/rain/updatealarm';
        this.axios.get('/guanqu/rain/alarmdetail',{params:{ID:this.info.id}}).then((res)=>{
          var raindata=res.data;
          this.form.id=this.info.id;
          this.form.stcd=raindata.STCD;
          this.form.stnm=this.info.stnm;
          this.form.ewl=String(raindata.EWL);
          this.form.ohP=raindata.OH_P;
          this.form.thP=raindata.TH_P;
          this.form.shP=raindata.SH_P;
          this.form.twhP=raindata.TWH_P;
          this.form.odP=raindata.OD_P;
        }); 
      }else{
        this.routerurl='/guanqu/rain/addalarm';
      }
    },
    onSubmit(){
      this.$refs['rainalarmform'].validate((valid) => {
          if (valid) {            
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.stcd!=this.form.stcd)){
              this.axios.get('/guanqu/rain/checkstcd',{params:{STCD:this.form.stcd,EWL:this.form.ewl}}).then((res)=>{
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
    },
    getLabel(data){
        debugger;
        this.$nextTick(()=>{
            console.log(this.$refs.site.selectedLabel);
            this.form.stnm=this.$refs.site.selectedLabel;
            console.log(this.$refs.site.selected.label);
        })
    },
  },

  computed: {},

  watch: {}
};
</script>


<style>
</style>