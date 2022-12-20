<template>
	<div style="overflow: hidden;">
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>水雨情监测</BreadcrumbItem>
            <BreadcrumbItem>历史分析</BreadcrumbItem>
            <BreadcrumbItem>雨情分析</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="lsfx" @tab-click="handleClick" style="height: 100%;">
          <TabPane label="时段报表" name="xsb">
            <Tablehour></Tablehour>
	        </TabPane>
	        <TabPane label="日报表" name="rb">
            <Tableday></Tableday>
	        </TabPane>
          <TabPane label="月报表" name="yb">
              <TableMonth></TableMonth>
          </TabPane>
          <TabPane label="年报表" name="nb">
              <TableYear></TableYear>
          </TabPane>
          <TabPane label="历史分析" name="lsfx">
              <HistoryFenxi></HistoryFenxi>
          </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
import Tableday from "@/table/table-xxfw/table-yqxx/table-day.vue"
import Tablehour from "@/table/table-xxfw/table-yqxx/table-hour.vue"
import TableMonth from '@/table/table-xxfw/table-yqxx/table-month.vue'
import TableYear from '@/table/table-xxfw/table-yqxx/table-year.vue'
import HistoryFenxi from '@/table/table-xxfw/table-yqxx/yq-history.vue';


// const Tableday = resolve =>require(['@/table/table-xxfw/table-yqxx/table-day.vue'],resolve)
	export default {
        data() {
        return {
          activeName:'lsfx',
         };
      },

      mounted() { },
      methods: {
        handleClick(tab, event){
      		this.checkVue(tab.name);
        },
        checkVue (name) {
      		switch (name) {
      			case 'xsb' :
		          this.Tablehour = Tablehour
		          break
		        case 'rb' :
		          this.Tableday = Tableday
		          break
		        case 'yb' :
		          this.Tablemonth = Tablemonth
		          break
		        case 'nb' :
		          this.Tablehistory = Tablehistory
		          break
            case 'lsfx':
              this.HistoryFenxi=HistoryFenxi
              break;
		      		}
      	}
       },
      computed: { },
      components: {
         'Tableday':Tableday,
         'Tablehour':Tablehour,
          'TableMonth': TableMonth,
          'TableYear': TableYear,
          'HistoryFenxi':HistoryFenxi,
      }
    }
</script>

<style type="text/css">

</style>
