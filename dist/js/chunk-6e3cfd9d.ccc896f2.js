(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e3cfd9d"],{4461:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Breadcrumb",{style:{margin:"0 0 24px 0"}},[e("BreadcrumbItem",[t._v("闸阀控制")]),e("BreadcrumbItem",[t._v("实时控制")])],1),e("div",[e("Content",{style:{padding:"24px",background:"#fff"}},[e("div",[e("Row",{attrs:{type:"flex",gutter:16,justify:"start"}},[e("Col",[t._v("\n            行政区划:\n            "),e("el-cascader",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"small",placeholder:"请选择地址",options:t.form.adressList,"change-on-select":""},on:{change:t.kaidulishibiao_init},model:{value:t.form.model_adress,callback:function(a){t.$set(t.form,"model_adress",a)},expression:"form.model_adress"}})],1),e("Col",[t._v("\n            渠道:\n            "),e("el-cascader",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"small",placeholder:"请选择渠道",options:t.form.qudaoList,"change-on-select":""},on:{change:t.kaidulishibiao_init},model:{value:t.form.model_qudao,callback:function(a){t.$set(t.form,"model_qudao",a)},expression:"form.model_qudao"}})],1),e("Col",[t._v("\n            管理机构:\n            "),e("el-cascader",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"small",placeholder:"请选择管理机构",options:t.form.guanliList,"change-on-select":""},on:{change:t.kaidulishibiao_init},model:{value:t.form.model_guanli,callback:function(a){t.$set(t.form,"model_guanli",a)},expression:"form.model_guanli"}})],1),e("Col",[t._v("\n            站点类型:\n            "),e("el-select",{staticStyle:{width:"160px"},attrs:{multiple:"","collapse-tags":"",clearable:"",size:"small",placeholder:"站点类型"},on:{change:t.kaidulishibiao_init},model:{value:t.form.model_site,callback:function(a){t.$set(t.form,"model_site",a)},expression:"form.model_site"}},t._l(t.form.siteList,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),e("Col",[e("Input",{staticStyle:{width:"auto","margin-right":"20px"},attrs:{search:"","enter-button":"",suffix:"ios-search",placeholder:"请输入站名"},on:{"on-search":t.kaidulishibiao_init},model:{value:t.form.search_str,callback:function(a){t.$set(t.form,"search_str",a)},expression:"form.search_str"}})],1),e("Col",[e("Button",{staticStyle:{width:"auto"},attrs:{type:"primary"},on:{click:t.err}},[t._v("导出")])],1)],1)],1),e("Divider"),e("Row",{staticStyle:{"font-size":"16px"}},[e("Col",{staticClass:"borsLine"},[t._v("\n          共"+t._s(t.counter.total)+"个站点\n        ")])],1),e("Divider",{staticStyle:{"margin-top":"0"}}),e("div",[e("Row",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"flex-wrap":"wrap"},attrs:{type:"flex",gutter:24}},t._l(t.table.SSXX.Rows,function(a,i){return e("Col",{staticStyle:{"margin-top":"20px"},attrs:{span:"6"}},[e("Card",[e("div",{attrs:{slot:"title"},slot:"title"},[e("img",{staticClass:"kaidulishi_img",staticStyle:{width:"100%",cursor:"pointer"},attrs:{src:"/guanqu/gis/pic_content?id="+a.rowinfo.STCD},on:{click:function(a){return t.fangda(t.table.kaidulishi.Rows,i)}}})]),e("Row",[e("Col",{attrs:{span:"6"}},[t._v("站名:")]),e("Col",{attrs:{span:"6"}},[e("span",{staticClass:"site_name",on:{click:function(e){return t.show_details(a)}}},[t._v(t._s(a.rowinfo.STNM))])]),e("Col",{attrs:{span:"6"}},[t._v("当前开度:")]),e("Col",{attrs:{span:"6"}},[t._v(t._s(a.rowinfo.OD))])],1),e("Row",[e("Col",{attrs:{span:"6"}},[t._v("当前状态:")]),e("Col",[t._v(t._s(a.rowinfo.state))])],1),e("Row",[e("Col",{attrs:{span:"6"}},[t._v("闸前水深:")]),e("Col",{attrs:{span:"6"}},[t._v(t._s(t.$FilterData.Float_Filter(a.rowinfo.upz)+"m"))]),e("Col",{attrs:{span:"6"}},[t._v("闸后水深:")]),e("Col",{attrs:{span:"6"}},[t._v(t._s(t.$FilterData.Float_Filter(a.rowinfo.dwz)+"m"))])],1),e("Row",[e("Col",{attrs:{span:"6"}},[t._v("过闸流量:")]),e("Col",[t._v(t._s(t.$FilterData.Float_Filter(a.rowinfo.q,3)+"m³/s"))])],1),e("Row",[e("Col",{attrs:{span:"6"}},[t._v("闸门开度:")]),e("Col",[t._v(t._s(a.rowinfo.OD))])],1),e("Row",[e("Col",{attrs:{span:"6"}},[t._v("所在渠道:")]),e("Col")],1)],1)],1)}),1)],1),e("el-dialog",{attrs:{title:"执行控制： "+t.kz.STNM,visible:t.dialogTableVisible,width:"1350px",fullscreen:!1,"close-on-click-modal":!1},on:{"update:visible":function(a){t.dialogTableVisible=a}}},[t.dialogTableVisible?e("div",{attrs:{id:"dialog_congzhi"}},[e("Row",{staticStyle:{margin:"0 0 20px 0"},attrs:{type:"flex",justify:"center",align:"middle",gutter:20}},[e("Col",{attrs:{span:"12"}},[e("div",[e("el-table",{attrs:{data:t.kz_lishi,height:"480",border:""}},[e("el-table-column",{attrs:{prop:"TM",label:"时间",width:"140"}}),e("el-table-column",{attrs:{prop:"OD",label:"开度(m)",width:""}}),e("el-table-column",{attrs:{prop:"UPZ",label:"闸前水深(m)",width:""}}),e("el-table-column",{attrs:{prop:"DWZ",label:"闸后水深(m)",width:""}}),e("el-table-column",{attrs:{prop:"Q",label:"过闸流量(m³/s)",width:""}})],1)],1)]),e("Col",{attrs:{span:"12"}},[e("div",{staticStyle:{margin:"10px auto",width:"640px",height:"480px",padding:"0"}},[e("iframe",{staticStyle:{width:"640px",height:"480px",border:"1px solid black"},attrs:{id:"video",src:t.video_iframe}})])])],1),e("Row",{staticStyle:{margin:"10px 10px"},attrs:{gutter:20}},[e("div",{staticStyle:{"text-align":"center"}},[e("header",[t._v("开度: "+t._s(t.kz.OD)+" m (最大允许： "+t._s(t.kz.MAX)+" m)")])])]),e("el-row",{staticStyle:{"text-align":"center"}},[e("div",{staticStyle:{margin:"10px"}},[e("el-slider",{attrs:{min:0,step:.01,max:t.kz.MAX},model:{value:t.kz.OD,callback:function(a){t.$set(t.kz,"OD",a)},expression:"kz.OD"}})],1),e("div",{staticStyle:{margin:"10px"}},[e("el-button",{attrs:{type:"danger",loading:t.run_button},on:{click:t.run}},[t._v("执行")]),e("el-button",{attrs:{type:""},on:{click:function(a){t.dialogTableVisible=!1}}},[t._v("关闭窗口")])],1)])],1):t._e()])],1)],1)],1)},s=[],o=e("59ad"),l=e.n(o),n=(e("ac6a"),e("a481"),e("f499")),r=e.n(n),d=e("aaf8"),c=e("a53b"),h=e("71da"),u=e.n(h),m={data:function(){return{run_button:!1,table:{kaidulishi:{Rows:[],loading:!1},SSXX:{Rows:[],loading:!1}},details:{rowinfo:null,current_OD:.5,split:.3,Interval:null},kz:{OD:0,STCD:"",STNM:"",MAX:10},kz_lishi:[],counter:{total:0},marks:{0:"0",50:{style:{color:"#1989FA"},label:this.$createElement("strong","1.00")},100:"2"},dialogTableVisible:!1,loading:!1,activeNames:[],list_input:{total:100,pagesize:48,pagesizeopts:[10,20,48,75,100,200],current:1},form:{adressList:[],qudaoList:[],siteList:[{value:"1",label:"闸门"},{value:"2",label:"阀门"}],model_site:[],model_adress:"",zdlx:"",model_qudao:"",model_guanli:"",date:"",search_str:null,xzqh:"",qd:""},timesearch:"",data:[],list:[{Image:u.a},{Image:u.a},{Image:u.a},{Image:u.a},{Image:u.a}],searchs:"",STNMSlength:0,STNMlength:0,item:{},video_iframe:""}},mixins:[d["a"],c["a"]],methods:{drawchart:function(t,a){var e=this.$echarts.init(document.getElementById(e));console.log("+++++++++++++++++++",t,a),e.resize(),e.setOption({xAxis:{type:"category",data:["闸门"]},yAxis:[{inverse:!0,type:"value",min:0,max:t,axisLabel:{show:!1}},{name:"闸门高度",type:"value",min:0,max:t}],series:[{data:[t-a],type:"bar"}]})},formatTooltip:function(t){return t/50},handleChange:function(t){console.log(t)},fangda:function(t,a){this.$App.enlarge_img(t,a)},pageFilter:function(t,a){var e=t||this.table.currentPage,i=a||this.table.pageSizes,s=this.table.Rows_filter.slice((e-1)*i,e*i);return s},gobox:function(t){console.log(t);var a=new Object;a.graphic=new Object,a.graphic.attributes=t,a.graphic.attributes.itype="tuxiang",a.graphic.attributes.rowinfo=JSON.parse(r()(t)),a.graphic.attributes.STNM=a.graphic.attributes.stnm,a.graphic.attributes.STCD=a.graphic.attributes.stcd,a.graphic.attributes.rowinfo.STNM=a.graphic.attributes.rowinfo.stnm,a.graphic.attributes.rowinfo.STCD=a.graphic.attributes.rowinfo.stcd;var e=new Object;e.itype="tuxiang",console.log("evt",a),this.$App.showDrawer(a,e)},Reload:function(){var t=this;if(this.loading=!0,0==this.form.model_adress.length&&(this.form.xzqh=""),1==this.form.model_adress.length){var a=this.form.model_adress[0];a=a.substring(0,6),this.form.xzqh=a}if(2==this.form.model_adress.length){var e=this.form.model_adress[1];e=e.substring(0,9),this.form.xzqh=e}if(3==this.form.model_adress.length){var i=this.form.model_adress[2];i=i.substring(0,12),this.form.xzqh=i}0==this.form.model_qudao.length&&(this.form.qd=""),1==this.form.model_qudao.length&&(this.form.qd=this.form.model_qudao[0]),2==this.form.model_qudao.length&&(this.form.qd=this.form.model_qudao[1]),this.axios.get("/guanqu/tuxiang/index?_page_size="+this.list_input.pagesize+"&_page="+this.list_input.current+this.searchs,{params:{ADDVCD:this.form.xzqh,Canal_Code:this.form.qd}}).then(function(a){t.loading=!1,t.data=a.data.rows,t.list_input.total=a.data.total;for(var e=0;e<t.data.length;e++)t.data[e].TM=t.data[e].TM.replace(".000","").replace("20","");t.data.forEach(function(a,e,i){var s="http://v3.yingmen.vip/guanqu/gis/pic_content?id="+a.stcd;t.axios.get("/guanqu/tuxiang/details?STCD="+a.stcd).then(function(t){0!=t.data.GUANLIAN_YAOSU.length&&(a.GUANLIAN_YAOSU=t.data.GUANLIAN_YAOSU)}),a.Image=s}),console.log("关联要素",t.data)}),this.axios.get("/guanqu/tuxiang/index?_page_size=99999",{params:{ADDVCD:this.form.xzqh,Canal_Code:this.form.qd}}).then(function(a){t.STNMSlength=a.data.total}),this.getTableData_WRP_AD_B(function(a){t.form.adressList=a}),this.getTableData_WRP_IrrBTCanalSystem(function(a){t.form.qudaoList=a})},err:function(){this.$Message.warning("该功能还在开发中...")},CurrentChange:function(t){this.list_input.current=t,this.Reload()},PagesizeChange:function(t){this.list_input.pagesize=t,this.Reload()},sort_change_shuiqing:function(){},run:function(){var t=this;this.run_button=!0,this.axios.put("/guanqu/zhafakongzhi/shishi",{KZKD:this.kz.OD,STCD:this.kz.STCD}).then(function(a){t.run_button=!1,t.$message({message:"恭喜你，成功执行",type:"success"})})},show_details:function(t){var a=this;console.log(t),this.dialogTableVisible=!0,this.kz.OD=l()(t.rowinfo.OD),this.kz.STCD=t.rowinfo.STCD,this.kz.STNM=t.rowinfo.STNM,this.kz.MAX=t.rowinfo.Strobe_Hight,this.reload_h(),this.details.rowinfo=t.rowinfo,this.axios.get("/guanqu/gis/details?ID=".concat(t.rowinfo.STCD,"&pk=STCD")).then(function(t){var e=t.data;if(a.item=t.data,e.CSTYPE,3==e.CSTYPE){var i=document.getElementById("video");i.src="em-playvideo.html?61.187.248.226:8866,"+e.PUID+","+e.IDX+","+e.STNM}if(1==e.CSTYPE){i=document.getElementById("video");i.src=e.WWWPath}a.boxLoading=!1})},reload_h:function(){var t=this;this.dialogTableVisible&&this.$GetData.Survey_History_ZFZT("historyTable",{STCD:this.kz.STCD,_orderby:"TM desc",_page_size:10},function(a){t.kz_lishi=a;for(var e=0;e<t.kz_lishi.length;e++)t.kz_lishi[e].UPZ=t.Z_Filter(t.kz_lishi[e].UPZ),t.kz_lishi[e].DWZ=t.Z_Filter(t.kz_lishi[e].DWZ);t.axios.post("/guanqu/zhafazhuangtai/gis",{STCD:t.kz.STCD}).then(function(a){t.item=a.data.features[0],t.drawchart(t.item.rowinfo.Strobe_Hight,t.kz_lishi[0].OD)})})},kaidulishibiao_init:function(){var t=this,a=new Object;this.form.search_str&&0!=new String(this.form.search_str).length&&(a["STNM"]="".concat(this.form.search_str)),this.form.model_adress&&0!=this.form.model_adress.length&&(a["ADDVCD"]="".concat(this.$App.ADDVCD_Array_Filter(this.form.model_adress))),this.form.model_qudao&&0!=this.form.model_qudao.length&&(a["Canal_Code"]="".concat(this.$App.Canal_Code_Array_Filter(this.form.model_qudao))),this.form.model_site&&0!=this.form.model_site.length&&(a["CTYPE"]=this.form.model_site.join(",")),console.log(this.form.model_status1),this.form.model_status1&&(a["_status"]=this.form.model_status1.join(",")),this.$GetData.getFeatrueLayer("zhafazhuangtai",a,function(a){var e=a.data.features;e=e.map(function(t){return t.url="http://v3.yingmen.vip/guanqu/gis/pic_content?id=".concat(t.rowinfo.STCD),t}),console.warn("data",e),t.table.SSXX.Rows=e,t.counter.total=e.length})}},destroyed:function(){clearInterval(this.zk_Interval)},mounted:function(){var t=this;this.zk_Interval=setInterval(function(){t.reload_h()},5e3),this.getTableData_WRP_AD_B(function(a){t.form.adressList=a}),this.getTableData_WRP_IrrBTCanalSystem(function(a){t.form.qudaoList=a}),this.kaidulishibiao_init()}},f=m,g=(e("7666"),e("b090"),e("2877")),_=Object(g["a"])(f,i,s,!1,null,"b3817a1a",null);a["default"]=_.exports},7666:function(t,a,e){"use strict";var i=e("c85b"),s=e.n(i);s.a},b090:function(t,a,e){"use strict";var i=e("cc9a"),s=e.n(i);s.a},c85b:function(t,a,e){},cc9a:function(t,a,e){}}]);