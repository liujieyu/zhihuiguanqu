<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>值班管理</BreadcrumbItem>
    <BreadcrumbItem>雨水情报表导出</BreadcrumbItem>
    </Breadcrumb>
	<Tabs value="warmexport">
	  <TabPane label="雨情报表导出" name="warmexport">
	    <WarmExport></WarmExport>
	  </TabPane>
    <TabPane label="水库水情报表导出" name="rsvrexport">
	    <RsvrExport></RsvrExport>
	  </TabPane>
    <TabPane label="河道水情报表导出" name="riverexport">
	    <RiverExport></RiverExport>
	  </TabPane>
    <TabPane label="水库水情小时表" name="reservoirhour">
	    <ReservoirHour></ReservoirHour>
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import WarmExport from '@/warm/warm-export/export.vue'
  import RsvrExport from '@/warm/warm-export/rsvrexport.vue'
  import RiverExport from '@/warm/warm-export/riverexport.vue'
  import ReservoirHour from '@/warm/warm-export/reservoirhour.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    WarmExport,
    RsvrExport,
    RiverExport,
    ReservoirHour
    }
  }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>