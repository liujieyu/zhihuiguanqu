<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>率定管理</BreadcrumbItem>
            <BreadcrumbItem>率定结果管理</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="resultmanage">
	        <TabPane label="率定结果管理" name="resultmanage">

	        	<Warmresult ref="resultmanage" @showdailog="showdailog"></Warmresult>
                
	        </TabPane>
	    </Tabs>
      <!--表单对话框-->
  <div v-if="dialogTableVisible">
  <el-dialog width="350px" :title="dailog.title" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true"   :close-on-click-modal="false" :modal-append-to-body="false" :modal="false"  @close="beforeclose">
  <!--表单详情-->
        <Resultform :info="dailog" v-if="dailog.itype=='resultform'" @closedailog="closedailog"></Resultform>
   </el-dialog>
	</div>
	</div>
</template>

<script type="text/javascript">
  import Warmresult from '@/warm/warm-ldresult/result-manage/warmresult.vue'
  import Resultform from '@/warm/warm-detail/Detail-resultform.vue'
	export default {
        data() {
        return { 
          //对话框
          dialogTableVisible:false,
          dailog: {},
        };
      },

      mounted() { },
      methods: { 
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
        this.$refs['resultmanage'].Reload();
        //this.dialogTableVisible=false;
        //this.beforeclose();
      }
      },
      computed: { },
      components: { 
        Warmresult,
        Resultform
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>