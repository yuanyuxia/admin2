<!--订单管理-用户订单-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>.
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="withdrawCash"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>提现管理</div>
          <div>
            <el-input class="search_input" placeholder="团队名称/ID"></el-input>
            <el-button type="primary" class="search">搜索</el-button>
            <el-button  plain class="add">导出</el-button>
          </div>
        </div>
        <!--表格-->
        <el-table :data="tableData" width="100%">
          <el-table-column
            prop="id"
            label="订单编号"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="提现人"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="user"
            label="提现账号"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="date"
            label="提现时间"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="money"
            label="提现金额"
            width=""
            align="center">

          </el-table-column>
          <el-table-column
            prop="type"
            label="状态"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width=""
            align="center">
            <template slot-scope="scope">
              <el-button type="text">更多</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data(){
      return{
        selected:5,
        hidden:1,
        tableData:[{id:'MA23847223342',name:'小明',user:'2018-06-12 12:59:00',date:'正常',money:'200',type:'线下'},{id:'MA23847223342',name:'小明',user:'2018-06-12 12:59:00',date:'正常',money:'200',type:'线下'}],
        currentPage: 4,//分页第几页
        userInfo:'',//登录信息
      }
    },
    methods:{
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
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
  .paging{
    text-align: right;
    padding: 20px;
    background-color: #ffffff;
    /*width: 100%;*/
  }

  .content_box{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
