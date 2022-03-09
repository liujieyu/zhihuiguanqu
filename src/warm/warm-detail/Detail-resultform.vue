<template>
  <div>
      <el-form ref="form" :model="form" label-width="80px" size="small">
                <el-form-item label="水深：">
                    <Input v-model="form.z" :value="form.z" clearable style="width:200px"/>
                </el-form-item>
                <el-form-item label="流量：">
                    <Input v-model="form.q" :value="form.q" clearable style="width:200px"/>
                </el-form-item>
                <el-form-item>
                    <Button  type="primary" @click="onSubmit" icon="md-cloud-upload" >提交</Button>
                    <Button  @click="onClear" style="margin-left:20px;" icon="md-trash" >清空</Button>
                </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  props: {
    info:{}
  },
  data(){
    return{
        form:{
            z:'',
            q:'',
        }
    }
  },
  mounted(){
      if(this.info.sign=="update"){
          this.form.z=this.info.z;
          this.form.q=this.info.q;
      }
        },
  methods:{
      onSubmit(){
          if(this.form.z==''){
               this.$message({message:'请输入水深！',type:'warning'});
               return;
          }
          if(this.form.q==''){
               this.$message({message:'请输入流量！',type:'warning'});
               return;
          }
          var regPos = /^\d+(\.\d+)?$/; //非负浮点数
          if(!regPos.test(this.form.z)){
            this.$message({message:'水深为数字！',type:'warning'});
            return;
          }
          if(!regPos.test(this.form.q)){
            this.$message({message:'流量为数字！',type:'warning'});
            return;
          }
          this.info.z=this.form.z;
          this.info.q=this.form.q;
          let url='';
          let success;
          if(this.info.sign=="add"){
              url+='/ldresult/addeqrl';
              success='新增率定结果成功！';
          }else{
              url+='/ldresult/modifyeqrl';
              success='修改率定结果成功！';
          }
          this.axios.post(url,this.info).then((res)=>{
            if(res.data=="ok"){
                this.$message({message:success,type:'success'});
                this.$emit('closedailog');
                if(this.info.sign=="add"){
                    this.info.z='';
                    this.info.q='';
                    this.form.z='';
                    this.form.q='';
                }
            }                   
        });
      },
      onClear(){
          this.form.z=0;
          this.form.q=0;
      }
  }
}
</script>