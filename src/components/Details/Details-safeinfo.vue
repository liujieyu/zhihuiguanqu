<template>
  <div v-loading="boxLoading">
    <el-tabs type="border-card" v-model="activeName" @tab-click>
      <!-- 渗流量数据 -->
      <el-tab-pane name="shenliuliang" v-if="select.sllmpsdList.length>0">
        <span slot="label">
          <Icon type="md-flash" style="font-size:20px" />渗流量
        </span>
        <div class="drawer-profile">
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
                      v-model="table.shenliuliang.date"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="handleDatePickerChange"
                      :picker-options="table.shenliuliang.datePickerOptions['historyTable']"
                      unlink-panels
                      type="datetimerange"
                      size="mini"
                      style="min-width: 360px"
                    ></el-date-picker>
                  </Col>
                </Row>
                <!-- 分割线 -->
                 <div class="divider"></div>
                  <Row :gutter="16" type="flex" justify="center" align="middle">
                    <Col span="12">
                      渗流阈值: {{base.sllInfo.spprwl}} L/s
                    </Col>
                    <Col span="12">
                      测量最小值：{{base.sllInfo.tdmin}} L/s
                    </Col>
                  </Row>
                <!-- 分割线 -->
                <div class="divider"></div>
            <!-- 选项卡 -->
            <Tabs type="card">
                <TabPane label="渗流曲线图">
                    <!-- 绘图 -->
                    <div
                    id="shenliuliangChart"
                    v-show="table.shenliuliang.Rows_filter.length > 0"
                    :style="{width: '540px', height: '400px',margin: 'auto'}"
                    >
                    </div>
                    <div id="noshenliuliang"
                    v-show="table.shenliuliang.Rows_filter.length == 0"
                    :style="{width: '540px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                    ></div>
                </TabPane>
              <!-- 表格 -->
              <TabPane label="渗流数据">
                <!-- 表格用于展示数据 -->
                <div>
                  <Table
                    :columns="table.shenliuliang.columns"
                    :data="table.shenliuliang.Rows_filter"
                    :loading="table.shenliuliang.loading"
                    border
                    size="small"
                    :height="table.shenliuliang.height"
                    @on-sort-change="sort_change_shenliuliang"
                  ></Table>
                  <!-- 分割线 -->
                  <div class="divider"></div>
                  <!-- 分页器 -->
                  <el-pagination
                    background
                    :page-size="table.shenliuliang.pageSizes"
                    layout="sizes, total, prev, pager, next, jumper "
                    :page-sizes="[20, 50, 100, 200]"
                    :total="table.shenliuliang.total"
                    :pager-count="5"
                    :current-page="table.shenliuliang.currentPage"
                    @current-change="handleCurrentChange_shenliuliang"
                    @size-change="handleSizeChange_shenliuliang"
                    class="pageController"
                    small
                  ></el-pagination>
                  <!-- 分割线 -->
                  <div class="divider"></div>
                </div>
              </TabPane>
              <!-- 测站编号选择框 -->
              <Select
                @on-change="tableTypeOnChange_shenliuliang"
                prefix="ios-calendar-outline"
                v-model="select.shenliuliang_select"
                slot="extra"
              >
                <Option
                  v-for="item in select.sllmpsdList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                ></Option>
              </Select>
            </Tabs>

          </div>
        </div>
      </el-tab-pane>
       <!-- 渗流压力数据 -->
            <el-tab-pane name="shenliuyali" v-if="select.slylmpsdList.length>0">
        <span slot="label">
          <Icon type="md-analytics" style="font-size:20px"/>渗流压力
        </span>
                <div class="drawer-profile">
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
                                                v-model="table.shenliuyali.date"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                @change="shenliuyaliDatePickerChange"
                                                :picker-options="table.shenliuyali.datePickerOptions['historyTable']"
                                                unlink-panels
                                                type="datetimerange"
                                                size="mini"
                                                style="min-width: 360px"
                                        ></el-date-picker>
                                    </Col>
                                </Row>
                                <!-- 分割线 -->
                                <div class="divider"></div>
                                <Row :gutter="16" type="flex" justify="end" align="middle">
                                    <Col span="12">
                                        渗压阈值:{{base.sygInfo.pztbtel}}m
                                    </Col>
                                    <Col span="12">
                                        监测部位:{{base.sygInfo.msps}}
                                    </Col>
                                </Row>
                                 <!-- 分割线 -->
                                <div class="divider"></div>
                        <!-- 选项卡 -->
                        <Tabs type="card">
                            <TabPane label="渗压曲线图">
                                <!-- 绘图 -->
                                <div v-show="table.shenliuyali.Rows_filter.length > 0" id="shenliuyaliChart" :style="{width: '540px', height: '400px',margin: 'auto'}"></div>
                                <div id="noshenliuyali"
                                        v-show="table.shenliuyali.Rows_filter.length == 0"
                                        :style="{width: '540px', height: '400px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                                >
                                </div>
                            </TabPane>
                            <!-- 表格 -->
                            <TabPane label="渗压数据">
                                <!-- 表格用于展示数据 -->
                                <div>
                                    <Table
                                            :columns="table.shenliuyali.columns"
                                            :data="table.shenliuyali.Rows_filter"
                                            :loading="table.shenliuyali.loading"
                                            border
                                            size="small"
                                            :height="table.shenliuyali.height"
                                            @on-sort-change="sort_change_shenliuyali"
                                    ></Table>
                                    <!-- 分割线 -->
                                    <div class="divider"></div>
                                    <!-- 分页器 -->
                                    <el-pagination
                                            background
                                            :page-size="table.shenliuyali.pageSizes"
                                            layout="sizes, total, prev, pager, next, jumper "
                                            :page-sizes="[20, 50, 100, 200]"
                                            :total="table.shenliuyali.total"
                                            :pager-count="5"
                                            :current-page="table.shenliuyali.currentPage"
                                            @current-change="handleCurrentChange_shenliuyali"
                                            @size-change="handleSizeChange_shenliuyali"
                                            class="pageController"
                                            small
                                    ></el-pagination>
                                    <!-- 分割线 -->
                                    <div class="divider"></div>
                                </div>
                            </TabPane>
                            <!-- 测站列表选择框 -->
                            <Select
                                    @on-change="tableTypeOnChange_shenliuyali"
                                    prefix="ios-calendar-outline"
                                    v-model="select.shenliuyali_select"
                                    slot="extra"
                            >
                                <Option
                                        v-for="item in select.slylmpsdList"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                ></Option>
                            </Select>
                        </Tabs> 
                    </div>
                </div>
            </el-tab-pane>
             <!-- 位移变形 -->
            <el-tab-pane name="weiyibianxing" v-if="select.wybxmpsdList.length>0">
                <span slot="label">
                <Icon type="md-swap" style="font-size:20px"/>位移变形
                </span>
                <div class="drawer-profile">
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
                            v-model="table.weiyibianxing.date"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="weiyibianxingDatePickerChange"
                            :picker-options="table.weiyibianxing.datePickerOptions"
                            unlink-panels
                            type="datetimerange"
                            size="mini"
                            style="min-width: 360px"
                            ></el-date-picker>
                        </Col>
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <Row :gutter="16" type="flex" justify="center" align="middle">
                                    <Col span="8">
                                        位移阈值:{{base.wybxInfo.xyhrds}}mm
                                    </Col>
                                    <Col span="8">
                                        基准值X:{{base.wybxInfo.stvlx}}m
                                    </Col>
                                    <Col span="8">
                                        基准值Y:{{base.wybxInfo.stvly}}m
                                    </Col>
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                    <!-- 选项卡 -->
                    <Tabs type="card">
                    <TabPane label="位移曲线图">
                        <!-- 绘图 -->
                        <div
                        v-show="table.weiyibianxing.Rows_filter.length > 0"
                        id="weiyibianxingChart"
                        :style="{width: '540px', height: '450px',margin: 'auto'}"
                        ></div>
                        <div id="noweiyibianxing"
                        v-show="table.weiyibianxing.Rows_filter.length == 0"
                        :style="{width: '540px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                        ></div>
                    </TabPane>
                    <!-- 表格 -->
                    <TabPane label="位移数据">
                        <!-- 表格用于展示数据 -->
                        <div>
                        <Table
                            :columns="table.weiyibianxing.columns"
                            :data="table.weiyibianxing.Rows_filter"
                            :loading="table.weiyibianxing.loading"
                            border
                            size="small"
                            :height="table.weiyibianxing.height"
                        ></Table>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <!-- 分页器 -->
                        <el-pagination
                            background
                            :page-size="table.weiyibianxing.pageSizes"
                            layout="sizes, total, prev, pager, next, jumper "
                            :page-sizes="[20, 50, 100, 200]"
                            :total="table.weiyibianxing.total"
                            :pager-count="5"
                            :current-page="table.weiyibianxing.currentPage"
                            @current-change="handleCurrentChange_weiyibianxing"
                            @size-change="handleSizeChange_weiyibianxing"
                            class="pageController"
                            small
                        ></el-pagination>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        </div>
                    </TabPane>
                    <!-- 测站列表选择框 -->
                            <Select
                                    @on-change="tableTypeOnChange_weiyibianxing"
                                    prefix="ios-calendar-outline"
                                    v-model="select.weiyibianxing_select"
                                    slot="extra"
                            >
                                <Option
                                        v-for="item in select.wybxmpsdList"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                ></Option>
                            </Select>
                    </Tabs>
                </div>
                </div>
            </el-tab-pane>
             <!-- 沉降变形 -->
            <el-tab-pane name="chenjiangbianxing" v-if="select.cjbxmpsdList.length>0">
                <span slot="label">
                <Icon type="md-trending-down" style="font-size:20px"/>沉降变形
                </span>
                <div class="drawer-profile">
                    <div>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <Row :gutter="16" type="flex" justify="end" align="middle">
                        <Col span="2">
                            <span style="letter-spacing:2px">查询</span>
                        </Col>
                        <!-- 时间选择 -->
                        <Col span="19">
                        <el-date-picker
                            v-model="table.chenjiangbianxing.date"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="handleDatePickerChange_chenjiangbianxing"
                            :picker-options="table.chenjiangbianxing.datePickerOptions"
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
                        <Row :gutter="16" type="flex" justify="center" align="middle">
                                    <Col span="12">
                                        位移阈值:{{base.cjbxInfo.vrds}}mm
                                    </Col>
                                    <Col span="12">
                                        初始高程:{{base.cjbxInfo.inel}}m
                                    </Col>
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                <Tabs type="card">
                    <TabPane label="沉降曲线图">
                    <!-- 绘图 -->
                    <div
                        v-show="table.chenjiangbianxing.Rows_filter.length > 0"
                        id="chenjiangbianxingChart"
                        :style="{width: '540px', height: '400px',margin: 'auto'}"
                        ></div>
                        <div id="nochenjiangbianxing"
                        v-show="table.chenjiangbianxing.Rows_filter.length == 0"
                        :style="{width: '540px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                        ></div>
                    </TabPane>
                    <TabPane label="沉降数据">
                    <!-- 表格用于展示数据 -->
                    <div>
                        <Table
                        :columns="table.chenjiangbianxing.columns"
                        :data="table.chenjiangbianxing.Rows_filter"
                        :loading="table.chenjiangbianxing.loading"
                        border
                        size="small"
                        :height="table.chenjiangbianxing.height"
                        ></Table>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <!-- 分页器 -->
                        <el-pagination
                        background
                        :page-size="20"
                        layout="total, prev, pager, next, jumper"
                        :total="table.chenjiangbianxing.total"
                        :pager-count="5"
                        :current-page="table.chenjiangbianxing.currentPage"
                        @current-change="handleCurrentChange_chenjiangbianxing"
                        @size-change="handleSizeChange_chenjiangbianxing"
                        class="pageController"
                        small
                        ></el-pagination>
                    </div>
                    <!-- 分割线 -->
                    <div class="divider"></div>
                    </TabPane>
                    <!-- 测站列表选择框 -->
                      <Select
                              @on-change="tableTypeOnChange_chenjiangbianxing"
                              prefix="ios-calendar-outline"
                              v-model="select.chenjiangbianxing_select"
                              slot="extra"
                      >
                          <Option
                                  v-for="item in select.cjbxmpsdList"
                                  :label="item.label"
                                  :value="item.value"
                                  :key="item.value"
                          ></Option>
                      </Select>
                </Tabs>
                </div>
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
                  <td align="center" class="dt_vale">{{ info.rowinfo.adnm.replace("|","") || "&nbsp;" }}</td>
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
            </div>
            <!-- 分割线 -->
            <div class="divider"></div>
            <Tabs type="card">
                    <TabPane label="断面">
                      <Row :gutter="16" type="flex" justify="center" align="middle">
                        <COL span="5">                            
                            断面编号：
                          </COL>
                          <COL span="19">
                          <Select style="width:130px;margin-right:265px;"
                              @on-change="tableTypeOnChange_Duanmian"
                              prefix="ios-calendar-outline"
                              v-model="select.duanmian_select"
                              slot="extra"
                           >
                          <Option
                                  v-for="item in select.duanmianList"
                                  :label="item.label"
                                  :value="item.value"
                                  :key="item.value"
                          ></Option>
                      </Select>
                        </COL>
                      </Row>
                      <!-- 分割线 -->
                     <div class="divider"></div>
                     <table
                        style="border: 1px solid #EBEEF5"
                        border
                        cellspacing="0"
                        width="100%"
                        class="site_detail"
                      >
                        <tr>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.dmInfo.damcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">防渗墙类型：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.dmInfo.wallType || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">断面长度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.dmInfo.damlen || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面宽度：</td>
                          <td align="center" class="dt_vale">{{ base.dmInfo.damwd || "&nbsp;" }}</td>
                        </tr>
                      </table>
                      <!-- 分割线 -->
                     <div class="divider"></div>
                     <el-table
                    :data="base.dmtzdata"
                    border
                    style="width: 100%;"
                    header-cell-style="padding:4px 0px;"
                    size="small"
                    height="180"
                    empty-text="暂无站点数据"
                    >
                        <el-table-column align="center" prop="damscd" label="特征点编号" :width="130">
                            <template slot-scope="scope">
                                {{ scope.row.damscd }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="damsnm" label="特征点名称" >
                            <template slot-scope="scope">
                                {{ scope.row.damsnm }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="redi" label="起点距(m)"  :width="120">
                            <template slot-scope="scope">
                                {{ scope.row.redi }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="poel" label="高程(m)" :width="120">
                            <template slot-scope="scope">
                                {{ scope.row.poel }}
                            </template>
                        </el-table-column>
                    </el-table>
                    </TabPane>
                    <TabPane label="渗流测点">
                      <Row :gutter="16" type="flex" justify="center" align="middle">
                        <COL span="5">                            
                            测点编号：
                          </COL>
                          <COL span="19">
                          <Select style="width:130px;margin-right:265px;"
                                @on-change="tableTypeOnChange_BaseSll"
                                prefix="ios-calendar-outline"
                                v-model="select.shenliuliang_select"
                                slot="extra"
                              >
                                <Option
                                  v-for="item in select.sllmpsdList"
                                  :label="item.label"
                                  :value="item.value"
                                  :key="item.value"
                                ></Option>
                              </Select>
                        </COL>
                      </Row>
                     <!-- 分割线 -->
                     <div class="divider"></div>
                     <table
                        style="border: 1px solid #EBEEF5"
                        border
                        cellspacing="0"
                        width="100%"
                        class="site_detail"
                      >
                        <tr>
                          <td align="right" class="dt_name">测点编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.mpcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sllInfo.damcd || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">经度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.eslg || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">纬度：</td>
                          <td align="center" class="dt_vale">{{ base.sllInfo.nrlt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">桩号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.ch || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">轴距：</td>
                          <td align="center" class="dt_vale">{{ base.sllInfo.ofax || "&nbsp;" }}m</td>
                        </tr>                     
                        <tr>
                          <td align="right" class="dt_name">高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.el || "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">测量方式：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sllInfo.ltype || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">渗流阈值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.spprwl || "&nbsp;" }}L/s</td>
                          <td align="right" class="dt_name">测量最小值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sllInfo.tdmin || "&nbsp;" }}L/s</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">仪器编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.dvcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">更新时间：</td>
                          <td align="center" class="dt_vale">{{ base.sllInfo.dtuptm || "&nbsp;" }}</td>
                        </tr>
                         <tr>
                          <td align="right" class="dt_name">设施名称：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sllInfo.dhname || "&nbsp;" }}</td>
                          
                          <td align="right" class="dt_name">安装日期：</td>
                          <td align="center" class="dt_vale">{{ base.sllInfo.indt || "&nbsp;" }}</td>
                        </tr>
                      </table> 
                    </TabPane>
                    <TabPane label="渗压测点">
                       <Row :gutter="16" type="flex" justify="center" align="middle">
                        <COL span="5">                            
                            测点编号：
                          </COL>
                          <COL span="19">
                          <Select style="width:130px;margin-right:265px;"
                                    @on-change="tableTypeOnChange_BaseSyg"
                                    prefix="ios-calendar-outline"
                                    v-model="select.shenliuyali_select"
                                    slot="extra"
                              >
                                <Option
                                        v-for="item in select.slylmpsdList"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                ></Option>
                            </Select>
                        </COL>
                      </Row>
                      <!-- 分割线 -->
                     <div class="divider"></div>
                      <table
                        style="border: 1px solid #EBEEF5"
                        border
                        cellspacing="0"
                        width="100%"
                        class="site_detail"
                      >
                        <tr>
                          <td align="right" class="dt_name">测点编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.mpcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sygInfo.damcd || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">经度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.eslg || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">纬度：</td>
                          <td align="center" class="dt_vale">{{ base.sygInfo.nrlt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">桩号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.ch || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">坝轴距：</td>
                          <td align="center" class="dt_vale">{{ base.sygInfo.ofax || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">监测部位：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.msps || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">监测类型：</td>
                          <td align="center" class="dt_vale">{{ base.sygInfo.mstp || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">渗压阈值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.pztbtel || "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">安装高程：</td>
                          <td align="center" class="dt_vale">{{ base.sygInfo.el || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">进水段底高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.ipbtel|| "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">进水段顶高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sygInfo.iptpel || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">管口高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.tbtpel || "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">管底高程：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sygInfo.tbbtel || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">仪器编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.sygInfo.dvcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">更新时间：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.sygInfo.dtuptm || "&nbsp;" }}</td>
                        </tr>
                      </table> 
                    </TabPane>
                    <TabPane label="位移测点">
                      <Row :gutter="16" type="flex" justify="center" align="middle">
                        <COL span="5">                            
                            测点编号：
                          </COL>
                          <COL span="19">
                          <Select style="width:130px;margin-right:265px;"
                                    @on-change="tableTypeOnChange_Basewybx"
                                    prefix="ios-calendar-outline"
                                    v-model="select.weiyibianxing_select"
                                    slot="extra"
                                  >
                                   <Option
                                        v-for="item in select.wybxmpsdList"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                    ></Option>
                                  </Select>
                        </COL>
                      </Row>
                      <!-- 分割线 -->
                     <div class="divider"></div>
                      <table
                        style="border: 1px solid #EBEEF5"
                        border
                        cellspacing="0"
                        width="100%"
                        class="site_detail"
                      >
                        <tr>
                          <td align="right" class="dt_name">测点编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.mpcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.wybxInfo.damcd || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">经度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.eslg || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">纬度：</td>
                          <td align="center" class="dt_vale">{{ base.wybxInfo.nrlt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">桩号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.ch || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">轴距：</td>
                          <td align="center" class="dt_vale">{{ base.wybxInfo.ofax || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">基准值X：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.stvlx || "&nbsp;" }}m</td>
                          <td align="right" class="dt_name">基准值Y：</td>
                          <td align="center" class="dt_vale">{{ base.wybxInfo.stvly || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">位移阈值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.xyhrds || "&nbsp;" }}mm</td>
                          <td align="right" class="dt_name">高程：</td>
                          <td align="center" class="dt_vale">{{ base.wybxInfo.el || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">型式：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.tp|| "&nbsp;" }}</td>
                          <td align="right" class="dt_name">基础情况：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.wybxInfo.bsin || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">仪器编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.dvcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">安装日期：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.wybxInfo.indt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">测定日期：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.wybxInfo.dtdt || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">更新时间：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.wybxInfo.dtuptm || "&nbsp;" }}</td>
                        </tr>
                      </table> 
                    </TabPane>
                    <TabPane label="沉降测点">
                      <Row :gutter="16" type="flex" justify="center" align="middle">
                        <COL span="5">                            
                            测点编号：
                          </COL>
                          <COL span="19">
                          <Select style="width:130px;margin-right:265px;"
                              @on-change="tableTypeOnChange_Basecjbx"
                              prefix="ios-calendar-outline"
                              v-model="select.chenjiangbianxing_select"
                              slot="extra"
                          >
                          <Option
                                  v-for="item in select.cjbxmpsdList"
                                  :label="item.label"
                                  :value="item.value"
                                  :key="item.value"
                          ></Option>
                      </Select>
                        </COL>
                      </Row>
                      <!-- 分割线 -->
                     <div class="divider"></div>
                      <table
                        style="border: 1px solid #EBEEF5"
                        border
                        cellspacing="0"
                        width="100%"
                        class="site_detail"
                      >
                        <tr>
                          <td align="right" class="dt_name">测点编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.mpcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">断面编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.cjbxInfo.damcd || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">经度：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.eslg || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">纬度：</td>
                          <td align="center" class="dt_vale">{{ base.cjbxInfo.nrlt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">位移阈值：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.vrds || "&nbsp;" }}mm</td>
                          <td align="right" class="dt_name">初始高程：</td>
                          <td align="center" class="dt_vale">{{ base.cjbxInfo.inel || "&nbsp;" }}m</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">型式：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.tp|| "&nbsp;" }}</td>
                          <td align="right" class="dt_name">基础情况：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.cjbxInfo.bsin || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">仪器编号：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.dvcd || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">安装日期：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.cjbxInfo.indt || "&nbsp;" }}</td>
                        </tr>
                        <tr>
                          <td align="right" class="dt_name">测定日期：</td>
                          <td
                            align="center"
                            class="dt_vale"
                            style="border-right: 1px solid #EBEEF5"
                          >{{ base.cjbxInfo.dtdt || "&nbsp;" }}</td>
                          <td align="right" class="dt_name">更新时间：</td>
                          <td
                            align="center"
                            class="dt_vale"
                          >{{ base.cjbxInfo.dtuptm || "&nbsp;" }}</td>
                        </tr>
                      </table> 
                    </TabPane>
            </Tabs>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      activeName: "shenliuliang",
      // 站点
      siteInfo: {},
      //   多选框对象
      checkBox: {},
      //基础数据
      base:{
          dmInfo:{},
          dmtzdata:[],
          sllInfo:{},
          sygInfo:{},
          wybxInfo:{},
          cjbxInfo:{}
      },
      select: {
        // 渗流量测站编号列表
        sllmpsdList: [],
        //渗流量测站编号绑定值
        shenliuliang_select: "",
        // 渗流压力测站编号列表
        slylmpsdList:[],
        //渗流压力测站编号绑定值
        shenliuyali_select: "",
        //位移变形测站编号列表
        wybxmpsdList:[],
        //位移变形测站编号绑定值
        weiyibianxing_select:"",
        //沉降变形测站编号列表
        cjbxmpsdList:[],
        //沉降半溪测站编号绑定值
        chenjiangbianxing_select:"",
        //断面编号列表
        duanmianList:[],
        //断面编号绑定值
        duanmian_select:"",
      },
      //大坝监测点信息集合
      safebaseinfo:{

      },
      // 表格
      table: {
        // 渗流量
        shenliuliang: {
          // 表头设置
          columns: [
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
                key: "mstm",
                width: 150,
                align: "center",
                sortable: "custom"
              },
              {
                title: "渗流量(L/s)",
                width: 150,
                key: "spprwl",
                align: "center",
                sortable: "custom"
              },
              {
                title: "渗流水温(℃)",
                width: 150,
                key: "tm",
                align: "center",
                sortable: "custom"
              },
            ],
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
        // 渗流压力
        shenliuyali: {
          // 表头设置
          columns: [
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
                key: "mstm",
                width: 150,
                align: "center",
                sortable: "custom"
              },
              {
                title: "渗压水位(m)",
                width: 150,
                key: "spprwm",
                align: "center",
                sortable: "custom"
              },
              {
                title: "水温(℃)",
                width: 150,
                key: "tm",
                align: "center",
                sortable: "custom"
              },
            ],
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
        // 位移变形
        weiyibianxing: {
          // 表头设置
          columns: [
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
                key: "mstm",
                width: 150,
                align: "center",
                sortable: "custom"
              },
              {
                title: "X向水平位移(mm)",
                width: 160,
                key: "xhrds",
                align: "center",
                sortable: "custom"
              },
              {
                title: "Y向水平位移(mm)",
                width: 160,
                key: "yhrds",
                align: "center",
                sortable: "custom"
              },
            ],
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
        // 沉降变形
        chenjiangbianxing: {
          // 表头设置
          columns: [
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
                key: "mstm",
                width: 150,
                align: "center",
                sortable: "custom"
              },
              {
                title: "垂直位移(mm)",
                width: 150,
                key: "vrds",
                align: "center",
                sortable: "custom"
              },
              {
                title: "测量高程(m)",
                width: 150,
                key: "inel",
                align: "center",
                sortable: "custom"
              },
            ],
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
      },
      // 图形
      chart: {
        shenliuliang: null,
        shenliuyali:null,
        weiyibianxing: null,
        chenjiangbianxing:null,
      },
      //   日期数据
      date: {
        shuiqing: ""
      },
    };
  },
  mixins: [FilterMethods, GetDataMethods],
  methods: {
    // 渗流量查询
    search_shenliuliang(mpcd) {
      var mpcdstr = mpcd || this.select.shenliuliang_select;
      this.letTableLoading("shenliuliang"); // 表格加载中

      // 传递参数
      var body = {
        MPCD: mpcdstr,
        _page: this.table.shenliuliang.currentPage || 1,
        _page_size: this.table.shenliuliang.pageSizes || 20
      };

      // 如果有选择排序，则传递排序参数
      if (this.table.shenliuliang.sort) {
        var _sort = this.$FilterData.sort_Filter(this.table.shenliuliang.sort);
        if (_sort) {
          body._orderby = _sort;
        }
      }

      // 如果有选择日期进行查询，根据表格类型传递参数
      if (this.table.shenliuliang.date) {
        var DTT = this.$FilterData
              .elDatePicker_Filter(this.table.shenliuliang.date)
              .split(",");
            body.Time_min = DTT[1];
            body.Time_max = DTT[2];
      }
      // 获取水库水情历史数据
      this.$GetData.Safe_History_DATA(
        "sll",
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
          this.setTableTotal("shenliuliang", data.total); // 根据返回的total数量, 设置表格总条数
          this.setTableData("shenliuliang", data.data); // 更新水情历史数据表的数据
          body._page_size = 999999999;
          body._page = 1;
          this.$GetData.Safe_History_DATA(
            "sll",
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
              this.createChart_shenliuliang(
                "shenliuliangChart",
                "sll",
                chartData.data
              ); // 渗流量图表
            }
          );
          this.cancelTableLoading("shenliuliang"); // 取消表格加载
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
     // 切换测站渗流历史数据表类型
    tableTypeOnChange_shenliuliang(mpcd) {
      this.table["shenliuliang"].currentPage = 1;
      this.table["shenliuliang"].sort = null;
      this.table.shenliuliang.loading = true; // 表格加载中
      // 获取对应渗流量历史数据表的数据
      this.search_shenliuliang(mpcd);
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
    createChart_shenliuliang(id,jctype, data) {
      var ele = document.getElementById(id);

      if (data.length > 0) {
        var echartData = this.$App.transform_SAFE_data_into_ehart_data(
          data,
          jctype,
          true
        ); // 渗流量历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        var y1max = Math.ceil(FilterMethods.methods.get_echart_max(echartData.y1.list)),
            y1min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y1.list));
        if(y1max<this.base.sllInfo.spprwl){
          y1max=Math.ceil(this.base.sllInfo.spprwl);
        }
        echartData.y1.max=y1max;
        echartData.y1.min=y1min;
        echartData.y1.markval=this.base.sllInfo.spprwl;
        var mintime=echartData.x.list[0].slice(0, 10),maxtime=echartData.x.list[echartData.x.list.length-1].slice(0, 10);
        var nowDate=new Date();
        var now=this.getNowDayString(nowDate);
        console.log(now);
        if(mintime==now && maxtime==now){
            echartData.chartName = "今日渗流曲线图";
            for(var i=0;i<echartData.x.list.length;i++){
              var time = echartData.x.list[i].split(" ");
              console.log(time);
              echartData.x.list[i]=time[time.length-1];
            }
        }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==nowDate.getFullYear()){
            for(var i=0;i<echartData.x.list.length;i++){
              var time = echartData.x.list[i].substr(5);
              echartData.x.list[i]=time;
            }
        }
        if (!this.chart.shenliuliang) {
          this.chart.shenliuliang = this.$echarts.init(ele);
        }
        this.chart.shenliuliang.setOption({
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
              data: echartData.x.list,
            }
          ],
          yAxis: [
            {
              name: `渗流量 L/s`,
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
                data: echartData.y1.list,
                smooth: true,
            itemStyle : {  
                normal : {  
                    color:'#6C84CE'  
                }  
            },  
            areaStyle: {},
            markLine: {
            symbol:'none',
                itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'red',
                                    }  
                                }  
                            },
            data: [{name:"渗流阈值"+echartData.y1.markval,
                    yAxis: echartData.y1.markval,
                    label: {
                      formatter: '{b}',
                      position: 'middle'
                    }}],
          }
              }
            ],
        });
      }else{
         var now=new Date();
         var nowday=this.getNowDayString(now);
         let time = this.$FilterData.elDatePicker_Filter(
          this.table.shenliuliang.date
        );
        time = time.split(',');
        var begintime=time[1].slice(0,10);
        var endtime=time[2].slice(0,10);
        if(begintime==nowday && endtime==nowday){
          document.getElementById("noshenliuliang").innerHTML = "暂无今天数据";
        }else{
          document.getElementById("noshenliuliang").innerHTML = "暂无数据";
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
    handleCurrentChange_shenliuliang(index) {
      this.table["shenliuliang"].currentPage = index;
      this.search_shenliuliang(this.select.shenliuliang_select);
    },
    // 处理页码切换_沉降变形
    handleCurrentChange_chenjiangbianxing(index) {
      this.table["chenjiangbianxing"].currentPage = index;
      this.search_chenjiangbianxing();
    },
    // 处理每页显示条数切换_渗流量数据
    handleSizeChange_shenliuliang(pageSizes) {
      this.table["shenliuliang"].pageSizes = pageSizes;
      this.table["shenliuliang"].currentPage = 1;
      this.search_shenliuliang(this.select.shenliuliang_select);
    },
    // 处理每页显示条数切换_沉降变形
    handleSizeChange_chenjiangbianxing(pageSizes) {
      this.table["chenjiangbianxing"].pageSizes = pageSizes;
      this.table["chenjiangbianxing"].currentPage = 1;
      this.search_chenjiangbianxing();
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
    // 设置水位数据历史表默认查询日期
    setTableDefaultDate_shenliuliang_historyTable() {
      const end = new Date();
      const start = zeroPointOfTheDay();

      var timeSlot = [start, end];

      this.setTableDate("shenliuliang", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
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
      this.table.shenliuliang.currentPage = 1;
      this.search_shenliuliang(this.select.shenliuliang_select);
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
    sort_change_shenliuliang(item) {
      this.table.shenliuliang.sort = item;
      this.search_shenliuliang(this.select.shenliuliang_select);
    },
    // 查询降雨信息
    search_shenliuyali(mpcd) {
        var mpcd = mpcd || this.select.yuqing_select;
        this.letTableLoading("shenliuyali"); // 表格加载中

        // 传递参数
        var body = {
            MPCD: mpcd,
            _page: this.table.shenliuyali.currentPage || 1,
            _page_size: this.table.shenliuyali.pageSizes || 20
        };

        // 如果有选择排序，则传递排序参数
        if (this.table.shenliuyali.sort) {
            var _sort = this.$FilterData.sort_Filter(this.table.shenliuyali.sort);
            if (_sort) {
                body._orderby = _sort;
            }
        }
         var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.shenliuyali.date)
                        .split(",");
                    body.Time_min = DTT[1];
                    body.Time_max = DTT[2];

        // 获取渗流压力历史数据
        this.$GetData.Safe_History_DATA(
            "slyl",
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

                this.setTableTotal("shenliuyali", data.total); // 根据返回的total数量, 设置表格总条数
                this.setTableData("shenliuyali", data.data); // 更新水情历史数据表的数据
                body._page_size = 999999999;
                body._page = 1;
                this.$GetData.Safe_History_DATA(
                    "slyl",
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
                        console.log("shenliuyaliChart", chartData)
                        this.createChart_shenliuyali(
                            "shenliuyaliChart",
                            "slyl",
                            chartData.data
                        ); // 渗流压力
                    }
                );
                this.cancelTableLoading("shenliuyali"); // 取消表格加载
            }
        );
    },
    // 制图
    createChart_shenliuyali(id, jctype, data) {
        var ele = document.getElementById(id);
        if (data.length > 0) {
            // 渗流压力历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
            var echartData = this.$App.transform_SAFE_data_into_ehart_data(data, jctype, true);
            echartData.x.list = echartData.x.list;
            var y1max = Math.ceil(FilterMethods.methods.get_echart_max(echartData.y1.list)),
            y1min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y1.list));
            echartData.y1.max=y1max;
            echartData.y1.min=y1min;
            var mintime=echartData.x.list[0].slice(0, 10),maxtime=echartData.x.list[echartData.x.list.length-1].slice(0, 10);
            var nowDate=new Date();
            var now=this.getNowDayString(nowDate);
            console.log(now);
            if(mintime==now && maxtime==now){
                echartData.chartName = "今日渗压曲线图";
                for(var i=0;i<echartData.x.list.length;i++){
                  var time = echartData.x.list[i].split(" ");
                  echartData.x.list[i]=time[time.length-1];
                }
            }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==nowDate.getFullYear()){
                for(var i=0;i<echartData.x.list.length;i++){
                  var time = echartData.x.list[i].substr(5);
                  echartData.x.list[i]=time;
                }
            }
            if (!this.chart.shenliuyali) {
              this.chart.shenliuyali = this.$echarts.init(ele);
            }
            this.chart.shenliuyali.setOption({
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
                  data: echartData.x.list,
                }
              ],
              yAxis: [
                {
                  name: `渗压水位 m`,
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
              }
            ],
            });
          }else{
            var now=new Date();
            var nowday=this.getNowDayString(now);
            let time = this.$FilterData.elDatePicker_Filter(
              this.table.shenliuyali.date
            );
            time = time.split(',');
            var begintime=time[1].slice(0,10);
            var endtime=time[2].slice(0,10);
            if(begintime==nowday && endtime==nowday){
              document.getElementById("noshenliuyali").innerHTML = "暂无今天数据";
            }else{
              document.getElementById("noshenliuyali").innerHTML = "暂无数据";
            } 
          }
    },
    // 处理日期时间选择器确定事件_降雨数据
    shenliuyaliDatePickerChange(item) {
        this.table.shenliuyali.currentPage = 1;
        this.search_shenliuyali(this.select.shenliuyali_select);
    },
    // 处理每页显示条数切换_降雨数据
    handleSizeChange_shenliuyali(pageSizes) {
        this.table["shenliuyali"].pageSizes = pageSizes;
        this.table["shenliuyali"].currentPage = 1;
        this.search_shenliuyali(this.select.shenliuyali_select);
    },
    // 处理页码切换_降雨数据
    handleCurrentChange_shenliuyali(index) {
        this.table["shenliuyali"].currentPage = index;
        this.search_shenliuyali(this.select.shenliuyali_select);
    },
    // 排序
    sort_change_shenliuyali(item) {
        this.table.shenliuyali.sort = item;
        this.search_shenliuyali(this.select.shenliuyali_select);
    },
    // 切换渗压测站历史数据
    tableTypeOnChange_shenliuyali(mpsd) {
        this.table["shenliuyali"].currentPage = 1;
        this.table["shenliuyali"].sort = null;
        this.table.shenliuyali.loading = true; // 表格加载中
        // 获取对应水情历史数据表的数据
        this.search_shenliuyali(mpsd);
    },
    // 设置渗压数据历史表默认查询日期
    setTableDefaultDate_shenliuyali_historyTable() {
        var timeSlot = this.$App.zeroPointToNowOfTheDay();
        this.setTableDate("shenliuyali", timeSlot);
    },
    // 处理日期时间选择器确定事件_状态数据
    weiyibianxingDatePickerChange(item) {
      this.table.weiyibianxing.currentPage = 1;
      this.search_weiyibianxing(this.select.weiyibianxing_select);
    },
    //切换位移变形测站历史数据
    tableTypeOnChange_weiyibianxing(mpsd){
        this.table["weiyibianxing"].currentPage = 1;
        this.table["weiyibianxing"].sort = null;
        this.table.weiyibianxing.loading = true; // 表格加载中
        // 获取对应水情历史数据表的数据
        this.search_weiyibianxing(mpsd);
    },
    // 更新位移变形数据表的数据
    setTableData_weiyibianxing(data) {
      this.table.weiyibianxing.Rows_filter = data;
    },
    setTableTotal_weiyibianxing(total) {
      this.table.weiyibianxing.total = total;
    },
    // 查询位移变形数据历史表
    search_weiyibianxing(mpcd) {
        var mpcd=mpcd || this.select.weiyibianxing_select;
      this.letTableLoading("weiyibianxing"); 
      var body = {
        _page: this.table["weiyibianxing"].currentPage || 1,
        _page_size: this.table["weiyibianxing"].pageSizes || 20,
        MPCD: mpcd
      };

      let time = this.$FilterData.elDatePicker_Filter(
          this.table.weiyibianxing.date
        );
        time = time.split(',');
        body.Time_min = time[1];
        body.Time_max = time[2];
      this.$GetData.Safe_History_DATA(
        "wybx",
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
          this.setTableTotal_weiyibianxing(data.total); // 设置状态数据表格总条数
          this.setTableData_weiyibianxing(data.data); // 更新状态数据表的数据
          body._page_size = 999999999;
          body._page = 1;
          this.$GetData.Safe_History_DATA(
            "wybx",
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
              this.createChart_weiyibianxing(
                "weiyibianxingChart",
                "wybx",
                chartData.data
              ); // 位移变形
            }
          );
          this.cancelTableLoading("weiyibianxing");
        }
      );
    },
    // 设置状态数据表默认查询日期
    setTableDefaultDate_weiyibianxing() {
      var timeSlot = this.$App.zeroPointToNowOfTheDay();

      this.setTableDate("weiyibianxing", timeSlot);
    },
    // 处理页码切换
    handleCurrentChange_weiyibianxing(index) {
      this.table["weiyibianxing"].currentPage = index;
      this.search_weiyibianxing();
    },
    // 处理每页显示条数切换
    handleSizeChange_weiyibianxing(pageSizes) {
      this.table["weiyibianxing"].pageSizes = pageSizes;
      this.table["weiyibianxing"].currentPasge = 1;
      this.search_weiyibianxing();
    },
    //返回日期
    getNowDayString(now){
      return now.getFullYear()+"-"+((now.getMonth()+1)<10?"0"+(now.getMonth()+1):(now.getMonth()+1))+"-"+(now.getDate()<10?"0"+now.getDate():now.getDate());
    },
     // 制图——位移曲线图
    createChart_weiyibianxing(id, jctype, data) {
      var ele = document.getElementById(id);
      if (data.length > 0) {
        var echartData = this.$App.transform_SAFE_data_into_ehart_data(data, jctype, true); // 位移变形历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        var y1max = Math.ceil(FilterMethods.methods.get_echart_max(echartData.y1.list)),
            y1min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y1.list)),
            y2max = Math.ceil(FilterMethods.methods.get_echart_max(echartData.y2.list)),
            y2min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y2.list));
        var mintime=echartData.x.list[0].slice(0, 10),maxtime=echartData.x.list[echartData.x.list.length-1].slice(0, 10);
        var now=new Date();
        var nowday=this.getNowDayString(now);
        if(mintime==nowday && maxtime==nowday){
            echartData.chartName = "今日位移曲线图";
            for(var i=0;i<echartData.x.list.length;i++){
              var time=echartData.x.list[i].split(" ");
              echartData.x.list[i]=time[time.length-1];
            }
        }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==now.getFullYear()){
          for(var i=0;i<echartData.x.list.length;i++){
              var time=echartData.x.list[i].substr(5);
              echartData.x.list[i]=time;
            }
        }
        console.log(echartData);
        if (!this.chart.weiyibianxing) {
          this.chart.weiyibianxing = this.$echarts.init(ele);
        }
        this.chart.weiyibianxing.setOption({
        title: { text: echartData.chartName},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
         }
        },
        legend: {
          data: [ echartData.y1.name, echartData.y2.name ],
          bottom:-5
        },
        toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  magicType: { show: true, type: ["line", "bar"] },
                  saveAsImage: { show: true }
                }
              },
        axisPointer: {
        link: {xAxisIndex: 'all'}
        },
        grid: [{
        left: 38,
        right: 18,
        height: '33%'
        }, {
        left: 38,
        right: 18,
        top: '59%',
        height: '33%'
       }],
        xAxis: [
        {
            boundaryGap: false,
            data: echartData.x.list,
            //axisLabel:{interval:parseInt(echartData.x.list.length/5),rotate:0},
        },
        {
            gridIndex: 1,
            boundaryGap: false,
            data: echartData.x.list,
            position: 'bottom'
        }
        ],
        yAxis: [
          {
            name: echartData.y1.title+'(mm)',
            type: "value",
            //minInterval:1, 
            min:y1min,
            max:y1max
          },
          {
            gridIndex: 1,
            name: echartData.y2.title+'(mm)',
            type: "value",
            //minInterval:1, 
            min:y2min,
            max:y2max
          }
        ],
        series: [
          {
            name: echartData.y1.name,
            type: "line",
            yAxisIndex: 0,
            smooth:true,
            data:echartData.y1.list,
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
      }else{
        var now=new Date();
        var nowday=this.getNowDayString(now);
         let time = this.$FilterData.elDatePicker_Filter(
          this.table.weiyibianxing.date
        );
        time = time.split(',');
        var begintime=time[1].slice(0,10);
        var endtime=time[2].slice(0,10);
        if(begintime==nowday && endtime==nowday){
          document.getElementById("noweiyibianxing").innerHTML = "暂无今天数据";
        }else{
          document.getElementById("noweiyibianxing").innerHTML = "暂无数据";
        }       
      }
    },
    // 设置状态数据表默认查询日期
    setTableDefaultDate_chenjiangbianxing() {
      var timeSlot = this.$App.zeroPointToNowOfTheDay();

      this.setTableDate("chenjiangbianxing", timeSlot);
    },
    //切换位移变形测站历史数据
    tableTypeOnChange_chenjiangbianxing(mpsd){
        this.table["chenjiangbianxing"].currentPage = 1;
        this.table["chenjiangbianxing"].sort = null;
        this.table.chenjiangbianxing.loading = true; // 表格加载中
        // 获取对应水情历史数据表的数据
        this.search_chenjiangbianxing(mpsd);
    },
    //沉降变形
    handleDatePickerChange_chenjiangbianxing(item) {
      this.table.chenjiangbianxing.currentPage = 1;
      this.search_chenjiangbianxing(this.select.chenjiangbianxing_select);
    },
    // 查询关系曲线表格
    search_chenjiangbianxing(mpcd) {
      var mpcd=mpcd || this.select.chenjiangbianxing_select;
      this.letTableLoading("chenjiangbianxing"); 
      var body = {
        _page: this.table["chenjiangbianxing"].currentPage || 1,
        _page_size: this.table["chenjiangbianxing"].pageSizes || 20,
        mpcd: mpcd
      };

      let time = this.$FilterData.elDatePicker_Filter(
          this.table.chenjiangbianxing.date
        );
        time = time.split(',');
        body.Time_min = time[1];
        body.Time_max = time[2];
        
       // 传递参数
        var body = {
            MPCD: mpcd,
            _page: this.table.chenjiangbianxing.currentPage || 1,
            _page_size: this.table.chenjiangbianxing.pageSizes || 20
        };

        // 如果有选择排序，则传递排序参数
        if (this.table.chenjiangbianxing.sort) {
            var _sort = this.$FilterData.sort_Filter(this.table.chenjiangbianxing.sort);
            if (_sort) {
                body._orderby = _sort;
            }
        }
         var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.chenjiangbianxing.date)
                        .split(",");
                    body.Time_min = DTT[1];
                    body.Time_max = DTT[2];

        // 获取沉降变形历史数据
        this.$GetData.Safe_History_DATA(
            "cjbx",
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
                this.setTableTotal("chenjiangbianxing", data.total); // 根据返回的total数量, 设置表格总条数
                this.setTableData("chenjiangbianxing", data.data); // 更新水情历史数据表的数据
                body._page_size = 999999999;
                body._page = 1;
                this.$GetData.Safe_History_DATA(
                    "cjbx",
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
                        console.log("chenjiangbianxingChart", chartData)
                        this.createChart_chenjiangbianxing(
                            "chenjiangbianxingChart",
                            "cjbx",
                            chartData.data
                        ); // 沉降变形
                    }
                );
                this.cancelTableLoading("chenjiangbianxing"); // 取消表格加载
            }
        );
    },
    // 制图
    createChart_chenjiangbianxing(id, jctype, data) {
        var ele = document.getElementById(id);
        if (data.length > 0) {
            // 沉降变形历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
            var echartData = this.$App.transform_SAFE_data_into_ehart_data(data, jctype, true);
            echartData.x.list = echartData.x.list;
            var y1max = Math.ceil(FilterMethods.methods.get_echart_max(echartData.y1.list)),
            y1min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y1.list));
            var mintime=echartData.x.list[0].slice(0, 10),maxtime=echartData.x.list[echartData.x.list.length-1].slice(0, 10);
            var nowDate=new Date();
            var now=this.getNowDayString(nowDate);
            if(mintime==now && maxtime==now){
                echartData.chartName = "今日沉降曲线图";
                for(var i=0;i<echartData.x.list.length;i++){
                  var time = echartData.x.list[i].split(" ");
                  echartData.x.list[i]=time[time.length-1];
                }
            }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==nowDate.getFullYear()){
                for(var i=0;i<echartData.x.list.length;i++){
                  var time = echartData.x.list[i].substr(5);
                  echartData.x.list[i]=time;
                }
            }
            if (!this.chart.chenjiangbianxing) {
              this.chart.chenjiangbianxing = this.$echarts.init(ele);
            }
            this.chart.chenjiangbianxing.setOption({
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
                  data: echartData.x.list,
                }
              ],
              yAxis: [
                {
                  name: echartData.y1.title+"(mm)",
                  type: "value",
                  axisLabel: {
                    formatter: "{value} "
                  },
                  scale: true,
                  min:y1min,
                  max:y1max
                }
              ],
              series: [
              {
                name: echartData.y1.name,
                type: "line",
                data: echartData.y1.list
              }
            ],
            });
          }else{
            var now=new Date();
            var nowday=this.getNowDayString(now);
            let time = this.$FilterData.elDatePicker_Filter(
              this.table.shenliuyali.date
            );
            time = time.split(',');
            var begintime=time[1].slice(0,10);
            var endtime=time[2].slice(0,10);
            if(begintime==nowday && endtime==nowday){
              document.getElementById("noshenliuyali").innerHTML = "暂无今天数据";
            }else{
              document.getElementById("noshenliuyali").innerHTML = "暂无数据";
            } 
          }
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
    tableTypeOnChange_Duanmian(damcd){
      this.loadDuanmianInfo(damcd);
    },
    //加载断面及断面特征数据
    loadDuanmianInfo(damcd){
      //断面信息
        this.axios.get("/guanqu/detail/dminfo", {
            params: {DAMCD:damcd}
        }).then(res => {
            var data=res.data.dminfo;
            this.base.dmInfo=data[0];
        });
      //断面特征信息
        this.axios.get("/guanqu/detail/dmtzinfo", {
            params: {DAMCD:damcd}
        }).then(res => {
            var data=res.data.dmtzinfo;
            this.base.dmtzdata=data;
        });
    },
    tableTypeOnChange_BaseSll(mpcd){
      this.loadSllBaseInfo(mpcd);
    },
    //加载渗流量测站数据
    loadSllBaseInfo(mpcd){
      this.axios.get("/guanqu/detail/sllinfo", {
            params: {MPCD:mpcd}
        }).then(res => {
            var data=res.data.sllinfo;
            this.base.sllInfo=data[0];
        });
    },
    tableTypeOnChange_BaseSyg(mpcd){
      this.loadSygBaseInfo(mpcd);
    },
    //加载渗压管数据
    loadSygBaseInfo(mpcd){
      this.axios.get("/guanqu/detail/syginfo", {
            params: {MPCD:mpcd}
        }).then(res => {
            var data=res.data.syginfo;
            this.base.sygInfo=data[0];
        });
    },
    tableTypeOnChange_Basewybx(mpcd){
      this.loadWybxBaseInfo(mpcd);
    },
    //加载位移变形数据
    loadWybxBaseInfo(mpcd){
      this.axios.get("/guanqu/detail/spwyinfo", {
            params: {MPCD:mpcd}
        }).then(res => {
            var data=res.data.spwyinfo;
            this.base.wybxInfo=data[0];
        });
    },
    tableTypeOnChange_Basecjbx(mpcd){
      this.loadCjbxBaseInfo(mpcd);
    },
    //加载沉降变形数据
    loadCjbxBaseInfo(mpcd){
      this.axios.get("/guanqu/detail/czwyinfo", {
            params: {MPCD:mpcd}
        }).then(res => {
            var data=res.data.czwyinfo;
            this.base.cjbxInfo=data[0];
        });
    },
},
  mounted() {
    // 组件加载中
    console.log(this.info);
      this.componentLoading();
    for(var i=0;i<this.info.rowinfo.slllist.length;i++){
      var infoobj=this.info.rowinfo.slllist[i];
      var mpcd=this.info.rowinfo.slllist[i].mpcd;
      var obj=new Object();
      obj.label=mpcd;
      obj.value=mpcd;
      this.select.sllmpsdList.push(obj);
      if(i==0){
        this.select.shenliuliang_select = mpcd;       
      }
      if(this.select.duanmianList.length==0){
          var dmobj=new Object();
          dmobj.label=infoobj.damcd;
          dmobj.value=infoobj.damcd;
          this.select.duanmianList.push(dmobj);
        }else{
          var addsign=1;
          for(var s=0;s<this.select.duanmianList.length;s++){
            var bdmobj=this.select.duanmianList[s];
            if(bdmobj.value==infoobj.damcd){
              addsign=0;
            }
          }
          if(addsign==1){
            var dmobj=new Object();
            dmobj.label=infoobj.damcd;
            dmobj.value=infoobj.damcd;
            this.select.duanmianList.push(dmobj);
          }
      }            
    }    
    for(var i=0;i<this.info.rowinfo.slyllist.length;i++){
      var infoobj=this.info.rowinfo.slyllist[i];
      var mpcd=this.info.rowinfo.slyllist[i].mpcd;
      var obj=new Object();
      obj.label=mpcd;
      obj.value=mpcd;
      this.select.slylmpsdList.push(obj);
      if(i==0){
        this.select.shenliuyali_select = mpcd;
      }
      if(this.select.duanmianList.length==0){
          var dmobj=new Object();
          dmobj.label=infoobj.damcd;
          dmobj.value=infoobj.damcd;
          this.select.duanmianList.push(dmobj);
        }else{
          var addsign=1;
          for(var s=0;s<this.select.duanmianList.length;s++){
            var bdmobj=this.select.duanmianList[s];
            if(bdmobj.value==infoobj.damcd){
              addsign=0;
            }
          }
          if(addsign==1){
            var dmobj=new Object();
            dmobj.label=infoobj.damcd;
            dmobj.value=infoobj.damcd;
            this.select.duanmianList.push(dmobj);
          }
      }
    }   
    for(var i=0;i<this.info.rowinfo.spwylist.length;i++){
      var infoobj=this.info.rowinfo.spwylist[i];
      var mpcd=this.info.rowinfo.spwylist[i].mpcd;
      var obj=new Object();
      obj.label=mpcd;
      obj.value=mpcd;
      this.select.wybxmpsdList.push(obj);
      if(i==0){
        this.select.weiyibianxing_select=mpcd;
      }
      if(this.select.duanmianList.length==0){
          var dmobj=new Object();
          dmobj.label=infoobj.damcd;
          dmobj.value=infoobj.damcd;
          this.select.duanmianList.push(dmobj);
        }else{
          var addsign=1;
          for(var s=0;s<this.select.duanmianList.length;s++){
            var bdmobj=this.select.duanmianList[s];
            if(bdmobj.value==infoobj.damcd){
              addsign=0;
            }
          }
          if(addsign==1){
            var dmobj=new Object();
            dmobj.label=infoobj.damcd;
            dmobj.value=infoobj.damcd;
            this.select.duanmianList.push(dmobj);
          }
      }
    }
    for(var i=0;i<this.info.rowinfo.czwylist.length;i++){
      var infoobj=this.info.rowinfo.czwylist[i];
      var mpcd=this.info.rowinfo.czwylist[i].mpcd;
      var obj=new Object();
      obj.label=mpcd;
      obj.value=mpcd;
      this.select.cjbxmpsdList.push(obj);
      if(i==0){
        this.select.chenjiangbianxing_select=mpcd;
      }
      if(this.select.duanmianList.length==0){
          var dmobj=new Object();
          dmobj.label=infoobj.damcd;
          dmobj.value=infoobj.damcd;
          this.select.duanmianList.push(dmobj);
        }else{
          var addsign=1;
          for(var s=0;s<this.select.duanmianList.length;s++){
            var bdmobj=this.select.duanmianList[s];
            if(bdmobj.value==infoobj.damcd){
              addsign=0;
            }
          }
          if(addsign==1){
            var dmobj=new Object();
            dmobj.label=infoobj.damcd;
            dmobj.value=infoobj.damcd;
            this.select.duanmianList.push(dmobj);
          }
      }
    }
    this.select.duanmian_select=this.select.duanmianList[0].value;
    var showtab=this.info.rowinfo.tableType.clicktype;
    var selectmpcd=this.info.rowinfo.tableType.mpcd;
    if(showtab=="sll"){
      this.activeName="shenliuliang";
      if(selectmpcd!=null){
        this.select.shenliuliang_select = selectmpcd;
      }
    }
    if(showtab=="slyl"){
      this.activeName="shenliuyali";
      if(selectmpcd!=null){
        this.select.shenliuyali_select=selectmpcd;
      }
    }
    if(showtab=="wybx"){
      this.activeName="weiyibianxing";
      if(selectmpcd!=null){
        this.select.weiyibianxing_select=selectmpcd;
      }
    }
    if(showtab=="cjbx"){
      this.activeName="chenjiangbianxing";
      if(selectmpcd!=null){
        this.select.chenjiangbianxing_select=selectmpcd;
      }
    }
    if(showtab=="home"){
      if(this.info.rowinfo.sllyj==1){
        this.activeName="shenliuliang";
      }else if(this.info.rowinfo.slylyj==1){
        this.activeName="shenliuyali";
      }else if(this.info.rowinfo.spwyyj==1){
        this.activeName="weiyibianxing";
      }else if(this.info.rowinfo.czwyyj==1){
        this.activeName="chenjiangbianxing";
      }
    }
    // 获取详情数据
    this.axios
      .get(`/guanqu/table/details?ID=${this.info.rowinfo.STCD}&pk=STCD`)
      .then(res => {
        this.info.rowinfo.ADDVCD=res.data.ADDVCD;
        // 站点信息
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
        //加载断面及断面特征数据
        this.tableTypeOnChange_Duanmian(this.select.duanmian_select);
        //加载渗流量测站数据
        this.loadSllBaseInfo(this.select.shenliuliang_select);
        //加载渗压管数据
        this.loadSygBaseInfo(this.select.shenliuyali_select);
        //加载位移变形数据
        this.loadWybxBaseInfo(this.select.weiyibianxing_select);
        //加载沉降变形数据
        this.loadCjbxBaseInfo(this.select.chenjiangbianxing_select);
        // 加载取消
        this.cancelComponentLoading();
        if(this.info.rowinfo.slllist.length>0){
        //设置渗流量历史数据日期
        this.setTableDefaultDate_shenliuliang_historyTable();
        // 渗流数据
        this.tableTypeOnChange_shenliuliang(this.select.shenliuliang_select);
        }
        if(this.info.rowinfo.slyllist.length>0){
        //设置渗流压力历史数据日期
        this.setTableDefaultDate_shenliuyali_historyTable();
        //渗压数据
        this.tableTypeOnChange_shenliuyali(this.select.shenliuyali_select);
        }
        if(this.info.rowinfo.spwylist.length>0){
        // 设置位移变形表默认查询日期
        this.setTableDefaultDate_weiyibianxing();
        // 查询位移变形历史数据
        this.tableTypeOnChange_weiyibianxing(this.select.weiyibianxing_select);
        }
        if(this.info.rowinfo.czwylist.length>0){
        //设置沉降变形默认查询日期
        this.setTableDefaultDate_chenjiangbianxing();
        //沉降变形历史数据
        this.tableTypeOnChange_chenjiangbianxing(this.select.chenjiangbianxing_select);
        }

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
    font-size: 12px;
  }

  .dt_name {
    width: 20%;
    border-left: none;
    font-weight: bold;
    background-color: #F6FAFF;
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
