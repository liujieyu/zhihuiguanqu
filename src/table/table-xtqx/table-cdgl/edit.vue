<template>
  <div>
    <h2>修改菜单</h2>

    <el-form ref="form" :model="form" label-width="130px" style="margin: 30px;">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.url" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.index" :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="form.ctime" type="datetime" placeholder="选择日期时间" style="width:350px"></el-date-picker>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="form.creator" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="最后一次修改时间">
        <el-date-picker v-model="form.upTime" type="datetime" placeholder="选择日期时间" style="width:350px"></el-date-picker>
      </el-form-item>
      <el-form-item label="最后一次修改人">
        <el-input v-model="form.modifier" style="width: 350px;"></el-input>
      </el-form-item>

      <el-form-item label="位置">
        <el-select v-model="form.position" placeholder="请选择位置">
          <el-option label="位置一" value="shanghai"></el-option>
          <el-option label="位置二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-select v-model="form.type" placeholder="请选择菜单类型">
          <el-option label="菜单类型一" value="shanghai"></el-option>
          <el-option label="菜单类型二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图标">
        <el-select v-model="form.icon" placeholder="请选择图标">
          <el-option label="图标类型一" value="shanghai"></el-option>
          <el-option label="图标类型二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" style="width:700px">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 40px;">
        <el-button type="primary" @click="onSubmit()">确定修改</el-button>
        <el-button type="info" style="margin-left: 70px;" @click="close">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
//   import YSH from '@/table/table-basedata/table-ysh/ysh.vue'
//   import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
//   import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
export default {
  props: {
    id: ""
  },
  data() {
    return {
      form: {}
    };
  },

  mounted() {
    this.Reload()
  },
  methods: {
    Reload(){
      this.axios.get('/guanqu/web/menus/'+this.id).then((res) => {
        this.form = res.data;
      });
    },
      onSubmit(){
        if (this.form.fatherId == '') {
          this.form.fatherId = null;
        }
        
        this.axios.put('/guanqu/web/menus/',{id:this.form.id,name:this.form.name,url:this.form.url,index:this.form.index,fatherId:this.form.fatherId,type:this.form.type,icon:this.form.icon,remark:this.form.remark}).then((res) => {
            this.$message({
              message: '修改菜单成功',
              type: 'success'
            });
        });  
      },
      close(){
        this.$emit("closewindows");
      },
  },
  computed: {},
  components: {}
};
</script>

<style type="text/css">
</style>
