<!--模板管理-短视频-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="dvideo"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>短视频</div>
          <div>
            <el-input class="search_input" v-model="search1" placeholder="模板名称"></el-input>
            <el-button type="primary" class="search" @click="search">搜索</el-button>
            <el-button icon="el-icon-plus" plain class="add" @click="add">新增模板</el-button>
          </div>
        </div>
        <!--表格-->
        <el-table
          :data="tableData"

          style="width: 100%">
          <el-table-column
            prop="img"
            label="缩略图"
            width=""
            align="center">
            <template slot-scope="scope">
              <img :src="scope.row.thumb" alt="" class="img">
            </template>
          </el-table-column>
          <el-table-column
            prop="template_name"
            label="视频名称"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="模板分类"
            align="center">
          </el-table-column>
          <el-table-column
            prop="template_content"
            label="视频地址"
            align="center">
            <!--<template slot-scope="scope">-->
              <!--<div class="content_box">-->
                <!--<div class="content">-->
                  <!--{{scope.row.template_content}}-->
                <!--</div>-->
                <!--<el-button type="text" @click="content(scope.row)">详情</el-button>-->
              <!--</div>-->

            <!--</template>-->
          </el-table-column>
          <el-table-column
          prop="commend"
          label="排序"
          align="center">
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
          layout="total, sizes,prev, pager, next, jumper"
          :total="count">
        </el-pagination>

        <!--新增-->
        <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
          <div>
            分类名称
            <el-input v-model="name" auto-complete="off" placeholder="请输入分类名称（不超过12个字）" class="new_input"></el-input>
          </div>
          <!--<div class="selectBox">-->
          <!--分类介绍-->
          <!--<el-input v-model="value" auto-complete="off" placeholder="请输入分类介绍（不超过18个字）" class="new_input"></el-input>-->
          <!--</div>-->

          <!--模板分类-->
          <div class="typeBox">
            模板分类
            <el-select v-model="typevalue" class="type" placeholder="请选择模板分类">
              <el-option
                v-for="item in options"
                :key="item.cid"
                :label="item.name"
                :value="item.cid">
              </el-option>
            </el-select>
          </div>
          <div class="selectBox">
            排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序
            <el-input v-model="value1" auto-complete="off" placeholder="请输入排序（1-999从大到小）" class="new_input"></el-input>
          </div>
          <div class="selectBox" style="display: flex">
            <div style="margin-top: 20px">视频地址</div>
            <el-input v-model="address" type="textarea" :rows="2" placeholder="请输入视频地址" class="new_input1"></el-input>
          </div>
          <!--<div class="uplodBox">-->
          <!--分类图标-->
          <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--action="http://ylou.bjletu.com/Front/Category/Upload"-->
          <!--:show-file-list="false"-->
          <!--:on-success="handleAvatarSuccess"-->
          <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          <!--</el-upload>-->

          <!--</div>-->
          <div slot="footer" class="dialog-footer">
            <el-button @click="addcancel">取 消</el-button>
            <el-button type="primary" @click="addconfirm">确 定</el-button>
          </div>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑分类" :visible.sync="dialogFormVisible1">
          <div>
            分类名称
            <el-input v-model="name1" auto-complete="off" placeholder="请输入分类名称（不超过12个字）" class="new_input"></el-input>
          </div>
          <!--<div class="selectBox">-->
          <!--分类介绍-->
          <!--<el-input v-model="value_edit" auto-complete="off" placeholder="请输入分类介绍（不超过18个字）"  class="new_input"></el-input>-->
          <!--</div>-->

          <!--模板分类-->
          <div class="typeBox">
            模板分类
            <el-select v-model="typevalue" class="type" placeholder="请选择模板分类">
              <el-option
                v-for="item in options"
                :key="item.cid"
                :label="item.name"
                :value="item.cid">
              </el-option>
            </el-select>
          </div>
          <div class="selectBox">
            排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序
            <el-input v-model="value1_edit" auto-complete="off" placeholder="请输入排序（1-999从大到小）" class="new_input"></el-input>
          </div>
          <div class="selectBox" style="display: flex">
            <div style="margin-top: 20px">视频地址</div>
            <el-input v-model="address" type="textarea" :rows="2" placeholder="请输入视频地址" class="new_input1"></el-input>
          </div>
          <!--<div class="uplodBox">-->
          <!--分类图标-->
          <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--action="http://9.bjletu.com/Front/Category/Upload"-->
          <!--:show-file-list="false"-->
          <!--:on-success="handleAvatarSuccess"-->
          <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          <!--</el-upload>-->

          <!--</div>-->
          <div slot="footer" class="dialog-footer">
            <el-button @click="editcancel">取 消</el-button>
            <el-button type="primary" @click="editconfirm">确 定</el-button>
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
        selected:4,
        hidden:1,
        tableData:[
          {}
        ],
        options: [{
          cid: '选项1',
          name: '黄金糕'
        }, {
          cid: '选项2',
          name: '双皮奶'
        }, {
          cid: '选项3',
          name: '蚵仔煎'
        }, {
          cid: '选项4',
          name: '龙须面'
        }, {
          cid: '选项5',
          name: '北京烤鸭'
        }],
        typevalue:'',//模板分类选择
        currentPage: 1,
        count:10,//总条数
        userInfo:'',//登录信息
        search1:'',//sousuo
        num:[10],//每页条数
        name:'',//新增名称
        value1:'',//新增排序
        dialogFormVisible:false,//新增弹窗
        dialogFormVisible1:false,//编辑弹窗
        name1:'',//编辑名称
        value1_edit:'',//编辑排序
        address:'',//视频地址
      }
    },
    methods:{
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
//      页数改变时候
      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
        this.currentPage=val;
//        if(this.$route.params.id){
//          this.init1();
//        }else {
//          this.init();
//
//        }
      },
      //新增
      add(){
        this.dialogFormVisible = true;
        this.imageUrl='';
      },
      //编辑
      edit(row){
        this.dialogFormVisible1 = true;
        this.name1=row.name;
        this.value_edit=row.content;
        this.value1_edit=row.sort;
        this.imageUrl=row.lcon;
        this.cid=row.cid;
      },
      //新增确定
      addconfirm(){
        let that=this;
        if(this.name==''){
          this.$message({
            message: '分类名称不能为空',
            type: 'warning'
          });

        }else if(this.value1==''){
          this.$message({
            message: '排序不能为空',
            type: 'warning'
          });
        }else  {
          let param={
            flag:'add',
            team_id:this.team_id,
            uid:this.userInfo.uid,
            name:this.name,
            content:this.value,
            type:2,
            lcon:this.imageUrl,
            sort:this.value1,

          };
//          this.$http('post','/Front/Category/updateCategory',param).then(function (res) {
////            console.log(res);
//            that.$message({
//              type: 'success',
//              message: '新增成功!'
//            });
//            that.init();
//            that.dialogFormVisible = false;
//          });
//          console.log(this.imageUrl);
          this.name='';
          this.value='';
          this.value1='';
          this.imageUrl='';
        }
      },
      //新增取消
      addcancel(){
        this.dialogFormVisible = false;
        this.$message({
          type: 'info',
          message: '取消新增'
        });
        this.name='';
        this.value='';
        this.value1='';
        this.imageUrl='';
      },
      //编辑取消
      editcancel(){
        this.dialogFormVisible1 = false;
        this.$message({
          type: 'info',
          message: '取消编辑'
        });
        this.imageUrl='';
        this.imageUrl='';
        this.name1='';
        this.value_edit='';
        this.value1_edit='';
      },
      //编辑确定
      editconfirm(){
        this.dialogFormVisible1 = false;
        let that=this;
        if(this.name1==''){
          this.$message({
            message: '分类名称不能为空',
            type: 'warning'
          });

        }else  if(this.value1_edit==''){
          this.$message({
            message: '排序不能为空',
            type: 'warning'
          });
        }else {
          let param={
            flag:'edit',
            team_id:this.team_id,
            uid:this.userInfo.uid,
            name:this.name1,
            content:this.value_edit,
            type:2,
            lcon:this.imageUrl,
            sort:this.value1_edit,
            cid:this.cid
          };
//          this.$http('post','/Front/Category/updateCategory',param).then(function (res) {
////            console.log(res);
//            that.$message({
//              type: 'success',
//              message: '编辑成功!'
//            });
//            that.init();
//          });
          this.imageUrl='';
          this.name1='';
          this.value_edit='';
          this.value1_edit='';
        }
      },
      //删除
      del(row){
        let that=this;


        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//          this.$http('post','/Front/Template/delTemplate',{tid:row.tid,style:1}).then(function (res) {
//            console.log(res);
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
//            that.init();
//          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //加载列表
      init(){
        let that=this;
//        this.$http('post','/Front/Template/templateList',{team_id:this.team_id,page:this.currentPage,style:1}).then(function (res) {
//          console.log(res);
//
//
//          if(res.data.result==''){
//            that.tableData=[];
//            that.num=[10];
//          }else {
//            that.num=[10];
//            that.tableData=res.data.result;
//          }
//
//          if(res.data.count==undefined){
//            that.count=0;
//          }else {
//            that.count=res.data.count*1;
//          }
//        })
      },
      //内容详情
      content:function (row) {
//        this.$alert(row.template_content, '内容详情', {
//          confirmButtonText: '确定',
//          callback: action => {
//
//          }
//        });
      },
      //搜索
      search:function () {
        let that=this;
//        if(this.search1==''){
//          this.init();
//        }else {
//          this.$http('post','/Front/Template/searchTemplate',{team_id:this.team_id,style:1,keyword:this.search1}).then(function (res) {
//            console.log(res)
//            that.num=[100];
//            that.tableData=res.data.result;
//            that.count=res.data.result.length;
//
//          })
//        }

      },
      init1(){
        let that=this;
//        this.$http('post','/Front/Template/templateInfo',{team_id:this.team_id,style:1,cid :this.$route.params.id,page:this.currentPage}).then(function (res) {
//          console.log(res)
//          if(res.data.count==undefined){
//            that.count=0
//          }else {
//            that.count=res.data.count*1;
//
//          }
//          that.num=[10];
//          that.tableData=res.data.result;
//
//        })
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
//      console.log(this.$route.params.id)
//      if(this.$route.params.id){
//        this.init1();
//      }else {
//        this.init();
//
//      }
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

  .new_input{
    width: 350px;
    margin-left: 20px;
  }
  .new_input1{
    width: 350px;
    margin-left: 24px;
    margin-top: 20px;
  }
  .selectBox>.new_input{
    /*margin-left: 20px;*/
    margin-top: 20px;
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
  .typeBox{
    margin-top: 20px;
  }
  .type{
    margin-left: 20px;
  }

  @media (max-width: 1280px) {
    .main{
      width: 970px;
    }
  }
</style>
