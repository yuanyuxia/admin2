<!--分销管理-分销设置-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="distributionSetting"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>分销管理</div>

        </div>
        <div class="inner">
          <div v-for="(item,index) in items" class="item">
            <div class="proportion">
              {{item.proportion}}
            </div>
            <div class="current">
              当前分销比例为
            </div>
            <div class="edit">
              <el-button type="text" class="editBtn" @click="edit">修改比例</el-button>
            </div>
          </div>
        </div>

      </div>


    </el-container>
  </el-container>
</template>
<script>
  export default {
    name:'palace',
    data(){
      return{
        selected:5,
        hidden:1,

        userInfo:'',//登录信息
        items:[{proportion:'20%'}],

        phoneVal:'',//搜索条件

      }
    },
    methods:{

      //列表请求
      init(){
        let that=this;
//        this.$http('post','/Front/User/userList',{page:this.currentPage,state:2}).then(function (res) {
//          console.log(res);
//          that.tableData=res.data.result;
//          that.count=res.data.count*1;
//        })
      },

      //修改比例
      edit(){
        this.$prompt('','修改比例', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
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

      that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';

      window.onresize = function temp() {
        that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';
      };
      this.init();

    },

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
    padding-left: 66px;
    width: 100%;
    font-family: MicrosoftYaHei;
  }
  .palaceTitle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0;
  }
  .palaceTitle>div:nth-child(1){
    font-size: 18px;
    color: #666666;
    /*margin-left: 50px;*/
  }

  .inner{
    display: flex;
    /*justify-content:space-between;*/
    align-items: center;
    flex-wrap: wrap;
  }
  .item{
    width: 285px;
    height: 353px;
    border-radius: 10px;
    border: solid 1px #dedede;
    margin-left: 20px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    /*justify-content: center;*/
  }
  .proportion{
    font-size: 54px;
    color: #666666;
    font-family: MicrosoftYaHei;
    margin-top: 93px;
  }
  .current{
    font-size: 20px;
    color: #666666;
    font-family: MicrosoftYaHei;
    /*margin-top: 53px;*/
    font-weight: normal;
    margin-top: -20px;
  }
  .edit{
    width: 100%;
    height: 60px;
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .editBtn{
    font-size: 20px;
    color: #000000;
  }
  @media (max-width: 1280px) {
    .main{
      width: 970px;
    }
  }
</style>
