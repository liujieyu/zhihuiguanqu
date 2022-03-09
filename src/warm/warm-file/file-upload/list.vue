<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>预警管理</BreadcrumbItem>
            <BreadcrumbItem>文件上传</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="fileupload">
	        <TabPane label="文件上传" name="fileupload">

	        	<Fileupload></Fileupload>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import Fileupload from '@/warm/warm-file/file-upload/uploadfile.vue'
	export default {
        data() {
        return { 
        };
      },

      mounted() { },
      methods: { 
      },
      computed: { },
      components: { 
        Fileupload,
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>