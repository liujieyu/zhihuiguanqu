<script src="main.js"></script>
<template>
  <div id="app">
    <!-- 顶部导航 -->
    <div
      class="topNav"
      style="position: absolute; width: 100%; left:0; top: 0; z-index: 1; opacity: 0.9;"
    >
      <el-menu
        
        class="el-menu-demo"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color=""
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1" :disabled="true" style="opacity: 1;">
          <span style="font-size: 20px; color: #fff;font-weight: 200;">黄材灌区量测水系统</span>
        </el-menu-item>
        <el-menu-item index="1" :disabled="true" style="opacity: 1;">
          <el-switch
            @change="switchchange"
            active-text="地图"
            inactive-text="报表"
            :active-value="1"
            :inactive-value="0"
            v-model="mapBox_show"
            active-color="#468ecb"
          ></el-switch>
        </el-menu-item>
        <!-- <el-menu-item index="1" :disabled="true" style="opacity: 1;">
          <el-switch
            @change="switch2change"
            inactive-text="三维仿真"
            :active-value="1"
            :inactive-value="0"
            v-model="mapBox3D"
            active-color="#468ecb"
          ></el-switch>
        </el-menu-item> -->
        <!-- <el-menu-item index="/tablebasedata-gqxx" style="float: left;" @click="navchange1()"><img class='img1'  :src="imgflag=='jichushuju'?require('@/assets/image/u448.svg'):require('@/assets/image/u444.svg')" />基础数据</el-menu-item>
        <el-menu-item index="/" style="float: left;" @click="navchange2()"><img class='img2' :src="imgflag=='xinxifuwu'?require('@/assets/image/u457.svg'):require('@/assets/image/u453.svg')" >信息服务</el-menu-item>
        <el-menu-item index="/tablezfkz-zfdd" style="float: left;" @click="navchange3()"><img class='img3' :src="imgflag=='zhafakongzhi'?require('@/assets/image/u466.svg'):require('@/assets/image/u462.svg')" >闸阀控制</el-menu-item>
        <el-menu-item index="/tabletest-test13" style="float: left;"  @click="navchange4()"><img class='img4' :src="imgflag=='zhibanguanli'?require('@/assets/image/u475.svg'):require('@/assets/image/u471.svg')" >值班管理</el-menu-item>
        <el-menu-item index="/tablexgpt-qxxx" style="float: left;"  @click="navchange5()"><img class='img5' :src="imgflag=='xiangguanpingtai'?require('@/assets/image/u484.svg'):require('@/assets/image/u480.svg')">相关平台</el-menu-item>
        <el-menu-item index="/tableyjgl-yjfb" style="float: left;" @click="navchange6()"><img class='img6' :src="imgflag=='yujingguanli'?require('@/assets/image/u493.svg'):require('@/assets/image/u489.svg')">预警管理</el-menu-item>
        <el-menu-item index="/tableldgl-ldjggl" style="float: left;" @click="navchange7()"><img class='img7' :src="imgflag=='lvdingguanli'?require('@/assets/image/u502.svg'):require('@/assets/image/u498.svg')">率定管理</el-menu-item>
        <el-menu-item index="/water-plan" style="float: left;" @click="navchange8()"><img class='img8' :src="imgflag=='peishuiguanli'?require('@/assets/image/u511.svg'):require('@/assets/image/u507.svg')">配水管理</el-menu-item>
        <el-menu-item index="/tablexxfw-yxgk" style="float: left;" @click="navchange9()"><img class='img9' :src="imgflag=='weihuguanli'?require('@/assets/image/u520.svg'):require('@/assets/image/u516.svg')">维护管理</el-menu-item>
        
        <el-menu-item style="float: left;">
          <el-input placeholder suffix-icon="el-icon-search" v-model="search_str"></el-input>
        </el-menu-item>
          <div style="line-height: 20px;display: flex;flex-direction: column; margin-top: 10px;color: #fff;padding-left: 10px;">
          <div>admin</div>
          <div style="cursor: pointer;">退出</div>
          </div> -->

        <div style="line-height: 20px;display: flex;flex-direction: column; margin-top: 10px;color: #fff;padding-left: 10px;padding-right: 10px;float: right;" @click="close()">
        <div>{{loginform.name}}</div>
        <div style="cursor: pointer;">退出</div>
        </div>
        <div style="float: right;line-height: 61px;">
        <el-input placeholder suffix-icon="el-icon-search" v-model="search_str"></el-input>
        </div>

        <el-menu-item v-if="menus_data.weihu" index="/tablexxfw-yxgk" style="float: right;" @click="navchange9()"><img class='img9' :src="imgflag=='weihuguanli'?require('@/assets/image/u520.svg'):require('@/assets/image/u516.svg')">维护管理</el-menu-item>
        <el-menu-item v-if="menus_data.peishui" index="/water-plan" style="float: right;" @click="navchange8()"><img class='img8' :src="imgflag=='peishuiguanli'?require('@/assets/image/u511.svg'):require('@/assets/image/u507.svg')">配水管理</el-menu-item>
        <el-menu-item v-if="menus_data.lvding" index="/tableldgl-ldjggl" style="float: right;" @click="navchange7()"><img class='img7' :src="imgflag=='lvdingguanli'?require('@/assets/image/u502.svg'):require('@/assets/image/u498.svg')">率定管理</el-menu-item>
        <el-menu-item v-if="menus_data.yujin" index="/tableyjgl-yjfb" style="float: right;" @click="navchange6()"><img class='img6' :src="imgflag=='yujingguanli'?require('@/assets/image/u493.svg'):require('@/assets/image/u489.svg')">预警管理</el-menu-item>
        <el-menu-item v-if="menus_data.xiangguan" index="/tablexgpt-qxxx" style="float: right;"  @click="navchange5()"><img class='img5' :src="imgflag=='xiangguanpingtai'?require('@/assets/image/u484.svg'):require('@/assets/image/u480.svg')">相关平台</el-menu-item>
        <el-menu-item v-if="menus_data.zhiban" index="/tabletest-test13" style="float: right;"  @click="navchange4()"><img class='img4' :src="imgflag=='zhibanguanli'?require('@/assets/image/u475.svg'):require('@/assets/image/u471.svg')" >值班管理</el-menu-item>
        <el-menu-item v-if="menus_data.zhafa" index="/tablezfkz-zfdd" style="float: right;" @click="navchange3()"><img class='img3' :src="imgflag=='zhafakongzhi'?require('@/assets/image/u466.svg'):require('@/assets/image/u462.svg')" >闸阀控制</el-menu-item>
        <el-menu-item v-if="menus_data.xinxi" index="/" style="float: right;" @click="navchange2()"><img class='img2' :src="imgflag=='xinxifuwu'?require('@/assets/image/u457.svg'):require('@/assets/image/u453.svg')" >信息服务</el-menu-item>
        <el-menu-item v-if="menus_data.jichu" index="/tablebasedata-gqxx" style="float: right;" @click="navchange1()"><img class='img1'  :src="imgflag=='jichushuju'?require('@/assets/image/u448.svg'):require('@/assets/image/u444.svg')" />基础数据</el-menu-item>



        
      </el-menu>
    </div>

    <div style="position: absolute; left: 10px; bottom:10px;">{{zhong_xin_dian}}</div>

    <!-- 地图 -->
    <div v-show="mapBox_show == 1" id="mapBox">
      <!-- 地图 -->
      <div id="map"></div>

      <!-- 工具条 -->
      <div class="left-btn">
        <el-button plain size="mini" style="width: 83px;height: 28px;" @click="tool_box = !tool_box">一张图</el-button>
        <el-button plain size="mini" style="margin-left: 0px;width: 83px;height: 28px;" @click="restoreMapView">默认大小</el-button>
        <el-button plain size="mini" style="margin-left: 0px;width: 83px;height: 28px;" @click="fangda">放大</el-button>
        <el-button plain size="mini" style="margin-left: 0px;width: 83px;height: 28px;" @click="suoxiao">缩小</el-button>
      </div>

    <transition name="el-fade-in-linear">
    <div class="new-tool-box2" v-show="tool_box">
      <!-- 监测 -->
      <div style="border-bottom: 1px solid rgb(242,242,242);padding:5px;">
        <div class="box-h">
          <span style="position: absolute;">监测</span>
          <el-button style="position: absolute;right: 10px;" size="mini" round @click="jcxs">{{isActive1?'展开':'收起'}}</el-button>
        </div>
        <div style="display: flex;flex-wrap:wrap;overflow: hidden;" :class="{jcbox:isActive1}">
          <div class="jiance-box" :class="{'check-border':item.show=='1'}" v-for="(item,index) in FeatrueLayers" @click="OnLayerChange(item)">
                <img :src="item.icon" style="position: absolute;left: 15.5px;top: 5px;width: 21px;height: 21px;">
                <span>{{item.title}}</span>
              </div>
        </div>
      </div>
      <!-- 图层 -->
      <div style="border-bottom: 1px solid rgb(242,242,242);padding:5px;">
        <div class="box-h">
          <span style="position: absolute;">图层</span>
          <el-button style="position: absolute;right: 10px;" size="mini" round @click="tcxs">{{isActive2?'展开':'收起'}}</el-button>
        </div>
        <div style="display: flex;flex-wrap:wrap;overflow: hidden;" :class="{tcbox:isActive2}">
          <div class="jiance-box" :class="{'check-border':item.show}" v-for="(item, index) in tu_ceng_list" @click="tu_ceng_switch(item)">
                <img :src="item.show?item.icon_active:item.icon" style="position: absolute;left: 15.5px;top: 5px;width: 21px;height: 21px;">
                <span>{{item.name}}</span>
              </div>
        </div>
      </div>
      <!-- 底图 -->
      <div style="border-bottom: 1px solid rgb(242,242,242);padding:5px;">
        <div class="box-h">
          <span style="position: absolute;">底图</span>
          
        </div>
        <div style="display: flex;flex-wrap:wrap;">
          <div class="jiance-box" :class="{'check-border':ditu_types=='satellite'}" @click="dituchange2()">
                <img :src="ditu_types=='satellite'?require('@/assets/image/u41.svg'):require('@/assets/image/u37.svg')" style="position: absolute;left: 15.5px;top: 5px;width: 21px;height: 21px;">
                <span>卫星影像</span>
              </div>
              <div class="jiance-box" :class="{'check-border':ditu_types=='hybrid'}" @click="dituchange3()">
                <img :src="ditu_types=='hybrid'?require('@/assets/image/u50.svg'):require('@/assets/image/u46.svg')" style="position: absolute;left: 15.5px;top: 5px;width: 21px;height: 21px;">
                <span>混合</span>
              </div>
              <div class="jiance-box" :class="{'check-border':ditu_types=='streets'}" @click="dituchange4()">
                <img :src="ditu_types=='streets'?require('@/assets/image/u60.svg'):require('@/assets/image/u56.svg')" style="position: absolute;left: 15.5px;top: 5px;width: 21px;height: 21px;">
                <span>街道</span>
              </div>
              <div class="jiance-box" :class="{'check-border':ditu_types=='topo'}" @click="dituchange5()">
                <img :src="ditu_types=='topo'?require('@/assets/image/u69.svg'):require('@/assets/image/u65.svg')" style="position: absolute;left: 15.5px;top: 5px;width: 21px;height: 21px;">
                <span>地形</span>
              </div>
        </div>
      </div>
      <!-- 控制 -->
      <div style="border-bottom: 1px solid rgb(242,242,242);padding:5px;">
        <div class="box-h">
          <span style="position: absolute;">控制</span>
          
        </div>
        <div>
          <div class="jiance-box" style="cursor:no-drop;" v-for="(item,index) in FeatrueLayers_control">
                <img :src="item.iconUrl" style="position: absolute;left: 15.5px;top: 5px;">
                <span>{{item.title}}</span>
            </div>
        </div>
      </div>
      <!-- 基础 -->
      <div style="border-bottom: 1px solid rgb(242,242,242);padding:5px;">
        <div class="box-h">
          <span style="position: absolute;">基础</span>
          
        </div>
        <div>
          
        </div>
      </div>
      <!-- 分析 -->
      <div style="padding:5px;">
        <div class="box-h">
          <span style="position: absolute;">分析</span>
          
        </div>
        <div>
          
        </div>
      </div>
    </div>
    </transition>

      <!-- 旧的 -->
      <!-- <div class="tool-box"> -->
        <!-- 地图视图默认位置还原按钮 -->
        <!-- <div id="mapViewReductionButton" @click="restoreMapView">
          <Icon type="ios-home-outline"></Icon>
        </div> -->
        <!-- 基础 -->
        <!--        v-for="(item,index) in FeatrueLayers_base"-->
        <!-- <el-popover>
          <template>
            <div style="margin: 5px;text-align: center; color: #aaaaaa;"> -->
              <!--              <el-switch-->
              <!--                disabled-->
              <!--                v-model="item.show"-->
              <!--                @change="OnLayerChange(item)"-->
              <!--                :active-text="item.title"-->
              <!--                inactive-text-->
              <!--                active-value="1"-->
              <!--                inactive-value="0"-->
              <!--              ></el-switch>-->
              <!-- 预留接口
            </div>
          </template>
          <el-button slot="reference" type="text" style="margin-left: 20px; margin-right: 20px;">基础</el-button>
        </el-popover> -->
        <!-- 监测（正在做。。） -->
        <!-- <el-popover>
          <template v-for="(item,index) in FeatrueLayers">
            <div style="margin: 5px;">
              <el-switch
                v-model="item.show"
                @change="OnLayerChange(item)"
                :active-text="item.title"
                inactive-text
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </div>
          </template>
          <template v-if="FeatrueLayers.length > 0" v-for="(item,index) in FeatrueLayers_waiting">
            <div style="margin: 5px;">
              <el-switch
                disabled
                v-model="item.show"
                :active-text="item.title"
                inactive-text
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </div>
          </template>
          <el-button slot="reference" type="text" style="margin-left: 20px;margin-right: 20px;">监测</el-button>
        </el-popover> -->
        <!-- 控制 -->
        <!-- <el-popover>
          <template v-for="(item,index) in FeatrueLayers_control">
            <div style="margin: 5px;">
              <el-switch
                disabled
                v-model="item.show"
                :active-text="item.title"
                inactive-text
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </div>
          </template>
          <el-button slot="reference" type="text" style="margin-left: 20px; margin-right: 20px;">控制</el-button>
        </el-popover> -->
        <!-- 分析 -->
        <!-- <el-popover>
          <template>
            <div style="margin: 5px;text-align: center; color: #aaaaaa;"> -->
              <!--              <el-switch-->
              <!--                disabled-->
              <!--                v-model="item.show"-->
              <!--                @change="OnLayerChange(item)"-->
              <!--                :active-text="item.title"-->
              <!--                inactive-text-->
              <!--                active-value="1"-->
              <!--                inactive-value="0"-->
              <!--              ></el-switch>-->
              <!-- 预留接口
            </div>
          </template>
          <el-button slot="reference" type="text" style="margin-left: 20px; margin-right: 20px;">分析</el-button>
        </el-popover> -->
        <!-- 图层 -->
        <!-- <el-popover>
          <template v-for="(item, index) in tu_ceng_list">
            <div style="margin: 5px;">
              <el-switch v-model="item.show" :active-text="item.name" @change="tu_ceng_switch(item)"></el-switch>
            </div>
          </template>
          <el-button slot="reference" type="text" style="margin-left: 20px; margin-right: 20px;">图层</el-button>
        </el-popover> -->
        <!-- 底图 -->
        <!-- <el-popover>
          <div style="margin: 5px;">
            <el-radio-group v-model="ditu_type" @change="ditu_change()">
              <el-radio label="-">不显示底图</el-radio>
              <el-radio label="satellite">卫星影像</el-radio>
              <el-radio label="hybrid">混合</el-radio>
              <el-radio label="streets">街道</el-radio>
              <el-radio label="topo">地形</el-radio>
            </el-radio-group>
          </div>
          <el-button slot="reference" type="text" style="margin-left: 20px; margin-right: 20px;">底图</el-button>
        </el-popover>
      </div> -->

      <!-- 列表窗 -->
      <div id="listWindow" :class="['listWindow',{'listWindow_on': listWindow.show_Controller}]">
        <!-- 开关按钮 -->
        <div class="switch" @click="listWindow_toggle">
          <i class="el-icon-d-arrow-left" v-if="!listWindow.show_Controller"></i>
          <i class="el-icon-d-arrow-right" v-if="listWindow.show_Controller"></i>
        </div>
        <!-- 主体 -->
        <div class="wrapper">
          <!-- 标签栏与内容 -->
          <div>
            <el-tabs closable @tab-remove="removeTab" type="card" :tabPosition="listWindow_tabPosition(listWindow.mode)" @tab-click="handleTabClick" v-model="listWindow.activeName">
              <template v-for="item in FeatrueLayers">
                <el-tab-pane :label="item.title" :name="item.itype" v-if="item.show=='1'">
                  <!-- 渠道 -->
                  <BaseBoxQUDAO :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='qudaoshuiqing'" ></BaseBoxQUDAO>
                  <!-- 闸阀水情 -->
                  <BaseBoxZHAFASHUIQING :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='zhafashuiqing'" ></BaseBoxZHAFASHUIQING>
                  <!-- 闸阀状态 -->
                  <BaseBoxZHAFAZHUANGTAI :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='zhafazhuangtai'" ></BaseBoxZHAFAZHUANGTAI>
                  <!-- 雨量站 -->
                  <BaseBoxYUQING :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='yuqing'" ></BaseBoxYUQING>
                  <!-- 水库水情 -->
                  <BaseBoxSHUIKUSHUIQING :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='shuikushuiqing'" ></BaseBoxSHUIKUSHUIQING>
                  <!-- 河道水情 -->
                  <BaseBoxHEDAOSHUIQING :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='hedaoshuiqing'" ></BaseBoxHEDAOSHUIQING>
                  <!-- 视频站 -->
                  <BaseBoxSHIPINZHAN :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='shipin'" ></BaseBoxSHIPINZHAN>
                  <!-- 图像站 -->
                  <BaseBoxTUXIANGZHAN :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='tuxiang'" ></BaseBoxTUXIANGZHAN>
                  <!-- 运行工况 -->
                  <BaseBoxYUNXINGGONGKUANG :featrue="zuobiaoxi(item)" :search_FeatrueLayer="search_FeatrueLayer" v-if="item.itype=='yunxinggongkuang'" ></BaseBoxYUNXINGGONGKUANG>
                </el-tab-pane>
              </template>
            </el-tabs>
          </div>
          <!-- 图层没有时的提示信息 -->
          <div class="tip" v-if="featrueLayers_showing().length == 0">暂无任何显示图层</div>
        </div>
        <!-- 模式按钮 -->
        <div class="mode" v-show="listWindow.show_Controller && featrueLayers_showing().length != 0" @click="listWindow_changeMode">
          <i class="el-icon-setting"></i>
        </div>
      </div>

      <!-- 详情(右边) -->
      <Drawer
        :title="details.info_right.STNM"
        v-model="details.drawer_show_right"
        width="600"
        :mask="false"
        placement="right"
        @on-close="closeDrawer('right')"
      >
        <!-- 渠道水情 -->
        <DetailQUDAO :info="details.info_right" v-if="details.info_right.itype=='qudaoshuiqing'"></DetailQUDAO>
        <!-- 雨情 -->
        <DetailYUQING :info="details.info_right" v-if="details.info_right.itype=='yuqing'"></DetailYUQING>
        <!-- 水库水情 -->
        <DetailSHUIKUSHUIQING :info="details.info_right" v-if="details.info_right.itype=='shuikushuiqing'"></DetailSHUIKUSHUIQING>
        <!-- 河道水情 -->
        <DetailHEDAOSHUIQING :info="details.info_right" v-if="details.info_right.itype=='hedaoshuiqing'"></DetailHEDAOSHUIQING>
        <!-- 闸阀水情 -->
        <DetailZHAFASHUIQING :info="details.info_right" v-if="details.info_right.itype=='zhafashuiqing'"></DetailZHAFASHUIQING>
        <!-- 闸阀状态 -->
        <DetailZHAFAZHUANGTAI :info="details.info_right" v-if="details.info_right.itype=='zhafazhuangtai'"></DetailZHAFAZHUANGTAI>
        <!-- 视频站 -->
        <DetailSHIPINZHAN :info="details.info_right" v-if="details.info_right.itype=='shipin'"></DetailSHIPINZHAN>
        <!-- 图像站 -->
        <DetailTUXIANGZHAN :info="details.info_right" v-if="details.info_right.itype=='tuxiang'"></DetailTUXIANGZHAN>
        <!-- 运行工况 -->
        <DetailYUNXINGGONGKUANG :info="details.info_right" v-if="details.info_right.itype=='yunxinggongkuang'" ></DetailYUNXINGGONGKUANG>
        <!-- 水位库容 -->
        <DetailSHUIWEIKURONG :info="details.info_right" v-if="details.info_right.itype=='shuiweikurong'" ></DetailSHUIWEIKURONG>
      </Drawer>

      <!-- 详情(左边) -->
      <Drawer
        :title="details.info_left.STNM"
        v-model="details.drawer_show_left"
        :width="details.info_left.itype=='shipin'?'1100':'600'"
        :mask="false"
        placement="left"
        @on-close="closeDrawer('left')"
      >
        <!-- 渠道水情 -->
        <DetailQUDAO :info="details.info_left" v-if="details.info_left.itype=='qudaoshuiqing'"></DetailQUDAO>
        <!-- 雨情 -->
        <DetailYUQING :info="details.info_left" v-if="details.info_left.itype=='yuqing'"></DetailYUQING>
        <!-- 水库水情 -->
        <DetailSHUIKUSHUIQING :info="details.info_left" v-if="details.info_left.itype=='shuikushuiqing'"></DetailSHUIKUSHUIQING>
        <!-- 河道水情 -->
        <DetailHEDAOSHUIQING :info="details.info_left" v-if="details.info_left.itype=='hedaoshuiqing'"></DetailHEDAOSHUIQING>
        <!-- 闸阀水情 -->
        <DetailZHAFASHUIQING :info="details.info_left" v-if="details.info_left.itype=='zhafashuiqing'"></DetailZHAFASHUIQING>
        <!-- 闸阀状态 -->
        <DetailZHAFAZHUANGTAI :info="details.info_left" v-if="details.info_left.itype=='zhafazhuangtai'"></DetailZHAFAZHUANGTAI>
        <!-- 视频站 -->
        <DetailSHIPINZHAN :info="details.info_left" v-if="details.info_left.itype=='shipin'"></DetailSHIPINZHAN>
        <!-- 图像站 -->
        <DetailTUXIANGZHAN :info="details.info_left" v-if="details.info_left.itype=='tuxiang'"></DetailTUXIANGZHAN>
        <!-- 运行工况 -->
        <DetailYUNXINGGONGKUANG :info="details.info_left" v-if="details.info_left.itype=='yunxinggongkuang'"></DetailYUNXINGGONGKUANG>
        <!-- 水位库容 -->
        <DetailSHUIWEIKURONG :info="details.info_left" v-if="details.info_left.itype=='shuiweikurong'"></DetailSHUIWEIKURONG>
      </Drawer>
    </div>

    <!-- 表格 -->
    <div v-if="mapBox_show == 0">
      <!-- <router-view></router-view> -->
      <Table></Table>
    </div>

    <!-- 图片放大模态框 -->
    <div id="imgModal" class="imgModal" ref="imgModal">
      <!-- 关闭按钮 -->
      <!-- <span class="close" onclick="document.getElementById('imgModal').style.display='none'">&times;</span> -->
      <span class="close" @click="imgModal_hide">&times;</span>
      <!-- 弹窗内容 -->
      <el-carousel
        :autoplay="enlargeModal_carousel.autoplay"
        :arrow="enlargeModal_carousel.arrow"
        :indicator-position="enlargeModal_carousel.indicator_position"
        :style="enlargeModal_carousel.style"
        :initial-index="enlargeModal_carousel.initial_index"
        :loop="enlargeModal_carousel.loop"
        :trigger="enlargeModal_carousel.trigger"
        v-if="enlargeModal_carousel.show"
        @change="carousel_onChange"
      >
        <el-carousel-item v-for="(item, index) in enlargeModal_carousel.Rows">
          <img :id="`img${index}`" :src="item.url" alt @click="setCarousel_autoplay" />
        </el-carousel-item>
      </el-carousel>
      <!-- 工具栏 -->
      <div id="toolbar">
        <i class="el-icon-refresh-right" @click="clockwise_rotation"></i>
        <i class="el-icon-refresh-left" @click="counterclockwise_rotation"></i>
        <el-button @click="enlargeModal_carousel.dialogVisible = true">保存原图</el-button>
        <!-- <a
                  class="el-button el-button--default"
                  target="framename"
                  :src="`${enlargeModal_carousel.Rows[enlargeModal_carousel.initial_index]? enlargeModal_carousel.Rows[enlargeModal_carousel.initial_index].url : ''}`"
                >

                  <i class="el-icon-download"></i>
                  <span>保存图片</span>
        </a>-->
        <!-- <el-button icon="el-icon-download">保存图片</el-button> -->
      </div>

      <el-dialog
        title="提示"
        :visible.sync="enlargeModal_carousel.dialogVisible"
        width="30%"
        :modal-append-to-body="false"
        :before-close="handleClose"
      >
        <span>请右键点击图片，然后选择图片另存为，即可保存原图</span>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="enlargeModal_carousel.dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 消息窗口和控制器 -->
    <transition name="Messag">
      <div v-if="!Message_Window_Controller.show" id="Message_Window" key="Window">
        <div class="title">
          <span>消息栏</span>
          <div class="window_tool">
            <Icon
              v-if="Message_Window.Voice_Controller"
              type="md-volume-up"
              @click="Message_Window.Voice_Controller = !Message_Window.Voice_Controller;voice_list_pause()"
            />
            <Icon
              v-else
              type="md-volume-off"
              @click="Message_Window.Voice_Controller = !Message_Window.Voice_Controller;"
            />
            <i class="el-icon-close" @click="Message_Window_show(false)"></i>
          </div>
        </div>

        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-bell"></i> 预警
            </span>
            <transition-group tag="ul" class="content" name="Messag" mode="in-out">
              <li v-for="(item,index) in Message_Window.notify_info.list" :key="item.id">
                <img :src="item.icon" style="max-width:22px;max-height:27px;" />
                <span style="margin-left:10px">{{ item.text }}</span>
              </li>
            </transition-group>
          </el-tab-pane>
          <el-tab-pane label="消息中心">消息中心</el-tab-pane>
        </el-tabs>
        <!-- <ul class="content">
                <li>
                  aaaaaa
                </li>
                <li>
                  bbbbbb
                </li>
                <li>
                  cccccc
                </li>
        </ul>-->
      </div>

      <div
        v-else
        id="Message_Window_Controller"
        @click="Message_Window_show(true)"
        key="Controller"
      >
        <el-badge :value="Message_Window.notify_info.list.length">
          <!-- <el-button size="small"></el-button> -->
          <div class="text">消息</div>
        </el-badge>
      </div>
    </transition>
  </div>
</template>


    <script>
import("./assets/shp.min.js");
import { loadModules } from "esri-loader";
// 引入Vue
import Vue from "vue";

// 引入页面
import Table from "./page/Table";

// 渠道水情
import BaseBoxQUDAO from "@/components/BaseBox/BaseBox-qudaoshuiqing.vue";
import DetailQUDAO from "@/components/Details/Details-qudaoshuiqing.vue";
// 闸阀状态
import BaseBoxZHAFAZHUANGTAI from "@/components/BaseBox/BaseBox-zhafazhuangtai.vue";
import DetailZHAFAZHUANGTAI from "@/components/Details/Details-zhafazhuangtai.vue";
// 闸阀水情
import BaseBoxZHAFASHUIQING from "@/components/BaseBox/BaseBox-zhafashuiqing.vue";
import DetailZHAFASHUIQING from "@/components/Details/Details-zhafashuiqing.vue";
// 雨情
import BaseBoxYUQING from "@/components/BaseBox/BaseBox-yuqing.vue";
import DetailYUQING from "@/components/Details/Details-yuqing.vue";
// 水库水情
import BaseBoxSHUIKUSHUIQING from "@/components/BaseBox/BaseBox-shuikushuiqing.vue";
import DetailSHUIKUSHUIQING from "@/components/Details/Details-shuikushuiqing.vue";
// 河道水情
import BaseBoxHEDAOSHUIQING from "@/components/BaseBox/BaseBox-hedaoshuiqing.vue";
import DetailHEDAOSHUIQING from "@/components/Details/Details-hedaoshuiqing.vue";
// 视频站
import BaseBoxSHIPINZHAN from "@/components/BaseBox/BaseBox-shipinzhan.vue";
import DetailSHIPINZHAN from "@/components/Details/Details-shipinzhan.vue";
// 图像站站
import BaseBoxTUXIANGZHAN from "@/components/BaseBox/BaseBox-tuxiangzhan.vue";
import DetailTUXIANGZHAN from "@/components/Details/Details-tuxiangzhan.vue";
// 运行工况
import BaseBoxYUNXINGGONGKUANG from "@/components/BaseBox/BaseBox-yunxinggongkuang.vue";
import DetailYUNXINGGONGKUANG from "@/components/Details/Details-yunxinggongkuang.vue";
import { debuglog } from "util";
// 水位库容
import DetailSHUIWEIKURONG from "@/components/Details/Details-shuiweikurong.vue";

// 引入公用方法
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import { parse } from "path";
import { constants } from "crypto";
import $ from 'jquery'
import { debug } from 'console';


const options = { version: "3.28" };

export default {
  data() {
    return {
      //三维仿真
      mapBox3D:0,
      //ditu.json 加载到的各个图层
      //koen 20190911
      tu_ceng_list:[],

      //当前中心点
      zhong_xin_dian:null,

      //地图类型
      ditu_type: 'topo',



      listWindow_show_Controller: false,
      // 列表窗口对象
      listWindow: {
        // 列表窗显示控制器
        show_Controller: false,
        // 列表窗形态切换
        mode: 0,
        activeName: "qudaoshuiqing"
      },
      mapBox_show: 1,
      imgflag:"",
      test: true,
      map: null,
      details: {
        // 详情标题
        drawer_title: "详情",
        // 用于控制 右侧详情栏
        drawer_show_right: false, // 显示隐藏
        info_right: { fff: "5" }, // 右侧详情栏信息
        // 用于控制 左侧详情栏
        drawer_show_left: false, // 显示隐藏
        info_left: { fff: "5" } // 左侧详情栏信息
      },
      // 查询字符串
      search_str: "",

      // 信息提示
      info_tips: { itype: "" },

      //顶部导航
      navbar:[
        {index:'/tablebasedata-gqxx',url1:'@/assets/image/u444.svg',url2:'@/assets/image/u448.svg',data:'基础数据'},
        {index:'/',url1:'@/assets/image/u453.svg',url2:'@/assets/image/u457.svg',data:'信息服务'},
        {index:'/tablezfkz-zfdd',url1:'@/assets/image/u462.svg',url2:'@/assets/image/u466.svg',data:'闸阀控制'},
        {index:'/tabletest-test13',url1:'@/assets/image/u471.svg',url2:'@/assets/image/u475.svg',data:'值班管理'},
        {index:'/tablexgpt-qxxx',url1:'@/assets/image/u480.svg',url2:'@/assets/image/u484.svg',data:'相关平台'},
        {index:'/tableyjgl-yjfb',url1:'@/assets/image/u489.svg',url2:'@/assets/image/u493.svg',data:'预警管理'},
        {index:'/tableldgl-ldjggl',url1:'@/assets/image/u498.svg',url2:'@/assets/image/u502.svg',data:'率定管理'},
        {index:'/water-plan',url1:'@/assets/image/u507.svg',url2:'@/assets/image/u511.svg',data:'配水管理'},
        {index:'/tablexxfw-yxgk',url1:'@/assets/image/u516.svg',url2:'@/assets/image/u520.svg',data:'维护管理'},
        ],

      system_info: null,
      // 正在开发图层数据集合，其中包含图层对象
      FeatrueLayers: [],
      fList: [],
      // 待开发的图层数据集合，其中包含图层对象
      FeatrueLayers_waiting: [
        {
          title: "墒情",
          show: "0"
        },
        {
          title: "蒸发量",
          show: "0"
        },
        {
          title: "地下水",
          show: "0"
        },
        {
          title: "地下水开采量",
          show: "0"
        },
        {
          title: "泵站",
          show: "0"
        },
        {
          title: "水质",
          show: "0"
        },
        {
          title: "潮位",
          show: "0"
        },
        {
          title: "泥沙",
          show: "0"
        },
        {
          title: "工情",
          show: "0"
        },
        {
          title: "气象",
          show: "0"
        }
      ],

      FeatrueLayers_control: [
        {
          title: "闸阀控制",
          show: "0",
          iconUrl:require('@/assets/image/u28.svg')
        }
      ],
      FL_Sel: [],
      // 用于选中提示的图形图层
      graphicsLayer_Selection: {
        LayerObject: null,
        graphics: []
      },
      // 图片放大模态框的走马灯对象
      enlargeModal_carousel: {
        Rows: [],
        initial_index: 0,
        initial_imgUrl: null,
        arrow: "always",
        autoplay: false,
        indicator_position: "inside",
        loop: true,
        trigger: "click",
        style: {
          height: "90%"
        },
        show: true,
        dialogVisible: false
      },
      // 消息窗口对象
      Message_Window: {
        // 预警信息
        notify_info: {
          // 列表
          list: []
        },
        // 声音开关
        Voice_Controller: true
      },
      // 消息窗口控制器对象
      Message_Window_Controller: {
        show: true
      },
      //折叠面板
      activeNames: ['1'],
      tool_box:true,
      checkboxGroup1:['渠道水情','图像','闸阀水情'],
      //底图选择
      ditu_types:'topo',
      isActive1:true,
      isActive2:true,
      loginform:{},
      menus:[],
      menus_data:{
        jichu:false,
        xinxi:false,
        zhafa:false,
        zhiban:false,
        xiangguan:false,
        yujin:false,
        lvding:false,
        peishui:false,
        weihu:false,
      },
    }; 
  },
  mixins: [FilterMethods, GetDataMethods],



  //////////////////////////////////////
  components: {
    Table, // 表格
    BaseBoxQUDAO, DetailQUDAO,// 渠道
    BaseBoxZHAFASHUIQING, DetailZHAFASHUIQING,// 闸阀水情
    BaseBoxZHAFAZHUANGTAI, DetailZHAFAZHUANGTAI,// 闸阀状态
    BaseBoxYUQING, DetailYUQING,// 雨情
    BaseBoxHEDAOSHUIQING, DetailHEDAOSHUIQING,// 河道水情
    BaseBoxSHUIKUSHUIQING, DetailSHUIKUSHUIQING,// 水库水情
    DetailSHIPINZHAN, BaseBoxSHIPINZHAN,// 视频站
    DetailTUXIANGZHAN, BaseBoxTUXIANGZHAN,// 图像站
    BaseBoxYUNXINGGONGKUANG, DetailYUNXINGGONGKUANG,// 运行工况
    DetailSHUIWEIKURONG// 水位库容
  },

  //////////////////////////////////////
  mounted() {
    var username=this.Cook.get("username");
        if(username==null || username==''){
            this.$router.push({path: '/login'});
            return;
        }
    this.loginform.name=username;
    //加载地图
    loadModules(["esri/map", "esri/layers/GraphicsLayer", "esri/SpatialReference", "esri/symbols/TextSymbol"], options)
      .then(([Map]) => {
        this.map = new esri.Map("map", {
          //basemap: "satellite",
          basemap: "topo",
          center: [112.393, 28.240],
          zoom: 13,
          logo: false,
          fadeOnZoom: true,
          slider: true // 伸缩滑块
          // maxZoom:4, //最大空间等级
          // minZoom:5, //最小空间等级
          // navigationMode: 'css-transforms' // 调整或缩放地图平滑
        });

        this.map.on("click", function(ev) {
            var lat = Math.round(ev.mapPoint.getLatitude() * 1000) / 1000;
            var lon = Math.round(ev.mapPoint.getLongitude() * 1000) / 1000;
            console.log("当前坐标："+lat+","+lon);
        });

        // 设置地图的鼠标样式
        this.map.setMapCursor("pointer");

        //加载图层
        //this.addSHPlayerToMap();
        this.loadSHP();

        //获取要素图层数据
        // this.getAll();


        this.add_GraphicsLayer_Selection_ToMap();
        
        
      })
      .catch(err => {
        console.error(err);
      });
    Vue.prototype.$App = this;
    //this.$App=this;
    this.axios.get('/guanqu/web/users/online-user').then((res) => {
        this.loginform = res.data;
    });
    this.axios.get('/guanqu/web/users/online-user/menus').then((res) => {
        this.menus = res.data;
        this.menus.forEach((item)=>{
            if (item.label == '基础数据') {
              this.menus_data.jichu = true;
            }
            if (item.label == '信息服务') {
              this.menus_data.xinxi = true;
            }
            if (item.label == '闸阀控制') {
              this.menus_data.zhafa = true;
            }
            if (item.label == '值班管理') {
              this.menus_data.zhiban = true;
            }
            if (item.label == '相关平台') {
              this.menus_data.xiangguan = true;
            }
            if (item.label == '预警管理') {
              this.menus_data.yujin = true;
            }
            if (item.label == '率定管理') {
              this.menus_data.lvding = true;
            }
            if (item.label == '配水管理') {
              this.menus_data.peishui = true;
            }
            if (item.label == '维护管理') {
              this.menus_data.weihu = true;
            }
        })
    });
  },





  methods: {
    //关闭页面
    close(){
      this.axios.delete('/guanqu/web/user/logout').then((res)=>{      
        console.log(res);
        this.Cook.set("username",null);
        this.$router.push({path: '/login'});
      });
      
    },
    //监测显示全部
    jcxs(){
      if (this.FeatrueLayers.length>10) {
        this.isActive1 = !this.isActive1;
      }else{
        this.isActive1 = this.isActive1;
      }
    },
    //图层显示全部
    tcxs(){
      if (this.tu_ceng_list.length>5) {
        this.isActive2 = !this.isActive2;
      }else{
        this.isActive2 = this.isActive2;
      }
    },
    //放大地图按钮
    fangda(){ 
      $(".esriSimpleSliderIncrementButton").click();
    },
    //缩小地图按钮
    suoxiao(){
      $(".esriSimpleSliderDecrementButton").click();
    },



    //图层关闭或打开
    //koen 20190911
    tu_ceng_switch(item) {
      console.log(item);
      item.show = !item.show;
      if(item.show) item.layer.show();
      else item.layer.hide();
    },

    //切换底图（卫星、街道...）
    dituchange1(){
      this.ditu_types = '-';
      var id = this.map.basemapLayerIds[0];
      if(this.ditu_types == '-') return this.map.getLayer(id).setVisibility(false);
      else this.map.getLayer(id).setVisibility(true);
      this.map.setBasemap(this.ditu_types);
    },
    dituchange2(){
      this.ditu_types = 'satellite';
      var id = this.map.basemapLayerIds[0];
      if(this.ditu_types == '-') return this.map.getLayer(id).setVisibility(false);
      else this.map.getLayer(id).setVisibility(true);
      this.map.setBasemap(this.ditu_types);
    },
    dituchange3(){
      this.ditu_types = 'hybrid';
      var id = this.map.basemapLayerIds[0];
      if(this.ditu_types == '-') return this.map.getLayer(id).setVisibility(false);
      else this.map.getLayer(id).setVisibility(true);
      this.map.setBasemap(this.ditu_types);
    },
    dituchange4(){
      this.ditu_types = 'streets';
      var id = this.map.basemapLayerIds[0];
      if(this.ditu_types == '-') return this.map.getLayer(id).setVisibility(false);
      else this.map.getLayer(id).setVisibility(true);
      this.map.setBasemap(this.ditu_types);
    },
    dituchange5(){
      this.ditu_types = 'topo';
      var id = this.map.basemapLayerIds[0];
      if(this.ditu_types == '-') return this.map.getLayer(id).setVisibility(false);
      else this.map.getLayer(id).setVisibility(true);
      this.map.setBasemap(this.ditu_types);
    },
    ditu_change() {
      var id = this.map.basemapLayerIds[0];
      if(this.ditu_type == '-') return this.map.getLayer(id).setVisibility(false);
      else this.map.getLayer(id).setVisibility(true);
      this.map.setBasemap(this.ditu_type);
    },


    //koen 20190930
    //转换坐标系
    zuobiaoxi(item) {
      console.log('处理坐标');
      console.log(item);

      item.Rows.forEach((one, index) => {
        //获取坐标
        var x=Number(one.geometry.x);
        var y=Number(one.geometry.y);

        //如果basemap使用ArcGIS的就需要
        //转换坐标系
        x = (x / 180.0) * 20037508.34
        if (y > 85.05112) y = 85.05112;
        if (y < -85.05112) y = -85.05112;
        y = (Math.PI / 180.0) * y;
        var tmp = Math.PI / 4.0 + y / 2.0;
        y = 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;

        item.Rows[index].attributes.LGTD = x;
        item.Rows[index].attributes.LTTD = y;
        item.Rows[index].geometry.x = x;
        item.Rows[index].geometry.y = y;
      });


      return item;
    },










    //保存原图方法
    handleClose(done) {
      this.enlargeModal_carousel.dialogVisible = false;
      return;
      // this.$confirm("明白了！")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    // 开关切换时的操作
    switch2change(){
      console.log(this.mapBox3D);
      if (this.mapBox3D) {
        window.location.href="http://222.240.238.58:7001/static/demo-guanqu-lcs-3d/#/"
      }
    },
    switchchange() {
      // if (this.mapBox_show == "0") {
      //   this.$router.push("/");
      // }
      // if (this.mapBox_show == "1") {
      //   this.$router.push("/");
      // }
    },
    // 当选择的监控图层发生变化
    // 重新显示或隐藏部分图层
    OnLayerChange(item) {
      if (item.show=='0') {
        item.show='1';
      }else if (item.show=='1') {
        item.show='0';
      }
      var featrueLayers = this.FeatrueLayers;
      featrueLayers.forEach((v, index) => {
        if (v.show == "1") v.LayerObject.show();
        else {
          v.LayerObject.hide();
          v.LayerObject_yujing.hide();
          if (this.FeatrueLayers[index].TextGraphicsLayerController) {
            this.FeatrueLayers[
              index
            ].TextGraphicsLayerController.removeAllTextGraphicsLayer();
          }
        }
      });
      // 获取正在显示的图层
      var featrueLayers_showing = this.featrueLayers_showing();
      // 如果存在 显示的图层
      if (featrueLayers_showing.length != 0) {
        // 如果要隐藏图层 并且 隐藏的图层是当前显示的图层的时候
        if (item.show == 0 && item.itype == this.listWindow.activeName) {
          // 激活的baseBox为正在显示的图层中的最后一个
          this.listWindow.activeName =
            featrueLayers_showing[featrueLayers_showing.length - 1].itype;
        } else if (item.show == 1) {
          // 如果要显示图层 并且 当前没有显示的图层的时候
          // 激活的baseBox为要显示的图层
          this.listWindow.activeName = item.itype;
          if (featrueLayers_showing.length == 1) {
            // 列表窗显示
            this.listWindow_show();
          }
        }
      } else {
        // 列表窗隐藏
        this.listWindow_hide();
      }
    },

    // 加载底图
    loadSHP() {
      this.axios.get("/static/demo-hunanguanqu/ditu.json").then(res => {
        var data = res.data,
        list = data.shpList;
        console.warn("res", res);
        console.warn("list", list);
        if (list.length <= 0) return;


          list.forEach((val, index) => {
            var data = val.data;
            var features = data.features;
            var color = val.color;
            var size = val.size || 2;
            console.warn("data", data);

            var graphicsSHPlayer = new esri.layers.GraphicsLayer();
            this.map.addLayer(graphicsSHPlayer);

            for (var j = 0; j < features.length; j++) {
              var feature = features[j];
              var graphic = null;

              switch (feature.geometry.type) {
                //点
                case "Point":
                  //symbol = new esri.symbol.PictureMarkerSymbol(getRootPath() + "images/point1.png", 22, 27);
                  symbol = new esri.symbol.SimpleMarkerSymbol({
                    size: size,
                    style: "simplefillsymbol"
                  });
                  symbol.setColor(color);
                  var mappoint = new esri.geometry.Point(
                    feature.geometry.coordinates[0],
                    feature.geometry.coordinates[1],
                    new esri.SpatialReference({ wkid: 4326 })
                  );
                  graphic = new esri.Graphic(mappoint, symbol);


                  var mappoint_text = new esri.geometry.Point(
                    feature.geometry.coordinates[0],
                    feature.geometry.coordinates[1],
                    new esri.SpatialReference({ wkid: 4326 })
                  );
                  var textsymbol = new esri.symbol.TextSymbol(feature.properties.NM);
                  textsymbol.setFont(new esri.symbol.Font("8pt").setWeight(esri.symbol.Font.WEIGHT_BOLD).setFamily("Arial"));
                  textsymbol.setOffset(0, 30);
                  textsymbol.setColor(new esri.Color([0,0,0]));
                  var graphic_text = new esri.Graphic(mappoint_text, textsymbol);
                  if(graphic_text) graphicsSHPlayer.add(graphic_text);

                  break;
                //线
                case "LineString":
                  symbol = new esri.symbol.SimpleLineSymbol(
                    esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                    new dojo.Color(color),
                    size
                  );
                  var polyline = new esri.geometry.Polyline(
                    feature.geometry.coordinates
                  );
                  graphic = new esri.Graphic(polyline, symbol);
                  break;
                //线
                case "MultiLineString":
                  var symbol = new esri.symbol.SimpleLineSymbol(
                    esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                    new dojo.Color(color),
                    size
                  );
                  var polyline = new esri.geometry.Polyline(
                    feature.geometry.coordinates
                  );
                  var graphic = new esri.Graphic(polyline, symbol);
                  break;
                //面
                case "Polygon":
                  symbol = new esri.symbol.SimpleFillSymbol(
                    esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                    new esri.symbol.SimpleLineSymbol(
                      esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                      new esri.Color([211, 211, 211]),
                      1
                    ),
                    new esri.Color(color)
                  );
                  var polygon = new esri.geometry.Polygon(
                    feature.geometry.coordinates
                  );
                  graphic = new esri.Graphic(polygon, symbol);
                  break;
              }

              graphicsSHPlayer.add(graphic);
            }

            console.log("graphicsSHPlayer", graphicsSHPlayer);
            this.tu_ceng_list.push({name:val.name, show:val.show, layer:graphicsSHPlayer,icon:val.icon,icon_active:val.icon_active});
            if (val.show==false) {
              graphicsSHPlayer.hide();
            }else{
              graphicsSHPlayer.show();
            }
          });
          this.getAll();
      });
    },


    //设置地图初始范围
    setMapExtent(options) {
      var initExtent = new esri.geometry.Extent(options);

      this.map.setExtent(initExtent);  //koen 会出现中心点在太平洋上的bug
      //木木  但是没有这个函数黄材这边就没办法初始化定位了
    },
    //获取各个图层信息
    getEachFeatureLayers(FeatureLayers) {
      for (let i = 0; i < FeatureLayers.length; i++) {
        // 获取图层数据（没有过滤条件的）
        this.getFeatrueLayerWithoutPreconditions(FeatureLayers[i].url, res => {
          var featureLayerOBJ = FeatureLayers[i];

          var data = res.data;
          var clone_data = JSON.parse(JSON.stringify(data));

          // 创建图层（根据图层数据）
          var featureLayer = this.createFeatrueLayer(data);
          // 获取异常数据
          var AbnormalData = this.getAbnormalData(data);
          // 创建预警图层（根据图层异常数据）
          var featrueLayer_yujing = this.createFeatrueLayer(AbnormalData);

          //设置图层的特征点图标
          this.setFeatrueLayerSymbol(featureLayer, featureLayerOBJ.icon, { width: 16, height: 16});

          // 设置预警图层的特征点图标
          this.setFeatrueLayerSymbol( featrueLayer_yujing, "/static/demo-hunanguanqu/yujing.gif", { width: 42, height: 42 } );

          console.log("@@@@@@@@@@@@@@@@@@", featureLayerOBJ);

          // 默认显示闸阀水情 和 渠道水情图层
          if (
            featureLayerOBJ.itype === "qudaoshuiqing" ||
            featureLayerOBJ.itype === "zhafashuiqing" ||
            featureLayerOBJ.itype === "tuxiang"
          ) {
            featureLayerOBJ.show = "1";
          }
          if (featureLayerOBJ.show != "1") {
            featrueLayer_yujing.hide();
            featureLayer.hide();
          } // 根据数据里面的show属性 决定图层是否隐藏
          let obj = {
            title: JSON.parse(JSON.stringify(featureLayerOBJ)).title,
            show: JSON.parse(JSON.stringify(featureLayerOBJ)).show
          };

          // this.fList.push(obj)
          // 给图层对象添加 图层，图层特征点数据，地图
          featureLayerOBJ.LayerObject = featureLayer; // 添加图层到图层对象
          featureLayerOBJ.LayerObject_yujing = featrueLayer_yujing; // 添加图层到图层对象
          featureLayerOBJ.Rows = clone_data.features; // 添加图层特征点数据到图层对象
          featureLayerOBJ.map = this.map; // 添加地图到图层对象

          // 添加图层模块
          this.addFeatrueLayer(
            [featrueLayer_yujing, featureLayer],
            featureLayerOBJ
          );

          // 给图层里的特征点 添加事件
          this.addEventToJsonFlayer(featureLayer, featureLayerOBJ);
        });
      }
    },
    // 获取系统信息
    getAll() {
      // /static/demo-hunanguanqu/system.json
      this.axios.get("/guanqu/gis/system_info").then(res => {
        var data = res.data;
        // 保存系统信息到system_info
        this.system_info = data;
        // 保存各图层url配置到system_info的FLayerUrl里
        this.system_info.FLayerUrl = (() => {
          var FeatureLayers = this.system_info.FeatureLayers;
          var FLayerUrl = new Object();

          FeatureLayers.forEach((val, index) => {
            FLayerUrl[val.itype] = val.url;
          });
          return FLayerUrl;
        })();
        // 设置地图 视图初始范围
        var GIS_CENTER = data.GIS_CENTER;
        this.setMapExtent({

          xmin: parseFloat(GIS_CENTER.xmin),
          xmax: parseFloat(GIS_CENTER.xmax),

          ymin: parseFloat(GIS_CENTER.ymin),
          ymax: parseFloat(GIS_CENTER.ymax),

          spatialReference: {wkid: 4326}
          //spatialReference: this.map.spatialReference
          //spatialReference: new esri.SpatialReference({ wkid: 4326 })
        });
        // 获取各个图层信息
        this.getEachFeatureLayers(data.FeatureLayers);
      });
    },
    // 给特征点元素点添加事件
    addEventToJsonFlayer(JsonFlayer, v) {
      JsonFlayer.on("click", evt => {
        //当鼠标点击元素
        // 抽屉组件默认显示表类型
        evt.graphic.attributes.rowinfo.tableType = {
          qdsq: "historyTable",
          zfsq: "historyTable",
          hdsq: "historyTable",
          yq: "hourTable",
          sksq: "historyTable"
        };
        // 展示抽屉组件
        this.showDrawer(evt, v);
      });
    },
    // 获取 子组件传过来 的绘图方法
    chart(item) {
      this.getChart = item.chart;
    },
    // 展示抽屉组件
    showDrawer(evt, v) {
      var graphic = evt.graphic;

      var show_right = () => {
        this.details.info_right = graphic.attributes;
        this.details.info_right.itype = v.itype;
        this.details.drawer_show_right = true;
      };

      // 如果左边抽屉组件显示，显示或替换右边抽屉组件
      if (this.details.drawer_show_left) {
        if (this.details.info_left.STCD == graphic.attributes.STCD) {
          // 如果打开的站点相同
          return this.$Message.warning("该站点详情已打开");
        }
        // 传递属性数据

        // 对应类型
        if (this.details.drawer_show_right) {
          this.details.drawer_show_right = false;
          this.details.info_right.itype = false;
          setTimeout(() => {
            show_right();
          }, 300);
        } else {
          show_right();
        }
      } else {
        // 否则 显示左边抽屉组件
        // 传递属性数据
        console.log(graphic.attributes);
        this.details.info_left = graphic.attributes;
        // 对应类型
        console.log(v.itype);
        this.details.info_left.itype = v.itype;
        this.details.drawer_show_left = true;
      }
      console.log(evt, v);
    },
    // 关闭抽屉组件
    closeDrawer(placement) {
      // 如果关闭的是左抽屉，并且右抽屉未开启
      if (placement == "left" && !this.details.drawer_show_right) {
        this.GraphicsLayer_Selection_clear(); // 取消所有站点的闪烁
      }

      // 如果关闭的是右抽屉，并且左抽屉未开启
      if (placement == "right" && !this.details.drawer_show_left) {
        this.GraphicsLayer_Selection_clear(); // 取消所有站点的闪烁
      }
      // 如果关闭的是右抽屉，并且左抽屉已开启
      if (placement == "right" && this.details.drawer_show_left) {
        // 设置中心缩放
        //this.setMapCenterandZoom(this.details.info_left.LGTD,this.details.info_left.LTTD);
        // 取消所有站点的闪烁
        this.GraphicsLayer_Selection_clear();
        // 对应站点闪烁
        this.add_Graphic_To_GraphicsLayer_Selection(this.details.info_left);
      }

      this.details[`info_${placement}`].itype = null;
    },
    // 设置中心和缩放 (接受经纬度，和缩放比例)
    setMapCenterandZoom(LGTD, LTTD, Zoom) {
      this.map.centerAndZoom([Number(LGTD), Number(LTTD)], Zoom || 1);
    },
    // 处理标签页点击事件
    handleTabClick(item) {},
    // 声音提示
    baiduVoice(str, boolean) {
      //调用百度接口----------------总感觉声音怪怪的
      var url =
        "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" +
        encodeURI(str);
      var n = new Audio(url);
      n.src = url;
      if (boolean) {
        n.play();
      }
      // n.pause();

      return n;
    },
    // 正在显示的图层
    featrueLayers_showing() {
      var featrueLayers = this.FeatrueLayers;
      // 获取正在显示的图层
      var featrueLayers_showing = featrueLayers.filter(val => {
        if (val.show == 1) {
          return true;
        }
      });
      return featrueLayers_showing;
    },
    // 列表窗显示隐藏切换(控制面板)
    listWindow_toggle() {
      this.listWindow.show_Controller = !this.listWindow.show_Controller;
    },
    // 列表窗显示
    listWindow_show() {
      this.listWindow.show_Controller = true;
    },
    // 列表窗隐藏
    listWindow_hide() {
      this.listWindow.show_Controller = false;
    },
    // 列表窗形态切换
    listWindow_changeMode() {
      var mode = this.listWindow.mode;

      if (mode < 3) {
        this.listWindow.mode++;
        return console.log(this.listWindow.mode);
      }

      this.listWindow.mode = 0;
    },
    // 列表选项卡位置
    listWindow_tabPosition(mode) {
      switch (mode) {
        case 0:
          return "top";
        case 1:
          return "right";
        case 2:
          return "left";
        case 3:
          return "bottom";
        default:
          return "top";
      }
    },
    // 所有audio标签声音关闭
    audio_pause() {
      var audio_eles = document.getElementsByClassName("baiduVoice");
      for (let index = 0; index < audio_eles.length; index++) {
        var ele = audio_eles[index];
        if (ele !== null) {
          ele.pause(); // 这个就是暂停
          //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
          // alert(audio.paused);
          // if (audio_ele.paused) {
          //   audio.play(); //audio.play();// 这个就是播放
          // } else {
          //   audio_ele.pause(); // 这个就是暂停
          // }
        }
      }
    },
    // 移除选项卡
    removeTab(item) {
      var featrueLayers = this.FeatrueLayers;
      featrueLayers.forEach((val, index) => {
        if (val.itype == item) {
          this.FeatrueLayers[index].show = 0;
          val.LayerObject.hide();
          val.LayerObject_yujing.hide();

          // 所有audio标签声音关闭
          this.audio_pause();

          if (this.FeatrueLayers[index].TextGraphicsLayerController) {
            this.FeatrueLayers[
              index
            ].TextGraphicsLayerController.removeAllTextGraphicsLayer();
          }
        }
      });
      // 获取正在显示的图层
      var featrueLayers_showing = this.featrueLayers_showing();
      if (featrueLayers_showing != 0) {
        // 激活的baseBox为正在显示的图层中的最后一个
        this.listWindow.activeName =
          featrueLayers_showing[featrueLayers_showing.length - 1].itype;
      } else {
        // 列表窗隐藏
        this.listWindow_hide();
      }
    },
    // 还原地图视图默认位置
    restoreMapView() {
      var system_info = this.system_info,
        GIS_CENTER = system_info.GIS_CENTER;
        console.log();
      // 设置地图 视图初始范围
      this.setMapExtent({
        // xmin: 110.97802432948647,
        // ymin: 27.531235202509322,parseFloat
        // xmax: 113.8843752444488,
        // ymax: 28.9647322423371,
        xmin: parseFloat(GIS_CENTER.xmin),
        xmax: parseFloat(GIS_CENTER.xmax),
        ymin: parseFloat(GIS_CENTER.ymin),
        ymax: parseFloat(GIS_CENTER.ymax),
        spatialReference: this.map.spatialReference
      });
      this.map.infoWindow.hide();
    },
    // 获取异常数据
    getAbnormalData(graphicsData) {
      var data = JSON.parse(JSON.stringify(graphicsData)); // 图层数据深拷贝
      // 把每个特征点的rowinfo数据放入每个特征点的属性中
      data.features.forEach((val, index) => {
        data.features[index].attributes.rowinfo = data.features[index].rowinfo;
      });

      var AbnormalData = data.features.filter((val, index) => {
        if (val.rowinfo._status == 0) {
          return true;
        }
      });

      data.features = AbnormalData;

      return data;
    },
    // 通知
    notify_Layer(options, data) {
      if (data.length > 0) {
        this.Message_Window_show(true); // 打开消息窗口

        var Voice_Controller = this.Message_Window.Voice_Controller,
          notify_info_list = this.Message_Window.notify_info.list;

        var time = 0;
        data.forEach((val, index, array) => {
          var rowinfo = val.rowinfo;

          var item = new Object();
          item.icon = options.icon;
          item.text = `${rowinfo.STNM} 出现异常`;
          item.voice = this.baiduVoice(item.text);
          item.voice_duration = item.text.length * 300;
          item.id = notify_info_list.length;
          notify_info_list.length = 0;
          notify_info_list.unshift(item);

          setTimeout(() => {
            if (Voice_Controller) {
              var duration = notify_info_list[index].voice.duration;
              time += duration * 1000;
              var copyTime = JSON.parse(JSON.stringify(time));
              setTimeout(() => {
                var voice = this.Message_Window.notify_info.list[index].voice;
                if (voice) {
                  voice.play();
                }
              }, copyTime);
            }
          }, 500);
        });
      }
    },
    // 声音列表播放
    voice_list_play(list) {
      var time = 0;
      list.forEach((val, index) => {
        var voice = val.voice,
          voice_duration = val.voice_duration;
        time += voice_duration;
        console.log("voice", voice);
        var copyTime = JSON.parse(JSON.stringify(time));
        setTimeout(() => {
          voice.play();
        }, copyTime);
      });
    },
    // 声音列表播放
    voice_list_pause(list) {
      var list = list || this.Message_Window.notify_info.list;
      list.forEach((val, index) => {
        list[index].voice = null;
      });
    },
    // 查询图层 (要查询的图层类型, 过滤字段, 所属图层对象)
    search_FeatrueLayer(type, fields, featureLayerOBJ, callback, errCallback) {
      // 获取具有过滤条件的图层数据
      this.getFeatrueLayer(
        type,
        fields,
        res => {
          var clone_data = JSON.parse(JSON.stringify(res.data));
          // 创建图层（根据图层数据）
          var featrueLayer = this.createFeatrueLayer(res.data);
          // 获取异常数据
          var AbnormalData = this.getAbnormalData(res.data);
          // 创建预警图层（根据图层异常数据）
          var featrueLayer_yujing = this.createFeatrueLayer(AbnormalData);
          // 移除图层对象里的相应图层
          this.removeFeatureLayer(featureLayerOBJ);
          // 移除图层对象里的相应预警图层
          this.removeFeatureLayer_yujing(featureLayerOBJ);
          // 设置图层的特征点图标
          this.setFeatrueLayerSymbol(featrueLayer, featureLayerOBJ.icon, {
            width: 16,
            height: 16
          });

          // 设置预警图层的特征点图标
          this.setFeatrueLayerSymbol(
            featrueLayer_yujing,
            "/static/demo-hunanguanqu/yujing.gif",
            {
              width: 46,
              height: 46
            }
          );

          // 添加预警图层到地图
          this.addFeatrueLayerToMap(featrueLayer_yujing);
          // 添加图层到地图
          this.addFeatrueLayerToMap(featrueLayer);

          if (AbnormalData.features.length > 0) {
            // 图层提示预警信息
            this.notify_Layer(
              {
                icon: featureLayerOBJ.icon_warning,
                type: "warning"
              },
              AbnormalData.features
            );
          }

          // 更新图层对象集合里面 对应图层对象的 图层以及图层数据
          var newFeatureLayerOBJ = this.updateFeatrueLayers(
            featureLayerOBJ,
            featrueLayer,
            featrueLayer_yujing,
            clone_data
          );
          // 如果有回调，执行回调
          if (typeof callback == "function") {
            callback(newFeatureLayerOBJ);
          }
          // 取消所有站点的闪烁
          this.GraphicsLayer_Selection_clear();
          // 给图层里的特征点 添加事件
          this.addEventToJsonFlayer(
            newFeatureLayerOBJ.LayerObject,
            newFeatureLayerOBJ
          );
        }
        // errCallback
      );
    },
    // 获取没有过滤条件的图层数据
    getFeatrueLayerWithoutPreconditions(url, callback) {
      this.axios.get(url).then(res => {
        if (typeof callback == "function") {
          callback(res);
        }
      });
    },
    // 获取具有过滤条件的图层数据
    getFeatrueLayer(type, fields, callback, errCallback) {
      /*
                type为数字，以下为不同数字对应图层
                4: 渠道水情
                5: 闸阀水情
                6: 闸阀状态
                7: 图像
                8: 视频
                */

      var url = this.system_info.FLayerUrl[type];

      var body = {
        // _filter: new Object()
      };
      // 增加过滤字段
      for (var key in fields) {
        body[key] = fields[key];
      }

      this.axios.post(url, body).then(res => {
        if (typeof errCallback == "function") {
          errCallback();
        }
        if (typeof callback == "function") {
          callback(res);
        }
      });

    },
    // 移除指定图层
    removeFeatureLayer(featureLayerOBJ) {
      // 从地图中移除图层
      if (featureLayerOBJ.LayerObject) {
        this.map.removeLayer(featureLayerOBJ.LayerObject);
      }

      // 从控制面板的图层对象中清空图层及图层特征点数据
      featureLayerOBJ.LayerObject = null;
      featureLayerOBJ.Rows = [];
    },
    // 移除指定图层的预警图层
    removeFeatureLayer_yujing(featureLayerOBJ) {
      // 从地图中移除图层
      if (featureLayerOBJ.LayerObject_yujing) {
        this.map.removeLayer(featureLayerOBJ.LayerObject_yujing);
      }
      // 从控制面板的图层对象中清空图层及图层特征点数据
      featureLayerOBJ.LayerObject_yujing = null;
      // featureLayerOBJ.Rows = [];
    },
    // 创建图层（根据图层数据）
    createFeatrueLayer(graphicsData) {
      var data = JSON.parse(JSON.stringify(graphicsData)); // 图层数据深拷贝
      // 把每个特征点的rowinfo数据放入每个特征点的属性中
      data.features.forEach((val, index) => {
        data.features[index].attributes.rowinfo = data.features[index].rowinfo;
      });

      //构建图层
      var featureCollection = {
        layerDefinition: data,
        featureSet: new esri.tasks.FeatureSet(data)
      };

      var featureLayer = new esri.layers.FeatureLayer(featureCollection);

      return featureLayer;
    },
    // 设置图层的特征点图标
    setFeatrueLayerSymbol(featureLayer, iconUrl, option) {
      var symbol = new esri.symbol.PictureMarkerSymbol(
        iconUrl,
        option ? option.width : 16,
        option ? option.height : 20
      );
      var renderer = new esri.renderer.SimpleRenderer(symbol);
      featureLayer.setRenderer(renderer);
    },
    // 添加图层到地图
    addFeatrueLayerToMap(featureLayer) {
      this.map.addLayer(featureLayer);
    },
    // 添加图层对象到控制面板
    addFeatrueLayerObjToBaseBox(featureLayerOBJ) {
      // 排序
      switch (featureLayerOBJ.title) {
        case "雨情":
          this.FeatrueLayers.splice(3, 0, featureLayerOBJ);
          break;
        case "水库水情":
          this.FeatrueLayers.splice(4, 0, featureLayerOBJ);
          break;
        case "河道水情":
          this.FeatrueLayers.splice(6, 0, featureLayerOBJ);
          break;
        case "渠道水情":
          this.FeatrueLayers.splice(0, 0, featureLayerOBJ);
          break;
        case "闸阀水情":
          this.FeatrueLayers.splice(1, 0, featureLayerOBJ);
          break;
        case "闸阀状态":
          this.FeatrueLayers.splice(5, 0, featureLayerOBJ);
          break;
        case "图像":
          this.FeatrueLayers.splice(2, 0, featureLayerOBJ);
          break;
        case "视频":
          this.FeatrueLayers.splice(7, 0, featureLayerOBJ);
          break;
        case "运行工况":
          this.FeatrueLayers.splice(8, 0, featureLayerOBJ);
          break;
      }
    },
    // 添加图层模块
    addFeatrueLayer(featureLayerList, featureLayerOBJ) {
      featureLayerList.forEach(val => {
        // 添加图层到地图
        this.addFeatrueLayerToMap(val);
      });
      // 添加图层对象到控制面板
      this.addFeatrueLayerObjToBaseBox(featureLayerOBJ);
    },
    // 替换指定图层对象里的图层和特征点数据
    updateFeatrueLayers(
      featureLayerOBJ,
      featureLayer,
      featrueLayer_yujing,
      data
    ) {
      featureLayerOBJ.LayerObject = featureLayer; // 添加图层到图层对象
      featureLayerOBJ.LayerObject_yujing = featrueLayer_yujing; // 添加图层到图层对象
      featureLayerOBJ.Rows = data.features; // 添加图层特征点数据到图层对象
      // 更新FeatrueLayers
      this.FeatrueLayers.forEach((val, index) => {
        if (val.itype == featureLayerOBJ.itype) {
          this.FeatrueLayers.splice(index, 1, featureLayerOBJ);
        }
      });
      return featureLayerOBJ;
    },
    // 添加选中提示的图形图层到地图
    add_GraphicsLayer_Selection_ToMap() {
      var graphicsLayer_Selection = new esri.layers.GraphicsLayer();
      this.map.addLayer(graphicsLayer_Selection);
      this.graphicsLayer_Selection.LayerObject = graphicsLayer_Selection;
    },
    // 添加图形符号到选中提示的图形图层
    add_Graphic_To_GraphicsLayer_Selection(item) {
      var point = new esri.geometry.Point(
        item.LGTD,
        item.LTTD,
        this.map.spatialReference
      );
      var pictureSymbol = new esri.symbol.PictureMarkerSymbol(
        // getRootPath() + "images/plot/point1.png",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2229475421,1482637450&fm=26&gp=0.jpg",
        20.4,
        20.4
      );
      var graphic = new esri.Graphic(point, pictureSymbol);
      this.graphicsLayer_Selection.LayerObject.add(graphic);
      this.graphicsLayer_Selection.graphics.push(graphic);
    },
    // 清除图形图层里的所有图形符号
    GraphicsLayer_Selection_clear() {
      this.graphicsLayer_Selection.LayerObject.clear();
    },
    // 功能开发提示
    developing_tip() {
      this.$Message.warning("从功能正在开发中...");
    },
    // 添加shp地图到map
    addSHPlayerToMap() {
      // 创建空底图（基础）部分
      //var graphicsSHPlayer = new esri.layers.GraphicsLayer();
      // 往地图对象添置 空底图
      //this.map.addLayer(graphicsSHPlayer);

      //图层加载
      this.loadSHP();
    },
    enlarge_img(rows, index) {
      // 图片放大模态框展示
      this.imgModal_show();

      var newRows = rows
        ? JSON.parse(JSON.stringify(rows))
        : this.enlargeModal_carousel.rows;
      this.enlargeModal_carousel.Rows = newRows;
      this.enlargeModal_carousel.initial_index = index || 0;
    },
    // 图片放大模态框展示
    imgModal_show() {
      this.$refs.imgModal.style.display = "block";
      this.enlargeModal_carousel.show = true;
    },
    // 图片放大模态框隐藏
    imgModal_hide() {
      this.$refs.imgModal.style.display = "none";
      this.enlargeModal_carousel.show = false;
    },
    // 图片顺时针旋转
    clockwise_rotation() {
      var ele = document.getElementById(
        `img${this.enlargeModal_carousel.initial_index}`
      );
      var rotate = ele.style.transform;
      // console.log("index",this.enlargeModal_carousel.initial_index);
      // console.log("ele",ele);
      if (rotate == "") {
        ele.style.transform = `rotate(90deg)`;
      } else {
        rotate = parseInt(rotate.match(/\d+/g));
        ele.style.transform = `rotate(${rotate + 90}deg)`;
      }
      // .match(/\d+/g)
    },
    // 图片逆时针旋转
    counterclockwise_rotation() {
      var ele = document.getElementById(
        `img${this.enlargeModal_carousel.initial_index}`
      );
      var rotate = ele.style.transform;
      if (rotate == "") {
        ele.style.transform = `rotate(-90deg)`;
      } else {
        rotate = parseInt(rotate.match(/\d+/g));
        ele.style.transform = `rotate(${rotate - 90}deg)`;
      }
    },
    // 图片还原
    restore_rotation(imgID) {
      var ele = document.getElementById(imgID);
      if (ele) {
        ele.style.transform = `rotate(0deg)`;
      }
    },
    // 图片比率
    scale(id, ratio) {
      var ele = document.getElementById(id);
      if (typeof ratio === "string") {
        switch (ratio) {
          case "up":
            break;
        }
      }
    },
    // 设置图片放大模态框轮播图自动播放
    setCarousel_autoplay() {
      this.enlargeModal_carousel.autoplay = true;
    },
    // 幻灯片切换触发事件
    carousel_onChange(newIndex, oldIndex) {
      // 旧图片旋转还原
      this.restore_rotation(`img${oldIndex}`);
      // 更新图片下标
      this.enlargeModal_carousel.initial_index = newIndex;
    },
    // 消息窗口显示与否
    Message_Window_show(boolean) {
      if (boolean) {
        this.Message_Window_Controller.show = false;
      } else {
        this.Message_Window_Controller.show = true;
      }
    },
    // getFList(){
    //     console.log('++++++++++++++++++', this.FeatrueLayers);
    //     for(let i = 0;i < this.FeatrueLayers.length;i ++){
    //         let obj = {
    //             title: JSON.parse(JSON.stringify(this.FeatrueLayers))[i].title,
    //             show: JSON.parse(JSON.stringify(this.FeatrueLayers)).show
    //         }
    //         console.log('************',obj)
    //     }
    //     console.log('----------------',this.fList)
    // }
    
    // 顶部菜单方法
    handleSelect(key, keyPath) {
    console.log(keyPath);
    this.mapBox_show=0
    this.$router.push(keyPath[0]);
      },
      navchange1(){
        this.imgflag='jichushuju';
        console.log(this.imgflag)
      },
      navchange2(){
        this.imgflag='xinxifuwu';
        console.log(this.imgflag)
      },
      navchange3(){
        this.imgflag='zhafakongzhi';
        console.log(this.imgflag)
      },
      navchange4(){
        this.imgflag='zhibanguanli';
        console.log(this.imgflag)
      },
      navchange5(){
        this.imgflag='xiangguanpingtai';
        console.log(this.imgflag)
      },
      navchange6(){
        this.imgflag='yujingguanli';
        console.log(this.imgflag)
      },
      navchange7(){
        this.imgflag='lvdingguanli';
        console.log(this.imgflag)
      },
      navchange8(){
        this.imgflag='peishuiguanli';
        console.log(this.imgflag)
      },
      navchange9(){
        this.imgflag='weihuguanli';
        console.log(this.imgflag)
      }

  },
  computed: {},
};
</script>

<style>
  @import "table/table.css";
  #map_zoom_slider {
     display:none;
}
.left-btn{
  position: absolute;
  left: 20px;top: 80px;
}
.left-btn button{
  margin-left: 0;
}
/*.new-tool-box{
  position: absolute;
  left: 20px;
  top: 120px;
  width: 329px;
  padding: 10px;
  background-color: white;
}*/
.new-tool-box2{
  position: absolute;
  left: 20px;
  top: 120px;
  width: 329px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.jiance-box{
  width: 52px;
  height: 52px;
  background-color: rgb(242,242,242);
  border-radius: 4px;
  margin: 3px;
  text-align: center;
  position: relative;
  cursor:pointer;
  color: #909399;
}
.jiance-box span{
  width: 52px;
  position: absolute;
  font-size: 10px;
  left: 0px;
  bottom:0px;
  padding:0px;
  margin:0px;
}
.check-border{
  color: #409EFF;
  border: 1px solid #409EFF;
}
.topNav>ul>li{
  color: #fff;
  margin-right: 100px;
  font-size:10px;
  padding: 0 6px;
}
.box-h{
  position: relative;
  margin: 0 auto;
  height: 32px;
  line-height: 32px;
  /*height: 116px;*/
}
.jcbox{
  height: 116px;
  /*height: 58px;*/
}
.tcbox{
  height: 58px;
}
</style>
      <style lang="less">
.zZindex {
  z-index: 3000 !important;
}

 .el-menu-item.is-active { background-color: #fff !important; color:#409EFF !important;border-bottom: 2px solid #fff;  }
 .el-menu-item>img{
  margin-right: 5px;
 }
 .el-menu>.el-menu-item.is-active{
       border-bottom: 2px solid #fff;

 }

#app {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}

#listWindow {
  position: absolute;
  top: 100px;
  right: 20px;
  width: 480px;
  min-height: 200px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  padding: 15px;
  box-sizing: border-box;
  z-index: 50;
  // overflow: auto;
  transition: 0.5s;
  // 开关按钮
  .switch {
    position: absolute;
    left: -30px;
    width: 30px;
    height: 80px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: rgb(45, 183, 245);
    // background: #F56C6C;
    background: white;
    // background: white;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: rgb(126, 183, 240) 2px solid;
    border-right: 0;

    &:hover {
      filter: brightness(1.1);
    }

    i {
      font-size: 25px;
    }
  }

  // 模式切换按钮
  .mode {
    position: absolute;
    left: -12px;
    width: 28px;
    height: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: rgb(45, 183, 245);
    // background: #F56C6C;
    background: white;
    // background: white;
    border-radius: 50%;
    border: rgb(126, 183, 240) 2px solid;

    &:hover {
      filter: brightness(1.1);
    }

    i {
      font-size: 16px;
    }
  }

  // 主体内容
  .wrapper {
    width: 450px;

    // 图层没有时的提示
    .tip {
      width: 100%;
      min-height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      color: #409eff;
    }
  }

  .el-tabs__header {
    min-width: 7.25rem;
  }

  // 分页器
  .el-pagination {
    white-space: unset;

    button,
    span:not([class*="suffix"]) {
      margin-bottom: 0.625rem;
    }
  }
}

.listWindow {
  transform: translate(500px);
}

// 列表窗展示
.listWindow_on {
  transform: translate(0);
}

#mapViewReductionButton {
  position: absolute;
  left: -80px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4c4c4c;
  border: 2px solid #4c4c4c;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;

  &:hover {
    border: 2px solid #409eff;
    background: white;

    i {
      color: #409eff;
    }
  }

  i {
    font-size: 35px;
    color: #fff;
  }
}

#mapBox {
  height: 100%;
}

.button-bar {
  position: fixed;
  top: 100px;
  right: 0;
  padding: 2em;
  width: 200px;
  background-color: #33f;
}

.tool-box {
  padding: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 80px;
  right: 20px;
  background-color: #fff;
  line-height: 44px;
  color: #4c4c4c;
}

.tool-box a {
  color: #4c4c4c;
}

// baseBox控制面板单元格样式
.el-table {
  .el-table__row {
    cursor: pointer;

    td {
      padding: 0.125rem 0;
    }
  }
}

#app .el-table--small {
  th {
    padding: 0;
  }
}

// 表格单元格样式
.ivu-table-wrapper .ivu-table td,
.ivu-table-wrapper .ivu-table th {
  cursor: pointer;
  padding: 0.4rem 0;
  height: auto;
}

svg {
  // transition: 1s;
}

.topNav .el-switch__label,
.topNav .el-switch__label.is-active {
  color: white;
}

.ivu-table-wrapper .ivu-table-small td {
  height: 1.5625rem;
}

// 分割块
.divider {
  height: 0.625rem;
}

// 分页
.pagination {
  height: 23px;
  line-height: 23px;
}

// tips提示框
.esriPopupWrapper {
  // 头部
  .sizer {
    .titlePane {
      background: rgb(83, 167, 255);
      border-radius: 0;
      line-height: 30px;

      .title {
        background: rgb(83, 167, 255);
        border-bottom: 0;
      }

      // 最大化按钮
      .titleButton.maximize {
        top: 10px;
        display: none;
      }

      // 关闭按钮
      .titleButton {
        top: 6px;
        display: none;
      }
    }
  }
}

body {
  // iview选择框下拉最大高度
  .ivu-select-dropdown {
    max-height: 400px;
  }

  //
  .el-table__empty-block {
    text-align: left;
  }
}

// 滑框样式
.ivu-drawer {
  .el-tabs__content {
    overflow: unset;
  }
}

/* -------------图片放大(开始)----------------- */

/* 触发弹窗图片的样式 */
.Img {
  // border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.Img:hover {
  opacity: 0.9;
  // filter: brightness(1.5);
}

/* 弹窗背景 */
.imgModal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 9999; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* 图片 */
.modal-content {
  margin: auto;
  display: block;
  // width: 45%;
  max-width: 65%;
  // height: 90%;
  max-height: 90%;
}

/* 添加动画 */
.modal-content,
#caption {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

/* 工具栏 */
#toolbar {
  width: 260px;
  height: 60px;
  position: absolute;
  right: 165px;
  bottom: 83px;
  font-size: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 20px;
  z-index: 10;

  i {
    margin: 0 5px 0 0;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
}

#toolbar > .el-button {
  border-radius: 0px !important;
}

@-webkit-keyframes zoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* 关闭按钮 */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

.el-carousel {
  .el-carousel__container {
    height: 100%;

    .el-carousel__item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

/* 小屏幕中图片宽度为 100% */
@media only screen and (max-width: 600px) {
  .modal-content {
    width: 100%;
  }
}

/* -------------图片放大(结束)----------------- */

.crp {
  cursor: pointer;
}

/* -------------消息窗口和控制器(开始)----------------- */

#Message_Window {
  z-index: 999;
  position: absolute;
  width: 300px;
  height: 362px;
  background: #fff;
  bottom: 50px;
  right: 30px;
  // border-radius: 10%;
  /* box-sizing: border-box; */
  // border: #52a7fe 2px solid;

  overflow: auto;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    height: 1.5625rem;
    border-bottom: 0;
    background: #52a7fe;
    color: white;
    overflow: hidden;
    position: relative;

    .window_tool {
      position: absolute;
      display: inline-block;
      right: 0;

      i {
        margin-right: 5px;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .content {
    list-style: none;
    height: 262px;
    overflow: auto;
    background: rgb(246, 247, 250);

    li {
      display: flex;
      height: 40px;
      align-items: center;
      padding-left: 0.9375rem;
      font-size: 0.875rem;

      cursor: pointer;

      &:hover {
        background: #fff;
      }
    }
  }
}

#Message_Window_Controller {
  position: absolute;
  bottom: 15px;
  right: 15px;
  border: #52a7fe 2px solid;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.1);
  }
}

/* -------------消息窗口和控制器(结束)----------------- */

/* -------------过渡动画(开始)----------------- */

.Messag-enter-active,
.Messag-leave-active {
  transition: 0.4s;
}

.Messag-enter,
.Messag-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.Messag-complete-leave-active {
  // position: absolute;
}

.el-date-editor .el-range__close-icon,
.el-picker-panel__footer .el-button--text {
  display: none !important;
}

/* -------------过渡动画(结束)----------------- */





.ivu-divider-horizontal{
  margin-bottom: 0 !important;
}
.borsLine{
  text-align: left;height: 30px;line-height: 30px
}
@media (max-width: 1800px) {
  .btn_baobiao{
    margin-top: 10px !important;
    margin-left: 30px !important;
  }
}

iframe{
  border: 0 !important;
}
.esriAttributionList { display: none }
</style>
