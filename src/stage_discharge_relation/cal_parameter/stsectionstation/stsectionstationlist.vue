<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>率定管理</BreadcrumbItem>
    <BreadcrumbItem>率定参数</BreadcrumbItem>
    <BreadcrumbItem>标准断面站点参数</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="standardstation">
	  <TabPane label="标准断面站点参数" name="standardstation">
	    <StandardStation></StandardStation>
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import StandardStation from '@//stage_discharge_relation/cal_parameter/stsectionstation/standardstation.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    StandardStation,
    }
  }
</script>

<style lang="less" scope>
@import "../../../warm/common/warmcss.less";
</style>