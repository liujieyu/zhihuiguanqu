import FilterMethods from "@/assets/commonJS/FilterMethods";
import axios from 'axios';
export default {
    // 基础数据

    // 监测站点
    Base_MonitoringSites(tableType, body, filter, callBack) {
        var tableName;

        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "basic":
                tableName = "ST_STBPRP_B";
                break;
            case "MonitoringType":
                tableName = "ST_STBPRP_F";
                break;
            case "RelatedElements":
                tableName = "ST_STINFO_WRP";
                break;
            case "Z_Q_relation":
                tableName = "ST_ZQRL_B";
                break;
            case "Gate_Z_Q_relation":
                tableName = "ST_G_Q_Z";
                break;
        }

        axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                val.DT = FilterMethods.methods.dateFilter(val.DT); // 时间
                                val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 平均流量
                                val.A_Z = FilterMethods.methods.Float_Filter(val.A_Z) // 平均水位
                                val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计水量
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "Z_Q_relation":
                            newData = data.map(val => {
                                // val.YR = FilterMethods.methods.dateFilter(val.YR); // 年份
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                                return val;
                            })
                            break;
                        case "Gate_Z_Q_relation":
                            newData = data.map(val => {
                                val.Q = FilterMethods.methods.dateFilter(val.Q, 3); // 流量
                                val.OD = FilterMethods.methods.Float_Filter(val.OD); // 闸门开度
                                val.UPZ = FilterMethods.methods.Float_Filter(val.UPZ) // 闸前水位
                                val.DWZ = FilterMethods.methods.Float_Filter(val.DWZ); // 闸后水位
                                return val;
                            })
                            break;

                    }

                    return newData;
                }
            })
    },
    // 河流信息
    Base_R_I(body, filter, callBack) {
        axios.get(`/guanqu/admin/WRP_RVR_BSIN`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;

                    newData = data.map(val => {
                        // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                        // val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                        // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                        return val;
                    })

                    return newData;
                }
            })
    },
    // 流域信息
    Base_B_I(body, filter, callBack) {
        axios.get(`/guanqu/admin/WRP_LY_BSIN`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;

                    newData = data.map(val => {
                        // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                        // val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                        // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                        return val;
                    })

                    return newData;
                }
            })
    },
    // 监控模块

    // 历史统计类

    // 水库水情
    Survey_History_SWKR(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable":
                tableName = "single";
                break;
            case "hourTable":
                console.log('@@@@@@@@@@@@@@@@@@@'+tableType);
                tableName = "single_xiaoshi";
                break;
            case "dayTable":
                tableName = "single_ri";
                break;
            case "monthTable":
                tableName = "single_yue";
                break;
            case "overTime":
                tableName = "single_chaoxunxianshijian";
                break;
            case "sishiTable":
                tableName = "single_details";
                break;
        }


        var __url = `/guanqu/shuiweikurong/${tableName}`;
        axios.get(__url, {
            // axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }


                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }



                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM, null, null, 0); // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 入库流量
                                val.OTQ = FilterMethods.methods.Float_Filter(val.OTQ, 3); // 出库流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 水位
                                val.BLRZ = FilterMethods.methods.Float_Filter(val.BLRZ) // 水位
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                val.Min_TM = `${FilterMethods.methods.dateFilter(val.Min_TM, 2)}`;; // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 入库平均流量
                                val.OTQ = FilterMethods.methods.Float_Filter(val.OTQ, 3); // 出库平均流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 平均水位
                                val.BLRZ = FilterMethods.methods.Float_Filter(val.BLRZ)//kuxia
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM, null, "onlyDate"); // 时间
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 日平均水位
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 日入库平均流量
                                val.OTQ = FilterMethods.methods.Float_Filter(val.OTQ, 3); // 日出库平均流量
                                val.BLRZ = FilterMethods.methods.Float_Filter(val.BLRZ)
                                return val;
                            })
                            break;
                        case "tenDaysTable":
                            newData = data.map(val => {
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                // val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "monthTable":
                            newData = data.map(val => {
                                if (parseInt(val.MON) < 10) {
                                    val.MON = '0' + val.MON
                                }
                                val.DT = `${val.YR}-${val.MON}`; // 时间
                                // val.Min_TM = FilterMethods.methods.dateFilter(val.Min_TM,null,"onlyDate"); // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 月平均流量
                                val.OTQ = FilterMethods.methods.Float_Filter(val.OTQ, 3); // 月平均流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 月平均水位
                                // val.MWQ = FilterMethods.methods.Float_Filter(val.MWQ, 3); // 月累计水量
                                val.BLRZ = FilterMethods.methods.Float_Filter(val.BLRZ)
                                return val;
                            })
                            break;
                        case "yearTable":
                            newData = data.map(val => {
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                // val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "maxTable":
                            newData = data.map(val => {
                                // val.TMMXQ = FilterMethods.methods.dateFilter(val.TMMXQ); // 年最大流量时间
                                // val.TMXQ = FilterMethods.methods.Float_Filter(val.TMXQ, 3); // 年最大流量
                                // val.YMXQZ = FilterMethods.methods.Float_Filter(val.YMXQZ) // 对应水位
                                return val;
                            })
                            break;
                        case "alarmTable":
                            newData = data.map(val => {
                                // val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 预警流量
                                val.FWL = FilterMethods.methods.Float_Filter(val.FWL) // 4-6月汛限水位
                                val.FWL79 = FilterMethods.methods.Float_Filter(val.FWL79) // 4-6月汛限水位
                                // val.JYQ = FilterMethods.methods.Float_Filter(val.JYQ, 3); // 经验预警流量
                                // val.JYZ = FilterMethods.methods.Float_Filter(val.JYZ); // 经验预警水位
                                return val;
                            })
                            break;
                        case "sishiTable":
                            newData = res.data
                            break;

                    }

                    return newData;
                }
            })

    },

    // 雨情
    Survey_History_YQ(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable":
                tableName = "single_lishi";
                break;
            case "hourTable":
                tableName = "single_xiaoshi";
                break;
            case "dayTable":
                tableName = "single_ri";
                break;
            case "tenDaysTable":
                tableName = "single_xun";
                break;
            case "monthTable":
                tableName = "single_yue";
                break;
            case "yearTable":
                tableName = "single_nian";
                break;
            case "alarmTable":
                tableName = "single_yujing";
                break;
            case "alarmTable_shangbao":
                tableName = "single_yujingshangbao";
                break;
        }

        axios.get(`/guanqu/yuqing/${tableName}`, {
            // axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }


                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }



                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 流量
                                // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                if (parseInt(val.TM) < 10) {
                                    val.TM = `0${val.TM}`
                                }
                                // val.DT = `${val.DT} ${val.TM}`;; // 时间
                                // val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 平均流量
                                val.P = FilterMethods.methods.Float_Filter(val.P, 1) // 降雨量
                                // val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计水量
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {

                                console.log(val);
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                // val.p = FilterMethods.methods.Float_Filter(val.P, 1) // 降雨量
                                if(val.p === '0.0'){
                                    val.p = ''
                                }
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "tenDaysTable":
                            newData = data.map(val => {
                                console.log(val.P);
                                if(val.P === '0.0'){
                                    val.P = ''
                                }
                                // var DT = val.PTBGDT.split("-"),
                                //     Year = parseInt(DT[0]),
                                //     Month = parseInt(DT[1]),
                                //     Day = parseInt(DT[2]),
                                //     Year_Month = `${Year}-${Month}`
                                //
                                // if (Day > 0 && Day <= 10) {
                                //     val.PTBGDT = `${Year_Month} 上旬`
                                // } else if (Day > 10 && Day <= 20) {
                                //     val.PTBGDT = `${Year_Month} 中旬`
                                // } else {
                                //     val.PTBGDT = `${Year_Month} 下旬`
                                // }

                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                // val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "monthTable":
                            newData = data.map(val => {
                                // if (parseInt(val.MON) < 10) {
                                //     val.MON = '0'+val.MON
                                // }
                                if(val.P === '0.0'){
                                    val.P = ''
                                }
                                // val.DT = `${val.YR}-${val.MON}`; // 时间
                                // // val.MA_Q = FilterMethods.methods.Float_Filter(val.MA_Q, 3); // 月平均流量
                                // val.P = FilterMethods.methods.Float_Filter(val.P, 1) // 降雨量
                                // // val.MWQ = FilterMethods.methods.Float_Filter(val.MWQ, 3); // 月累计水量
                                return val;
                            })
                            break;
                        case "yearTable":
                            newData = data.map(val => {
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                val.P = FilterMethods.methods.Float_Filter(val.P, 1) // 降雨量
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "alarmTable":
                            newData = data.map(val => {
                                // val.TMMXQ = FilterMethods.methods.dateFilter(val.TMMXQ); // 年最大流量时间
                                // val.TMXQ = FilterMethods.methods.Float_Filter(val.TMXQ, 3); // 年最大流量
                                // val.YMXQZ = FilterMethods.methods.Float_Filter(val.YMXQZ) // 对应水位
                                return val;
                            })
                            break;
                        case "alarmTable_shangbao":
                            newData = data.map(val => {
                                // val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 预警流量
                                // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 预警水位
                                // val.JYQ = FilterMethods.methods.Float_Filter(val.JYQ, 3); // 经验预警流量
                                // val.JYZ = FilterMethods.methods.Float_Filter(val.JYZ); // 经验预警水位
                                return val;
                            })
                            break;

                    }

                    return newData;
                }
            })

    },

    // 雨情雨量统计数据
    statistics_rain_YQ(tableType, body, filter, callBack) {
        // debugger;
        let tbName = '';

        switch (tableType) {
            case "historyTable":
                tbName = "tongji_lishi";
                break;
            case "hourTable":
                tbName = "tongji_xiaoshi";
                break;
            case "dayTable":
                body.Time_min = body.Time_min.substr(0, 10)
                body.Time_max = body.Time_max.substr(0, 10)
                tbName = "tongji_ri";
                break;
            case "tenDaysTable":
                tbName = "tongji_xun";
                break;
            case "monthTable":
                tbName = "tongji_yue";
                break;
            case "yearTable":
                tbName = "tongji_nian";
                break;
            case "alarmTable":
                tbName = "tongji_yujing";
                break;
            case "alarmTable_shangbao":
                tbName = "tongji_ujingshangbao";
                break;
        }



        axios.get(`/guanqu/yuqing/${tbName}`, { params: body }).then(res => {
            var data = res.data; // 数据
            var total = res.data.total; // 数据总条数


            // 过滤
            if (typeof filter == "function") { // 如果传入的filte为过滤方法
                data = filter(data, total);
            } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                data = defaultFilter(data);
            } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                    data = defaultFilter(data);
                }
                if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                    data = filter.myFilter(data)
                }
            }


            // 回调函数
            if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                callBack({
                    data: data || [],
                    total: total
                })
            }


            // 默认过滤方法
            function defaultFilter(data) {
                var newData;
                // 根据不同类型的表，选择不同的过滤fangfa
                return newData;
            }
        })



    },
    //大坝安全监测历史数据
    Safe_History_DATA(jctype,body,filter,callBack){
        var url;
        switch(jctype){
            case "sll":
                url="/guanqu/slldetail/lishi";
                break;
            case "slyl":
                url="/guanqu/slyldetail/lishi";
                break;
            case "wybx":
                url="/guanqu/spwydetail/lishi";
                break;
            case "cjbx":
                url="/guanqu/czwydetail/lishi";
                break;
        }
        axios.get(url, {
            params: body
        })
            .then(res => {
                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数
                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真
                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }

                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (jctype) {
                        case "sll":
                            newData = data.map(val => {
                                val.mstm = FilterMethods.methods.dateFilter(val.mstm, null, null, 0); // 时间
                                val.spprwl = FilterMethods.methods.Float_Filter(val.spprwl, 3); // 渗流量
                                val.tm = FilterMethods.methods.Float_Filter(val.tm, 1); // 渗流水温
                                return val;
                            })
                            break;
                        case "slyl":
                            newData = data.map(val => {
                                val.mstm = FilterMethods.methods.dateFilter(val.mstm, null, null, 0); // 时间
                                val.spprwm = FilterMethods.methods.Float_Filter(val.spprwm, 3); // 渗压水位
                                val.tm = FilterMethods.methods.Float_Filter(val.tm, 1); // 水温
                                return val;
                            })
                            break;
                        case "wybx":                           
                            newData = data.map(val => {
                                val.mstm = FilterMethods.methods.dateFilter(val.mstm, null, null, 0); // 时间
                                val.xhrdsval = FilterMethods.methods.Float_Filter(val.xhrds.substr(3), 3); // X向位移
                                val.yhrdsval = FilterMethods.methods.Float_Filter(val.yhrds.substr(3), 3); // Y向位移
                                return val;
                            })
                            break;
                        case "cjbx":
                            newData = data.map(val => {
                                val.mstm = FilterMethods.methods.dateFilter(val.mstm, null, null, 0); // 时间
                                val.vrdsval = FilterMethods.methods.Float_Filter(val.vrds.substr(2), 3); // 垂直位移
                                val.inel = FilterMethods.methods.Float_Filter(val.inel, 3); // 测量高程
                                return val;
                            })
                            break;
                    }
                    return newData;
                }

            })
    },

    // 水库水情
    Survey_History_SKSQ(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable":
                tableName = "single_lishi";
                break;
            case "hourTable":
                console.log('@@@@@@@@@@@@@@@@@@@'+tableType);
                tableName = "single_xiaoshi";
                break;
            case "dayTable":
                tableName = "single_ri";
                break;
            case "monthTable":
                tableName = "single_yue";
                break;
            case "maxZ":
                tableName = "single_zuigaoshuiwe";
                break;
            case "alarmTable":
                tableName = "single_yujing";
                break;
            case "overTime":
                tableName = "single_chaoxunxianshijian";
                break;
            case "sishiTable":
                tableName = "single_details";
                break;
        }


        var __url = `/guanqu/shuikushuiqing/${tableName}`;
        axios.get(__url, {
            // axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }


                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }



                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM, null, null, 0); // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 入库流量
                                val.OTQ = FilterMethods.methods.Float_Filter(val.OTQ, 3); // 出库流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 水位
                                val.BLRZ = FilterMethods.methods.Float_Filter(val.BLRZ) // 水位
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                val.Min_TM = `${FilterMethods.methods.dateFilter(val.Min_TM, 2)}`;; // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 入库平均流量
                                val.OTQ = FilterMethods.methods.Float_Filter(val.OTQ, 3); // 出库平均流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 平均水位
                                val.BLRZ = FilterMethods.methods.Float_Filter(val.BLRZ)//kuxia
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM, null, "onlyDate"); // 时间
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 日平均水位
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 日入库平均流量
                                val.OTQ = FilterMethods.methods.Float_Filter(val.OTQ, 3); // 日出库平均流量
                                val.BLRZ = FilterMethods.methods.Float_Filter(val.BLRZ)
                                return val;
                            })
                            break;
                        case "tenDaysTable":
                            newData = data.map(val => {
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                // val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "monthTable":
                            newData = data.map(val => {
                                if (parseInt(val.MON) < 10) {
                                    val.MON = '0' + val.MON
                                }
                                val.DT = `${val.YR}-${val.MON}`; // 时间
                                // val.Min_TM = FilterMethods.methods.dateFilter(val.Min_TM,null,"onlyDate"); // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 月平均流量
                                val.OTQ = FilterMethods.methods.Float_Filter(val.OTQ, 3); // 月平均流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 月平均水位
                                // val.MWQ = FilterMethods.methods.Float_Filter(val.MWQ, 3); // 月累计水量
                                val.BLRZ = FilterMethods.methods.Float_Filter(val.BLRZ)
                                return val;
                            })
                            break;
                        case "yearTable":
                            newData = data.map(val => {
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                // val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "maxTable":
                            newData = data.map(val => {
                                // val.TMMXQ = FilterMethods.methods.dateFilter(val.TMMXQ); // 年最大流量时间
                                // val.TMXQ = FilterMethods.methods.Float_Filter(val.TMXQ, 3); // 年最大流量
                                // val.YMXQZ = FilterMethods.methods.Float_Filter(val.YMXQZ) // 对应水位
                                return val;
                            })
                            break;
                        case "alarmTable":
                            newData = data.map(val => {
                                // val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 预警流量
                                val.FWL = FilterMethods.methods.Float_Filter(val.FWL) // 4-6月汛限水位
                                val.FWL79 = FilterMethods.methods.Float_Filter(val.FWL79) // 4-6月汛限水位
                                // val.JYQ = FilterMethods.methods.Float_Filter(val.JYQ, 3); // 经验预警流量
                                // val.JYZ = FilterMethods.methods.Float_Filter(val.JYZ); // 经验预警水位
                                return val;
                            })
                            break;
                        case "sishiTable":
                            newData = res.data
                            break;

                    }

                    return newData;
                }
            })

    },
    // 河道水情
    Survey_History_HDSQ(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable":
                tableName = "single_lishi";
                break;
            case "hourTable":
                tableName = "single_xiaoshi";
                break;
            case "dayTable":
                tableName = "single_ri";
                break;
            case "monthTable":
                tableName = "single_yue";
                break;
            case "maxZ":
                tableName = "single_zuigaoshuiwe";
                break;
            case "alarmTable":
                tableName = "single_yujing";
                break;
            case "overTime":
                tableName = "single_chaoxunxianshijian";
                break;
        }

        axios.get(`/guanqu/hedaoshuiqing/${tableName}`, {
            // axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数


                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }


                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }



                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                // val.DTT = `${FilterMethods.methods.dateFilter(val.DTT, 2)}`;; // 时间
                                val.Min_TM = FilterMethods.methods.dateFilter(val.Min_TM, 2); // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 平均流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 平均水位
                                // val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计水量
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.Min_TM = FilterMethods.methods.dateFilter(val.Min_TM, 2); // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 日平均流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 日平均水位
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "tenDaysTable":
                            newData = data.map(val => {
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                // val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "monthTable":
                            newData = data.map(val => {
                                // val.Min_TM = FilterMethods.methods.dateFilter(val.Min_TM,null,"onlyDate"); // 时间
                                if (parseInt(val.MON) < 10) {
                                    val.MON = `0${val.MON}`;
                                }
                                val.DT = `${val.YR}-${val.MON}`; // 时间
                                val.INQ = FilterMethods.methods.Float_Filter(val.INQ, 3); // 月平均流量
                                val.RZ = FilterMethods.methods.Float_Filter(val.RZ) // 月平均水位
                                // val.MWQ = FilterMethods.methods.Float_Filter(val.MWQ, 3); // 月累计水量
                                return val;
                            })
                            break;
                        case "yearTable":
                            newData = data.map(val => {
                                // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                // val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                // val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                // val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "maxTable":
                            newData = data.map(val => {
                                // val.TMMXQ = FilterMethods.methods.dateFilter(val.TMMXQ); // 年最大流量时间
                                // val.TMXQ = FilterMethods.methods.Float_Filter(val.TMXQ, 3); // 年最大流量
                                // val.YMXQZ = FilterMethods.methods.Float_Filter(val.YMXQZ) // 对应水位
                                return val;
                            })
                            break;
                        case "alarmTable":
                            newData = data.map(val => {
                                // val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 预警流量
                                // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 预警水位
                                // val.JYQ = FilterMethods.methods.Float_Filter(val.JYQ, 3); // 经验预警流量
                                // val.JYZ = FilterMethods.methods.Float_Filter(val.JYZ); // 经验预警水位
                                return val;
                            })
                            break;

                    }
                    return newData;
                }
            })

    },
    // 渠道水情
    Survey_History_QDSQ(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable":
                tableName = "ST_Canal_R";
                break;
            case "hourTable":
                tableName = "ST_HCanal_C";
                break;
            case "dayTable":
                tableName = "ST_DCanal_C";
                break;
            case "monthTable":
                tableName = "View_ST_MCanal_C";
                break;
            case "maxQTable":
                tableName = "ST_G_CQORD";
                break;
            case "alarmTable":
                tableName = "ST_Canal_Alarm";
                break;
        }

        axios.get(`/guanqu/table/${tableName}`, {
            // axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }


                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }



                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                val.DTT = `${FilterMethods.methods.dateFilter(val.DTT, 2)}`;; // 时间
                                val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 平均流量
                                val.A_Z = FilterMethods.methods.Float_Filter(val.A_Z) // 平均水位
                                val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计水量
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "monthTable":
                            newData = data.map(val => {
                                if (parseInt(val.MON) < 10) {
                                    val.MON = '0' + val.MON
                                }
                                val.DT = `${val.YR}-${val.MON}`; // 时间
                                val.MA_Q = FilterMethods.methods.Float_Filter(val.MA_Q, 3); // 月平均流量
                                val.MA_Z = FilterMethods.methods.Float_Filter(val.MA_Z) // 月平均水位
                                val.MWQ = FilterMethods.methods.Float_Filter(val.MWQ, 3); // 月累计水量
                                return val;
                            })
                            break;
                        case "maxQTable":
                            newData = data.map(val => {
                                // val.TMMXQ = FilterMethods.methods.dateFilter(val.TMMXQ); // 年最大流量时间
                                val.TMXQ = FilterMethods.methods.Float_Filter(val.TMXQ, 3); // 年最大流量
                                val.YMXQZ = FilterMethods.methods.Float_Filter(val.YMXQZ) // 对应水位
                                return val;
                            })
                            break;
                        case "alarmTable":
                            newData = data.map(val => {
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 预警流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 预警水位
                                val.JYQ = FilterMethods.methods.Float_Filter(val.JYQ, 3); // 经验预警流量
                                val.JYZ = FilterMethods.methods.Float_Filter(val.JYZ); // 经验预警水位
                                return val;
                            })
                            break;

                    }

                    return newData;
                }
            })

    },
    // 闸阀水情
    Survey_History_ZFSQ(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        console.log(tableType);
        switch (tableType) {
            case "historyTable":
                tableName = "table/ST_WAS_R";
                break;
            case "hourTable":
                tableName = "zhafashuiqing/item_xiaoshi";
                break;
            case "dayTable":
                tableName = "table/ST_DWAS_C";
                break;
            case "monthTable":
                tableName = "table/View_ST_MWAS_C";
                break;
            case "maxQTable":
                tableName = "table/ST_G_WASQORD";
                break;
            case "alarmTable":
                tableName = "table/ST_Gate_Alarm";
                break;
        }

        axios.get(`/guanqu/${tableName}`, {
            // axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }

                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 日期过滤
                                val.UPZ = FilterMethods.methods.Float_Filter(val.UPZ); // 闸阀前水位过滤
                                val.DWZ = FilterMethods.methods.Float_Filter(val.DWZ); // 闸阀后水位过滤
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 流量过滤
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                val.DTT = `${FilterMethods.methods.dateFilter(val.DTT, 2)}`; // 时间
                                val.A_UPZ = FilterMethods.methods.Float_Filter(val.A_UPZ); // 平均闸阀前水位过滤
                                val.A_DWZ = FilterMethods.methods.Float_Filter(val.A_DWZ); // 平均闸阀后水位过滤
                                val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 过闸平均流量过滤
                                val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计过闸水量过滤
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 日期过滤
                                val.DA_UPZ = FilterMethods.methods.Float_Filter(val.DA_UPZ); // 平均闸阀前水位过滤
                                val.DA_DWZ = FilterMethods.methods.Float_Filter(val.DA_DWZ); // 平均闸阀后水位过滤
                                val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 平均过闸流量过滤
                                val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计过闸水量过滤
                                return val;
                            })
                            break;
                        case "monthTable":
                            newData = data.map(val => {
                                if (parseInt(val.MON) < 10) {
                                    val.MON = '0' + val.MON
                                }
                                val.TM = `${val.YR}-${val.MON}`
                                val.DTT = `${val.YE}-${val.MON}`
                                val.MA_UPZ = FilterMethods.methods.Float_Filter(val.MA_UPZ); // 平均闸阀前水位过滤
                                val.MA_DWZ = FilterMethods.methods.Float_Filter(val.MA_DWZ); // 平均闸阀后水位过滤
                                val.MA_Q = FilterMethods.methods.Float_Filter(val.MA_Q, 3); // 平均过闸流量过滤
                                val.MWQ = FilterMethods.methods.Float_Filter(val.MWQ, 3); // 月累计过闸水量过滤
                                return val;
                            })
                            break;
                        case "maxQTable":
                            newData = data.map(val => {
                                // val.TMMXQ = FilterMethods.methods.dateFilter(val.TMMXQ); // 年最大流量时间
                                // val.TMXQ = FilterMethods.methods.Float_Filter(val.TMXQ, 3); // 年最大流量
                                // val.YMXUPQZ = FilterMethods.methods.Float_Filter(val.YMXUPQZ) // 对应闸前水位
                                // val.YMXDNQZ = FilterMethods.methods.Float_Filter(val.YMXDNQZ) // 对应闸后水位
                                return val;
                            })
                            break;
                        case "alarmTable":
                            newData = data.map(val => {
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 预警流量
                                val.SZ = FilterMethods.methods.Float_Filter(val.SZ) // 预警闸前水位
                                val.EZ = FilterMethods.methods.Float_Filter(val.EZ) // 预警闸后水位
                                val.JYQ = FilterMethods.methods.Float_Filter(val.JYQ, 3); // 经验预警流量
                                val.JYSZ = FilterMethods.methods.Float_Filter(val.JYSZ); // 经验预警闸前水位
                                val.JYEZ = FilterMethods.methods.Float_Filter(val.JYEZ); // 经验预警闸后水位
                                return val;
                            })
                            break;

                    }

                    return newData;
                }
            })

    },
    // 闸阀状态
    Survey_History_ZFZT(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable": // 历史表
                tableName = "zhafakongzhi/kaidulishi"
                break;

            case "openTimeTable": // 开启时长统计表
                tableName = "table/ST_Gatage_C"
                break;
        }

        axios.get(`/guanqu/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }



                // 默认过滤方法
                function defaultFilter(data) {  
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.tm = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 过闸流量
                                val.OD = FilterMethods.methods.Float_Filter(val.OD) // 闸门开度
                                val.UPZ = FilterMethods.methods.Float_Filter(val.UPZ) // 闸前水位
                                val.DWZ = FilterMethods.methods.Float_Filter(val.DWZ) // 闸后水位
                                return val;
                            })
                            break;
                        case "openTimeTable":
                            newData = data.map(val => {
                                // val.DT = FilterMethods.methods.dateFilter(val.DT); // 时间
                                // val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 平均流量
                                // val.A_Z = FilterMethods.methods.Float_Filter(val.A_Z) // 平均水位
                                // val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计水量
                                return val;
                            })
                            break;
                    }

                    return newData;
                }
            })

    },
    // 运行工况
    Survey_History_YXGK(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable": // 历史表
                tableName = "ST_StationStatus_H"
                break;

            case "auxiliaryTable":
                tableName = "ST_StationStatusType"
                break;
        }

        console.log(body);

        axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.VOL = FilterMethods.methods.Float_Filter(val.VOL, 1); // 电压
                                val.CS = FilterMethods.methods.CS_Filter(val.CS) // 通讯状态
                                return val;
                            })
                            break;

                        case "auxiliaryTable":
                            // newData = data.map(val => {
                            //     val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                            //     val.VOL = FilterMethods.methods.Float_Filter(val.VOL); // 电压
                            //     val.CS = FilterMethods.methods.CS_Filter(val.CS) // 通讯状态
                            //     return val;
                            // })
                            break;
                    }
                    return newData;
                }
            })

    },



    // 获取运行工况正常电压范围
    Survey_Around_YXGK(tableType, body, filter, callBack) {
        // var tableName;
        // // 根据不同类型的表，选择数据库中对应的表名
        // switch (tableType) {
        //     case "historyTable": // 历史表
        //         tableName = "ST_StationStatus_H"
        //         break;
        //
        //     case "auxiliaryTable":
        //         tableName = "ST_StationStatusType"
        //         break;
        // }
        delete body.TM;
        delete body._page_size;
        delete body.Time_max;
        delete body.Time_min

        axios.get(`/guanqu/table/ST_StationStatusType`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // switch (tableType) {
                    //     case "historyTable":
                    //         newData = data.map(val => {
                    //             val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                    //             val.VOL = FilterMethods.methods.Float_Filter(val.VOL,1); // 电压
                    //             val.CS = FilterMethods.methods.CS_Filter(val.CS) // 通讯状态
                    //             return val;
                    //         })
                    //         break;
                    //
                    //     case "auxiliaryTable":
                    //         // newData = data.map(val => {
                    //         //     val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                    //         //     val.VOL = FilterMethods.methods.Float_Filter(val.VOL); // 电压
                    //         //     val.CS = FilterMethods.methods.CS_Filter(val.CS) // 通讯状态
                    //         //     return val;
                    //         // })
                    //         break;
                    // }
                    return newData;
                }
            })



    },
    // 图像
    Survey_History_TX(body, filter, callBack) {
        axios.get(`/guanqu/table/ST_JPG_H`, {
            params: body
        })
            .then(res => {

                var data = res.data.list; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;

                    newData = data.map(val => {
                        val.url = val.Save_Path; // 时间
                        // val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                        // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                        return val;
                    })

                    return newData;
                }
            })
    },


    // 视频
    Survey_History_SP(body, filter, callBack) {
        axios.get(`/guanqu/shipin/gis`, {
            params: body
        })
            .then(res => {

                var data = res.data.features; // 数据
                var total = res.data.features.length; // 数据总条数
                console.log("Survey_History_SP",res.data.features);
                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;

                    newData = data.map(val => {
                        // val.url = val.Save_Path; // 时间
                        // val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                        // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                        return val;
                    })

                    return newData;
                }
            })
    },

    // 获取图层数据  /guanqu/zhafazhuangtai/gis
    // 获取具有过滤条件的图层数据
    getFeatrueLayer(type, body, callback, errCallback) {
        /*
        type为数字，以下为不同数字对应图层
        4: 渠道水情
        5: 闸阀水情
        6: 闸阀状态
        7: 图像
        8: 视频
        */

        var url = `/guanqu/${type}/gis`;

        // var body = {
        //     // _filter: new Object()
        // };
        // // 增加过滤字段
        // for (var key in fields) {
        //     body[key] = fields[key];
        // }

        axios.post(url, body).then(res => {
            if (typeof errCallback == "function") {
                errCallback();
            }
            if (typeof callback == "function") {
                callback(res);
            }
        });

    },
}
