<!--模板管理-母婴文库-新增-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>.
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="library"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>母婴文库</div>
          <div>>新增模板</div>
          <el-button type="text" @click="back">(返回上页)</el-button>
        </div>
        <div class="innerBox">
          <div>
            <!--模板名称-->
            <div class="nameBox">
              模板名称
              <el-input class="name" v-model="name" placeholder="请输入模板名称"></el-input>
            </div>
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
          </div>
          <div class="editor">
            <div>
              模板内容
            </div>
            <div id="editorElem" style="width: 730px;"></div>
            <div class="updown">
              <div  class="el-upload__tip">
                <div>封面图片</div>
                <div>建议尺寸：</div>
                <div>图片大小320 * 200px</div>
              </div>
              <el-upload
                class="avatar-uploader"
                action="http://ylou.bjletu.com/Front/Category/Upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">

                <el-button size="small" type="primary">点击上传</el-button>

              </el-upload>
              <img  :src="imageUrl" class="avatar">
            </div>
          </div>
          <!--是否为vip-->
          <!--<div class="vipBox">-->
          <!--<div>是否为vip</div>-->
          <!--<el-radio v-model="radio" class="radio" label="1">是</el-radio>-->
          <!--<el-radio v-model="radio" class="radio" label="2">否</el-radio>-->
          <!--</div>-->

          <!--上传图片-->
          <!--<div class="uploadBox">-->
            <!--<div>上传图片</div>-->
            <!--<div class="uploadBorder">-->
              <!--<el-upload-->
                <!--class="upload"-->
                <!--action="http://9.bjletu.com/Front/Category/upimg"-->
                <!--list-type="picture-card"-->
                <!--:on-success="callback"-->
                <!--:limit="9"-->
                <!--:on-exceed="over"-->
                <!--:multiple="true"-->
                <!--:on-change="changef"-->
                <!--:file-list="fileList2"-->
                <!--:on-preview="handlePictureCardPreview"-->
                <!--:on-remove="handleRemove">-->
                <!--<i class="el-icon-plus"></i>-->
              <!--</el-upload>-->
              <!--<el-dialog :visible.sync="dialogVisible">-->
                <!--<img width="100%" :src="dialogImageUrl" alt="">-->
              <!--</el-dialog>-->
            <!--</div>-->
          <!--</div>-->
          <el-button type="primary" class="add" @click="getContent">立即创建</el-button>
          <el-button plain class="off">取消</el-button>
        </div>

      </div>
    </el-container>
  </el-container>
</template>
<script>
  import E from 'wangeditor'
  export default {

    data(){
      return{
        selected:4,
        hidden:1,
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
        typevalue: '',//模板分类
        name:'',//模板名称
        content:'',//模板内容
        radio:'',//是否vip
        dialogImageUrl: '',
        dialogVisible: false,
        userInfo:'',//登录信息
        team_id:'',
        imgarr:[],//文件上传存储数组
        address:[],//img  address
        data_edit:{},//编辑信息
        fileList2:[],//上传文件列表

        imageUrl:'',//上传图片
        editorContent:'',//富文本
      }
    },
    methods:{
//      获取富文本
      getContent: function () {
        alert(this.editorContent)
      },

      //上传图片
      handleAvatarSuccess(res, file) {

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
      //删除图片
      handleRemove(file, fileList) {
//        console.log(file, fileList);
//        if(file.response==undefined){
//          var index3=this.imgarr.indexOf(file.url);
//          if (index3 > -1) {
//            this.imgarr.splice(index, 1);
//          }
//          var index4=this.address.indexOf(file.address);
//          if (index4 > -1) {
//            this.address.splice(index, 1);
//          }
//        }else {
//          var  index = this.imgarr.indexOf(file.response.result.file);
//          if (index > -1) {
//            this.imgarr.splice(index, 1);
//          }
//          var  index1 = this.address.indexOf(file.response.result.address);
//          if (index1 > -1) {
//            this.address.splice(index, 1);
//          }
//        }
//        console.log(this.imgarr);

//        console.log(this.imgarr)
//        this.imgarr.forEach(function (item,index) {
//          if(item==file.response.result){
//
//          }
//        })
      },
      //创建
      add:function () {
        let that=this;
        //edit等于1的时候为编辑
//        if(this.$route.params.edit==1){
//          if(this.name==''){
//            this.$message.error('模板名称不能为空！');
//          }else if(this.content==''){
//            this.$message.error('模板内容不能为空！');
//          }else if(this.typevalue==''){
//            this.$message.error('请选择模板分类！');
//          }else {
//            let param={};
//            param.team_id=this.team_id;
//            param.name=this.name;
//            param.content=this.content;
//            param.uid=this.userInfo.uid;
//            param.cid=this.typevalue;
//            param.is_share=1;
//            param.tid=that.$route.params.id;
//            param.file="";
//            this.imgarr.forEach(function (item,index) {
//              if(index==0){
//                param.file+=item;
//              }else {
//                item=","+item;
//                param.file+=item;
//              }
//
//            });
//            param.address="";
//            this.imgarr.forEach(function (item,index) {
//              if(index==0){
//                param.address+=item;
//              }else {
//                item=","+item;
//                param.address+=item;
//              }
//
//            });
////            console.log(param);
//            that.$http('post','/Front/Template/addTemplate',param).then(function (res) {
////              console.log(res);
////                console.log(typeof res.data);
////                debugger
//              that.$message.success('修改成功');
//              that.$router.push({name:'palace'});
//            })
////            console.log(param);
//          }
//        }else {
//          if(this.name==''){
//            this.$message.error('模板名称不能为空！');
//          }else if(this.content==''){
//            this.$message.error('模板内容不能为空！');
//          }else if(this.typevalue==''){
//            this.$message.error('请选择模板分类！');
//          }else {
//            let param={};
//            param.team_id=this.team_id;
//            param.name=this.name;
//            param.content=this.content;
//            param.uid=this.userInfo.uid;
//            param.cid=this.typevalue;
//            param.is_share=1;
//            param.file="";
//            this.imgarr.forEach(function (item,index) {
//              if(index==0){
//                param.file+=item;
//              }else {
//                item=","+item;
//                param.file+=item;
//              }
//
//            });
//            param.address="";
//            this.address.forEach(function (item,index) {
//              if(index==0){
//                param.address+=item;
//              }else {
//                item=","+item;
//                param.address+=item;
//              }
//
//            });
////            console.log(param);
//            that.$http('post','/Front/Template/addTemplate',param).then(function (res) {
////              console.log(res);
////                console.log(typeof res.data);
////                debugger
//              that.$message.success('创建成功');
//              that.$router.push({name:'palace'});
//            })
////            console.log(param);
//          }
//        }


//        cid
//        param.file1
//        file2

      },
      //文件上传成功
      callback:function (res) {
//        console.log(res);
//        this.imgarr.push(res.result.file);
//        this.address.push(res.result.address);
//        console.log(this.imgarr);
//        this.getUrlBase64(res.result,'jpg',function (base64) {
//          console.log(base64)
//        })
      },
      //图片超出上传个数
      over:function () {
//        this.$message.error('上传图片不能超过9张')
      },

      //分类列表
//      init2:function () {
//        let that=this;
//        this.$http('post','/Front/Template/templet_cat',{team_id:this.team_id,style:1}).then(function (res) {
////         console.log(res);
//          that.options=res.data.result;
//        })
//      },
      //获 取修改时的九宫格模板信息
//      init_edit(){
//        let that=this;
////        console.log(this.$route.params.id)
//        this.$http('post','/Front/Template/get_edit_template',{tid:this.$route.params.id}).then(function (res) {
////          console.log(res);
////          that.data_edit=res.data.result;
//          that.typevalue=res.data.result.cid;
//          that.name=res.data.result.template_name;
//          that.content=res.data.result.template_content;
//          that.fileList2=res.data.result.imgurl;
//          res.data.result.imgurl.forEach(function (item,index) {
//            that.imgarr.push(item.url)
//            that.address.push(item.address)
//          })
//        })
//      },
      //返回上页
      back:function () {
        this.$router.push({name:'library'})
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
      var editor = new E('#editorElem');
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
//      this.init2();
//      //点击编辑跳转过来的
//      if(this.$route.params.id){
//        this.init_edit();
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
    padding-right: 40px;
    width: 100%;
  }
  .palaceTitle{
    display: flex;
    /*justify-content: space-between;*/
    align-items: center;
    margin: 20px 0;
    font-size: 18px;
  }
.el-upload__tip{
  font-size: 16px;
  color: #999999;
}
.el-upload__tip>div:nth-child(1){
  margin-left: 10px;
  color: #333333;
}
.el-upload__tip>div{
  margin-bottom: 10px;
}
.avatar{
  width: 272px;
  height: 170px;
  margin-top: 30px;
}
  .updown{
    width: 294px;
    height: 358px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #dedede;
    margin-left: 20px;
    padding-left: 10px;
  }
  .avatar-uploader{

  }
  .palaceTitle>div:nth-child(1){

    color: #999999;
  }
  .palaceTitle>div:nth-child(1){

    color: #666666;
  }
  .innerBox{
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #dedede;
    margin: 20px;
    /*margin-right: 40px;*/
    padding: 40px 0px 0 60px;
    /*width: 100%;*/
  }
  .innerBox>div:nth-child(1){
    display: flex;
  }
  .name{
    width: 400px;
    margin-left: 20px;
  }
  .typeBox{
    margin-left: 50px;
  }
  .type{
    margin-left: 20px;
  }

.editor{
  display: flex;
  margin-top: 36px;
}
#editorElem{
  margin-left: 20px;
}


  .add{
    margin: 55px 0 80px 80px;

  }
  .off{
    margin-left: 50px;
  }


  @media (max-width: 1560px) {
    .innerBox{
      width: 1180px;
    }
  }
</style>
