<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>水情信息</BreadcrumbItem>
            <BreadcrumbItem>渠道水情</BreadcrumbItem>
        </Breadcrumb>

		<!-- <Tabs value="day">
	        <TabPane label="小时表" name="hour">
	        	<Tablehour></Tablehour>
	        </TabPane>
	        <TabPane label="日表" name="day">
	        	<Tableday></Tableday>
	        </TabPane>
	        <TabPane label="月表" name="month">
	        	<Tablemonth></Tablemonth>
	        </TabPane>
	        <TabPane label="历史表" name="history">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs> -->
	    <el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="小时表" name="hour">
		    	<component :is="Tablehour"></component>
		    	<!-- <Tablehour></Tablehour> -->
		    </el-tab-pane>
		    <el-tab-pane label="日表" name="day">
		    	<component :is="Tableday"></component>
		    	<!-- <Tableday></Tableday> -->
		    </el-tab-pane>
		    <el-tab-pane label="月表" name="month">
		    	<component :is="Tablemonth"></component>
		    	<!-- <Tablemonth></Tablemonth> -->
		    </el-tab-pane>
		    <el-tab-pane label="历史表" name="history">
		    	<component :is="Tablehistory"></component>
				<!-- <Tablehistory></Tablehistory> -->
		    </el-tab-pane>
	    </el-tabs>
	</div>
</template>

<script type="text/javascript">
	const Tablehour = resolve =>require(['@/table/table-qdsq/table-hour.vue'],resolve)
	const Tableday = resolve =>require(['@/table/table-qdsq/table-day.vue'],resolve)
	const Tablemonth = resolve =>require(['@/table/table-qdsq/table-month.vue'],resolve)
	const Tablehistory = resolve =>require(['@/table/table-qdsq/table-history.vue'],resolve)
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
      		// switch (name) {
      		// 	case 'hour' :
		    //       this.Tablehour = Tablehour
		    //       break
		    //     case 'day' :
		    //       this.Tableday = Tableday
		    //       break
		    //     case 'month' :
		    //       this.Tablemonth = Tablemonth
		    //       break
		    //     case 'history' :
		    //       this.Tablehistory = Tablehistory
		    //       break
		    //   		}
      	}
      },
      computed: { },
      components: {
        // Tablehour,
        // Tableday,
        // Tablemonth,
        // Tablehistory
      }
    }
</script>

<style type="text/css">

</style>
