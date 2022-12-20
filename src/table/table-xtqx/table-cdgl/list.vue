<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
      <BreadcrumbItem>系统权限</BreadcrumbItem>
      <BreadcrumbItem>菜单管理</BreadcrumbItem>
    </Breadcrumb>
    <el-row style="margin-bottom: 14px;">
      <el-button type="primary" @click="add()" size="mini">新增菜单</el-button>
    </el-row>
    <el-container :style="{'height': theight+'px','border': '1px solid #eee'}">
      <el-aside width="200px" :style="{'background-color':'#fff','height':(theight-1)+'px'}">
        <el-tree
          v-loading="loading"
          class="filter-tree"
          :data="data"
          default-expand-all
          @node-click="handleNodeClick"
          ref="tree"
        ></el-tree>
      </el-aside>

      <el-main style="position:relative;margin-top:-15px;padding-bottom:0px;">
        <!-- 提示语 -->
        <p v-if="tipshow" style="font-size: 14px;margin-top: 25%;position: absolute;left: 40%;">请在左侧树形图选择菜单</p>
        <!-- 新增菜单 -->
        <div v-if="addShow">
          <h2>新增菜单</h2>

          <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
            <el-form-item label="菜单名称" prop="name">
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
            <el-form-item style="margin-top: 20px;">
              <el-button type="primary" @click="Save">确定</el-button>
              <el-button type="info" style="margin-left: 70px;" @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- {{form}} -->
        </div>

        <!-- 详情 -->
        <div v-if="dialog_detail_showing">
          <h2>菜单信息</h2>

          <el-form ref="form2" :model="form2" label-width="140px" size="mini">
            <el-form-item label="菜单名称:">{{this.form2.name}}</el-form-item>
            <el-form-item label="URL:">{{this.form2.url}}</el-form-item>
            <el-form-item label="排序:">
              <el-input-number v-model="form2.index" :min="1" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="创建时间:">{{this.form2.ctime.replace('T',' ').substr(0,19)}}</el-form-item>
            <el-form-item label="创建人:">{{this.form2.creator}}</el-form-item>
            <el-form-item label="最后一次修改时间:">{{this.form2.upTime.replace('T',' ').substr(0,19)}}</el-form-item>
            <el-form-item label="最后一次修改人:">{{this.form2.modifier}}</el-form-item>
            <el-form-item label="位置:">{{this.form2.namelist}}</el-form-item>
            <el-form-item label="菜单类型:">{{this.form2.type}}</el-form-item>
            <el-form-item label="图标:">
              <i class="el-icon-help"></i>
            </el-form-item>
            <el-form-item label="备注:">{{this.form2.remark}}</el-form-item>

            <el-form-item style="margin-top: 20px;">
              <el-button type="primary" @click="openEdit()">修改菜单</el-button>
              <el-button type="primary" @click="deldetail()" style="margin-left: 70px;">删除菜单</el-button>
              <el-button type="primary" @click="closedetail()" style="margin-left: 70px;">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 修改 -->
        <div v-if="editShow">
          <h2>修改菜单</h2>

          <el-form ref="form3" :model="form3" label-width="140px" size="mini">
            <el-form-item label="菜单名称">
              <el-input v-model="form3.name" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item label="URL">
              <el-input v-model="form3.url" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model="form3.index" :min="1" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="form3.ctime" type="datetime" placeholder="选择日期时间" style="width:350px"></el-date-picker>
            </el-form-item>
            <el-form-item label="创建人">
              <el-input v-model="form3.creator" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item label="最后一次修改时间">
              <el-date-picker v-model="form3.upTime" type="datetime" placeholder="选择日期时间" style="width:350px"></el-date-picker>
            </el-form-item>
            <el-form-item label="最后一次修改人">
              <el-input v-model="form3.modifier" style="width: 350px;"></el-input>
            </el-form-item>

            <el-form-item label="位置">
              <el-cascader
                v-model="form3.idlist"
                :options="menus_list"
                :props="{ checkStrictly: true }"
                clearable> 
              </el-cascader>
            </el-form-item>
            <el-form-item label="菜单类型">
              <el-select v-model="form3.type" placeholder="请选择菜单类型">
                <el-option label="菜单" value="菜单"></el-option>
                <el-option label="选项卡" value="选项卡"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图标">
              <el-select v-model="form3.icon" placeholder="请选择图标">
                <el-option label="图标类型一" value="shanghai"></el-option>
                <el-option label="图标类型二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" style="width:700px">
              <el-input type="textarea" v-model="form3.remark"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 20px;">
              <el-button type="primary" @click="onSubmit()">确定修改</el-button>
              <el-button type="info" style="margin-left: 70px;" @click="closeedit">返回</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- <EDIT v-show="editShow==true"></EDIT> -->
      </el-main>
    </el-container>
    <!-- <el-dialog title="详情" :visible.sync="dialog_detail_showing" width="800px" destroy-on-close append-to-body>
      <DETAIL :id="menu.id" v-if="dialog_detail_showing" @closewindows="dialog_detail_showing=false; Reload();"></DETAIL>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addShow" width="900px" destroy-on-close append-to-body>
      <ADD v-if="addShow" @closewindows="addShow=false; Reload();"></ADD>
    </el-dialog> -->
  </div>
</template>

<script type="text/javascript">
import ADD from "@/table/table-xtqx/table-cdgl/add.vue";
import DETAIL from "@/table/table-xtqx/table-cdgl/detail.vue";
import Utils from '@/assets/utils.js';
//   import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
//   import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
export default {
  data() {
    return {
      theight:window.innerHeight-167,
      loading:false,
      addShow: false,
      dialog_detail_showing: false,
      editShow: false,
      tipshow:true,
      data: [],
      menu:{},
      //新增
      form: {
        name: "",
        url: "",
        index: 1,
        fatherId:[],
        type: "",
        icon:"",
        remark: ""
      },
      rules:{
        name:[
          { required: true, message: '请输入菜单名', trigger: 'blur' },
        ],
      },
      menus_list:[],
      //详情
      form2: {},
      dialog_edit_showing:false,
      menu:{id:''},
      //修改
      form3: {}
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
        this.menus_list = res.data;
        Utils.$emit('demo','msg');
        this.loading = false;
      });
    },
    add() {
      this.addShow = true;
      this.dialog_detail_showing = false;
      this.editShow = false;
      this.tipshow = false;
      // console.log(this.addShow);
    },
    handleNodeClick(data) {
      console.log(data);
      this.axios.get('/guanqu/web/menus/'+data.id+'/view').then((res) => {
        this.form2 = res.data.webMenu;
        var idlist = [];
        var namelist = [];
        this.form2.namelist = namelist;
        this.form2.idlist = idlist;
        res.data.fatherList.forEach(v=>{
          this.form2.idlist.push(v.id);
          this.form2.namelist.push(v.name);
        })
        this.form2.namelist = this.form2.namelist.join('/');
      });
      this.dialog_detail_showing = true;
      this.editShow=false;
      this.addShow = false;
      this.tipshow = false;
      
    },
    openEdit(){
      this.axios.get('/guanqu/web/menus/'+this.form2.id+'/view').then((res) => {
        this.form3 = res.data.webMenu;
        var idlist = [];
        this.form3.idlist = idlist;
        res.data.fatherList.forEach(v=>{
          this.form3.idlist.push(v.id);
        })
      });
      this.editShow = true;
      this.dialog_detail_showing = false;
      this.addShow = false;
      this.tipshow = false;
    },
    onSubmit(){
        if (this.form3.idlist == []) {
          this.form3.idlist = null;
        }
        
        this.axios.put('/guanqu/web/menus/',{id:this.form3.id,name:this.form3.name,url:this.form3.url,index:this.form3.index,fatherId:this.form3.idlist[this.form3.idlist.length-1],type:this.form3.type,icon:this.form3.icon,remark:this.form3.remark}).then((res) => {
            this.$message({
              message: '修改菜单成功',
              type: 'success'
            });
            this.Reload();
            this.editShow = false;
            this.tipshow = true;
        });  
      },
    closedetail(){
      this.dialog_detail_showing = false;
      this.tipshow = true;
    },
    closeedit(){
      this.editShow = false;
      this.dialog_detail_showing = true;
    },
    deldetail(){
      this.$confirm("您确定删除该菜单吗?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.delete('/guanqu/web/menus/'+this.form2.id).then((res) => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.dialog_detail_showing = false;
            this.tipshow = true;
            this.Reload();
          });
          
        })
        .catch(() => {
          // this.$message({
          //   type: "error",
          //   message: "已取消删除"
          // });
        });
      
    },
    resetForm(){
      this.form.name = '';
      this.form.url = '';
      this.form.index = 1;
      this.form.fatherId = '';
      this.form.type = '';
      this.form.icon = '';
      this.form.remark = '';
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
          this.addShow = false;
          this.tipshow = true;
          this.Reload();
          this.$emit("closewindows");
          this.resetForm();
        });
      }
      
    },
  },
  computed: {},
  components: {
    ADD,
    DETAIL,
    
    // YSH,
    // NYYSDY,
    // GYYSDY
  }
};
</script>

<style type="text/css">
</style>
