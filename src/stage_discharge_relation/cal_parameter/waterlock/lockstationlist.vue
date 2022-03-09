<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>率定管理</BreadcrumbItem>
    <BreadcrumbItem>率定参数</BreadcrumbItem>
    <BreadcrumbItem>水闸站点参数</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="lockstation">
	  <TabPane label="水闸站点参数" name="lockstation">
	    <LockStation></LockStation>
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import LockStation from '@/stage_discharge_relation/cal_parameter/waterlock/lockstationinfo.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    LockStation,
    }
  }
</script>
<style lang="less" scope>
@import "../../../warm/common/warmcss.less";
</style>