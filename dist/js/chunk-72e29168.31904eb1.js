(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72e29168"],{1410:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Content",{style:{padding:"24px",background:"#fff"}},[a("Row",{attrs:{gutter:16}},[a("Col",{attrs:{span:t.span1}},[a("Row",{staticStyle:{margin:"10px","line-height":"32px"},attrs:{gutter:16,type:"flex",justify:"start",z:""}},[a("Col",[t._v("\n        时间：\n        "),a("el-date-picker",{staticStyle:{width:"340px"},attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right","value-format":"yyyy-MM-dd HH:mm:ss",clearable:!1,size:"small",width:"200"},on:{change:t.timechange},model:{value:t.form.date,callback:function(e){t.$set(t.form,"date",e)},expression:"form.date"}})],1),a("Col",{staticStyle:{display:"flex","justify-content":"flex-start"}},[a("Button",{staticStyle:{width:"auto"},attrs:{type:"primary"},on:{click:t.cellclick}},[t._v("站点详情")]),a("Button",{staticStyle:{width:"auto","margin-left":"10px"},attrs:{type:"primary"},on:{click:t.err}},[t._v("导出")])],1),a("Col")],1),a("div",{staticClass:"switch",on:{click:t.Menu_toggle}},[t.Menu.show_Controller?a("i",{staticClass:"el-icon-d-arrow-left"}):t._e(),t.Menu.show_Controller?t._e():a("i",{staticClass:"el-icon-d-arrow-right"})]),a("Divider"),a("Row",[a("Col",{staticClass:"borsLine",staticStyle:{"font-size":"14px"}},[t._v("监测站名："+t._s(t.CZMC)+" \n    闸阀门开度：m，过闸阀流量：m³/s，闸阀上水深：m，闸阀下水深：m")])],1),a("Row",{attrs:{gutter:16}},[a("Col",[a("div",{ref:"achart",staticStyle:{width:"100%",height:"280px","margin-top":"1%","margin-bottom":"0px"}})])],1),a("Row",{attrs:{type:"flex",gutter:16}},[t.change2?a("Col",{staticStyle:{width:"1172px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.data1,border:"",height:"250"},on:{"sort-change":t.sort_change}},[a("el-table-column",{attrs:{label:" ",type:"index",align:"center",width:"60",index:t.indexMethod}}),a("el-table-column",{attrs:{prop:"TM",label:"时间",sortable:"custom",align:"center",width:""}}),a("el-table-column",{attrs:{prop:"OD",label:"闸门开度",sortable:"custom",align:"center"}}),a("el-table-column",{attrs:{prop:"Q",label:"过闸流量",sortable:"custom",align:"center"}}),a("el-table-column",{attrs:{prop:"UPZ",label:"闸前水深",sortable:"custom",align:"center"}}),a("el-table-column",{attrs:{prop:"DWZ",label:"闸后水深",sortable:"custom",align:"center"}})],1),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.list_input.total,current:t.list_input.current,"show-sizer":"","page-size":t.list_input.pagesize,"page-size-opts":t.list_input.pagesizeopts,size:"small","show-total":"","show-elevator":""},on:{"on-change":t.CurrentChange,"on-page-size-change":t.PagesizeChange}})],1)])],1):t._e(),t.change2?t._e():a("Col",{attrs:{span:"24"}},[a("span",{staticStyle:{"line-height":"3rem","font-size":"20px"}},[t._v("阀门已开高度："+t._s(t.GD)+"m")]),a("div",{ref:"zhamenimg",staticClass:"zhamenimg",staticStyle:{"background-color":"#838B8B",height:"196px",width:"196px",position:"absolute",margin:"1px 0 0 2px",transition:"all 2s"}}),a("div",{staticStyle:{border:"2px solid black",height:"200px",width:"200px"}}),a("div",{staticStyle:{"margin-left":"0","margin-top":"10px"}},[a("el-button",{attrs:{icon:"el-icon-video-play",circle:""},on:{click:t.kaishi}}),a("el-button",{staticStyle:{"margin-left":"3%"},attrs:{icon:"el-icon-refresh-right",circle:""},on:{click:t.rekaishi}})],1)])],1)],1),a("transition",{attrs:{name:"el-fade-in-linear"}},[a("Col",{directives:[{name:"show",rawName:"v-show",value:t.show1,expression:"show1"}],attrs:{span:t.span2}},[a("Row",{staticStyle:{"margin-top":"10px","line-height":"32px"}},[a("Col",[a("Input",{staticStyle:{width:"auto","margin-right":"20px"},attrs:{search:"","enter-button":"",suffix:"ios-search",placeholder:"请输入站名"},on:{"on-search":t.search},model:{value:t.searchmsg,callback:function(e){t.searchmsg=e},expression:"searchmsg"}})],1)],1),a("Row",{staticStyle:{"margin-top":"30px","margin-left":"20px"}},[a("Col",{staticStyle:{"max-height":"600px","overflow-y":"auto"}},[a("Button",{attrs:{shape:"circle"},on:{click:t.changeTree}},[t._v("切换树形图")]),t.xingzhengquhua?a("el-tree",{ref:"tree",staticClass:"filter-tree",attrs:{data:t.Treedata2,"filter-node-method":t.filterNode},on:{"node-click":t.xingzheng_tree}}):t._e(),t.qudao?a("el-tree",{ref:"tree",staticClass:"filter-tree",attrs:{data:t.Treedata,"filter-node-method":t.filterNode},on:{"node-click":t.qudao_tree}}):t._e()],1)],1)],1)],1)],1)],1)],1)},s=[],n=a("e814"),l=a.n(n),o=a("f499"),r=a.n(o),c=(a("a481"),a("bd86")),h=a("aaf8"),d=a("a53b"),u=(a("3dfd"),{data:function(){var t;return t={loading:!1,qudao:!0,xingzhengquhua:!1,show1:!0,change2:!0,Menu:{show_Controller:!1},span1:"19",span2:"5",testdata:[2,1,2,3,2,2],Treedata:[]},Object(c["a"])(t,"Treedata",[]),Object(c["a"])(t,"GD",""),Object(c["a"])(t,"data",[]),Object(c["a"])(t,"data1",[]),Object(c["a"])(t,"date",""),Object(c["a"])(t,"searchs",""),Object(c["a"])(t,"timesearch",""),Object(c["a"])(t,"echarts",{TM:[],OD:[],Q:[],UPZ:[],DWZ:[]}),Object(c["a"])(t,"CZMC",""),Object(c["a"])(t,"STinfo",{}),Object(c["a"])(t,"form",{searchmsg:"",date:"",field:""}),Object(c["a"])(t,"searchmsg",""),Object(c["a"])(t,"MaxY1",0),Object(c["a"])(t,"MaxY2",0),Object(c["a"])(t,"MinY1",0),Object(c["a"])(t,"MinY2",0),Object(c["a"])(t,"list_input",{total:100,pagesize:50,pagesizeopts:[10,20,50,75,100,200],current:1}),t},mixins:[h["a"],d["a"]],mounted:function(){var t=this,e=new Date,a=e.getMonth()+1,i=e.getDate(),s=new Array;a<10&&(a="0".concat(a)),i<10&&(i="0".concat(i)),s[0]=e.getFullYear()+"-"+a+"-"+i+" 00:00:00",s[1]=e.getFullYear()+"-"+a+"-"+i+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds(),this.form.date=s,console.log(this.form.date),this.axios.get("/guanqu/table/xingzhen_tree?type=6").then(function(e){t.Treedata2=t.XingZheng_Tree_Filter("650000000000",e.data).data}),this.axios.get("/guanqu/table/qudao_tree?type=6").then(function(e){t.Treedata=t.QuDao_Tree_Filter(e.data).data,t.CZMC=t.QuDao_Tree_Filter(e.data).siteinfo.canal_name,t.STinfo.STNM=t.QuDao_Tree_Filter(e.data).siteinfo.canal_name,t.STinfo.STCD=t.QuDao_Tree_Filter(e.data).siteinfo.canal_code,console.log(t.QuDao_Tree_Filter(e.data)),t.searchs="&STCD=".concat(t.QuDao_Tree_Filter(e.data).siteinfo.canal_code),t.Reload(),console.log("渠道",t.QuDao_Tree_Filter(e.data))})},methods:{change2on:function(){this.change2=!this.change2},sort_change:function(t){console.log(t),"ascending"==t.order&&(this.form.field=t.prop,this.Reload()),"descending"==t.order&&(this.form.field=t.prop+" desc",this.Reload()),null==t.order&&(this.form.field="",this.Reload())},Menu_toggle:function(){this.Menu.show_Controller=!this.Menu.show_Controller,this.show1=!this.show1,1==this.show1?(this.span1="19",this.span2="5",this.data2={},this.Reload()):(this.span1="24",this.span2="0",this.data2={},this.Reload())},test1:function(t){if(this.Menu.show_Controller=!t,t){if("24"==this.span1)return this.span2="0",void this.asyncExecute();this.span1="19",this.span2="5",this.data2={},this.asyncExecute()}else{if("24"==this.span1)return this.span2="0",void this.asyncExecute();this.span1="19",this.span2="5",this.data2={},this.asyncExecute()}},asyncExecute:function(){setTimeout(this.Reload,100)},rekaishi:function(){this.$refs.zhamenimg.style.height="196px"},kaishi:function(){this.$refs.zhamenimg.style.height="150px",console.log(this.$refs.zhamenimg.style.height)},qudao_tree:function(t){console.log(t),0!==t.bj&&(this.searchs="&STCD="+t.canal_code,this.STinfo.STCD=t.canal_code,this.STinfo.STNM=t.canal_name,this.CZMC=t.label.replace("【站点】",""),this.Reload())},xingzheng_tree:function(t){console.log(t),0!==t.bj&&(this.searchs="&STCD="+t.ad_cd,this.STinfo.STCD=t.ad_cd,this.STinfo.STNM=t.ad_nm,this.CZMC=t.label.replace("【站点】",""),this.Reload())},filterNode:function(t,e,a){return this.filterTreeData.push(a),!t||-1!==e.label.indexOf(t)},search:function(){var t=this;this.filterTreeData=[],this.$refs.tree.filter(this.searchmsg),""!=this.searchmsg?(this.filterTreeData.some(function(e,a){return e.visible&&0==e.data.bj&&e.data.canal_code?(console.log(e),e.isCurrent=!0,t.searchs="&STCD=".concat(e.data.canal_code),t.CZMC=e.label,console.log("this.searchmsg",t.searchmsg),!0):e.visible&&0==e.data.bj&&e.data.ad_cd?(e.isCurrent=!0,t.searchs="&STCD=".concat(e.data.ad_cd),t.CZMC=e.label,!0):void 0}),this.Reload()):(this.searchs="",this.Reload())},timechange:function(){console.log(this.form.date),this.Reload()},cellclick:function(){if(console.log("+++++++++++"),console.log(this.STinfo),"{}"==r()(this.STinfo))this.$Message.warning("请先选择站点");else{var t=new Object;t.graphic=new Object,t.graphic.attributes=this.STinfo,t.graphic.attributes.itype="zhafazhuangtai",t.graphic.attributes.rowinfo=JSON.parse(r()(this.STinfo)),t.graphic.attributes.rowinfo.tableType={zfzt:"historyTable"};var e=new Object;e.itype="zhafazhuangtai",console.log("evt",t),this.$App.showDrawer(t,e)}},drawchart:function(){var t=this.$echarts.init(this.$refs.achart);console.log(t),t.resize(),t.setOption({title:{text:""},tooltip:{trigger:"axis"},legend:{data:["闸门开度","过闸流量","闸前水深","闸后水深"]},calculable:!0,xAxis:[{type:"category",boundaryGap:!1,data:this.data.x.list,axisLabel:{interval:l()(this.data.x.list.length/3.2),rotate:50}}],grid:{x:70,x2:40,y2:100},yAxis:[{name:"流量",type:"value",min:this.data.y1.min,max:this.data.y1.max},{name:"水深",type:"value",min:this.data.y.min,max:this.data.y.max}],series:[{name:"闸门开度",type:"line",yAxisIndex:1,data:this.data.y4.list},{name:"过闸流量",type:"line",yAxisIndex:0,data:this.data.y1.list},{name:"闸前水深",type:"line",yAxisIndex:1,data:this.data.y2.list},{name:"闸后水深",type:"line",yAxisIndex:1,data:this.data.y3.list}]})},err:function(){this.$Message.warning("该功能还在开发中...")},indexMethod:function(t){return t+1+this.list_input.pagesize*(this.list_input.current-1)},changeTree:function(){this.qudao=!this.qudao,this.xingzhengquhua=!this.xingzhengquhua,this.Reload()},Reload:function(){var t=this;this.loading=!0,this.axios.get("/guanqu/zhafakongzhi/kaidulishi?_page_size="+this.list_input.pagesize+"&_page="+this.list_input.current+this.searchs,{params:{Time_min:this.form.date[0],Time_max:this.form.date[1],_orderby:this.form.field}}).then(function(e){console.log("data1数据"),console.log(e),t.data1=e.data.list,t.loading=!1,t.list_input.total=e.data.total,t.loading=!1;for(var a=0;a<t.data1.length;a++)t.data1[a].OD=t.Z_Filter(t.data1[a].OD),t.data1[a].Q=t.Z_Filter(t.data1[a].Q,3),t.data1[a].UPZ=t.Z_Filter(t.data1[a].UPZ),t.data1[a].DWZ=t.Z_Filter(t.data1[a].DWZ);0!=e.data.total?t.GD=t.data1[0].OD:t.GD=0}),this.axios.get("/guanqu/zhafakongzhi/kaidulishi?_page=1&_page_size=99999"+this.searchs,{params:{Time_min:this.form.date[0],Time_max:this.form.date[1]}}).then(function(e){t.data=e.data.list;for(var a=0;a<t.data.length;a++)t.data[a].TM=t.dateFilter(t.data[a].TM);t.data=t.transform_ZFZT_data_into_ehart_data(t.data,"historyTable"),console.log("***************************"),console.log(t.data),t.drawchart()})},CurrentChange:function(t){this.list_input.current=t,this.Reload()},PagesizeChange:function(t){this.list_input.pagesize=t,this.Reload()}},created:function(){},computed:{balabala:function(){return this.$store.state.anniu}},watch:{balabala:function(t,e){console.log(t),this.test1(t)}}}),g=u,p=(a("4886"),a("2877")),m=Object(p["a"])(g,i,s,!1,null,null,null);e["a"]=m.exports},4886:function(t,e,a){"use strict";var i=a("5b21"),s=a.n(i);s.a},"5b21":function(t,e,a){},ee8f:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Breadcrumb",{style:{margin:"0 0 24px 0"}},[a("BreadcrumbItem",[t._v("历史数据")]),a("BreadcrumbItem",[t._v("闸阀状态")])],1),a("Tabs",{attrs:{value:"history"}},[a("TabPane",{attrs:{label:"开度历史",name:"history"}},[a("Tablehistory")],1)],1)],1)},s=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Content",{style:{padding:"24px",background:"#fff"}},[a("Row",{staticStyle:{margin:"10px"},attrs:{type:"flex"}},[a("Col",[t._v("\n                            市:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},model:{value:t.model1,callback:function(e){t.model1=e},expression:"model1"}},t._l(t.shiList,function(e){return a("Option",{key:e,attrs:{value:e.value}},[t._v(t._s(e))])}),1),t._v("\n                            县:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},model:{value:t.model1,callback:function(e){t.model1=e},expression:"model1"}},t._l(t.cityList,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}),1),t._v("\n                            乡镇:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},model:{value:t.model1,callback:function(e){t.model1=e},expression:"model1"}},t._l(t.cityList,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}),1),t._v("\n                            渠道:\n                            "),a("Select",{staticStyle:{width:"120px","margin-left":"5px","margin-right":"20px"},model:{value:t.model1,callback:function(e){t.model1=e},expression:"model1"}},t._l(t.cityList,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}),1)],1),a("Col",[a("Input",{staticStyle:{width:"auto","margin-right":"20px"},attrs:{search:"","enter-button":"",suffix:"ios-search",placeholder:"搜索"}})],1),a("Col",[a("Button",{staticStyle:{width:"auto","margin-right":"20px"},attrs:{type:"primary"}},[t._v("导出")]),a("Button",{attrs:{type:"primary"}},[t._v("打印")])],1)],1),a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1}}),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:100,current:1}})],1)])],1)],1)},l=[],o={},r=o,c=a("2877"),h=Object(c["a"])(r,n,l,!1,null,null,null),d=h.exports,u=a("1410"),g={data:function(){return{}},mounted:function(){},methods:{},computed:{},components:{Tablestatistics:d,Tablehistory:u["a"]}},p=g,m=Object(c["a"])(p,i,s,!1,null,null,null);e["default"]=m.exports}}]);