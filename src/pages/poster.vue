<!--素材中心- 模板管理-营销海报、-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="poster"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>团队列表</div>
          <div>
            <el-input class="search_input" placeholder="模板名称" v-model="search1"></el-input>
            <el-button type="primary" class="search" @click="search">搜索</el-button>
            <el-button icon="el-icon-plus" plain @click="add" class="add">新增模板</el-button>
          </div>
        </div>

        <!--表格-->
        <el-table
          :data="tableData"

          style="width: 100%">
          <el-table-column
            prop="thumb"
            label="缩略图"
            width=""
            align="center">
            <template slot-scope="scope">
              <img :src="scope.row.thumb" alt="" class="img">
            </template>
          </el-table-column>
          <el-table-column
            prop="template_name"
            label="模板名称"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="模板分类"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="模板类型"
            align="center">
            <template slot-scope="scope">
              {{scope.row.tag |tag}}
            </template>
          </el-table-column>
          <el-table-column
          prop="is_vip"
          label="是否vip"
          align="center"
          v-if="admin==1">
            <template slot-scope="scope">
              {{scope.row.is_vip |vipf}}
            </template>
        </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" @click="del(scope.row)">删除</el-button>
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
        tableData:[
          {img:'',name:'北京乐兔科技',type:'乐儿',content:'类型1',sort:'12'},
          {img:'',name:'北京乐兔科技',type:'乐儿',content:'类型1',sort:'12'},
          {img:'',name:'北京乐兔科技',type:'乐儿',content:'类型1',sort:'12'},
          {img:'',name:'北京乐兔科技',type:'乐儿',content:'类型1',sort:'12'}
        ],
        currentPage: 1,//当前页数
        userInfo:'',//登录信息
        count:10,//总条数
        num:[10],
        search1:'',//搜索
        admin:'',//管理员权限
      }
    },
    filters: {
      tag: function (value) {
        let str='';
        if(value==1){
          str='模板1'
        }else if(value==2){
          str='模板二'
        }else if(value==3){
          str='模板三'
        }else if(value==4){
          str='模板四'
        }else if(value==5){
          str='模板五'
        }else if(value==6){
          str='模板六'
        }else if(value==7){
          str='模板七'
        }else if(value==8){
          str='模板八'
        }else if(value==9){
          str='模板九'
        }else if(value==10){
          str='模板十'
        }else if(value==11){
          str='模板十一'
        }
        return str;
      },

        vipf: function (value) {
          let a='';
          if(value==1){
            a='是'
          }else if(value==0){
            a='否'
          }
          return a;
        }

    },
      methods:{
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
        this.currentPage=val;
        if(this.$route.params.id){
          this.init1();
        }else {
          this.init();

        }
      },
      //新增
      add(){
        this.$router.push({name:'addPoster',params:{edit:0}})
      },
      //搜索
      search:function () {
        let that=this;
        if(this.search1==''){
          this.init();
        }else {
          this.$http('post','/Front/Template/searchTemplate',{team_id:this.team_id,style:2,keyword:this.search1}).then(function (res) {
//            console.log(res);
            that.num=[100];
            that.tableData=res.data.result;
            that.count=res.data.result.length;

          })
        }
      },
      //编辑
      edit:function (row) {
        this.$router.push({name:'addPoster',params:{id:row.tid,edit:1}});
      },
      //删除
      del:function (row) {
        let that=this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http('post','/Front/Template/delTemplate',{tid:row.tid,style:2}).then(function (res) {
//            console.log(res);
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
            that.init();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //请求列表
      init(){
        let that=this;
        this.$http('post','/Front/Template/templateList',{team_id:this.team_id,page:this.currentPage,style:2}).then(function (res) {
          console.log(res);
          if (res.data.count==undefined){
            that.count=0;
          }else {
            that.count = res.data.count * 1;
          }
          that.num=[10];
          that.tableData=res.data.result;

        })
      },
        init1(){
        let that=this;
          this.$http('post','/Front/Template/templateInfo',{team_id:this.team_id,style:2,cid :this.$route.params.id,page:this.currentPage}).then(function (res) {
            console.log(res)
            if(res.data.count==undefined){
              that.count=0;
            }else {
              that.count=res.data.count*1;

            }
            that.num=[10];
            that.tableData=res.data.result;

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
      this.team_id=this.common.getCookie('team_id');

      that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';

      window.onresize = function temp() {
        that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';
      };
      this.admin=this.common.getCookie('admin');
      if(this.$route.params.id==undefined){
        this.init();
      }else {
        this.init1();

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

  .img{
    width: 30px;
    height: 30px;
    /*background: red;*/
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
