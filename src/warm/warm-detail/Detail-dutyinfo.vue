<template>
  <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px" size="small" class="demo-form-inline" :rules="rules" style="width:580px">
                <el-form-item label="年份：" prop="yr">
                    <el-date-picker
                            style="width: 180px;"
                            v-model="form.yr"
                            format="yyyy年"
                            value-format="yyyy"
                            type="year"
                            size="small"
                            :clearable="false"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名：" prop="nm">
                    <el-input v-model="form.nm" :value="form.nm"  style="width:180px"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" prop="mobile">
                    <el-input v-model="form.mobile" :value="form.mobile"  style="width:180px"></el-input>
                </el-form-item>
                <el-form-item label="办公电话：" prop="ophone">
                    <el-input v-model="form.ophone" :value="form.ophone"  style="width:180px"></el-input>
                </el-form-item>               
                <el-form-item label="部门：" prop="unit">
                    <el-input v-model="form.unit" :value="form.unit"  style="width:180px"></el-input>
                </el-form-item>
                <el-form-item label="职务：" prop="position">
                    <el-input v-model="form.position" :value="form.position"  style="width:180px"></el-input>
                </el-form-item>
                <el-form-item label="人员类型：" prop="dutytype">
                    <el-select v-model="form.dutytype" placeholder="请选择人员类型" style="width:180px" clearable>
                    <el-option v-for="item in dutytypes" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="位置排序：" prop="wzpx">
                    <el-input v-model="form.wzpx" :value="form.wzpx"  style="width:180px"></el-input>
                </el-form-item>
                <el-form-item>
                    <Button  type="primary" @click="submitForm('form')" icon="md-cloud-upload" style="margin-left:200px;">提交</Button>
                    <Button  @click="resetForm('form')" style="margin-left:20px;" icon="md-trash" >重置</Button>
                </el-form-item>
      </el-form>
  </div>
</template>
<script>
import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
export default {
  props: {
    info:{}
  },
  data(){
    var checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('手机号不能为空'));
    } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
        callback();
        } else {
        return callback(new Error('请输入正确的手机号'));
        }
    }
    };
    var validatePhone = (rule, value, callback) => {
        if (value !=null && value !== '') { 
            var reg =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
            if(!reg.test(value)){
              callback(new Error('请输入正确的办公电话'));
            }else{
                callback();
            }
          }else{
              callback();
          }
          callback();
      };
    var checkwzpx=(rule,value,callback)=>{
        if(value !=null && value !== ''){
            var reg=/^[0-9]*$/;
            if(!reg.test(value)){
                callback(new Error('请输入数字'));
            }else{
                callback();
            }
        }
        callback();
    };
    return{        
        dutytypes:[],
        form:{
            yr:new Date().getFullYear().toString(),
            nm:'',
            mobile:'',
            ophone:'',
            unit:'',
            position:'',
            dutytype:'',
            wzpx:'',
            id:0,
            opsign:1  // 1 add 2 update
        },
        rules: {
            yr:[
                { required: true, message: '请选择年份', trigger: 'change' }
            ],
            nm:[
                { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            mobile:[
                {required: true, validator: checkPhone, trigger: 'blur'}
            ],
            ophone:[
                {validator: validatePhone, trigger: 'blur'}
            ],
            wzpx:[
                {validator:checkwzpx,message:'请输入数字',trigger:'blur'}
            ],
        }
    }
  },
  // 引入过滤方法到此组件
  mixins: [WarmDataConfig],
  mounted(){
           //if(this.info.sign=="add"){
           //    this.form.yr=new Date().getFullYear().toString();
           //}
            //人员类型
            this.Get_WrpFieldinfo('HHPDI_Duty_Plan','TYPE',data => {
                this.dutytypes = data;
                if(this.info.sign=="update"){
                    this.form.yr=this.info.YR.toString();
                    this.form.nm=this.info.NM;
                    this.form.mobile=this.info.MOBILE;
                    this.form.ophone=this.info.OPHONE;
                    this.form.unit=this.info.UNIT;
                    this.form.position=this.info.POSITION;
                    this.form.dutytype=this.info.DUTYTYPE==null?'':this.info.DUTYTYPE.toString();
                    this.form.wzpx=this.info.WZPX;
                    this.form.id=this.info.ID;
                }
            });
        },
  methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.info.sign=="add"){
                this.form.opsign=1;
            }else{
                this.form.opsign=2;
            }
            let url='/alarm/editdutyinfo';
          let success;
          if(this.info.sign=="add"){
              success='新增值班通讯录成功！';
          }else{
              success='修改值班通讯录成功！';
          }
          this.axios.post(url,this.form).then((res)=>{
            if(res.data=="ok"){
                this.$message({message:success,type:'success'});
                this.$emit('closedailog');
                if(this.info.sign=="add"){
                    this.$refs['form'].resetFields();
                }
            }                   
        });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
}
</script>