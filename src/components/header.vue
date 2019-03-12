<template>
  <!--头部组件-->
  <div class="headerComent">
    <el-col class="left">
      <el-col class="sign"><img src="../assets/logo.png" alt="">小狗营销管理后台</el-col>
      <el-col class="searchBox"><el-input class="search" prefix-icon="el-icon-search" placeholder="搜索..."></el-input></el-col>
    </el-col>
    <el-col class="right">
      <img src="../assets/e-mail.png" alt="">
      <div class="line"></div>
      <div class="user">

        <div class="name" @click="tab">
          <el-dropdown trigger="click" @command="tab1" >
          <span class="el-dropdown-link">
            {{team_name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in tabList" :command="item.tid" :key="index">{{item.team_name}}</el-dropdown-item>
              <!--<el-dropdown-item>狮子头</el-dropdown-item>-->
              <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
              <!--<el-dropdown-item>双皮奶</el-dropdown-item>-->
              <!--<el-dropdown-item>蚵仔煎</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
      <div class="signOut_box">

        <div class="signOut">
          <el-dropdown  @command="handleCommand">
          <span class="el-dropdown-link nameBox">
            <img :src="msg.header_img" class="portrait" alt="">
            <div>{{msg.uname}}</div>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >退出登录</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="fiexd">0</div>
    </el-col>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        userInfo:'',
        tabList:[],
        team_name:'',
      }
    },
    props:['msg'],
    methods: {
      handleCommand:function () {
        this.common.delCookie('userInfo');
//        console.log(111);
        this.$router.push({name:'login'});
      },
      tab:function () {
//        console.log(111)
        let that=this;

      },
      tab1:function (command) {
//        console.log(command)
        document.cookie="team_id= "+command;
//        location.reload();
        this.$router.push({name:'about'});
      },
    },
    mounted(){
      let routerParams='';
      if(this.common.getCookie('userInfo')==''){
        this.$router.push({name:'login'});
      }else {
        routerParams= JSON.parse(this.common.getCookie('userInfo'));
      }
      this.userInfo=routerParams;
      this.team_id=this.common.getCookie('team_id');
      let that=this;
      that.$http('post','/Front/Team/teamList',{uid:this.userInfo.uid}).then(function (res1) {
        console.log(res1)
        if(res1.data.result==undefined){
          that.tabList=={}
        }else {
          that.tabList=res1.data.result;
          that.tabList.forEach(function (item,index) {
            if(item.tid==that.team_id){
              that.team_name=item.team_name;
            }
          })
        }

      });


    }
  }
</script>
<style >
  .headerComent{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }
  .headerComent .sign{
    font-family: MicrosoftYaHei;
    font-size: 20px;
    /*width: auto;*/
    width: 260px;
    height: 100%;
    line-height: 32px;
    letter-spacing: 2px;
    color: #333333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 35px;
  }
  .headerComent .sign>img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .headerComent .left{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 650px;
    float: left;

  }
  .headerComent .searchBox{
    width: 290px;
    margin-left: 60px;
  }
  .headerComent .search{
    /*width: 290px;*/
    /*height: 55px;*/
    /*background-color: #f9f9f9;*/
    /*border-radius: 27px;*/
  }
  .headerComent .left .el-input__inner{
    width: 290px;
    /*height: 36px;*/
    background-color: #f9f9f9;
    border-radius: 27px;
  }
  .headerComent .right{
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 70px;
    float: right;
    position: relative;
  }
  .headerComent .right>.fiexd{
    width: 16px;
    height: 16px;
    position: absolute;
    left:15px;
    top: 18px;
    border-radius: 50%;
    background-color: #4da1ff;
    font-size: 14px;
    color: #ffffff;
    line-height: 18px;
    text-align: center;
  }
  .headerComent .right>img{
    width: 22px;
    height: 17px;
  }

  .line{
    width: 2px;
    height: 20px;
    background-color: #dedede;

  }
  .headerComent .right>.user{
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .headerComent .right>.user>.name{
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #51a3ff;
    margin-left: 14px;
  }
  .signOut_box img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .signOut_box{

  }
  .portrait{
    width: 24px;
    height: 24px;
  }
  .nameBox{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }
  .nameBox>div{
    margin-left: 10px;
    font-family: MicrosoftYaHei;
  }
  /*兼容*/
  @media(max-width: 1024px){
    .headerComent {
      width: 1280px;
    }
    /**/
  } /*>=1024的设备*/
  @media  (min-width: 1024px){
    .headerComent {
      width: 1280px;
    }
  }
  @media (min-width: 1100px) {
    .headerComent {
      width: 1280px;
    }
  } /*>=1100的设备*/
  @media (min-width: 1280px) {
    .headerComent {
      width: 100%;
    }
  } /*>=1280的设备*/
  @media (min-width: 1366px) {
    .headerComent {
      width: 100%;
    }
  }/*>=1366的设备*/
  @media (min-width: 1440px) {
    .headerComent {
      width: 100%;
    }
  }/*>=1440的设备*/
  @media (min-width: 1680px) {
    .headerComent {
      width: 100%;
    }
  }/*>=1680的设备*/
  @media (min-width: 1920px) {
    .headerComent {
      width: 100%;
    }
  }
</style>
