<!--成员管理-团队成员列表-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="teamMemberList"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>团队成员列表</div>
          <div>
            <el-input class="search_input" placeholder="手机号" v-model="search1"></el-input>
            <el-button type="primary" class="search" @click="search">搜索</el-button>
            <el-button  plain class="add" @click="export2Excel">导出</el-button>
            <el-button plain @click="invitation" class="add1" >邀请</el-button>
          </div>
        </div>
        <!--表格-->
        <el-table
          :data="tableData"

          style="width: 100%">

          <el-table-column
            prop="uname"
            label="姓名"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="nick_name"
            label="昵称"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            align="center">

          </el-table-column>
          <el-table-column
            prop="type"
            label="成员等级"
            align="center">
            <template slot-scope="scope">
              {{scope.row.type |type}}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-dropdown trigger="click" @command="admin(scope.row)" >
                <span class="el-dropdown-link">
                  <el-button type="text" >更多</el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item  :disabled="scope.row.type==2 ||scope.row.type==1 ||type!=1" :command="1">升级为管理员</el-dropdown-item>
                  <el-dropdown-item :disabled="scope.row.type==3 ||scope.row.type==1 ||type!=1" :command="2">降为普通用户</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button type="text" @click="del(scope.row)" :disabled="scope.row.type==1 || (scope.row.type==2&&type!=1) ||(scope.row.type==3&&type!=1&&type!=2)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="num"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
        </el-pagination>


        <!--邀请成员弹框-->
        <el-dialog title="邀请成员"  :visible.sync="dialogFormVisible">
          姓&nbsp;&nbsp;&nbsp;名
          <el-input v-model="name" class="name"></el-input>
          <br/>
          手机号
          <el-input v-model="phone" class="phone"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    name:'palace',
    data(){
      return{
        selected:1,
        hidden:1,
        tableData:[
//          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'普通用户'},
//          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'普通用户'},
//          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'普通用户'},
//          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'普通用户'}
        ],
        currentPage: 1,
        userInfo:'',//登录信息
        count:10,//总条数
        search1:'',//搜索
        dialogFormVisible:false,//控制弹框
        name:'',//姓名
        phone:'',//手机号
        num:[10],//每页多少条
        type:'',//管理员级别

        teamMemberList:'',
      }
    },
    methods:{
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
        this.currentPage=val;

        if(this.$route.params.team_id) {
          this.init1();
        }else {
          this.init();
        }
        console.log(this.$route.params.team_id)
      },
      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../vendor/Export2Excel');
          const tHeader = ['姓名', '昵称', '性别', '电话号码', '成员等级']; //对应表格输出的title
          const filterVal = ['uname', 'nick_name','sex', 'phone', 'type']; // 对应表格输出的数据
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '列表excel'); //对应下载文件的名字
        })
      },
      //管理员
      admin:function (row) {
        let that=this;
//        console.log(row);
        if(row.type==3){
          this.$http('post','/Front/Member/promoteMember',{mid:row.uid,uid:this.userInfo.uid,team_id:this.team_id,action:1}).then(function (res) {
//            console.log(res)
            that.init();
          })
        }else if(row.type==2){
          this.$http('post','/Front/Member/promoteMember',{mid:row.uid,uid:this.userInfo.uid,team_id:this.team_id,action:0}).then(function (res) {
//            console.log(res)
            that.init();
          })
        }
      },
      //邀请
      invitation:function () {
        this.dialogFormVisible=true;
      },

      //邀请弹框取消按钮
      cancel:function () {
        this.dialogFormVisible = false;
        this.name='';
        this.phone='';
      },
      //邀请弹框确定按钮
      confirm:function () {
        let that=this;
        this.dialogFormVisible = false;
        if(this.name==''){
          this.$message.error('请输入姓名');
        }else if(this.phone==''){
          this.$message.error('请输入手机号');
        }else {
          this.$http('post','/Front/Member/invitMember',{phone:this.phone,uname:this.name,uid:this.userInfo.uid,team_id:this.team_id}).then(function (res) {
//            console.log(res);
            that.$message({
              message: '邀请成功',
              type: 'success'
            });
            that.name='';
            that.phone='';
          })
        }

      },
      //删除
      del:function (row) {
        let that=this;


        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http('post','/Front/Member/delMember',{mid:row.uid,uid:this.userInfo.uid,team_id:this.team_id}).then(function (res) {
//            console.log(res);
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
            that.init();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //搜索
      search:function () {
        let that=this;
        if(this.search1==''){
          this.init();
        }else {
          this.$http('post','/Front/Member/searchMember',{team_id:this.team_id,phone:this.search1}).then(function (res) {
//            console.log(res);
            that.num=[100];
            if(res.data.result==''){
              that.tableData=[];
            }else {
              that.tableData=res.data.result;
            }
            that.count=res.data.result.length;
          })
        }

      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //加载数据
      init(){
        let that=this;
        this.$http('post','/Front/Member/memberList',{team_id:this.team_id,page:this.currentPage,uid:this.userInfo.uid}).then(function (res) {
//          console.log(res);
          if (res.data.count==undefined){
            that.count=0;
          }else {
            that.count = res.data.count * 1;
          }
          if(res.data.result==''){
            that.tableData=[];
          }else {
            that.type=res.data.type;
            that.tableData=res.data.result;
          }
        })
      },
      init1(){
        let that=this;
        this.$http('post','/Front/Member/memberList',{team_id:this.$route.params.team_id,page:this.currentPage}).then(function (res) {
          console.log(res);
          if (res.data.count==undefined){
            that.count=0;
          }else {
            that.count = res.data.count * 1;
          }
          if(res.data.result==''){
            that.tableData=[];
          }else {
            that.type=res.data.type;
            that.tableData=res.data.result;
          }
        })
      }
    },
    filters: {
      type: function (value) {
        let str='';
        if(value==1){
          str='创建者'
        }else if(value==2){
          str='管理员'
        }else if(value==3){
          str='普通户用'
        }
        return str;
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

      that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';
      window.onresize = function temp() {
        that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';
      };
      console.log(this.$route.params)
      if(this.$route.params.team_id){
        this.init1()
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
  }
  .add1{
    color:#4da1ff;
    margin-right: 70px;
  }

  .name{
    width: 250px;
    margin-left: 20px;
  }
  .phone{
    width: 250px;
    margin-left: 20px;
    margin-top: 20px;

  }
  .img{
    width: 30px;
    height: 30px;
    background: red;
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
