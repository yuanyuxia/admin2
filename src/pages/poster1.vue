<!--素材中心-分类管理-营销海报-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="poster1"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>营销海报</div>
          <div>
            <el-input class="search_input" placeholder="分类名称" v-model="typename"></el-input>
            <el-button type="primary" class="search" @click="search">搜索</el-button>
            <el-button icon="el-icon-plus" plain class="add" @click="add">新增分类</el-button>
          </div>
        </div>
        <!--表格-->
        <el-table
          :data="tableData"

          style="width: 100%">
          <el-table-column
            prop=""
            label="分类图片"
            width=""
            align="center">
            <template slot-scope="scope">
              <img class="typeImg1" :src="scope.row.lcon" alt="" >
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="分类名称"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="content"
            label="分类介绍"
            width=""
            align="center">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="num"
            label="模板数量"
            align="center">
            <template slot-scope="scope">
              <div class="content_box">
                <div class="content">
                  {{scope.row.count}}
                </div>
                <el-button type="text" @click="see(scope.row)">查看</el-button>
              </div>

            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            align="center">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" @click="delete1(scope.row)">删除</el-button>
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
          :total="totalNum">
        </el-pagination>
      </div>
    </el-container>

    <!--新增-->
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
      <div>
        分类名称
        <el-input v-model="name" auto-complete="off" placeholder="请输入分类名称（不超过12个字）" class="new_input"></el-input>
      </div>
      <div class="selectBox">
        分类介绍
        <el-input v-model="value" auto-complete="off" placeholder="请输入分类介绍（不超过18个字）" class="new_input"></el-input>
      </div>
      <div class="selectBox">
        排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序
        <el-input v-model="value1" auto-complete="off" placeholder="请输入排序（1-999从大到小）" class="new_input"></el-input>
      </div>
      <div class="uplodBox">
        分类图标
        <el-upload
          class="avatar-uploader"
          action="http://ylou.bjletu.com/Front/Category/Upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </div>
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
      <div class="selectBox">
        分类介绍
        <el-input v-model="value_edit" auto-complete="off" placeholder="请输入分类介绍（不超过18个字）"  class="new_input"></el-input>
      </div>
      <div class="selectBox">
        排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序
        <el-input v-model="value1_edit" auto-complete="off" placeholder="请输入排序（1-999从大到小）" class="new_input"></el-input>
      </div>
      <div class="uplodBox">
        分类图标
        <el-upload
          class="avatar-uploader"
          action="http://x.zbxg123.com/Front/Category/Upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editcancel">取 消</el-button>
        <el-button type="primary" @click="editconfirm">确 定</el-button>
      </div>
    </el-dialog>
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
        this.init();
      },
      //搜索
      search:function () {
        let that=this;
        if(this.typename==''){
          this.init();
        }else {
          this.$http('post','/Front/Category/seachCategory',{name:this.typename,type:2,team_id:this.team_id}).then(function (res) {
//            console.log(res);
            that.num=[100];
            that.totalNum=res.data.result.length;
            that.tableData=res.data.result;
          })
        }

      },
      //查看
      see:function (row) {
        this.$router.push({name:'poster',params:{id:row.cid}});
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

        }else if(this.value==''){
          this.$message({
            message: '分类介绍不能为空',
            type: 'warning'
          });
        }else if(this.value1==''){
          this.$message({
            message: '排序不能为空',
            type: 'warning'
          });
        }else if(this.imageUrl==''){
          this.$message({
            message: '请上传分类图标',
            type: 'warning'
          });
        }else {
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
          this.$http('post','/Front/Category/updateCategory',param).then(function (res) {
            console.log(res);
            that.$message({
              type: 'success',
              message: '新增成功!'
            });
            that.init();
            that.dialogFormVisible = false;
          });
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

        }else if(this.value_edit==''){
          this.$message({
            message: '分类介绍不能为空',
            type: 'warning'
          });
        }else if(this.value1_edit==''){
          this.$message({
            message: '排序不能为空',
            type: 'warning'
          });
        }else if(this.imageUrl==''){
          this.$message({
            message: '请上传分类图标',
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
          this.$http('post','/Front/Category/updateCategory',param).then(function (res) {
//            console.log(res);
            that.$message({
              type: 'success',
              message: '编辑成功!'
            });
            that.init();
          });
          this.imageUrl='';
          this.name1='';
          this.value_edit='';
          this.value1_edit='';
        }
      },
      //删除
      delete1(row){
        let that=this;
//        console.log(row.cid)
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http('post','/Front/Category/delCategory',{cid:row.cid}).then(function (res) {
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
      //上传图片
      handleAvatarSuccess(res, file) {
//        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
//        console.log(res);
        this.imageUrl=res.result;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 0.5;

        if (!isJPG && !isPNG) {
          this.$message.error('上传图片格式错误!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 500k!');
        }
        return (isJPG && isLt2M) || (isPNG && isLt2M);
      },

      //      请求数据列表
      init(){
        let that=this;
        this.$http('post','/Front/Category/categoryList',{page:this.currentPage,type:2,team_id:this.team_id}).then(function (res) {
//          console.log(res);

          if(res.data.result==''){
            that.tableData=[];
            that.num=[10];
            that.totalNum=0;
          }else {
            that.num=[10];
            that.tableData=res.data.result;
            that.totalNum=res.data.count*1;
          }
        })
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


      this.team_id=this.common.getCookie('team_id');

      that.init();
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
  .typeImg1{
    background-color: #cccccc ;
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  .new_input{
    width: 350px;
    margin-left: 20px;
  }
  .selectBox>.new_input{
    /*margin-left: 20px;*/
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


  .uplodBox{
    margin-top: 20px;
    display: flex;
  }
  .uplodBox>.upload-demo{
    /*display: block;*/
    margin-left: 25px;
    width: 350px;
  }

  .avatar-uploader {
    border: 1px dashed #dedede;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 25px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  @media (max-width: 1280px) {
    .main{
      width: 970px;
    }
  }
</style>
