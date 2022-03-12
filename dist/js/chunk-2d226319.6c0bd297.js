(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d226319"],{e82b:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("Breadcrumb",{style:{margin:"0 0 24px 0"}},[i("BreadcrumbItem",[e._v("系统权限")]),i("BreadcrumbItem",[e._v("菜单管理")])],1),i("el-row",{staticStyle:{"margin-bottom":"30px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("新增菜单")])],1),i("el-container",{staticStyle:{height:"100%",border:"1px solid #eee"}},[i("el-aside",{staticStyle:{"background-color":"#fff",height:"800px"},attrs:{width:"200px"}},[i("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"tree",staticClass:"filter-tree",attrs:{data:e.data,"default-expand-all":""},on:{"node-click":e.handleNodeClick}})],1),i("el-main",{staticStyle:{position:"relative"}},[e.tipshow?i("p",{staticStyle:{"font-size":"14px","margin-top":"25%",position:"absolute",left:"40%"}},[e._v("请在左侧树形图选择菜单")]):e._e(),e.addShow?i("div",[i("h2",[e._v("新增菜单")]),i("el-form",{ref:"form",staticStyle:{margin:"30px"},attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"菜单名称",prop:"name"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),i("el-form-item",{attrs:{label:"URL"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1),i("el-form-item",{attrs:{label:"排序"}},[i("el-input-number",{attrs:{min:1,label:"描述文字"},model:{value:e.form.index,callback:function(t){e.$set(e.form,"index",t)},expression:"form.index"}})],1),i("el-form-item",{attrs:{label:"位置"}},[i("el-cascader",{attrs:{options:e.menus_list,props:{checkStrictly:!0},clearable:""},model:{value:e.form.fatherId,callback:function(t){e.$set(e.form,"fatherId",t)},expression:"form.fatherId"}})],1),i("el-form-item",{attrs:{label:"菜单类型"}},[i("el-select",{attrs:{placeholder:"请选择菜单类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[i("el-option",{attrs:{label:"菜单",value:"菜单"}}),i("el-option",{attrs:{label:"选项卡",value:"选项卡"}})],1)],1),i("el-form-item",{attrs:{label:"图标"}},[i("el-select",{attrs:{placeholder:"请选择图标"},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}},[i("el-option",{attrs:{label:"图标类型一",value:"shanghai"}}),i("el-option",{attrs:{label:"图标类型二",value:"beijing"}})],1)],1),i("el-form-item",{attrs:{label:"备注"}},[i("el-input",{staticStyle:{width:"700px"},attrs:{type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),i("el-form-item",{staticStyle:{"margin-top":"40px"}},[i("el-button",{attrs:{type:"primary"},on:{click:e.Save}},[e._v("确定")]),i("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"info"},on:{click:function(t){return e.resetForm()}}},[e._v("重置")])],1)],1)],1):e._e(),e.dialog_detail_showing?i("div",[i("h2",[e._v("菜单信息")]),i("el-form",{ref:"form2",staticStyle:{margin:"30px"},attrs:{model:e.form2,"label-width":"140px"}},[i("el-form-item",{attrs:{label:"菜单名称:"}},[e._v(e._s(this.form2.name))]),i("el-form-item",{attrs:{label:"URL:"}},[e._v(e._s(this.form2.url))]),i("el-form-item",{attrs:{label:"排序:"}},[i("el-input-number",{attrs:{min:1,label:"描述文字"},model:{value:e.form2.index,callback:function(t){e.$set(e.form2,"index",t)},expression:"form2.index"}})],1),i("el-form-item",{attrs:{label:"创建时间:"}},[e._v(e._s(this.form2.ctime.replace("T"," ").substr(0,19)))]),i("el-form-item",{attrs:{label:"创建人:"}},[e._v(e._s(this.form2.creator))]),i("el-form-item",{attrs:{label:"最后一次修改时间:"}},[e._v(e._s(this.form2.upTime.replace("T"," ").substr(0,19)))]),i("el-form-item",{attrs:{label:"最后一次修改人:"}},[e._v(e._s(this.form2.modifier))]),i("el-form-item",{attrs:{label:"位置:"}},[e._v(e._s(this.form2.namelist))]),i("el-form-item",{attrs:{label:"菜单类型:"}},[e._v(e._s(this.form2.type))]),i("el-form-item",{attrs:{label:"图标:"}},[i("i",{staticClass:"el-icon-help"})]),i("el-form-item",{attrs:{label:"备注:"}},[e._v(e._s(this.form2.remark))]),i("el-form-item",{staticStyle:{"margin-top":"40px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.openEdit()}}},[e._v("修改菜单")]),i("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"primary"},on:{click:function(t){return e.deldetail()}}},[e._v("删除菜单")]),i("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"primary"},on:{click:function(t){return e.closedetail()}}},[e._v("关闭")])],1)],1)],1):e._e(),e.editShow?i("div",[i("h2",[e._v("修改菜单")]),i("el-form",{ref:"form3",staticStyle:{margin:"30px"},attrs:{model:e.form3,"label-width":"130px"}},[i("el-form-item",{attrs:{label:"菜单名称"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form3.name,callback:function(t){e.$set(e.form3,"name",t)},expression:"form3.name"}})],1),i("el-form-item",{attrs:{label:"URL"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form3.url,callback:function(t){e.$set(e.form3,"url",t)},expression:"form3.url"}})],1),i("el-form-item",{attrs:{label:"排序"}},[i("el-input-number",{attrs:{min:1,label:"描述文字"},model:{value:e.form3.index,callback:function(t){e.$set(e.form3,"index",t)},expression:"form3.index"}})],1),i("el-form-item",{attrs:{label:"创建时间"}},[i("el-date-picker",{staticStyle:{width:"350px"},attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.form3.ctime,callback:function(t){e.$set(e.form3,"ctime",t)},expression:"form3.ctime"}})],1),i("el-form-item",{attrs:{label:"创建人"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form3.creator,callback:function(t){e.$set(e.form3,"creator",t)},expression:"form3.creator"}})],1),i("el-form-item",{attrs:{label:"最后一次修改时间"}},[i("el-date-picker",{staticStyle:{width:"350px"},attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.form3.upTime,callback:function(t){e.$set(e.form3,"upTime",t)},expression:"form3.upTime"}})],1),i("el-form-item",{attrs:{label:"最后一次修改人"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form3.modifier,callback:function(t){e.$set(e.form3,"modifier",t)},expression:"form3.modifier"}})],1),i("el-form-item",{attrs:{label:"位置"}},[i("el-cascader",{attrs:{options:e.menus_list,props:{checkStrictly:!0},clearable:""},model:{value:e.form3.idlist,callback:function(t){e.$set(e.form3,"idlist",t)},expression:"form3.idlist"}})],1),i("el-form-item",{attrs:{label:"菜单类型"}},[i("el-select",{attrs:{placeholder:"请选择菜单类型"},model:{value:e.form3.type,callback:function(t){e.$set(e.form3,"type",t)},expression:"form3.type"}},[i("el-option",{attrs:{label:"菜单",value:"菜单"}}),i("el-option",{attrs:{label:"选项卡",value:"选项卡"}})],1)],1),i("el-form-item",{attrs:{label:"图标"}},[i("el-select",{attrs:{placeholder:"请选择图标"},model:{value:e.form3.icon,callback:function(t){e.$set(e.form3,"icon",t)},expression:"form3.icon"}},[i("el-option",{attrs:{label:"图标类型一",value:"shanghai"}}),i("el-option",{attrs:{label:"图标类型二",value:"beijing"}})],1)],1),i("el-form-item",{staticStyle:{width:"700px"},attrs:{label:"备注"}},[i("el-input",{attrs:{type:"textarea"},model:{value:e.form3.remark,callback:function(t){e.$set(e.form3,"remark",t)},expression:"form3.remark"}})],1),i("el-form-item",{staticStyle:{"margin-top":"40px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit()}}},[e._v("确定修改")]),i("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"info"},on:{click:e.closeedit}},[e._v("返回")])],1)],1)],1):e._e()])],1)],1)},l=[],r=(i("7f7f"),i("ac6a"),i("bd86")),a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("新增菜单")]),i("el-form",{ref:"form",staticStyle:{margin:"30px"},attrs:{model:e.form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"菜单名称"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),i("el-form-item",{attrs:{label:"URL"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1),i("el-form-item",{attrs:{label:"排序"}},[i("el-input-number",{attrs:{min:1,label:"描述文字"},model:{value:e.form.index,callback:function(t){e.$set(e.form,"index",t)},expression:"form.index"}})],1),i("el-form-item",{attrs:{label:"位置"}},[i("el-cascader",{attrs:{options:e.menus_list,props:{checkStrictly:!0},clearable:""},model:{value:e.form.fatherId,callback:function(t){e.$set(e.form,"fatherId",t)},expression:"form.fatherId"}})],1),i("el-form-item",{attrs:{label:"菜单类型"}},[i("el-select",{attrs:{placeholder:"请选择菜单类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[i("el-option",{attrs:{label:"菜单",value:"菜单"}}),i("el-option",{attrs:{label:"选项卡",value:"选项卡"}})],1)],1),i("el-form-item",{attrs:{label:"图标"}},[i("el-select",{attrs:{placeholder:"请选择图标"},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}},[i("el-option",{attrs:{label:"图标类型一",value:"shanghai"}}),i("el-option",{attrs:{label:"图标类型二",value:"beijing"}})],1)],1),i("el-form-item",{attrs:{label:"备注"}},[i("el-input",{staticStyle:{width:"700px"},attrs:{type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),i("el-form-item",{staticStyle:{"margin-top":"40px"}},[i("el-button",{attrs:{type:"primary"},on:{click:e.Save}},[e._v("确定")]),i("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"info"},on:{click:function(t){return e.resetForm()}}},[e._v("重置")])],1)],1),e._v("\n  "+e._s(e.form)+"\n")],1)},s=[],n={data:function(){return{form:{name:null,url:"",index:1,fatherId:[],type:"",icon:"",remark:""},menus_list:[]}},mounted:function(){this.Reload()},methods:{Reload:function(){var e=this;this.axios.get("/guanqu/web/menus/list").then(function(t){e.menus_list=t.data})},Save:function(){var e=this;0==this.form.fatherId.length?this.form.fatherId=null:this.form.fatherId=this.form.fatherId[this.form.fatherId.length-1],this.form.name?this.axios.post("/guanqu/web/menus/",{name:this.form.name,url:this.form.url,index:this.form.index,fatherId:this.form.fatherId,type:this.form.type,icon:this.form.icon,remark:this.form.remark}).then(function(t){e.$message({message:"添加成功",type:"success"}),e.$emit("closewindows"),e.resetForm()}):this.$message({message:"菜单名称不能为空!",type:"warning"})},resetForm:function(){this.form.name="",this.form.url="",this.form.index=1,this.form.fatherId="",this.form.type="",this.form.icon="",this.form.remark=""}},computed:{},components:{}},m=n,f=i("2877"),c=Object(f["a"])(m,a,s,!1,null,null,null),u=c.exports,d=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("菜单信息")]),i("el-form",{ref:"form",staticStyle:{margin:"30px"},attrs:{model:e.form,"label-width":"140px"}},[i("el-form-item",{attrs:{label:"菜单名称:"}},[e._v(e._s(this.form.name))]),i("el-form-item",{attrs:{label:"URL:"}},[e._v(e._s(this.form.url))]),i("el-form-item",{attrs:{label:"排序:"}},[i("el-input-number",{attrs:{min:1,max:10,label:"描述文字"},on:{change:e.handleChange},model:{value:e.form.index,callback:function(t){e.$set(e.form,"index",t)},expression:"form.index"}})],1),i("el-form-item",{attrs:{label:"创建时间:"}},[e._v(e._s(this.form.ctime.replace("T"," ").substr(0,19)))]),i("el-form-item",{attrs:{label:"创建人:"}},[e._v(e._s(this.form.creator))]),i("el-form-item",{attrs:{label:"最后一次修改时间:"}},[e._v(e._s(this.form.upTime.replace("T"," ").substr(0,19)))]),i("el-form-item",{attrs:{label:"最后一次修改人:"}},[e._v(e._s(this.form.modifier))]),i("el-form-item",{attrs:{label:"位置:"}},[e._v(e._s(this.form.position))]),i("el-form-item",{attrs:{label:"菜单类型:"}},[e._v(e._s(this.form.type))]),i("el-form-item",{attrs:{label:"图标:"}},[i("i",{staticClass:"el-icon-help"})]),i("el-form-item",{attrs:{label:"备注:"}},[e._v(e._s(this.form.remark))]),i("el-form-item",{staticStyle:{"margin-top":"40px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.openEdit()}}},[e._v("修改菜单")]),i("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"primary"},on:{click:function(t){return e.del()}}},[e._v("删除菜单")]),i("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"primary"},on:{click:function(t){return e.close()}}},[e._v("关闭")])],1)],1),i("el-dialog",{attrs:{title:"修改",visible:e.dialog_edit_showing,width:"800px","destroy-on-close":"","append-to-body":""},on:{"update:visible":function(t){e.dialog_edit_showing=t}}},[e.dialog_edit_showing?i("EDIT",{attrs:{id:e.menu.id},on:{closewindows:function(t){e.dialog_edit_showing=!1,e.Reload()}}}):e._e()],1)],1)},h=[],p=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("修改菜单")]),i("el-form",{ref:"form",staticStyle:{margin:"30px"},attrs:{model:e.form,"label-width":"130px"}},[i("el-form-item",{attrs:{label:"菜单名称"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),i("el-form-item",{attrs:{label:"URL"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1),i("el-form-item",{attrs:{label:"排序"}},[i("el-input-number",{attrs:{min:1,max:10,label:"描述文字"},model:{value:e.form.index,callback:function(t){e.$set(e.form,"index",t)},expression:"form.index"}})],1),i("el-form-item",{attrs:{label:"创建时间"}},[i("el-date-picker",{staticStyle:{width:"350px"},attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.form.ctime,callback:function(t){e.$set(e.form,"ctime",t)},expression:"form.ctime"}})],1),i("el-form-item",{attrs:{label:"创建人"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form.creator,callback:function(t){e.$set(e.form,"creator",t)},expression:"form.creator"}})],1),i("el-form-item",{attrs:{label:"最后一次修改时间"}},[i("el-date-picker",{staticStyle:{width:"350px"},attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.form.upTime,callback:function(t){e.$set(e.form,"upTime",t)},expression:"form.upTime"}})],1),i("el-form-item",{attrs:{label:"最后一次修改人"}},[i("el-input",{staticStyle:{width:"350px"},model:{value:e.form.modifier,callback:function(t){e.$set(e.form,"modifier",t)},expression:"form.modifier"}})],1),i("el-form-item",{attrs:{label:"位置"}},[i("el-select",{attrs:{placeholder:"请选择位置"},model:{value:e.form.position,callback:function(t){e.$set(e.form,"position",t)},expression:"form.position"}},[i("el-option",{attrs:{label:"位置一",value:"shanghai"}}),i("el-option",{attrs:{label:"位置二",value:"beijing"}})],1)],1),i("el-form-item",{attrs:{label:"菜单类型"}},[i("el-select",{attrs:{placeholder:"请选择菜单类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[i("el-option",{attrs:{label:"菜单类型一",value:"shanghai"}}),i("el-option",{attrs:{label:"菜单类型二",value:"beijing"}})],1)],1),i("el-form-item",{attrs:{label:"图标"}},[i("el-select",{attrs:{placeholder:"请选择图标"},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}},[i("el-option",{attrs:{label:"图标类型一",value:"shanghai"}}),i("el-option",{attrs:{label:"图标类型二",value:"beijing"}})],1)],1),i("el-form-item",{staticStyle:{width:"700px"},attrs:{label:"备注"}},[i("el-input",{attrs:{type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),i("el-form-item",{staticStyle:{"margin-top":"40px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit()}}},[e._v("确定修改")]),i("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"info"},on:{click:e.close}},[e._v("返回")])],1)],1)],1)},b=[],x={props:{id:""},data:function(){return{form:{}}},mounted:function(){this.Reload()},methods:{Reload:function(){var e=this;this.axios.get("/guanqu/web/menus/"+this.id).then(function(t){e.form=t.data})},onSubmit:function(){var e=this;""==this.form.fatherId&&(this.form.fatherId=null),this.axios.put("/guanqu/web/menus/",{id:this.form.id,name:this.form.name,url:this.form.url,index:this.form.index,fatherId:this.form.fatherId,type:this.form.type,icon:this.form.icon,remark:this.form.remark}).then(function(t){e.$message({message:"修改菜单成功",type:"success"})})},close:function(){this.$emit("closewindows")}},computed:{},components:{}},v=x,g=Object(f["a"])(v,p,b,!1,null,null,null),y=g.exports,_={props:{id:""},data:function(){return{form:{},dialog_edit_showing:!1,menu:{id:""}}},mounted:function(){console.log(this.id),this.Reload()},methods:{Reload:function(){var e=this;this.axios.get("/guanqu/web/menus/"+this.id).then(function(t){e.form=t.data})},del:function(){var e=this;this.$confirm("您确定删除该菜单吗?","",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.axios.delete("/guanqu/web/menus/"+e.id).then(function(t){e.$emit("closewindows"),e.$message({type:"success",message:"删除菜单成功!"})})}).catch(function(){e.$message({type:"error",message:"已取消删除"})})},openEdit:function(){this.menu.id=this.form.id,this.dialog_edit_showing=!0},close:function(){this.$emit("closewindows")}},computed:{},components:{EDIT:y}},w=_,k=Object(f["a"])(w,d,h,!1,null,null,null),S=k.exports,$=i("8271"),I={data:function(){var e;return e={loading:!1,addShow:!1,dialog_detail_showing:!1,editShow:!1,tipshow:!0,data:[],menu:{},form:{name:"",url:"",index:1,fatherId:[],type:"",icon:"",remark:""},rules:{name:[{required:!0,message:"请输入菜单名",trigger:"blur"}]},menus_list:[],form2:{},dialog_edit_showing:!1},Object(r["a"])(e,"menu",{id:""}),Object(r["a"])(e,"form3",{}),e},mounted:function(){this.Reload()},methods:{Reload:function(){var e=this;this.loading=!0,this.axios.get("/guanqu/web/menus/list").then(function(t){e.data=t.data,e.menus_list=t.data,$["a"].$emit("demo","msg"),e.loading=!1})},add:function(){this.addShow=!0,this.dialog_detail_showing=!1,this.editShow=!1,this.tipshow=!1},handleNodeClick:function(e){var t=this;console.log(e),this.axios.get("/guanqu/web/menus/"+e.id+"/view").then(function(e){t.form2=e.data.webMenu;var i=[],o=[];t.form2.namelist=o,t.form2.idlist=i,e.data.fatherList.forEach(function(e){t.form2.idlist.push(e.id),t.form2.namelist.push(e.name)}),t.form2.namelist=t.form2.namelist.join("/")}),this.dialog_detail_showing=!0,this.addShow=!1,this.tipshow=!1},openEdit:function(){var e=this;this.axios.get("/guanqu/web/menus/"+this.form2.id+"/view").then(function(t){e.form3=t.data.webMenu;var i=[];e.form3.idlist=i,t.data.fatherList.forEach(function(t){e.form3.idlist.push(t.id)})}),this.editShow=!0,this.dialog_detail_showing=!1,this.addShow=!1,this.tipshow=!1},onSubmit:function(){var e=this;this.form3.idlist==[]&&(this.form3.idlist=null),this.axios.put("/guanqu/web/menus/",{id:this.form3.id,name:this.form3.name,url:this.form3.url,index:this.form3.index,fatherId:this.form3.idlist[this.form3.idlist.length-1],type:this.form3.type,icon:this.form3.icon,remark:this.form3.remark}).then(function(t){e.$message({message:"修改菜单成功",type:"success"}),e.Reload(),e.editShow=!1,e.tipshow=!0})},closedetail:function(){this.dialog_detail_showing=!1,this.tipshow=!0},closeedit:function(){this.editShow=!1,this.dialog_detail_showing=!0},deldetail:function(){var e=this;this.$confirm("您确定删除该菜单吗?","",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.axios.delete("/guanqu/web/menus/"+e.form2.id).then(function(t){e.$message({message:"删除成功！",type:"success"}),e.dialog_detail_showing=!1,e.tipshow=!0,e.Reload()})}).catch(function(){})},resetForm:function(){this.form.name="",this.form.url="",this.form.index=1,this.form.fatherId="",this.form.type="",this.form.icon="",this.form.remark=""},Save:function(){var e=this;0==this.form.fatherId.length?this.form.fatherId=null:this.form.fatherId=this.form.fatherId[this.form.fatherId.length-1],this.form.name?this.axios.post("/guanqu/web/menus/",{name:this.form.name,url:this.form.url,index:this.form.index,fatherId:this.form.fatherId,type:this.form.type,icon:this.form.icon,remark:this.form.remark}).then(function(t){e.$message({message:"添加成功",type:"success"}),e.addShow=!1,e.tipshow=!0,e.Reload(),e.$emit("closewindows"),e.resetForm()}):this.$message({message:"菜单名称不能为空!",type:"warning"})}},computed:{},components:{ADD:u,DETAIL:S}},T=I,R=Object(f["a"])(T,o,l,!1,null,null,null);t["default"]=R.exports}}]);