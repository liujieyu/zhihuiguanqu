<template>
  <div>
    <div>
      <div style="width: 50%;margin: 0 auto;">
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          node-key="id"
          :default-checked-keys="data1"
          
          ref="tree"
          @check-change="handleCheckChange"
          show-checkbox
        ></el-tree>
      </div>
      <!-- <div style="width: 50%">
        我的权限：
        <el-tree
          class="filter-tree"
          :data="data1"
          :props="defaultProps"
          default-expand-all
          @node-click="handleNodeClick"
          ref="tree2"
        ></el-tree>
      </div> -->
    </div> 
    
    <div style="display: flex; justify-content: flex-end;">
      <el-button style @click="del">取消</el-button>
      <el-button type="primary" @click="POWER()">确定</el-button>
    </div>
  </div>
</template>

<script type="text/javascript">
//   import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
//   import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
export default {
  props: {
    id: ""
  },
  data() {
    return {
      addShow: false,
      detailShow: false,
      editShow: false,
      data: [],
      data1:[],
      loading:false,
      idlist:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    };
  },

  mounted() {
    this.Reload();
  },
  methods: {
    Reload(){
      this.loading = true;
      this.axios.get('/guanqu/web/menus/list').then((res) => {
        this.data = res.data;
        this.loading = false;
      });
      this.axios.get('/guanqu/web/sys-roles/'+this.id+'/-user/menuids/no-childrens').then((res) => {
        this.data1 = res.data;
      });
    },
    handleCheckChange(data, Node ){
      // console.log(data, Node);
      let res = this.$refs.tree.getCheckedNodes();
      let arr = [];
      res.forEach((item)=>{
        arr.push(item.id);
      })
      this.data1 = arr;
      console.log(this.data1);
      // this.axios.put('/guanqu/web/sys-roles/'+data.id+'/menus').then((res) => {
      //   this.$message({
      //     message: '赋权成功!',
      //     type: 'success'
      //   });
      //   this.Reload();
      // });
    },
    del(){
        this.$emit("closewindows");
    },

    POWER() {
          this.axios.put('/guanqu/web/sys-roles/'+this.id+'/menus',this.data1).then((res) => {
            this.$message({
              message: '赋权成功!',
              type: 'success'
            });
            // this.data1 = [];
            // this.Reload();
            this.$emit("closewindows");
          });
    }
  },
  computed: {},
  components: {
    // YSH,
    // NYYSDY,
    // GYYSDY
  }
};
</script>

<style type="text/css">
</style>
