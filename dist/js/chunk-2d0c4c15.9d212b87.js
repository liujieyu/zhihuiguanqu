(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c4c15"],{"3bd4":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Breadcrumb",{style:{margin:"0 0 24px 0"}},[a("BreadcrumbItem",[e._v("基础数据")]),a("BreadcrumbItem",[e._v("灌区信息")])],1),a("Tabs",{attrs:{value:"jbxx"}},[a("TabPane",{attrs:{label:"基本信息",name:"jbxx"}},[a("Basedata")],1),a("TabPane",{attrs:{label:"机构信息",name:"jgxx"}},[a("JGXX")],1),a("TabPane",{attrs:{label:"人员信息",name:"ryxx"}},[a("RYXX")],1)],1)],1)},i=[],n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Content",{style:{padding:"24px",background:"#fff"}},[a("Row",{attrs:{type:"flex",gutter:16,justify:"start"}},[a("Col",[e._v("\n                            灌区规模:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},attrs:{clearable:""},on:{"on-change":e.GQGMsearch},model:{value:e.gqgm.Field,callback:function(t){e.$set(e.gqgm,"Field",t)},expression:"gqgm.Field"}},e._l(e.gqgm.IRASC,function(t){return a("Option",{key:t.Field,attrs:{value:t.Field}},[e._v(e._s(t.FieldName))])}),1)],1),a("Col",[e._v("\n                            水源工程类别:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},attrs:{clearable:""},on:{"on-change":e.SYGCsearch},model:{value:e.sygclb.Field,callback:function(t){e.$set(e.sygclb,"Field",t)},expression:"sygclb.Field"}},e._l(e.sygclb.IARHWPRTP,function(t){return a("Option",{key:t.Field,attrs:{value:t.Field}},[e._v(e._s(t.FieldName))])}),1)],1),a("Col",[a("Input",{staticStyle:{width:"auto","margin-right":"10px"},attrs:{search:"","enter-button":"",suffix:"ios-search",placeholder:"请输入灌区名称"},on:{"on-search":e.search},model:{value:e.form.searchmsg,callback:function(t){e.$set(e.form,"searchmsg",t)},expression:"form.searchmsg"}})],1),a("Col",[a("Button",{staticStyle:{width:"auto","margin-right":"20px"},attrs:{type:"primary"},on:{click:e.err}},[e._v("导出")])],1)],1),a("Divider"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.data,border:"",height:"450"}},[a("el-table-column",{attrs:{label:" ",type:"index",align:"center",width:"65",fixed:"left",index:e.indexMethod}}),a("el-table-column",{attrs:{prop:"IRANM",label:"灌区名称",align:"center",fixed:"left"}}),a("el-table-column",{attrs:{prop:"WTPLNM",label:"水源名称",align:"center"}}),a("el-table-column",{attrs:{prop:"IARHWPRTP",label:"水源工程类别",align:"center"}}),a("el-table-column",{attrs:{prop:"IRASC",label:"灌区规模",align:"center"}}),a("el-table-column",{attrs:{prop:"DTST",label:"排水标准",align:"center"}}),a("el-table-column",{attrs:{prop:"IRRN",label:"灌溉范围",align:"center"}}),a("el-table-column",{attrs:{prop:"DSYFL",label:"设计年引水量(10⁸m³)",align:"center"}}),a("el-table-column",{attrs:{prop:"INGYFL",label:"正常年引水量(10⁸m³)",align:"center"}}),a("el-table-column",{attrs:{prop:"DSIRAR",label:"设计灌溉面积(亩)",align:"center"}}),a("el-table-column",{attrs:{prop:"ACIRAR",label:"实际灌溉面积(亩)",align:"center"}}),a("el-table-column",{attrs:{prop:"CNHDDVFL",label:"渠首设计引水流量(m³/s)",align:"center"}}),a("el-table-column",{attrs:{prop:"CNINGYFL",label:"渠首正常年引水流量(m³/s)",align:"center"}}),a("el-table-column",{attrs:{prop:"MNCHLEN",label:"总干渠长度(km)",align:"center"}}),a("el-table-column",{attrs:{prop:"ANPP",label:"年降水情况(mm)",align:"center"}})],1),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.list_input.total,current:e.list_input.current,"show-sizer":"","page-size":e.list_input.pagesize,"page-size-opts":e.list_input.pagesizeopts,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.CurrentChange,"on-page-size-change":e.PagesizeChange}})],1)])],1)],1)},s=[],r={data:function(){return{loading:!1,date:"",data:[],sygclb:{IARHWPRTP:[],Field:""},gqgm:{IRASC:[],Field:""},form:{searchmsg:""},list_input:{total:100,pagesize:50,pagesizeopts:[10,20,50,75,100,200],current:1},searchs:""}},mounted:function(){this.Reload()},methods:{GQGMsearch:function(){this.Reload()},SYGCsearch:function(){this.Reload()},err:function(){this.$Message.warning("该功能还在开发中...")},search:function(){""!==this.form.searchmsg?this.searchs="&IRANM="+this.form.searchmsg:this.searchs="",this.Reload()},indexMethod:function(e){return e+1+this.list_input.pagesize*(this.list_input.current-1)},timechange:function(e){console.log(e),this.date=e},Reload:function(){var e=this;this.loading=!0,this.axios.get("/guanqu/jichuxinxi/guanqu_jiben?_page_size="+this.list_input.pagesize+"&_page="+this.list_input.current+this.searchs,{params:{IARHWPRTP:this.sygclb.Field,IRASC:this.gqgm.Field}}).then(function(t){console.log(t),e.loading=!1,e.data=t.data.list,e.list_input.total=t.data.total;for(var a=0;a<e.data.length;a++);}),this.axios.get("/guanqu/admin/WRP_FieldInfo?FieldID=IARHWPRTP").then(function(t){e.sygclb.IARHWPRTP=t.data.list}),this.axios.get("/guanqu/admin/WRP_FieldInfo?FieldID=IRASC").then(function(t){e.gqgm.IRASC=t.data.list})},CurrentChange:function(e){this.list_input.current=e,this.Reload()},PagesizeChange:function(e){this.list_input.pagesize=e,this.Reload()}}},o=r,c=a("2877"),u=Object(c["a"])(o,n,s,!1,null,null,null),d=u.exports,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Content",{style:{padding:"24px",background:"#fff"}},[a("Row",{staticStyle:{display:"flex","justify-content":"flex-start"},attrs:{type:"flex",gutter:16,justify:"start"}},[a("Col",[a("Input",{staticStyle:{width:"auto","margin-right":"10px"},attrs:{search:"","enter-button":"",suffix:"ios-search",placeholder:"请输入机构名称"},on:{"on-search":e.search},model:{value:e.form.searchmsg,callback:function(t){e.$set(e.form,"searchmsg",t)},expression:"form.searchmsg"}})],1),a("Col",[a("Button",{staticStyle:{width:"auto","margin-right":"20px"},attrs:{type:"primary"},on:{click:e.err}},[e._v("导出")])],1)],1),a("Divider"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.data,border:"",height:"450"}},[a("el-table-column",{attrs:{label:" ",type:"index",align:"center",width:"65",fixed:"left",index:e.indexMethod}}),a("el-table-column",{attrs:{prop:"Organ_Name",label:"机构名称",align:"center",fixed:"left"}}),a("el-table-column",{attrs:{prop:"Male_Employee_Number",label:"男职工人数",align:"center"}}),a("el-table-column",{attrs:{prop:"FeMale_Employee_Number",label:"女职工人数",align:"center"}}),a("el-table-column",{attrs:{prop:"Senior_Number",label:"高工人数",align:"center"}}),a("el-table-column",{attrs:{prop:"Engineer_Number",label:"工程师人数",align:"center"}}),a("el-table-column",{attrs:{prop:"Upper_Major",label:"大专以上人数",align:"center"}}),a("el-table-column",{attrs:{prop:"DSIRAR",label:"上级机构",align:"center"}})],1),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.list_input.total,current:e.list_input.current,"show-sizer":"","page-size":e.list_input.pagesize,"page-size-opts":e.list_input.pagesizeopts,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.CurrentChange,"on-page-size-change":e.PagesizeChange}})],1)])],1)],1)},h=[],p={data:function(){return{loading:!1,date:"",data:[],searchs:"",form:{searchmsg:""},list_input:{total:100,pagesize:50,pagesizeopts:[10,20,50,75,100,200],current:1}}},mounted:function(){this.Reload()},methods:{err:function(){this.$Message.warning("该功能还在开发中...")},search:function(){""!==this.form.searchmsg?this.searchs="&Organ_Name="+this.form.searchmsg:this.searchs="",this.Reload()},indexMethod:function(e){return e+1+this.list_input.pagesize*(this.list_input.current-1)},timechange:function(e){console.log(e),this.date=e},Reload:function(){var e=this;this.loading=!0,this.axios.get("/guanqu/admin/WRP_IrrBSManageInstitution?_page_size="+this.list_input.pagesize+"&_page="+this.list_input.current+this.searchs).then(function(t){console.log(t),e.loading=!1,e.data=t.data.list,e.list_input.total=t.data.total;for(var a=0;a<e.data.length;a++);})},CurrentChange:function(e){this.list_input.current=e,this.Reload()},PagesizeChange:function(e){this.list_input.pagesize=e,this.Reload()}}},m=p,f=Object(c["a"])(m,g,h,!1,null,null,null),b=f.exports,_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Content",{style:{padding:"24px",background:"#fff"}},[a("Row",{attrs:{type:"flex",gutter:16,justify:"start"}},[a("Col",[e._v("\n                            岗位:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},attrs:{clearable:""},on:{"on-change":e.GWsearch},model:{value:e.gw.Field,callback:function(t){e.$set(e.gw,"Field",t)},expression:"gw.Field"}},e._l(e.shiList,function(t){return a("Option",{key:t,attrs:{value:t.value}},[e._v(e._s(t))])}),1)],1),a("Col",[e._v("\n                            性别:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},attrs:{clearable:""},on:{"on-change":e.XBsearch},model:{value:e.xb.Field,callback:function(t){e.$set(e.xb,"Field",t)},expression:"xb.Field"}},e._l(e.shiList,function(t){return a("Option",{key:t,attrs:{value:t.value}},[e._v(e._s(t))])}),1)],1),a("Col",[e._v("\n                            职称:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},attrs:{clearable:""},on:{"on-change":e.ZCsearch},model:{value:e.zc.Field,callback:function(t){e.$set(e.zc,"Field",t)},expression:"zc.Field"}},e._l(e.zc.Positional_Title,function(t){return a("Option",{key:t.Field,attrs:{value:t.Field}},[e._v(e._s(t.FieldName))])}),1)],1),a("Col",[e._v("\n                            学历:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},attrs:{clearable:""},on:{"on-change":e.XLsearch},model:{value:e.xl.Field,callback:function(t){e.$set(e.xl,"Field",t)},expression:"xl.Field"}},e._l(e.xl.Educastional_Level,function(t){return a("Option",{key:t.Field,attrs:{value:t.Field}},[e._v(e._s(t.FieldName))])}),1)],1),a("Col",[a("Input",{staticStyle:{width:"auto","margin-right":"10px"},attrs:{search:"","enter-button":"",suffix:"ios-search",placeholder:"请输入姓名"},on:{"on-search":e.search},model:{value:e.form.searchmsg,callback:function(t){e.$set(e.form,"searchmsg",t)},expression:"form.searchmsg"}})],1),a("Col",[a("Button",{staticStyle:{width:"auto","margin-right":"20px"},attrs:{type:"primary"},on:{click:e.err}},[e._v("导出")])],1)],1),a("Divider"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.data,border:"",height:"450"}},[a("el-table-column",{attrs:{label:" ",type:"index",align:"center",width:"65",fixed:"left",index:e.indexMethod}}),a("el-table-column",{attrs:{prop:"Personal_Name",label:"姓名",align:"center",fixed:"left"}}),a("el-table-column",{attrs:{prop:"Sex",label:"性别",align:"center"}}),a("el-table-column",{attrs:{prop:"Age",label:"年龄",align:"center"}}),a("el-table-column",{attrs:{prop:"Offical_Rank",label:"职务",align:"center"}}),a("el-table-column",{attrs:{prop:"Positional_Title",label:"职称",align:"center"}}),a("el-table-column",{attrs:{prop:"Educastional_Level",label:"学历",align:"center"}}),a("el-table-column",{attrs:{prop:"Work_Time",label:"参加工作时间",align:"center"}}),a("el-table-column",{attrs:{prop:"Working_Life",label:"工作年限",align:"center"}}),a("el-table-column",{attrs:{prop:"",label:"机构",align:"center"}})],1),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.list_input.total,current:e.list_input.current,"show-sizer":"","page-size":e.list_input.pagesize,"page-size-opts":e.list_input.pagesizeopts,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.CurrentChange,"on-page-size-change":e.PagesizeChange}})],1)])],1)],1)},x=[],v={data:function(){return{loading:!1,date:"",data:[],form:{searchmsg:""},gw:{Post_Code:[],Field:""},xb:{Sex:[],Field:""},zc:{Positional_Title:[],Field:""},xl:{Educastional_Level:[],Field:""},list_input:{total:100,pagesize:50,pagesizeopts:[10,20,50,75,100,200],current:1},searchs:""}},mounted:function(){this.GetFilterMethods(),this.Reload()},methods:{GWsearch:function(){this.Reload()},XBsearch:function(){this.Reload()},ZCsearch:function(){this.Reload()},XLsearch:function(){this.Reload()},err:function(){this.$Message.warning("该功能还在开发中...")},search:function(){""!=this.form.searchmsg?this.searchs="&Personal_Name=like,"+this.form.searchmsg:this.searchs="",this.Reload()},indexMethod:function(e){return e+1+this.list_input.pagesize*(this.list_input.current-1)},Reload:function(){var e=this;this.loading=!0,this.axios.get("/guanqu/admin/WRP_IrrBSPerson?_page_size="+this.list_input.pagesize+"&_page="+this.list_input.current+this.searchs,{params:{Post_Code:this.gw.Field,Sex:this.xb.Field,Positional_Title:this.zc.Field,Educastional_Level:this.xl.Field}}).then(function(t){console.log(t),e.loading=!1,e.data=t.data.list,e.list_input.total=t.data.total;for(var a=0;a<e.data.length;a++);})},GetFilterMethods:function(){var e=this;this.axios.get("/guanqu/admin/WRP_FieldInfo?FieldID=Post_Code").then(function(t){e.gw.Post_Code=t.data.list}),this.axios.get("/guanqu/admin/WRP_FieldInfo?FieldID=Sex").then(function(t){e.xb.Sex=t.data.list}),this.axios.get("/guanqu/admin/WRP_FieldInfo?FieldID=Positional_Title").then(function(t){e.zc.Positional_Title=t.data.list}),this.axios.get("/guanqu/admin/WRP_FieldInfo?FieldID=Educastional_Level").then(function(t){e.xl.Educastional_Level=t.data.list})},CurrentChange:function(e){this.list_input.current=e,this.Reload()},PagesizeChange:function(e){this.list_input.pagesize=e,this.Reload()}}},R=v,F=Object(c["a"])(R,_,x,!1,null,null,null),y=F.exports,z={data:function(){return{}},mounted:function(){},methods:{},computed:{},components:{Basedata:d,JGXX:b,RYXX:y}},w=z,C=Object(c["a"])(w,l,i,!1,null,null,null);t["default"]=C.exports}}]);