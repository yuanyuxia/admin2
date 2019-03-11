  <!--素材中心-模板管理-营销海报-新增、-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo" ></v-header>
    </el-header>
    <el-container>
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" index="poster"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>营销海报</div>
          <div>>{{title}}</div>
          <el-button type="text" @click="back">(返回上页)</el-button>
        </div>
        <div class="contentBox">
          <div class="left">

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
            <!--模板类型-->
            <div class="typeBox">
              模板类型
              <el-select v-model="typevalue1" class="type1" placeholder="请选择模板类型">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" class="download" @click="down">下载模板文件</el-button>
            </div>
            <!--是否为vip-->
            <div class="vipBox" v-if="admin==1">
              <div>是否为vip</div>
              <el-radio v-model="radio" class="radio" label="1">是</el-radio>
              <el-radio v-model="radio" class="radio" label="0">否</el-radio>
            </div>
            <!--上传图片-->
            <div class="uploadBox">
              上传图片
              <div>
                <el-upload
                  class="upload-demo"
                  action="http://x.zbxg123.com/Front/Template/water_upimg"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handsuccess"
                  :file-list="fileList2"
                  :limit="1"
                  :on-exceed="overflow"
                  :before-upload="beforeAvatarUpload"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </div>

            </div>
            <el-button type="primary" class="add" @click="add">{{btnSubmit}}</el-button>
            <el-button plain class="off" @click="back">取消</el-button>
          </div>
          <!--模板-->
          <div class="right">

            <img  v-bind:src="imgurl==''?imgurl11:imgurl" class="bigimg" alt=""/>
            <!--模板一-->
            <div class="jiu0" v-if="typevalue1==0 ">2014/05/55  周四   晴</div>
            <div class="t_1" v-if="typevalue1==0">
              <div class="t_1left">
                <img src="../assets/template1.png" alt="">
                <div>郑州宝贝驾到儿童摄影</div>
              </div>
            </div>
            <!--模板二-->
            <div class="jiu" v-if="typevalue1==1">by水印文字</div>
            <div class="watermark_box" v-if="typevalue1==1">
              <div class="watermark">
                <img src="../assets/template2.png" alt="" class="w_img">
                <!--<div>扫码抢优惠</div>-->
              </div>
              <div >
                <div class="addss">
                  河南郑州
                </div>
                <div class="w_dw">
                  <div>2015/07/15</div>
                  <div>星期五</div>
                  <div>晴</div>
                </div>

              </div>

            </div>

            <!--模板三-->
            <div class="jiu2" v-if="typevalue1==2">by水印文字</div>
            <img src="../assets/template3.png"  class="t_img" alt="" v-if="typevalue1==2">

            <!--模板四-->
            <img src="../assets/template4.png" alt="" class="t_4img" v-if="typevalue1==3">
            <!--模板五-->
            <img src="../assets/template4.png" alt="" class="t_5img" v-if="typevalue1==4">
            <!--模板六-->
            <img src="../assets/template4.png" alt="" class="t_6img" v-if="typevalue1==5">
            <!--模板七-->
            <img src="../assets/template4.png" alt="" class="t_7img" v-if="typevalue1==6">
            <!--模板八-->
            <img src="../assets/template4.png" alt="" class="t_8img" v-if="typevalue1==7">
            <!--模板九-->
            <img src="../assets/template4.png" alt="" class="t_9img" v-if="typevalue1==8">
            <!--模板十-->
            <img src="../assets/template4.png" alt="" class="t_10img" v-if="typevalue1==9">
            <!--模板十一-->
            <img src="../assets/template4.png" alt="" class="t_11img" v-if="typevalue1==10">


            <div class="title">效果展示{{template[typevalue1]}}</div>
          </div>
        </div>
      </div>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data(){
      return{
        template:['（天气水印1）','（天气水印2）','（天气水印3）','（二维码海报1）','（二维码海报2）','（二维码海报3）','（二维码海报4）','（二维码海报5）','（二维码海报6）','（二维码海报7）','（二维码海报8）'],
        selected:4,
        hidden:1,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        options1: [{
          value: '0',
          label: '天气水印1'
        }, {
          value: '1',
          label: '天气水印2'
        }, {
          value: '2',
          label: '天气水印3'
        }, {
          value: '3',
          label: '二维码海报1'
        }, {
          value: '4',
          label: '二维码海报2'
        }, {
          value: '5',
          label: '二维码海报3'
        }, {
          value: '6',
          label: '二维码海报4'
        }, {
          value: '7',
          label: '二维码海报5'
        }, {
          value: '8',
          label: '二维码海报6'
        }, {
          value: '9',
          label: '二维码海报7'
        }, {
          value: '10',
          label: '二维码海报8'
        }],
        typevalue: '',//模板分类
        typevalue1: '0',//模板类型
        typevalue2:'',
        name:'',//模板名称
        fileList2: [],
        userInfo:'',//登录信息
        imgurl:'',//上传图
        imgurl11:'../../static/template1.jpg',//默认图
        imgsrc:'',//展示图片
        title:'',//新增还是编辑
        btnSubmit:'',//立即创建还是保存
        admin:'',//管理员权限
        radio:'',//是否vip
      }
    },
    watch: {
      typevalue1(val,oldval){

        let a=val*1+1;
//        console.log(a)
        this.imgurl11='../../static/template'+a+'.jpg';
//        this.imgurl==""?this.imgsrc=this.imgurl11:this.imgsrc=this.imgurl;
      }
    },
    methods:{
      //上传文件超出
      overflow:function () {
        this.$message.error('只能上传一条，请您删除后在上传!');
      },
      //图片上传成功
      handsuccess:function (res) {
//        console.log(res);
        this.imgurl=res.result;
      },
      handleRemove(file, fileList) {
//        console.log(file, fileList);
        this.imgurl=""
      },
        //限制jpg,png，上传图片大小
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 0.5;

        if (!isJPG&&!isPNG) {
          this.$message.error('上传头像图片只能是 JPG  PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 500K!');
        }
        return (isJPG && isLt2M) || (isPNG && isLt2M);

      },
      handlePreview(file) {
//        console.log(file);
      },
      //分类列表
      init2:function () {
        let that=this;
        this.$http('post','/Front/Template/templet_cat',{team_id:this.team_id,style:2}).then(function (res) {
//          console.log(res);
          that.options=res.data.result;
        })
      },
      //下载模板文件
      down:function () {
        window.open('http://pc3ceoyfi.bkt.clouddn.com/watermark.zip')
      },
      //新增
      add:function () {
        let that= this;
        if(this.name==''){
          this.$message.error('模板名称不能为空！');
        }else if(this.typevalue==''){
          this.$message.error('请选择模板分类！');
        }else if(this.imgurl==''){
          this.$message.error('请上传图片！');
        }else {
          this.typevalue2=this.typevalue1*1+1;
          //edit为1的时候为编辑
          if(this.$route.params.edit==1){
            if(that.admin==1){
              console.log()
              this.$http('post','/Front/Template/edit_watermark',{tid:that.$route.params.id,team_id:this.team_id,name:this.name,uid:this.userInfo.uid,cid:this.typevalue,tag:this.typevalue2,file:this.imgurl,is_vip:this.radio}).then(function (res) {
//              console.log(res)
                that.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                that.$router.push({name:'poster'})
              })
            }else {
              console.log()
              this.$http('post','/Front/Template/edit_watermark',{tid:that.$route.params.id,team_id:this.team_id,name:this.name,uid:this.userInfo.uid,cid:this.typevalue,tag:this.typevalue2,file:this.imgurl}).then(function (res) {
//              console.log(res)
                that.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                that.$router.push({name:'poster'})
              })
            }
//
          }else {
            if(that.admin==1){
              if(that.radio==''){
                this.$message.error('请选择是否vip');
              }else {

                //            console.log(that.team_id)
                this.$http('post','/Front/Template/addWatermark',{team_id:this.team_id,name:this.name,uid:this.userInfo.uid,cid:this.typevalue,tag:this.typevalue2,file:this.imgurl,style:2,is_vip:that.radio}).then(function (res) {
//              console.log(res)
                  that.$message({
                    type: 'success',
                    message: '新增成功!'
                  });
                  that.$router.push({name:'poster'})
                })
              }

            }else {
              //            console.log(that.team_id)
              this.$http('post','/Front/Template/addWatermark',{team_id:this.team_id,name:this.name,uid:this.userInfo.uid,cid:this.typevalue,tag:this.typevalue2,file:this.imgurl,style:2}).then(function (res) {
//              console.log(res)
                that.$message({
                  type: 'success',
                  message: '新增成功!'
                });
                that.$router.push({name:'poster'})
              })
            }

          }
        }
      },
       downloadFile(url) {
         var form=$("<form>");//定义form表单,通过表单发送请求
         form.attr("style","display:none");//设置为不显示
         form.attr("target","");
         form.attr("method","get");//设置请求类型
         form.attr("action",url);//设置请求路径
         $("body").append(form);//添加表单到页面(body)中
         form.submit();//表单提交

       },
      //获取修改时的水印模板信息
      init_edit(){
        let that=this;
//        console.log(this.$route.params.id)
        this.$http('post','/Front/Template/get_edit_watermark',{tid:this.$route.params.id}).then(function (res) {
//          console.log(res);
//          that.data_edit=res.data.result;
          that.typevalue=res.data.result.cid;
          that.name=res.data.result.name;
          that.content=res.data.result.template_content;
          that.imgurl=res.data.result.imgurl;
          that.radio=res.data.result.is_vip;
          that.typevalue1=String(res.data.result.tag-1);
          let arr=[{name:'模板',url:res.data.result.imgurl}]
          that.fileList2=arr;
        })
      },
      //返回上页
      back:function () {
        this.$router.push({name:'poster'})
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
      this.init2();
      //点击编辑跳转过来的
      if(this.$route.params.id==undefined){
        this.title='新增模板';
        this.btnSubmit='立即创建';
      }else {
        this.init_edit();
        this.title='编辑模板';
        this.btnSubmit='保存编辑';
      }
//      this.imgurl==""?this.imgsrc=this.imgurl11:this.imgsrc=this.imgurl;
    }
  }
</script>
<style scoped>
  .el-header{
    width: 100%;
    height: 70px;
  }
  .main{
    background: #fafafa;
    overflow-y:auto;
    padding-left: 20px;
    width: 100%;
  }
  .palaceTitle{
    display: flex;
    /*justify-content: space-between;*/
    align-items: center;
    margin: 15px 0;
    font-size: 16px;
  }
  .palaceTitle>div:nth-child(1){

    color: #999999;
  }
  .palaceTitle>div:nth-child(1){

    color: #666666;
  }


  .contentBox{
    display: flex;
  }
  .right{
    margin-left: 50px;
    position: relative;
  }
  .jiu{
    position: absolute;
    left:23px;
    top: 17px;
    font-size: 16px;
    color: #666666;
  }
  .jiu2{
    width: 320px;
    position: absolute;
    left:0px;
    top: 10px;
    font-size: 20px;
    color: #666666;
    text-align: center;
  }
  .jiu0{
    width: 320px;
    position: absolute;
    left:0px;
    top: 280px;
    font-size: 20px;
    color: #666666;
    text-align: center;
  }
  .right>.title{
    font-size: 24px;
    color: #ff0000;
  }
  .right>.bigimg{
    width: 320px;
    height: 480px;
    background-color: #ffffff;
    /*margin-top: 18px;*/
  }
  .t_1left{
    display: flex;
    /*position: absolute;*/
    /*left: 20px;*/
    /*top:510px;*/
  }
  .t_1left>div{
    /*margin-left: 20px;*/
    font-size: 15px;
    position: absolute;
    top: 437.5px;
    right:11.5px;
    /*margin-top: 65px;*/
  }
  .t_1left>img{
    width: 60px;
    height: 60px;
    position: absolute;
    top: 376px;
    left:29px;
    /*background-color: red;*/
  }
  .watermark_box{
    display: flex;
    /*justify-content: space-around;*/
    /*align-items: center;*/
    font-size: 15px;
    position: absolute;
    top: 383px;
    left: 0px;
  }
  .watermark{
    margin-left: 32px;
  }
  .w_dw{
    display: flex;
    margin-top: 15px;
    margin-left: 9px;
  }
  .w_dw>div:nth-child(1){
    /*margin-left: 20px;*/
  }
  .w_dw>div:nth-child(2){
    margin-left: 10px;
  }
  .w_dw>div:nth-child(3){
    margin-left: 20px;
  }
  .addss{
    margin-left: 12px;
    margin-top: 9px;
  }
  .vipBox{
    display: flex;
    margin-top: 30px;
  }
  .radio{
    line-height: 21px;
    margin-left: 20px;
  }

  .t_img{
    width: 84px;
    height: 131px;
    /*background: red;*/
    position: absolute;
    left: 18px;
    top: 329px;
  }
  .t_4img{
    width: 115px;
    height: 115px;
    position: absolute;
    top: 182.5px;
    left: 102.5px;
  }
  .t_5img{
    width: 115px;
    height: 115px;
    position: absolute;
    top: 262px;
    left: 102.5px;
  }
  .t_6img{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 27.5px;
    left: 25px;
  }
  .t_7img{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 197.5px;
    left: 25px;
  }
  .t_8img{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 367.5px;
    left: 25px;
  }
  .t_9img{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 27.5px;
    right: 20px;
  }
  .t_10img{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 197.5px;
    right: 20px;
  }
  .t_11img{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 367.5px;
    right: 20px;
  }
  .right{
    font-size: 15px;
  }
  .watermark>img{
    width: 70px;
    height: 70px;
    /*background-color:red ;*/
  }
  .watermark>div{
    font-size: 12px;
    text-align: center;
  }
  .left{
    background-color: #ffffff;
    overflow: hidden;
    padding-left: 60px;
    border-radius: 5px;
  }
  .nameBox{
    margin-top: 40px;
  }
  .name{
    width: 400px;
    margin-left: 20px;
  }
  .typeBox{
    /*margin-left: 50px;*/
    margin-top: 30px;
  }
  .type{
    margin-left: 20px;
    width: 400px;
  }
  .type1{
    margin-left: 20px;
    width: 250px;
  }
  .download{
    margin-left: 20px;
  }
  .uploadBox{
    display: flex;
    margin-top: 40px;
  }
  .uploadBox>div{
    width: 380px;
    background-color: #ffffff;
    border-radius: 3px;
    border: solid 1px #dedede;
    padding: 15px;
    margin-left: 20px;
  }

  .add{
    margin: 55px 0 80px 80px;

  }
  .off{
    margin-left: 50px;
  }



  @media (max-width: 1280px) {
    .main{
      width: 970px;
    }
  }
</style>
