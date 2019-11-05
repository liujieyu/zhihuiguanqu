<template>
  <div>
    <Layout :style="{height: '100vh',}">
      <div :class="['leftSide',{'leftSide_on':Menu.show_Controller}]" style="display:none;">
        <!-- 开关按钮 -->
        <div class="switch" @click="Menu_toggle" style="display:none;">
          <i class="el-icon-d-arrow-left" v-if="!Menu.show_Controller"></i>
          <i class="el-icon-d-arrow-right" v-if="Menu.show_Controller"></i>
        </div>
        <Sider hide-trigger style="background-color: '#fff !important';padding: '80px 0 0 0'; overflow: 'scroll;';color:'#333 !important'">
          <!-- 菜单 -->
          <el-menu class="el-menu-vertical-demo" :default-active="$route.path" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" :router="true">
             <el-submenu index="1">
               <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>信息服务</span>
                </template>
                <el-menu-item index="/tablexxfw-yqxx"><i class="el-icon-light-rain"></i>雨情信息</el-menu-item>
                <el-submenu index="1-2" class="second-menu">
                  <template slot="title"><i class="el-icon-s-order"></i>水情信息</template>
                  <el-menu-item index="/"><i class="el-icon-s-operation"></i>渠道水情</el-menu-item>
                  <el-menu-item index="/tablexxfw-sqxx-zfsq"><i class="el-icon-s-operation"></i>闸阀水情</el-menu-item>
                  <el-menu-item index="/table-sqxx-sksq"><i class="el-icon-s-operation"></i>水库水情</el-menu-item>
                  <el-menu-item index="/table-sqxx-hdsq"><i class="el-icon-s-operation"></i>河道水情</el-menu-item>
                </el-submenu>
                <el-menu-item index="/warm-gatedd"><i class="el-icon-more"></i>闸门调度</el-menu-item>
                <!--<el-menu-item index="/tablexxfw-txxx"><i class="el-icon-picture"></i>图像信息</el-menu-item>
                <el-submenu index="1-4" class="second-menu">
                  <template slot="title"><i class="el-icon-video-camera-solid"></i>视频监视</template>
                  <el-menu-item index="/tablexxfw-spjs"><i class="el-icon-camera-solid"></i>实时监视</el-menu-item>
                  <el-menu-item index="/tablexxfw-spls"><i class="el-icon-more"></i>历史记录</el-menu-item>
                </el-submenu>
                <el-menu-item index="/tablezfkz-zfdd"><i class="el-icon-share"></i>闸阀状态</el-menu-item>
                <el-menu-item index="/tablexxfw-yxgk"><i class="el-icon-s-fold"></i>运行工况</el-menu-item>
                 <el-submenu index="1-7" class="second-menu">
                  <template slot="title"><i class="el-icon-sunrise-1"></i>旱情信息</template>
                  <el-menu-item index="/tablexxfw-sq"><i class="el-icon-sunrise"></i>墒情</el-menu-item>
                  <el-menu-item index="/tablexxfw-gq"><i class="el-icon-sunrise"></i>蒸发量</el-menu-item>
                  <el-menu-item index="/tablexxfw-gq"><i class="el-icon-sunrise"></i>地下水</el-menu-item>
                  <el-menu-item index="/tablexxfw-gq"><i class="el-icon-sunrise"></i>地下水开采量</el-menu-item>
                </el-submenu>
                <el-submenu index="1-8" class="second-menu">
                  <template slot="title"><i class="el-icon-s-help"></i>其他监测信息</template>
                  <el-menu-item index="/tablexxfw-gq"><i class="el-icon-s-data"></i>泵站</el-menu-item>
                  <el-menu-item index="/tablexxfw-sz"><i class="el-icon-s-data"></i>水质</el-menu-item>
                  <el-menu-item index="/tablexxfw-gq"><i class="el-icon-s-data"></i>潮位</el-menu-item>
                  <el-menu-item index="/tablexxfw-gq"><i class="el-icon-s-data"></i>泥沙</el-menu-item>
                  <el-menu-item index="/tablexxfw-gq"><i class="el-icon-s-data"></i>工情</el-menu-item>
                  <el-menu-item index="/tablexxfw-gq"><i class="el-icon-s-data"></i>气象</el-menu-item>
                </el-submenu> -->
             </el-submenu>
             <el-submenu index="2">
               <template slot="title">
                 <i class="el-icon-menu"></i>
                  <span>值班管理</span>
                </template>
                <el-menu-item index=""><i class="el-icon-document"></i>值班监控</el-menu-item>
                <el-menu-item index="/warm-dutyplan"><i class="el-icon-star-on"></i>值班安排</el-menu-item>
                <el-submenu index="2-3" class="second-menu">
                  <template slot="title"><i class="el-icon-s-help"></i>日志与管理</template>
                  <el-menu-item index=""><i class="el-icon-s-data"></i>值班安排</el-menu-item>
                  <el-menu-item index=""><i class="el-icon-s-data"></i>日志查询</el-menu-item>
                  <el-menu-item index=""><i class="el-icon-s-data"></i>日志管理</el-menu-item>
                  <el-menu-item index=""><i class="el-icon-s-data"></i>日志审批</el-menu-item>
                </el-submenu>
                <el-menu-item index="/duty-addrlist"><i class="el-icon-s-tools"></i>值班通讯录</el-menu-item>
                <el-menu-item index=""><i class="el-icon-s-tools"></i>气象管理</el-menu-item>
             </el-submenu>
             <el-submenu index="3">
               <template slot="title">
                 <i class="el-icon-menu"></i>
                  <span>预警管理</span>
                </template>
                <el-menu-item index="/warm-siteinfo"><i class="el-icon-sunrise"></i>站点预警</el-menu-item>
                <el-menu-item index="/warm-warmmessage"><i class="el-icon-sunrise"></i>预警发布</el-menu-item>
                <el-menu-item index="/warm-boxsended"><i class="el-icon-sunrise"></i>预警短信查询</el-menu-item>
                <el-menu-item index="/warm-sendmessage"><i class="el-icon-sunrise"></i>短信发送</el-menu-item>
                <el-menu-item index="/warm-boxsending"><i class="el-icon-sunrise"></i>发送短信查询</el-menu-item>
                <el-menu-item index="/warm-boxreceived"><i class="el-icon-sunrise"></i>接收短信查询</el-menu-item>
                <el-menu-item index="/warm-fileupload"><i class="el-icon-sunrise"></i>文件上传</el-menu-item>
             </el-submenu>
             <el-submenu index="4">
               <template slot="title">
                 <i class="el-icon-menu"></i>
                  <span>预警指标</span>
                </template>
                <el-menu-item index="/warm-raintarget"><i class="el-icon-sunrise"></i>降雨指标</el-menu-item>
                <el-menu-item index="/warm-rivertarget"><i class="el-icon-sunrise"></i>河道水位预警指标</el-menu-item>
                <el-menu-item index="/warm-rsvtarget"><i class="el-icon-sunrise"></i>水库水位预警指标</el-menu-item>
             </el-submenu>
             <el-submenu index="5">
               <template slot="title">
                 <i class="el-icon-menu"></i>
                  <span>基础数据</span>
                </template>
                <el-menu-item index="/tablejcsj-syxx"><i class="el-icon-star-on"></i>水库信息</el-menu-item>
                <el-menu-item index="/tablejcsj-jzw"><i class="el-icon-s-tools"></i>建筑物</el-menu-item>
                <el-menu-item index="/tablejcsj-ysh"><i class="el-icon-s-tools"></i>人员信息</el-menu-item>
                <el-menu-item index="/tablejcsj-jczd"><i class="el-icon-s-tools"></i>监测站点</el-menu-item>
                <el-menu-item index="/warm-riversystem"><i class="el-icon-s-tools"></i>河流水系</el-menu-item>
                <el-menu-item index="/warm-weatherwater"><i class="el-icon-s-tools"></i>水文气象</el-menu-item>
             </el-submenu> 
             <el-submenu index="6">
               <template slot="title">
                 <i class="el-icon-menu"></i>
                  <span>率定管理</span>
                </template>
                <el-menu-item index="/stage-station"><i class="el-icon-star-on"></i>率定站点信息</el-menu-item>
                <el-menu-item index="/stsection-station"><i class="el-icon-star-on"></i>标准断面</el-menu-item>
                <el-menu-item index="/stage-parshall"><i class="el-icon-star-on"></i>巴歇尔槽站点参数</el-menu-item>
                <el-menu-item index="/parshall-flume"><i class="el-icon-star-on"></i>标准巴歇尔槽参数</el-menu-item>
                <el-menu-item index="/water-lock"><i class="el-icon-star-on"></i>水闸信息</el-menu-item>
                <el-menu-item index="/warm-ldresult"><i class="el-icon-star-on"></i>率定结果管理</el-menu-item>
                <el-menu-item index="/warm-ldmefile"><i class="el-icon-star-on"></i>率定数据管理</el-menu-item>
                <el-menu-item index="/warm-caculate"><i class="el-icon-star-on"></i>率定计算</el-menu-item>
             </el-submenu> 
          </el-menu>
        </Sider>
      </div>
      <Layout :style="{padding: '0px'}">
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Menu: { show_Controller: false },
    };
  },
  mounted() { 
    this.Menu_toggle();
  },
  methods: {
      Menu_toggle() {
          this.Menu.show_Controller = !this.Menu.show_Controller;
      },    
  },
};
</script>

<style scoped lang="less">
  .ivu-layout{
    /*padding: 70px 20px 10px;*/
    /*overflow-y: hidden;*/
    /*overflow: scroll;*/
  }
  .ivu-layout-sider{
    overflow: scroll;
    padding-top:61px;
  }
.el-menu { border-right:0 !important;}
.el-menu-vertical-demo:not(.el-menu--collapse) { width: 200px; }
.el-submenu{background-color:#515a6e!important;}
.second-menu, .el-menu-item{background-color: #363e4f!important;}
.el-menu-item:hover {background-color: #363e4f!important;text-shadow:#000 3px 4px 5px}
.el-menu-item.logo.is-disabled  { opacity: 1; cursor: default; }
.el-menu-item.is-active { background-color: #2d8cf0!important; color: #fff !important; opacity: 1;text-shadow:#000 3px 4px 5px}
.ivu-layout-sider::-webkit-scrollbar {
  display: none;
}
.ivu-layout-sider{
    height: 100%;
    background-color: #1d1d1d; 
    color: #333;
}
.leftSide {
  z-index: 0;
  transition: 0.5s;  
  position: relative;
  // 开关按钮
  .switch {
    position: absolute;
    right: -20px;
    top: calc(50% - 50px);
    /* font-size: 10px; */
    width: 20px;
    height: 50px;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    background: white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: #7eb7f0 2px solid;
    border-left: 0;
    &:hover {
      filter: brightness(1.1);
    }
    i {
      font-size: 15px;
    }
  }
}
.leftSide_on {
    margin-left: -200px;
}
</style>
<style>
    .el-submenu__title:focus, .el-submenu__title:hover{
    outline: 0 !important;
    text-shadow:#000 3px 4px 5px;
    background: none !important;
    }
</style>