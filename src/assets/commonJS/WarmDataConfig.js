import axios from 'axios';
var WarmDataConfig= {
    methods: {
        //获取灵活字段下拉框信息
        Get_WrpFieldinfo(formid,fieldid,callback){
            this.axios.get('/fieldinfo/common/'+formid+'&'+fieldid)
                    .then(res => {
                        var data = res.data;
                        
                        if (typeof callback == "function") {

                            callback(data);
                        }
                    });
        },
        //获取短信灵活字段下拉框
        Get_SysFieldinfo(fcode,fnum,callback){
            this.axios.get('/alarm/fieldinfo/'+fcode+'&'+fnum)
                    .then(res => {
                        var data = res.data;
                        
                        if (typeof callback == "function") {

                            callback(data);
                        }
                    });
        },
        //获取管理机构下拉框
        Get_Gljginfo(types,callback){
            this.axios.get('/waterplan/gljginfo/'+types)
                    .then(res => {
                        var data = res.data;
                        
                        if (typeof callback == "function") {

                            callback(data);
                        }
                    });
        },
        //获取表格选取下拉框
        Get_SysForminfo(fcode,fnum,callback){
            this.axios.get('/fieldinfo/formcommon/'+fcode+'&'+fnum)
                    .then(res => {
                        var data = res.data;
                        
                        if (typeof callback == "function") {

                            callback(data);
                        }
                    });
        },
        //开始时间和结束时间获取
        datetimeFilter(date){
            if(date==null){
                return this.$Message.warning("请选择开始时间和结束时间！");
            }
            var start, start_Year, start_Month, start_Day, start_Hours;
            start = date[0];
            start_Year = start.getFullYear();
            start_Month = this.addZero((start.getMonth() + 1));
            start_Day = this.addZero(start.getDate());
            start_Hours = this.addZero(start.getHours());

            start = `${start_Year}-${start_Month}-${start_Day} ${start_Hours}:00:00`;

            var end, end_Year, end_Month, end_Day, end_Hours;
            end = date[1];
            end_Year = end.getFullYear();
            end_Month = this.addZero(end.getMonth() + 1);
            end_Day = this.addZero(end.getDate());
            end_Hours = this.addZero(end.getHours());

            end = `${end_Year}-${end_Month}-${end_Day} ${end_Hours}:59:59`;
            var timearray=new Array();
            timearray.push(start);
            timearray.push(end);
            return timearray;
        },
        //开始日期和结束日期获取
        datearrayFilter(date){
            if(date==null){
                return this.$Message.warning("请选择开始时间和结束时间！");
            }
            var start, start_Year, start_Month, start_Day;
            start = date[0];
            start_Year = start.getFullYear();
            start_Month = this.addZero((start.getMonth() + 1));
            start_Day = this.addZero(start.getDate());

            start = `${start_Year}-${start_Month}-${start_Day}`;

            var end, end_Year, end_Month, end_Day;
            end = date[1];
            end_Year = end.getFullYear();
            end_Month = this.addZero(end.getMonth() + 1);
            end_Day = this.addZero(end.getDate());

            end = `${end_Year}-${end_Month}-${end_Day}`;
            var timearray=new Array();
            timearray.push(start);
            timearray.push(end);
            return timearray;
        },
        addZero(item) {
            item = String(item);
            if (item.length == 1) {
                return `0${item}`
            }

            return item;
        },
        //获取字符串长度
        strlen(str){  
            var len = 0;  
            for (var i=0; i<str.length; i++) {   
            var c = str.charCodeAt(i);   
            //单字节加1   
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
            len++;   
            }   
            else {   
            len+=2;   
            }   
            }   
            return len;  
        },
    }
}
export default WarmDataConfig