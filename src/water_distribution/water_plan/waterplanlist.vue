<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>配水管理</BreadcrumbItem>
    <BreadcrumbItem>配水管理</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="waterplaninfo">
	  <TabPane label="配水管理" name="waterplaninfo">
      <!--
      预留接口
      -->
        <WaterPlanInfo></WaterPlanInfo>	    
      
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import WaterPlanInfo from '@/water_distribution/water_plan/waterplaninfo.vue'
  export default {
    data(){
      return{ };
    },
    methods:{ },
    computed:{ },
    components:{ 
    WaterPlanInfo,
    }
  }
</script>

<style type="text/css">
	
</style>