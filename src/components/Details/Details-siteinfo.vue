<template>
  <div v-loading="boxLoading">
    <Button type="info" @click="$App.developing_tip(info)" size="small" style="position:absolute;top:25px;right:21px;z-index:10;">视频监控</Button>
    <el-tabs type="border-card" v-model="activeName" @tab-click>
      <!-- 水位数据 -->
      <el-tab-pane name="shuiqingshuju">
        <span slot="label">
          <Icon type="ios-water-outline" style="font-size:20px" />水位数据
        </span>
        <div class="drawer-profile">
          <!-- 导出按钮 
          <Button size="small" class="outPutButton" type="success" @click="$App.developing_tip">
            <div>导出</div>
          </Button>
          -->
          <div>
            <!-- 分割线 -->
            <div class="divider"></div>
             <!-- 查询，导出行 -->
                <Row :gutter="16" type="flex" justify="end" align="middle">
                  <Col span="2">
                    <span style="letter-spacing:2px">查询</span>
                  </Col>
                  <!-- 开始到结束时间选择 -->
                  <Col span="19">
                    <el-date-picker
                      v-model="table.shuiqing.date"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="handleDatePickerChange"
                      :picker-options="table.shuiqing.datePickerOptions[select.shuiqing_select]"
                      unlink-panels
                      :type="table.shuiqing.datePickerType"
                      size="mini"
                      style="min-width: 360px"
                    ></el-date-picker>
                  </Col>
                </Row>
                <!-- 分割线 -->
                 <div class="divider"></div>
                  <Row :gutter="16" type="flex" justify="center" align="middle">
                    <Col>
                      4-6月汛限水位: {{yujingdata.FWL}} m &nbsp;7-9月汛限水位：{{yujingdata.FWL79}} m
                    </Col>
                  </Row>
                <!-- 分割线 -->
                <div class="divider"></div>
            <!-- 选项卡 -->
            <Tabs type="card">
                <TabPane label="水情图">
                    <!-- 绘图 -->
                    <div
                    id="shuiqingChart"
                    v-show="table.shuiqing.Rows_filter.length > 0"
                    :style="{width: '540px', height: '400px',margin: 'auto'}"
                    >
                    </div>
                    <div id="noshuiqing"
                    v-show="table.shuiqing.Rows_filter.length == 0"
                    :style="{width: '540px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                    ></div>
                </TabPane>
              <!-- 表格 -->
              <TabPane label="水情数据">
                <!-- 表格用于展示数据 -->
                <div>
                  <Table
                    :columns="table.shuiqing.activeColumns"
                    :data="table.shuiqing.Rows_filter"
                    :loading="table.shuiqing.loading"
                    border
                    size="small"
                    :height="table.shuiqing.height"
                    @on-sort-change="sort_change_shuiqing"
                  ></Table>
                  <!-- 分割线 -->
                  <div class="divider"></div>
                  <!-- 分页器 -->
                  <el-pagination
                    background
                    :page-size="table.shuiqing.pageSizes"
                    layout="sizes, total, prev, pager, next, jumper "
                    :page-sizes="[20, 50, 100, 200]"
                    :total="table.shuiqing.total"
                    :pager-count="5"
                    :current-page="table.shuiqing.currentPage"
                    @current-change="handleCurrentChange_shuiqing"
                    @size-change="handleSizeChange_shuiqing"
                    class="pageController"
                    small
                  ></el-pagination>
                  <!-- 分割线 -->
                  <div class="divider"></div>
                </div>
              </TabPane>
              <!-- 历史表选择框 -->
              <Select
                @on-change="tableTypeOnChange_shuiqing"
                prefix="ios-calendar-outline"
                v-model="select.shuiqing_select"
                slot="extra"
              >
                <Option
                  v-for="item in select.shuiqingList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                ></Option>
              </Select>
            </Tabs>

            <!-- 分割线 -->
            <!-- <div class="divider"></div> -->
          </div>
        </div>
      </el-tab-pane>
       <!-- 降雨数据 -->
            <el-tab-pane name="yuqing">
        <span slot="label">
          <Icon type="ios-rainy-outline" style="font-size:20px"/>降雨数据
        </span>
                <div class="drawer-profile">
                    <!-- 导出按钮 
                    <Button size="small" class="outPutButton" type="success" @click="$App.developing_tip">
                        <div>导出</div>
                    </Button>
                    -->
                    <div>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <!-- 查询，导出行 -->
                                <Row :gutter="16" type="flex" justify="end" align="middle">
                                    <Col span="2">
                                        <span style="letter-spacing:2px">查询</span>
                                    </Col>
                                    <!-- 开始到结束时间选择 -->
                                    <Col span="19">
                                        <el-date-picker
                                                v-model="table.yuqing.date"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                @change="yuqingDatePickerChange"
                                                :picker-options="table.yuqing.datePickerOptions[select.yuqing_select]"
                                                unlink-panels
                                                :type="table.yuqing.datePickerType"
                                                size="mini"
                                                style="min-width: 360px"
                                                v-show="table.yuqing.datePickerType != 'yearrange'"
                                        ></el-date-picker>


<!--                                        年表-->
                                        <div class="div_year" v-show="table.yuqing.datePickerType == 'yearrange'">
                                            <el-date-picker
                                                    class="wAh"
                                                    size="mini"
                                                    v-model="table.yuqing.start_year"
                                                    value-format="yyyy"
                                                    type="year"
                                                    placeholder="选择年">
                                            </el-date-picker>
                                             &nbsp;&nbsp;至&nbsp;&nbsp;
                                            <el-date-picker
                                                    class="wAh"
                                                    size="mini"
                                                    v-model="table.yuqing.end_year"
                                                    type="year"
                                                    value-format="yyyy"
                                                    placeholder="选择年">
                                            </el-date-picker>

                                            <el-button style="margin-left: 20px"
                                                       type="primary" @click="search_yuqing('yearTable')" size="mini" plain>查询</el-button>
                                        </div>
                                    </Col>
                                </Row>
                                <!-- 分割线 -->
                                <div class="divider"></div>
                                <Row :gutter="16" type="flex" justify="end" align="middle">
                                    <Col span="8">
                                        累计降雨:{{jiangyu_tongji.rainSum}}mm
                                    </Col>
                                    <Col span="8">
                                        平均{{biao_yuqing}}降雨:{{jiangyu_tongji.rainVag}}mm
                                    </Col>
                                    <Col span="8">
                                        最大{{biao_yuqing}}降雨:{{jiangyu_tongji.rainMax}}mm
                                    </Col>
                                </Row>
                                 <!-- 分割线 -->
                                <div class="divider"></div>
                        <!-- 选项卡 -->
                        <Tabs type="card">
                            <TabPane label="雨情图">
                                <!-- 绘图 -->
                                <div v-show="table.yuqing.Rows_filter.length > 0" id="yuqingChart" :style="{width: '540px', height: '400px',margin: 'auto'}"></div>
                                <div id="noyuqing"
                                        v-show="table.yuqing.Rows_filter.length == 0"
                                        :style="{width: '540px', height: '400px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                                >
                                </div>
                            </TabPane>
                            <!-- 表格 -->
                            <TabPane label="雨情数据">
                                <!-- 表格用于展示数据 -->
                                <div>
                                    <Table
                                            :columns="table.yuqing.activeColumns"
                                            :data="table.yuqing.Rows_filter"
                                            :loading="table.yuqing.loading"
                                            border
                                            size="small"
                                            :height="table.yuqing.height"
                                            @on-sort-change="sort_change_yuqing"
                                    ></Table>
                                    <!-- 分割线 -->
                                    <div class="divider"></div>
                                    <!-- 分页器 -->
                                    <el-pagination
                                            background
                                            :page-size="table.yuqing.pageSizes"
                                            layout="sizes, total, prev, pager, next, jumper "
                                            :page-sizes="[20, 50, 100, 200]"
                                            :total="table.yuqing.total"
                                            :pager-count="5"
                                            :current-page="table.yuqing.currentPage"
                                            @current-change="handleCurrentChange_yuqing"
                                            @size-change="handleSizeChange_yuqing"
                                            class="pageController"
                                            small
                                    ></el-pagination>
                                    <!-- 分割线 -->
                                    <div class="divider"></div>
                                </div>
                            </TabPane>
                            <!-- 历史表选择框 -->
                            <Select
                                    @on-change="tableTypeOnChange_yuqing"
                                    prefix="ios-calendar-outline"
                                    v-model="select.yuqing_select"
                                    slot="extra"
                            >
                                <Option
                                        v-for="item in select.yuqingList"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                ></Option>
                            </Select>
                        </Tabs> 
                    </div>
                </div>
            </el-tab-pane>
             <!-- 电压数据 -->
            <el-tab-pane name="zhuangtaishuju">
                <span slot="label">
                <Icon type="ios-flash" style="font-size:20px"/>运行工况
                </span>
                <div class="drawer-profile">
                <!-- 导出按钮 
                <Button size="small" class="outPutButton" type="success" @click="developing_tip">
                    <div>导出</div>
                </Button>
                -->
                <div>
                    <!-- 查询，导出行 -->
                    <Row :gutter="16" type="flex" justify="end" align="middle">
                        <Col span="2">
                            <span style="letter-spacing:2px">查询</span>
                        </Col>
                        <!-- 开始到结束时间选择 -->
                        <Col span="19">
                            <el-date-picker
                            v-model="table.zhuangtaishuju.date"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="zhuangtaiDatePickerChange"
                            :picker-options="table.zhuangtaishuju.datePickerOptions"
                            unlink-panels
                            :type="table.zhuangtaishuju.datePickerType"
                            size="mini"
                            style="min-width: 360px"
                            ></el-date-picker>
                        </Col>
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <Row :gutter="16" type="flex" justify="center" align="middle">
                        正常电压范围：{{ZCDY.VOLMIN}}v - {{ZCDY.VOLMAX}}v
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                    <!-- 选项卡 -->
                    <Tabs type="card">
                    <TabPane label="电压线性图">
                        <!-- 绘图 -->
                        <div
                        v-show="table.zhuangtaishuju.Rows_filter.length > 0"
                        id="zhuangtaishujuChart"
                        :style="{width: '540px', height: '400px',margin: 'auto'}"
                        ></div>
                        <div id="nozhuangtaishuju"
                        v-show="table.zhuangtaishuju.Rows_filter.length == 0"
                        :style="{width: '540px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                        ></div>
                    </TabPane>
                    <!-- 表格 -->
                    <TabPane label="电压数据">
                        <!-- 表格用于展示数据 -->
                        <div>
                        <Table
                            :columns="table.zhuangtaishuju.activeColumns"
                            :data="table.zhuangtaishuju.Rows_filter"
                            :loading="table.zhuangtaishuju.loading"
                            border
                            size="small"
                            :height="table.zhuangtaishuju.height"
                        ></Table>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <!-- 分页器 -->
                        <el-pagination
                            background
                            :page-size="table.zhuangtaishuju.pageSizes"
                            layout="sizes, total, prev, pager, next, jumper "
                            :page-sizes="[20, 50, 100, 200]"
                            :total="table.zhuangtaishuju.total"
                            :pager-count="5"
                            :current-page="table.zhuangtaishuju.currentPage"
                            @current-change="handleCurrentChange_zhuangtaishuju"
                            @size-change="handleSizeChange_zhuangtaishuju"
                            class="pageController"
                            small
                        ></el-pagination>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        </div>
                    </TabPane>
                    </Tabs>

                    <!-- 分割线 -->
                    <!-- <div class="divider"></div> -->
                </div>
                </div>
            </el-tab-pane>
             <!-- 关系曲线 -->
            <el-tab-pane name="guanxiquxian">
                <span slot="label">
                <Icon type="md-trending-up" style="font-size:20px"/>水位库容
                </span>
                <div class="drawer-profile">
                <!-- 导出按钮 
                <Button size="small" class="outPutButton" type="success" @click="$App.developing_tip">
                    <div>导出</div>
                </Button>
                -->
                <!-- 查询&换算 -->
                        <Row :gutter="19" type="flex" align="middle" style="margin-bottom:10px;">
                            <Col span="2">
                            <span></span>
                            </Col>
                            <Col span="3">
                            <span>水位：</span>
                            </Col>
                            <Col span="6">
                            <Input
                                v-model="input.huansuan.waterLever"
                                placeholder="水深 m"
                                style="min-width: 90px"
                                size="small"
                            />
                            </Col>
                            <Col span="3">
                            <Button type="info" size="small" @click="$App.developing_tip">换算</Button>
                            </Col>
                            <Col span="3">
                            <span>库容：</span>
                            </Col>
                            <Col span="6">
                            <Input
                                v-model="input.huansuan.flowLever"
                                placeholder="库容万m³"
                                style="min-width: 90px"
                                size="small"
                            />
                            </Col>                           
                        </Row>
                        <Row :gutter="16" type="flex" justify="end" align="middle">
                        <Col span="2">
                            <span style="letter-spacing:2px">查询</span>
                        </Col>
                        <!-- 时间选择 -->
                        <Col span="19">
                        <el-date-picker
                            v-model="table.guanxiquxian.date"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="handleDatePickerChange_guanxiquxian"
                            :picker-options="table.guanxiquxian.datePickerOptions"
                            unlink-panels
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            size="mini"
                            style="min-width: 360px"
                        ></el-date-picker>
                        </Col>
                    </Row>
                    <!-- 分割线 -->
                    <div class="divider"></div>
                <Tabs type="card">
                    <TabPane label="关系曲线">
                    <!-- 绘图 -->
                    <div id="guanxiChart" :style="{width: '530px', height: '450px',margin: 'auto'}"></div>
                    </TabPane>
                    <TabPane label="关系数据">
                    <!-- 表格用于展示数据 -->
                    <div>
                        <Table
                        :columns="table.guanxiquxian.columns"
                        :data="table.guanxiquxian.Rows_filter"
                        :loading="table.guanxiquxian.loading"
                        border
                        size="small"
                        :height="table.guanxiquxian.height"
                        ></Table>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <!-- 分页器 -->
                        <el-pagination
                        background
                        :page-size="20"
                        layout="total, prev, pager, next, jumper"
                        :total="table.guanxiquxian.total"
                        :pager-count="5"
                        :current-page="table.guanxiquxian.currentPage"
                        @current-change="handleCurrentChange_guanxiquxian"
                        @size-change="handleSizeChange_guanxiquxian"
                        class="pageController"
                        small
                        ></el-pagination>
                    </div>
                    <!-- 分割线 -->
                    <div class="divider"></div>
                    </TabPane>
                </Tabs>
                </div>
            </el-tab-pane>
            <!-- 站点信息 -->
      <el-tab-pane name="zhandianxinxi">
        <span slot="label">
          <i class="el-icon-tickets"></i> 站点信息
        </span>
        <div class="drawer-profile">         
          <!-- 信息表 -->
          <div>
            <!-- 信息内容 -->
            <div>
              <!-- table start -->
              <table
                style="border: 1px solid #EBEEF5"
                border
                cellspacing="0"
                width="100%"
                class="site_detail"
              >
              <tr>
                <td colspan="4" style="background-color:#DEDFE0;padding:2px;">
                  <el-tag type="info" effect="dark" size="small">基本信息</el-tag>
                </td>
              </tr>
                <tr>
                  <td align="right" class="dt_name">站名：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.STNM || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">国家定类：</td>
                  <td
                    align="center"
                    class="dt_vale"
                  >{{ this.STTP_Filter(siteInfo.STTP) || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">等级：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ this.$FilterData.STGR_Filter(siteInfo.STGR) || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">行政区划：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.AD_NM || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">经度：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.LGTD || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">纬度：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.LTTD || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">站址：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.STLC || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">水系：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.HNNM || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">流域：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.CTCD || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">河流：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.RVCD || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">建站日期：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.ESSTDT || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">建设单位：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.DLOG || "&nbsp;" }}</td>
                </tr>
              </table>
               <table
                style="border: 1px solid #EBEEF5"
                border
                cellspacing="0"
                width="100%"
                class="site_detail"
              >              
                  <tr>
                <td colspan="4" style="background-color:#DEDFE0;padding:2px;">
                  <el-tag type="info" effect="dark" size="small">特征水位</el-tag>
                </td>
                  </tr>
                  <tr>
                  <td align="right" class="dt_name">4-6月汛限水位：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ `${$FilterData.Float_Filter(yujingdata.FWL)} m`  || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">7-9月汛限水位：</td>
                  <td
                    align="center"
                    class="dt_vale"
                  >{{ `${$FilterData.Float_Filter(yujingdata.FWL79)} m` || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">死水位：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ `2514.00m` || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">校核水位：</td>
                  <td align="center" class="dt_vale">{{ `2524.12m` || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">正常蓄水位：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ `2520.20m` || "&nbsp;" }}</td>
                  <td align="right" class="dt_name"></td>
                  <td align="center" class="dt_vale"></td>
                </tr>
               </table>
               <table
                style="border: 1px solid #EBEEF5"
                border
                cellspacing="0"
                width="100%"
                class="site_detail"
              >
              <tr>
                <td colspan="4" style="background-color:#DEDFE0;padding:2px;">
                  <el-tag  type="info" effect="dark" size="small">实时降雨</el-tag>
                </td>
                  </tr>
                <tr>
                  <td align="right" class="dt_name">预警等级：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  ><span :style="{'color':jiangyu_warm.COLOR}">{{ jiangyu_warm.LEVEL || "&nbsp;" }}</span></td>
                  <td align="right" class="dt_name">1小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                  ><span :style="{
                        color: jiangyu_warm.SIGN1 == 3?'red' :jiangyu_warm.SIGN1 == 2?'orange' : jiangyu_warm.SIGN1 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN1 || "&nbsp;" }}</span></td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">3小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  ><span :style="{
                        color: jiangyu_warm.SIGN3 == 3?'red' :jiangyu_warm.SIGN3 == 2?'orange' : jiangyu_warm.SIGN3 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN3 || "&nbsp;" }}</span></td>
                  <td align="right" class="dt_name">6小时降雨：</td>
                  <td align="center" class="dt_vale"><span :style="{
                        color: jiangyu_warm.SIGN6 == 3?'red' :jiangyu_warm.SIGN6 == 2?'orange' : jiangyu_warm.SIGN6 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN6 || "&nbsp;" }}</span></td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">12小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  ><span :style="{
                        color: jiangyu_warm.SIGN12 == 3?'red' :jiangyu_warm.SIGN12 == 2?'orange' : jiangyu_warm.SIGN12 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN12 || "&nbsp;" }}</span></td>
                  <td align="right" class="dt_name">24小时降雨：</td>
                  <td align="center" class="dt_vale"><span :style="{
                        color: jiangyu_warm.SIGN24 == 3?'red' :jiangyu_warm.SIGN24 == 2?'orange' : jiangyu_warm.SIGN24 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN24 || "&nbsp;" }}</span></td>
                </tr>
               </table>
            </div>
            <!-- 分割线 -->
            <div class="divider"></div>
            <Row>
              <el-col class="dt_remark">
                <Col span="24">备注：{{ siteInfo.COMMENTS || "&nbsp;" }}</Col>
              </el-col>
            </Row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 导出提示对话框 -->
    <Modal
      v-model="outPutModal"
      v-loading="loading"
      title="关于导出"
      @on-ok="outPutSure"
      @on-cancel="cancel"
    >
      <p>您确认导出该站点的信息表吗？</p>
    </Modal>
  </div>
</template>



<script>
import FilterMethods from "../../assets/commonJS/FilterMethods"; // 过滤方法
import GetDataMethods from "../../assets/commonJS/GetDataMethods"; // 获取数据方法
import { timingSafeEqual } from "crypto";
import { type } from "os";
import { types } from "util";
import { stat } from "fs";
import { filter } from "minimatch";
export default {
  props: {
    info: {}
  },
  data() {
    return {
      // 激活标签栏
      activeName: "shuiqingshuju",
      // 站点
      siteInfo: {},
      //   多选框对象
      checkBox: {},
      // 统计降雨数据的表名
      biao_yuqing: '',
      // 降雨统计
      jiangyu_tongji: {
        rainSum: '',
        rainVag: '',
        rainMax: ''
      },
      //降雨预警
      jiangyu_warm:{
        LEVEL:null,//降雨预警等级
        RAIN1:null,
        RAIN3:null,
        RAIN6:null,
        RAIN12:null,
        RAIN24:null,
        SIGN1:null,
        SIGN3:null,
        SIGN6:null,
        SIGN12:null,
        SIGN24:null,
      },
      select: {
        // 当前激活的水位数据快速查询选项
        activeQuickSearchList: [],
        // 查询绑定值
        select: "rec6",
        // 日期选择器绑定值
        shuiqing_datePicker: null,
        // 水位数据历史表
        shuiqingList: [
          {
            value: "historyTable",
            size: "small",
            // iconType: "logo-facebook",
            label: "历史水情"
          },
          {
            value: "hourTable",
            size: "small",
            // iconType: "logo-facebook",
            label: "小时水情"
          },
          {
            value: "dayTable",
            size: "small",
            // iconType: "logo-facebook",
            label: "日水情"
          },
          {
            value: "monthTable",
            size: "small",
            // iconType: "logo-facebook",
            label: "月水情"
          }
        ],
        // 水位数据历史表绑定值
        shuiqing_select: "historyTable",
        // 降雨数据历史表
                    yuqingList: [
                        {
                            value: "hourTable",
                            size: "small",
                            // iconType: "logo-facebook",
                            label: "小时降雨"
                        },
                        {
                            value: "dayTable",
                            size: "small",
                            // iconType: "logo-facebook",
                            label: "日降雨"
                        },
                        {
                            value: "tenDaysTable",
                            size: "small",
                            // iconType: "logo-facebook",
                            label: "旬降雨"
                        },
                        {
                            value: "monthTable",
                            size: "small",
                            // iconType: "logo-facebook",
                            label: "月降雨"
                        },
                        {
                            value: "yearTable",
                            size: "small",
                            // iconType: "logo-facebook",
                            label: "年降雨"
                        }
                    ],
                    // 降雨数据历史表绑定值
                    yuqing_select: "hourTable",
                    // 旬选择器列表
                    xunList: [
                        {
                            label: "上旬",
                            value: 0
                        },
                        {
                            label: "中旬",
                            value: 1
                        },
                        {
                            label: "下旬",
                            value: 2
                        },
                    ],
                    // 旬选择器绑定值
                    xun_select: null,
      },
      // 表格
      table: {
        // 水情
        shuiqing: {
          // 表头设置
          columns: {
            // 历史表
            historyTable: [
              {
                type: "index",
                title: " ",
                width: 60,
                align: "center",
                // 自定义序号
                indexMethod(item) {
                  var index =
                    item._index + 1 + (item.currentPage - 1) * item.pageSizes;
                  return index;
                },
                ellipsis: true
              },
              {
                title: "时间",
                key: "tm",
                width: 150,
                align: "center",
                sortable: "custom"
              },
              {
                title: "库前水位(m)",
                width: 150,
                key: "RZ",
                align: "center",
                sortable: "custom"
              },
              {
                title: "库下水位(m)",
                width: 150,
                key: "BLRZ",
                align: "center",
                sortable: "custom"
              },
              {
                width: 140,
                title: "入库流量(m³/s)",
                key: "INQ",
                align: "center",
                sortable: "custom"
              },
              {
                width: 140,
                title: "出库流量(m³/s)",
                key: "OTQ",
                align: "center",
                sortable: "custom"
              }
            ],
            // 小时表
            hourTable: [
              {
                title: " ",
                type: "index",
                width: 50,
                align: "center",
                // 自定义序号
                indexMethod(item) {
                  var index =
                    item._index + 1 + (item.currentPage - 1) * item.pageSizes;
                  return index;
                },
                ellipsis: true
              },
              {
                title: "时间",
                key: "dt",
                width: 150,
                align: "center",
                sortable: "custom"
              },
              {
                title: "库前水位(m)",
                width: 150,
                key: "RZ",
                align: "center",
                sortable: "custom"
              },
              {
                title: "库下水位(m)",
                width: 150,
                key: "BLRZ",
                align: "center",
                sortable: "custom"
              },
              {
                width: 160,
                title: "平均入库流量(m³/s)",
                key: "INQ",
                align: "center",
                sortable: "custom"
              },
              {
                width: 160,
                title: "平均出库流量(m³)",
                key: "OTQ",
                align: "center",
                sortable: "custom"
              }
            ],
            // 日表
            dayTable: [
              {
                title: " ",
                type: "index",
                width: 50,
                align: "center",
                // 自定义序号
                indexMethod(item) {
                  var index =
                    item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                  return index;
                },
                ellipsis: true
              },
              {
                title: "时间",
                key: "tm",
                width: 150,
                align: "center",
                sortable: "custom"
              },
              {
                title: "库前水位(m)",
                width: 150,
                key: "RZ",
                align: "center",
                sortable: "custom"
              },
              {
                title: "库下水位(m)",
                width: 150,
                key: "BLRZ",
                align: "center",
                sortable: "custom"
              },
              {
                width: 170,
                title: "平均入库流量(m³/s)",
                key: "INQ",
                align: "center",
                sortable: "custom"
              },
              {
                width: 170,
                title: "平均出库流量(m³)",
                key: "OTQ",
                align: "center",
                sortable: "custom"
              }
            ],
            // 月表
            monthTable: [
              {
                title: " ",
                type: "index",
                width: 50,
                align: "center",
                // 自定义序号
                indexMethod(item) {
                  var index =
                    item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                  return index;
                },
                ellipsis: true
              },
              {
                title: "时间",
                key: "dt",
                width: 150,
                align: "center",
                sortable: "custom"
              },
              {
                title: "库水位(m)",
                width: 150,
                key: "RZ",
                align: "center",
                sortable: "custom"
              },
              {
                title: "库下水位(m)",
                width: 150,
                key: "BLRZ",
                align: "center",
                sortable: "custom"
              },
              {
                width: 180,
                title: "平均入库流量(m³/s)",
                key: "INQ",
                align: "center",
                sortable: "custom"
              },
              {
                width: 170,
                title: "平均出库流量(m³)",
                key: "OTQ",
                align: "center",
                sortable: "custom"
              }
            ]
          },
          // 正在激活的表头
          activeColumns: [],
          // 表体内容
          Rows: [],
          // 过滤后的表体内容
          Rows_filter: [],
          // 日期时间选择器的选项配置
          datePickerOptions: {
            historyTable: {
              shortcuts: [
                {
                  text: "最近6小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 6);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近12小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 12);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近24小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近36小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 36);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近72小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 72);
                    picker.$emit("pick", [start, end]);
                  }
                }
              ]
            },
            hourTable: {
              shortcuts: [
                {
                  text: "最近6小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 6);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近12小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 12);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近24小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近36小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 36);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近72小时",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 72);
                    picker.$emit("pick", [start, end]);
                  }
                }
              ]
            },
            dayTable: {
              shortcuts: [
                {
                  text: "最近10天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 10);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近15天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近30天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近60天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近90天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                  }
                }
              ]
            },
            monthTable: {
              shortcuts: []
            }
          },
          // 日期时间选择器类型
          datePickerType: "date",
          // 日期时间选择器值
          date: null,
          // 排序
          sort: null,
          // 表格是否加载中
          loading: false,
          // 总条数
          total: 0,
          // 当前页
          currentPage: 1,
          // 每页显示数量
          pageSizes: 20,
          // 表格高度
          height: 430
        },
          // 雨情
        yuqing: {
            // 表头设置
            columns: {
                // 历史表
                historyTable: [
                    {
                        title: " ",
                        type: "index",
                        width: 60,
                        align: "center",
                        // 自定义序号
                        indexMethod(item) {
                            var index =
                                item._index + 1 + (item.currentPage - 1) * item.pageSizes;
                            return index;
                        },
                        ellipsis: true
                    },
                    {
                        title: "时间",
                        key: "DT",
                        width: 180,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "降雨(mm)",
                        // width: 130,
                        key: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 小时表
                hourTable: [
                    {
                        title: " ",
                        type: "index",
                        width: 60,
                        align: "center",
                        // 自定义序号
                        indexMethod(item) {
                            var index =
                                item._index + 1 + (item.currentPage - 1) * item.pageSizes;
                            return index;
                        },
                        ellipsis: true
                    },
                    {
                        title: "时间",
                        key: "DT",
                        width: 180,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "降雨(mm)",
                        // width: 130,
                        key: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 日表
                dayTable: [
                    {
                        title: " ",
                        type: "index",
                        width: 50,
                        align: "center",
                        // 自定义序号
                        indexMethod(item) {
                            var index =
                                item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                            return index;
                        },
                        ellipsis: true
                    },
                    {
                        title: "日期",
                        key: "TM",
                        width: 150,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "降雨(mm)",
                        // width: 130,
                        key: "p",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 旬表
                tenDaysTable: [
                    {
                        title: " ",
                        type: "index",
                        width: 50,
                        align: "center",
                        // 自定义序号
                        indexMethod(item) {
                            var index =
                                item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                            return index;
                        },
                        ellipsis: true
                    },
                    {
                        title: "时间",
                        key: "DT",
                        width: 130,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "降雨(mm)",
                        // width: 130,
                        key: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 月表
                monthTable: [
                    {
                        title: " ",
                        type: "index",
                        width: 50,
                        align: "center",
                        // 自定义序号
                        indexMethod(item) {
                            var index =
                                item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                            return index;
                        },
                        ellipsis: true
                    },
                    {
                        title: "时间",
                        key: "DT",
                        width: 130,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "降雨(mm)",
                        // width: 130,
                        key: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ],
                // 年表
                yearTable: [
                    {
                        title: " ",
                        type: "index",
                        width: 50,
                        align: "center",
                        // 自定义序号
                        indexMethod(item) {
                            var index =
                                item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                            return index;
                        },
                        ellipsis: true
                    },
                    {
                        title: "时间",
                        key: "YR",
                        width: 130,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "降雨(mm)",
                        // width: 130,
                        key: "P",
                        align: "center",
                        sortable: "custom"
                    }
                ]
            },
            // 正在激活的表头
            activeColumns: [],
            // 表体内容
            Rows: [],
            // 过滤后的表体内容
            Rows_filter: [],
            // 日期时间选择器的选项配置
            datePickerOptions: {
                historyTable: {
                    shortcuts: [
                        {
                            text: "最近6小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 6);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近12小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 12);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近24小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近36小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 36);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近72小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 72);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                hourTable: {
                    shortcuts: [
                        {
                            text: "最近6小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 6);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近12小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 12);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近24小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近36小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 36);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近72小时",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 72);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                dayTable: {
                    shortcuts: [
                        {
                            text: "最近10天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 10);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近15天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近30天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近60天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近90天",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                monthTable: {
                    shortcuts: []
                }
            },
            // 日期时间选择器类型
            datePickerType: "date",
            // 日期时间选择器值
            date: null,
            // 开始年
            start_year: null,
            //结束年
            end_year: null,

            tenDays_value: null,

            tenDays_lable: null,
            btn_tenday: null,
            // 排序
            sort: null,
            // 表格是否加载中
            loading: false,
            // 总条数
            total: 0,
            // 当前页
            currentPage: 1,
            // 每页显示数量
            pageSizes: 20,
            // 表格高度
            height: 430
        },
        // 状态数据
        zhuangtaishuju: {
          // 表头设置
          columns: {},
          // 正在激活的表头
          activeColumns: [
            {
              type: "index",
              title: " ",
              width: 60,
              align: "center",
              // 自定义序号
              indexMethod(item) {

                var index = item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                return index;
              },
              ellipsis: true
            },
            {
              title: "时间",
              key: "tm",
              // width: 150,
              align: "center"
            },
            {
              title: "电压(v)",
              width: 110,
              key: "VOL",
              align: "center",
              render: (h, params) => {
                console.log("params", params);
                console.log("VOL", params.row.VOL < this.ZCDY.VOLMIN || params.row.VOL > this.ZCDY.VOLMAX ? "red" : "black");
                return h(
                  "div",
                  {
                    style: {
                      color: params.row.VOL < this.ZCDY.VOLMIN || params.row.VOL > this.ZCDY.VOLMAX ? "red" : "black"
                    }
                  },
                  params.row.VOL
                );
              }
            },
            {
              width: 120,
              title: "通讯状态",
              key: "cs",
              align: "center",
              render: (h, params) => {
                // console.log("params", params);
                // console.log("CS", params.row.CS == "正常" ? "black" : "red");
                return h(
                  "div",
                  {
                    style: {
                      color: params.row.cs == "正常" ? "black" : "red"
                    }
                  },
                  params.row.cs
                );
              }
            }
          ],
          // 表体内容
          Rows: [],
          // 过滤后的表体内容
          Rows_filter: [],
          // 日期时间选择器的选项配置
          datePickerOptions: {
            shortcuts: [
              {
                text: "最近6小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 6);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近12小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 12);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近24小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近36小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 36);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近72小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 72);
                  picker.$emit("pick", [start, end]);
                }
              }
            ]
          },
          // 日期时间选择器类型
          datePickerType: "datetimerange",
          // 日期时间选择器值
          date: null,
          // 表格是否加载中
          loading: false,
          // 当前页
          currentPage: 1,
          // 每页显示数量
          pageSizes: 20,
          // 总条数
          total: 0,
          // 表格高度
          height: 430
        },
        // 关系曲线
        guanxiquxian: {
          // 表头设置
          columns: [
            {
              title: " ",
              type: "index",
              width: 60,
              align: "center",
              // 自定义序号
              indexMethod(item) {
                var index =
                  item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                return index;
              },
              ellipsis: true
            },
            {
               width: 150,
              title: "时间",
              key: "TM",
              align: "center"
            },
            {
              title: "水位(m)",
              width: 95,
              key: "RZ",
              align: "center"
            },
            {
              title: "库容(万m³)",
              key: "W",
              width: 105,
              align: "center"
            },
            {
              title: "水面面积(㎡)",
              key: "MJ",
              width: 105,
              align: "center"
            },
          ],
          // 日期时间选择器的选项配置
          datePickerOptions: {
            shortcuts: [
              {
                text: "最近5年",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近3年",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近2年",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 2);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近1年",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 1);
                  picker.$emit("pick", [start, end]);
                }
              }
            ]
          },
          // 表体内容
          Rows: [],
          // 过滤后的表体内容
          Rows_filter: [],
          // 表格是否加载中
          loading: false,
          // 日期时间选择器值
          date: null,
          // 总条数
          total: 0,
          // 表格高度
          height: 440,
          // 当前页
          currentPage: 1,
          // 每页显示数量
          pageSizes: 20
        },
      },
      // 图形
      chart: {
        shuiqing: null,
        yuqing:null,
        zhuangtaishuju: null,
      },
      //   日期数据
      date: {
        shuiqing: ""
      },
      // 输入框对象
      input: {
        // 关系曲线换算的
        huansuan: {
          waterLever: "",
          flowLever: ""
        }
      },
      //   导出按钮加载控制
      outPutLoading: false,
      //   导出确认对话框控制
      outPutModal: false,
      // 整块区域的加载控制
      boxLoading: false,
      //预警数据
      yujingdata: {
        FWL: null, // 4-6月汛限水位
        FWL79: null, // 7-9月汛限水位
        SJWL: null, // 设计洪水位
        JYWL: null, // 经验水位       
      },
      tableType: '',
      yqtableType: '',
      //正常电压范围
      ZCDY:{},
    };
  },
  mixins: [FilterMethods, GetDataMethods],
  methods: {
    //   导出站点信息
    outPutSiteInfo() {
      //   关闭导出确认对话框
      this.outPutModal = false;
      //   按钮加载
      this.outPutLoading = true;
      setTimeout(() => {
        this.outPutLoading = false;
        this.$Modal.success({
          title: "关于导出",
          content: "站点信息表导出成功"
        });
      }, 500);
    },
    //   确认导出
    outPutSure() {
      this.outPutSiteInfo();
    },
    datePicke_on_ok(tableType) {
      this.table["shuiqing"].currentPage = 1; // 重置当前页
      this.table.shuiqing.loading = true; // 表格加载中
      var body = {
        STCD: this.siteInfo.STCD,
        TM: `bt,${this.select.shuiqing_datePicker}`
      };
      var pageSizes = this.table.shuiqing.pageSizes;
      var currentPage = 1;
      this.getTableData_shuiqing(
        tableType,
        pageSizes,
        currentPage,
        body,
        data => {
          this.setTableTotal("shuiqing", data.total); // 根据返回的total数量, 设置表格总条数
          this.setTableData("shuiqing", data.data); // 更新水情历史数据表的数据
          this.table.shuiqing.loading = false; // 取消表格加载
        }
      );
    },
    // 查询
    search_shuiqing(tableType) {
      var tableType = tableType || this.select.shuiqing_select;
      this.letTableLoading("shuiqing"); // 表格加载中
      console.log('+++++++++++++'+tableType);



      // 传递参数
      var body = {
        STCD: this.siteInfo.STCD,
        _page: this.table.shuiqing.currentPage || 1,
        _page_size: this.table.shuiqing.pageSizes || 20
      };

      // 如果有选择排序，则传递排序参数
      if (this.table.shuiqing.sort) {
        var _sort = this.$FilterData.sort_Filter(this.table.shuiqing.sort);
        if (_sort) {
          body._orderby = _sort;
        }
      }

      // 如果有选择日期进行查询，根据表格类型传递参数
      if (this.table.shuiqing.date) {
        switch (tableType) {
          case "historyTable":
            var DTT = this.$FilterData
              .elDatePicker_Filter(this.table.shuiqing.date)
              .split(",");
            body.Time_min = DTT[1];
            body.Time_max = DTT[2];
            break;
          case "dayTable":
            var DTT = this.$FilterData
              .elDatePicker_Filter(this.table.shuiqing.date)
              .split(",");
            body.Time_min = DTT[1].substr(0,10);
            body.Time_max = DTT[2].substr(0,10);
            break;
          case "hourTable":
            console.log('~~~~~~~~~~~~~~~~~~~~~~~'+tableType);
            var DTT = this.$FilterData
              .elDatePicker_Filter(this.table.shuiqing.date)
              .split(",");
            body.Time_min = DTT[1];
            body.Time_max = DTT[2];
            break;
          case "monthTable":
            var DTT = this.$FilterData.elDatePicker_Filter(this.table.shuiqing.date,"monthTable").split(",");
            body.Time_min = DTT[1].substring(0,7);
            body.Time_max = DTT[2].substring(0,7);
            break;
        }
      }

      // 获取水库水情历史数据
      this.$GetData.Survey_History_SKSQ(
        tableType,
        body,
        {
          default: true,
          myFilter: data => {
            data.map(val => {
              val.currentPage = body._page;
              val.pageSizes = body._page_size;
              return val;
            });
            return data;
          }
        },
        data => {
          this.setTableTotal("shuiqing", data.total); // 根据返回的total数量, 设置表格总条数
          this.setTableData("shuiqing", data.data); // 更新水情历史数据表的数据
          body._page_size = 999999999;
          body._page = 1;
          this.$GetData.Survey_History_SKSQ(
            tableType,
            body,
            {
              default: true,
              myFilter: data => {
                data.map(val => {
                  val.currentPage = body._page;
                  val.pageSizes = body._page_size;
                  return val;
                });
                return data;
              }
            },
            chartData => {
              this.createChart_shuiqingshuju(
                "shuiqingChart",
                tableType,
                chartData.data
              ); // 水情表格
            }
          );

          this.cancelTableLoading("shuiqing"); // 取消表格加载
        }
      );
    },
    // 设置表格总条数
    setTableTotal(tableName, total) {
      this.table[tableName].total = total;
    },
    // 表格加载中
    letTableLoading(tableName) {
      this.table[tableName].loading = true;
    },
    // 取消表格加载
    cancelTableLoading(tableName) {
      this.table[tableName].loading = false;
    },
    // 绘图
    createChart_guanxiquxian(idName) {
      let myChart = this.$echarts.init(document.getElementById(idName));

      myChart.setOption({
        title: {
          // text: this.info.STNM
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["流量", "水位"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "00:00-02:00",
              "02:00-04:00",
              "04:00-06:00",
              "06:00-08:00",
              "08:00-10:00"
            ]
          }
        ],
        yAxis: [
          {
            name: "流量 m³/s",
            type: "value",
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            name: "水位 m",
            type: "value",
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],
        series: [
          {
            name: "流量",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10],
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "水位",
            type: "line",
            data: [1, 4, 2, 5, 3, 2, 0],
            yAxisIndex: 1,
            markLine: {
              data: [{ type: "average", name: "平均值" }],
              effect: {
                show: false,
                loop: true,
                period: 15,
                scaleSize: 10,
                color: null,
                shadowColor: null,
                shadowBlur: null
              }
            }
          }
        ]
      });
    },

    // 制图
    createChart_shuiqingshuju(id, tableType, data) {
      var ele = document.getElementById(id);

      if (data.length > 0) {
        var echartData = this.$App.transform_SKSQ_data_into_ehart_data(
          data,
          tableType,
          true
        ); // 水库水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        console.log(echartData);
        var y1max = 2525,
            y1min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y1.list));
        if(y1min>2514){
          y1min=2514;
        }
        echartData.y1.max=y1max;
        echartData.y1.min=y1min;
        var mintime=echartData.x.list[0].slice(0, 10),maxtime=echartData.x.list[echartData.x.list.length-1].slice(0, 10);
        var nowDate=new Date();
        var now=this.getNowDayString(nowDate);
        console.log(now);
        if(mintime==now && maxtime==now && tableType=='historyTable'){
            echartData.chartName = "今日水情图";
            for(var i=0;i<echartData.x.list.length;i++){
              var time = echartData.x.list[i].split(" ");
              echartData.x.list[i]=time[1];
            }
        }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==nowDate.getFullYear()){
            for(var i=0;i<echartData.x.list.length;i++){
              var time = echartData.x.list[i].substr(5);
              echartData.x.list[i]=time;
            }
        }
        switch (echartData.chartName) {
                case "历史表":
                    echartData.chartName="历史水情图";
                    break;
                case "小时表":
                    echartData.chartName="小时水情图";
                    break;
                case "日表":
                    echartData.chartName="日水情图";
                    break;
                case "月表":
                    echartData.chartName="月水情图";
                    break;
                case "年表":
                    echartData.chartName="年水情图";
                    break;
                }
        if (!this.chart.shuiqing) {
          this.chart.shuiqing = this.$echarts.init(ele);
        }
        this.chart.shuiqing.setOption({
          title: {
            text: echartData.chartName
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: [echartData.y1.name, echartData.y2.name],
            y: "bottom"
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              magicType: { show: true, type: ["line", "bar"] },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          animation: true,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: echartData.x.list,
            }
          ],
          yAxis: [
            {
              name: `水位 m`,
              type: "value",
              axisLabel: {
                formatter: "{value} "
              },
              max: echartData.y1.max,
              min: echartData.y1.min,
              scale: true
            }
          ],
          series: [
            {
              name: echartData.y1.name,
              type: "line",
              data: echartData.y1.list
            },
            {
              name: echartData.y2.name,
              type: "line",
              data: echartData.y2.list
            }
          ]
        });
      }else{
         var now=new Date();
         var nowday=this.getNowDayString(now);
         let time = this.$FilterData.elDatePicker_Filter(
          this.table.shuiqing.date
        );
        time = time.split(',');
        var begintime=time[1].slice(0,10);
        var endtime=time[2].slice(0,10);
        if(begintime==nowday && endtime==nowday){
          document.getElementById("noshuiqing").innerHTML = "暂无今天数据";
        }else{
          document.getElementById("noshuiqing").innerHTML = "暂无数据";
        }       
      }
    },
    // 加载站点数据
    loadSiteData(data) {
      this.siteInfo = data;
    },
    // 组件加载中
    componentLoading() {
      this.boxLoading = true;
    },
    // 取消组件加载
    cancelComponentLoading() {
      this.boxLoading = false;
    },
    // 处理页码切换_水位数据
    handleCurrentChange_shuiqing(index) {
      this.table["shuiqing"].currentPage = index;
      this.search_shuiqing(this.shuiqing_select);
    },
    // 处理页码切换_关系曲线
    handleCurrentChange_guanxiquxian(index) {
      this.table["guanxiquxian"].currentPage = index;
      this.search_guanxiquxian();
    },
    // 处理每页显示条数切换_水位数据
    handleSizeChange_shuiqing(pageSizes) {
      this.table["shuiqing"].pageSizes = pageSizes;
      this.table["shuiqing"].currentPage = 1;
      this.search_shuiqing(this.shuiqing_select);
    },
    // 处理每页显示条数切换_关系曲线
    handleSizeChange_guanxiquxian(pageSizes) {
      this.table["guanxiquxian"].pageSizes = pageSizes;
      this.table["guanxiquxian"].currentPage = 1;
      this.search_guanxiquxian();
    },
    // 分页过滤
    pageFilter(currentPage, pageSizes, tableName) {
      // 截取数组
      var newList = this.table[tableName].Rows_filter.slice(
        (currentPage - 1) * pageSizes,
        currentPage * pageSizes
      );

      return newList;
    },
    // 水情历史数据表 当前正在激活的表头
    setActiveColumns_shuiqing(tableType) {
        console.log(this.info);
        console.log(tableType);
        console.log(this.table.shuiqing.columns);
      this.table.shuiqing.activeColumns = this.table.shuiqing.columns[tableType];
      this.select.shuiqing_select = tableType
      console.log(this.table.shuiqing.activeColumns);
    },
    // 切换 水情历史数据表类型
    tableTypeOnChange_shuiqing(tableType) {
      console.log(this.table);
      console.log('............................'+tableType);
      this.tableType = tableType
      this.table["shuiqing"].currentPage = 1;
      this.table["shuiqing"].date = null;
      this.table["shuiqing"].sort = null;
        console.log(this.table);
      this.setDatePickerType_shuiqing(tableType); // 设置日期时间选择器的类型
      // this.select["shuiqing_select"] = tableType; // 设置选中的表
      // this.setSelectOption_quickSearch(tableType); // 设置数据表快速查询选择框内容
      this.setActiveColumns_shuiqing(tableType); // 设置水情历史数据表 当前激活的表头
      this.table.shuiqing.loading = true; // 表格加载中
      if (this[`setTableDefaultDate_shuiqing_${tableType}`]) {
        this[`setTableDefaultDate_shuiqing_${tableType}`]();
      }
      // 获取对应水情历史数据表的数据
      this.search_shuiqing(tableType);
    },
    // 设置水位数据历史表默认查询日期
    setTableDefaultDate_shuiqing_historyTable() {
      const end = new Date();
      const start = zeroPointOfTheDay();

      var timeSlot = [start, end];

      this.setTableDate("shuiqing", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 设置水位数据小时表默认查询日期
    setTableDefaultDate_shuiqing_hourTable() {
      const end = new Date();
      const start = zeroPointOfTheDay();

      var timeSlot = [start, end];

      this.setTableDate("shuiqing", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 设置水位数据日表默认查询日期
    setTableDefaultDate_shuiqing_dayTable() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

      var timeSlot = [start, end];

      this.setTableDate("shuiqing", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 设置水位数据月表默认查询日期
    setTableDefaultDate_shuiqing_monthTable() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 160);

      var timeSlot = [start, end];

      this.setTableDate("shuiqing", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 设置日期时间选择器的类型
    setDatePickerType_shuiqing(tableType) {
      var datePickerType;
      switch (tableType) {
        case "historyTable":
          datePickerType = "datetimerange";
          break;
        case "hourTable":
          datePickerType = "datetimerange";
          break;
        case "dayTable":
          datePickerType = "daterange";
          break;
        case "monthTable":
          datePickerType = "monthrange";
          break;
      }
      this.table["shuiqing"].datePickerType = datePickerType;
    },
    // 设置数据表快速查询选择框内容
    setSelectOption_quickSearch(tableType) {
      this.select.activeQuickSearchList = this.select.quickSearch[tableType];
      this.select.select = this.select.activeQuickSearchList[0]
        ? this.select.activeQuickSearchList[0].value
        : null; // 设置默认值为第一项
    },
    // 更新 XX 表格的数据
    setTableData(tableName, data) {
      this.table[tableName].Rows_filter = data;
    },
    // 获取对应关系曲线数据表的数据
    getTableData_guanxiquxian(callback) {
      this.axios
        .get(`/guanqu/admin/ST_ZQRL_B`, {
          params: {
            STCD: this.info.STCD
          }
        })
        .then(res => {
          var data = res.data.rows;
          if (typeof callback == "function") {
            callback(data);
          }
        });
    },
    // 更新水情历史数据表的数据
    setTableData_guanxiquxian(data) {
      this.table.guanxiquxian.Rows_filter = data;
    },
    // 根据关联编号获取关联站点
    getRelateSiteByRelateCode(callback) {
      var RELATECODE = this.info.RELATECODE;
      if (RELATECODE && RELATECODE != 0) {
        this.axios
          .get(`/guanqu/admin/ST_STBPRP_B`, {
            params: {
              RELATECODE: RELATECODE
            }
          })
          .then(res => {
            var data = res.data.rows;
            if (typeof callback == "function") {
              callback(data);
            }
          });
      }
    },
    // 根据行政区划编码获取行政区划
    getCompartmentByADDVCD(callback) {
      var ADDVCD = this.info.rowinfo.ADDVCD;
      if (ADDVCD && ADDVCD != "") {
        this.axios
          .get(`/guanqu/admin/WRP_AD_B`, {
            params: {
              AD_CD: ADDVCD
            }
          })
          .then(res => {
            var data = res.data.rows;
            if (typeof callback == "function") {
              callback(data);
            }
          });
      }
    },
    // 处理日期时间选择器确定事件_水位数据
    handleDatePickerChange(item) {
      this.table.shuiqing.currentPage = 1;
      this.shuiqing_select = this.tableType
      console.log(this.shuiqing_select);
      this.search_shuiqing(this.shuiqing_select);
    },
    // 设置水库水情预警信息
    set_SKSQ_alarmInfo(STCD) {
      console.warn("set_SKSQ_alarmInfo",STCD)
      this.$GetData.Survey_History_SKSQ(
        "alarmTable",
        {
          STCD: STCD,
        },
        true,
        data => {
          var yujingdata = data.data[0];

          this.yujingdata.FWL = yujingdata.FWL;
          this.yujingdata.FWL79 = yujingdata.FWL79;
          this.yujingdata.SJWL = yujingdata.SJWL;
          this.yujingdata.JYWL = yujingdata.JYWL;
        }
      );
    },
    // 设置 xx表格 时间选择器值
    setTableDate(tableName, val) {
      this.table[tableName].date = val;
    },
    // 排序
    sort_change_shuiqing(item) {
      this.table.shuiqing.sort = item;

      this.search_shuiqing(this.shuiqing_select);
    },
    // 查询降雨信息
    search_yuqing(tableType) {
        var tableType = tableType || this.select.yuqing_select;
        this.letTableLoading("yuqing"); // 表格加载中

        // 传递参数
        var body = {
            STCD: this.siteInfo.STCD,
            _page: this.table.yuqing.currentPage || 1,
            _page_size: this.table.yuqing.pageSizes || 20
        };

        // 如果有选择排序，则传递排序参数
        if (this.table.yuqing.sort) {
            var _sort = this.$FilterData.sort_Filter(this.table.yuqing.sort);
            if (_sort) {
                body._orderby = _sort;
            }
        } else {
            switch (tableType) {
                case "hourTable":
                    body._orderby = `DT `;
                    break;

                case "dayTable":
                    body._orderby = `dt `;
                    break;

                case "tenDaysTable":
                    body._orderby = `dt1 `;
                    break;

                case "monthTable":
                    body._orderby = `dt `;
                    break;

                case "yearTable":
                    body._orderby = `YR `;
                    break;
            }
        }

        // 如果有选择日期进行查询，根据表格类型传递参数
        if (this.table.yuqing.date && tableType !== "yearTable") {
            switch (tableType) {
                case "dayTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    console.log(DTT[1].substr(0,10),DTT[2].substr(0,10))
                    body.Time_min = DTT[1].substr(0,10);
                    body.Time_max = DTT[2].substr(0,10);
                    break;
                case "hourTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    body.Time_min = DTT[1];
                    body.Time_max = DTT[2];
                    break;
                case "tenDaysTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date)
                        .split(",");
                    body.Time_min = `${DTT[1].substr(0,7)}-01`;
                    body.Time_max = `${DTT[2].substr(0,7)}-01`;
                    break;
                case "monthTable":
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.yuqing.date, "monthTable")
                        .split(",");
                    body.Time_min = `${DTT[1].substr(0,7)}-01`;
                    body.Time_max = `${DTT[2].substr(0,7)}-01`;
                    break;

            }
        }

        if (tableType === "yearTable") {
            var start_year = this.table.yuqing.start_year;
            var end_year = this.table.yuqing.end_year;
            if (start_year) {
                var start = new Date(start_year),
                    end = end_year ? new Date(end_year) : new Date();
                body.Time_min = start.getFullYear()
                body.Time_max = end.getFullYear()
            }

        }

        // 获取雨情历史数据
        this.$GetData.Survey_History_YQ(
            tableType,
            body,
            {
                default: true,
                myFilter: data => {
                    data.map(val => {
                        val.currentPage = body._page;
                        val.pageSizes = body._page_size;
                        return val;
                    });
                    console.log(data);
                    return data;
                }
            },
            data => {

                this.setTableTotal("yuqing", data.total); // 根据返回的total数量, 设置表格总条数
                this.setTableData("yuqing", data.data); // 更新水情历史数据表的数据

                body._page_size = 999999999;
                body._page = 1;
                this.$GetData.Survey_History_YQ(
                    tableType,
                    body,
                    {
                        default: true,
                        myFilter: data => {
                            data.map(val => {
                                val.currentPage = body._page;
                                val.pageSizes = body._page_size;
                                return val;
                            });
                            return data;
                        }
                    },
                    chartData => {
                        console.log("chartData", chartData)
                        this.createChart_yuqingshuju(
                            "yuqingChart",
                            tableType,
                            chartData.data
                        ); // 雨情表格
                    }
                );


                let obj = {};
                obj.Time_max = body.Time_max;
                obj.Time_min = body.Time_min;
                obj.STCD = body.STCD;


                this.$GetData.statistics_rain_YQ(tableType, obj, false, (data) => {
                    console.log("data",data.data)
                    var d = data.data

                    // console.log(this);

                    this.jiangyu_tongji.rainSum = d.LeiJiYuLiang;
                    this.jiangyu_tongji.rainVag = d.PingJunJiangYu
                    this.jiangyu_tongji.rainMax = d.ZuiDaJiangYu

                })
                this.cancelTableLoading("yuqing"); // 取消表格加载
            }
        );
    },
    // 制图
    createChart_yuqingshuju(id, tableType, data) {
        var ele = document.getElementById(id);
        if (data.length > 0) {
            // 雨情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
            var echartData = this.$App.transform_YQ_data_into_ehart_data(data, tableType);

            echartData.x.list = echartData.x.list;
            var showname=echartData.chartName;
            var mintime=echartData.x.list[0].slice(0, 13),maxtime=echartData.x.list[echartData.x.list.length-1].slice(0, 13);
            var now=new Date();
            if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==now.getFullYear()){
              for(var i=0;i<echartData.x.list.length;i++){
                var time=echartData.x.list[i].substr(5);
                echartData.x.list[i]=time;
              }
            }
            if(tableType=="hourTable"){               
                var nowdate=this.getNowDayString(now);
                if(now.getHours()<8){
                    var day1 = new Date();
                    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
                    day1.setHours(8);
                    day1.setMinutes(0);
                    day1.setSeconds(0);
                    var lastday=this.getNowDayString(day1);
                    if(mintime>=lastday+" 08" && maxtime<=nowdate+" 0"+now.getHours()){
                        showname = "今日雨量图";
                    }
                }else{
                    if(mintime>=nowdate+" 00" && maxtime<=nowdate+" "+now.getHours()){
                        showname = "今日雨量图";
                        for(var i=0;i<echartData.x.list.length;i++){
                          var time=echartData.x.list[i].split(" ");
                          echartData.x.list[i]=time[1];
                        }
                    }
                }          
            }
             switch (echartData.chartName) {
                case "小时表":
                    if(showname!="今日雨量图"){
                      showname="小时雨量图";
                     }                  
                    break;
                case "日表":
                    showname="日雨量图";
                    break;
                case "月表":
                    showname="月雨量图";
                    break;
                case "旬表":
                    showname="旬雨量图";
                    break;
                case "年表":
                    showname="年雨量图";
                    break;
                }        
            if (!this.chart.yuqing) {
                this.chart.yuqing = this.$echarts.init(ele);
            }
            this.chart.yuqing.setOption({
                title: {
                    text: showname
                },
                tooltip: {
                    trigger: "axis"
                },
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

                        itemStyle: {
                            //通常情况下：
                            normal: {
                                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color: function (params) {

                                    switch (echartData.chartName) {
                                        case "小时表":
                                            if (params.data >= 25 && params.data < 50) return 'orange';
                                            if (params.data > 50) return 'red';
                                            return 'blue'
                                            break
                                        case "日表":
                                            if (params.data >= 25 && params.data < 50) return 'orange';
                                            if (params.data > 50) return 'red';
                                            return 'blue'
                                            break
                                        case "月表":
                                            if (params.data >= 100 && params.data < 250) return 'orange';
                                            if (params.data > 250) return 'red';
                                            return 'blue'
                                            break
                                        case "旬表":
                                            if (params.data >= 100 && params.data < 250) return 'orange';
                                            if (params.data > 250) return 'red';
                                            return 'blue'
                                            break
                                        case "年表":
                                            if (params.data >= 1400 && params.data < 1650) return 'orange';
                                            if (params.data > 1650) return 'red';
                                            return 'blue'
                                            break

                                    }
                                }
                            },
                        }
                    },
                ]
            });
            console.log("this.chart.yuqing.setOption",tableType)
        }else{
          var now=new Date();
        var nowday=this.getNowDayString(now);
         let time = this.$FilterData.elDatePicker_Filter(
          this.table.yuqing.date
        );
        time = time.split(',');
        var begintime=time[1].slice(0,10);
        var endtime=time[2].slice(0,10);
        if(begintime==nowday && endtime==nowday){
          document.getElementById("noyuqing").innerHTML = "暂无今天数据";
        }else{
          document.getElementById("noyuqing").innerHTML = "暂无数据";
        }       
      }
    },
    // 处理日期时间选择器确定事件_降雨数据
    yuqingDatePickerChange(item) {
        this.table.yuqing.currentPage = 1;
        this.search_yuqing(this.yqtableType);
    },
    // 处理每页显示条数切换_降雨数据
    handleSizeChange_yuqing(pageSizes) {
        this.table["yuqing"].pageSizes = pageSizes;
        this.table["yuqing"].currentPage = 1;
        this.search_yuqing(this.yqtableType);
    },
    // 处理页码切换_降雨数据
    handleCurrentChange_yuqing(index) {
        this.table["yuqing"].currentPage = index;
        this.search_yuqing(this.yqtableType);
    },
    // 排序
    sort_change_yuqing(item) {
        this.table.yuqing.sort = item;

        this.search_yuqing(this.yqtableType);
    },
    // 切换 雨情历史数据表类型
    tableTypeOnChange_yuqing(tableType) {
        console.log(tableType)
        let tabName = ''
        switch (tableType) {
            case 'hourTable':
                tabName = '小时';
                break
            case 'dayTable':
                tabName = '日';
                break
            case  'tenDaysTable':
                tabName = '旬';
                break
            case  'monthTable':
                tabName = '月';
                break
            case  'yearTable':
                tabName = '年'
        }
        this.biao_yuqing = tabName;
        this.table["yuqing"].currentPage = 1;
        this.table["yuqing"].date = null;
        this.table["yuqing"].sort = null;
        this.yqtableType = tableType;
        this.setDatePickerType_yuqing(tableType); // 设置日期时间选择器的类型
        this.setActiveColumns_yuqing(tableType); // 设置水情历史数据表 当前激活的表头
        this.table.yuqing.loading = true; // 表格加载中
        if (this[`setTableDefaultDate_yuqing_${tableType}`]) {
            this[`setTableDefaultDate_yuqing_${tableType}`]();
        }
        // 获取对应水情历史数据表的数据
        this.search_yuqing(tableType);
    },
    // 设置降雨数据历史表默认查询日期
            setTableDefaultDate_yuqing_historyTable() {
                const end = new Date();
                const start = eightPointOfTheDay();

                var timeSlot = [start, end];

                this.setTableDate("yuqing", timeSlot);

                function eightPointOfTheDay() {
                    var date = new Date();
                    date.setHours(8);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 设置降雨数据小时表默认查询日期
            setTableDefaultDate_yuqing_hourTable() {
                const end = new Date();
                const start = eightPointOfTheDay();
                // console.log(end.getHours());


                var timeSlot = [start, end];

                this.setTableDate("yuqing", timeSlot);


                function eightPointOfTheDay() {
                    var date = new Date();
                    date.setHours(8);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 设置降雨数据日表默认查询日期
            setTableDefaultDate_yuqing_dayTable() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

                var timeSlot = [start, end];

                this.setTableDate("yuqing", timeSlot);

                function zeroPointOfTheDay() {
                    var date = new Date();
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 设置降雨数据旬表默认查询日期
            setTableDefaultDate_yuqing_tenDaysTable() {
                const end = new Date();
                const start = new Date();
                console.log(start.getTime());
                if(start.getHours() < 8){
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6);
                }
                var timeSlot = [start, end];

                this.setTableDate("yuqing", timeSlot);

                function zeroPointOfTheDay() {
                    var date = new Date();
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 设置降雨数据月表默认查询日期
            setTableDefaultDate_yuqing_monthTable() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 160);

                var timeSlot = [start, end];

                this.setTableDate("yuqing", timeSlot);

                function zeroPointOfTheDay() {
                    var date = new Date();
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 设置降雨数据旬表默认查询日期
            setTableDefaultDate_yuqing_tenDaysTable() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);

                var timeSlot = [start, end];

                this.setTableDate("yuqing", timeSlot);

                function zeroPointOfTheDay() {
                    var date = new Date();
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 设置降雨数据旬表默认查询日期
            setTableDefaultDate_yuqing_yearTable() {
                const end = new Date();
                const start = new Date();
                console.log(start.getHours(),start.getTime());
                if(start.getHours() < 8){
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12 * 5);
                }

                var timeSlot = [start, end];

                this.setTableDate("yuqing", timeSlot);

                function zeroPointOfTheDay() {
                    var date = new Date();
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
     // 设置日期时间选择器的类型
    setDatePickerType_yuqing(tableType) {
        var datePickerType;
        switch (tableType) {
            case "historyTable":
                datePickerType = "datetimerange";
                break;
            case "hourTable":
                datePickerType = "datetimerange";
                break;
            case "dayTable":
                datePickerType = "daterange";
                break;
            case "tenDaysTable":
                datePickerType = "monthrange";
                break;
            case "monthTable":
                datePickerType = "monthrange";
                break;
            case "yearTable":
                datePickerType = "yearrange";
                this.table.yuqing.start_year = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 365 * 5);
                this.table.yuqing.end_year = new Date();
                break;
        }
        this.table["yuqing"].datePickerType = datePickerType;
    },
    setActiveColumns_yuqing(tableType) {
        console.log('********',tableType);
        this.table.yuqing.activeColumns = this.table.yuqing.columns[tableType];
        this.select.yuqing_select = tableType;
    },
    // 处理日期时间选择器确定事件_状态数据
    zhuangtaiDatePickerChange(item) {
      this.table.zhuangtaishuju.currentPage = 1;
      this.search_StationStatus();
    },
    // 更新电压历史数据表的数据
    setTableData_zhuangtaishuju(data) {
      this.table.zhuangtaishuju.Rows_filter = data;
      console.log(685,data);
    },
    setTableTotal_zhuangtaishuju(total) {
      this.table.zhuangtaishuju.total = total;
    },
    // 查询运行工况状态数据历史表
    search_StationStatus() {
      this.letTableLoading("zhuangtaishuju"); 
      var body = {
        _page: this.table["zhuangtaishuju"].currentPage || 1,
        _page_size: this.table["zhuangtaishuju"].pageSizes || 20,
        STCD: this.info.STCD
      };

      // 如果有选择日期进行查询，根据表格类型传递参数
      if (this.table.zhuangtaishuju.date) {
        let time = this.$FilterData.elDatePicker_Filter(
          this.table.zhuangtaishuju.date
        );
        time = time.split(',')
        body.Time_min = time[1]
        body.Time_max = time[2]
        // console.log(body.TM.split());
      }
      // debugger;
      this.$GetData.Survey_History_YXGK(
        "historyTable",
        body,
        {
          default: true,
          myFilter: data => {
            data.map(val => {
              val.currentPage = body._page;
              val.pageSizes = body._page_size;
              return val;
            });
            return data;
          }
        },
        data => {
          this.setTableTotal_zhuangtaishuju(data.total); // 设置状态数据表格总条数
          this.setTableData_zhuangtaishuju(data.data); // 更新状态数据表的数据
          body._page_size = 999999999;
          body._page = 1;
          this.$GetData.Survey_History_YXGK(
            "historyTable",
            body,
            {
              default: true,
              myFilter: data => {
                data.map(val => {
                  val.currentPage = body._page;
                  val.pageSizes = body._page_size;
                  return val;
                });
                return data;
              }
            },
            chartData => {
              this.createChart_zhuangtaishuju(
                "zhuangtaishujuChart",
                "zhuangtaishuju",
                chartData.data
              ); // 电压线型图
            }
          );
          this.cancelTableLoading("zhuangtaishuju");
        }
      );
    },
    // 设置状态数据表默认查询日期
    setTableDefaultDate_zhuangtaishuju() {
      var timeSlot = this.$App.zeroPointToNowOfTheDay();

      this.setTableDate("zhuangtaishuju", timeSlot);
    },
     // 处理日期时间选择器确定事件_状态数据
    zhuangtaiDatePickerChange(item) {
      this.table.zhuangtaishuju.currentPage = 1;
      this.search_StationStatus();
    },
    // 处理页码切换
    handleCurrentChange_zhuangtaishuju(index) {
      this.table["zhuangtaishuju"].currentPage = index;
      this.search_StationStatus();
    },
    // 处理每页显示条数切换
    handleSizeChange_zhuangtaishuju(pageSizes) {
      this.table["zhuangtaishuju"].pageSizes = pageSizes;
      this.table["zhuangtaishuju"].currentPasge = 1;
      this.search_StationStatus();
    },
    //返回日期
    getNowDayString(now){
      return now.getFullYear()+"-"+((now.getMonth()+1)<10?"0"+(now.getMonth()+1):(now.getMonth()+1))+"-"+(now.getDate()<10?"0"+now.getDate():now.getDate());
    },
     // 制图——电压线型图
    createChart_zhuangtaishuju(id, tableType, data) {
      var ele = document.getElementById(id);

      if (data.length > 0) {
        var echartData = this.$App.transform_YXGK_data_into_ehart_data(
          data,
          tableType
        ); // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        var mintime=echartData.x.list[0].slice(0, 10),maxtime=echartData.x.list[echartData.x.list.length-1].slice(0, 10);
        var now=new Date();
        var nowday=this.getNowDayString(now);
        echartData.chartName="电压图";
        if(mintime==nowday && maxtime==nowday){
            echartData.chartName = "今日电压图";
            for(var i=0;i<echartData.x.list.length;i++){
              var time=echartData.x.list[i].split(" ");
              echartData.x.list[i]=time[1];
            }
        }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==now.getFullYear()){
          for(var i=0;i<echartData.x.list.length;i++){
              var time=echartData.x.list[i].substr(5);
              echartData.x.list[i]=time;
            }
        }
        if (!this.chart.zhuangtaishuju) {
          this.chart.zhuangtaishuju = this.$echarts.init(ele);
        }
        this.chart.zhuangtaishuju.setOption({
          title: {
            text: echartData.chartName
          },
          tooltip: {
            trigger: "axis"
          },
           legend: {
             data: [echartData.y1.name],
             y: "bottom"
           },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              magicType: { show: true, type: ["line", "bar"] },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          animation: true,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: echartData.x.list
            }
          ],
          yAxis: [
            {
              name: `${echartData.y1.name} V`,
              type: "value",
              axisLabel: {
                formatter: "{value} "
              },
              max: echartData.y1.max,
              min: echartData.y1.min
            }
          ],
          series: [
            {
              name: echartData.y1.name,
              type: "line",
              data: echartData.y1.list
            }
          ]
        });
      }else{
        var now=new Date();
        var nowday=this.getNowDayString(now);
         let time = this.$FilterData.elDatePicker_Filter(
          this.table.zhuangtaishuju.date
        );
        time = time.split(',');
        var begintime=time[1].slice(0,10);
        var endtime=time[2].slice(0,10);
        if(begintime==nowday && endtime==nowday){
          document.getElementById("nozhuangtaishuju").innerHTML = "暂无今天数据";
        }else{
          document.getElementById("nozhuangtaishuju").innerHTML = "暂无数据";
        }       
      }
    },
    handleDatePickerChange_guanxiquxian(item) {
      this.search_guanxiquxian();
    },
    // 查询关系曲线表格
    search_guanxiquxian() {
      //this.letTableLoading("guanxiquxian");
      // 传递参数
      // var body = {
      //   STCD: this.siteInfo.STCD,
      //   _page: this.table["guanxiquxian"].currentPage || 1,
      //   _page_size: this.table["guanxiquxian"].pageSizes || 20
      // };
      const end = new Date();
      const start = zeroPointOfTheDay();

      var timeSlot = [start, end];

      this.setTableDate("guanxiquxian", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
      this.loadkrlineBydate();
      // this.$GetData.Base_MonitoringSites(
      //   "Z_Q_relation",
      //   body,
      //   {
      //     default: true,
      //     myFilter: data => {
      //       data.map(val => {
      //         val.currentPage = body._page;
      //         val.pageSizes = body._page_size;
      //         return val;
      //       });
      //       return data;
      //     }
      //   },
      //   data => {
      //     this.setTableTotal("guanxiquxian", data.total);
      //     this.setTableData("guanxiquxian", data.data);
      //     this.cancelTableLoading("guanxiquxian");
      //   }
      // );
    },
     //绘制带条件的库容曲线
    loadkrlineBydate(){
      var obj={
        begintime:this.table.guanxiquxian.date[0],
        endtime:this.table.guanxiquxian.date[1],
        sitename:this.siteInfo.STCD
      };
       this.axios.get('/fieldinfo/swkrdatabydate',{params:obj}).then(res => {
            var _data = res.data; // 数据深拷贝
           _data= _data.map(val => {
              val.currentPage = 1;
              val.pageSizes = 20;
              return val;
            });
            this.setTableData("guanxiquxian", _data);
            this.setTableTotal("guanxiquxian", _data.length);
            this.table["guanxiquxian"].currentPage=1;
            this.table["guanxiquxian"].pageSizes=20;
            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                markdata:[],
            }
                    // y1轴
                    echartData.y1.name = "水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    //设置markLine
                    var jhsw=new Object();
                    jhsw.name='校核水位 '+2524.12;
                    jhsw.yAxis=2524.12;
                    jhsw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'orange'
                    }
                    echartData.markdata.push(jhsw);
                    var zcsw=new Object();
                    zcsw.name='正常蓄水位 '+2520.2;
                    zcsw.yAxis=2520.2;
                    zcsw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'orange'
                    }
                    echartData.markdata.push(zcsw);
                    var y1max = 2525,
                        y1min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y1.list));
                    if(y1min>2514){
                      y1min=2514;
                    }else{
                      var ssw=new Object();
                      ssw.name='死水位 '+2514;
                      ssw.yAxis=2514;
                      ssw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'orange'
                    }
                      echartData.markdata.push(ssw);
                    }
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "库容"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "W", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = Math.ceil(FilterMethods.methods.get_echart_max(echartData.y2.list)),
                        y2min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y2.list));
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });
                    var datalist1=[];
                    var datalist2=[];
                    for(var i=0;i<echartData.x.list.length;i++){
                      var obj_data1=[echartData.x.list[i],echartData.y1.list[i]];
                      datalist1.push(obj_data1);
                      var obj_data2=[echartData.x.list[i],echartData.y2.list[i]];
                      datalist2.push(obj_data2);
                    }
                    echartData.y1.list=datalist1;
                    echartData.y2.list=datalist2;
            this.createKrchart(echartData);
        });
    },
    //带条件的库容曲线
    createKrchart(echartData){
      var myChart = this.$echarts.init(document.getElementById("guanxiChart"));
      myChart.setOption({
        title: { text: "" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
         }
        },
        legend: {
          data: [ echartData.y1.name, echartData.y2.name ]
        },
        axisPointer: {
        link: {xAxisIndex: 'all'}
        },
        grid: [{
        left: 38,
        right: 18,
        height: '34%'
        }, {
        left: 38,
        right: 18,
        top: '60.1%',
        height: '33.5%'
       }],
        xAxis: [
        {
            type: 'time',
            boundaryGap: false,
            data: echartData.x.list,
            //axisLabel:{interval:parseInt(echartData.x.list.length/5),rotate:0},
        },
        {
            gridIndex: 1,
            type: 'time',
            boundaryGap: false,
            data: echartData.x.list,
            position: 'bottom'
        }
        ],
        yAxis: [
          {
            name: echartData.y1.name+'(m)',
            type: "value",
            minInterval:1, 
            min:echartData.y1.min,
            max:echartData.y1.max
          },
          {
            gridIndex: 1,
            name: echartData.y2.name+'(万m³)',
            type: "value",
            minInterval:1, 
            min:200,
            max:1000
          }
        ],
        series: [
          {
            name: echartData.y1.name,
            type: "line",
            yAxisIndex: 0,
            smooth:true,
            data:echartData.y1.list,
            markLine : {
                symbol:'none',
                itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'orange',
                                    }  
                                }  
                            },
                data : echartData.markdata,
            },
          },
          {
            name: echartData.y2.name,
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth:true,
            data:echartData.y2.list
          }
        ]
      });
    },
},
  mounted() {
    // 组件加载中
    console.log(this.info);
      this.componentLoading();
    this.shuiqing_select = this.info.rowinfo.tableType.sksq;
    this.yuqing_select=this.info.rowinfo.tableType.yq;
    var showtab=this.info.rowinfo.tableType.clicktype;
    if(showtab=="yxgk"){
      this.activeName="zhuangtaishuju";
    }
    if(showtab=="yq"){
      this.activeName="yuqing";
    }
    if(showtab=="sksq"){
      this.activeName="shuiqingshuju";
    }
    if(showtab=="home"){
      if(this.info.rowinfo.skstatus==0){
        this.activeName="shuiqingshuju";
      }else if(this.info.rowinfo.status==0){
        this.activeName="yuqing";
      }else if(this.info.rowinfo.gkstatus==0){
        this.activeName="zhuangtaishuju";
      }
    }
    this.ZCDY.VOLMIN = this.info.rowinfo.VOLMIN;
    this.ZCDY.VOLMAX = this.info.rowinfo.VOLMAX;
    var level=0,color="#606266";
    if(level<this.info.rowinfo.SIGN1){
        level=this.info.rowinfo.SIGN1;
    }
    if(level<this.info.rowinfo.SIGN3){
        level=this.info.rowinfo.SIGN3;
    }
    if(level<this.info.rowinfo.SIGN6){
        level=this.info.rowinfo.SIGN6;
    }
    if(level<this.info.rowinfo.SIGN12){
        level=this.info.rowinfo.SIGN12;
    }
    if(level<this.info.rowinfo.SIGN24){
        level=this.info.rowinfo.SIGN24;
    }
    if(level==0){
      this.jiangyu_warm.LEVEL="无";
      this.jiangyu_warm.COLOR="#606266";
    }
    if(level==1){
      this.jiangyu_warm.LEVEL="黄色预警";
      this.jiangyu_warm.COLOR="yellow";
    }
    if(level==2){
      this.jiangyu_warm.LEVEL="橙色预警";
      this.jiangyu_warm.COLOR="orange";
    }
    if(level==3){
      this.jiangyu_warm.LEVEL="红色预警";
      this.jiangyu_warm.COLOR="red";
    }
    this.jiangyu_warm.SIGN1=this.info.rowinfo.SIGN1;
    this.jiangyu_warm.SIGN3=this.info.rowinfo.SIGN3;
    this.jiangyu_warm.SIGN6=this.info.rowinfo.SIGN6;
    this.jiangyu_warm.SIGN12=this.info.rowinfo.SIGN12;
    this.jiangyu_warm.SIGN24=this.info.rowinfo.SIGN24;
    this.jiangyu_warm.RAIN1=this.info.rowinfo.RAIN1+"mm";
    this.jiangyu_warm.RAIN3=this.info.rowinfo.RAIN3+"mm";
    this.jiangyu_warm.RAIN6=this.info.rowinfo.RAIN6+"mm";
    this.jiangyu_warm.RAIN12=this.info.rowinfo.RAIN12+"mm";
    this.jiangyu_warm.RAIN24=this.info.rowinfo.RAIN24+"mm";
    // 获取详情数据
    this.axios
      .get(`/guanqu/table/details?ID=${this.info.rowinfo.STCD}&pk=STCD`)
      .then(res => {
        //获取预警数据
        this.axios.get('/guanqu/table/ST_RSV_Alarm?STCD='+res.data.STCD).then(res =>{
            console.log(res);
            this.yujingdata = res.data.list[0];
          this.yujingdata.FWL = this.Z_Filter(this.yujingdata.FWL);
          this.yujingdata.FWL79 = this.Z_Filter(this.yujingdata.FWL79);
        });

        // 站点信息
        // 根据关联编号获取关联站点
        this.getRelateSiteByRelateCode(data => {
          console.log("RelateSite", data);
        });
        // 根据行政区划码获取行政区划名
        this.getCompartmentByADDVCD(data => {
          this.siteInfo.AD_NM = data[0].AD_NM;
        });

        // 根据河流编码获取河流名
        this.$GetData.Base_R_I(
          {
            RVCD: this.info.rowinfo.RVCD
          },
          true,
          data => {
            this.siteInfo.RVCD = data.data[0].RVNM;
          }
        );

        // 根据流域编码获取流域名
        this.$GetData.Base_B_I(
          {
            CTCD: this.info.rowinfo.CTCD
          },
          true,
          data => {
            this.siteInfo.CTCD = data.data[0].CTNM;
          }
        );
        console.log(res.data);
        // 加载站点数据
        this.loadSiteData(res.data);
        // 加载取消
        this.cancelComponentLoading();
        // 水位数据
          this.tableTypeOnChange_shuiqing(this.info.rowinfo.tableType.sksq); // 设置 默认的水情历史数据表
        // 设置水库水情预警信息
        this.set_SKSQ_alarmInfo(this.siteInfo.STCD);

        this.tableTypeOnChange_yuqing(this.info.rowinfo.tableType.yq); // 设置 默认的雨情历史数据表

        // 设置状态数据表默认查询日期
        this.setTableDefaultDate_zhuangtaishuju();
        // 查询状态数据表的数据
        this.search_StationStatus();
        // 关系曲线
        this.search_guanxiquxian();

      });
  }
};
</script>

<style lang="less" scope>
@import "./common/common.less";
.el-tabs{
  .el-tabs__item{
    padding:0 9px;
  }
}
.site_detail {
  td {
    height: 32px;
    border-top: none;
    border-color: #EBEEF5;
  }

  .dt_name {
    width: 20%;
    border-left: none;
  }

  .dt_vale {
    width: 30%;
    border-right: none;
    border-left: none;
  }
}
.drawer-profile {
  font-size: @siteInfoFontSize;
  position: relative;
  .outPutButton {
    position: absolute;
    right: -10px;
    top: -45px;
    z-index: 2;
  }
  .row_header {
    text-align: center;
    font-size: 1.5625rem;
    font-weight: 700;
  }

  .relationRow {
    margin-top: 1.25rem;
    button {
      margin-right: 1.25rem;
    }
  }
  .checkBoxItem {
    margin: 0 0.9375rem;
  }
}
</style>
