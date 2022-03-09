<template>
    <div id="login" class="m-bgImage" style="width: 100%; height: 100vH;">
        <!--<div class="login">-->
        <!--<div class="appicon">-->
        <!--<i class="el-icon-upload"></i>-->
        <!--<p class="appname">量测水系统</p>-->
        <!--</div>-->

        <!--</div>-->
        <div class="m-cover">
            <div style="padding: 6em; box-sizing: border-box; text-align: center;">
                <h1 style="font-size: 3.8em;font-weight: 400;color: #FFF;">黄材灌区综合信息管理平台</h1>
            </div>

            <div style="box-sizing: border-box; text-align: center; ">
                <div style=" max-width: 500px; width: 100%; text-align: left; display: inline-block;  background-color: rgba(255, 255, 255, 0.85); padding: 50px 30px 30px 30px; box-sizing: border-box; border-radius: 2px;">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="账号">
                            <el-input v-model="form.acc" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.pwd" type="password" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="记住账号">
                            <el-switch v-model="form.remember"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="RouterLink" :loading="loading">登录</el-button>
                            <el-button>忘记密码</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <p style="font-size: 12px; color: #fff; margin: 2em; text-align: center;">2019 © 黄材灌区综合信息管理平台 版权所有</p>
        </div>

    </div>

</template>


<script>

    export default {

        props: {
            sys: {},
        },
        data() {
            return {
                loading: false,
                form: {
                    sys: '4',
                    acc: 'admin',
                    pwd: '',
                    remember: true,
                },
                responseResult:'',
            }
        },
        mounted: function () {
            
            //ShowLoading();
        },
        methods: {
            RouterLink() {
                if (this.form.acc=='') {
                   this.$message({
                      message: '帐号不能为空!',
                      type: 'warning'
                    }); 
                }else
                if (this.form.pwd==''||this.form.pwd.length<4) {
                    this.$message({
                      message: '密码不能为空，且长度不小于4!',
                      type: 'warning'
                    });
                }else{
                    // console.log(this.form.pwd.length);
                    debugger;
                    this.axios.post('/guanqu/ext-web/authenticate',{username:this.form.acc,password:this.form.pwd}).then((res)=>{
                        console.log(res);
                        if (res.data.errcode == 400) {
                            this.$message({
                              message: res.data.message,
                              type: 'warning'
                            });
                        }else{
                            this.Cook.set("username",this.form.acc);
                            this.$router.push({path: '/view'});
                        }
                        // localStorage.setItem('user_token', res.data.idToken)
                        // this.$router.push({path: '/view'});
                    });
                }





                // if (this.form.acc!='admin') {
                //     this.$message.error('帐号或密码错误!');
                // }else
                // if (this.form.pwd!='admin') {
                //     this.$message.error('帐号或密码错误!');
                // }else{
                //     this.$router.push({path: '/view'});
                // }
            }
        }


    }
</script>

<style type="text/css">
    * {
        margin: 0;
        padding: 0;
    }
    #login{
        background-image:url(../assets/bgimage.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .m-cover {
        background-color: rgba(74, 74, 74, 0.4);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .el-icon-upload {
        width: 48px;
        height: 48px;
    }

    .appicon {
        width: 65px;
        height: 65px;
        /*border: 1px solid white;*/
        position: relative;
        top: 2%;
        left: 2%;
        text-align: center;
        cursor: pointer;
    }

    .appicon:hover {
        border: 1px solid white;
    }

    .appicon:hover .el-icon-upload {
        color: white;
    }

    .appname {
        font-size: 12px;
        position: relative;
        top: 0%;

    }

    .el-icon-upload {
        font-size: 48px;
        position: relative;
        top: 10%;
    }
</style>
