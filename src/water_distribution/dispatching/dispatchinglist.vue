<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>配水管理</BreadcrumbItem>
    <BreadcrumbItem>调度运行管理</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="dispatching">
	  <TabPane label="调度运行管理" name="dispatching">
      
      <DispatchingInfo></DispatchingInfo>
      
      <!--
        预留接口
      -->
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import DispatchingInfo from '@/water_distribution/dispatching/dispatchinginfo.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    DispatchingInfo,
    }
  }
</script>

<style lang="less" scope>
@import "../../warm/common/warmcss.less";
</style>