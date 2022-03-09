<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>率定管理</BreadcrumbItem>
    <BreadcrumbItem>率定站点信息</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="stagestation">
	  <TabPane label="率定站点信息" name="stagestation">
	    <StageStation></StageStation>
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import StageStation from '@/stage_discharge_relation/stage_station/stagestationinfo.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    StageStation,
    }
  }
</script>

<style lang="less" scope>
@import "../../warm/common/warmcss.less";
</style>