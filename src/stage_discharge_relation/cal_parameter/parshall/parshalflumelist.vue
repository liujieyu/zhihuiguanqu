<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>率定管理</BreadcrumbItem>
    <BreadcrumbItem>率定参数</BreadcrumbItem>
    <BreadcrumbItem>标准巴歇尔槽参数</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="parshallflumeinfo">
	  <TabPane label="标准巴歇尔槽参数" name="parshallflumeinfo">
	    <ParshallFlumeInfo></ParshallFlumeInfo>
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import ParshallFlumeInfo from '@/stage_discharge_relation/cal_parameter/parshall/parshallflumeinfo.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    ParshallFlumeInfo,
    }
  }
</script>
<style lang="less" scope>
@import "../../../warm/common/warmcss.less";
</style>