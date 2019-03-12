<!--团队管理-团队列表-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="teamList"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>团队列表</div>
          <div>
            <el-input class="search_input" placeholder="团队名称/ID"></el-input>
            <el-button type="primary" class="search">搜索</el-button>
            <el-button  plain class="add">导出</el-button>
          </div>
        </div>
        <!--表格-->
        <el-table :data="tableData" width="100%">
          <el-table-column
            prop="team_code"
            label="团队ID"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="team_name"
            label="团队名称"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="uname"
            label="创始人"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            label="团队状态"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="count"
            label="团队人数"
            width=""
            align="center">
            <template slot-scope="scope">
              <div class="content_box">
                <div class="content">
                  {{scope.row.count}}
                </div>
                <el-button type="text" @click="detail(scope.row)">详情</el-button>

              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width=""
            align="center">
              <template slot-scope="scope">
                <el-button type="text" disabled>更多</el-button>
                <el-button type="text" disabled>删除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data(){
      return{
        selected:3,
        hidden:1,
        tableData:[

        ],
        currentPage: 1,//分页第几页
        userInfo:'',//登录信息
        count:0,//总条数
      }
    },
    methods:{
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.init();
      },
      detail(row){

        this.$router.push({name:'teamMemberList',params:{team_id:row.tid}})
      },
      //请求列表
      init(){
        let that=this;
        this.$http('post','/Front/Team/allTeamList',{page:this.currentPage}).then(function (res) {
          console.log(res);
          that.tableData=res.data.result;
          that.count=res.data.count*1;
        })
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
      console.log(this.$route.params)
//      this.uid=
      if(this.$route.params.uid){
        that.$http('post','/Front/Team/teamList',{uid:this.$route.params.uid}).then(function (res1) {
          console.log(res1)
          if(res1.data.result==undefined){
            that.tableData=={}
            that.count=0;
          }else {
            that.tableData=res1.data.result;
            that.count=res1.data.result.length;
//            that.tabList.forEach(function (item,index) {
//              if(item.tid==that.team_id){
//                that.team_name=item.team_name;
//              }
//            })
          }

        });
      }else {
        this.init();
      }

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
