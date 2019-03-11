<template>
  <!--登录页-->
  <el-container>
    <el-header style="height:auto;">
      <el-row class="header">
        <el-col class="sign"><img src="../assets/logo.png" alt="">小狗营销管理后台</el-col>
        <el-button type="primary" class="register" @click="down">下载App</el-button>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="main">
        <el-col class="font">
          <img src="../assets/1.png" alt="">
        </el-col>
        <el-col class="login" v-if="already==1">
          <div class="login_header">
            <div  :class="login_type==1?'login_type_active':''" class="login_type" @click="account">
              账号登录
            </div>
            <div :class="login_type==0?'login_type_active':''" class="login_type" @click="scavenging">
              扫码登录
            </div>
          </div>
          <div class="login_body" v-show="login_type==1">
            <el-input  v-model="username" placeholder="请输入账号"></el-input>
            <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
            <div>{{error}}</div>
            <el-button type="primary" class="login_to" @click="sign">登录</el-button>
          </div>
          <div class="login_body" v-show="login_type==0">
            <div class="">敬请期待</div>
            <!--<img src="" alt="">-->
            <!--<div>请使用客户端扫码登录 <span class="refresh">刷新</span></div>-->
          </div>
        </el-col>
        <el-col class="login" v-if="already==0">
          <el-carousel :interval="4000" @change="change" :autoplay="false" class="rrr"  type="card"  height="200px" indicator-position="none">
            <el-carousel-item v-for="(item,index) in teamList" :key="index" :name="item.tid" :lable="item.team_name">
              <!--<h3>{{ item }}</h3>-->
              <img :src="item.team_lcon" alt="">
              <div>{{item.team_name}}</div>
            </el-carousel-item>
          </el-carousel>
          <el-button type="primary" class="login_to1" @click="toto">确认</el-button>
        </el-col>
      </el-row>
    </el-main>
    <el-footer style="height:auto;padding: 0;">
      <el-row class="footer" >
        <p>版权所有 Copyright (C)2011-2016北京智诚数码科技有限公司Copyright (C) 2011-2016 Beijing Zhicheng Digital Technology Co.,Ltd</p>
        <div class="link">
          <div v-for="(item,index) in items" :key="index">
            <div class="content" :class="index<=5?'content1':'content2'">{{item.content}}</div>
            <div class="line" >{{item.line}}</div>
          </div>
        </div>
      </el-row>

    </el-footer>
  </el-container>
</template>
<script>
  export default {
    data(){
      return{
        items:[{content:'帮助中心',line:'|'},{content:'智诚服务',line:'|'},{content:'智诚小程序',line:'|'},{content:'智诚营销平台',line:'|'},{content:'智诚ERP',line:'|'},{content:'北京乐兔',line:'|'},{content:'微信公众平台',line:'|'},{content:'微信商户平台',line:''}],
//        login_type:0,//登录方式
        username:'',//账号
        password:'',//密码
        error:'',
        login_type:1,
        already:1,
        teamList:[],
        num:0,//选中的团队的index
        admin:0,// 管理员权限
      }
    },
    methods:{
      account:function () {
        this.login_type=1;
      },
      scavenging:function () {
        this.login_type=0;
      },
      //登录
      sign:function () {
        let that=this;


        this.$http('post','/Front/Login/login',{username:this.username,pwd:this.password}).then(function (res) {
          console.log(res);

          if(res.data.code==1){
            let str= JSON.stringify(res.data.result);
            document.cookie="userInfo= "+str;

            //管理员权限
            if(res.data.result.phone=="admin"){
              document.cookie="admin= 1";
              that.$router.push({name:'index'})
              document.cookie="team_id= 0";
            }else {
              document.cookie="admin= 0";
              that.$http('post','/Front/Team/teamList',{uid:res.data.result.uid}).then(function (res1) {
//              console.log(res1);
                that.already=0;
                that.teamList=res1.data.result;
              });
            }
          }else {
            //登录异常提示
            that.error=res.data.message;
          }

        })
      },
      //改变团队
      change(index,num){
//        console.log(index,num);
        this.num=index;
      },
      //确认
      toto(){
//        console.log(this.num);
        let str=this.teamList[this.num].tid;
        document.cookie="team_id= "+str;
//        console.log(str);
        this.$router.push({name:'index'})
      },
      //下载
      down:function () {
        window.open('https://www.pgyer.com/BlFL', '_blank');

      },
    },
    mounted(){
      this.axios.post('http://x.zbxg123.com/Front/Login/login ', {
        username: 'admin',
        pwd: 'admin'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
      }
  }
</script>
<style scoped>
  .el-container{
    height: 100%;
    background:#e7e8eb ;
  }
  .el-header{
    background-color: #ffffff;
  }
  .header{
    height: 64px;
    width: 1080px;
    background-color: #ffffff;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  .register{
    width: 136px;
    height: 40px;
    background-color: #38adff;
    border-radius: 5px;
    border: solid 1px #1095f3;
  }
  .sign{
    font-family: MicrosoftYaHei;
    font-size: 20px;
    /*width: auto;*/
    height: 100%;
    line-height: 32px;
    letter-spacing: 2px;
    color: #333333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .sign>img{
    width: 40px;
    height: 40px;
    background-color: red;
    margin-right: 10px;
  }

  .el-main{
    padding: 0;
  }
  .main{
    /*background-color: red;*/
    background-image: url("../assets/index.png");
    height: 710px;
    position: relative;
  }
  .font{
    width: 600px;
    height: 400px;
    position: absolute;
    top: 90px;
    left:200px;
    /*background-color: #000000;*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .font>img{
    width: 100%;
    /*height: 100%;*/
  }
  .login{
    background-color: #ffffff;
    width: 420px;
    height: 440px;
    border-radius: 10px;
    position: absolute;
    top: 90px;
    right: 200px;

  }
  .login_to1{
    margin-left: 21px;
    width: 377px;
    height: 45px;
    margin-top: 30px;
    border-radius: 5px;
  }
  .rrr{
    margin-top: 50px;
  }


  .el-carousel__item{
     display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  /*.el-carousel__item:nth-child(2n) {*/
    /*background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
    /*background-color: #d3dce6;*/
  /*}*/
  .rrr img{
    width: 80px;
    height: 80px;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,0.2) 0 0 10px ;
    /*background-color: red;*/
  }

  .login_header{
    width: 100%;
    height: 64px;
    font-size: 18px;
    color: #898d90;
    overflow: hidden;
    border-bottom: 1px solid #e8e8e8;
  }
  .login_type{
    width: 50%;
    line-height: 60px;
    text-align: center;
    border-bottom: 4px solid transparent;
    float: left;
    cursor: pointer;
  }
  .login_type_active {
    color: #38adff;
    border-bottom: 4px solid #38adff;
    cursor: default;
  }
  .login_body{
    width: 100%;
    height: 65%;
    margin-top: 20px;
    display: flex;
    font-size: 25px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .login_body .el-input{
    width: 377px;
    height: 57px;
    margin-top: 30px;
  }
  .el-input__inner{
    height: 100%;
  }
  .login_body img{
    width: 210px;
    height: 210px;
    /*background-color: red;*/
    margin-top: 40px;
  }
  .login_body div{
    /*margin-top: 20px;*/
    font-size: 18px;
    color:red;
    height: 21px;
    width: 100%;
    text-align: center;
  }
  .login_to{
    width: 377px;
    height: 45px;
    margin-top: 30px;
    border-radius: 5px;
  }

  .footer{
    /*width: 1920px;*/
    height: 180px;
    background-color: #e7e8eb;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    flex-direction: column;
  }
  .footer>p{
    color: #999999;
  }
  .content1{
    letter-spacing: 2px;
    color: #38adff;
    cursor: pointer;
  }
  .content2{
    letter-spacing: 2px;
    color: #999999;
    cursor: pointer;
  }
  .link{
    display: flex;
    margin-top: 29px;
  }
  .link>div{
    display:flex;
  }
  .link .line:nth-child(2){
    margin-left: 20px;
    margin-right: 20px;
  }

  .refresh{
    color: #38adff;

  }
  /*兼容*/
  @media(max-width: 1024px){
    /**/
    .el-header,.el-main,.el-footer{
      width: 1024px;
    }
    .login{
      right: 0px;
    }
    .font{
      left: -150px;
    }
  } /*>=1024的设备*/
  @media  (min-width: 1024px){
    .login{
      right: 0px;
    }
  }
  .font{
    left: -150px;
  }
  @media (min-width: 1100px) {
    .login{
      right: 50px;
    }
    .font{
      left: -100px;
    }
  } /*>=1100的设备*/
  @media (min-width: 1280px) {
    .login{
      right: 100px;
    }
    .font{
      left: -50px;
    }
  } /*>=1280的设备*/
  @media (min-width: 1366px) {
    .login{
      right: 150px;
    }
    .font{
      left: 0px;
    }
  }/*>=1366的设备*/
  @media (min-width: 1440px) {
    .login{
      right: 200px;
    }
    .font{
      left: 50px;
    }
  }/*>=1440的设备*/
  @media (min-width: 1680px) {
    .login{
      right: 250px;
    }
    .font{
      left: 100px;
    }
  }/*>=1680的设备*/
  @media (min-width: 1920px) {
    .login{
      right: 300px;
    }
    .font{
      left: 150px;
    }
  }/*>=1920的设备*/
</style>
