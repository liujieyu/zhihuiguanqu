<template>
    <div class="baseBoxContent">
        <!-- 表格, 用于展示数据 -->
        <div>
            <el-table
                    ref="slltable"
                    @cell-click="cellClick"
                    :data="pageFilter()"
                    border
                    style="width: 100%"
                    size="small"
                    :height="table.height"
                    v-loading="table.loading"
                    :span-method="handleSpan"
                    empty-text="暂无站点数据"
                    @sort-change="sort_change"
            >
                <el-table-column
                        v-for="(item,index) in table.columns"
                        :prop="item.key"
                        :align="item.align"
                        :label="item.title"
                        :width="item.width"
                        :fixed="item.fixed"
                        :sortable="item.sortable"
                        :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column align="center" prop="spprwl" label="渗流量(L/s)" sortable="custom" :width="110">
                    <template slot-scope="scope">
                        <div>
                            <span
                                :style="{
                            color: scope.row.wljyz >= 0?'red' : 'black',
                            }"
                            >{{ scope.row.spprwl }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="wljyz" label="距阈值(L/s)" sortable="custom" :width="110">
                    <template slot-scope="scope">
                        {{ scope.row.wljyz }}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="tm" label="渗流水温(℃)" sortable="custom" :width="115">
                    <template slot-scope="scope">
                        {{ scope.row.tm }}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mstm" label="时间" sortable="custom" :width="120">
                    <template slot-scope="scope">
                        {{ scope.row.mstm }}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="damcd" label="断面编号" sortable="custom" :width="100">
                    <template slot-scope="scope">
                        {{ scope.row.damcd }}
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分割线 -->
            <!-- <Divider/> -->
            <div class="divider"></div>
            <!-- 分页器 -->
            <el-pagination
                    background
                    :page-size="table.pageSizes"
                    layout="total, prev, pager, next, jumper, sizes"
                    :page-sizes="[20, 50, 100, 200]"
                    :total="table.Rows.length"
                    :pager-count="5"
                    :current-page="table.currentPage"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    class="pageController"
                    small
            ></el-pagination>
        </div>
    </div>
</template>


<script>
    import FilterMethods from "@/assets/commonJS/FilterMethods";
    import GetDataMethods from "@/assets/commonJS/GetDataMethods";
    import {setTimeout} from "timers";

    export default {
        props: {
            featrue: {
                type: Object
            }
        },
        components: {
        },
        data() {
            return {
                // 提示 展示
                tip: {
                    info_tip: null,
                    show_tip: false
                },
                // 表单数据
                form: {
                    yuliang: '',
                },
                // 表格数据
                table: {
                    // 表头设置
                    columns: [
                        {
                            title: " ",
                            key: "index",
                            width: 45,
                            align: "center",
                            fixed: "left"
                        },
                        {
                            title: "站名",
                            key: "STNM",
                            width: 100,
                            align: "center",
                            fixed: "left",
                            sortable: "custom"
                        },
                        {
                            title: "测点编号",
                            key: "mpcd",
                            width: 100,
                            align: "center",
                            fixed: "left",
                            sortable: "custom"
                        },                       
                    ],                   
                    // 表体内容
                    Rows: [],
                    // 过滤后的表体内容
                    Rows_filter: [],
                    // 表格是否加载中
                    loading: false,
                    // 当前页
                    currentPage: 1,
                    // 每页显示数量
                    pageSizes: 20,
                    // 表体高度
                    height: 300
                },
                spanArr:[],
                position:0,
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods, GetDataMethods],
        methods: {
            // 表格每一行点击事件
            cellClick(item) {
                var evt = new Object();
                evt.graphic = new Object();
                evt.graphic.attributes = item;
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(item));
                for(var i=0;i<this.featrue.Rows.length;i++){
                    var rowinfo=this.featrue.Rows[i].rowinfo;
                    if(evt.graphic.attributes.rowinfo.STCD==rowinfo.STCD){
                        evt.graphic.attributes.rowinfo.slllist=rowinfo.slllist;
                        evt.graphic.attributes.rowinfo.slyllist=rowinfo.slyllist;
                        evt.graphic.attributes.rowinfo.spwylist=rowinfo.spwylist;
                        evt.graphic.attributes.rowinfo.czwylist=rowinfo.czwylist;
                        break;
                    }
                }
                evt.graphic.attributes.rowinfo.tableType = {
                    mpcd: item.mpcd,
                    clicktype:"sll",
                };
                var v = new Object();
                v.itype = "safeinfo";

                // 设置中心缩放
                //this.setMapCenterandZoom(item.LGTD, item.LTTD);
                // 取消所有站点的闪烁
                this.$App.GraphicsLayer_Selection_clear();
                // 对应站点闪烁
                this.$App.add_Graphic_To_GraphicsLayer_Selection(item);
                // 展示抽屉详情框
                this.$App.showDrawer(evt, v);
            },
            // 表格加载
            tableLoading() {
                this.table.loading = true;
            },
            // 表格加载取消
            cancelTableLoading() {
                this.table.loading = false;
            },
            // 加载表格数据
            loadTableData(data) {
                // 加载站点数据
                this.table.Rows = data;
            },
            // 处理页码切换
            handleCurrentChange(index) {
                this.table.currentPage = index;
                this.rowspan();
            },
            // 处理每页显示条数切换
            handleSizeChange(pageSizes) {
                this.table.pageSizes = pageSizes;
                this.table.currentPage = 1;
                this.rowspan();
            },
            // 分页过滤
            pageFilter(currentPage, pageSizes) {
                var _currentPage = currentPage || this.table.currentPage;
                var _pageSizes = pageSizes || this.table.pageSizes;
                if (this.table.Rows_filter.length != 0) {
                    // 截取数组
                    var newList = this.table.Rows_filter.slice(
                        (_currentPage - 1) * _pageSizes,
                        _currentPage * _pageSizes
                    );

                    return newList;
                } else {
                    return [];
                }
            },
            // 过滤table数据
            filterTableData() {
                this.table.Rows_filter = this.table.Rows.map((val, index) => {                   
                    var val_clone = JSON.parse(JSON.stringify(val));
                    // 序号
                    val_clone.index = index + 1;
                    return val_clone;
                    
                });
            },
            // 选取一部分从父组件传来的数据作为表格的数据
            getTableDataFormParent() {
                var tableData=new Array();
                this.featrue.Rows.map(val => {
                    var rowinfo = val.rowinfo;
                    for(var i=0;i<rowinfo.slllist.length;i++){
                        var rowobj=rowinfo.slllist[i];
                        var dataobj=new Object();
                        dataobj.STCD=rowinfo.STCD;
                        dataobj.STNM=rowinfo.STNM;
                        dataobj.LTTD=rowinfo.LTTD;
                        dataobj.LGTD=rowinfo.LGTD;
                        dataobj.adnm=rowinfo.adnm;
                        dataobj.mpcd=rowobj.mpcd;
                        dataobj.mstm=rowobj.mstm;
                        dataobj.spprwl=rowobj.spprwl;
                        dataobj.tm=rowobj.tm;
                        dataobj.wlyz=rowobj.wlyz;
                        dataobj.wljyz=rowobj.wljyz;
                        dataobj.damcd=rowobj.damcd;
                        tableData.push(dataobj);
                    }
                });

                return tableData;
            },
            rowspan() {
                    this.spanArr=[];
                    this.position=0;
                    var tabledata=this.pageFilter();
                    tabledata.forEach((item,index) => {
                    if( index === 0){
                        this.spanArr.push(1);
                        this.position = 0;
                    }else{
                        if(tabledata[index].STNM === tabledata[index-1].STNM ){
                            this.spanArr[this.position] += 1;
                            this.spanArr.push(0);
                        }else{
                            this.spanArr.push(1);
                            this.position = index;
                        }
                    }
                })
            },
            handleSpan({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 1) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row>0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
                console.log(row);
            },
            // 初始化baseBox
            baseBox_init() {
                this.table.currentPage = 1;
                // 选取一部分从父组件传来的数据,将其加载为表格数据
                this.loadTableData(
                    this.getTableDataFormParent()
                );
                // 过滤table数据
                this.filterTableData();
                this.rowspan();
            },
            //排序
            sort_change(item) {
                this.spanArr=[];
                this.position=0;
                var order = item.order,
                key = item.prop;
                var newList;
                if (order) {
                    switch (order) {
                        case "descending":
                        if(key=="STNM"){
                            newList = this.table.Rows_filter.sort((a, b) => {
                            var vnum=0;
                            var sign=b[key]<a[key];
                            if(sign==true){
                                vnum=1;
                            }else{
                                vnum=-1;
                            }
                            return vnum;
                            });
                        } else if (key != "TM") {
                            newList = this.table.Rows_filter.sort((a, b) => {
                            return Number(b[key]) - Number(a[key]);
                            });
                        }else {
                            newList = this.table.Rows_filter.sort((a, b) => {
                            var aTime = new Date(`20${a.TM}`).getTime(),
                                bTime = new Date(`20${b.TM}`).getTime();
                            aTime = isNaN(aTime) ? 0 : aTime;
                            bTime = isNaN(bTime) ? 0 : bTime;
                            return bTime - aTime;
                            });
                        }
                        break;

                        case "ascending":
                        if(key=="STNM"){
                            newList = this.table.Rows_filter.sort((a, b) => {
                            var vnum=0;
                            var sign=a[key]<b[key];
                            if(sign==true){
                                vnum=1;
                            }else{
                                vnum=-1;
                            }
                            return vnum;
                            });
                        }if (key != "TM") {
                            newList = this.table.Rows_filter.sort((a, b) => {
                            return Number(a[key]) - Number(b[key]);
                            });
                        } else {
                            newList = this.table.Rows_filter.sort((a, b) => {
                            var aTime = new Date(`20${a.TM}`).getTime(),
                                bTime = new Date(`20${b.TM}`).getTime();
                            aTime = isNaN(aTime) ? 0 : aTime;
                            bTime = isNaN(bTime) ? 0 : bTime;
                            return aTime - bTime;
                            });
                        }
                    }
                    this.table.Rows_filter = newList.map((val, index) => {                   
                            // 序号
                            val.index = index + 1;
                            return val;                 
                    });
                    }                   
                    this.$TableMethods.refreshCurrentChange(this.table, 1);
                    this.rowspan();

            },
        },
        created() {
            // 初始化baseBox
            this.baseBox_init();
        },
    };
</script>

<style lang="less" scope>
    /* 引入baseBox公共样式 */
    .date_zw {
        margin-bottom: 10px;
        width: 140px !important;
        margin-right: 10px;
    }
    .time_zw{
        margin-bottom: 0;
    }

    @import "../../assets/commonLess/baseBox";
</style>
