<template>
<div>
    <ROW>
        <Col>
        <Button type="primary" icon="ios-trash" style="width: auto;float:right;margin-bottom:10px;" @click="delClick">删除</Button>
        <Button type="primary" icon="md-add" style="width: auto;margin-right:20px;float:right;margin-bottom:10px;" @click="addClick">新增</Button>        
        </Col>
    </ROW>   
                 <el-table
                    :data="dmtzdata"
                    border
                    ref="dmtzTable"
                    style="width:621px;"
                    header-cell-style="padding:4px 0px;"
                    size="small"
                    height="180"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    empty-text="暂无站点数据"
                    >
                    <el-table-column
                        type="selection"
                        width="45">
                    </el-table-column>
                        <el-table-column align="center" prop="damscd" label="特征点编号"  :min-width="120">
                            <template slot-scope="scope">
                                {{ scope.row.damscd }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="damsnm" label="特征点名称" :min-width="140">
                            <template slot-scope="scope">
                                {{ scope.row.damsnm }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="redi" label="起点距(m)"  :min-width="100">
                            <template slot-scope="scope">
                                {{ scope.row.redi }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="poel" label="高程(m)"  :min-width="100">
                            <template slot-scope="scope">
                                {{ scope.row.poel }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="poel" label="操作"  :min-width="90">
                            <template slot-scope="scope">
                                <el-button @click="editClick(scope.row)" type="primary" plain size="mini">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                <el-form
                    ref="dmtzform"
                    :model="form"
                    :rules="rules"
                    size="mini"
                    label-width="110px"
                    style="display: flex;flex-wrap: wrap;margin-top:10px;"
                >                       
                    <el-form-item label="特征点编号：" prop="damscd">
                    <el-input v-model="form.damscd" placeholder="请输入" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item label="特征点名称：" prop="damsnm">
                    <el-input v-model="form.damsnm" placeholder="请输入" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item label="起点距：" prop="redi" >
                    <el-input v-model="form.redi" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.redi=null:form.redi=parseFloat(value):form.redi=value}"></el-input>m
                    </el-form-item>
                    <el-form-item label="高程：" prop="poel" >
                    <el-input v-model="form.poel" placeholder="请输入" style="width:168px" @input="(value)=>{isNaN(value)?isNaN(parseFloat(value))?
                    form.poel=null:form.poel=parseFloat(value):form.poel=value}"></el-input>m
                    </el-form-item>
                    <el-form-item label="断面编号：" prop="damcd">
                    <el-input v-model="form.damcd" placeholder="请输入" style="width:180px" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="更新时间：" prop="dtuptm" >
                    <el-date-picker v-model="form.dtuptm" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" style="margin-right:50px;margin-left:110px;" size="small">保存</el-button>
                        <el-button type="info" @click="onCannel" size="small">取消</el-button>
                    </el-form-item>
            </el-form>
</div>
</template>
<script type="text/javascript">
export default {
  props: {
    info: {}
  },
  data() {
    return {
        form: {
        id:"",
        stcd:"",
        damcd: "",
        damscd: "",
        damsnm: "",
        redi: "",
        poel: "",
        dtuptm: "",  
        lastdamscd:"",    
      },
      multipleSelecttz:[],
      editsign:"add",
      routerurl:'/guanqu/manage/adddmtzinfo',
      stcdlist:[],
      typelist:[],
      rules: {
        damcd:[{ required: true, message: "断面编号不能为空",trigger: 'blur'}],
        damscd: [{ required: true, message: "特征点编号不能为空",trigger: 'blur'},{ min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}],
        damsnm: [{ required: true, message: "特征点名称不能为空",trigger: 'blur'}],
        redi: [{ required: true, message: "起点距不能为空",trigger: 'blur'}],
        poel: [{ required: true, message: "高程不能为空",trigger: 'blur'}],  
        dtuptm: [{ required: true, message: "请选择更新日期",trigger: 'change'}],
      },
        dmtzdata:[{damscd:'0101001',damsnm:'测试特征名称',redi:123.45,poel:345.12}],
    };
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
        //断面特征信息
        this.axios.get("/guanqu/detail/dmtzinfo", {
            params: {DAMCD:this.info.damcd}
        }).then(res => {
            this.dmtzdata=res.data.dmtzinfo;
        });
       },
        //选中功能
        handleSelectionChange(val){
            this.multipleSelecttz=val;
        },
       //新增
       addClick(){
        this.editsign="add";
        this.routerurl='/guanqu/manage/adddmtzinfo';
        this.$refs['dmtzform'].resetFields();
        this.form.dtuptm=this.getTodayDate();
        this.form.damcd=this.info.damcd;
        this.form.stcd=this.info.stcd;
       },
       //修改
       editClick(item){
        this.$refs.dmtzTable.setCurrentRow(item);
        this.editsign="update";
        this.routerurl='/guanqu/manage/updatedmtzinfo';
        //this.form=item;
        this.axios.get('/guanqu/manage/damsdetail',{params:{id:item.id}}).then((res)=>{
          this.form=res.data;
          this.form.lastdamscd=item.damscd;
        });       
       },
       //删除
       delClick(){
        if(this.multipleSelecttz==null || this.multipleSelecttz.length==0){
                this.$message({
                  message: '请选择要删除的断面特征信息',
                  type: 'warning'
                });
              }else{
                var dmtzids="";
                for(var i=0;i<this.multipleSelecttz.length;i++){
                  dmtzids+=this.multipleSelecttz[i].id;
                  if(i<this.multipleSelecttz.length-1){
                    dmtzids+=",";
                  }
                }
                this.$confirm('确定删除这'+this.multipleSelecttz.length+'条断面特征信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.get('/guanqu/manage/deldmtzinfo',{params:{ids:dmtzids}}).then((res)=>{
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    this.Reload();
                  });                 
                }).catch(() => {         
                });
              }
       },
       //保存信息
       onSubmit(){
        this.$refs['dmtzform'].validate((valid) => {
          if (valid) {
            if(this.editsign=="add" || (this.editsign=="update" && this.form.lastdamscd!=this.form.damscd)){
              this.axios.get('/guanqu/base/checkdamscd',{params:{DAMSCD:this.form.damscd}}).then((res)=>{
                var status=res.data.checksign;
                if(status=="yes"){
                  this.$message.error(res.data.warning);
                }else{
                  this.axios.post(this.routerurl,{id:this.form.id,stcd:this.form.stcd,damcd:this.form.damcd,damscd:this.form.damscd,damsnm:this.form.damsnm,redi:this.form.redi,poel:this.form.poel,dtuptm:this.form.dtuptm}).then((res) => {
                    this.Reload();
                    if(this.editsign=="add"){
                        this.addClick();
                    }
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                  });
                }
              });
            }else{
              this.axios.post(this.routerurl,{id:this.form.id,stcd:this.form.stcd,damcd:this.form.damcd,damscd:this.form.damscd,damsnm:this.form.damsnm,redi:this.form.redi,poel:this.form.poel,dtuptm:this.form.dtuptm}).then((res) => {
                    this.Reload();
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
    //取消
    onCannel(){
        this.$emit("closewindows");
    },
   },
     mounted() {
        this.form.dtuptm=this.getTodayDate();
        this.form.damcd=this.info.damcd;
        this.form.stcd=this.info.stcd;
        this.Reload();
     }
}
</script>