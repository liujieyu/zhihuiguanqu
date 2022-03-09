<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>值班管理</BreadcrumbItem>
    <BreadcrumbItem>值班通讯录</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="dutylist">
	  <TabPane label="值班通讯录" name="dutylist">
	    <DutyList></DutyList>
	  </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import DutyList from '@/warm/warm-duty/duty-addrlist/addrlist.vue'
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    DutyList,
    }
  }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>