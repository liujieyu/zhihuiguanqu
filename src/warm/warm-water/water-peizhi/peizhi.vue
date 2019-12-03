<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol">
                <Col>
                计划年份:
                <Select v-model="form.year" :clearable="false" @on-change="Consearch" style="width:100px;">
                    <Option
                    v-for="obj in yearlist"
                    :key="obj.value"
                    :label="obj.label"
                    :value="obj.value">
                    </Option>
                </Select>
                </Col>
            </Row>
            <Row class="fgline"></Row>
        <table cellspacing="0" cellpadding="0" border="1" width="100%">
            <tr>
               <th rowspan="3">开始日期</th><th rowspan="3">结束日期</th><th rowspan="3">天数</th><th rowspan="3">配水指标</th><th rowspan="3">区间及地点</th><th colspan="16">总干渠</th><th>峡山干渠</th><th colspan="2">沙河干渠</th><th>太阳坝干渠</th>
            </tr>
            <tr>
                <th colspan="5">大坝管理所</th><th colspan="3">横双管理所</th><th colspan="8">煤炭坝管理所</th><th>横双管理所</th><th colspan="2">沙河管理所</th><th>沙河管理所</th>
            </tr>
            <tr>
                <th>渠首</th><th>胜溪</th><th>桃源</th><th>西塘</th><th>谢家冲</th><th>石牛坝</th><th>南岭冲</th><th>烂泥</th><th>塘湾</th><th>煤衡</th><th>东风</th><th>陈家坡</th><th>白竹冲</th><th>金木杭</th><th>南干渠首</th><th>北干渠首</th><th>峡山</th><th>左干渠首</th><th>右干渠首</th><th>渠首</th>
            </tr>
            <tr>
                <td rowspan="7">2019-04-21</td><td rowspan="7">2019-06-30</td><td rowspan="7">71</td><td colspan="2">控制点流量</td><td>28</td><td>22.54</td><td>20.32</td><td>18.97</td><td>17.5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">损失流量</td><td>渠系</td><td colspan="5">3.42</td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td>2.81</td><td>0.61</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">毛流量</td><td>渠系</td><td colspan="5">7.68</td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td>5.46</td><td>2.22</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">毛水量</td><td>渠系</td><td colspan="5">4711.22</td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td>3349.38</td><td>1361.84</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="7">2019-07-01</td><td rowspan="7">2019-09-30</td><td rowspan="7">92</td><td colspan="2">控制点流量</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">损失流量</td><td>渠系</td><td colspan="5"></td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">毛流量</td><td>渠系</td><td colspan="5"></td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">毛水量</td><td>渠系</td><td colspan="5"></td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="7">2019-10-01</td><td rowspan="7">2019-10-20</td><td rowspan="7">20</td><td colspan="2">控制点流量</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">损失流量</td><td>渠系</td><td colspan="5"></td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">毛流量</td><td>渠系</td><td colspan="5"></td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td rowspan="2">毛水量</td><td>渠系</td><td colspan="5"></td><td colspan="3"></td><td colspan="8"></td><td></td><td colspan="2"></td><td></td>
            </tr>
            <tr>
                <td>区间</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
        </table>
        </Content>
    </div>
</template>
<script type="text/javascript">
export default {
        data() {
          return {
              yearlist:[],
              form:{
                    year:'',
                },
          }
        },
        mounted() {
            debugger;
            var now=new Date();
            var year=now.getFullYear();
            for(var i=0;i<10;i++){
                var yobj=new Object();
                yobj.value=year-i;
                yobj.label=(year-i)+'年';
                this.yearlist.push(yobj);
            }
            this.form.year=year;
      },
      methods: {

      }
}
</script>
<style scoped>
table,th{
    /*边框合并*/
    border-collapse: collapse;
    border: 1px solid #C7CCD6;
    text-align: center;
    padding: 6px 0;
    background-color: #EFF2F6;
    color:#4b5469;
}
table,td{
    /*边框合并*/
    border-collapse: collapse;
    border: 1px solid #C7CCD6;
    text-align: center;
    padding: 6px 0;
    background-color: #fff;
}
</style>