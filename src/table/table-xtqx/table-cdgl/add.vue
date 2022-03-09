<template>
  <div>
    <h2>新增菜单</h2>

    <el-form ref="form" :model="form" label-width="80px" style="margin: 30px;">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name" style="width: 350px;"></el-input>
      </el-form-item>
       <el-form-item label="URL">
        <el-input v-model="form.url" style="width: 350px;"></el-input>
      </el-form-item>
       <el-form-item label="排序">
        <el-input-number v-model="form.index" :min="1" label="描述文字"></el-input-number>
      </el-form-item>
      
      <el-form-item label="位置">
        <el-cascader
          v-model="form.fatherId"
          :options="menus_list"
          :props="{ checkStrictly: true }"
          clearable> 
        </el-cascader>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-select v-model="form.type" placeholder="请选择菜单类型">
          <el-option label="菜单" value="菜单"></el-option>
          <el-option label="选项卡" value="选项卡"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图标">
        <el-select v-model="form.icon" placeholder="请选择图标">
          <el-option label="图标类型一" value="shanghai"></el-option>
          <el-option label="图标类型二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" style="width:700px"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 40px;">
        <el-button type="primary" @click="Save">确定</el-button>
        <el-button type="info" style="margin-left: 70px;" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    {{form}}
  </div>
</template>

<script type="text/javascript">
//   import YSH from '@/table/table-basedata/table-ysh/ysh.vue'
//   import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
//   import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
export default {
  data() {
    return {
      form: {
        name: null,
        url: "",
        index: 1,
        fatherId:[],
        type: "",
        icon:"",
        remark: ""
      },
      menus_list:[],
    };
  },

  mounted() {
    this.Reload()
  },
  methods: {
    Reload(){
      this.axios.get('/guanqu/web/menus/list').then((res) => {
        this.menus_list = res.data;
                    
      });
    },
    Save(){
      if (this.form.fatherId.length == 0) {
        this.form.fatherId = null;
      }else{
        this.form.fatherId = this.form.fatherId[this.form.fatherId.length-1];
      }
      if (!this.form.name) {
        this.$message({
          message: '菜单名称不能为空!',
          type: 'warning'
        });
      }else{
        this.axios.post('/guanqu/web/menus/',{name:this.form.name,url:this.form.url,index:this.form.index,fatherId:this.form.fatherId,type:this.form.type,icon:this.form.icon,remark:this.form.remark}).then((res) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.$emit("closewindows");
          this.resetForm();
        });
      } 
    },
    resetForm() {
      this.form.name = '';
      this.form.url = '';
      this.form.index = 1;
      this.form.fatherId = '';
      this.form.type = '';
      this.form.icon = '';
      this.form.remark = '';
    },
  },
  computed: {},
  components: {}
};
</script>

<style type="text/css">
</style>
