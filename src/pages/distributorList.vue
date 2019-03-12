<!--分销管理-分销人列表-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="distributorList"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>分销管理</div>
          <div>
            <el-input class="search_input" v-model="phoneVal" placeholder="姓名"></el-input>
            <el-button type="primary" class="search" @click="search">搜索</el-button>
            <el-button  plain class="add" @click="export2Excel">导出</el-button>

          </div>
        </div>
        <!--表格-->
        <el-table
          :data="tableData"

          style="width: 100%">

          <el-table-column
            prop="name"
            label="分销人姓名"
            width=""
            align="center">
          </el-table-column>
          <!--<el-table-column-->
          <!--prop="nikeName"-->
          <!--label="昵称"-->
          <!--width=""-->
          <!--align="center">-->
          </el-table-column>

          <el-table-column
            prop="tel"
            label="手机号"
            align="center">

          </el-table-column>
          <el-table-column
            prop="sort"
            label="下级成员（人）"
            align="center">
            <!--<template slot-scope="scope">-->
            <!--{{scope.row.vip_type |vip_type}}-->
            <!--</template>-->
          </el-table-column>
          <el-table-column
            prop="date"
            label="已获得分佣（元）"
            align="center">
          </el-table-column>
          <el-table-column
            prop="team"
            label="已提现分佣"
            align="center">

          </el-table-column>


          <el-table-column
            prop=""
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-dropdown trigger="click" @command="tab1" >
                <span class="el-dropdown-link">
                  <el-button type="text" @click="tab2(scope.row)">更多</el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="1">修改会员等级</el-dropdown-item>
                  <el-dropdown-item :command="2">封禁账号</el-dropdown-item>
                  <el-dropdown-item :command="3">重置密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

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
    name:'palace',
    data(){
      return{
        selected:5,
        hidden:1,
        tableData:[
          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'20',date:'10005',team:'2800'},
          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'20',date:'1000',team:'2800'},
          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'20',date:'1000',team:'2800'},
          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'20',date:'1000',team:'2800'}
        ],
        currentPage: 1,
        userInfo:'',//登录信息
        count:0,//总条数

        vipuid:'',//修改vip等级的用户uid
        phoneVal:'',//搜索条件

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
      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../vendor/Export2Excel');
          const tHeader = ['姓名', '昵称', '性别', '电话号码', '成员等级']; //对应表格输出的title
          const filterVal = ['name', 'nikeName','sex', 'tel', 'sort']; // 对应表格输出的数据
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '列表excel'); //对应下载文件的名字
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //列表请求
      init(){
        let that=this;
//        this.$http('post','/Front/User/userList',{page:this.currentPage,state:2}).then(function (res) {
//          console.log(res);
//          that.tableData=res.data.result;
//          that.count=res.data.count*1;
//        })
      },
      //搜索
      search(){
        let that=this;
//        this.$http('post','/Front/User/search',{state:2,keyword:this.phoneVal}).then(function (res) {
//          console.log(res.data.result);
//          if(that.phoneVal==''){
//            that.init();
//          }else {
//            if(res.data.result==undefined){
//              that.tableData=[];
//              that.count=0;
//            }else {
//              that.tableData=res.data.result;
//              that.count=1;
//            }
//          }
//
//        })
      },


      //更多
      tab1(command){
        let that=this;
        console.log(command)
        //修改vip等级
//        if(command==1){
//          this.dialogVisible1=true;
//          this.vipuid=1
//        }else if(command==2){
//          this.$confirm('确定禁用此用户？', '提示', {
//            confirmButtonText: '确定',
//            cancelButtonText: '取消',
//            type: 'warning'
//          }).then(() => {
//            this.$http('post','/Front/User/disableUser',{uid:this.vipuid}).then(function (res) {
//              console.log(res);
//              that.init();
//            });
//            this.$message({
//              type: 'success',
//              message: '成功禁用!'
//            });
//          }).catch(() => {
//            this.$message({
//              type: 'info',
//              message: '已取消禁用'
//            });
//          });
//        }
      },

      //获取更多的uid
      tab2(row){
        console.log(row)
        this.vipuid=row.uid;
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
  .add1{
    color:#4da1ff;
    margin-right: 70px;
  }

  .img{
    width: 30px;
    height: 30px;
    /*background: red;*/
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
  .content_box .el-button{
    margin-left: 5px;
  }
  .paging{
    text-align: right;
    padding: 20px;
    background-color: #ffffff;
    /*width: 100%;*/
  }




  @media (max-width: 1280px) {
    .main{
      width: 970px;
    }
  }
</style>
