<template>
	<div>
        <Content class="searchcon">
            <el-upload
            ref='upload'
            class="upload-demo"
            :action="href"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :on-success='upLoadSuccess'
            accept=".doc,.docx,.xls,.xlsx,.txt,.PDF,.html">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传doc/docx/xls/xlsx/txt/pdf/html文件</div>
            </el-upload>
            <p v-html="html"></p>
            <iframe class="prism-player" :src="pdfUrl" width="100%" height="500"></iframe>
        </Content>
    </div>
</template>
<script type="text/javascript">
export default {
        data(){
            return{
                href:'/file/upload',
                uploadcount:0,
                pdfUrl:'',
                html:''
            }
        },
        mounted(){
           //let url = 'http://localhost:8080/'+this.$WarmTable+'/file/preview?fileName=需求ljx-1基础数据3和hx-闸门调度管理1.13.docx';
           //let url='static/html/web/compressed.tracemonkey-pldi-09.pdf';
           //let url='http://localhost:8080/table_war_exploded/file/showhtml/进度控制表和团队构成.xls';
           //this.pdfUrl='http://localhost:8080/table_war_exploded/pdf/web/viewer.html?file=/table_war_explodedfile/showpdf/需求ljx-1基础数据4.docx';
           //this.pdfUrl = 'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url);
            this.axios.get('/file/showhtml/进度控制表和团队构成.xls').then((res)=>{
                    this.html=res.data;
                });
        },
        methods:{
            upLoadSuccess(response, file, fileList) {
                this.resErrorStr();
                if(this.uploadcount==fileList.length){
                    this.$message({ type: 'success', message: '上传文件成功！' });
                    this.uploadcount=0;
                    this.$refs.upload.clearFiles();
                }
            },
            resErrorStr() {
                this.uploadcount=0;
                if (this.$refs.upload.uploadFiles) { // 如果存在这个值
                    let filesList = this.$refs.upload.uploadFiles.slice()
                    for (let i = 0; i < filesList.length; i++) {
                        if (filesList[i].response) {
                            if (filesList[i].response == "上传失败") { // 如果该文件上传后返回的状态值不是200，则说明该文件上传错误
                              let  UpLoadAllErrorStr = `${filesList[i].name}${filesList[i].response}`;
                                this.$message({
                                    type: 'error',
                                    dangerouslyUseHTMLString: true,
                                    message: UpLoadAllErrorStr
                                });
                            }else{
                                this.uploadcount++;
                            }
                        }
                    }
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeRemove(file, fileList) {
               // return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
}
</script>