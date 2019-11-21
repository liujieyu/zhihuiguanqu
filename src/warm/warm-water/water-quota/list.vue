<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>配水管理</BreadcrumbItem>
            <BreadcrumbItem>用水定额计划管理</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="quotaplan">
	        <TabPane label="用水定额计划管理" name="quotaplan">
	        	<QuotaPlan></QuotaPlan>                
	        </TabPane>
	    </Tabs>
	</div>
</template>
<script type="text/javascript">
import QuotaPlan from '@/warm/warm-water/water-quota/quotaplan.vue'
export default {
        data() {
        return { 
        };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      QuotaPlan,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>