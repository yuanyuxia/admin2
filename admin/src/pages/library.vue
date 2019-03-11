<!--素材中心-分类管理-母婴文库-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="library"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>母婴文库</div>
          <div>
            <el-input class="search_input" placeholder="分类名称" v-model="typename"></el-input>
            <el-button type="primary" class="search" @click="search">搜索</el-button>
            <el-button icon="el-icon-plus" plain class="add" @click="add">新增分类</el-button>
          </div>
        </div>
        <div class="innerBox">
          <div class="inner" v-for="(item,index) in items">
            <div class="title">分类名称</div>
            <div class="line"></div>
            <div class="imgBox">
              <img src="" alt="">
              <div>这里是名字</div>
            </div>
            <div class="line1"></div>
            <div class="bottomBtn">
              <el-button type="text" class="btnBox" icon="el-icon-edit-outline">编辑</el-button>
              <div class="line2"></div>
              <el-button type="text" class="btnBox" icon="el-icon-delete">删除</el-button>
            </div>
          </div>
        </div>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="num"

          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data(){
    return{
      selected:4,
      hidden:1,
      team_id:'',//团队id
      tableData:[

      ],
      items:[{},{},{},{},{},{},{},{}],
      currentPage: 1,
      totalNum:10,//总条数
      dialogFormVisible: false,//控制新增弹窗
      dialogFormVisible1:false, //控制编辑弹窗
      name:'',//新增分类名称
      value:'',//新增介绍
      value1:'',//新增排序
      name1:'',//编辑分类名称
      value_edit:'',//编辑介绍
      value1_edit:'',//编辑排序
      imageUrl:'',//上传图片的路径
      userInfo:'',//登录信息
      cid:'',//编辑cid
      typename:'',//
      num:[10],//每页条数
    }
  },
  methods:{
    handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
      this.currentPage=val;
//      this.init();
    },
    //新增
    add(){
      this.$router.push({name:'addlibrary'})
    },
    //搜索
    search(){

    }
  },
  mounted(){
    let that=this;
    let routerParams='';
    if(this.common.getCookie('userInfo')==''){
      this.$router.push({name:'login'});
    }else {
      routerParams= JSON.parse(this.common.getCookie('userInfo'));
    }
    this.userInfo=routerParams;


    this.team_id=this.common.getCookie('team_id');

//    that.init();
    that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';
    window.onresize = function temp() {
      that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';

    };
  }
}
</script>
<style scoped>
  .el-header{
    width: 100%;
    height: 90px;
  }
  .main{
    background: #fafafa;
    overflow-y:auto;
    padding-left: 20px;
    /*width: 1017px;*/
    width: 100%;
  }
  .palaceTitle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }
  .palaceTitle>div:nth-child(1){
    font-size: 18px;
    color: #666666;
    margin-left: 50px;
  }
  .search_input{
    width: 294px;

  }
  .search{
    margin-left: 10px;
  }
  .add{
    color:#4da1ff;
    margin-right: 70px;
  }

  .innerBox{
    display: flex;
    /*justify-content: space-around;*/

    align-items: center;
    flex-wrap: wrap;
    background-color: #ffffff;
  }
  .inner{
    margin-left: 25px;
    margin-top: 30px;
    width: 360px;
    height: 340px;
    background-color: #ffffff;
    border: solid 1px #dedede;
    /*padding: 20px;*/
    box-sizing: border-box;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    flex-direction: column;
  }
  .title{
    display: flex;
    justify-content: flex-start;
    width: 360px;
    margin-top: 20px;
    padding-left: 20px;
    font-size: 16px;
    box-sizing: border-box;
    color: #333333;
  }
  .line{
    width: 320px;
    height: 1px;
    background-color: #dedede;
    margin-top: 20px;
  }
  .imgBox{
    margin-top: 15px;
    position: relative;
  }
  .imgBox img{
    width: 320px;
    height: 200px;
    display: block;
  }
  .imgBox>div{
    width: 320px;
    height: 34px;
    background-color: #000000;
    opacity: 0.6;
    position: absolute;
    left:0;
    bottom: 0;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 5px;
    box-sizing: border-box;
  }
  .line1{
    width: 360px;
    height: 1px;
    background-color: #dedede;
    margin-top: 15px;
  }
  .bottomBtn{
    display: flex;
    height: 50px;
    align-items: center;
  }
  .btnBox{
    color: #999999;
    width: 169px;
    display: flex;
    justify-content: center;
  }
  .bottomBtn el-button{
    width: 49%;
  }
  .line2{
    width: 1px;
    height: 40px;
    background-color: #dedede;
  }
  .paging{
    text-align: right;
    padding: 20px;
    background-color: #ffffff;
    /*width: 100%;*/
  }
  @media (min-width: 1920px) {

    .innerBox{
      width: 1569px;
    }
  }
  @media (max-width: 1280px) {
    .innerBox{
      width: 1000px;
    }
    .main{
      width: 1017px;
    }
  }
</style>
