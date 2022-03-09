<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>信息服务</BreadcrumbItem>
    <BreadcrumbItem>水情信息</BreadcrumbItem>
    <BreadcrumbItem>水情信息导出</BreadcrumbItem>
    </Breadcrumb>
	<Tabs value="exportqudao">
	  <TabPane label="渠道水情报表导出" name="exportqudao">
	    <QudaoExport></QudaoExport>
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import QudaoExport from '@/warm/warm-exportwater/qudaoexport.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    QudaoExport,
    }
  }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>