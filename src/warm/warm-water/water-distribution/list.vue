<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>配水管理</BreadcrumbItem>
            <BreadcrumbItem>用水考核指标</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="waterdistribution">
	        <TabPane label="用水考核指标" name="waterdistribution">               
                <div :style="{'height':theight+'px','overflow':'auto'}">
	        	<Distribution></Distribution> 
                </div> 
                <!--
                预留接口
                   -->           
	        </TabPane>
	    </Tabs>
	</div>
</template>
<script type="text/javascript">
import Distribution from '@/warm/warm-water/water-distribution/distrubution.vue'
export default {
        data() {
        return { 
            theight:window.innerHeight-190
        };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      Distribution,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>