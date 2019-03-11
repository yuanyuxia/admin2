<template>
  <div class="navComent">
    <div class="navBox" ref="nav" >
      <div  class="navitem" v-for="(item,inde) in navList" v-if="(admin==1 && inde!=1 )||(admin==0 &&inde==0 )||(admin==0 &&inde==1)||(admin==0&&inde==4)" @click="tomenu(inde)" :key="inde" :class="{selected:inde==selected}">
        <!--<img src="" alt="">-->
        <el-tooltip content="首页" placement="right-start">
          <i class="icon iconfont" v-if="inde==0" >&#xe61f;</i>
        </el-tooltip>
        <el-tooltip content="成员管理" placement="right-start">
          <i class="icon iconfont" v-if="inde==1">&#xe61e;</i>
        </el-tooltip>
        <el-tooltip content="用户管理" placement="right-start">
          <i class="icon iconfont" v-if="inde==2">&#xe61e;</i>
        </el-tooltip>
        <el-tooltip content="团队管理" placement="right-start">
          <i class="icon iconfont" v-if="inde==3">&#xe61d;</i>
        </el-tooltip>
        <el-tooltip content="素材中心" placement="right-start">
          <i class="icon iconfont" v-if="inde==4">&#xe61c;</i>
        </el-tooltip>
        <!--<el-tooltip content="财务中心" placement="right-start">-->
          <!--<i class="icon iconfont"  v-if="inde==5">&#xe620;</i>-->
        <!--</el-tooltip>-->
        <!--<el-tooltip content="系统设置" placement="right-start">-->
          <!--<i class="icon iconfont" v-if="inde==6">&#xe621;</i>-->
        <!--</el-tooltip>-->
      </div>
    </div>

    <div class="menu1" ref="menu1" >
      <!--用户后台成员管理-->
      <el-menu
        :default-active="index"
        v-show="selected==1 &&hidden==1 "
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ffffff"
        text-color="#666"
        active-text-color="#4da1ff"
        ref="mm1"
        :unique-opened=true
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <span>团队成员</span>
          </template>
          <el-menu-item index="teamMemberList">成员列表</el-menu-item>
        </el-submenu>
      </el-menu>

      <!--用户后台素材中心-->
      <el-menu
        v-show="selected==4  &&hidden==1 && admin!=1"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ffffff"
        text-color="#666"
        active-text-color="#4da1ff"
        ref="mm1"
        :unique-opened=true
        router
        :default-active="index"
        >
        <el-submenu index="1">
          <template slot="title">
            <span>模板管理</span>
          </template>
          <el-menu-item index="palace">九宫格</el-menu-item>
          <el-menu-item index="poster">营销海报</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>分类管理</span>
          </template>
          <el-menu-item index="palace1">九宫格</el-menu-item>
          <el-menu-item index="poster1">营销海报</el-menu-item>
        </el-submenu>
      </el-menu>

      <!--总后台用户管理-->
      <el-menu
        :default-active="index"
        v-show="selected==2 &&hidden==1"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ffffff"
        text-color="#666"
        active-text-color="#4da1ff"
        ref="mm1"
        :unique-opened=true
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <span>用户管理</span>
          </template>
          <el-menu-item index="ordinaryUsers" >
            <span slot="title">普通用户</span>
          </el-menu-item>
          <el-menu-item index="VIPusers" >
            <span slot="title">VIP用户</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <!--总后台团队管理-->
      <el-menu
        :default-active="index"
        v-show="selected==3 &&hidden==1"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ffffff"
        text-color="#666"
        active-text-color="#4da1ff"
        ref="mm1"
        :unique-opened=true
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <span>团队管理</span>
          </template>
          <el-menu-item index="teamList" >
            <span slot="title">团队列表</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>

      <!--总后台素材中心-->
      <el-menu
        :default-active="index"
        v-show="selected==4  &&hidden==1 &&admin==1"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ffffff"
        text-color="#666"
        active-text-color="#4da1ff"
        ref="mm1"
        :unique-opened=true
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <span>模板管理</span>
          </template>
          <el-menu-item index="palace">九宫格</el-menu-item>
          <el-menu-item index="poster">营销海报</el-menu-item>
          <!--<el-menu-item index="dvideo">短视频</el-menu-item>-->
          <!--<el-menu-item index="library">母婴文库</el-menu-item>-->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>分类管理</span>
          </template>
          <el-menu-item index="palace1">九宫格</el-menu-item>
          <el-menu-item index="poster1">营销海报</el-menu-item>
          <!--<el-menu-item index="dvideo1">短视频</el-menu-item>-->
          <!--<el-menu-item index="library1">母婴文库</el-menu-item>-->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>素材管理</span>
          </template>
          <el-menu-item index="materialList">素材列表</el-menu-item>
        </el-submenu>
      </el-menu>

      <!--总后台财务中心-->

      <el-menu
        :default-active="index"
        v-show="selected==5  &&hidden==1"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ffffff"
        text-color="#666"
        active-text-color="#4da1ff"
        ref="mm1"
        :unique-opened=true
        router
      >
        <!--<el-submenu index="1">-->
          <!--<template slot="title">-->
            <!--<span>用户订单</span>-->
          <!--</template>-->
          <!--<el-menu-item index="order">订单列表</el-menu-item>-->

        <!--</el-submenu>-->
        <!--<el-submenu index="2">-->
          <!--<template slot="title">-->
            <!--<span>提现管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="withdrawCash">提现列表</el-menu-item>-->

        <!--</el-submenu>-->
        <!--<el-submenu index="3">-->
          <!--<template slot="title">-->
            <!--<span>分销管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="distributorList">分销人列表</el-menu-item>-->
          <!--<el-menu-item index="distributionSetting">分销设置</el-menu-item>-->
        <!--</el-submenu>-->
      </el-menu>


      <!--总后台系统设置-->
      <el-menu
        :default-active="index"
        v-show="selected==6  &&hidden==1"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ffffff"
        text-color="#666"
        active-text-color="#4da1ff"
        ref="mm1"
        :unique-opened=true
      >
        <!--<el-submenu index="1">-->
          <!--<template slot="title">-->
            <!--<span>banner设置</span>-->
          <!--</template>-->
          <!--<el-menu-item index="1-1">banner列表</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-submenu index="2">-->
          <!--<template slot="title">-->
            <!--<span>广告设置</span>-->
          <!--</template>-->
          <!--<el-menu-item index="2-1">广告列表</el-menu-item>-->
        <!--</el-submenu>-->
      </el-menu>
    </div>
  </div>
</template>
<script>
  export default {
    name:'menu1',
    data(){
      return{
        navList:[{one:'首页',unicode:'&#xe61f;'},{one:'成员管理',unicode:'&#xe61e;'},{one:'用户管理',unicode:'&#xe61f;'},{one:'团队管理',unicode:'&#xe61d;'},{one:'素材中心',unicode:'&#xe61c;'},
//          {one:'财务中心',unicode:'&#xe620;'},{one:'系统设置',unicode:'&#xe621;'}
          ],
        height:0,
        style:{},
//        index:'',
        arr:[],
//        hidden:0,
//        selected:0,
        admin:0,//0的时候是用户，1是超级管理员
        selected:'',
      }
    },
    props:['index','hidden','selected1'],
    watch:{

    },
    methods:{
      handleOpen(key, keyPath) {
//        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
//        console.log(key, keyPath);
      },
      //点击左侧显出导航
      tomenu:function (index) {
        this.selected=index;
//
//        如果是首页点击左侧跳转页面
        if(this.hidden==0){
          switch (index){
            case 0:
//            this.hidden=0;
              this.$router.push({name:'index'});
              break;
            case 1:
            this.$router.push({name:'teamMemberList'});
              break;
            case 2:
            this.$router.push({name:'ordinaryUsers'});
              break;
            case 3:
              this.$router.push({name:'teamList'});
              break;
            case 4:
              this.$router.push({name:'palace'});
              break;
            case 5:
//              this.$router.push({name:'order'});
              break;
            case 6:
//              this.$router.push({name:'order'});
              break;
          }
        }else {//否则显示二级导航
          if(index==0){

            this.$router.push({name:'index'})
          }else {
            this.hidden=1;
          }
        }

      }
    },
    mounted(){
      this.selected=this.selected1;
//      console.log(this);
      let that=this;
      // 获取浏览器可视区域高度
      that.$refs.nav.style.height = document.documentElement.clientHeight-60+'px';
      if(that.$refs.menu1==undefined){

      }else {
        that.$refs.menu1.style.height = document.documentElement.clientHeight-60+'px';
      }
      window.onresize = function temp() {
        that.$refs.nav.style.height = document.documentElement.clientHeight-60+'px';
        if(that.$refs.menu1==undefined){
        }else {
          that.$refs.menu1.style.height = document.documentElement.clientHeight-60+'px';
        }
      };
      this.admin=this.common.getCookie('admin');
    }
  }

</script>
<style scoped>
  @import "../iconfont/iconfont.css";

  @font-face {font-family: "iconfont";
    src: url('../iconfont/iconfont.eot'); /* IE9*/
    src: url('../iconfont/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../iconfont/iconfont.woff') format('woff'), /* chrome, firefox */
    url('../iconfont/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('../iconfont/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:30px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .menu1{
    width: 150px;
    position: fixed;
    left: 80px;
    top:70px;

  }
  .menu{
    width: 150px;
    height: 100%;
    overflow-y:auto;
    border:1px solid #e6e6e6;
  }
  .navBox{
    width: 80px;
    /*height: 100%;*/
    position: fixed;
    left: 0px;
    top:70px;

    /*background-color: red;*/
    overflow-y:auto;
    border-top:1px solid #e6e6e6;
    border-bottom:1px solid #e6e6e6;
    border-right:1px solid #e6e6e6;
  }
  .navitem{

    height: 40px;
    width: 60px;
    margin-top: 30px;
    margin-bottom: 20px;
    /*margin: 10px;*/
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    font-size: 30px;
    color: #38adff;
    /*margin-left: ;*/
    cursor: pointer;
    /*box-sizing: border-box;*/
    border-left: 4px solid  #ffffff;
  }
  .navitem:hover{
    border-left: 4px solid #4da1ff;

  }
  .selected{
    border-left: 4px solid #4da1ff;
  }
  .navitem>img {
    width: 30px;
    height: 30px;
  }
</style>
