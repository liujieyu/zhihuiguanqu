<template>
    <div>
        <Layout :style="{height: '100vh',}">
            <div :class="['leftSide',{'leftSide_on':Menu.show_Controller}]">
                <!-- 开关按钮 -->
                <div class="switch" @click="Menu_toggle">
                    <i class="el-icon-d-arrow-left" v-if="!Menu.show_Controller"></i>
                    <i class="el-icon-d-arrow-right" v-if="Menu.show_Controller"></i>
                </div>
                <Sider
                        hide-trigger
                        style="background-color: '#fff !important';padding: '80px 0 0 0'; overflow: 'scroll;';color:'#333 !important'"
                >
                    <!-- 菜单 -->
                    <el-menu
                            background-color="#545c64"
                            class="el-menu-vertical-demo"
                            :default-active="activeindex"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            :router="true"
                            @select="handleSelect"
                    >

                        <el-submenu :index="item.index" v-for="item in data" :id="item.id" @click="fclassmenu(item)">
                            <template slot="title">
                                <i class="el-icon-menu" style="color:#B5BBC9;"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item v-if="item2.children.length==0" :index="item2.url" :id="item.id" v-for="item2 in item.children" @click="sclassmenu(item2)">
                                <template slot="title">
                                    <i class="el-icon-document" style="color:#8BAAC9;"></i>
                                    <span>{{item2.name}}</span>
                                </template>
                            </el-menu-item>
                            <el-submenu v-if="item2.children.length>0" :index="item2.id" :id="item2.id" v-for="item2 in item.children">
                                <template slot="title">
                                    <i class="el-icon-location" style="color:#B5BBC9;"></i>
                                    <span>{{item2.name}}</span>
                                </template>
                                <el-menu-item :index="item3.url" :id="item3.id" v-for="item3 in item2.children" @click="tclassmenu(item3)">
                                    <template slot="title">
                                        <i class="el-icon-document" style="color:#8BAAC9;"></i>
                                        <span>{{item3.name}}</span>
                                    </template>
                                </el-menu-item>
                            </el-submenu>
                        </el-submenu>



                    </el-menu>
                </Sider>
            </div>
            <Layout :style="{padding: '70px 20px 10px'}">
                <router-view></router-view>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import Vue from "vue";
    import Utils from '@/assets/utils.js';
    export default {
        props: {
            info:0
        },
        data() {
            return {
                Menu: {show_Controller: false},
                data:[],
                value:false,
                activeindex:'/table-sqxx-sksq',
            };
        },
        methods: {
            Menu_toggle() {
                this.Menu.show_Controller = !this.Menu.show_Controller;
                this.$store.state.anniu = !this.$store.state.anniu
            },
            Reload(){
                this.axios.get('/guanqu/web/users/online-user/menus').then((res) => {
                    console.log(res.data);
                    this.data = res.data;            
                });
            },
            fclassmenu(item){
                console.log(item);
            },
            sclassmenu(item2){
                // console.log(item2.id);
                // console.log(item2.url.slice(0,4));
                if (item2.children.length==0&&item2.url.slice(0,4)=='http') {
                    if (this.value==false) {
                        this.$router.push({ path: '/tableqxcd', query: { id: item2.id }});
                        this.value = !this.value;

                    }else{
                        this.$router.push({ path: '/tableqxcd-xxk', query: { id: item2.id }});
                        this.value = !this.value;
                    }
                }else if (item2.children.length==0&&item2.url.slice(0,4)!='http') {
                    this.$router.push({ path: item2.url});
                }
            },
            tclassmenu(item3){
                // console.log(item3);
                if (item3.children.length==0&&item3.url.slice(0,4)=='http') {
                    if (this.value==false) {
                        this.$router.push({ path: '/tableqxcd', query: { id: item3.id }});
                        this.value = !this.value;

                    }else{
                        this.$router.push({ path: '/tableqxcd-xxk', query: { id: item3.id }});
                        this.value = !this.value;
                    }
                }else if (item3.children.length==0&&item3.url.slice(0,4)!='http') {
                    this.$router.push({ path: item3.url});
                }
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
                // this.activeIndex = index;
            },
        },
        mounted() {
            //if(this.info==1){
            this.$router.push({path: '/table-sqxx-sksq'});            
            //}
            localStorage.anniu = 0;
            this.Reload();
            var that = this;
            Utils.$on('demo', function (msg) {
                console.log(msg);
                that.Reload();
            })
        },
        // watch:{
        //     $router(){
        //         this.handleSelect(this.activeIndex)
        //     },
        // },
    };
</script>

<style scoped lang="less">
    .ivu-layout {
        /*padding: 70px 20px 10px;*/
        /*overflow-y: hidden;*/
        /*overflow: scroll;*/
    }

    .ivu-layout-sider {
        overflow: scroll;
        padding-top: 61px;
    }

    .el-menu {
        border-right: 0 !important;
    }
    .el-menu-item{
        border-bottom: 0 !important;
    }
    .el-menu-item.is-active {
        
        background-color: #545c64 !important;
        color: #fff !important;
    }
    .el-menu-item.is-active:hover {
        
        background-color: #434A50 !important;
    }
    .ivu-layout-sider::-webkit-scrollbar {
        display: none;
    }

    .ivu-layout-sider {
        height: 100%;
        background-color: #1d1d1d;
        color: #333;
    }

    .leftSide {
        z-index: 0;
        transition: 0.5s;
        position: relative;
        // 开关按钮
        .switch {
            position: absolute;
            right: -20px;
            top: calc(50% - 50px);
            /* font-size: 10px; */
            width: 20px;
            height: 50px;
            cursor: pointer;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            background: white;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border: #7eb7f0 2px solid;
            border-left: 0;

            &:hover {
                filter: brightness(1.1);
            }

            i {
                font-size: 15px;
            }
        }
    }

    .leftSide_on {
        margin-left: -200px;
    }
</style>
