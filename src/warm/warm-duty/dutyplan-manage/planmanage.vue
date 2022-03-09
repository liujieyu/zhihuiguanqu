<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol">
                        <Col>
                        时间：
                        <el-date-picker
                        v-model="datecon"
                        type="date"
                        :picker-options="pickerOptions"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" 
                        size="small"
                        :clearable="false"
                        @change="timechange"
                        >
                        </el-date-picker>
                        </Col>
                    </Row>
                    <Row class="fgline"></Row>
                    <table  cellspacing="0" cellpadding="0" class="table_show" v-loading="loading">
                         <caption>
                             <h2>人员值班安排</h2>
                         </caption>
                        <thead>
                            <tr>
                                <th style="width:120px;">{{FullYear}}年</th>
                                <th style="width:326px;">主管领导</th>
                                <th style="width:326px;">值班领导</th>
                                <th style="width:326px;">值班人员</th>
                            </tr>
                        </thead>
                        <tr>
                            <td align="center">{{datearray[0]}}&nbsp;星期一</td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(0,0)" style="margin-left:5px;margin-bottom:5px;">选择主管领导</Button>
                                    </li>
                                    <li class="showdada"  v-for="(item, itemIndex) in maninfos[0][0]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[0][0].length>1"  @click="deleteItem(0,0,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(0,0)">+</Button>
                                    </li>
                                </ul>
                                
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(0,1)" style="margin-left:5px;margin-bottom:5px;">选择值班领导</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[0][1]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[0][1].length>1"  @click="deleteItem(0,1,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(0,1)" >+</Button>
                                    </li>
                                </ul>
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(0,2)" style="margin-left:5px;margin-bottom:5px;">选择值班人员</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[0][2]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[0][2].length>1"  @click="deleteItem(0,2,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(0,2)" >+</Button>
                                    </li>
                                </ul>                               
                            </td>
                        </tr>
                        <tr>
                            <td align="center">{{datearray[1]}}&nbsp;星期二</td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(1,0)" style="margin-left:5px;margin-bottom:5px;">选择主管领导</Button>
                                    </li>
                                    <li class="showdada"  v-for="(item, itemIndex) in maninfos[1][0]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[1][0].length>1"  @click="deleteItem(1,0,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(1,0)">+</Button>
                                    </li>
                                </ul>
                                
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(1,1)" style="margin-left:5px;margin-bottom:5px;">选择值班领导</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[1][1]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[1][1].length>1"  @click="deleteItem(1,1,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(1,1)" >+</Button>
                                    </li>
                                </ul>
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(1,2)" style="margin-left:5px;margin-bottom:5px;">选择值班人员</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[1][2]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[1][2].length>1"  @click="deleteItem(1,2,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(1,2)" >+</Button>
                                    </li>
                                </ul>                               
                            </td>
                            <tr>
                            <td align="center">{{datearray[2]}}&nbsp;星期三</td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(2,0)" style="margin-left:5px;margin-bottom:5px;">选择主管领导</Button>
                                    </li>
                                    <li class="showdada"  v-for="(item, itemIndex) in maninfos[2][0]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[2][0].length>1"  @click="deleteItem(2,0,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(2,0)">+</Button>
                                    </li>
                                </ul>
                                
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(2,1)" style="margin-left:5px;margin-bottom:5px;">选择值班领导</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[2][1]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[2][1].length>1"  @click="deleteItem(2,1,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(2,1)" >+</Button>
                                    </li>
                                </ul>
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(2,2)" style="margin-left:5px;margin-bottom:5px;">选择值班人员</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[2][2]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[2][2].length>1"  @click="deleteItem(2,2,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(2,2)" >+</Button>
                                    </li>
                                </ul>                               
                            </td>
                        </tr>
                        </tr>
                        <tr>
                            <td align="center">{{datearray[3]}}&nbsp;星期四</td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(3,0)" style="margin-left:5px;margin-bottom:5px;">选择主管领导</Button>
                                    </li>
                                    <li class="showdada"  v-for="(item, itemIndex) in maninfos[3][0]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[3][0].length>1"  @click="deleteItem(3,0,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(3,0)">+</Button>
                                    </li>
                                </ul>
                                
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(3,1)" style="margin-left:5px;margin-bottom:5px;">选择值班领导</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[3][1]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[3][1].length>1"  @click="deleteItem(3,1,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(3,1)" >+</Button>
                                    </li>
                                </ul>
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(3,2)" style="margin-left:5px;margin-bottom:5px;">选择值班人员</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[3][2]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[3][2].length>1"  @click="deleteItem(3,2,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(3,2)" >+</Button>
                                    </li>
                                </ul>                               
                            </td>
                        </tr>
                        <tr>
                            <td align="center">{{datearray[4]}}&nbsp;星期五</td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(4,0)" style="margin-left:5px;margin-bottom:5px;">选择主管领导</Button>
                                    </li>
                                    <li class="showdada"  v-for="(item, itemIndex) in maninfos[4][0]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[4][0].length>1"  @click="deleteItem(4,0,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(4,0)">+</Button>
                                    </li>
                                </ul>
                                
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(4,1)" style="margin-left:5px;margin-bottom:5px;">选择值班领导</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[4][1]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[4][1].length>1"  @click="deleteItem(4,1,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(4,1)" >+</Button>
                                    </li>
                                </ul>
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(4,2)" style="margin-left:5px;margin-bottom:5px;">选择值班人员</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[4][2]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[4][2].length>1"  @click="deleteItem(4,2,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(4,2)" >+</Button>
                                    </li>
                                </ul>                               
                            </td>
                        </tr>
                        <tr>
                            <td align="center">{{datearray[5]}}&nbsp;星期六</td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(5,0)" style="margin-left:5px;margin-bottom:5px;">选择主管领导</Button>
                                    </li>
                                    <li class="showdada"  v-for="(item, itemIndex) in maninfos[5][0]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[5][0].length>1"  @click="deleteItem(5,0,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(5,0)">+</Button>
                                    </li>
                                </ul>
                                
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(5,1)" style="margin-left:5px;margin-bottom:5px;">选择值班领导</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[5][1]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[5][1].length>1"  @click="deleteItem(5,1,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(5,1)" >+</Button>
                                    </li>
                                </ul>
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(5,2)" style="margin-left:5px;margin-bottom:5px;">选择值班人员</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[5][2]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[5][2].length>1"  @click="deleteItem(5,2,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(5,2)" >+</Button>
                                    </li>
                                </ul>                               
                            </td>
                        </tr>
                        <tr>
                            <td align="center">{{datearray[6]}}&nbsp;星期日</td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(6,0)" style="margin-left:5px;margin-bottom:5px;">选择主管领导</Button>
                                    </li>
                                    <li class="showdada"  v-for="(item, itemIndex) in maninfos[6][0]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[6][0].length>1"  @click="deleteItem(6,0,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(6,0)">+</Button>
                                    </li>
                                </ul>
                                
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(6,1)" style="margin-left:5px;margin-bottom:5px;">选择值班领导</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[6][1]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[6][1].length>1"  @click="deleteItem(6,1,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(6,1)" >+</Button>
                                    </li>
                                </ul>
                            </td>
                            <td style="vertical-align:top;">
                                <ul>
                                    <li class="choose">
                                        <Button  type="info"  @click="showManinfo(6,2)" style="margin-left:5px;margin-bottom:5px;">选择值班人员</Button>
                                    </li>
                                    <li   v-for="(item, itemIndex) in maninfos[6][2]">
                                        <Input v-model="item.name" :value="item.name" placeholder="请输入姓名" clearable style="width:110px;"/>
                                        -
                                        <Input v-model="item.phone" :value="item.phone" placeholder="请输入手机号码" clearable style="width:110px;"/>
                                        <Button  type="primary" v-if="maninfos[6][2].length>1"  @click="deleteItem(6,2,itemIndex)" style="margin-left:5px;">-</Button>
                                    </li>
                                    <li style="margin-bottom:5px;">
                                        <Button  type="primary"  @click="addItem(6,2)" >+</Button>
                                    </li>
                                </ul>                               
                            </td>
                        </tr>
                    </table>
                    <div style="width:1098px;margin:0 auto;">
                    <Button  type="primary"  @click="onSave()" style="margin-left:486px;margin-top:30px;" >保存值班安排信息</Button>
                    </div>
                </Content>
	</div>
</template>
<script type="text/javascript">
export default {
  data()
  {
    return{
        loading:false,
        delsign:0,
        datecon:'',
        FullYear:'',
        datearray:['','','','','','',''],
        maninfos:[[[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]]],
        pickerOptions: {
          shortcuts: [{
            text: '前一时段',
            onClick(picker) {
              const start = picker.date;
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', start);
            }
            }, {
                text: '后一时段',
                onClick(picker) {
                const start = picker.date;
                start.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                picker.$emit('pick', start);
                }
            }]
        },
    }
  },
  mounted(){
           var now=new Date();
           var year=now.getFullYear();
            var month=now.getMonth()+1;
            if(month<10){
                month='0'+month;
            }
            var day=now.getDate();
            if(day<10){
                day='0'+day;
            }
            this.datecon=year+'-'+month+'-'+day;
           this.getDates(now);  
           this.Reload();          
        },
  methods:{
    Reload()
    {
        this.loading = true;
        this.maninfos=[[[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]],
                  [[{name:'',phone:''}],[{name:'',phone:''}],[{name:'',phone:''}]]];
        //调用后台函数，传递参数
      this.axios.get('/alarm/getdutyplan',{params:{begintime:this.datearray[0],endtime:this.datearray[6]}}).then((res)=>{
                    this.loading = false;
                    let tabledata = res.data;
                    if(tabledata.length>0){
                        this.delsign=1;
                        for(var i=0;i<tabledata.length;i++){
                            var h,s;
                            for(var t=0;t<this.datearray.length;t++){
                                if(tabledata[i].OLANDATE==this.datearray[t]){
                                    h=t;
                                    break;
                                }
                            }
                            s=tabledata[i].TYPE-1;
                            var manarray=this.maninfos[h][s];
                            if(manarray[0].name==''){
                                manarray[0].name=tabledata[i].NAME;
                                manarray[0].phone=tabledata[i].PHONE;
                            }else{
                                var obj_m=new Object();
                                obj_m.name=tabledata[i].NAME;
                                obj_m.phone=tabledata[i].PHONE;
                                manarray.push(obj_m);
                            }
                            
                        }
                    }else{
                        this.delsign=0;
                    }
                });
    },
    deleteItem(i,j,index){
        this.maninfos[i][j].splice(index,1);
    },
    addItem(i,j){
        var obj_i=new Object();
        obj_i.name='';
        obj_i.phone='';
        this.maninfos[i][j].push(obj_i);
    },
    getDates(curdate){
        var timesStamp = curdate.getTime();
        var currenDay = curdate.getDay();
        this.datearray = [];
        for(var i = 0; i < 7; i++) {
            var temp_date=new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7));
            var year=temp_date.getFullYear();
            var month=temp_date.getMonth()+1;
            if(month<10){
                month='0'+month;
            }
            var day=temp_date.getDate();
            if(day<10){
                day='0'+day;
            }
            var weekday=year+'-'+month+'-'+day;
            this.datearray.push(weekday);
            if(i==0){
                this.FullYear=year.toString();
            }
        }
    },
    timechange(date){
        this.datecon=date;
        let str = date.replace(/-/g, '/');
        let curdate = new Date(str);
        this.getDates(curdate);
        this.Reload();
    },
    onSave(){
        var postData=new Array();
        for(var i=0;i<7;i++){
            for(var j=0;j<3;j++){
                var array=this.maninfos[i][j];
                for(var h=0;h<array.length;h++){
                    var obj_t=new Object();
                    obj_t.name=array[h].name;
                    obj_t.phone=array[h].phone;
                    var reg =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                    if(obj_t.name.length>10){
                        this.$message({message:this.datearray[i]+' '+this.showdate(i)+this.showtype(j)+'：姓名'+obj_t.name+'异常！',type:'warning'});
                        return;
                    }
                    if(obj_t.phone!=null && obj_t.phone.trim()!='' && !reg.test(obj_t.phone)){
                        this.$message({message:this.datearray[i]+' '+this.showdate(i)+this.showtype(j)+'：手机号'+obj_t.phone+'异常！',type:'warning'});
                        return;
                    }
                    if((obj_t.name==null || obj_t.name.trim()=='') && (obj_t.phone==null || obj_t.phone.trim()=='')){
                        continue;
                    }else if((obj_t.name!=null && obj_t.name.trim()!='') && (obj_t.phone==null || obj_t.phone.trim()=='')){
                        this.$message({message:this.datearray[i]+' '+this.showdate(i)+this.showtype(j)+'：'+obj_t.name+'对应的手机号码请输入！',type:'warning'});
                        return;
                    }else if((obj_t.name==null || obj_t.name.trim()=='') && (obj_t.phone!=null && obj_t.phone.trim()!='')){
                        this.$message({message:this.datearray[i]+' '+this.showdate(i)+this.showtype(j)+'：'+obj_t.phone+'对应的姓名请输入！',type:'warning'});
                        return;
                    }else{
                        obj_t.olandate=this.datearray[i];
                        obj_t.type=j+1;
                        postData.push(obj_t);
                    }
                }
            }
        }
        if(postData.length<1){
            this.$message({message:'请输入人员值班安排信息！',type:'warning'});
            return;
        }
        this.loading = true;
        var postParam=new Object();
        postParam["list"]=postData;
        postParam["delsign"]=this.delsign;
        postParam["begintime"]=this.datearray[0];
        postParam["endtime"]=this.datearray[6];
        this.axios.post('/alarm/adddutyplan',postParam).then((res)=>{
                                if(res.data=="ok"){
                                    this.loading = false;
                                    if(this.delsign==0){
                                        this.delsign=1;
                                    }
                                    this.$message({message:'人员值班安排信息保存成功！',type:'success'});
                                }                   
                            });
    },
    showdate(sign){
        let str='';
        switch(sign) {
            case 0:
                str='星期一';
                break;
            case 1:
                str='星期二';
                break;
            case 2:
                str='星期三';
                break;
            case 3:
                str='星期四';
                break;
            case 4:
                str='星期五';
                break;
            case 5:
                str='星期六';
                break;
            case 6:
                str='星期日';
                break;
        }
        return str;
    },
    showtype(sign){
        let str='';
        switch(sign) {
            case 0:
                str='主管领导';
                break;
            case 1:
                str='值班领导';
                break;
            case 2:
                str='值班人员';
                break;
        }
        return str;
    },
    showManinfo(i,j){
        var obj_t=new Object();
        obj_t.i=i;
        obj_t.j=j;
        obj_t.itype='zhibanrenyuan';
        obj_t.list=[];
        this.$emit('showdailog', obj_t);
    },
    showphone(dataobj){ 
        if(dataobj.list==null || dataobj.list.length==0){
            return;
        }
        var curarray=this.maninfos[dataobj.i][dataobj.j];
        var manlist=dataobj.list;
        for(var h=0;h<manlist.length;h++){
            if(curarray.length==1 && (curarray[0].name==null || curarray[0].name.trim()=='')){
                curarray[0].name=manlist[h].NM;
                curarray[0].phone=manlist[h].MOBILE;
            }else{
                var obj_t=new Object();
                obj_t.name=manlist[h].NM;
                obj_t.phone=manlist[h].MOBILE;
                let write=0;
                for(var s=0;s<curarray.length;s++){
                    if(curarray[s].name==obj_t.name){
                        if(curarray[s].phone==null || curarray[s].phone==''){
                            curarray[s].phone=obj_t.phone;
                        }else{
                            write=1;
                            break;
                        }
                    }
                }
                if(write==0){
                    curarray.push(obj_t);
                }
            }
        }
    },
  }
}
</script>
<style lang="less" scoped>
html, body {
    width: 100%;
    height: 100%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  float:left; 
  list-style:none;
  margin-left:5px;
  margin-top: 5px;
}
.choose{
    margin-left:0px;
    width: 326px;
    border-bottom: solid 1px #C7CCD6;
}
li .showdada{
    width: 272px;
}
.table_show {
margin: 0 auto;
 width: 1098px;
 border:1px solid #C7CCD6;
 border-collapse:collapse; 
 color: #515A6E;
 th{background-color: #EFF2F6;color:#4b5469;}
 th, td {
    height: 42px;
    border-top: none;
    border:1px solid #C7CCD6;
  }
tr:nth-child(even){     //偶数行
    background:#F7FAFD;
}
}
</style>