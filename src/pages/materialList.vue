<!--素材中心-分类管理-素材列表-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="materialList"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>素材列表</div>
          <div>
            <el-input class="search_input" placeholder="分类名称" v-model="typename"></el-input>
            <el-button type="primary" class="search" @click="search">搜索</el-button>
            <el-button icon="el-icon-plus" plain class="add" @click="add">新增分类</el-button>
          </div>
        </div>
        <div class="innerBox" :class="items==''?'aa':''">
          <div v-if="items==''">暂无数据</div>
          <div class="inner" v-for="(item,index) in items" :key="index">
            <img :src="item.lcon" alt="">
            <div>{{item.name}}</div>
            <div class="zhe">
              <i class="el-icon-edit-outline icon  icon1" @click="edit(item)"></i>
              <i class="el-icon-delete icon icon2" @click="delete1(item)"></i>
            </div>
          </div>

        </div>
        <!--分页-->
        <!--<el-pagination-->
          <!--class="paging"-->
          <!--@size-change="handleSizeChange"-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="currentPage"-->
          <!--:page-sizes="[100, 200, 300, 400]"-->
          <!--:page-size="100"-->
          <!--layout="total, sizes, prev, pager, next, jumper"-->
          <!--:total="400">-->
        <!--</el-pagination>-->
      </div>

      <!--新增-->
      <el-dialog title="新增素材" :visible.sync="dialogFormVisible">
        <div>
          素材名称
          <el-input v-model="name" auto-complete="off" placeholder="请输入素材名称（不超过12个字）" class="new_input"></el-input>
        </div>
        <!--<div class="selectBox">-->
          <!--分类介绍-->
          <!--<el-input v-model="value" auto-complete="off" placeholder="请输入分类介绍（不超过18个字）" class="new_input"></el-input>-->
        <!--</div>-->
        <!--<div class="selectBox">-->
          <!--排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序-->
          <!--<el-input v-model="value1" auto-complete="off" placeholder="请输入排序（1-999从大到小）" class="new_input"></el-input>-->
        <!--</div>-->
        <div class="uplodBox">
          素材图标
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
      <el-dialog title="编辑素材" :visible.sync="dialogFormVisible1">
        <div>
          素材名称
          <el-input v-model="name1" auto-complete="off" placeholder="请输入素材名称（不超过12个字）" class="new_input"></el-input>
        </div>
        <!--<div class="selectBox">-->
        <!--分类介绍-->
        <!--<el-input v-model="value" auto-complete="off" placeholder="请输入分类介绍（不超过18个字）" class="new_input"></el-input>-->
        <!--</div>-->
        <!--<div class="selectBox">-->
        <!--排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序-->
        <!--<el-input v-model="value1" auto-complete="off" placeholder="请输入排序（1-999从大到小）" class="new_input"></el-input>-->
        <!--</div>-->
        <div class="uplodBox">
          素材图标
          <el-upload
            class="avatar-uploader"
            action="http://9.bjletu.com/Front/Category/Upload"
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
        items:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
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
        id:'',//编辑cid
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
      },
//      搜索
      search(){
        let that=this;
        this.$http('post','/Front/Material/search',{keyword:this.typename}).then(function (res) {
//          console.log(res);
          if(that.typename==''){
            that.init();
          }else {
            if(res.data.result==undefined){
              that.items=[];
            }else {
              that.items=res.data.result;
            }
          }
        })
      },
//      添加
      add(){
        this.dialogFormVisible=true;
        this.imageUrl='';
      },
      //编辑
      edit(row){
        this.dialogFormVisible1 = true;
        this.name1=row.name;
//        this.value_edit=row.content;
//        this.value1_edit=row.sort;
        this.imageUrl=row.lcon;
        this.id=row.id;
      },
//      请求列表
      init(){
        let that=this;
        this.$http('post','/Front/Material/materialList').then(function (res) {
          console.log(res);
          that.items=res.data.result;
        })
      },
      //上传图片
      handleAvatarSuccess(res, file) {
//        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
        console.log(res);
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
      //新增取消
      addcancel(){
        let that=this;
        that.dialogFormVisible=false;
        that.$message({
          type: 'info',
          message: '取消新增'
        });
      },
      //新增确定
      addconfirm(){
        let that=this;
        if(this.name==''){
          that.$message({
            type: 'info',
            message: '素材名称不能为空'
          });
        }else if(this.imageUrl==''){
          that.$message({
            type: 'info',
            message: '请上传素材图标'
          });
        }else {
          this.$http('post','/Front/Material/addMaterial',{uid:this.userInfo.uid,name:this.name,lcon:this.imageUrl}).then(function (res) {
            if(res.data.code==1){
              console.log(res);
              that.init();
              that.dialogFormVisible=false;
              that.$message({
                type: 'success',
                message: '添加成功!'
              });
            }else {
              that.$message({
                type: 'info',
                message: res.data.message
              });
            }
          })
        }
      },
      //编辑取消
      editcancel(){
        this.dialogFormVisible1 = false;
        this.$message({
          type: 'info',
          message: '取消编辑'
        });
        this.imageUrl='';
        this.name1='';
      },
      //编辑确定
      editconfirm(){
        let that=this;
        if(this.name1==''){
          that.$message({
            type: 'info',
            message: '素材名称不能为空'
          });
        }else if(this.imageUrl==''){
          that.$message({
            type: 'info',
            message: '请上传素材图标'
          });
        }else {
//          this.$http('post','/Front/Material/addMaterial',{uid:this.userInfo.uid,name:this.name,lcon:this.imageUrl}).then(function (res) {
//            if(res.data.code==1){
//              console.log(res);
//              that.init();
//              that.dialogFormVisible=false;
//              that.$message({
//                type: 'success',
//                message: '编辑成功!'
//              });
//            }else {
//              that.$message({
//                type: 'info',
//                message: res.data.message
//              });
//            }
//          })
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
          this.$http('post','/Front/Material/delMaterial',{id:row.id}).then(function (res) {
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

  .innerBox{
    overflow: hidden;
    background-color: #ffffff;
    margin-right: 40px;
  }
  .aa{
    display: flex;
    width: 100%;
    height: 80%;
    justify-content: center;
    align-items: center;
  }
  .inner{
    width: 127px;
    float: left;
    margin-left: 20px;
    position: relative;
    margin: 20px;
  }
  .inner img{
    width: 127px;
    height: 127px;
    /*background-color: red;*/
  }
  .inner div{
    text-align: center;
  }
  .paging{
    text-align: right;
    padding: 20px;
    background-color: #ffffff;
    /*width: 100%;*/
    margin-right: 40px;
  }

  /*.icon1{*/
    /*width: 20px;*/
    /*height: 20px;*/
    /*position: absolute;*/
    /*left: 30px;*/
    /*top: 55px;*/
    /*color: #ffffff;*/
  /*}*/
  /*.icon2{*/
    /*width: 20px;*/
    /*height: 20px;*/
    /*position: absolute;*/
    /*left: 80px;*/
    /*top: 55px;*/
    /*color: #ffffff;*/
  /*}*/
  .zhe{
    width: 127px;
    height: 127px;
    background-color: rgba(0,0,0,0.6);
    position: absolute;
    left: 0;
    top:0;
    color: #ffffff;
    line-height: 127px;
  }
  .icon2{
    margin-left:20px ;

  }
  .icon{
    cursor: pointer;
  }
  .inner .zhe{
    display: none;
  }
  .inner:hover .zhe{
    display: block;
  }


  .new_input{
    width: 350px;
    margin-left: 20px;
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
</style>
