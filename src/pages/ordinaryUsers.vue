<!--用户管理-普通用户-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="ordinaryUsers"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>普通用户</div>
          <div>
            <el-input class="search_input" v-model="phoneVal" placeholder="用户名/手机号"></el-input>
            <el-button type="primary" class="search" @click="search">搜索</el-button>
            <el-button  plain class="add" @click="export2Excel">导出</el-button>

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
          <!--<el-table-column-->
          <!--prop="nikeName"-->
          <!--label="昵称"-->
          <!--width=""-->
          <!--align="center">-->
          <!-- </el-table-column> -->
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
            prop="vip"
            label="会员等级"
            align="center">
            <!--<template slot-scope="scope">-->
              <!--{{scope.row.vip_type |vip_type}}-->
            <!--</template>-->
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="注册时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="watch(scope.row)">点击查看</el-button>
            </template>
          </el-table-column>

          <el-table-column
            prop="sort"
            label="微信"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="details">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_disable"
            label="封禁状态"
            align="center"
            v-if="admin==1">
            <template slot-scope="scope">
              {{scope.row.is_disable |feng}}
            </template>
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
                  <el-dropdown-item :command="1" :disabled="scope.row.is_disable==1">开通会员</el-dropdown-item>
                  <el-dropdown-item :command="2" v-if="scope.row.is_disable==0">封禁账号</el-dropdown-item>
                  <el-dropdown-item :command="4" v-if="scope.row.is_disable==1">解除封禁</el-dropdown-item>
                  <el-dropdown-item :command="3" disabled>重置密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
      <!--查看详情弹窗-->
      <el-dialog
        title="微信资料"
        :visible.sync="dialogVisible"
        width="25%"
        center
        class="diag"
        >
        <div class="dbox">
          <img src="../assets/template4.png" alt="">
          <div class="wxName">keeley</div>
          <div class="wxCord">wx125w4d2as5</div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改会员等级-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible1"
        width="30%"
        >
        <el-radio-group v-model="vip" >
          <el-radio :label="item.id" value="1" v-for="(item,index) in vipList" :key="index">{{item.type}}</el-radio>

          <!--<el-radio label="2">体验vip</el-radio>-->
          <!--<el-radio label="3">普通vip</el-radio>-->
          <!--<el-radio label="4">商业vip</el-radio>-->
          <!--<el-radio label="5">无限vip</el-radio>-->
        </el-radio-group>

        <span slot="footer" class="dialog-footer">
          <el-button @click="vipconcel">取 消</el-button>
          <el-button type="primary" @click="vipconfirm">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    name:'palace',
    data(){
      return{
        selected:2,
        hidden:1,
        tableData:[
          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'普通用户',date:'2016-22-25',team:'5/5'},
          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'普通用户',date:'2016-22-25',team:'5/5'},
          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'普通用户',date:'2016-22-25',team:'5/5'},
          {img:'',name:'北小河',nikeName:'aa',sex:'男',tel:'186****5896',sort:'普通用户',date:'2016-22-25',team:'5/5'}
        ],
        currentPage: 1,
        userInfo:'',//登录信息
        count:0,//总条数
        dialogVisible:false,//查看详情弹窗
        dialogVisible1:false,//修改会员等级
        vip:'',//会员等级
        vipuid:'',//修改vip等级的用户uid
        vipphone:'',//修改vip等级的用户phone
        phoneVal:'',//搜索条件
        vipList:{},//会员列表
        admin:'',//管理员权限
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
        this.$http('post','/Front/User/userList',{page:this.currentPage,state:2}).then(function (res) {
          console.log(res);
          that.tableData=res.data.result;
          that.count=res.data.count*1;
        })
      },
      //搜索
      search(){
        let that=this;
        this.$http('post','/Front/User/search',{state:2,keyword:this.phoneVal}).then(function (res) {
          console.log(res.data.result);
          if(that.phoneVal==''){
            that.init();
          }else {
            if(res.data.result==undefined){
              that.tableData=[];
              that.count=0;
            }else {
              that.tableData=res.data.result;
              that.count=1;
            }
          }

        })
      },
      //查看地址
      watch(row){
        console.log(row)
        this.$alert(row.address, '地址', {
          confirmButtonText: '确定',
          callback: action => {
//            this.$message({
//              type: 'info',
//              message: `action: ${ action }`
//            });
          }
        })
      },
      //查看详情
      details(){
        this.dialogVisible=true;
      },
      //更多
      tab1(command){
        let that=this;
        console.log(command)
        if(command==1){//开通vip
          this.dialogVisible1=true;

        }else if(command==2){//禁用
          this.$confirm('确定禁用此用户？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http('post','/Front/User/disableUser',{uid:this.vipuid}).then(function (res) {
              console.log(res);
              that.init();
            });
            this.$message({
              type: 'success',
              message: '成功禁用!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        }else if(command==3){

        }else if(command==4){//解除封禁
          this.$confirm('确定解除封禁？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http('post','/Front/User/relieveUser',{uid:this.vipuid}).then(function (res) {
              console.log(res);
              that.init();
            });
            this.$message({
              type: 'success',
              message: '解除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消解除'
            });
          });
        }
      },
      //开通会员确定
      vipconfirm(){
        let that=this;
        this.$http('post','/Front/Vip/openAccount',{phone:this.vipphone,vip:this.vip}).then(function (res) {
          console.log(res);
          that.$message({
            type: 'success',
            message: '开通成功!'
          });
          that.vip='';
          that.init();
          this.dialogVisible1 = false;
        })

      },
      //开通会员取消
      vipconcel(){
        this.dialogVisible1 = false;
        this.vip='';
        this.$message({
          type: 'info',
          message: '已取消开通'
        });
      },
      //获取更多的uid
      tab2(row){
        console.log(row);
        this.vipuid=row.uid;
        this.vipphone=row.phone;
      },
    },
    filters: {
      feng: function (value) {
        let a='';
        if(value==1){
          a='是'
        }else if(value==0){
          a='否'
        }
        return a;
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
      this.admin=this.common.getCookie('admin');
      this.init();
      //获取vip列表
      this.$http('post','/Front/Vip/vipList').then(function (res) {
        console.log(res)
        that.vipList=res.data.result;
      })
    },
//    filters: {
//      vip_type: function (value) {
//        let str='';
//        if(value==0){
//          str='普通用户'
//        }else if(value==1){
//          str='体验VIP'
//        }else if(value==2){
//          str='普通VIP'
//        }else if(value==3){
//          str='普通VIP'
//        }else if(value==4){
//          str='商业版VIP'
//        }else if(value==5){
//          str='无限版VIP'
//        }
//        return str;
//      }
//    }
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


  .diag img{
    width: 50%;
    /*height: 50%;*/
  }
  .dbox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .el-radio{
    margin-top: 20px;
  }
  @media (max-width: 1280px) {
    .main{
      width: 970px;
    }
  }
</style>
