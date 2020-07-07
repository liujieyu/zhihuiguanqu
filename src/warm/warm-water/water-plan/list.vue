<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>配水管理</BreadcrumbItem>
            <BreadcrumbItem>需水计划管理</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="waterplan">
	        <TabPane label="需水计划管理" name="waterplan">
                
                <WaterPlan></WaterPlan>
                
                <!--
                    预留接口
                -->	        	              
	        </TabPane>
	    </Tabs>
	</div>
</template>
<script type="text/javascript">
import WaterPlan from '@/warm/warm-water/water-plan/waterplan.vue'
export default {
        data() {
        return { 
        };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      WaterPlan,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>