<template>
	<div style="width:540px;">
            <el-form ref="form" :inline="true" :model="form" label-width="90px" size="small" class="demo-form-inline">
                <el-form-item label="上传日期：">
                        <el-date-picker
                            style="width: 160px"
                            v-model="form.tm"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            size="small"
                            :clearable="false">
                    </el-date-picker>
                    <span style="color:red">*</span>
                </el-form-item>
                <el-form-item label="上传人员：">
                    <Input v-model="form.upMan" :value="form.upMan" clearable style="width:160px"/>
                    <span style="color:red">*</span>
                </el-form-item>
                <el-form-item label="测量日期：">
                    <el-date-picker
                            style="width: 160px"
                            v-model="form.meTm"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            size="small"
                            :clearable="false">
                    </el-date-picker>
                    <span style="color:red">*</span>
                </el-form-item>
                <el-form-item label="测量人：">
                    <Input v-model="form.meMan" :value="form.meMan" clearable style="width:160px"/>
                    <span style="color:red">*</span>
                </el-form-item>
                <el-form-item label="备注：">
                    <Input type="textarea" v-model="form.memo" :rows="2" :value="form.memo" clearable style="width:425px" />
                </el-form-item>
                <el-form-item label="文件路径：" style="width:512px">
                   <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    :action="href"
                    :data="form"
                    :auto-upload="false"
                    :on-success="upLoadSuccess"
                    :on-change="testOnchange"
                    :on-exceed="exceedHander"
                    accept=".xls,.xlsx">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item style="width:425px;padding-left:90px;">
                    <Button  type="primary" @click="onSubmit" icon="md-cloud-upload">上传</Button>
                    <Button  @click="onCanle" style="margin-left:20px;" icon="md-trash">取消</Button>
                </el-form-item>
            </el-form>
    </div>
</template>
<script type="text/javascript">
export default {
        data(){
            return{
                href:'',
                filename:'',
                form:{
                    tm:'',
                    upMan:'',
                    meTm:'',
                    meMan:'',
                    memo:''
                },
            }
        },
        mounted(){
            this.href='/strealmanage/uploadfile';
            var date = new Date();
            var Month = date.getMonth() + 1;
            Month=Month<10?"0"+Month:Month;
            var day=date.getDate();
            day=day<10?"0"+day:day;
            this.form.tm = date.getFullYear() + '-' + Month + '-' + day;
            this.form.meTm=date.getFullYear() + '-' + Month + '-' + day;
        },
        methods:{
            upLoadSuccess(response, file, fileList) {
                if(response=="ok"){
                    this.$message({ type: 'success', message: '上传文件成功！' }); 
                    this.$emit('closeupload',1); 
                }else{
                    this.$message({ type: 'warning', message: response });
                }
                             
            },
            onSubmit(){
                if(this.form.upMan==''){
                    this.$message({ type: 'warning', message: '请输入上传人员！' });
                    return false; 
                }
                if(this.form.meMan==''){
                    this.$message({ type: 'warning', message: '请输入测量人员！' });
                    return false; 
                }
                if(this.filename==''){
                    this.$message({ type: 'warning', message: '请选择文件！' });
                    return false;
                }
                this.axios.get('/strealmanage/existfile',{params:{fileName:this.filename}}).then((res)=>{
                   var sign=res.data;
                   if(sign=="1"){
                       this.$message({ type: 'warning', message: '此文件已上传！' });
                       return false;
                   }else{
                       this.$refs.upload.submit(); 
                   }
                });                           
            },
            exceedHander(){
                this.$message.warning('请勿上传多个文件!');
            },
            onCanle(){
            this.$emit('closeupload',0);
            },
            testOnchange(file, fileList){
                this.filename=file.name;
            }
        },
}
</script>