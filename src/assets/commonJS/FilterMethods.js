var FilterMethods =
{
    methods: {
        // 日期过滤器
        dateFilter(tm, number, type, number2) {
            if (tm) {
                var dateArray = tm.split(' ');
                var date1 = dateArray[0]
                if (!number2 && number2 !== 0) {
                    date1 = dateArray[0].substring(2)
                } else {
                    date1 = dateArray[0].substring(number2)
                }

                var date2 = dateArray[1];
                // console.log(date1,date2)
                // console.log(date1);
                if (date2) {
                    date2 = date2.substring(0, number || 5)
                } else {
                    date2 = ''
                }

                if (type) {
                    switch (type) {
                        case "onlyDate":
                            return `${date1}`;

                        case "onlyTime":
                            return `${date2}${number == 2 ? ':00' : ''}`;
                    }
                }
                // return date;
                return `${date1}  ${date2}`;
            } else {
                return ''
            }
        },
        // 水位过滤器
        Z_Filter(Z, figure) {
            if (Z) {
                var Z = parseFloat(Z);

                if (Z !== 0) {
                    return Z.toFixed(figure || 2);
                }
                return '';
            } else {
                return ''
            }

        },

        // 流量过滤器
        Z_Filter2(agmt){
            // debugger;
            let oFl = agmt.split('.')
            let result = null
            if(oFl[1] === undefined){
                result = `${agmt}.00`
            }else if(oFl[1].length === 1){
                result = `${agmt}0`
            }else if(oFl[1].length === 2){
                result = `${agmt}`
            }else if(oFl[1].length >= 3){
                result = `${agmt.substring(0,agmt.length - 1)}`
            }else {
                result = agmt
            }
            return result
        },

        // 浮点型数值过滤器
        Float_Filter(Z, figure) {
            if (Z) {
                var Z = parseFloat(Z);

                if (Z !== 0) {
                    return Z.toFixed(figure || 2);
                }
                return '';
            } else {
                return ''
            }

        },
        // 浮点型数值过滤器
        Float_Filter2(Z, figure) {
            if (Z) {
                var Z = parseFloat(Z);

                if (Z !== 0) {
                    return Z.toFixed(1);
                }
                return '';
            } else {
                return ''
            }

        },
        // 水势过滤器
        WPTN_Filter(WPTN) {
            if (WPTN) {
                var WPTN = parseInt(WPTN);
                var newWPTN;
                switch (WPTN) {
                    case 6:
                        newWPTN = {
                            status: WPTN,
                            symbol: "一"
                        };
                        break;
                    case 5:

                        newWPTN = {
                            status: WPTN,
                            symbol: "↑"
                        };
                        break;
                    case 4:

                        newWPTN = {
                            status: WPTN,
                            symbol: "↓"
                        };
                        break;
                    case 0:

                        newWPTN = {
                            status: 6,
                            symbol: "一"
                        };
                        break;
                    default:

                        newWPTN = {
                            status: 6,
                            symbol: "一"
                        };
                        break

                }

                return newWPTN;
            } else {
                return {
                    status: 6,
                    symbol: "一"
                };
            }

        },
        // 通讯状态过滤器
        CS_Filter(CS) {
            if (CS && CS == 1) {
                return "正常"
            } else {
                return "异常"
            }
        },
        //
        STGR_Filter(STGR) {
            var STGR = parseInt(STGR);
            if (isNaN(STGR)) {
                return ""
            } else {
                var val;
                switch (STGR) {
                    case 1:
                        val = "国家重要站"
                        break;

                    case 2:
                        val = "省级重要站"
                        break;
                    case 3:
                        val = "一般站"
                        break;
                    case 4:
                        val = "实验或专用站"
                        break;
                    case 5:
                        val = "山洪站"
                        break;

                    case 6:
                        val = "临时站"
                        break;
                    case 7:
                        val = "其他站"
                        break;

                    case 8:
                        val = "灌区站"
                        break;
                }
                return val;
            }
        },
        // 站点大类归属过滤器
        STTP_Filter(STTP) {
            switch (STTP) {

                case "MM":
                    STTP = "气象站"
                    break;
                case "PP":
                    STTP = "雨量站"
                    break;
                case "BB":
                    STTP = "蒸发站"
                    break;
                case "ZQ":
                    STTP = "流量站"
                    break;
                case "DD":
                    STTP = "堰（闸）水位站"
                    break;
                case "ZZ":
                    STTP = "河道水位站"
                    break;
                case "TT":
                    STTP = "潮位站"
                    break;
                case "RR":
                    STTP = "水库站"
                    break;
                case "DP":
                    STTP = "泵站"
                    break;
                case "ZG":
                    STTP = "地下水位站"
                    break;
                case "SS":
                    STTP = "墒情站"
                    break;
                case "WQ":
                    STTP = "水质站"
                    break;
                case "SD":
                    STTP = "泥沙"
                    break;
                case "PH":
                    STTP = "图像站"
                    break;
                case "TV":
                    STTP = "视频站"
                    break;
                case "GC":
                    STTP = "闸控站"
                    break;
                case "CQ":
                    STTP = "渠道水位站"
                    break;
            }
            return STTP;
        },
        //动态统计图Y轴最大值
        get_echart_max(data) {
            var data = JSON.parse(JSON.stringify(data));
            data.forEach((val, index, array) => {
                if (val == '') {
                    array.splice(index, 1);
                }
            });
            var max = data[0];
            for (var i = 1; i < data.length; i++) {
                if (parseFloat(data[i]) > parseFloat(max)) {
                    max = data[i];
                }
            }
            return parseFloat(max);
        },
        //动态统计图Y轴最小值
        get_echart_min(data) {
            var data = JSON.parse(JSON.stringify(data));
            data.forEach((val, index, array) => {
                if (val == '') {
                    array.splice(index, 1);
                }
            });
            var min = data[0];
            for (var i = 1; i < data.length; i++) {
                if (parseFloat(data[i]) < parseFloat(min)) {
                    min = data[i];
                }
            }
            return parseFloat(min);
        },
        // 按层级截取行政区划码长度 县 乡镇 村
        ADDVCD_Array_Filter(ADDVCD_Array) {
            var length = ADDVCD_Array.length;
            var lastADDVCD = ADDVCD_Array[length - 1];
            var likeADDVCD;
            switch (length) {
                case 1:
                    likeADDVCD = lastADDVCD.substring(0, 6);
                    break;
                case 2:
                    likeADDVCD = lastADDVCD.substring(0, 9);
                    break;
                case 3:
                    likeADDVCD = lastADDVCD.substring(0, 12);
                    break;
            }
            return likeADDVCD;
        },
        // 按层级截取行政区划码长度   乡镇 村
        SUB_ADDVCD_Array_Filter(ADDVCD_Array) {
            var length = ADDVCD_Array.length;
            var lastADDVCD = ADDVCD_Array[length - 1];
            var likeADDVCD;
            switch (length) {
                case 1:
                    likeADDVCD = lastADDVCD.substring(0, 9);
                    break;
                case 2:
                    likeADDVCD = lastADDVCD.substring(0, 12);
                    break;
            }
            return likeADDVCD;
        },
        // 按层级截取渠道编码长度
        Canal_Code_Array_Filter(Canal_Code_Array) {
            var length = Canal_Code_Array.length;
            var lastCanal_Code = Canal_Code_Array[length - 1];
            // var likeCanal_Code;
            // switch (length) {
            //     case 1:
            //         likeCanal_Code = lastCanal_Code.substring(0, 5);
            //         break;
            //     case 2:
            //         likeCanal_Code = lastCanal_Code.substring(0, 9);
            //         break;
            // }
            return lastCanal_Code;
        },
        // 渠道树
        QuDao_Tree_Filter(data) {
            // var totalLength = 0;

            data = addTitle(data, "canal_name"); // 增加标题

            var ganQuList = getGanQuList(data);

            // totalLength += ganQuList.length;

            ganQuList = ganQuList.map((val) => {
                // 支渠
                var this_ZhiquList = getZhiquList(data, val.canal_code);


                this_ZhiquList.map((zhuquVal) => { // 支渠站加其他渠道
                    var this_ZhiQuSite_otherQuDao_List = get_ZhiQuSite_otherQuDao_List(data, zhuquVal.canal_code);
                    zhuquVal.children = this_ZhiQuSite_otherQuDao_List;
                    // if (zhuquVal.children.length > 0) {
                    //     totalLength += zhuquVal.children.length;
                    //     console.log(zhuquVal.canal_name,zhuquVal.children);
                    // }
                    return zhuquVal;
                });

                // 干渠站
                var this_GanQuSiteList = getGanQuSiteList(data, val.canal_code);
                val.children = this_ZhiquList.concat(this_GanQuSiteList);
                // totalLength += val.children.length
                return val;
            })



            var other = {
                label: "其他",
                children: getOtherSiteList(data)
            };
            ganQuList.push(other);
            // totalLength += other.children.length
            // console.log("dataLength", data.length)
            // console.log("totalLength", totalLength)

            var guanqutree = new Object();
            var siteinfo = new Object();
            data.some((val,index) => {
                if(val.bj == 0){
                    siteinfo.canal_name = val.canal_name;
                    siteinfo.canal_code = val.canal_code;
                    return true;
                }
            });
            guanqutree.siteinfo = siteinfo;
            guanqutree.data = ganQuList;
            return guanqutree;

            // 函数
            function getGanQuList(data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.upper_Canal_code == -1 && val.bj == 1) {
                        return true;
                    }
                })
                return newList;
            }


            function getOtherSiteList(data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.upper_Canal_code == -1 && val.bj == 0) {
                        return true;
                    }
                })
                return newList;
            }

            function getZhiquList(data, upper_Canal_code) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.upper_Canal_code == upper_Canal_code && val.bj == "1") {
                        return true
                    }
                })
                return newList
            }

            function getGanQuSiteList(data, upper_Canal_code) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.upper_Canal_code == upper_Canal_code && val.bj == "0") {
                        return true
                    }
                })
                return newList
            }

            function get_ZhiQuSite_otherQuDao_List(data, upper_Canal_code) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.upper_Canal_code == upper_Canal_code) {
                        return true
                    }
                })
                return newList
            }

            function addTitle(array, fieldName) {
                var newList;
                newList = array.map((val) => {
                    val.label = val[fieldName];
                    if (val.bj == 0) {
                        val.label = `${val[fieldName]}【站点】`;
                    }
                    return val;
                })
                return newList;
            }
        },
        // 行政区划树
        XingZheng_Tree_Filter(up_adcd, data) {
            data = addTitle(data, "ad_nm"); // 增加标题

            var Mogami = getMogami(up_adcd, data);

            var res = new Object();

            getstcd(data);

            res.data = Mogami;
            // var total = Mogami.length;

            Mogami.map(val => {
                val.children = getChildrenList(val.ad_cd, data);
                // total += val.children.length;
                recursion(val.children, val.title);

                return val;
            })
            // console.warn("data",data.length)
            // console.warn("total",total)
            // console.warn("site",getSiteList(data))
            return res;

            function getstcd(array) {
                array.some((val, index) => {
                    if (val.bj == 0) {
                        res.stcd = val.ad_cd;
                        res.stnm = val.label;
                        return true;
                    }
                });
            }
            // var obj = new Object()
            // obj.stcd =
            // 函数
            function getMogami(up_adcd, data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.up_adcd == up_adcd) {
                        return true;
                    }
                })
                return newList;
            }

            function getChildrenList(ad_cd, data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.up_adcd == ad_cd) {
                        return true;
                    }
                })
                return newList;
            }

            function getSiteList(data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.bj == 0) {
                        return true;
                    }
                })
                return newList;
            }

            function recursion(children, title) {
                if (children.length > 0) {
                    children.map(val => {
                        val.children = getChildrenList(val.ad_cd, data);
                        // total += val.children.length;
                        recursion(val.children, val.title);
                        return val
                    })

                }
            }

            function addTitle(array, fieldName) {
                var newList;
                newList = array.map((val) => {
                    val.label = val[fieldName];
                    if (val.bj == 0) {
                        val.label = `${val[fieldName]}【站点】`;
                    }

                    return val;
                })
                return newList;
            }
        },
        // 饿了么日期选择器值过滤
        elDatePicker_Filter(date, type) {
            if (date.constructor === Array) {
                var start, start_Year, start_Month, start_Day, start_Hours, start_Minutes, start_Seconds;
                start = date[0];
                start_Year = start.getFullYear();
                start_Month = addZero((start.getMonth() + 1));
                start_Day = addZero(start.getDate());
                start_Hours = addZero(start.getHours());
                start_Minutes = addZero(start.getMinutes());
                start_Seconds = addZero(start.getSeconds());

                start = `${start_Year}-${start_Month}-${start_Day} ${start_Hours}:${start_Minutes}`;

                var end, end_Year, end_Month, end_Day, end_Hours, end_Minutes, end_Seconds;
                end = date[1];
                end_Year = end.getFullYear();
                end_Month = addZero(end.getMonth() + 1);
                end_Day = addZero(end.getDate());
                end_Hours = addZero(end.getHours());
                end_Minutes = addZero(end.getMinutes());
                end_Seconds = addZero(end.getSeconds());

                end = `${end_Year}-${end_Month}-${end_Day} ${end_Hours}:${end_Minutes}`;

                if (type) {
                    switch (type) {
                        case "monthTable":
                            // return `btt,${start_Year}-${start_Month}-1,${end_Year}-${end_Month}-30`
                            return `btt,${start_Year}-${start_Month},${end_Year}-${end_Month}`
                        // return {
                        //     YE: `bt,${start_Year},${end_Year}`,
                        //     MON: `bt,${start_Month},${end_Month}`
                        // }
                        case "hourTable":
                            return `btt,${start_Year}-${start_Month}-${start_Day} ${start_Hours},${end_Year}-${end_Month}-${end_Day} ${end_Hours}`
                        case "tenDayTable":
                            return `btt,${start_Year}-${start_Month}-1,${end_Year}-${end_Month}-30`
                        case "dayTable":
                            return `btt,${start_Year}-${start_Month}-${start_Day},${end_Year}-${end_Month}-${end_Day}`
                        case "maxQTable":
                            return `bt,${start_Year},${end_Year}`
                        case "include_seconds":
                            return `btt,${start}:${start_Seconds},${end}:${end_Seconds}`;
                    }

                }

                return `btt,${start},${end}`;


            } else if (date.constructor === Date) {
                var Year, Month, Day, Hours, Minutes;
                Year = date.getFullYear();
                Month = addZero((date.getMonth() + 1));
                Day = addZero(date.getDate());
                Hours = addZero(date.getHours());
                Minutes = addZero(date.getMinutes());

                switch (type) {
                    case "onlyYear":

                        return Year;

                    case "onlyMonth":
                        if(Month < 10) Month = `0${Month}`
                        return `${Year}-${Month}`;
                        break;

                    default:
                        break;
                }

            }

            function addZero(item) {
                item = String(item);
                if (item.length == 1) {
                    return `0${item}`
                }

                return item;
            }

        },
        // 排序过滤
        sort_Filter(item) {
            var order = item.order,
                key = item.key;
            switch (order) {
                case "normal":
                    return null;
                case "asc": // 升序
                    return `${key}`;
                case "desc": // 降序
                    return `${key} desc`;
            }
        },
        // 闸阀状态历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_KDLS_data_into_ehart_data(data, tableType, reverse) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            if (reverse) {
                _data = _data.reverse(); // 数组倒序
            }
            console.log(_data);
            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object()

            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "水位过程线";


                    // y1轴
                    echartData.y1.name = "库水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字
                    //
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var tm = val.tm.split("  ")
                        // var time = tm[1];
                        var time = `${tm[0]} ${tm[1]}`;
                        return time;
                    });


                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    //
                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字
                    //
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // // y3轴
                    echartData.y3.name = "月累计水量"; // Y3轴名字
                    //
                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // // y3轴
                    // echartData.y3.name = "小时累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "WQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = `${val.DT.substring(2)} ${val.tm}` //FilterMethods.methods.dateFilter(val.DT, 3);
                        return time;
                    });

                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    //
                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字
                    //
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // // y3轴
                    echartData.y3.name = "月累计水量"; // Y3轴名字
                    //
                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // // y3轴
                    // echartData.y3.name = "小时累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "WQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.tm; //FilterMethods.methods.dateFilter(val.DT, 3);
                        return time;
                    });
                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "库前水位"; // Y1轴名字


                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    echartData.y2.name = "库下水位"; // Y2轴名字
                    //
                    // // y3轴
                    echartData.y3.name = "月累计水量"; // Y3轴名字
                    //
                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = `${val.YR}-${val.MON}`;
                        return time;
                    });
                    break;

            }

            return echartData;
        },

        // 水库水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_SWKR_data_into_ehart_data(data, tableType, reverse) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            console.log('871',_data);
            if (reverse) {
                _data = _data.reverse(); // 数组倒序
            }

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "水位库容";


                    // y1轴
                    echartData.y1.name = "水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });


                    // y2轴
                    echartData.y2.name = "库容"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "STCP", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // y3轴

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM.substring(2,val.TM.length-3);
                        console.log(time)
                        return time
                    });

                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });


                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        // if(val.TM < 10){
                        //     val.TM = `0${val.TM}`
                        // }
                        var time = `${val.dt}`;
                        return time;
                    });


                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    //
                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // // y3轴
                    // echartData.y3.name = "日均闸下水位"; // Y3轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_DWZ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });
                    //
                    // var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                    //     y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    // echartData.y3.max = y3max; // y2最大值
                    // echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.tm;
                        return time;
                    });


                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    //
                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // // y3轴
                    // echartData.y3.name = "月均闸下水位"; // Y3轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_DWZ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });
                    //
                    // var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                    //     y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    // echartData.y3.max = y3max; // y2最大值
                    // echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = `${val.dt}`;
                        return time;
                    });
                    break;

            }

            return echartData;
        },

        //大坝安全历史统计表数据 转 echart图形用数据 返回一个对象
        transform_SAFE_data_into_ehart_data(data, jctype, reverse){
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            if (reverse) {
                _data = _data.reverse(); // 数组倒序
            }
            var xname,yname,vname;
            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
            }
            switch (jctype) {
                case "sll":
                    echartData.chartName="渗流曲线图";
                    echartData.y1.name="渗流量";
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "spprwl", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    echartData.y2.name="渗流水温";
                    echartData.y2.list=FilterMethods.methods.newArrayByObjArray(_data, "tm", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(1);
                    });
                    break;
                case "slyl":
                    echartData.chartName="渗压曲线图";
                    echartData.y1.name="渗压水位";
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "spprwm", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    break;
                case "wybx":
                    echartData.chartName="位移曲线图";
                    echartData.y1.name="X向水平位移";
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "xhrdsval", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    echartData.y2.name="Y向水平位移";
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "yhrdsval", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    for(var i=0;i<_data.length;i++){
                        var obj=_data[i];
                        if(i==0){
                            xname=obj.xhrds.substring(0,3);
                            yname=obj.yhrds.substring(0,3);  
                        }
                        if(i>0){
                            if(obj.xhrds.substring(0,3)!=xname){
                                xname="位移";
                            }
                            if(obj.yhrds.substring(0,3)!=yname){
                                yname="位移";
                            }
                        }                      
                    }
                    echartData.y1.title=xname;
                    echartData.y2.title=yname;
                    break;
                case "cjbx":
                    echartData.chartName="沉降曲线图";
                    echartData.y1.name="垂直位移";
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "vrdsval", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    for(var i=0;i<_data.length;i++){
                        var obj=_data[i];
                        if(i==0){
                            vname=obj.vrds.substring(0,2);
                        }
                        if(i>0){
                            if(obj.vrds.substring(0,2)!=vname){
                                vname="位移";
                            }
                        }
                    }
                    echartData.y1.title=vname;
                    break;
            }
                // x轴
                echartData.x.list = _data.map((val, index, array) => {
                    var time = val.mstm;
                    return time;
                });
                return echartData;
        },
        // 水库水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_SKSQ_data_into_ehart_data(data, tableType, reverse) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            if (reverse) {
                _data = _data.reverse(); // 数组倒序
            }

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                y4: new Object(),
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "历史表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });


                    // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // y3轴
                    echartData.y3.name = "出库流量"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "OTQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // y3轴
                    echartData.y4.name = "库容"; // Y3轴名字

                    echartData.y4.list = FilterMethods.methods.newArrayByObjArray(_data, "W", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.tm
                        console.log(time)
                        return time;
                    });
                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });


                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        // if(val.TM < 10){
                        //     val.TM = `0${val.TM}`
                        // }
                        var time = `${val.dt}`;
                        return time;
                    });


                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    //
                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // // y3轴
                    // echartData.y3.name = "日均闸下水位"; // Y3轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_DWZ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });
                    //
                    // var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                    //     y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    // echartData.y3.max = y3max; // y2最大值
                    // echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.tm;
                        return time;
                    });


                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.name = "库前水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    //
                    // // y2轴
                    echartData.y2.name = "库下水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "BLRZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // // y3轴
                    // echartData.y3.name = "月均闸下水位"; // Y3轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_DWZ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });
                    //
                    // var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                    //     y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    // echartData.y3.max = y3max; // y2最大值
                    // echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = `${val.dt}`;
                        return time;
                    });
                    break;

            }

            return echartData;
        },
        // 河道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_HDSQ_data_into_ehart_data(data, tableType, reverse) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            if (reverse) {
                _data = _data.reverse(); // 数组倒序
            }

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object()
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "水位过程线";


                    // y1轴
                    echartData.y1.name = "水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "Z", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    echartData.y2.name = "流量"; // Y1轴名字


                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.tm;
                        return time;
                    });


                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "平均水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "平均流量"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "INQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // // y3轴
                    // echartData.y3.name = "小时累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "WQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        if(val.tm < 10){
                            val.tm = `0${val.tm}`
                        }
                        var time = `${val.DT}` //FilterMethods.methods.dateFilter(val.DT, 3);
                        return time;
                    });

                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "日平均水位"; // Y1轴名字


                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "INQ", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    echartData.y2.name = "日平均流量"; // Y2轴名字
                    //
                    // // y3轴
                    // echartData.y3.name = "日累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.TM;
                        return time;
                    });
                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "月平均水位"; // Y1轴名字


                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "INQ", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    echartData.y2.name = "月平均流量"; // Y2轴名字
                    //
                    // // y3轴
                    // echartData.y3.name = "月累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MWQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = `${val.dt}`;
                        return time;
                    });
                    break;

            }

            return echartData;
        },
        // 雨情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_YQ_data_into_ehart_data(data, tableType, reverse) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            console.log(_data)
            if (reverse) {
                _data = _data.reverse(); // 数组倒序
            }

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "雨量柱状图";


                    // y1轴
                    echartData.y1.name = "降水量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "DRP", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(1);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.tm;
                        return time;
                    });


                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "降雨量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "P", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(1);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    //
                    // // y2轴
                    // echartData.y2.name = "平均水位"; // Y2轴名字
                    //
                    // echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "A_Z", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });

                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    // echartData.y3.name = "小时累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "WQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.DT //FilterMethods.methods.dateFilter(val.DT, 3);
                        return time;
                    });
                    
                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "p", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(1);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "日降雨量"; // Y1轴名字


                    // y2轴
                    // echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "P", val => {
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // echartData.y2.name = "日平均水位"; // Y2轴名字
                    //
                    // // y3轴
                    // echartData.y3.name = "日累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.TM;
                        return time;
                    });
                    break;
                case "tenDaysTable":
                    echartData.chartName = "旬表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "P", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(1);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "旬降雨量"; // Y1轴名字


                    // y2轴
                    // echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "P", val => {
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // echartData.y2.name = "日平均水位"; // Y2轴名字
                    //
                    // // y3轴
                    // echartData.y3.name = "日累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.DT;
                        return time;
                    });
                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "P", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(1);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "月降雨量"; // Y1轴名字


                    // y2轴
                    // echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_Z", val => {
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // echartData.y2.name = "月平均水位"; // Y2轴名字
                    //
                    // // y3轴
                    // echartData.y3.name = "月累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MWQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = `${val.DT}`;
                        return time;
                    });
                    break;
                case "yearTable":
                    echartData.chartName = "年表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "P", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(1);
                    });

                    // var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                    //     y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    // echartData.y1.max = y1max; // y1最大值
                    // echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "年降雨量"; // Y1轴名字


                    // y2轴
                    // echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_Z", val => {
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(2);
                    // });
                    //
                    // var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                    //     y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    // echartData.y2.max = y2max; // y2最大值
                    // echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    //
                    // echartData.y2.name = "月平均水位"; // Y2轴名字
                    //
                    // // y3轴
                    // echartData.y3.name = "月累计水量"; // Y2轴名字
                    //
                    // echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MWQ", val => { // 过滤
                    //     if (isNaN(val) || val === "" || val == null) {
                    //         return 0;
                    //     }
                    //     return parseFloat(val).toFixed(3);
                    // });


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.YR;
                        return time;
                    });
                    break;
            }

            return echartData;
        },
        // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_QDSQ_data_into_ehart_data(data, tableType, reverse) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            if (reverse) {
                _data = _data.reverse(); // 数组倒序
            }

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "历史表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "水深"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "Z", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.tm;
                        return time;
                    });


                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "平均流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "A_Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "平均水深"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "A_Z", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "小时累计水量"; // Y2轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "WQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.dt //FilterMethods.methods.dateFilter(val.DT, 3);
                        return time;
                    });

                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_Q", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "日平均流量"; // Y1轴名字


                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_Z", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    echartData.y2.name = "日平均水深"; // Y2轴名字

                    // y3轴
                    echartData.y3.name = "日累计水量"; // Y2轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.tm;
                        return time;
                    });
                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_Q", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "月平均流量"; // Y1轴名字


                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_Z", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    echartData.y2.name = "月平均水深"; // Y2轴名字

                    // y3轴
                    echartData.y3.name = "月累计水量"; // Y2轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.dt;
                        return time;
                    });
                    break;

            }

            return echartData;
        },
        // 闸阀水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_ZFSQ_data_into_ehart_data(data, tableType, reverse) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            if (reverse) {
                _data = _data.reverse(); // 数组倒序
            }

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                y: new Object()
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "历史表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "闸上水深"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "闸下水深"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    echartData.y3.max = y3max; // y2最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        console.log('1895',val.TM);
                        var time = val.TM;
                        return time;
                    });

                    // y轴
                    var ymax_list = [y1max, y2max, y3max]
                    var ymax = FilterMethods.methods.get_echart_max(ymax_list);
                    var ymin_list = [y1max, y2max, y3max]
                    var ymin = FilterMethods.methods.get_echart_max(ymin_list);

                    echartData.y.max = ymax;
                    echartData.y.min = ymin;

                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "WQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "闸上水深"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "A_UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "闸下水深"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "A_DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    echartData.y3.max = y3max; // y2最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.dt;
                        return time;
                    });


                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "日均闸上水深"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "日均闸下水深"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    echartData.y3.max = y3max; // y2最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.tm;
                        return time;
                    });


                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "月均闸上水深"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "月均闸下水深"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    echartData.y3.max = y3max; // y2最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.dt;
                        return time;
                    });
                    break;

            }

            return echartData;
        },
        // 闸阀状态历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_ZFZT_data_into_ehart_data(data, tableType) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            _data = _data.reverse(); // 数组倒序

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                y4: new Object(),
                y: new Object()
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "历史表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "闸上水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(3),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(3);
                    echartData.y2.max = y2max; // y1最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y1最小值

                    // y3轴
                    echartData.y3.name = "闸下水位"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(3),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(3);
                    echartData.y3.max = y3max; // y3最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y3最小值

                    // y4轴
                    echartData.y4.name = "闸门开度"; // Y3轴名字

                    echartData.y4.list = FilterMethods.methods.newArrayByObjArray(_data, "OD", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y4max = (FilterMethods.methods.get_echart_max(echartData.y4.list) + 0.5).toFixed(3),
                        y4min = (FilterMethods.methods.get_echart_min(echartData.y4.list) - 0.5).toFixed(3);
                    echartData.y4.max = y4max; // y4最大值
                    echartData.y4.min = y4min < 0 ? 0 : y4min; // y4最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });

                    // y轴
                    var ymax_list = [y1max, y2max, y3max, y4max]
                    var ymax = FilterMethods.methods.get_echart_max(ymax_list);
                    var ymin_list = [y1min, y2min, y3min, y4min]
                    var ymin = FilterMethods.methods.get_echart_min(ymin_list);
                    if(ymin<0){
                        ymin=0
                    }

                    echartData.y.max = ymax;
                    echartData.y.min = ymin;

                    break;

            }

            return echartData;
        },

        // 运行工况历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_YXGK_data_into_ehart_data(data, tableType) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
             _data = _data.reverse(); // 数组倒序

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
            }
            echartData.chartName = "";

            switch (tableType) {
                case "zhuangtaishuju":
                    // y1轴
                    echartData.y1.name = "电压"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "VOL", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(1);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {

                        var time = val.tm;
                        return time;
                    });
                    break;

            }



            return echartData;
        },

        // 抽离对象数组中每一项对象中某字段组合成新的数组
        newArrayByObjArray(array, attr, callback) {
            var newArray = array.map(val => {
                var newVal = val[attr];
                if (typeof callback == "function") {
                    newVal = callback(newVal);
                }
                return newVal;
            });
            return newArray;
        },
        //抽离GIS图层对象数组中每一项对象中某字段组合成新的数组
        newGisArrayByGisArray(array, attr, callback) {
            var newArray = array.map(val => {
                var newVal = val.rowinfo[attr];
                if (typeof callback == "function") {
                    newVal = callback(newVal);
                }
                return newVal;
            });
            return newArray;
        }
    },

}

export default FilterMethods
