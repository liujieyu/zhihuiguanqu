<template>
  <div>
    <Content :style="{padding: '20px', background: '#fff'}">
      <Row :gutter="16">
          <Col span="19">
          <div ref="div1">
              <Row style="margin-bottom:20px;">
              <p style="color:#464c5b;font-weight:bold;font-size:15px;width:100%;text-align:center;">{{STinfo.STNM}}标准断面水位流量计算</p>
              </Row>
              <Row>
                  <table  cellspacing="0" cellpadding="0" width="100%" class="table_show">
                  <tr>
                      <td class="dt_name">所属渠道：</td><td class="dt_vale borderright">{{STinfo.CANAL_NAME}}</td>
                      <td class="dt_name">渠底宽度：</td><td class="dt_vale borderright">{{Titileinfo.B}}</td>
                      <td class="dt_name">边坡系数：</td><td class="dt_vale borderright">{{Titileinfo.M}}</td>
                      <td class="dt_name">底坡：</td><td class="dt_vale">{{Titileinfo.I}}</td>
                  </tr>
                  <tr>
                      <td class="dt_name">断面类型：</td><td class="dt_vale borderright">{{Titileinfo.TYPENAME}}</td>
                      <td class="dt_name">最大水深：</td><td class="dt_vale borderright">{{Titileinfo.MAX_Z}}m</td>
                      <td class="dt_name">最大流量：</td><td class="dt_vale borderright">{{Titileinfo.MAX_Q}}m³/s</td>
                      <td class="dt_name"></td><td class="dt_vale"></td>
                  </tr>
                  </table>
              </Row>
              <Row style="margin-top:20px;">
                  <el-form ref="formb" :model="formb" label-width="100px" size="small" :style="{'margin-left':marginleft+'px'}">
                    <el-form-item label="测流年份：" :rules="[{ required: true, message: '测流不能为空'}]">
                        <el-date-picker
                            style="width: 200px;"
                            v-model="formb.tm"
                            format="yyyy年"
                            value-format="yyyy"
                            type="year"
                            size="small"
                            @change="timechange"
                            :clearable="false"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="糙率：">
                      <Input v-model="Titileinfo.N" :value="Titileinfo.N" clearable style="width: 200px;margin-right:5px;"/>
                      <Button  type="primary"  @click="onUpdateCl" >修改</Button>
                    </el-form-item>
                    <el-form-item label="水深：" :rules="[{ required: true, message: '水深不能为空'}]">
                        <Input v-model="formb.z" :value="formb.z" clearable style="width: 200px;" @on-change="clearq(1)"/>m
                    </el-form-item>
                    <el-form-item label="流量：" :rules="[{ required: true, message: '流量不能为空'}]">
                        <Input v-model="formb.q" :value="formb.q" clearable style="width: 200px;" readonly/>m³/s
                    </el-form-item>
                  <el-form-item >
                    <Button  type="primary"  @click="onCaculate(1)" >计算</Button>
                    <Button  type="primary"  @click="onSave(1)" style="margin-left:20px;" >保存</Button>
                </el-form-item>
                 </el-form>
              </Row>
          </div>
          <div ref="div2" style="display:none;">
            <Row style="margin-bottom:20px;">
              <p style="color:#464c5b;font-weight:bold;font-size:15px;width:100%;text-align:center;">{{STinfo.STNM}}巴歇尔槽水位流量计算</p>
              </Row>
              <Row>
                  <table  cellspacing="0" cellpadding="0" width="100%" class="table_show">
                  <tr>
                      <td class="dt_name">所属渠道：</td><td class="dt_vale borderright">{{STinfo.CANAL_NAME}}</td>
                      <td class="dt_name" style="width:15%;">巴歇尔槽型号：</td><td class="dt_vale borderright" style="width:10%;">{{Titileinfo.MODEL}}号</td>
                      <td class="dt_name">最大水深：</td><td class="dt_vale borderright">{{Titileinfo.MAX_Z}}</td>
                      <td class="dt_name">最大测流：</td><td class="dt_vale">{{Titileinfo.MAX_Q}}</td>
                  </tr>
                  </table>
              </Row>
              <Row style="margin-top:20px;">
                  <el-form ref="formx" :model="formx" label-width="100px" size="small" :style="{'margin-left':marginleft+'px'}">
                    <el-form-item label="测流年份：" :rules="[{ required: true, message: '测流不能为空'}]">
                        <el-date-picker
                            style="width: 200px;"
                            v-model="formx.tm"
                            type="year"
                            format="yyyy年"
                            value-format="yyyy"
                            size="small"
                            :clearable="false"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="水深：" :rules="[{ required: true, message: '水深不能为空'}]">
                        <Input v-model="formx.z" :value="formx.z" clearable style="width: 200px;" @on-change="clearq(2)"/>m
                    </el-form-item>
                    <el-form-item label="流量：" :rules="[{ required: true, message: '流量不能为空'}]">
                        <Input v-model="formx.q" :value="formx.q" clearable style="width: 200px;" readonly/>m³/s
                    </el-form-item>
                  <el-form-item >
                    <Button  type="primary"  @click="onCaculate(2)" >计算</Button>
                    <Button  type="primary"  @click="onSave(2)" style="margin-left:20px;" >保存</Button>
                </el-form-item>
                 </el-form>
              </Row>
          </div>
          <div ref="div3" style="display:none;">
            <Row style="margin-bottom:20px;">
              <p style="color:#464c5b;font-weight:bold;font-size:15px;width:100%;text-align:center;">{{STinfo.STNM}}水闸水位流量计算</p>
              </Row>
              <Row>
                  <table cellspacing="0" cellpadding="0" width="100%" class="table_show">
                  <tr>
                      <td class="dt_name">所属渠道：</td><td class="dt_vale borderright">{{STinfo.CANAL_NAME}}</td>
                      <td class="dt_name">水闸类型：</td><td class="dt_vale borderright">{{Titileinfo.SLTP}}</td>
                      <td class="dt_name">水闸宽度：</td><td class="dt_vale borderright">{{Titileinfo.GTHLNTWD}}</td>
                      <td class="dt_name">最大开度：</td><td class="dt_vale">{{Titileinfo.GATE_HI}}</td>
                  </tr>
                  <tr>
                      <td class="dt_name">闸前最大水深：</td><td class="dt_vale borderright">{{Titileinfo.Z_MAX_F}}m</td>
                      <td class="dt_name">闸前最大流量：</td><td class="dt_vale borderright">{{Titileinfo.Q_MAX_F}}m³/s</td>
                      <td class="dt_name">闸后最大水深：</td><td class="dt_vale borderright">{{Titileinfo.Z_MAX_B}}m</td>
                      <td class="dt_name">闸后最大流量：</td><td class="dt_vale">{{Titileinfo.Q_MAX_B}}m³/s</td>
                  </tr>
                  </table>
              </Row>
              <Row style="margin-top:20px;">
                  <el-form ref="forms" :model="forms" label-width="100px" size="small" :style="{'margin-left':marginleft+'px'}">
                    <el-form-item label="测流年份：" :rules="[{ required: true, message: '测流不能为空'}]" >
                        <el-date-picker
                            style="width: 200px;"
                            v-model="forms.tm"
                            value-format="yyyy"
                            type="year"
                            format="yyyy年"
                            size="small"
                            :clearable="false"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="闸前水深：" :rules="[{ required: true, message: '闸前水深不能为空'}]">
                        <Input v-model="forms.fz" :value="forms.fz" clearable style="width: 200px;" @on-change="clearq(3)"/>m
                    </el-form-item>
                    <el-form-item label="闸后水深：" :rules="[{ required: true, message: '闸后水深不能为空'}]">
                        <Input v-model="forms.bz" :value="forms.bz" clearable style="width: 200px;" @on-change="clearq(3)"/>m
                    </el-form-item>
                    <el-form-item label="闸门开度：" :rules="[{ required: true, message: '闸门开度不能为空'}]">
                        <Input v-model="forms.hi" :value="forms.hi" clearable style="width: 200px;"/>m
                    </el-form-item>
                    <el-form-item label="流量：" :rules="[{ required: true, message: '流量不能为空'}]">
                        <Input v-model="forms.q" :value="forms.q" clearable style="width: 200px;" readonly/>m³/s
                    </el-form-item>
                  <el-form-item >
                    <Button  type="primary"  @click="onCaculate(3)" >计算</Button>
                    <Button  type="primary"  @click="onSave(3)" style="margin-left:20px;" >保存</Button>
                </el-form-item>
                 </el-form>
              </Row>
          </div>
          </Col>
          <Col span="5">
          <Row>
          <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-left: 20px;" @on-search="search" v-model="searchmsg" />    
          </Row>
          <Row style="margin-top:10px;margin-left: 20px;">
            <Col :style="{'height': (theight+90)+'px','overflow-y': 'auto'}">
              <el-tree
                class="filter-tree"
                :data="Treedata"
                :props="defaultProps"
                highlight-current="true"
                @node-click="type_tree"
                node-key="STCD"
               :default-expanded-keys="keys"
                ref="tree">
              </el-tree>
            </Col>
          </Row>
          </Col>
      </Row>
    </Content>
  </div>
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import App from "@/App.vue";
export default {
  data() {
    return {
        theight:window.innerHeight-350,
        searchmsg:'',
        marginleft:(window.innerWidth-200)*19/24*0.5-150,
        Treedata: [],
      defaultProps: {
          children: 'children',
          label: 'STNM'
        },
      keys:[],
      STinfo:{},
      Titileinfo:{},
      formb:{
        tm:'',
        z:'',
        q:''
      },
      formx:{
        tm:'',
        z:'',
        q:''
      },
      forms:{
        tm:'',
        z:'',
        q:''  
      }
    }
  },
    mounted() {
        var dateformat=this.getNowDate();
        this.formb.tm = dateformat;
        this.formx.tm = dateformat;
        this.forms.tm = dateformat;
        this.axios.get('/ldresult/typesite').then(res => {
      var root=new Object();
      root["STNM"]="类型";root["ZD_SIGN"]=0;root["STCD"]="0";
      var typelist=new Array();
      var type1=new Object();
      type1["STNM"]="标准断面";type1["ME_TYPE"]=1;type1["ZD_SIGN"]=0;type1["STCD"]="1";typelist.push(type1);
      var type2=new Object();
      type2["STNM"]="巴歇尔槽";type2["ME_TYPE"]=2;type2["ZD_SIGN"]=0;type2["STCD"]="2";typelist.push(type2);
      var type3=new Object();
      type3["STNM"]="水闸";type3["ME_TYPE"]=3;type3["ZD_SIGN"]=0;type3["STCD"]="3";typelist.push(type3);
      //var type4=new Object();
      //type4["STNM"]="管道";type4["ME_TYPE"]=4;type4["ZD_SIGN"]=0;type4["STCD"]="4";typelist.push(type4);
      root.children=typelist;
      var keyarry=["0","1"];
      var datalist=res.data;
      typelist.map(val => {
                val.children = getChildrenList(val.ME_TYPE, datalist);
                return val;
            });
      function getChildrenList(me_type, data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.ME_TYPE == me_type) {
                        return true;
                    }
                })
                return newList;
            }
      keyarry.push(typelist[0].children[0].STCD);
      this.Treedata.push(root);
      this.keys=keyarry;
      this.STinfo=typelist[0].children[0];
      var infoobj=this.STinfo;
      this.axios.get('/ldresult/maxinfo',{params: {metype:this.STinfo.ME_TYPE,stcd:this.STinfo.STCD,year:this.formb.tm}}).then(res1 => {
            var maxobj=res1.data;
            this.loadTData(maxobj);
          });
      });
    },
    methods: {
      //加载表格数据
        loadTData(maxobj){
            this.Titileinfo=maxobj;
            if(maxobj.TYPES){
                if(maxobj.TYPES==1){
                    this.Titileinfo.TYPENAME='矩形';
                }else if(maxobj.TYPES==2){
                    this.Titileinfo.TYPENAME='梯形';
                }else if(maxobj.TYPES==3){
                    this.Titileinfo.TYPENAME='U形';
                }
            }
            
        },
        //站点名称查询
        search(){
          this.Treedata=new Array();
            var tt=this.STinfo;
            this.axios.get('/ldresult/typesite',{params:{stnm:this.searchmsg}}).then(res => {
      var root=new Object();
      root["STNM"]="类型";root["ZD_SIGN"]=0;root["STCD"]="0";
      var typelist=new Array();
      var type1=new Object();
      type1["STNM"]="标准断面";type1["ME_TYPE"]=1;type1["ZD_SIGN"]=0;type1["STCD"]="1";typelist.push(type1);
      var type2=new Object();
      type2["STNM"]="巴歇尔槽";type2["ME_TYPE"]=2;type2["ZD_SIGN"]=0;type2["STCD"]="2";typelist.push(type2);
      var type3=new Object();
      type3["STNM"]="水闸";type3["ME_TYPE"]=3;type3["ZD_SIGN"]=0;type3["STCD"]="3";typelist.push(type3);
      //var type4=new Object();
      //type4["STNM"]="管道";type4["ME_TYPE"]=4;type4["ZD_SIGN"]=0;type4["STCD"]="4";typelist.push(type4);
      var keyarry=["0"];
      var datalist=res.data;
      typelist.map(val => {
                val.children = getChildrenList(val.ME_TYPE, datalist);
                return val;
            });
      function getChildrenList(me_type, data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.ME_TYPE == me_type) {
                        return true;
                    }
                })
                return newList;
            }
      for(var i=typelist.length-1;i>=0;i--){
          var typeobj=typelist[i];
          if(typeobj.children==null || typeobj.children.length==0){
              typelist.splice(i,1);
          }
      }
      keyarry.push(typelist[0].ME_TYPE);
      keyarry.push(typelist[0].children[0].STCD);
      root.children=typelist;
      this.Treedata.push(root);
      this.keys=keyarry;
      this.STinfo=typelist[0].children[0];
      this.axios.get('/ldresult/maxinfo',{params: {metype:this.STinfo.ME_TYPE,stcd:this.STinfo.STCD,year:this.formb.tm}}).then(res => {
            var maxobj=res.data;
            this.loadTData(maxobj); 
            if(this.STinfo.ME_TYPE==1){
              this.$refs['div1'].style.display="";
              this.$refs['div2'].style.display="none";   
              this.$refs['div3'].style.display="none";      
            }else if(this.STinfo.ME_TYPE==2){
              this.$refs['div1'].style.display="none";
              this.$refs['div2'].style.display="";   
              this.$refs['div3'].style.display="none"; 
            }else if(this.STinfo.ME_TYPE==3){
              this.$refs['div1'].style.display="none";
              this.$refs['div2'].style.display="none";   
              this.$refs['div3'].style.display="";
            }
            this.InitData();
          });
      });
     },
     //点击站点叶节点事件
     type_tree(data){
      if (data.ZD_SIGN == 1) {
        this.STinfo = data;
        if(data.ME_TYPE==1 || data.ME_TYPE==2 || data.ME_TYPE==3){
          this.axios.get('/ldresult/maxinfo',{params: {metype:data.ME_TYPE,stcd:data.STCD,year:this.formb.tm}}).then(res => {
            var maxobj=res.data;
            this.loadTData(maxobj);
            if(this.STinfo.ME_TYPE==1){
              this.$refs['div1'].style.display="";
              this.$refs['div2'].style.display="none";   
              this.$refs['div3'].style.display="none";      
            }else if(this.STinfo.ME_TYPE==2){
              this.$refs['div1'].style.display="none";
              this.$refs['div2'].style.display="";   
              this.$refs['div3'].style.display="none"; 
            }else if(this.STinfo.ME_TYPE==3){
              this.$refs['div1'].style.display="none";
              this.$refs['div2'].style.display="none";   
              this.$refs['div3'].style.display="";
            }
            this.InitData();
          });
        }
        
      }
    },
    //重置表单
    InitData(){
            var dateformat=this.getNowDate();
            this.formb.tm = dateformat;
            this.formx.tm = dateformat;
            this.forms.tm = dateformat;
            this.formb.z='';
            this.formx.z='';
            this.forms.fz='';
            this.forms.bz='';
            this.forms.hi='';
            this.formb.q='';
            this.formx.q='';
            this.forms.q='';
    },
    //计算
    onCaculate(meType){
       var regPos = /^\d+(\.\d+)?$/;
        var p_obj=new Object();
            p_obj.metype=this.STinfo.ME_TYPE;
        if(meType==1){
            if(this.formb.z==''){
               this.$message({message:'请输入水深！',type:'warning'});
               return;
            }
            if(!regPos.test(this.formb.z)){
              this.$message({message:'水深为数字！',type:'warning'});
              return;
            }
            p_obj.b=this.Titileinfo.B;
            p_obj.m=this.Titileinfo.M;
            p_obj.n=this.Titileinfo.N;
            p_obj.i=this.Titileinfo.I;
            p_obj.z=this.formb.z;
            p_obj.types=this.Titileinfo.TYPES;
            if(this.Titileinfo==""){
              this.$message({message:this.STinfo.STNM+this.formb.tm+'年标准断面参数不存在！',type:'warning'});
              return;
            }
        }else if(meType==2){
            if(this.formx.z==''){
               this.$message({message:'请输入水深！',type:'warning'});
               return;
            }
            if(!regPos.test(this.formx.z)){
              this.$message({message:'水深为数字！',type:'warning'});
              return;
            }
            p_obj.model=this.Titileinfo.MODEL;
            p_obj.z=this.formx.z;
        }else{
            if(this.forms.fz==''){
               this.$message({message:'请输入闸前水深！',type:'warning'});
               return;
            }
            if(!regPos.test(this.forms.fz)){
              this.$message({message:'闸前水深为数字！',type:'warning'});
              return;
            }
            if(this.forms.bz==''){
               this.$message({message:'请输入闸后水深！',type:'warning'});
               return;
            }
            if(!regPos.test(this.forms.bz)){
              this.$message({message:'闸后水深为数字！',type:'warning'});
              return;
            }
            if(this.forms.hi==''){
               this.$message({message:'请输入闸门开度！',type:'warning'});
               return;
            }
            if(!regPos.test(this.forms.hi)){
              this.$message({message:'闸门开度为数字！',type:'warning'});
              return;
            }
            p_obj.gthlntwd=this.Titileinfo.GTHLNTWD;
            p_obj.hi=this.forms.hi;
            p_obj.fz=this.forms.fz;
            p_obj.bz=this.forms.bz;
        }
        this.axios.post('/ldresult/getq',p_obj).then((res)=>{
          var q=res.data;
            if(q!=-1 && q!="NaN"){
              if(meType==1){
                this.formb.q=parseFloat(q).toFixed(3);
              }else if(meType==2){
                this.formx.q=parseFloat(q).toFixed(3);
              }else{
                this.forms.q=parseFloat(q).toFixed(3);
              }
            }else{
                this.$message({message:'数据输入有误，请核对相关数据!',type:'warning'});
            }                   
        });
    },
    //获取当前日期
    getNowDate(){
       var date = new Date();
        return date.getFullYear().toString();
    },
    //水深改吧，流量清零
    clearq(sign){
      if(sign==1){
        this.formb.q='';
      }else if(sign==2){
        this.formx.q='';
      }else{
        this.forms.q='';
      }
    },
    //根据年份修改标准断面参数信息
    timechange(date){
      this.axios.get('/ldresult/maxinfo',{params: {metype:this.STinfo.ME_TYPE,stcd:this.STinfo.STCD,year:date}}).then(res => {
            var maxobj=res.data;
            this.loadTData(maxobj);
          });
      },
    //修改糙率
    onUpdateCl(){
      var u_obj=new Object();
      u_obj.stcd=this.STinfo.STCD;
      u_obj.n=this.Titileinfo.N;
      u_obj.year=this.formb.tm;
      this.axios.get('/ldresult/modifycl',{params: u_obj}).then(res => {
          if(res.data=="ok"){
            this.$message({message:'糙率修改成功！',type:'success'});
          }else{
            this.$message({message:this.formb.tm+'年无糙率数据！',type:'warm'});
          }
      });
    },
    //保存到率定结果表
    onSave(meType){
      var s_obj=new Object();
      s_obj.stcd=this.STinfo.STCD;
      s_obj.stnm=this.STinfo.STNM;
      if(meType==1){
        if(this.formb.q==''){
          this.$message({message:'请先计算流量!',type:'warning'});
          return;
        }
        s_obj.year=this.formb.tm;
        s_obj.z=this.formb.z;
        s_obj.q=this.formb.q;
      }else if(meType==2){
          if(this.formx.q==''){
          this.$message({message:'请先计算流量!',type:'warning'});
          return;
        } 
        s_obj.year=this.formx.tm;
        s_obj.z=this.formx.z;
        s_obj.q=this.formx.q;
      }else{
        if(this.forms.q==''){
          this.$message({message:'请先计算流量!',type:'warning'});
          return;
        }
        s_obj.year=this.forms.tm;
        s_obj.z=this.forms.fz;
        s_obj.q=this.forms.q;
      }
      this.axios.get('/ldresult/existresult',{params: s_obj}).then(res => {
          if(res.data==0){
            this.axios.post('/ldresult/addeqrl',s_obj).then((res)=>{
            if(res.data=="ok"){
                this.$message({message:s_obj.stnm+'水位流量数据保存成功！',type:'success'});
            }                   
        });
          }else{
            this.$message({message:s_obj.stnm+s_obj.year+'年水深为'+s_obj.z+'m的数据已存在!',type:'warning'});
          }
      });
    },  
  }
}
</script>
<style lang="less" scoped>
html, body {
    width: 100%;
    height: 100%;
}
.table_show {
 font-size: 14px;
 border:1px solid #C7CCD6;
 border-collapse:collapse; 
 td {
    height: 45px;
    border-top: none;
    border:1px solid #C7CCD6;
  }

  .dt_name {
    width: 10%;
    text-align: right;
  }

  .dt_vale {
    width: 15%;
    text-align: center;
  }
}
</style>