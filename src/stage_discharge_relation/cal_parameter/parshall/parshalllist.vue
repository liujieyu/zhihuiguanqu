<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>率定管理</BreadcrumbItem>
    <BreadcrumbItem>率定参数</BreadcrumbItem>
    <BreadcrumbItem>巴歇尔槽站点参数</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="parshallparameter">
	  <TabPane label="巴歇尔槽站点参数" name="parshallparameter">
	    <ParshallParameter></ParshallParameter>
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import ParshallParameter from '@/stage_discharge_relation/cal_parameter/parshall/parshallparameter.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    ParshallParameter,
    }
  }
</script>
<style lang="less" scope>
@import "../../../warm/common/warmcss.less";
</style>