<template>
<el-form
        ref="dmform"
        :model="form"
        :rules="rules"
        size="mini"
        label-width="110px"
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
        <el-form-item label="断面编号：" prop="damcd">
          <el-input v-model="form.damcd" placeholder="请输入" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="防渗墙类型：" prop="wallType">
          <el-select v-model="form.wallType" placeholder="请选择" style="width:180px">
                <el-option
                v-for="item in typelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="断面长度：" prop="damlen" >
          <el-input v-model="form.damlen" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.damlen=null:form.damlen=parseFloat(value):form.damlen=value}"></el-input>m
        </el-form-item>
        <el-form-item label="断面宽度：" prop="damwd" >
          <el-input v-model="form.damwd" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.damwd=null:form.damwd=parseFloat(value):form.damwd=value}"></el-input>m
        </el-form-item>
        <el-form-item label="更新时间：" prop="dtuptim" >
          <el-date-picker v-model="form.dtuptim" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
            <el-input type="textarea" v-model="form.text" style="width:470px;"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" style="margin-right:50px;margin-left:110px;" size="small">保存</el-button>
            <el-button type="info" @click="onCannel" size="small">取消</el-button>
        </el-form-item>
</el-form>
</template>

<script>
export default {
  props: {
    info: {},
  },

  data() {
    return {
      form: {
        stcd: "",
        damcd: "",
        wallType: "",
        damlen: "",
        damwd: "",
        dtuptim: "",
        text: "",        
      },
      routerurl:'/guanqu/manage/adddminfo',
      stcdlist:[],
      typelist:[],
      rules: {
        stcd: [{ required: true, message: "请选择监测站点",trigger: 'change'}],
        damcd: [{ required: true, message: "断面编号不能为空",trigger: 'blur'},{ min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}],
        wallType: [{ required: true, message: "请选择防渗墙类型",trigger: 'change'}],
        damlen: [{ required: true, message: "断面长度不能为空",trigger: 'blur'}],
        damwd: [{ required: true, message: "断面宽度不能为空",trigger: 'blur'}],  
        dtuptim: [{ required: true, message: "请选择更新日期",trigger: 'change'}],
      },
    };
  },
  mounted() {
    
    this.form.dtuptim=this.getTodayDate();
    //防渗墙类型
    this.typelist=this.info.walltypelist;
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
          var datelist = new Array();
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
        this.routerurl='/guanqu/manage/updatedminfo';
        this.form.stcd=this.info.stcd;
        this.form.damcd=this.info.damcd;
        this.axios.get('/guanqu/manage/sestiondetail',{params:{id:this.info.id}}).then((res)=>{
          this.form=res.data;
        }); 
      }else{
        this.routerurl='/guanqu/manage/adddminfo';
      }
    },
    onSubmit(){
      this.$refs['dmform'].validate((valid) => {
          if (valid) {
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.damcd!=this.form.damcd)){
              this.axios.get('/guanqu/base/checkdamcd',{params:{DAMCD:this.form.damcd}}).then((res)=>{
                var status=res.data.checksign;
                if(status=="yes"){
                  this.$message.error(res.data.warning);
                }else{
                  this.axios.post(this.routerurl,{id:this.form.id,stcd:this.form.stcd,damcd:this.form.damcd,wallType:this.form.wallType,damlen:this.form.damlen,damwd:this.form.damwd,text:this.form.text,dtuptim:this.form.dtuptim}).then((res) => {
                    this.$emit("closewindows");
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                  });
                }
              });
            }else{
              this.axios.post(this.routerurl,{id:this.form.id,stcd:this.form.stcd,damcd:this.form.damcd,wallType:this.form.wallType,damlen:this.form.damlen,damwd:this.form.damwd,text:this.form.text,dtuptim:this.form.dtuptim}).then((res) => {
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
      //this.$refs['dmform'].resetFields();
      //this.form.dtuptim=this.getTodayDate();
    },
  },

  computed: {},

  watch: {}
};
</script>


<style>
</style>