<template>
	<div style="overflow: hidden;">
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>雨情信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="rb" v-model="rb" @tab-click="handleClick" style="height: 100%;">
          <TabPane label="小时表" name="xsb">
            <Tablehour></Tablehour>
	        </TabPane>
	        <TabPane label="日表" name="rb">
            <Tableday></Tableday>
	        </TabPane>
          <TabPane label="月表" name="yb">
              <TableMonth></TableMonth>
          </TabPane>
          <TabPane label="年表" name="nb">
              <TableYear></TableYear>
          </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
import Tableday from "@/table/table-xxfw/table-yqxx/table-day.vue"
import Tablehour from "@/table/table-xxfw/table-yqxx/table-hour.vue"
import TableMonth from '@/table/table-xxfw/table-yqxx/table-month.vue'
import TableYear from '@/table/table-xxfw/table-yqxx/table-year.vue'


// const Tableday = resolve =>require(['@/table/table-xxfw/table-yqxx/table-day.vue'],resolve)
	export default {
        data() {
        return {
          activeName:'day',
         };
      },

      mounted() { },
      methods: {
        handleClick(tab, event){
      		this.checkVue(tab.name);
        },
        checkVue (name) {
      		switch (name) {
      			case 'hour' :
		          this.Tablehour = Tablehour
		          break
		        case 'day' :
		          this.Tableday = Tableday
		          break
		        case 'month' :
		          this.Tablemonth = Tablemonth
		          break
		        case 'history' :
		          this.Tablehistory = Tablehistory
		          break
		      		}
      	}
       },
      computed: { },
      components: {
         'Tableday':Tableday,
         'Tablehour':Tablehour,
          'TableMonth': TableMonth,
          'TableYear': TableYear
      }
    }
</script>

<style type="text/css">

</style>
