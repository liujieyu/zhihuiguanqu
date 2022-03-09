import FilterMethods from './FilterMethods'
var GetDataMethods = {
    methods: {
        // 获取行政区划数据
        getTableData_WRP_AD_B(callback) {
            this.axios.get('/guanqu/gis/system_info')
                .then(res => {
                    var data = res.data.WRP_AD_B;
                    var citys = new Array();

                    data.forEach((val, index, array) => {
                        if (val.WRP_AD_BTop == null) {
                            // console.log('爸爸组',val.AD_CD);
                            val.value = val.AD_CD;
                            val.label = val.AD_NM;
                            val.title = val.AD_NM;
                            citys.push(val);
                        }
                    })

                    var lg = 0
                    // 获取孩子的递归方法
                    function getChildren(array, data) {

                        array.forEach(parent => {
                            var children = new Array();
                            data.forEach((val, index, array) => {
                                if (val.WRP_AD_BTop != null&&val.WRP_AD_BTop.AD_CD == parent.AD_CD) {
                                    // console.log('孩子组',val.AD_CD);
                                    val.value = val.AD_CD;
                                    val.label = val.AD_NM;
                                    val.title = val.AD_NM;
                                    children.push(val);

                                }

                            })

                            if (children.length > 0) {
                                lg = lg + children.length;
                                parent.children = children;
                                return getChildren(parent.children, data);
                            }


                        })
                        // // 剩余的data
                        // data = data.map((val, index) => {
                        //     val.value = val.AD_CD;
                        //     val.label = val.AD_NM;
                        //     val.title = val.AD_NM;
                        //     return val;
                        // })
                        

                        return array;

                    }
                    
                    citys = getChildren(citys, data);


                    console.log("获取行政区划数据",citys)
                    if (typeof callback == "function") {

                        callback(citys);
                    }
                })
        },
        // 获取输排水渠道数据
        getTableData_WRP_IrrBTCanalSystem(callback) {
            this.axios.get('/guanqu/admin/WRP_IrrBTCanalSystem?_page_size=999999')
                .then(res => {
                    var data = res.data;
                    // console.log(data);
                    var qudaoList = new Array();

                    data.forEach((val, index, array) => {
                        if (val.WRP_IrrBTCanalSystemTop == null) {
                            val.value = val.Canal_Code;
                            val.label = val.Canal_Name;
                            val.title = val.Canal_Name;
                            qudaoList.push(val);
                        }
                    })

                    // 获取孩子的递归方法
                    function getChildren(array, data) {

                        array.forEach(parent => {
                            var children = new Array();
                            data.forEach((val, index, array) => {
                                if (val.WRP_IrrBTCanalSystemTop != null&&val.WRP_IrrBTCanalSystemTop.Canal_Code == parent.Canal_Code) {
                                    val.value = val.Canal_Code;
                                    val.label = val.Canal_Name;
                                    val.title = val.Canal_Name;
                                    children.push(val);

                                }

                            })

                            if (children.length > 0) {
                                parent.children = children;
                                return getChildren(parent.children, data);
                            }


                        })



                        return array;

                    }
                    
                    qudaoList = getChildren(qudaoList, data);
                    if (typeof callback == "function") {
                        callback(qudaoList);
                    }
                })
        },
        // 获取输排水渠道树数据
        getTableData_qudao_tree(callback) {
            this.axios.get('/guanqu/table/xingzhen_tree')
                .then(res => {
                    var ganQuList = FilterMethods.methods.QuDao_Tree_Filter(res.data);

                    if (typeof callback == "function") {
                        callback(ganQuList)
                    }
                })
        },
        // 获取距离现在XX天/小时的时间
        getTimeAgo(type, time) {
            var presentDate = new Date();
            presentDate = presentDate.valueOf();
            switch (type) {
                case "day":
                var newDate = presentDate - time * 24 * 60 * 60 * 1000;
                    break;
                case "history":
                var newDate = presentDate - time * 60 * 60 * 1000;
                    break;
            }

            if (type == "hour") {
                return time;
                // return `${Hours}:${Minutes}`;
            }

            newDate = new Date(newDate);


            var FullYear = newDate.getFullYear();
            var Month = newDate.getMonth() + 1;
            var Day = newDate.getDate();
            var Hours = newDate.getHours();
            var Minutes = newDate.getMinutes();
                
            

            return `${FullYear}-${Month}-${Day} ${Hours}:${Minutes}`;
        },
        // 获取今天日期(xxxx-xx-xx 00:00)
        getTodayDate() {
            var todayDate = new Date();
            var FullYear = todayDate.getFullYear();
            var Month = todayDate.getMonth() + 1;
            var Day = todayDate.getDate();

            return `${FullYear}-${Month}-${Day} 00:00`;
        },
        // 获取今天零点的时间
        zeroPointOfTheDay() {
            var date = new Date();
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        },
        // 获取今天零点到今天现在的时间段 (数组)
        zeroPointToNowOfTheDay() {
            var start = GetDataMethods.methods.zeroPointOfTheDay();
            var end = new Date();

            var timeSlot = [start, end];

            return timeSlot;
        }
    }
}

export default GetDataMethods