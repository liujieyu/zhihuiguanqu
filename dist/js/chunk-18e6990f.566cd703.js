(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18e6990f"],{"0604":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Breadcrumb",{style:{margin:"0 0 24px 0"}},[a("BreadcrumbItem",[t._v("系统权限")]),a("BreadcrumbItem",[t._v("角色管理")])],1),a("el-row",{staticStyle:{margin:"30px 0"},attrs:{gutter:0,type:"flex",justify:"space-between"}},[a("el-col",{attrs:{span:24}},[a("el-input",{staticClass:"input-with-select",staticStyle:{"padding-top":"15px",width:"200px",float:"left"},attrs:{size:"small",placeholder:"","auto-complete":"true",clearable:!0},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){return t.ReLoad()}},slot:"append"})],1),a("div",{staticStyle:{float:"left","margin-left":"20px","margin-top":"15px"}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.dialog_add_showing=!0}}},[t._v("新增")]),a("el-button",{attrs:{type:"primary",size:"small"}},[t._v("导出")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.piliangDel()}}},[t._v("批量删除")])],1)],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",height:"550"},on:{"selection-change":t.selectRow}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{label:" ",type:"index",align:"center",width:"65",index:t.indexMethod}}),a("el-table-column",{attrs:{property:"name",label:"角色名",width:"120"}}),a("el-table-column",{attrs:{property:"grade",label:"等级",width:"100"}}),a("el-table-column",{attrs:{property:"ctime",label:"创建时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n        "+t._s(e.row.ctime)+"\n      ")]}}])}),a("el-table-column",{attrs:{property:"creator",label:"创建人"}}),a("el-table-column",{attrs:{property:"upTime",label:"最后一次修改时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n        "+t._s(e.row.upTime)+"\n      ")]}}])}),a("el-table-column",{attrs:{property:"modifier",label:"最后一次修改人",width:"120"}}),a("el-table-column",{attrs:{property:"remark",label:"备注"}}),a("el-table-column",{attrs:{label:"操作",width:"210",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.item=e.row,t.dialog_edit_showing=!0}}},[t._v("修改")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.item=e.row,t.dialog_power_showing=!0}}},[t._v("赋权")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.del(e.row)}}},[t._v("删除")])]}}])})],1),a("el-row",{attrs:{type:"flex"}},[a("el-col",[a("div",{staticStyle:{"margin-top":"30px","font-size":"14px",color:"rgb(166,173,180)"}},[t._v("\n        共"+t._s(t.list_input.total)+"条记录\n        第"+t._s(t.list_input.page)+"/"+t._s(t.list_input.pages)+"页\n      ")])]),a("el-col",[a("el-pagination",{staticStyle:{margin:"20px 0",float:"right"},attrs:{background:"","page-sizes":[10,20,50,100],"current-page":t.list_input.page,"page-size":t.list_input.page_size,layout:" prev, pager, next, sizes, jumper",total:t.list_input.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"新增",visible:t.dialog_add_showing,width:"1200px","append-to-body":""},on:{"update:visible":function(e){t.dialog_add_showing=e}}},[t.dialog_add_showing?a("ADDDIALOG",{on:{closewindows:function(e){t.dialog_add_showing=!1,t.ReLoad()}}}):t._e()],1),a("el-dialog",{attrs:{title:"修改",visible:t.dialog_edit_showing,width:"1200px","append-to-body":""},on:{"update:visible":function(e){t.dialog_edit_showing=e}}},[t.dialog_edit_showing?a("EDITDIALOG",{attrs:{id:t.item.id},on:{closewindows:function(e){t.dialog_edit_showing=!1,t.ReLoad()}}}):t._e()],1),a("el-dialog",{attrs:{title:"赋权",visible:t.dialog_power_showing,width:"1200px","append-to-body":""},on:{"update:visible":function(e){t.dialog_power_showing=e}}},[t.dialog_power_showing?a("POWERDIALOG",{attrs:{id:t.item.id},on:{closewindows:function(e){t.dialog_power_showing=!1,t.ReLoad()}}}):t._e()],1)],1)},n=[],o=(a("ac6a"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},[a("el-form",{ref:"form",staticStyle:{margin:"80px"},attrs:{rules:t.rules,model:t.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"角色名:",prop:"name"}},[a("el-input",{staticStyle:{width:"350px"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"角色等级:"}},[a("el-input-number",{attrs:{min:1},model:{value:t.form.grade,callback:function(e){t.$set(t.form,"grade",e)},expression:"form.grade"}}),t._v("\n        ≥自身等级\n      ")],1),a("el-form-item",{attrs:{label:"角色描述"}},[a("el-input",{staticStyle:{width:"700px"},attrs:{type:"textarea"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticStyle:{width:"700px"},attrs:{type:"textarea"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1)],1),a("div",{staticStyle:{width:"320px",margin:"0px auto"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.ADD()}}},[t._v("确定")]),a("el-button",{staticStyle:{float:"right"},attrs:{type:"info"},on:{click:t.del}},[t._v("取消")])],1)])}),l=[],s=(a("7f7f"),{props:{id:""},data:function(){return{form:{name:"",grade:"",description:"",remark:""},rules:{name:[{required:!0,trigger:"blur",message:"不能为空"}]}}},mounted:function(){},methods:{ADD:function(){var t=this;this.$confirm("是否确认新增内容","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.form.name?t.axios.post("/guanqu/web/sys-roles/",{name:t.form.name,grade:t.form.grade,description:t.form.description,remark:t.form.remark}).then(function(e){t.$message({type:"success",message:"新增用户成功!"}),t.$emit("closewindows")}):t.$message({type:"error",message:"必填项未输入，新增用户失败"})}).catch(function(){})},del:function(){this.$emit("closewindows")}},computed:{},watch:{}}),r=s,c=a("2877"),d=Object(c["a"])(r,o,l,!1,null,null,null),u=d.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},[a("el-form",{ref:"form",staticStyle:{margin:"80px"},attrs:{rules:t.rules,model:t.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"角色名:",prop:"name"}},[a("el-input",{staticStyle:{width:"350px"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"角色等级:"}},[a("el-input",{staticStyle:{width:"350px"},model:{value:t.form.grade,callback:function(e){t.$set(t.form,"grade",e)},expression:"form.grade"}})],1),a("el-form-item",{attrs:{label:"角色描述"}},[a("el-input",{staticStyle:{width:"700px"},attrs:{type:"textarea"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticStyle:{width:"700px"},attrs:{type:"textarea"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1)],1),a("div",{staticStyle:{width:"320px",margin:"0px auto"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.EDIT()}}},[t._v("确定")]),a("el-button",{staticStyle:{float:"right"},attrs:{type:"info"},on:{click:t.del}},[t._v("取消")])],1)])},m=[],f={props:{id:""},data:function(){return{form:{name:"",grade:"",description:"",remark:""},rules:{name:[{required:!0,trigger:"blur",message:"不能为空"}]}}},mounted:function(){console.log(this.id),this.Reload()},methods:{Reload:function(){var t=this;this.axios.get("/guanqu/web/sys-roles/"+this.id+"/vo").then(function(e){t.form=e.data})},EDIT:function(){var t=this;this.$confirm("是否确认修改内容","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.form.name?t.axios.put("/guanqu/web/sys-roles/",{id:t.id,name:t.form.name,grade:t.form.grade,description:t.form.description,remark:t.form.remark}).then(function(e){t.$message({type:"success",message:"修改用户成功!"}),t.$emit("closewindows"),t.Reload()}):t.$message({type:"error",message:"必填项未输入，修改用户失败"})}).catch(function(){})},del:function(){this.$emit("closewindows")}},computed:{},watch:{}},g=f,h=Object(c["a"])(g,p,m,!1,null,null,null),w=h.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("div",{staticStyle:{width:"50%",margin:"0 auto"}},[a("el-tree",{ref:"tree",staticClass:"filter-tree",attrs:{data:t.data,props:t.defaultProps,"node-key":"id","default-checked-keys":t.data1,"show-checkbox":""},on:{"check-change":t.handleCheckChange}})],1)]),a("div",{staticStyle:{display:"flex","justify-content":"flex-end"}},[a("el-button",{on:{click:t.del}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.POWER()}}},[t._v("确定")])],1)])},y=[],_={props:{id:""},data:function(){return{addShow:!1,detailShow:!1,editShow:!1,data:[],data1:[],loading:!1,idlist:[],defaultProps:{children:"children",label:"label"}}},mounted:function(){this.Reload()},methods:{Reload:function(){var t=this;this.loading=!0,this.axios.get("/guanqu/web/menus/list").then(function(e){t.data=e.data,t.loading=!1}),this.axios.get("/guanqu/web/sys-roles/"+this.id+"/-user/menuids/no-childrens").then(function(e){t.data1=e.data})},handleCheckChange:function(t,e){var a=this.$refs.tree.getCheckedNodes(),i=[];a.forEach(function(t){i.push(t.id)}),this.data1=i,console.log(this.data1)},del:function(){this.$emit("closewindows")},POWER:function(){var t=this;this.axios.put("/guanqu/web/sys-roles/"+this.id+"/menus",this.data1).then(function(e){t.$message({message:"赋权成功!",type:"success"}),t.$emit("closewindows")})}},computed:{},components:{}},v=_,x=Object(c["a"])(v,b,y,!1,null,null,null),k=x.exports,S=a("8271"),$={data:function(){return{loading:!1,value:"",timeValue:"",idList:[],item:{},list_input:{value:"",search:"",pages:1,page:1,page_size:10,total:100,filter:{}},dialog_add_showing:!1,dialog_edit_showing:!1,dialog_power_showing:!1,tableData:[]}},mounted:function(){this.ReLoad()},methods:{ReLoad:function(){var t=this;this.loading=!0,this.axios.get("/guanqu/web/sys-roles/page",{params:{page:this.list_input.page-1,size:this.list_input.page_size,name:this.value}}).then(function(e){t.tableData=e.data.list,t.list_input.total=e.data.totalCount,S["a"].$emit("demo","msg"),t.loading=!1,t.tableData.forEach(function(t){var e=new Date(t.ctime),a=new Date(t.upTime),i=e.getFullYear(),n=a.getFullYear(),o=e.getMonth()+1,l=a.getMonth()+1;o<10&&(o="0".concat(o)),l<10&&(l="0".concat(l));var s=e.getDate(),r=a.getDate();s<10&&(s="0".concat(s)),r<10&&(r="0".concat(r));var c=e.getHours(),d=a.getHours();c<10&&(c="0".concat(c)),d<10&&(d="0".concat(d));var u=e.getMinutes(),p=a.getMinutes();u<10&&(u="0".concat(u)),p<10&&(p="0".concat(p));var m=e.getSeconds(),f=a.getSeconds();m<10&&(m="0".concat(m)),f<10&&(f="0".concat(f)),t.ctime="".concat(i,"-").concat(o,"-").concat(s," ").concat(c,":").concat(u,":").concat(m),t.upTime="".concat(n,"-").concat(l,"-").concat(r," ").concat(d,":").concat(p,":").concat(f)})})},handleSizeChange:function(t){console.log(t),this.list_input.page=1,this.list_input.page_size=t,this.ReLoad()},indexMethod:function(t){return t+1+this.list_input.page_size*(this.list_input.page-1)},handleCurrentChange:function(t){this.list_input.page=t,this.ReLoad()},del:function(t){var e=this;console.log(t),this.$confirm("是否确认删除此角色","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.axios.delete("/guanqu/web/sys-roles/"+t.id).then(function(t){e.$message({type:"success",message:"删除角色成功!"}),e.ReLoad()})}).catch(function(){})},selectRow:function(t){var e=this;this.idList=[],t.forEach(function(t,a,i){e.idList.push(t.id)}),console.log(this.idList)},piliangDel:function(){var t=this;this.$confirm("是否确认批量删除已选用户","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){0==t.idList.length?t.$message({type:"error",message:"未选择用户，删除用户失败"}):t.axios.delete("/guanqu/web/sys-roles/batch-v1",{data:t.idList}).then(function(e){t.$message({type:"success",message:"删除用户成功!"}),t.ReLoad()})}).catch(function(){})}},computed:{},components:{ADDDIALOG:u,EDITDIALOG:w,POWERDIALOG:k}},D=$,L=(a("cf57"),Object(c["a"])(D,i,n,!1,null,null,null));e["default"]=L.exports},"0fba":function(t,e,a){},cf57:function(t,e,a){"use strict";var i=a("0fba"),n=a.n(i);n.a}}]);