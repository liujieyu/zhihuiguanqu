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
        active-text-color="#ffd04b"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1" :disabled="true" style="opacity: 1;">
          <img src="/static/demo-hunanguanqu/biaozhi.png" style="height: 48px; margin-right: 5px;opacity: 0.9;"/>
          <span style="font-size: 20px; color: #fff;font-weight: 200;">宁乡市小型水库监测预警平台</span>
        </el-menu-item>
        <el-menu-item index="1" :disabled="true" style="opacity: 1;">
          <el-switch
            @change="switchchange"
            active-text="一张图"
            inactive-text="分析"
            :active-value="1"
            :inactive-value="0"
            v-model="mapBox_show"
            active-color="#468ecb"
          ></el-switch>
        </el-menu-item>

        <div style="line-height: 20px;display: flex;flex-direction: column; margin-top: 10px;color: #fff;padding-left: 10px;padding-right: 10px;float: right;" @click="close()">
        <div>{{loginform.name}}</div>
        <div style="cursor: pointer;">退出</div>
        </div>
        <div style="float: right;padding-top:13px;">
        <Input search enter-button="定位" placeholder="请输入水库名称" v-model="search_str" @on-search="locationByName()"/>
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
        <el-radio-group v-model="jksign" size="small" @change="showjianceinfo">
          <el-radio-button label="1" style="border-color:#52A7FE;"><font>水雨情监测</font></el-radio-button>
          <el-radio-button label="2" style="border-color:#52A7FE;"><font>大坝安全监测</font></el-radio-button>
        </el-radio-group>
        <el-button plain size="mini" style="width: 83px;height: 31px;margin-left:52px;" @click="tool_box = !tool_box">地图操作</el-button>
        <!--
        <el-button plain size="mini" style="margin-left: 0px;width: 83px;height: 28px;" @click="restoreMapView">默认大小</el-button>
        <el-button plain size="mini" style="margin-left: 0px;width: 83px;height: 28px;" @click="fangda">放大</el-button>
        <el-button plain size="mini" style="margin-left: 0px;width: 83px;height: 28px;" @click="suoxiao">缩小</el-button>
        -->
      </div>

    <transition name="el-fade-in-linear">
    <div class="new-tool-box2" v-show="tool_box">
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
              
              <Badge v-show="jksign==1" :count="yjcount" overflow-count="999" style="margin-top:3px;margin-left:3px;">
                <a href="javascript:void(0)" class="demo-badge" @click="showXianyu"><Icon type="md-pulse" size="28"/><br/>情势</a>
            </Badge> 
            <Badge v-show="jksign==2" :count="safecount" overflow-count="999" style="margin-top:3px;margin-left:3px;">
                <a href="javascript:void(0)" class="safe-badge" @click="showXianyu"><Icon type="md-pulse" size="28"/><br/>情势</a>
            </Badge>             
        </div>
      </div>
      <!-- 标注 -->
      <div style="border-bottom: 1px solid rgb(242,242,242);padding:5px;display:block;">
        <div class="box-h">
          <span style="position: absolute;">标注</span>
        </div>
        <div v-show="jksign==1" style="display: flex;flex-wrap:wrap;overflow: hidden;height:46px;">
          <CheckboxGroup
              @on-change="checkboxGroup_onChange"
              v-model="testform.social"
              class="checkBox-group"
          >
          <Checkbox
              v-for="item in testform.checkBoxList"
              :label="item.value"
              :size="item.size"
              class="checkBoxItem"
          >
          <span>{{ item.title }}</span>
          </Checkbox>
         </CheckboxGroup>
        </div>
        <div v-show="jksign==2" style="display: flex;flex-wrap:wrap;overflow: hidden;height:46px;">
          <CheckboxGroup
              @on-change="checkboxGroupsafe_onChange"
              v-model="testform.socialsafe"
              class="checkBox-group"
          >
          <Checkbox
              v-for="item in testform.checkBoxsafeList"
              :label="item.value"
              :size="item.size"
              class="checkBoxItem"
          >
          <span>{{ item.title }}</span>
          </Checkbox>
         </CheckboxGroup>
        </div>
      </div>
      <!-- 区域定位 -->
      <div style="border-bottom: 1px solid rgb(242,242,242);padding:5px 0px 5px 0px;">
        <div class="box-h">
          <span style="position: absolute;">区域定位(存在小型水库的行政区划)</span>
          <el-button style="position: absolute;right: 10px;" size="mini" round @click="qydw">{{!areashow?'展开':'收起'}}</el-button>
        </div>
          <el-row type="flex" justify>
          <div v-show="areashow" style="width:50%;height:245px;border:1px solid #E4E7ED; border-radius: 5px 0px 0px 5px;">
            <el-scrollbar style="height:100%;" wrap-style="overflow-x:hidden;" ref="myScrollbar">
              <table class="areatable" cellspacing="0">              
                <tr v-for="(item, index) in area_list">
                  <td class="letter" align="center"><h v-show="item.showa" :id="item.FIRST+'letter'">{{ item.FIRST }}</h></td>
                  <td class="areaname" :id="index+'name'" @click="area_switch(item,index)"><span style="float:left;">{{ item.AD_NM }}</span><span style="float:right;"><i class="el-icon-arrow-right"></i></span></td>
                  <td></td>
                </tr>
              </table>
            </el-scrollbar>
          </div>
          <div v-show="areashow" style="width:50%;height:245px;border-right:1px solid #E4E7ED;border-top:1px solid #E4E7ED;border-bottom:1px solid #E4E7ED; border-radius: 0px 5px 5px 0px;">
              <el-scrollbar style="height:100%;" wrap-style="overflow-x:hidden;" ref="myScrollbar">
              <table class="areatable" cellspacing="0">              
                <tr v-for="(item, index) in country_list">
                  <td class="letter" align="center"><h v-show="item.showa">{{ item.FIRST }}</h></td>
                  <td class="areaname" :id="item.SORT+index"  @click="country_switch(item,index)"><span style="float:left;">{{ item.AD_NM }}</span></td>
                  <td></td>
                </tr>
              </table>
            </el-scrollbar>
          </div>
          </el-row>
      </div>
      <!-- 基础 -->
      <div style="border-bottom: 1px solid rgb(242,242,242);padding:5px;">
        <div class="box-h">
          <span style="position: absolute;">图例</span>         
        </div>
        <div v-show="jksign==1" style="display: flex;flex-wrap:wrap;font-size:14px;">
          <img src="/static/demo-hunanguanqu/red.png" style="margin-right:5px;width:16px;height:16px;">
          <span style="padding:1px;">水位预警</span>
          <img src="/static/demo-hunanguanqu/yellow.png" style="margin-right:5px;margin-left:5px;width:16px;height:16px;">
          <span style="padding:1px;">降雨预警</span>
          <img src="/static/demo-hunanguanqu/purple.png" style="margin-right:5px;margin-left:5px;width:16px;height:16px;">
          <span style="padding:1px;">设备运行异常</span>
        </div>
        <div v-show="jksign==2" style="display: flex;flex-wrap:wrap;font-size:14px;">
          <img src="/static/demo-hunanguanqu/blue.png" style="margin-right:5px;width:16px;height:16px;">
          <span style="padding:1px;">大坝安全预警</span>
        </div>
      </div>
    </div>
    </transition>

      <!-- 列表窗 -->
      <div id="listWindow" :class="['listWindow',{'listWindow_on': listWindow.show_Controller}]">
        <!-- 开关按钮 -->
        <div class="switch" @click="listWindow_toggle">
          <i class="el-icon-d-arrow-left" v-if="!listWindow.show_Controller"></i>
          <i class="el-icon-d-arrow-right" v-if="listWindow.show_Controller"></i>
        </div>
        <!-- 主体 -->
        <div class="wrapper">
          <el-checkbox v-model="testform.checked" style="position: absolute;right:10px;top:25px;z-index:100;" @change="showShipin"><img src="/static/demo-hunanguanqu/8.png" style="width:16px;height:16px;display:inline;"/>视频监控</el-checkbox>
          <!-- 标签栏与内容 -->
          <Collapse active-key="1">
            <Panel key="1">
                查询  
                <div slot="content">
                    <div class="form">
                        <!-- 选择器, 按钮 -->
                        <Row class="select-group" :gutter="24">
                            <Col span="12">
                                <!-- 地址级联选择器 -->
                                <el-cascader
                                  :props="{ multiple: true }"
                                  clearable
                                  filterable
                                  collapse-tags
                                  size="mini"
                                  placeholder="地址"
                                  :options="testform.adressList"
                                  v-model="testform.model_adress"
                                  @change="search"
                                  change-on-select
                                ></el-cascader>
                            </Col>
                              <Col span="12">
                                <!-- 归属单位选择器 -->
                                <el-select
                                  v-model="testform.model_guishu"
                                  multiple
                                  collapse-tags
                                  clearable
                                  size="mini"
                                  @change="search"
                                  placeholder="归属单位"
                                >
                                  <el-option
                                    v-for="item in testform.guishuList"
                                    :key="item.Field"
                                    :label="item.FieldName"
                                    :value="item.Field"
                                  ></el-option>
                                </el-select>
                            </Col>
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <Row class="select-group" :gutter="24">
                          <Col span="12">
                          <!-- 水库等级选择器 -->
                          <el-select
                            v-model="testform.model_dengji"
                            multiple
                            collapse-tags
                            clearable
                            size="mini"
                            @change="search"
                            placeholder="水库等级"
                          >
                            <el-option
                              v-for="item in testform.dengjiList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </Col>
                        <Col span="12">
                          <!-- 状态类型选择器 -->
                          <el-select
                            @change="search"
                            clearable
                            filterable
                            class="select-item"
                            size="mini"
                            v-model="testform.model_status"
                            popper-append-to-body
                            placeholder="状态"
                          >
                            <el-option
                              v-for="item in testform.statusList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </Col>
                        </Row>
                        <Row class="select-group" :gutter="16">
                            <Col span="18">
                                <Input
                                        search
                                        enter-button
                                        @on-search="search"
                                        placeholder="请输入要搜索的站名"
                                        size="small"
                                        v-model="testform.search_str"
                                >
                                </Input>
                            </Col>
                            <Col span="6">
                            <Button type="info" size="small" @click="showyqinfo">
                              <span>更多雨情查询</span>
                            </Button>
                            </Col>
                        </Row>
                        <div v-show="testform.yuqinginfo" style="margin-top:3px;">
                          <!-- 分割线 
                        <div class="divider"></div>
                        -->
                        <Row class="select-group"  type="flex" justify>
                            <Col>
                                开始时间：
                                <el-date-picker
                                        style="width: 140px;!important;"
                                        v-model="testform.model_date[0]"
                                        type="datetime"
                                        size="mini"
                                        @change="search('yq')"
                                        format="yyyy-MM-dd HH"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                               <span style="margin-left: 5px;"> 结束时间：</span>
                                <el-date-picker
                                        style="width: 140px "
                                        v-model="testform.model_date[1]"
                                        type="datetime"
                                        size="mini"
                                        @change="search('yq')"
                                        format="yyyy-MM-dd HH"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </Col>
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <Row :gutter="16" type="flex" justify="left" align="middle">
                            <span style="letter-spacing:5px;margin-left: 15px;">雨量：</span>
                            <el-radio-group v-model="radio4" size="mini" fill="#B0C3D7" @change="search('yq')">
                                <el-radio-button label="全部"><font style="color:rgb(207,204,207);">全部</font></el-radio-button>
                                <el-radio-button label="0"><font style="color:rgb(41,196,1);">0</font></el-radio-button>
                                <el-radio-button label="10"><font style="color:rgb(16,135,56);">10</font></el-radio-button>
                                <el-radio-button label="25"><font style="color:rgb(90,179,255);">25</font></el-radio-button>
                                <el-radio-button label="50"><font style="color:rgb(1,113,223);">50</font></el-radio-button>
                                <el-radio-button label="100"><font style="color:rgb(255,132,1);">100</font></el-radio-button>
                                <el-radio-button label="250"><font style="color:rgb(255,2,2);">250</font></el-radio-button>
                            </el-radio-group>
                        </Row>
                        </div>
                    </div>
                </div>
            </Panel>
        </Collapse>
          <div>
            <el-tabs type="card" :tabPosition="listWindow_tabPosition(listWindow.mode)" @tab-click="handleTabClick" v-model="listWindow.activeName">
                <el-tab-pane label="水库水情" name="shuikushuiqing" v-if="featrueLayers_showing().length > 0">
                  <!-- 水库水情 -->
                  <BaseBoxSHUIKUSHUIQING ref="sqtable" :featrue="zuobiaoxi(SiteFeatrueLayer)"></BaseBoxSHUIKUSHUIQING>
                </el-tab-pane>
                <el-tab-pane label="雨情" name="yuqing" v-if="featrueLayers_showing().length > 0">
                  <!-- 雨量站 -->
                  <BaseBoxYUQING ref="yqtable" :featrue="zuobiaoxi(SiteFeatrueLayer)"></BaseBoxYUQING>
                </el-tab-pane>
                <el-tab-pane label="运行工况" name="yunxinggongkuang" v-if="featrueLayers_showing().length > 0">
                  <!-- 运行工况 -->
                  <BaseBoxYUNXINGGONGKUANG ref="gktable" :featrue="zuobiaoxi(SiteFeatrueLayer)"></BaseBoxYUNXINGGONGKUANG>
                </el-tab-pane>
                <el-tab-pane label="实时雨情" name="shishiyq" v-if="featrueLayers_showing().length > 0">
                  <BaseBoxSHISHIYQ ref="ssyqtable" :featrue="zuobiaoxi(SiteFeatrueLayer)"></BaseBoxSHISHIYQ>
                </el-tab-pane>
                <el-tab-pane label="视频" name="shipin" v-if="featrueLayers_showing().length > 0 && testform.checked">
                  <BaseBoxSHIPINZHAN ref="sptable" :featrue="zuobiaoxi(SiteFeatrueLayer)"></BaseBoxSHIPINZHAN>
                </el-tab-pane>
                <!--渗流量 -->
                <el-tab-pane label="渗流量" name="shenliuliang" v-if="featrueLayers_safeshowing().length>0">
                  <BaseBoxSHENLIULIANG ref="slltable" :featrue="zuobiaoxi(safeFeatrueLayer)"></BaseBoxSHENLIULIANG>
                </el-tab-pane>
                <!--渗压水位 -->
                <el-tab-pane label="渗流压力" name="shenliuyali" v-if="featrueLayers_safeshowing().length>0">
                  <BaseBoxSHENLIUYALI ref="slyltable" :featrue="zuobiaoxi(safeFeatrueLayer)"></BaseBoxSHENLIUYALI>
                </el-tab-pane>
                <!--位移变形 -->
                <el-tab-pane label="位移变形" name="weiyibianxing" v-if="featrueLayers_safeshowing().length>0">
                  <BaseBoxWEIYIBIANXING ref="wybxtable" :featrue="zuobiaoxi(safeFeatrueLayer)"></BaseBoxWEIYIBIANXING>
                </el-tab-pane>
                <!--沉降变形 -->
                <el-tab-pane label="沉降变形" name="chenjiangbianxing" v-if="featrueLayers_safeshowing().length>0">
                  <BaseBoxCHENJIANGBIANXING ref="cjbxtable" :featrue="zuobiaoxi(safeFeatrueLayer)"></BaseBoxCHENJIANGBIANXING>
                </el-tab-pane>
            </el-tabs>
          </div>
          <!-- 图层没有时的提示信息 -->
          <div class="tip" v-if="featrueLayers_showing().length == 0 && featrueLayers_safeshowing().length==0">暂无任何显示图层</div>
        </div>
        <!-- 模式按钮 -->
        <div class="mode" v-show="listWindow.show_Controller && (featrueLayers_showing().length != 0 || featrueLayers_safeshowing().length!=0)" @click="listWindow_changeMode">
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
        <!-- 雨情 -->
        <DetailYUQING :info="details.info_right" v-if="details.info_right.itype=='yuqing'"></DetailYUQING>
        <!--水雨视频站点信息-->
        <DetailSiteSHUIQING :info="details.info_left" v-if="details.info_left.itype=='siteinfo1'"></DetailSiteSHUIQING>
        <!-- 水库水情 -->
        <DetailSHUIKUSHUIQING :info="details.info_right" v-if="details.info_right.itype=='siteinfo'"></DetailSHUIKUSHUIQING>
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
        <!-- 雨情 -->
        <DetailYUQING :info="details.info_left" v-if="details.info_left.itype=='yuqing'"></DetailYUQING>
        <!--水雨视频站点信息-->
        <DetailSiteSHUIQING :info="details.info_left" v-if="details.info_left.itype=='siteinfo1'"></DetailSiteSHUIQING>
        <!-- 水库水情 -->
        <DetailSHUIKUSHUIQING :info="details.info_left" v-if="details.info_left.itype=='siteinfo'"></DetailSHUIKUSHUIQING>
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
      </div>

      <div
        v-else
        id="Message_Window_Controller"
        @click="Message_Window_show(true)"
        key="Controller"
      >
        <el-badge :value="Message_Window.notify_info.list.length">
          <div class="text">消息</div>
        </el-badge>
      </div>
    </transition>
    
    <el-dialog
    :title="raincharttitle"
    :visible.sync="centerDialogVisible"
    width="520"
    @open="openDialog()"
    append-to-body center>
    <span>
    <div id="warmrainchart" style="width: 100%;height: 430px;"></div>
    </span>
  </el-dialog>
  <el-dialog
    title="全县站点预警情势分析"
    :visible.sync="yjsiteVisible"
    width="650"
    @close="closeYjDialog()"
    append-to-body center
  >
  <SitesSHISHIYUJING v-show="yjsiteVisible"></SitesSHISHIYUJING>
  </el-dialog>
  </div>
</template>


    <script>
import("./assets/shp.min.js");
import { loadModules } from "esri-loader";
// 引入Vue
import Vue from "vue";

// 引入页面
import Table from "./page/Table";
// 雨情
import BaseBoxYUQING from "@/components/NewBox/BaseBox-yuqing.vue";
import DetailYUQING from "@/components/Details/Details-yuqing.vue";
//实时雨情
import BaseBoxSHISHIYQ from "@/components/NewBox/BaseBox-shishiyq.vue";
//视频
import BaseBoxSHIPINZHAN from "@/components/NewBox/BaseBox-shipinzhan.vue";
// 水库水情
import BaseBoxSHUIKUSHUIQING from "@/components/NewBox/BaseBox-shuikushuiqing.vue";
import DetailSHUIKUSHUIQING from "@/components/Details/Details-siteinfo.vue";
//水雨站点信息
import DetailSiteSHUIQING from "@/components/Details/Details-shuikushuiqing.vue";
// 视频站
import DetailSHIPINZHAN from "@/components/Details/Details-shipinzhan.vue";
// 图像站
import DetailTUXIANGZHAN from "@/components/Details/Details-tuxiangzhan.vue";
// 运行工况
import BaseBoxYUNXINGGONGKUANG from "@/components/NewBox/BaseBox-yunxinggongkuang.vue";
import DetailYUNXINGGONGKUANG from "@/components/Details/Details-yunxinggongkuang.vue";
import { debuglog } from "util";
// 水位库容
import DetailSHUIWEIKURONG from "@/components/Details/Details-shuiweikurong.vue";
//情势分析
import SitesSHISHIYUJING from "@/components/NewBox/Sites-shishiyj.vue";
//渗流量信息
import BaseBoxSHENLIULIANG from "@/components/NewBox/BaseBox-shenliuliang.vue";
//渗流压力信息
import BaseBoxSHENLIUYALI from "@/components/NewBox/BaseBox-shenliuyali.vue";
//位移变形信息
import BaseBoxWEIYIBIANXING from "@/components/NewBox/BaseBox-weiyibianxing.vue";
//沉降变形信息
import BaseBoxCHENJIANGBIANXING from "@/components/NewBox/BaseBox-chenjiangbianxing.vue";

// 引入公用方法
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import { parse } from "path";
import { constants } from "crypto";
import $ from 'jquery'
import { debug } from 'console';
import About from './views/About.vue';


const options = { version: "3.28" };

export default {
  data() {
    return {
      //三维仿真
      mapBox3D:0,
      //ditu.json 加载到的各个图层
      //koen 20190911
      tu_ceng_list:[],
      area_list:[],
      lastclass:null,
      lastcounrty:null,
      //首字母列表
      letter_list:[],
      areaitem:null,
      countryitem:null,
      country_list:[],
      areashow:false,
      countryshow:false,
      centerDialogVisible:false,
      yjsiteVisible:false,
      yjcount:0,
      safecount:0,
      raincharttitle:'',
      //监控类型
      jksign:1,
      //当前中心点
      zhong_xin_dian:null,

      //地图类型
      ditu_type: 'topo',
      // 文字标注图层
      TextGraphicsLayers: [],


      listWindow_show_Controller: false,
      // 列表窗口对象
      listWindow: {
        // 列表窗显示控制器
        show_Controller: false,
        // 列表窗形态切换
        mode: 0,
        activeName: "shuikushuiqing",
        lastActive:'',
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
      //正在开发图层对象
      SiteFeatrueLayer:{itype:'siteinfo',icon:'/static/demo-hunanguanqu/2.png',show:0,swwarmicon:'/static/demo-hunanguanqu/1-alert.png',ylwarmicon:'/static/demo-hunanguanqu/1-alert-new.png',sbwarmicon:'/static/demo-hunanguanqu/9-alert-xin.png',checknum:0},
      //视频图层
      shipinfeatureLayer:{itype:'shipin',icon:'/static/demo-hunanguanqu/8.png',show:0,lastshow:0},
      //大坝安全图层
      safeFeatrueLayer:{itype:'safeinfo',icon:'/static/demo-hunanguanqu/10.png',warmicon:'/static/demo-hunanguanqu/10-alert.png',show:0},
      fList: [],
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
      radio4:"全部",
      // 表单数据
      testform: {
          yuliang: '',
          YCJXZ: '50',
          singular: '50',
          search_str: "",
          adressList: [],
          qudaoList: [],
          guishuList: [],
          model_adress: null,
          model_qudao: null,
          model_guishu: "",
          model_date: [],
          model_dengji: [],
          dengjiList:[{label:'小I型水库',value:3},{label:'小II型水库',value:4}],
          model_status:"",
          yuqinginfo:false,
          checked:false,
          // 状态选择列表
          statusList: [
            {
              value: 1,
              label: "正常"
            },
            {
              value: 2,
              label: "异常"
            },
            {
              value: 3,
              label: "电压异常"
            },
            {
              value: 4,
              label: "通讯异常"
            }
          ],
          social: ["site"],
          socialsafe: ["site"],

          checkBoxList: [
              {
                  value: "site",
                  size: "small",
                  title: "站点"
              },
              
              {
                  value: "RZ",
                  size: "small",
                  title: "水位"
              },
              {
                  value: "w",
                  size: "small",
                  title: "库容"
              },
              {
                  value: "MJ",
                  size: "small",
                  title: "水面面积"
              },
              
              {
                  value: "STNM",
                  size: "small",
                  title: "站名"
              },
              {
                  value: "p",
                  size: "small",
                  title: "雨量"
              },
              {
                  value: "vol",
                  size: "small",
                  span: 6,
                  title: "电压"
              },
              {
                  value: "CS",
                  size: "small",
                  span: 7,
                  title: "通讯状态"
              },
          ],
           checkBoxsafeList: [
              {
                  value: "site",
                  size: "small",
                  title: "站点"
              },
              
              {
                  value: "spprwl",
                  size: "small",
                  title: "渗流量  "
              },
              {
                  value: "hrds",
                  size: "small",
                  title: "位移变形"
              },             
              {
                  value: "STNM",
                  size: "small",
                  title: "站名"
              },
              {
                  value: "spprwm",
                  size: "small",
                  title: "渗压水位"
              },
              {
                  value: "vrds",
                  size: "small",
                  span: 6,
                  title: "沉降变形"
              },
          ],
      },
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
    BaseBoxYUQING, DetailYUQING,// 雨情
    BaseBoxSHISHIYQ,//实时雨情
    BaseBoxSHIPINZHAN,//视频
    BaseBoxSHUIKUSHUIQING, DetailSHUIKUSHUIQING,// 水库水情
    DetailSHIPINZHAN,// 视频站
    DetailTUXIANGZHAN,// 图像站
    BaseBoxYUNXINGGONGKUANG, DetailYUNXINGGONGKUANG,// 运行工况
    DetailSHUIWEIKURONG,// 水位库容
    SitesSHISHIYUJING,//情势分析
    DetailSiteSHUIQING,//水雨站点信息
    BaseBoxSHENLIULIANG,//渗流量
    BaseBoxSHENLIUYALI,//渗流压力
    BaseBoxWEIYIBIANXING,//位移变形
    BaseBoxCHENJIANGBIANXING,//沉降变形
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
         //this.getAll();


        this.add_GraphicsLayer_Selection_ToMap();
        
        
      })
      .catch(err => {
        console.error(err);
      });
    Vue.prototype.$App = this;
    //设置默认时间
    this.testform.model_date = this.getinittime();
    // 获取行政区划数据,然后设置地址选择框选项
    this.getTableData_WRP_AD_B(data => {
        this.testform.adressList = data[0].children;
        this.testform.model_adress=true;
    });
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
    //获取默认时间
            getinittime() {
                var date = new Date();
                var YR = date.getFullYear();
                var MON = date.getMonth() + 1
                var datearray = new Array();
                if (parseInt(MON) < 10) {
                    MON = `0${MON}`;
                }
                var Day = date.getDate();
                if (parseInt(Day) < 10) {
                    Day = `0${Day}`;
                }
                var Hour = date.getHours();
                if (parseInt(Hour) < 10) {
                    Hour = `0${Hour}`;
                }
                if (date.getHours() < 8) {
                    //昨天的时间
                    var day1 = new Date();
                    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
                    day1.setHours(8);
                    day1.setMinutes(0);
                    day1.setSeconds(0);
                    var Hour2 = day1.getHours();
                    var MON2 = day1.getMonth() + 1;
                    var DAY2 = day1.getDate();
                    if (parseInt(Hour2) < 10) {
                        Hour2 = `0${Hour2}`;
                    }
                    if (parseInt(MON2) < 10) {
                        MON2 = `0${MON2}`;
                    }
                    if (parseInt(DAY2) < 10) {
                        DAY2 = `0${DAY2}`;
                    }
                    var s1 = `${day1.getFullYear()}-${MON2}-${DAY2} ${Hour2}:00:00`
                    datearray[0] = s1;
                    datearray[1] = `${YR}-${MON}-${Day} ${date.getHours()}:00:00`;
                    console.log('time1', s1, 'time2', datearray[1]);
                } else {
                    datearray[0] = `${YR}-${MON}-${Day} 08:00:00`;
                    datearray[1] = `${YR}-${MON}-${Day} ${Hour}:00:00`;
                }
                return datearray;
            },
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
    //区域定位
    qydw(){
      this.areashow=!this.areashow;
    },
    //放大地图按钮
    fangda(){ 
      $(".esriSimpleSliderIncrementButton").click();
    },
    //缩小地图按钮
    suoxiao(){
      $(".esriSimpleSliderDecrementButton").click();
    },
    showyqinfo(){
      this.testform.yuqinginfo=!this.testform.yuqinginfo;
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
    //乡镇定位
    area_switch(item,index){
      var id=index+"name";
      if(this.lastclass!=null){
        document.getElementById(this.lastclass).classList.remove("areaselect");
      }
      this.lastclass=id;
      document.getElementById(id).classList.add("areaselect");
      if(this.lastcounrty!=null){
        document.getElementById(this.lastcounrty).classList.remove("areaselect");
        this.lastcounrty=null;
      }
      item.show=true;
      if(this.areaitem!=null){
        this.areaitem.show=false;
      }
      this.areaitem=item;
      this.country_list=item.children;
    },
    //村/社区定位
    country_switch(item,index){
      var id=item.SORT+index;
      if(this.lastcounrty!=null){
        document.getElementById(this.lastcounrty).classList.remove("areaselect");
      }
      this.lastcounrty=id;
      document.getElementById(id).classList.add("areaselect");
      item.show=true;
      if(this.countryitem!=null){
        this.countryitem.show=false;
      }
      this.countryitem=item;                                                                    
    },
    //koen 20190930
    //转换坐标系
    zuobiaoxi(item) {
      console.log('处理坐标');
      console.log(item);

      // item.Rows.forEach((one, index) => {
      //   //获取坐标
      //   var x=Number(one.geometry.x);
      //   var y=Number(one.geometry.y);

      //   //如果basemap使用ArcGIS的就需要
      //   //转换坐标系
      //   x = (x / 180.0) * 20037508.34
      //   if (y > 85.05112) y = 85.05112;
      //   if (y < -85.05112) y = -85.05112;
      //   y = (Math.PI / 180.0) * y;
      //   var tmp = Math.PI / 4.0 + y / 2.0;
      //   y = 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;

      //   item.Rows[index].attributes.LGTD = x;
      //   item.Rows[index].attributes.LTTD = y;
      //   item.Rows[index].geometry.x = x;
      //   item.Rows[index].geometry.y = y;
      // });


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
      debugger;
      this.axios.get("/static/demo-hunanguanqu/ditu.json").then(res => {
        debugger;
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
            if(val.name=="界限"){
               val.name="乡镇";
            }
            if(val.name=="界限2"){
               val.name="村";
            }
            if(val.name=="渠道"){
               val.name="河流";
            }
            if(val.name=="渠道名称"){
               val.name="水系";
            }
            if(val.name=="水库"){
               val.name="界限";
            }
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
    //获取图层信息
    getMapFeatureLayers(){
      this.getFeatrueLayerByFirst(res => {
        var data = res.data;
        var clone_data = JSON.parse(JSON.stringify(data));
          // 创建图层（根据图层数据）
          var featureLayer = this.createFeatrueLayer(data);
          var spfeatureLayer=this.createFeatrueLayer(data);
          // 获取异常数据 
          var wateryujingData = this.getAbnormalDataByType(data,1);
          var rainyujingData = this.getAbnormalDataByType(data,2);
          var equipmentyujingData = this.getAbnormalDataByType(data,3);
          this.yjcount=this.getYjTongjiCount(data);
          // 创建预警图层（根据图层异常数据）
          var water_yujing = this.createFeatrueLayer(wateryujingData);
          var rainyjData=this.getWarmDataByRainAndSb(rainyujingData,2);
          var rain_yujing = this.createFeatrueLayer(rainyjData);
          var equipmentyjData=this.getWarmDataByRainAndSb(equipmentyujingData,3);
          var equipment_yujing = this.createFeatrueLayer(equipmentyjData);

          //设置图层的特征点图标
          this.setFeatrueLayerSymbol(featureLayer, this.SiteFeatrueLayer.icon, { width: 16, height: 16});
          this.setFeatrueLayerSymbol(spfeatureLayer, this.shipinfeatureLayer.icon, { width: 16, height: 16});

          // 设置预警图层的特征点图标
          this.setFeatrueLayerSymbol( water_yujing, "/static/demo-hunanguanqu/yujing.gif", { width: 46, height: 46 } );
          this.setFeatrueLayerSymbol( rain_yujing, "/static/demo-hunanguanqu/jyyujing.gif", { width: 46, height: 46 } );
          this.setFeatrueLayerSymbol( equipment_yujing, "/static/demo-hunanguanqu/sbyujing.gif", { width: 46, height: 46 } );

          //视频监控图层默认隐藏
          spfeatureLayer.hide();
          this.SiteFeatrueLayer.show=1;
          var checknum=Math.random();
          //运行工况提示预警信息
          if (equipmentyujingData.features.length > 0) {
            this.notify_Layer(
              {
                icon: this.SiteFeatrueLayer.sbwarmicon,
                type: "warning",
                sign:"sb",
                checkindex:checknum
              },
              equipmentyujingData.features
            );
          }
          //雨量提示预警信息
          if (rainyujingData.features.length > 0) {
            this.notify_Layer(
              {
                icon: this.SiteFeatrueLayer.ylwarmicon,
                type: "warning",
                sign:"yl",
                checkindex:checknum
              },
              rainyujingData.features
            );
          }
          //水位提示预警信息
          if (wateryujingData.features.length > 0) {
            this.notify_Layer(
              {
                icon: this.SiteFeatrueLayer.swwarmicon,
                type: "warning",
                sign: "sw",
                checkindex:checknum
              },
              wateryujingData.features
            );
          }
          
          // 给图层对象添加 图层，图层特征点数据，地图
          this.SiteFeatrueLayer.LayerObject = featureLayer; // 添加图层到图层对象
          this.SiteFeatrueLayer.LayerObject_yujing = [water_yujing,rain_yujing,equipment_yujing]; // 添加图层到图层对象
          this.SiteFeatrueLayer.Rows = clone_data.features; // 添加图层特征点数据到图层对象
          this.SiteFeatrueLayer.map = this.map; // 添加地图到图层对象

          this.shipinfeatureLayer.LayerObject=spfeatureLayer;
          this.shipinfeatureLayer.Rows = clone_data.features; 
          this.shipinfeatureLayer.map = this.map;

          //添加图层模块
          this.addToFeatrueLayer(
            [equipment_yujing,rain_yujing,water_yujing, featureLayer,spfeatureLayer]
          );
          
          //给图层里的特征点 添加点击事件
          this.addEventToJsonFlayer(featureLayer,this.SiteFeatrueLayer);
          this.addEventToJsonFlayer(spfeatureLayer,this.shipinfeatureLayer);

          //添加悬浮事件
          this.addEventToFloatFlayer(featureLayer);
          this.addShipiEventToFloatFlayer(spfeatureLayer);
      });
    },
    //获取图层数据（没有过滤条件的）
    getFeatrueLayerByFirst(callback) {
      var body = {
        // _filter: new Object()
      };
      if (this.testform.model_date && this.testform.model_date.length != 0) {
                    body[
                        "Time_min"
                        ] = this.testform.model_date[0];
                    body[
                        "Time_max"
                        ] = this.testform.model_date[1];
                }
      var url="/guanqu/sksiteinfo/gis";
      this.axios.post(url, body).then(res => {
        if (typeof errCallback == "function") {
          errCallback();
        }
        if (typeof callback == "function") {
          callback(res);
        }
      });
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
            featureLayerOBJ.itype === "shuikushuiqing" ||
            featureLayerOBJ.itype === "yuqing" ||
            featureLayerOBJ.itype === "yunxinggongkuang"
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
    //根据水库名称定位
    locationByName(){
      if(this.search_str!=""){
       var Rows = this.SiteFeatrueLayer.Rows;
            //创建textsymbol文本标注
            if (Rows.length > 0) {
                //动态读取json数据源结果集
                for (var i = 0; i < Rows.length; i++) {
                    var Row = Rows[i];
                    var name=Row.attributes.STNM;
                    console.log(name.indexOf(this.search_str)+","+name+","+this.search_str);
                    if(name.indexOf(this.search_str)>-1){
                        //获取坐标
                        var x=Number(Row.geometry.x);
                        var y=Number(Row.geometry.y);
                        var point = new esri.geometry.Point(
                            x,
                            y,
                            new esri.SpatialReference({ wkid: 4326 })
                        );
                        this.map.centerAndZoom(point,12);
                        break;
                    }
                    
                }
            }
      }
    },
    // 获取系统信息
    getAll() {
      debugger;
      // /static/demo-hunanguanqu/system.json
      this.axios.get("/guanqu/gis/system_info").then(res => {
        debugger;
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
        });
        // 获取各个图层信息
        //this.getEachFeatureLayers(data.FeatureLayers);
        //获取图层信息
        this.getMapFeatureLayers();
        //获取区域定位行政区划信息
        var Area_Info=data.WRP_AD_B;
        Area_Info.forEach((val, index) => {
            if(val.AD_LV==5){
              var areaobj={AD_CD:val.AD_CD,AD_NM:val.AD_NM,AD_LV:val.AD_LV,SORT:val.AD_SHNM,FIRST:val.AD_SHNM.charAt(0),children:[],show:false};
              this.area_list.push(areaobj);
            }
            if(val.AD_LV==6){
              var countrywidth=val.AD_NM.length*12;
              var countryobj={AD_CD:val.AD_CD,AD_NM:val.AD_NM,AD_LV:val.AD_LV,UP_ADCD:val.UP_ADCD,SORT:val.AD_SHNM,FIRST:val.AD_SHNM.charAt(0),show:false,width:countrywidth};
              var parent=this.area_list[this.area_list.length-1];
              parent.children.push(countryobj);
            }
          });
          for(var s=0;s<this.area_list.length;s++){
            var sublist=this.area_list[s].children;
            for(var i=0;i<sublist.length-1;i++){
                for(var j=0;j<sublist.length-1-i;j++){
                    if(sublist[j].SORT>sublist[j+1].SORT){
                       var b=sublist[j];
                        sublist[j]=sublist[j+1];
                        sublist[j+1]=b;
                    }
                }
             }
          }
          for(var s=0;s<this.area_list.length;s++){
            var sublist=this.area_list[s].children;
            this.area_list[s].children[0].showa=true;
            for(var i=1;i<sublist.length;i++){
              var fobj=sublist[i-1];
              var curobj=sublist[i];
              if(fobj.FIRST==curobj.FIRST){
                curobj.showa=false;
              }else{
                curobj.showa=true;
              }
            }
          }
          for(var i=0;i<this.area_list.length-1;i++){
                for(var j=0;j<this.area_list.length-1-i;j++){
                    if(this.area_list[j].SORT>this.area_list[j+1].SORT){
                       var b=this.area_list[j];
                        this.area_list[j]=this.area_list[j+1];
                        this.area_list[j+1]=b;
                    }
                }
             }
             var number=1;
             this.letter_list.push({value:this.area_list[0].FIRST,num:number});
             this.area_list[0].showa=true;
            for(var i=1;i<this.area_list.length;i++){
              var letter=this.area_list[i].FIRST;
              var lobj=this.letter_list[this.letter_list.length-1];
              if(letter==lobj.value){
                number+=1;
                this.area_list[i].showa=false;
              }else{
                lobj.num=number;
                number=1;
                this.area_list[i].showa=true;
                this.letter_list.push({value:letter,num:number});
              }
              if(i==this.area_list.length-1){
                if(number>1){
                  lobj.num=number;
                }
              }
            }
            console.log(this.area_list);
        this.getTableData_WPR_FieldInfo({
                    FieldID: "STGR"
                }, data => {
                    this.testform.guishuList = data.reverse();
                });
      });
    },
    // 多选框标记勾选触发事件(大坝安全)
    checkboxGroupsafe_onChange(onCheck_Array) {

    },
    // 多选框标记勾选触发事件(水雨情)
    checkboxGroup_onChange(onCheck_Array) {
        this.removeAllTextGraphicsLayer(); // 清除所有文本标注图层
        this.addTextGraphicsLayerByCheckGroup(); // 根据多选框添加文字标注图层
    },
    // 移除所有文字标注图层
    removeAllTextGraphicsLayer() {
        for (let i = 0; i < this.TextGraphicsLayers.length; i++) {
            var val = this.TextGraphicsLayers[i];
            this.map.removeLayer(val); // 移除对应的文字标注图层
        }
        this.TextGraphicsLayers = [];
    },
    // 根据多选框添加文字标注图层
    addTextGraphicsLayerByCheckGroup() {
        var textTypeList;
        var indexOfSocial = this.testform.social.indexOf("site");
        // 如果多选框里存在 site站点类型
        if (indexOfSocial !== -1) {
          this.SiteFeatrueLayer.LayerObject.show();
          if(this.radio4!="全部"){
            var tclist = this.SiteFeatrueLayer.LayerObject_yujing;
            for(var i=0;i<tclist.length;i++){
              tclist[i].hide();
            }
          }else{           
            var tclist = this.SiteFeatrueLayer.LayerObject_yujing;
            for(var i=0;i<tclist.length;i++){
              tclist[i].show();
            }           
          }
          textTypeList = this.testform.social.filter(val => {
                if (val != "site" && val !="MJ") {
                    return true;
                }
            });   
        } else {
            this.SiteFeatrueLayer.LayerObject.hide();
            var tclist = this.SiteFeatrueLayer.LayerObject_yujing;
            for(var i=0;i<tclist.length;i++){
              tclist[i].hide();
            }
            textTypeList = this.testform.social;
        }
        textTypeList.forEach((textType, index) => {
            var textGraphicsLayer = new esri.layers.GraphicsLayer(); // 新增一个图形图层
            textGraphicsLayer.textType = textType;
            this.map.addLayer(textGraphicsLayer); // 给地图添加新增的标注文本图层
            var Rows = this.SiteFeatrueLayer.Rows;
            //创建textsymbol文本标注
            if (Rows.length > 0) {            
                //动态读取json数据源结果集
                for (var i = 0; i < Rows.length; i++) {
                    var Row = Rows[i];
                    //获取坐标
                    var x=Number(Row.geometry.x);
                    var y=Number(Row.geometry.y);
                    var point = new esri.geometry.Point(
                        x,
                        y,
                        new esri.SpatialReference({ wkid: 4326 })
                    );
                    var value = Row.rowinfo[textType];
                    var color=[22, 22, 22];
                    // 过滤
                    switch (textType) {
                        case "vol":
                            var value = `${this.Z_Filter(Row.rowinfo[textType])}`;
                            if (value == "") {
                                value = "";
                            } else {
                                if (value < 12 || value > 16) {
                                    color = [255, 0 , 0];
                                  }
                                value += "V";
                            }
                            break;
                        case "cs":
                            var value = Row.rowinfo[textType];
                            if (value == "") {
                              value = "";
                            }else{
                              if(value == "异常"){
                                color = [255, 0 , 0];
                              }
                            }
                            break;
                        case "p":
                            var value = `${this.$FilterData.Float_Filter(Row.rowinfo[textType], 1)}`;
                            if (value == "") {
                                value = "";
                            } else {
                              if(this.radio4!="全部"){
                                var pval=parseFloat(Row.rowinfo[textType]);
                                if(pval>=0 && pval<10){
                                  color=[41,196,1];
                                }else if(pval>=10 && pval<25){
                                  color=[16,135,56];
                                }else if(pval>=25 && pval<50){
                                  color=[90,179,255];
                                }else if(pval>=50 && pval<100){
                                  color=[1,113,223];
                                }else if(pval>=100 && pval<250){
                                  color=[255,132,1];
                                }else{
                                  color=[255,2,2];
                                }
                              }else{
                                  if(Row.rowinfo["status"]==0){
                                    var now=this.getinittime()[0];
                                    if(typeof(this.testform.model_date)=="undefined" || this.testform.model_date[0]>=now){
                                      color = [255, 0 , 0];
                                    } 
                                  }
                              }
                                
                                value += "mm";
                            }
                            break;
                        case "RZ":
                            var value = `${this.Z_Filter(Row.rowinfo[textType])}`;
                            if (value == "") {
                              value = "";
                            } else {
                              if(Row.rowinfo["skstatus"]==0){
                                color = [255, 0 , 0];
                              }
                              value += "m";
                            }
                            break;
                            case "w":
                            var value = `${this.Z_Filter(Row.rowinfo[textType])}`;
                            if (value == "") {
                              value = "";
                            } else {
                              value += "万m³";
                            }
                            break;
                    }
                    //定义背景框
                    if(index==0){
                      var lenth=textTypeList.length;
                      var maxsize=0;
                      for(var s=0;s<textTypeList.length;s++){
                        var text=Row.rowinfo[textTypeList[s]];
                        switch (textTypeList[s]) {
                          case "vol":
                              text += "V";
                          case "p":
                              text += "mm";
                              break;
                          case "RZ":
                              text += "m";
                              break;
                          case "w":
                              text += "万m³";
                              break;
                         }
                        var textlen=this.strlen(text);                        
                        if(maxsize<textlen){
                          maxsize=textlen;
                        }
                      }
                      var picturesymbol = new esri.symbol.PictureMarkerSymbol(
                        '/static/demo-hunanguanqu/back.png',
                        (maxsize*7+5),
                        lenth*16
                      ).setOffset(0, -(19+(lenth-1)*8));
                      var bgGraphic = new esri.Graphic(point, picturesymbol);
	                    textGraphicsLayer.add(bgGraphic);
                    }
                    // var markersymbol=new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 16,
                    //                   null,
                    //                   new esri.Color([255,255,255,1]));
                    // markersymbol.setOffset(0, -(20 + index * 15));
                    // var bgGraphic = new esri.Graphic(point, markersymbol);
	                  // textGraphicsLayer.add(bgGraphic);
                    //定义文本symbol
                    var textsymbol = new esri.symbol.TextSymbol(value) //动态设置文本值
                        .setColor(new dojo.Color(color)) //setColor设置文本颜色
                        .setFont(
                            new esri.symbol.Font("10pt") //setFont设置文本大小
                                .setWeight(esri.symbol.Font.WEIGHT_BOLD)
                        ) //setWeight设置文本粗体
                        .setOffset(0, -(25 + index * 15)); //设置偏移方向
                    var graphic = new esri.Graphic(point, textsymbol);
                    textGraphicsLayer.add(graphic);
                }
            }
            this.TextGraphicsLayers.push(textGraphicsLayer);
        });
    },
    strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) {
     var c = str.charCodeAt(i);
    //单字节加1
     if ((c >= 255)) {
       len+=2;
     }
     else {
    //汉字加2
      len+=1;
     }
    }
    return len;
},
    //给视频元素添加悬浮事件
    addShipiEventToFloatFlayer(JsonFlayer){
        //当鼠标悬停在元素上
        JsonFlayer.on("mouse-over", evt => {
            setTimeout(() => {
                var attributes = evt.graphic.attributes;
                attributes.eventType = "mouse-over";
                this.showShipinTips(attributes.rowinfo); // 展示悬浮框
            }, 100);
            // 给地图对象添加方法
            // this.addEventToMap();
        });

        // 当鼠标离开元素
        JsonFlayer.on("mouse-out", evt => {
            setTimeout(() => {
                this.hideTips(); // 隐藏悬浮框
            }, 100);
        });
    },
    showShipinTips(item){
        console.log('悬浮框');
      console.log(item);
      
      let imgSrc = '';
      // if(item.rowinfo.picPath !== null){
      //   imgSrc = item.rowinfo.picPath.replace('r','')
      // }
      console.log(`/guanqu/pic${imgSrc}`);
      let content = `<div>
        <div style="height: 20px"></div>
        <div class="video">
          <img src="http://222.240.238.58:7001/pic${imgSrc}"   width="210" height="160"/>
        </div>
      </div>`
          this.map.infoWindow.resize(250, 650); // 提示框大小
         this.map.infoWindow.setTitle(item.STNM); // 提示题目
         this.map.infoWindow.setContent(content); // 提示内容


                //获取坐标
                var x=Number(item.LGTD);
                var y=Number(item.LTTD);


                //如果basemap使用ArcGIS的就需要
                //转换坐标系
                x = (x / 180.0) * 20037508.34
                if (y > 85.05112) y = 85.05112;
                if (y < -85.05112) y = -85.05112;
                y = (Math.PI / 180.0) * y;
                var tmp = Math.PI / 4.0 + y / 2.0;
                y = 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;

                //位置点对象
                var zoompoint = {
                    //spatialReference: {wkid: 4326},
                    spatialReference: this.map.spatialReference,
                    x: x,
                    y: y
                };


        this.map.infoWindow.show(zoompoint); // 提示位置
    },
    //给特征元素添加悬浮事件
    addEventToFloatFlayer(JsonFlayer) {
        //当鼠标悬停在元素上
        JsonFlayer.on("mouse-over", evt => {
            setTimeout(() => {
                var attributes = evt.graphic.attributes;
                attributes.eventType = "mouse-over";
                if(this.jksign==1){
                    this.showTips(attributes.rowinfo); // 展示悬浮框 水雨情
                }else{
                    this.showSafeTips(attributes.rowinfo);// 展示悬浮框 大坝安全
                }
                
            }, 100);
            // 给地图对象添加方法
            // this.addEventToMap();
        });

        // 当鼠标离开元素
        JsonFlayer.on("mouse-out", evt => {
            setTimeout(() => {
                this.hideTips(); // 隐藏悬浮框
            }, 100);
        });
    },
    showXianyu(){
      if(this.yjcount>0){
        this.yjsiteVisible=true;
      }
    },
    closeYjDialog(){
      this.yjsiteVisible=false;
    },
    //悬浮框
    showTips(item){
      var yqtime=this.testform.model_date[0].substring(0, 13)+'－'+this.testform.model_date[1].substring(0,13);
      var yqhour=this.testform.model_date[1].substring(11,13);
      var month=new Date().getMonth()+1;
      var div='<div>'
              +'<table style="border: 1px solid #EBEEF5" border cellspacing="0" class="table_float">'
              +'<tr>'
              +'<td align="right" class="dt_name">站址：</td>'
              +'<td align="center" class="dt_vale" colspan="3" style="border-right:none;">'+item.adnm+'</td>'
                +'</tr>'
                +'<tr>'
                  +'<td align="right" class="dt_name">水位：</td>';
            if(item.skstatus==0){
              div+='<td align="center" class="dt_vale"><font style="color:red;">'+item.RZ+'m</font></td>';
            }else{
              div+='<td align="center" class="dt_vale">'+item.RZ+'m</td>';
            }
            div+='<td align="right" class="dt_name">汛限水位：</td>';
            if(month>=7 && month<=9){
                div+='<td align="center" class="dt_vale" style="border-right:none;">'+item.YUJING_FWL79+'m</td>';
            }else{
                div+='<td align="center" class="dt_vale" style="border-right:none;">'+item.YUJING_FWL+'m</td>';
            }                
                div+='</tr>'
                +'<tr>'
                  +'<td align="right" class="dt_name">距汛限：</td>'
                  +'<td align="center" class="dt_vale">'+item.jxx+'m</td>'
                  +'<td align="right" class="dt_name">水势：</td>'
                  +'<td align="center" class="dt_vale" style="border-right:none;">'+this.$FilterData.WPTN_Filter(item.RWPTN).symbol+'</td>'
                +'</tr>'
                +'<tr>'
                  +'<td align="right" class="dt_name">今日雨量：</td>'
                  +'<td align="center" class="dt_vale">'+item.p+'mm</td>'
                  +'<td align="right" class="dt_name">当前小时雨量：</td>'
                  +'<td align="center" class="dt_vale" style="border-right:none;">'+item.hourp+'mm</td>'
                +'</tr>'
                +'<tr>'
                  +'<td align="right" class="dt_name">电压状态：</td>';
                if(item.vol>item.VOLMAX || item.vol<item.VOLMIN){
                  div+='<td align="center" class="dt_vale"><font style="color:red;">异常</font></td>';
                }else{
                  div+='<td align="center" class="dt_vale">正常</td>';
                }
                div+='<td align="right" class="dt_name">通讯状态：</td>';
                if(item.CS=="异常"){
                  div+='<td align="center" class="dt_vale" style="border-right:none;"><font style="color:red;">'+item.CS+'</font></td>';
                }else{
                  div+='<td align="center" class="dt_vale" style="border-right:none;">'+item.CS+'</td>';             
                }
                
                div+='</tr>'
              +'</table></div>';
              this.map.infoWindow.setTitle(item.STNM); 
              this.map.infoWindow.resize(400, 350); // 提示框大小
              this.map.infoWindow.setContent(div); // 提示内容
              //获取坐标
                var x=Number(item.LGTD);
                var y=Number(item.LTTD);
                //如果basemap使用ArcGIS的就需要
                //转换坐标系
                x = (x / 180.0) * 20037508.34
                if (y > 85.05112) y = 85.05112;
                if (y < -85.05112) y = -85.05112;
                y = (Math.PI / 180.0) * y;
                var tmp = Math.PI / 4.0 + y / 2.0;
                y = 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;
                var zoompoint = {
                    //spatialReference: {wkid: 4326},
                    spatialReference: this.map.spatialReference,
                    x: x,
                    y: y
                };
                console.log(zoompoint);
                this.map.infoWindow.show(zoompoint, zoompoint);
    },
    //悬浮框 大坝安全
    showSafeTips(item){
      var height=1;
      var div='<div>'
              +'<table border="0" cellspacing="0" class="table_safe">'
              +'<tr>'
              +'<th align="right" >站址：</th>'
              +'<td colspan="3">'+item.adnm+'</td>'
                +'</tr>';               
                if(item.slllist.length>0){
                  height=height+item.slllist.length+2;
                  div+='<tr><td colspan="4">渗流量</td></tr>'
                  +'<tr><th>测点编号</th><th>渗流量(L/s)</th><th>阈值(L/s)</th><th>渗流水温(℃)</th></tr>';
                  for(var i=0;i<item.slllist.length;i++){
                      var sllobj=item.slllist[i];
                      div+='<tr><td>'+sllobj.mpcd+'</td>';
                      if(sllobj.wljyz>=0){
                        div+='<tr><td><font style="color:#ff0000;">'+sllobj.spprwl+'</font></td>';
                      }else{
                        div+='<tr><td>'+sllobj.spprwl+'</td>';
                      }
                      div+='<td>'+sllobj.wlyz+'</td><td>'+sllobj.tm+'</td></tr>';
                  }
                }
                if(item.slyllist.length>0){
                  height=height+item.slyllist.length+2;
                  div+='<tr><td colspan="4">渗流压力</td></tr>'
                  +'<tr><th>测点编号</th><th>渗压水位(m)</th><th>阈值(m)</th><th>水温(℃)</th></tr>';
                  for(var i=0;i<item.slyllist.length;i++){
                      var slylobj=item.slyllist[i];
                      div+='<tr><td>'+slylobj.mpcd+'</td>';
                      if(slylobj.pzjyz>=0){
                        div+='<tr><td><font style="color:#ff0000;">'+slylobj.spprwm+'</font></td>';
                      }else{
                        div+='<tr><td>'+slylobj.spprwm+'</td>';
                      }
                      div+='<td>'+slylobj.pzyz+'</td><td>'+slylobj.tm+'</td></tr>';
                  }
                }
                if(item.spwylist.length>0){
                  height=height+item.spwylist.length+2;
                  div+='<tr><td colspan="4">位移变形</td></tr>'
                  +'<tr><th>测点编号</th><th>X向位移(mm)</th><th>Y向位移(mm)</th><th>阈值(mm)</th></tr>';
                  for(var i=0;i<item.spwylist.length;i++){
                      var spwyobj=item.spwylist[i];
                      div+='<tr><td>'+spwyobj.mpcd+'</td>';
                      if(spwyobj.xjyz>=0){
                        div+='<tr><td><font style="color:#ff0000;">'+spwyobj.xhrds+'</font></td>';
                      }else{
                        div+='<tr><td>'+spwyobj.xhrds+'</td>';
                      }
                      if(spwyobj.yjyz>=0){
                        div+='<tr><td><font style="color:#ff0000;">'+spwyobj.yhrds+'</font></td>';
                      }else{
                        div+='<tr><td>'+spwyobj.yhrds+'</td>';
                      }
                      div+='<td>'+spwyobj.xyhrds+'</td></tr>';
                  }
                }
                if(item.czwylist.length>0){
                  height=height+item.czwylist.length+2;
                  div+='<tr><td colspan="4">沉降变形</td></tr>'
                  +'<tr><th>测点编号</th><th>垂直位移(mm)</th><th>阈值(m)</th><th>测量高程(m)</th></tr>';
                  for(var i=0;i<item.czwylist.length;i++){
                      var cjwyobj=item.czwylist[i];
                      div+='<tr><td>'+cjwyobj.mpcd+'</td>';
                      if(cjwyobj.vjyz>=0){
                        div+='<tr><td><font style="color:#ff0000;">'+cjwyobj.vrds+'</font></td>';
                      }else{
                        div+='<tr><td>'+cjwyobj.vrds+'</td>';
                      }
                      div+='<td>'+cjwyobj.vrdsyj+'</td><td>'+cjwyobj.inel+'</td></tr>';
                  }
                }
              div+='</table></div>';
              height=height*30+40;
              this.map.infoWindow.setTitle(item.STNM); 
              this.map.infoWindow.resize(400, height); // 提示框大小
              this.map.infoWindow.setContent(div); // 提示内容
              //获取坐标
                var x=Number(item.LGTD);
                var y=Number(item.LTTD);
                //如果basemap使用ArcGIS的就需要
                //转换坐标系
                x = (x / 180.0) * 20037508.34
                if (y > 85.05112) y = 85.05112;
                if (y < -85.05112) y = -85.05112;
                y = (Math.PI / 180.0) * y;
                var tmp = Math.PI / 4.0 + y / 2.0;
                y = 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;
                var zoompoint = {
                    //spatialReference: {wkid: 4326},
                    spatialReference: this.map.spatialReference,
                    x: x,
                    y: y
                };
                console.log(zoompoint);
                this.map.infoWindow.show(zoompoint, zoompoint);
    },
    // 隐藏提示
    hideTips() {
        this.map.infoWindow.hide();
    },
    //视频监控图层显示/隐藏
    showShipin(){
      //this.testform.checked=!this.testform.checked;
      if(this.testform.checked){
        this.shipinfeatureLayer.LayerObject.show();
        this.listWindow.lastActive=this.listWindow.activeName;
        this.listWindow.activeName="shipin";
      }else{
        this.shipinfeatureLayer.LayerObject.hide();
        if(this.listWindow.activeName=="shipin"){
          this.listWindow.activeName=this.listWindow.lastActive;
        }
      }
    },
    // 给特征点元素点添加点击事件
    addEventToJsonFlayer(JsonFlayer, v) {
      JsonFlayer.on("click", evt => {
        //当鼠标点击元素
        // 抽屉组件默认显示表类型
        evt.graphic.attributes.rowinfo.tableType = {
          yq: "hourTable",
          sksq: "historyTable",
          clicktype:"home"
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
      var obj_a=graphic.attributes.rowinfo;
      if(v.itype!="shipin"){
        if(obj_a._skstatus==1 && obj_a._status==1 && obj_a._gkstatus==1){
          if(this.listWindow.activeName=="shuikushuiqing"){
            obj_a.tableType.clicktype='sksq';
          }
          if(this.listWindow.activeName=="yuqing"){
            obj_a.tableType.clicktype='yq';
          }
          if(this.listWindow.activeName=="yuxinggongkuang"){
            obj_a.tableType.clicktype='yxgk';
          }
        } 
      }   
      var show_right = () => {
        this.details.drawer_show_right = true;
        this.details.info_right = graphic.attributes;
        this.details.info_right.itype = v.itype;       
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
        this.details.drawer_show_left = true;
        this.details.info_left.itype = v.itype;       
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
    // 正在显示的图层 水雨情
    featrueLayers_showing() {
      var featrueLayer = this.SiteFeatrueLayer;
      // 获取正在显示的图层
      if (featrueLayer.show == 1) {
          return [featrueLayer];
      }else{
          return [];
      }
    },
    // 正在显示的图层 大坝安全
    featrueLayers_safeshowing() {
      var featrueLayer = this.safeFeatrueLayer;
      // 获取正在显示的图层
      if (featrueLayer.show == 1) {
          return [featrueLayer];
      }else{
          return [];
      }
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
    //根据预警类别获取预警数据  1 水位  2 雨量  3 设备
    getAbnormalDataByType(graphicsData,warmType) {
      var data = JSON.parse(JSON.stringify(graphicsData)); // 图层数据深拷贝
      // 把每个特征点的rowinfo数据放入每个特征点的属性中
      data.features.forEach((val, index) => {
        data.features[index].attributes.rowinfo = data.features[index].rowinfo;
      });
     
      var AbnormalData = data.features.filter((val, index) => {
        if(warmType==1){
          if (val.rowinfo.skstatus == 0) {
            return true;
          }
        }
        if(warmType==2){
          if (val.rowinfo.status == 0) {
            return true;
          }
        }
        if(warmType==3){
          if (val.rowinfo.gkstatus == 0) {
            return true;
          }
        }
      });

      data.features = AbnormalData;

      return data;
    },
    //根据大坝安全预警类别获取预警数据 
    getSafeAbnormalDataByType(graphicsData) {
      var data = JSON.parse(JSON.stringify(graphicsData)); // 图层数据深拷贝
      // 把每个特征点的rowinfo数据放入每个特征点的属性中
      data.features.forEach((val, index) => {
        data.features[index].attributes.rowinfo = data.features[index].rowinfo;
      });     
      var AbnormalData = data.features.filter((val, index) => {
          if (val.rowinfo.sllyj == 1 || val.rowinfo.slylyj == 1|| val.rowinfo.spwyyj == 1|| val.rowinfo.czwyyj == 1) {
            return true;
          }
      });

      data.features = AbnormalData;

      return data;
    },
    //获取预警统计数据
    getYjTongjiCount(graphicsData){
      var yunum=0;
      graphicsData.features.forEach((val, index) => {
        if (val.rowinfo.skstatus == 0 || val.rowinfo.status ==0 || val.rowinfo.gkstatus==0 ) {
              yunum++;
          }
      });
      return yunum;
    },
    //获取异常显示数据 2雨量  3设备
    getWarmDataByRainAndSb(graphicsData,warmType) {
      var data = JSON.parse(JSON.stringify(graphicsData)); // 图层数据深拷贝
      var AbnormalData = data.features.filter((val, index) => {
        if(warmType==2){
          if (val.rowinfo.skstatus == 1) {
            return true;
          }
        }
        if(warmType==3){
          if (val.rowinfo.skstatus == 1 && val.rowinfo.status==1) {
            return true;
          }
        }
      });
      data.features = AbnormalData;
      return data;
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
         if(this.radio4=="全部"){
           this.Message_Window_show(true); // 打开消息窗口
         }       
        var Voice_Controller = this.Message_Window.Voice_Controller,
          notify_info_list = this.Message_Window.notify_info.list;

        var time = 0;
        if(this.SiteFeatrueLayer.checknum!=options.checkindex){
            notify_info_list.length = 0;
            this.SiteFeatrueLayer.checknum=options.checkindex;
          } 
        data.forEach((val, index, array) => {
          var rowinfo = val.rowinfo;

          var item = new Object();
          item.icon = options.icon;
         if(option.sign!=="safe"){
          if(options.sign=="sw"){
            item.text = `${rowinfo.STNM}`+"水位超汛限";
            item.color="#FF0000";
          }else if(options.sign=="yl"){
            var raintext=this.showRainWarm(rowinfo);
            if(raintext=="无"){
              item.text = `${rowinfo.STNM}`+"雨量异常";
            }else{
              item.text = `${rowinfo.STNM}`+"雨量"+raintext;
            }
            
            item.color="#FFFF00";
          }else{
            item.text = `${rowinfo.STNM}`;
            item.color="#5500FF";
            if(rowinfo.vol<rowinfo.VOLMIN || rowinfo.vol>rowinfo.VOLMAX){
              item.text+="电压异常";
            }
            if(rowinfo.CS=="异常"){
              item.text+="通讯异常";
            }
          }
          
          item.voice = this.baiduVoice(item.text);
          item.voice_duration = item.text.length * 300;
          item.id = notify_info_list.length;                  
          notify_info_list.unshift(item);
         }else{
           if(rowinfo.sllyj=="1"){
            item.text=`${rowinfo.STNM}`+"渗流量预警";
            item.voice = this.baiduVoice(item.text);
            item.voice_duration = item.text.length * 300;
            item.id = notify_info_list.length;                  
            notify_info_list.unshift(item);
           }
           if(rowinfo.slylyj=="1"){
            item.text=`${rowinfo.STNM}`+"渗压水位预警";
            item.voice = this.baiduVoice(item.text);
            item.voice_duration = item.text.length * 300;
            item.id = notify_info_list.length;                  
            notify_info_list.unshift(item);
           }
           if(rowinfo.spwyyj=="1"){
            item.text=`${rowinfo.STNM}`+"位移变形预警";
            item.voice = this.baiduVoice(item.text);
            item.voice_duration = item.text.length * 300;
            item.id = notify_info_list.length;                  
            notify_info_list.unshift(item);
           }
           if(rowinfo.czwyyj=="1"){
            item.text=`${rowinfo.STNM}`+"沉降变形预警";
            item.voice = this.baiduVoice(item.text);
            item.voice_duration = item.text.length * 300;
            item.id = notify_info_list.length;                  
            notify_info_list.unshift(item);
           }
         }
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
    //雨量预警等级
    showRainWarm(rowinfo){
      var text="";
      var level=0;
    if(level<rowinfo.SIGN1){
        level=rowinfo.SIGN1;
    }
    if(level<rowinfo.SIGN3){
        level=rowinfo.SIGN3;
    }
    if(level<rowinfo.SIGN6){
        level=rowinfo.SIGN6;
    }
    if(level<rowinfo.SIGN12){
        level=rowinfo.SIGN12;
    }
    if(level<rowinfo.SIGN24){
        level=rowinfo.SIGN24;
    }
    if(level==0){
      text="无";
    }
    if(level==1){
      text="黄色预警";
    }
    if(level==2){
      text="橙色预警";
    }
    if(level==3){
      text="红色预警";
    }
    return text;
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
    //雨情颜色显示
    showRainColor(){
      if(this.radio4!="全部"){
          this.testform.social=['site','p'];
          this.removeAllTextGraphicsLayer();
          this.addTextGraphicsLayerByCheckGroup(); 
      }else{
          this.removeAllTextGraphicsLayer();
          this.addTextGraphicsLayerByCheckGroup(); 
      }
    },
    //切换水雨情监测和大坝安全监测
    showjianceinfo(){
      //水雨情监测
      if(this.jksign==1){
          this.safeFeatrueLayer.show=0;
          this.SiteFeatrueLayer.show=1;
          this.shipinfeatureLayer.show=this.shipinfeatureLayer.lastshow;
          if(this.shipinfeatureLayer.show==1){
            this.testform.checked=true;
            this.listWindow.activeName="shipin";
          }
         //移除大坝安全监测图层
         this.removeFeatureLayer(this.safeFeatrueLayer);
         this.search('change');
      }else{
          this.SiteFeatrueLayer.show=0;
          this.shipinfeatureLayer.lastshow=this.shipinfeatureLayer.show;
          this.shipinfeatureLayer.show=0;
          this.testform.checked=false;
          this.safeFeatrueLayer.show=1;
          // 移除水雨情图层对象里的相应图层
          this.removeFeatureLayer(this.SiteFeatrueLayer);
          //移除视频对象图层
          this.removeFeatureLayer(this.shipinfeatureLayer);
          // 移除预警图层对象里的相应预警图层
          this.removeFeatureLayer_yujing(this.SiteFeatrueLayer);
          this.search('change');
      }
    },
    //查询
    search(opsign){
                var body = new Object();
                // 如果输入框有内容，添加站名过滤字段
                if (this.testform.search_str) {
                    body["STNM"] = `${this.testform.search_str}`;
                }
                console.log(this.testform.model_adress);
                // 如果地址选择框有内容，添加行政区划过滤字段
                if (typeof(this.testform.model_adress.length) != "undefined" && this.testform.model_adress.length>0) {
                    var addvdds=[];
                    for(var i=0;i<this.testform.model_adress.length;i++){
                        addvdds.push(`${this.$App.SUB_ADDVCD_Array_Filter(
                          this.testform.model_adress[i]
                      )}`);
                    }
                    body["ADDlist"] = addvdds;                   
                }
                // 如果归属单位选择框有内容，添加归属单位过滤字段
                if (this.testform.model_guishu && this.testform.model_guishu.length != 0) {
                    body[
                        "STGR"
                        ] = this.testform.model_guishu.join(',');
                }
                // 如果时间选择框有内容，添加时间过滤字段
                console.log('时间', this.testform.model_date);
                if (this.testform.model_date && this.testform.model_date.length != 0) {
                    body[
                        "Time_min"
                        ] = this.testform.model_date[0];
                    body[
                        "Time_max"
                        ] = this.testform.model_date[1];
                }
                  //如果雨量有异常界限值时
                  //异常界限值
                  // if (this.testform.YCJXZ != "") {
                  //     body["max_yichang"] = this.testform.YCJXZ;
                  // }

                  // //异常界限值
                  // if (this.testform.singular != "") {
                  //     body["max_yujing"] = this.testform.singular;
                  // }
                  if(this.radio4!="全部" && this.radio4!="0"){
                    body["P"]=this.radio4;
                  }
                
                // 如果水库等级选择框有内容，添加水库等级过滤字段
                if (this.testform.model_dengji && this.testform.model_dengji.length != 0) {
                  body["LEVEL"] = this.testform.model_dengji.join(",");
                }
                //异常界限值
               // if (this.testform.YCJXZ != "") {
               //     body["max_yichangsw"] = this.testform.YCJXZ;
               // }
                if (this.testform.model_status && this.testform.model_status.length != 0) {
                  body["_stat"] = this.testform.model_status;
                }
                if(opsign!=null && typeof(opsign)!="undefinded" && opsign=='yq'){
                      this.listWindow.activeName="yuqing";
                    }
                if(this.jksign==1){
                 if(!(opsign=='change')){
                    this.showTableLoading();
                 }               
                  this.search_FeatrueLayer(body,this.SiteFeatrueLayer,newFeatureLayerOBJ => {     
                      newFeatureLayerOBJ.SUMP= this.radio4; 
                      if(!(opsign=='change')){
                          this.initTableData();
                          this.hideTableLoading();
                      }             
                      this.hideTips();                                     
                  });
                }else{
                  if(!(opsign=='change')){
                    this.showSafeTableLoading();
                  }
                  this.search_SafeFeatrueLayer(body,this.safeFeatrueLayer,newFeatureLayerOBJ => {     
                      newFeatureLayerOBJ.SUMP= this.radio4;  
                      if(!(opsign=='change')){
                          this.initSafeTableData();
                          this.hideSafeTableLoading();
                      }                                
                      this.hideTips();                                     
                  });
                }
    },
    // 查询图层 (要查询的图层类型, 过滤字段, 所属图层对象)水雨情
    search_FeatrueLayer(fields, featureLayerOBJ, callback, errCallback) {
      // 获取具有过滤条件的图层数据
      this.getFeatrueLayer(
        fields,
        res => {
          var clone_data = JSON.parse(JSON.stringify(res.data));
          // 创建图层（根据图层数据）
          var featureLayer = this.createFeatrueLayer(res.data);
          var spfeatureLayer=this.createFeatrueLayer(res.data);
          // 获取异常数据 
          var wateryujingData = this.getAbnormalDataByType(res.data,1);
          var rainyujingData = this.getAbnormalDataByType(res.data,2);
          var equipmentyujingData = this.getAbnormalDataByType(res.data,3);
          //获取预警显示数据

          // 创建预警图层（根据图层异常数据）
          var water_yujing = this.createFeatrueLayer(wateryujingData);
          var rainyjData=this.getWarmDataByRainAndSb(rainyujingData,2);
          var rain_yujing = this.createFeatrueLayer(rainyjData);
          var equipmentyjData=this.getWarmDataByRainAndSb(equipmentyujingData,3);
          var equipment_yujing = this.createFeatrueLayer(equipmentyjData);
          // 移除图层对象里的相应图层
          this.removeFeatureLayer(featureLayerOBJ);
          //移除视频对象图层
          this.removeFeatureLayer(this.shipinfeatureLayer);
          // 移除图层对象里的相应预警图层
          this.removeFeatureLayer_yujing(featureLayerOBJ);
          // 设置图层的特征点图标
            this.setFeatrueLayerSymbol(featureLayer, featureLayerOBJ.icon, {
              width: 16,
              height: 16
            });
           //设置视频图层图标
           this.setFeatrueLayerSymbol(spfeatureLayer, this.shipinfeatureLayer.icon, { width: 16, height: 16});
          // 设置预警图层的特征点图标
          this.setFeatrueLayerSymbol( water_yujing, "/static/demo-hunanguanqu/yujing.gif", { width: 46, height: 46 } );
          this.setFeatrueLayerSymbol( rain_yujing, "/static/demo-hunanguanqu/jyyujing.gif", { width: 46, height: 46 } );
          this.setFeatrueLayerSymbol( equipment_yujing, "/static/demo-hunanguanqu/sbyujing.gif", { width: 46, height: 46 } );

         var checknum=Math.random();
          //运行工况提示预警信息
          if (equipmentyujingData.features.length > 0) {
            this.notify_Layer(
              {
                icon: this.SiteFeatrueLayer.sbwarmicon,
                type: "warning",
                sign:"sb",
                checkindex:checknum
              },
              equipmentyujingData.features
            );
          }
          //雨量提示预警信息
          if (rainyujingData.features.length > 0) {
            this.notify_Layer(
              {
                icon: this.SiteFeatrueLayer.ylwarmicon,
                type: "warning",
                sign:"yl",
                checkindex:checknum
              },
              rainyujingData.features
            );
          }
          //水位提示预警信息
          if (wateryujingData.features.length > 0) {
            this.notify_Layer(
              {
                icon: this.SiteFeatrueLayer.swwarmicon,
                type: "warning",
                sign: "sw",
                checkindex:checknum
              },
              wateryujingData.features
            );
          }
          // 更新图层对象集合里面 对应图层对象的 图层以及图层数据
          // 给图层对象添加 图层，图层特征点数据，地图
          featureLayerOBJ.LayerObject = featureLayer; // 添加图层到图层对象
          featureLayerOBJ.LayerObject_yujing = [water_yujing,rain_yujing,equipment_yujing]; // 添加图层到图层对象
          featureLayerOBJ.Rows = clone_data.features; // 添加图层特征点数据到图层对象

          this.shipinfeatureLayer.LayerObject=spfeatureLayer;
          this.shipinfeatureLayer.Rows = clone_data.features; 
          this.shipinfeatureLayer.map = this.map;
          if(!this.testform.checked){
            spfeatureLayer.hide();
          }
          // 添加图层模块
          this.addToFeatrueLayer(
            [equipment_yujing,rain_yujing,water_yujing, featureLayer,spfeatureLayer]
          );
          
          // 如果有回调，执行回调
          if (typeof callback == "function") {
            callback(featureLayerOBJ);
          }
          // 取消所有站点的闪烁
          this.GraphicsLayer_Selection_clear();
          // 给图层里的特征点 添加点击事件
          this.addEventToJsonFlayer(
            featureLayerOBJ.LayerObject,
            featureLayerOBJ
          );
          this.addEventToJsonFlayer(
            this.shipinfeatureLayer.LayerObject,
            this.shipinfeatureLayer
          );
          //添加悬浮事件
          this.addEventToFloatFlayer(featureLayer);
          this.addShipiEventToFloatFlayer(spfeatureLayer);
           
          //添加文字标注
          this.showRainColor(); 

        }
        // errCallback
      );
    },
    // 查询图层 (要查询的图层类型, 过滤字段, 所属图层对象)大坝安全
    search_SafeFeatrueLayer(fields, featureLayerOBJ, callback, errCallback) {
      // 获取具有过滤条件的图层数据
      this.getSafeFeatrueLayer(
        fields,
        res => {
          debugger;
          var clone_data = JSON.parse(JSON.stringify(res.data));
          console.log(clone_data);
          // 创建图层（根据图层数据）
          var featureLayer = this.createFeatrueLayer(res.data);
          // 获取异常数据 
          var yujingData = this.getSafeAbnormalDataByType(res.data);
          //获取预警显示数据

          // 创建预警图层（根据图层异常数据）
          var safe_yujing = this.createFeatrueLayer(yujingData);
          // 移除图层对象里的相应图层
          this.removeFeatureLayer(featureLayerOBJ);
          // 移除图层对象里的相应预警图层
          this.removeFeatureLayer_yujing(featureLayerOBJ);
          // 设置图层的特征点图标
            this.setFeatrueLayerSymbol(featureLayer, featureLayerOBJ.icon, {
              width: 16,
              height: 16
            });
          // 设置预警图层的特征点图标
          this.setFeatrueLayerSymbol( safe_yujing, "/static/demo-hunanguanqu/dbyujing.gif", { width: 46, height: 46 } );

         var checknum=Math.random();
          //大坝安全提示预警信息
          if (yujingData.features.length > 0) {
            this.notify_Layer(
              {
                icon: this.SiteFeatrueLayer.sbwarmicon,
                type: "warning",
                sign:"safe",
                checkindex:checknum
              },
              yujingData.features
            );
          }
          // 更新图层对象集合里面 对应图层对象的 图层以及图层数据
          // 给图层对象添加 图层，图层特征点数据，地图
          featureLayerOBJ.LayerObject = featureLayer; // 添加图层到图层对象
          featureLayerOBJ.LayerObject_yujing = [safe_yujing]; // 添加图层到图层对象
          featureLayerOBJ.Rows = clone_data.features; // 添加图层特征点数据到图层对象
          // 添加图层模块
          this.addToFeatrueLayer(
            [safe_yujing, featureLayer]
          );
          
          // 如果有回调，执行回调
          if (typeof callback == "function") {
            callback(featureLayerOBJ);
          }
          // 取消所有站点的闪烁
          this.GraphicsLayer_Selection_clear();
          // 给图层里的特征点 添加点击事件
          this.addEventToJsonFlayer(
            featureLayerOBJ.LayerObject,
            featureLayerOBJ
          );
          //添加悬浮事件
          this.addEventToFloatFlayer(featureLayer);

        }
      );
    },
//实时降雨柱状图数据获取
shouDialog(sign,show){
  this.sign=sign;
  if(show){
    this.centerDialogVisible=true;
  }else{
    this.centerDialogVisible=false;
  }
  
},
openDialog(){
  this.$nextTick(() => {
        //  执行echarts方法
          this.loadRainChartData();
        })
},
loadRainChartData(){
  var echartData ={x:new Object(),y1:new Object(),data:0,sign:this.sign};
  echartData.x.list=FilterMethods.methods.newGisArrayByGisArray(this.SiteFeatrueLayer.Rows, "STNM", val => { // 过滤
                        return val;
                    });
  var num=0;
  var maxval=0;
  var rainattr="RAIN1";
  switch(this.sign){
    case 1:
      rainattr="RAIN1";
      this.raincharttitle="1小时降雨柱状图";
      break;
    case 3:
      rainattr="RAIN3";
      this.raincharttitle="3小时降雨柱状图";
      break;
    case 6:
      rainattr="RAIN6";
      this.raincharttitle="6小时降雨柱状图";
      break;
    case 12:
      rainattr="RAIN12";
      this.raincharttitle="12小时降雨柱状图";
      break;
    case 24:
      rainattr="RAIN24";
      this.raincharttitle="24小时降雨柱状图";
      break;
  }
  
  echartData.y1.list=FilterMethods.methods.newGisArrayByGisArray(this.SiteFeatrueLayer.Rows, rainattr, val => { // 过滤            
              var rain=parseFloat(val);
              if(rain>maxval) maxval=rain;
              return rain.toFixed(1);
          });
    echartData.data=1;
  if(maxval<5){
    maxval=5;
  }else{
    maxval=Math.ceil(maxval);
  }
  echartData.y1.max=maxval;
  echartData.y1.min=0;
  echartData.y1.name="降雨量";
  this.createRainChart(echartData);
},
//生成实时降雨柱状图
createRainChart(echartData){
  var ele=document.getElementById("warmrainchart");
  var myChart = this.$echarts.init(ele);
  myChart.setOption({
                title: {
                    text: ""
                },
                tooltip: {
                    trigger: "axis"
                },
                color:["blue"],
                legend: {
                    data: [echartData.y1.name],
                    y: "bottom"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        magicType: {show: true, type: ["line", "bar"]},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                animation: true,
                xAxis: [
                    {
                        type: "category",
                        // boundaryGap: false,
                        data: echartData.x.list,
                    }
                ],
                yAxis: [
                    {
                        name: `${echartData.y1.name} mm`,
                        type: "value",
                        axisLabel: {
                            formatter: "{value} "
                        },
                        max: echartData.y1.max,
                        min: echartData.y1.min
                    },
                ],
                series: [
                    {
                        name: echartData.y1.name,
                        type: "bar",
                        data: echartData.y1.list,
                        barMaxWidth:30,
                        itemStyle: {
                            //通常情况下：
                            normal: {
                                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color: function (params) {

                                    switch (echartData.sign) {
                                        case 1:
                                            if (params.data >= 30 && params.data < 40) return 'yellow';
                                            if (params.data >= 40 && params.data < 80) return 'orange';
                                            if (params.data >= 80) return 'red';
                                            return 'blue'
                                            break
                                        case 3:
                                            if (params.data >= 50 && params.data < 70) return 'yellow';
                                            if (params.data >= 70 && params.data < 100) return 'orange';
                                            if (params.data >= 100) return 'red';
                                            return 'blue'
                                            break
                                        case 6:
                                            if (params.data >= 70 && params.data < 90) return 'yellow';
                                            if (params.data >= 90 && params.data < 120) return 'orange';
                                            if (params.data >= 120) return 'red';
                                            return 'blue'
                                            break
                                        case 12:
                                            if (params.data >= 80 && params.data < 100) return 'yellow';
                                            if (params.data >= 100 && params.data < 150) return 'orange';
                                            if (params.data >= 150) return 'red';
                                            return 'blue'                                       
                                        case 24:
                                            if (params.data >= 100 && params.data < 120) return 'yellow';
                                            if (params.data >= 120 && params.data < 180) return 'orange';
                                            if (params.data >= 180) return 'red';
                                            return 'blue'
                                            break

                                    }
                                }
                            },
                        }
                    },
                ]
            });
},
//表格数据获取 水雨情
initTableData(){
  this.$refs.sqtable.baseBox_init();
  this.$refs.yqtable.baseBox_init();
  this.$refs.gktable.baseBox_init();
  this.$refs.ssyqtable.baseBox_init();
  if(this.testform.checked){
    this.$refs.sptable.baseBox_init();
  }
},
//表格数据获取 大坝监测
initSafeTableData(){
  this.$refs.slltable.baseBox_init();
  this.$refs.slyltable.baseBox_init();
  this.$refs.wybxtable.baseBox_init();
  this.$refs.cybxtable.baseBox_init();
},
//表格加载 水雨情
showTableLoading(){
  this.$refs.sqtable.tableLoading();
  this.$refs.yqtable.tableLoading();
  this.$refs.gktable.tableLoading();
  this.$refs.ssyqtable.tableLoading();
  if(this.testform.checked){
    this.$refs.sptable.tableLoading();
  }
},
//取消加载 水雨情
hideTableLoading(){
  this.$refs.sqtable.cancelTableLoading();
  this.$refs.yqtable.cancelTableLoading();
  this.$refs.gktable.cancelTableLoading();
  this.$refs.ssyqtable.cancelTableLoading();
  if(this.testform.checked){
    this.$refs.sptable.cancelTableLoading();
  }
},
//表格加载  大坝安全
showSafeTableLoading(){
  this.$refs.slltable.tableLoading();
  this.$refs.slyltable.tableLoading();
  this.$refs.wybxtable.tableLoading();
  this.$refs.cjbxtable.tableLoading();
},
//表格取消加载 大坝安全
hideSafeTableLoading(){
  this.$refs.slltable.cancelTableLoading();
  this.$refs.slyltable.cancelTableLoading();
  this.$refs.wybxtable.cancelTableLoading();
  this.$refs.cjbxtable.cancelTableLoading();
},

    // 获取没有过滤条件的图层数据
    getFeatrueLayerWithoutPreconditions(url, callback) {
      this.axios.get(url).then(res => {
        if (typeof callback == "function") {
          callback(res);
        }
      });
    },
    // 获取具有过滤条件的水雨情图层数据
    getFeatrueLayer( fields, callback, errCallback) {
      var url = "/guanqu/sksiteinfo/gis";

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
    // 获取具有过滤条件的大坝安全监测图层数据
    getSafeFeatrueLayer( fields, callback, errCallback) {
      var url = "/guanqu/dabasafe/gis";

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
        for(var i=0;i<featureLayerOBJ.LayerObject_yujing.length;i++){
          this.map.removeLayer(featureLayerOBJ.LayerObject_yujing[i]);
        }       
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
    addToFeatrueLayer(featureLayerList) {
      featureLayerList.forEach(val => {
        // 添加图层到地图
        this.addFeatrueLayerToMap(val);
      });
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
    developing_tip(info) {
      if(this.details.info_left.STCD==info.STCD){
        this.details.drawer_show_left=false;
        this.details.info_left.itype=null;
        setTimeout(() => {
            this.details.info_left.itype="shipin";
            this.details.drawer_show_left=true;
          }, 300);
        
      }
      if(this.details.info_right.STCD==info.STCD){
        this.details.drawer_show_right=false;
        this.details.info_right.itype=null;
        this.details.drawer_show_left=false;
        this.details.info_left.itype=null;
        setTimeout(() => {
            this.details.info_right.itype="shipin";
            this.details.drawer_show_right=true;
          }, 300);
      }
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
.country-border{
  color: #839FBD;
  border: 1px solid #839FBD;
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
.demo-badge{
        width: 52px;
        height: 52px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        padding-top:2px;
        color: #DC3409;
        border: 1px solid #DC3409;
    }
.demo-badge:hover{
  color: #DC3409;
}
.safe-badge{
        width: 52px;
        height: 52px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        padding-top:2px;
        color: #04905B;
        border: 1px solid #04905B;
    }
.safe-badge:hover{
  color: #04905B;
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
  top: 80px;
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
//悬浮框表格样式 水雨情
.table_float {
  width:380px;
  td {
    height: 30px;
    border-top: none;
    border-color: #EBEEF5;
    background: #fff;
  }

  .dt_name {
    width: 24%;
    border-left: none;
  }

  .dt_vale {
    width: 26%;
    border-right: 1px solid #EBEEF5;
    border-left: none;
  }
}
//悬浮框表格样式 大坝安全
.table_safe{
    border-right: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  width:380px;
  th {
    text-align: center;
    font-weight:bold;
    height: 30px;
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    background: #e5ecfc;
    width: 25%;
  }
  td {
    text-align: center;
    height: 30px;
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    background: #fff;
    width: 25%;
  }
}
.areatable{
  width:100%;
  td{
    height:28px;
  }
  .letter{
    width:21%;
    font-size: 14px;
    color: #AEB0B6;
    font-family: Arial;
    font-weight: bold;
  }
  .areaname{
    cursor: pointer;
    width:72%;
    font-size: 12px;
    color: #606266;
  }
  .areaname:hover{
    color: #409eff;
    font-weight: 700;
  }
  .areaselect{
    color: #409eff;
    font-weight: 700;
  }
  tr:hover{
   background: #F5F7FA;
  }
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
  text-align: left;height: 40px;line-height: 40px
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
