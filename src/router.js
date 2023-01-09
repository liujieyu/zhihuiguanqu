import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
// 我是真滴帅
export default new Router({
    routes: [
        {path: '/', component: () => import('./views/Login.vue')},
        {path: '/login', component: () => import('./views/Login.vue')},
        {path: '/view', component: () => import('./views/View.vue')},
        //仪表图
        { path: '/yixiang-chart',component: () => import('./warm/yixiang-chart/xian-chart.vue') },
        { path: '/yixiang-wschart',component: () => import('./warm/yixiang-chart/wschart.vue') },
        { path: '/yixiang-kschart',component: () => import('./warm/yixiang-chart/kschart.vue') },
        { path: '/hometow', component: () => import('./HomeTow.vue')},
        {path: '/home', component: () => import('./Home.vue'),
        children:[
            //历史数据-雨晴信息-日表
        {path: '/table-yqxx', component: () => import('./table/table-xxfw/table-yqxx/table-day.vue')},
        // //历史数据-闸阀水情-日表
        // { path: '/table-zfsq',component: () => import('./table/table-zfsq/list.vue') },
        // //历史数据-闸阀状态-日表
        // { path: '/table-zfzt',component: () => import('./table/table-zfzt/list.vue') },
        // //历史数据-图像
        // { path: '/table-tx',component: () => import('./table/table-tx/list.vue') },
        // //历史数据-视频
        // { path: '/table-sp',component: () => import('./table/table-sp/list.vue') },
        // //历史数据-运行工况
        // { path: '/table-yxgk',component: () => import('./table/table-yxgk/list.vue') },
        // //历史数据-水库水情
        // { path: '/table-sksq',component: () => import('./table/table-sksq/list.vue') },

        //历史数据-渠道水情-日表
        {path: '/table-qdsq', component: () => import('./table/table-qdsq/list.vue')},
        //历史数据-闸阀水情-日表
        {path: '/table-zfsq', component: () => import('./table/table-zfsq/list.vue')},
        //历史数据-闸阀状态-日表
        {path: '/table-zfzt', component: () => import('./table/table-zfzt/list.vue')},
        //历史数据-图像
        {path: '/table-tx', component: () => import('./table/table-tx/list.vue')},
        //历史数据-视频
        {path: '/table-sp', component: () => import('./table/table-sp/list.vue')},
        //历史数据-运行工况
        {path: '/table-yxgk', component: () => import('./table/table-yxgk/list.vue')},
        //历史数据-水库水情
        {path: '/table-sksq', component: () => import('./table/table-sksq/list.vue')},
        // 历史数据-水位库容
        {path: '/table-swkr', component: () => import('./table/table-swkrfx/list.vue')},


        //基础数据-灌区信息
        {path: '/tablebasedata-gqxx', component: () => import('./table/table-basedata/table-gqxx/list.vue')},
        //基础数据-渠道
        {path: '/tablebasedata-qd', component: () => import('./table/table-basedata/table-qd/list.vue')},
        //基础数据-用水单元
        {path: '/tablejcsj-ysdy', component: () => import('./table/table-basedata/table-ysdy/list.vue')},
        //基础数据-监测站点
        {path: '/tablejcsj-jczd', component: () => import('./table/table-basedata/table-jczd/list.vue')},
        //基础数据-多媒体
        {path: '/tablejcsj-dmt', component: () => import('./table/table-basedata/table-dmt/list.vue')},
        //基础数据-建筑物
        {path: '/tablejcsj-jzw', component: () => import('./table/table-basedata/table-jzw/list.vue')},
        //基础数据-行政单元
        {path: '/tablejcsj-xzdy', component: () => import('./table/table-basedata/table-xzdy/list.vue')},
        //基础数据-水源信息
        {path: '/tablejcsj-syxx', component: () => import('./table/table-basedata/table-syxx/list.vue')},
        //基础数据-取水设施
        {path: '/tablejcsj-szxx', component: () => import('./table/table-basedata/table-qsss/list.vue')},
        //基础数据-用水户
        {path: '/tablejcsj-ysh', component: () => import('./table/table-basedata/table-ysh/list.vue')},
        //基础数据-流域信息
        {path: '/tablejcsj-lyxx', component: () => import('./table/table-basedata/table-lyxx/list.vue')},
        //基础数据-通讯录
        {path: '/tablejcsj-txl', component: () => import('./table/table-basedata/table-txl/list.vue')},
        {path: '/tabletest-test1', component: () => import('./table/test/test1.vue')},
        {path: '/tabletest-test2', component: () => import('./table/test/test2.vue')},
        {path: '/tabletest-test3', component: () => import('./table/test/test3.vue')},
        {path: '/tabletest-test4', component: () => import('./table/test/test4.vue')},
        {path: '/tabletest-test5', component: () => import('./table/test/test5.vue')},
        {path: '/tabletest-test6', component: () => import('./table/test/test6.vue')},
        {path: '/tabletest-test7', component: () => import('./table/test/test7.vue')},
        {path: '/tabletest-test8', component: () => import('./table/test/test8.vue')},
        {path: '/tabletest-test9', component: () => import('./table/test/test9.vue')},
        {path: '/tabletest-test10', component: () => import('./table/test/test10.vue')},
        {path: '/tabletest-test11', component: () => import('./table/test/test11.vue')},
        {path: '/tabletest-test12', component: () => import('./table/test/test12.vue')},
        {path: '/tabletest-test13', component: () => import('./table/test/test13.vue')},
        {path: '/tabletest-test14', component: () => import('./table/test/test14.vue')},
        {path: '/tabletest-test15', component: () => import('./table/test/test15.vue')},
        //信息服务->水情信息->水情导出
        { path: '/warm-exportwater',component: () => import('./warm/warm-exportwater/list.vue') },
        //预警管理-站点预警
        { path: '/warm-siteinfo',component: () => import('./warm/warm-manage/warm-siteinfo/list.vue') },
        //预警管理-预警短信查询
        { path: '/warm-boxsended',component: () => import('./warm/warm-manage/warm-boxsended/list.vue') },
        //预警管理-接收短信查询
        { path: '/warm-boxreceived',component: () => import('./warm/warm-manage/warm-boxreceived/list.vue') },
        //预警管理-发送短信查询
        { path: '/warm-boxsending',component: () => import('./warm/warm-manage/warm-boxsending/list.vue') },
        //发送短信
        { path: '/warm-sendmessage',component: () => import('./warm/warm-manage/warm-sendmessage/list.vue') },
        //预警短信发布
        { path: '/warm-warmmessage',component: () => import('./warm/warm-manage/warm-warmmessage/list.vue') },
        //预警指标-降雨指标
        { path: '/warm-raintarget',component: () => import('./warm/warm-target/rain-target/raintargetlist.vue') },
        //预警指标-河道水位预警指标
        { path: '/warm-rivertarget',component: () => import('./warm/warm-target/river-target/rivertargetlist.vue') },
        //预警指标-水库水位预警指标
        { path: '/warm-rsvtarget',component: () => import('./warm/warm-target/rsv-target/rsvtargetlist.vue') },
        //值班管理-值班安排
        { path: '/warm-dutyplan',component: () => import('./warm/warm-duty/warm-dutyplan/list.vue') },
        //值班管理-值班安排维护
        { path: '/plan-manage',component: () => import('./warm/warm-duty/dutyplan-manage/list.vue') },
        //值班管理-值班通讯录
        { path: '/duty-addrlist',component: () => import('./warm/warm-duty/duty-addrlist/list.vue') },
        //值班管理-值班通讯录维护
        { path: '/duty-infomanage',component: () => import('./warm/warm-duty/addrlist-manage/list.vue') },
        //值班管理-雨水情报表导出
        { path: '/warm-export',component: () => import('./warm/warm-export/list.vue') },
        //基础信息-河流水系
        { path: '/warm-riversystem',component: () => import('./warm/warm-river/warm-riversystem/list.vue') },
        //基础信息-水文气象
        { path: '/warm-weatherwater',component: () => import('./warm/warm-river/warm-weatherwater/list.vue') },
        //信息服务-闸门调度
        { path: '/warm-gatedd',component: () => import('./warm/warm-dispatch/warm-gatedispatching/gatedisplist.vue') },
        //预警管理-文件上传
        { path: '/warm-fileupload',component: () => import('./warm/warm-file/file-upload/list.vue') },
        //率定管理-率定结果管理
        { path: '/warm-ldresult',component: () => import('./warm/warm-ldresult/result-manage/list.vue') },
        //率定管理-率定站点信息
        { path: '/stage-station',component: () => import('./stage_discharge_relation/stage_station/stagestationlist.vue') },
        //率定管理-标准断面
        { path: '/stsection-station',component: () => import('./stage_discharge_relation/cal_parameter/stsectionstation/stsectionstationlist.vue') },
        //率定管理-率定参数-巴歇尔槽站点参数
        { path: '/stage-parshall',component: () => import('./stage_discharge_relation/cal_parameter/parshall/parshalllist.vue') },
        //率定管理-率定参数-标准巴歇尔槽参数
        { path: '/parshall-flume',component: () => import('./stage_discharge_relation/cal_parameter/parshall/parshalflumelist.vue') },
        //率定管理-水闸信息
        { path: '/water-lock',component: () => import('./stage_discharge_relation/cal_parameter/waterlock/lockstationlist.vue') },
        //率定管理-率定数据管理
        { path: '/warm-ldmefile',component: () => import('./warm/warm-ldresult/mefile-manage/list.vue') },
        //率定管理-率定计算
        { path: '/warm-caculate',component: () => import('./warm/warm-caculate/metype-caculate/list.vue') },
        //配水管理-调度运行信息
        { path: '/water-dispatching',component: () => import('./water_distribution/dispatching/dispatchinglist.vue') },
        //配水管理-需水计划
        { path: '/water-plan',component: () => import('./warm/warm-water/water-plan/list.vue') },
        //配水管理-用水定额计划
        { path: '/water-quota',component: () => import('./warm/warm-water/water-quota/list.vue') },
        //配水管理-用水考核
        { path: '/water-distribution',component: () => import('./warm/warm-water/water-distribution/list.vue') },
        //配水管理-配水管理
        { path: '/water-manage',component: () => import('./water_distribution/water_plan/waterplanlist.vue') },
        //配水管理-配水计划
        { path: '/water-peizhi',component: () => import('./warm/warm-water/water-peizhi/list.vue') },
        //配水管理-用水统计
        { path: '/water-usewater',component: () => import('./warm/warm-water/water-use/list.vue') },       
        
        { path: '/tableyjgl-yjfb',component: () => import('./table/xinzengcaidan/yjgl/yjfb.vue') },
        { path: '/tableyjgl-fsdx',component: () => import('./table/xinzengcaidan/yjgl/fsdx.vue') },
        { path: '/tableldgl-ldjggl',component: () => import('./table/xinzengcaidan/ldgl/ldjggl.vue') },
        { path: '/tableldgl-ldzdxx',component: () => import('./table/xinzengcaidan/ldgl/ldzdxx.vue') },
        { path: '/tableldgl-bzdmzdcs',component: () => import('./table/xinzengcaidan/ldgl/bzdmzdcs.vue') },
        { path: '/tableldgl-bxeczdcs',component: () => import('./table/xinzengcaidan/ldgl/bxeczdcs.vue') },
        { path: '/tableldgl-bzbxeccs',component: () => import('./table/xinzengcaidan/ldgl/bzbxeccs.vue') },
        { path: '/tableldgl-szzdcs',component: () => import('./table/xinzengcaidan/ldgl/szzdcs.vue') },

        //配水调度
        { path: '/water-plan',component: () => import('./table/xinzengcaidan/psgl/xxjh.vue') },
        { path: '/water-quota',component: () => import('./table/xinzengcaidan/psgl/ysdejh.vue') },
        { path: '/water-peizhi',component: () => import('./table/xinzengcaidan/psgl/psjh.vue') },
        { path: '/water-distribution',component: () => import('./table/xinzengcaidan/psgl/yskh.vue') },
        { path: '/water-dispatching',component: () => import('./table/xinzengcaidan/psgl/ddyxxx.vue') },


        // 相关平台
        {path: '/tablexgpt-qxxx', component: () => import('./table/xinzengcaidan/xgpt/qxxx.vue')},
        {path: '/tablexgpt-sksp', component: () => import('./table/xinzengcaidan/xgpt/sksp.vue')},
        {path: '/tablexgpt-skxxh', component: () => import('./table/xinzengcaidan/xgpt/skxxh.vue')},
        {path: '/tablexgpt-gqxxh', component: () => import('./table/xinzengcaidan/xgpt/gqxxh.vue')},
        {path: '/tablexgpt-sqjcgl', component: () => import('./table/xinzengcaidan/xgpt/sqjcgl.vue')},
        {path: '/tablexgpt-tgbns', component: () => import('./table/xinzengcaidan/xgpt/tgbns.vue')},
        {path: '/tablexgpt-ssqjc', component: () => import('./table/xinzengcaidan/xgpt/ssqjc.vue')},
        {path: '/tablexgpt-syljc', component: () => import('./table/xinzengcaidan/xgpt/syljc.vue')},


		// 率定数据管理
        {path: '/warm-ldmefile', component: () => import('./table/xinzengcaidan/ldsjgl/ldsjgl.vue')},
        //率定计算
        {path: '/warm-caculate', component: () => import('./table/xinzengcaidan/ldjs/ldjs.vue')},

        // { path: '/warm-siteinfo',component: () => import('./warm/warm-manage/warm-siteinfo/list.vue') },
        // { path: '/warm-boxsended',component: () => import('./warm/warm-manage/warm-boxsended/list.vue') },
        // { path: '/warm-boxreceived',component: () => import('./warm/warm-manage/warm-boxreceived/list.vue') },
        // { path: '/warm-boxsending',component: () => import('./warm/warm-manage/warm-boxsending/list.vue') },
        // { path: '/warm-raintarget',component: () => import('./warm/warm-target/rain-target/raintargetlist.vue') },
        // { path: '/warm-rivertarget',component: () => import('./warm/warm-target/rsv-target/rsvtargetlist.vue') },
        // { path: '/warm-rsvtarget',component: () => import('./warm/warm-target/river-target/rivertargetlist.vue') },
        // { path: '/warm-dutyplan',component: () => import('./warm/warm-duty/warm-dutyplan/list.vue') },
        //信息服务-水情信息-渠道水情
        {path: '/tablexxfw-sqxx-qdsq', component: () => import('./table/table-xxfw/table-sqxx/table-qdsq/list.vue')},
        //信息服务-水情信息-闸阀水情
        {path: '/tablexxfw-sqxx-zfsq', component: () => import('./table/table-xxfw/table-sqxx/table-zfsq/list.vue')},
        //信息服务-水情信息-水库水情
        {path: '/table-sqxx-sksq', component: () => import('./table/table-sksq/list.vue')},
        //信息服务-水情信息-河道水情
        {path: '/table-sqxx-hdsq', component: () => import('./table/table-hdsq/list.vue')},
        //信息服务-雨情信息
        {path: '/tablexxfw-yqxx', component: () => import('./table/table-xxfw/table-yqxx/list.vue')},
        //信息服务-图像信息
        {path: '/tablexxfw-txxx', component: () => import('./table/table-xxfw/table-txxx/list.vue')},
        //信息服务-实时监控
        {path: '/tablexxfw-spjs', component: () => import('./table/table-shipin/list.vue')},
        //信息服务-历史记录
        {path: '/tablexxfw-spls', component: () => import('./table/table-xxfw/table-spjs/list2.vue')},
        //信息服务-闸阀信息
        {path: '/tablexxfw-zfxx', component: () => import('./table/table-xxfw/table-zfxx/list.vue')},
        //信息服务-运行工况
        {path: '/tablexxfw-yxgk', component: () => import('./table/table-xxfw/table-yxgk/list.vue')},
        //信息服务-墒情
        {path: '/tablexxfw-sq', component: () => import('./table/table-xxfw/table-sq/list.vue')},
        //信息服务-水质
        {path: '/tablexxfw-sz', component: () => import('./table/table-xxfw/table-sz/list.vue')},
        //信息服务-工情
        {path: '/tablexxfw-gq', component: () => import('./table/table-xxfw/table-gq/list.vue')},
        {path: '/tablexxfw-qtjc', component: () => import('./table/table-qtjc/list.vue')},


        //闸阀控制-闸阀调度
        {path: '/tablezfkz-zfdd', component: () => import('./table/table-zfkz/table-zfdd/list.vue')},
        //闸阀控制-调度计划
        {path: '/tablezfkz-ddjh', component: () => import('./table/table-zfkz/table-ddjh/list.vue')},
        //闸阀控制-调度日志
        {path: '/tablezfkz-ddrz', component: () => import('./table/table-zfkz/table-ddrz/list.vue')},
        //闸阀控制-实时控制
        {path: '/tablezfkz-sskz', component: () => import('./table/table-zfkz/table-sskz/list.vue')},
        //闸阀控制-闸阀历史
        {path: '/tablezfkz-zfls', component: () => import('./table/table-zfkz/table-zfls/list.vue')},

        //率定管理-流量率定数据管理
        {path: '/tableldgl-llldsjgl', component: () => import('./table/table-ldgl/table-llldsjgl/list.vue')},
        //率定管理-关系换算
        {path: '/tableldgl-gxhs', component: () => import('./table/table-ldgl/table-gxhs/list.vue')},
        //率定管理-流量系数率定
        {path: '/tableldgl-llxsld', component: () => import('./table/table-ldgl/table-llxsld/list.vue')},
        //率定管理-率定结果管理
        {path: '/tableldgl-ldjgl', component: () => import('./table/table-ldgl/table-ldjggl/list.vue')},


        //预警预报-预警信息
        {path: '/tableyjyb-yjxx', component: () => import('./table/table-yjyb/table-yjxx/list.vue')},
        //预警预报-预警响应
        {path: '/tableyjyb-yjxy', component: () => import('./table/table-yjyb/table-yjxy/list.vue')},
        //预警预报-预警反馈
        {path: '/tableyjyb-yjfk', component: () => import('./table/table-yjyb/table-yjfk/list.vue')},
        //预警预报-预警发布与管理-预警发布
        {
            path: '/tableyjyb-yjfbygl-yjfb',
            component: () => import('./table/table-yjyb/table-yjfbygl/table-yjfb/list.vue')
        },
        //预警预报-预警发布与管理-预警管理
        {
            path: '/tableyjyb-yjfbygl-yjgl',
            component: () => import('./table/table-yjyb/table-yjfbygl/table-yjgl/list.vue')
        },
        //预警预报-预警指标
        {path: '/tableyjyb-yjzb', component: () => import('./table/table-yjyb/table-yjzb/list.vue')},


        //配水调度-来水预报
        {path: '/tablepsdd-lsyb', component: () => import('./table/table-psdd/table-lsyb/list.vue')},
        //配水调度-需水分析
        {path: '/tablepsdd-xsfx', component: () => import('./table/table-psdd/table-xsfx/list.vue')},
        //配水调度-用水计划
        {path: '/tablepsdd-ysjh', component: () => import('./table/table-psdd/table-ysjh/list.vue')},
        //配水调度-配水调度
        {path: '/tablepsdd-psdd', component: () => import('./table/table-psdd/table-psdd/list.vue')},
        //配水调度-用水管理
        {path: '/tablepsdd-ysgl', component: () => import('./table/table-psdd/table-ysgl/list.vue')},
        //配水调度-用水考核
        {path: '/tablepsdd-yskh', component: () => import('./table/table-psdd/table-yskh/list.vue')},
        //配水调度-配水参数管理
        {path: '/tablepsdd-pscsgl', component: () => import('./table/table-psdd/table-pscsgl/list.vue')},


        //水费管理-计价标准
        {path: '/tablesfgl-jjbz', component: () => import('./table/table-sfgl/table-jjbz/list.vue')},
        //水费管理-水量定额
        {path: '/tablesfgl-slde', component: () => import('./table/table-sfgl/table-slde/list.vue')},
        //水费管理-水量分配
        {path: '/tablesfgl-slfp', component: () => import('./table/table-sfgl/table-slfp/list.vue')},
        //水费管理-实际用水
        {path: '/tablesfgl-sjys', component: () => import('./table/table-sfgl/table-sjys/list.vue')},
        //水费管理-节水奖励
        {path: '/tablesfgl-jsjl', component: () => import('./table/table-sfgl/table-jsjl/list.vue')},
        //水费管理-水费统计
        {path: '/tablesfgl-sftj', component: () => import('./table/table-sfgl/table-sftj/list.vue')},
        //水费管理-水费管理
        {path: '/tablesfgl-sfgl', component: () => import('./table/table-sfgl/table-sfgl/list.vue')},


        //巡查管理
        {path: '/tablexcgl', component: () => import('./table/table-xcgl/list.vue')},


        //三维仿真
        {path: '/tableswfz', component: () => import('./table/table-swfz/list.vue')},


        //系统维护
        {path: '/tablextwh', component: () => import('./table/table-xtwh/list.vue')},

        //系统权限-菜单管理
        {path: '/tablextqx-cdgl', component: () => import('./table/table-xtqx/table-cdgl/list.vue')},
        //系统权限-个人中心
        {path: '/tablextqx-grzx', component: () => import('./table/table-xtqx/table-grzx/list.vue')},
        //系统权限-后台操作日志
        {path: '/tablextqx-htczrz', component: () => import('./table/table-xtqx/table-htczrz/list.vue')},
        //系统权限-角色管理
        {path: '/tablextqx-jsgl', component: () => import('./table/table-xtqx/table-jsgl/list.vue')},
        //系统权限-用户管理
        {path: '/tablextqx-yhgl', component: () => import('./table/table-xtqx/table-yhgl/list.vue')},
        //系统权限-在线用户
        {path: '/tablextqx-zxyh', component: () => import('./table/table-xtqx/table-zxyh/list.vue')},
        //权限菜单
        {path: '/tableqxcd', component: () => import('./table/table-qxcd/qxcd.vue')},
        {path: '/tableqxcd-xxk', component: () => import('./table/table-qxcd/xxk-qxcd.vue')},
        //大坝安全监测
        //基础数据
        //断面信息
        {path: '/safebase-dminfo', component: () => import('./warm/warm-safe/dm-base/dmlist.vue')},
        //渗流量信息
        {path: '/safebase-sllinfo', component: () => import('./warm/warm-safe/sll-base/slllist.vue')},
        //渗压信息
        {path: '/safebase-slylinfo', component: () => import('./warm/warm-safe/slyl-base/slyllist.vue')},
        //水平位移信息
        {path: '/safebase-spwyinfo', component: () => import('./warm/warm-safe/spwy-base/spwylist.vue')},
        //沉降位移信息
        {path: '/safebase-cjwyinfo', component: () => import('./warm/warm-safe/cjwy-base/cjwylist.vue')},
        //历史分析
        //渗流量分析
        {path: '/safefenxi-sllls', component: () => import('./warm/warm-safe/sll-history/list.vue')},
        //渗流压力分析
        {path: '/safefenxi-slylls', component: () => import('./warm/warm-safe/slyl-history/list.vue')},
        //位移变形分析
        {path: '/safefenxi-wybxls', component: () => import('./warm/warm-safe/spwy-history/list.vue')},
        //沉降变形分析
        {path: '/safefenxi-cjbxls', component: () => import('./warm/warm-safe/cjwy-history/list.vue')},
        //基础数据维护
        //断面信息维护
        {path: '/safemanage-dminfo', component: () => import('./warm/warm-safe/dm-manage/dmmlist.vue')},
        //渗流量测点信息维护
        {path: '/safemanage-sllinfo', component: () => import('./warm/warm-safe/sll-manage/slllist.vue')},
        //渗压管信息维护
        {path: '/safemanage-slylinfo', component: () => import('./warm/warm-safe/slyl-manage/slyllist.vue')},
        //位移变形信息维护
        {path: '/safemanage-wybxinfo', component: () => import('./warm/warm-safe/spwy-manage/spwylist.vue')},
        //沉降变形信息维护
        {path: '/safemanage-cjbxinfo', component: () => import('./warm/warm-safe/cjwy-manage/cjwylilst.vue')},
        ], 
        },    
    ],
})
