<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>率定管理</BreadcrumbItem>
            <BreadcrumbItem>率定数据管理</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmmefile">
	        <TabPane label="率定数据管理" name="warmmefile">

	        	<Warmmefile ref="mefilemanage" @showupload="showupload" @showdailog="showdailog"></Warmmefile>
                
	        </TabPane>
	    </Tabs>
      <!--上传表单对话框-->
  <div v-if="uploadVisible">
  <el-dialog title="率定测量数据上传" :visible.sync="uploadVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true"   :close-on-click-modal="false" :modal-append-to-body="false" :modal="false" :width="dialogWidth">
  <!--短信发送人员详情-->
        <Warmimport v-if="uploadVisible" @closeupload='closeupload'></Warmimport>
   </el-dialog>
	</div>
  <!--详情和审核界面-->
  <div v-if="dialogTableVisible">
  <el-dialog :title="dailog.title" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true"   :close-on-click-modal="false" :modal-append-to-body="false" :modal="false"  @close="beforeclose">
        <div id="showdiv">
        <Warmmedata :info="dailog" v-if="dailog.itype=='medatadetail'" @closedailog="closedailog"></Warmmedata>
        </div>
   </el-dialog>
	</div>
    </div>
</template>
<script type="text/javascript">
  import Warmmefile from '@/warm/warm-ldresult/mefile-manage/warmmefile.vue'
  import Warmimport from '@/warm/warm-detail/Detail-import.vue'
  import Warmmedata from '@/warm/warm-detail/Detail-Medatainfo.vue'
	export default {
        data() {
        return { 
          uploadVisible:false,
          dialogTableVisible:false,
          dialogWidth:0,
          dailog: {},
        };
      },

      mounted() { },
      methods: { 
      showupload(){
        this.dialogWidth=570+'px';
        this.uploadVisible=true;
      },
      //显示对话框
      showdailog(info){
        this.dailog=info;
        this.dialogTableVisible=true;
      },
      //关闭对话框
      beforeclose(){
        this.dailog={};
      },
      //确认
      closedailog(){
        this.$refs['mefilemanage'].Reload();
        this.dialogTableVisible=false;
        this.beforeclose();
      },
      closeupload(sign){
        if(sign==1){
          this.$refs['mefilemanage'].Reload();
        }
        this.uploadVisible=false;        
      }
      },
      computed: { },
      components: { 
        Warmmefile,
        Warmimport,
        Warmmedata
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>