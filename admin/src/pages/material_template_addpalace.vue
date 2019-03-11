<!--素材中心-模板管理-九宫格-新增-->
<template>
  <el-container>
    <!--头部-->
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>.
      <!--导航-->
      <el-aside width="228px" height="100%">
        <v-menu :selected1="selected" :hidden="hidden" pindex="4-1" index="palace"></v-menu>
      </el-aside>
      <div class="main" ref="main">
        <!--标题-->
        <div class="palaceTitle">
          <div>九宫格</div>
          <div>>{{title}}</div>
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
          <!--模板内容-->
          <div class="contentBox">
            <div>
              模板内容
            </div>
            <el-input
              class="textarea"
              :rows="9"
              type="textarea"
              placeholder="请输入内容"
              v-model="content">
            </el-input>
          </div>
          <!--是否为vip-->
          <div class="vipBox" v-if="admin==1">
            <div>是否为vip</div>
            <el-radio v-model="radio" class="radio" label="1">是</el-radio>
            <el-radio v-model="radio" class="radio" label="0">否</el-radio>
          </div>

          <!--上传图片-->
          <div class="uploadBox">
            <div>上传图片</div>
            <div class="uploadBorder">
              <!--<el-upload-->
              <!--class="upload"-->
              <!--action="http://9.bjletu.com/Front/Category/upimg"-->
              <!--list-type="picture-card"-->
              <!--:on-success="callback"-->
              <!--:limit="9"-->
              <!--:on-exceed="over"-->
              <!--:multiple="true"-->
              <!--:on-change="changef"-->


              <!--:before-upload="beforeAvatarUpload"-->
              <!--:file-list="fileList2"-->
              <!--:on-preview="handlePictureCardPreview"-->
              <!--:on-remove="handleRemove"-->
              <!--ref="upload">-->
              <!--<i class="el-icon-plus"></i>-->

              <!--</el-upload>-->

              <div class="upload">
                <div class="upload_warp">
                  <div class="upload_warp_left" @click="fileClick">
                    <img src="../assets/upload.png">
                  </div>
                  <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
                    或者将文件拖到此处
                  </div>
                </div>

                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
                <div class="upload_warp_img" v-show="imgarr.length!=0">
                  <div class="upload_warp_img_div" v-for="(item,index) of imgarr">
                    <div class="upload_warp_img_div_top">

                      <img src="../assets/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                    </div>
                    <img :src="item"   draggable="true"
                         @dragstart="handleDragStart($event, item)"
                         @dragover.prevent="handleDragOver($event, item)"
                         @dragenter="handleDragEnter($event, item)"
                         @dragend="handleDragEnd($event, item)">
                  </div>
                </div>
              </div>
            </div>

          </div>
          <el-button type="primary" class="add" @click="add">{{btnSubmit}}</el-button>
          <el-button plain class="off" @click="back">取消</el-button>
        </div>
        <!--<input type="file" @change="onFileChange">-->
      </div>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data(){
      return{
        dragging: null,
        imgList: [],
        size: 0,
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
        title:'',//新增还是编辑
        btnSubmit:'',//立即创建还是保存
        admin:'',//管理员权限
        formDate:''
      }
    },
    methods:{

//      add_img(event){
//        let reader =new FileReader();
//        let img1=event.target.files[0];
//        let type=img1.type;//文件的类型，判断是否是图片
//        let size=img1.size;//文件的大小，判断图片的大小
//        if(this.imgData.accept.indexOf(type) == -1){
//          alert('请选择我们支持的图片格式！');
//          return false;
//        }
//        if(size>3145728){
//          alert('请选择3M以内的图片！');
//          return false;
//        }
//        var uri = ''
//        let form = new FormData();
//        form.append('file',img1,img1.name);
//        this.$http.post('/file/upload',form,{
//          headers:{'Content-Type':'multipart/form-data'}
//        }).then(response => {
//          console.log(response.data)
//          uri = response.data.url
//          reader.readAsDataURL(img1);
//          var that=this;
//          reader.onloadend=function(){
//            that.imgs.push(uri);
//          }
//        }).catch(error => {
//          alert('上传图片出错！');
//        })
//      },

//      onFileChange(e){
//        var files = e.target.files || e.dataTransfer.files;
//        var formData=new FormData();
//        formData.append('file',files[0])
//        console.log(formData)
//        $.ajax({
//          url : 'http://9.bjletu.com/Front/Category/upimg',
//          type : 'post',
//          data : formData,
//          contentType : false,
//          processData : false,
//          cache : false,
//          success : function (res) {
//            console.log(res)
//          }
//        });
//      },
      //删除图片
      handleRemove(file, fileList) {
//        console.log(file, fileList);
        if(file.response==undefined){
          var index3=this.imgarr.indexOf(file.url);
          if (index3 > -1) {
            this.imgarr.splice(index, 1);
          }
          var index4=this.address.indexOf(file.address);
          if (index4 > -1) {
            this.address.splice(index, 1);
          }
        }else {
          var  index = this.imgarr.indexOf(file.response.result.file);
          if (index > -1) {
            this.imgarr.splice(index, 1);
          }
          var  index1 = this.address.indexOf(file.response.result.address);
          if (index1 > -1) {
            this.address.splice(index, 1);
          }
        }
//        console.log(this.imgarr);

//        console.log(this.imgarr)
//        this.imgarr.forEach(function (item,index) {
//          if(item==file.response.result){
//
//          }
//        })
      },

      uploadFile(file){
        console.log(file.file)
        this.formDate=new FormData();
        this.formDate.append('file',file.file)


//        this.formDate=file.file
//        console.log(this.formDate.get('file'))
      },
      //开始上传
      subPicForm(){






        console.log(this.formDate)
        $.ajax({
          url : 'http://9.bjletu.com/Front/Category/upimg',
          type : 'post',
          data : this.formData,
          contentType : false,
          processData : false,
          cache : false,
          success : function (res) {
            console.log(res)
            console.log('成功')
          }
        });
        this.$refs.upload.submit();
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
//      点击已上传图片
      handlePictureCardPreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      changef:function (file, fileList) {
//        console.log(file,fileList)
        this.imgarr1=fileList;
      },
      //创建
      add:function () {
        let that=this;
        //edit等于1的时候为编辑
        if(this.$route.params.edit==1){
          if(this.name==''){
            this.$message.error('模板名称不能为空！');
          }else if(this.content==''){
            this.$message.error('模板内容不能为空！');
          }else if(this.typevalue==''){
            this.$message.error('请选择模板分类！');
          }else {
            if(this.admin==1){
              let param={};
              param.team_id=this.team_id;
              param.name=this.name;
              param.content=this.content;
              param.uid=this.userInfo.uid;
              param.cid=this.typevalue;
              param.is_share=1;
              param.tid=that.$route.params.id;
              param.file="";
              param.is_vip=this.radio;
              this.imgarr.forEach(function (item,index) {
                if(index==0){
                  param.file+=item;
                }else {
                  item=","+item;
                  param.file+=item;
                }

              });
              param.address="";
              this.address.forEach(function (item,index) {
                if(index==0){
                  param.address+=item;
                }else {
                  item=","+item;
                  param.address+=item;
                }

              });
//            console.log(param);
              that.$http('post','/Front/Template/edit_template',param).then(function (res) {
                console.log(res);
//                console.log(typeof res.data);
//                debugger
                that.$message.success('修改成功');
                that.$router.push({name:'palace'});
              })
            }else {
              let param={};
              param.team_id=this.team_id;
              param.name=this.name;
              param.content=this.content;
              param.uid=this.userInfo.uid;
              param.cid=this.typevalue;
              param.is_share=1;
              param.tid=that.$route.params.id;
              param.file="";
              this.imgarr.forEach(function (item,index) {
                if(index==0){
                  param.file+=item;
                }else {
                  item=","+item;
                  param.file+=item;
                }

              });
              param.address="";
              this.address.forEach(function (item,index) {
                if(index==0){
                  param.address+=item;
                }else {
                  item=","+item;
                  param.address+=item;
                }

              });
//            console.log(param);
              that.$http('post','/Front/Template/edit_template',param).then(function (res) {
                console.log(res);
//                console.log(typeof res.data);
//                debugger
                that.$message.success('修改成功');
                that.$router.push({name:'palace'});
              })
            }

//            console.log(param);
          }
        }else {
          //创建
          if(this.name==''){
            this.$message.error('模板名称不能为空！');
          }else if(this.content==''){
            this.$message.error('模板内容不能为空！');
          }else if(this.typevalue==''){
            this.$message.error('请选择模板分类！');
          }else {
            let param={};
            param.team_id=this.team_id;
            param.name=this.name;
            param.content=this.content;
            param.uid=this.userInfo.uid;
            param.cid=this.typevalue;
            param.is_share=1;
            param.file="";
            this.imgarr.forEach(function (item,index) {
              if(index==0){
                param.file+=item;
              }else {
                item=","+item;
                param.file+=item;
              }

            });
            param.address="";
            this.address.forEach(function (item,index) {
              if(index==0){
                param.address+=item;
              }else {
                item=","+item;
                param.address+=item;
              }

            });
            if(that.admin==1){
              if(that.radio==''){
                this.$message.error('请选择是否为vip！');
              }else {
                console.log(param);
                param.is_vip=that.radio;
                that.$http('post','/Front/Template/addTemplate',param).then(function (res) {
                  console.log(res);
//                console.log(typeof res.data);
//                debugger
                  that.$message.success('创建成功');
                  that.$router.push({name:'palace'});
                })
              }
//
            }else {
              console.log(param);
              that.$http('post','/Front/Template/addTemplate',param).then(function (res) {
//              console.log(res);
//                console.log(typeof res.data);
//                debugger
                that.$message.success('创建成功');
                that.$router.push({name:'palace'});
              })
            }
//
//            console.log(param);
          }
        }


//        cid
//        param.file1
//        file2

      },
      //文件上传成功
      callback:function (res) {
        console.log(res);
        this.imgarr.push(res.result.file);
        this.address.push(res.result.address);
        console.log(this.imgarr1);
//        this.getUrlBase64(res.result,'jpg',function (base64) {
//          console.log(base64)
//        })
      },
      //图片超出上传个数
      over:function () {
        this.$message.error('上传图片不能超过9张')
      },
      //转换base64
      getUrlBase64(url, ext, callback) {
        var canvas = document.createElement("canvas");   //创建canvas DOM元素
        var ctx = canvas.getContext("2d");
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = function () {
          canvas.height = 60; //指定画板的高度,自定义
          canvas.width = 85; //指定画板的宽度，自定义
          ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
          var dataURL = canvas.toDataURL("image/" + ext);
          callback.call(this, dataURL); //回掉函数获取Base64编码
          canvas = null;
        };
      },
      //分类列表
      init2:function () {
        let that=this;
        this.$http('post','/Front/Template/templet_cat',{team_id:this.team_id,style:1}).then(function (res) {
//         console.log(res);
          that.options=res.data.result;
        })
      },
      //获取修改时的九宫格模板信息
      init_edit(){
        let that=this;
//        console.log(this.$route.params.id)
        this.$http('post','/Front/Template/get_edit_template',{tid:this.$route.params.id}).then(function (res) {
          console.log(res);
//          that.data_edit=res.data.result;
          that.typevalue=res.data.result.cid;
          that.name=res.data.result.template_name;
          that.content=res.data.result.template_content;
          that.fileList2=res.data.result.imgurl;
          that.radio=res.data.result.is_vip;
          let arr=[];
          res.data.result.imgurl.forEach(function (item,index) {
            arr.push(item.url);
            that.address.push(item.address);
          })
          that.imgarr=arr;
          console.log(that.imgarr)
        })
      },
      //返回上页
      back:function () {
        this.$router.push({name:'palace'})
      },

      fileClick() {
        document.getElementById('upload_file').click()
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
      },
      fileList(fileList) {
        let files = fileList.files;
        if(files.length>(9-this.imgarr.length)){
          this.$message.error('上传图片不能超过9张')
        }else {
          for (let i = 0; i < files.length; i++) {
            //判断是否为文件夹
            if (files[i].type != '') {
              this.fileAdd(files[i]);
            } else {
              //文件夹处理
//                      this.folders(fileList.items[i]);
            }
          }
        }

      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        })
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        let that=this;
        if(this.imgarr.length>=9){

          this.$message.error('上传图片不能超过9张')
        }else {
//                  判断大小
          console.log(file.size)
          if(file.size>=2048000){

            this.$message.error('上传图片不能大于2M')
          }else {

            //判断是否为图片文件
            if (file.type.indexOf('image') == -1) {
//                  file.src = 'wenjian.png';
//                  this.imgList.push({
//                      file
//                  });
              this.$message.error('上传文件格式错误')
            } else {
              let reader = new FileReader();
              reader.vue = this;
              var formData=new FormData();
              formData.append('file',file)
              console.log(formData)
              $.ajax({
                url : 'http://x.zbxg123.com/Front/Category/upimg',
                type : 'post',
                data : formData,
                contentType : false,
                processData : false,
                cache : false,
                success : function (res) {
                  console.log(JSON.parse(res))
                  let a=JSON.parse(res);
                  that.imgarr.push(a.result.file);
                  that.address.push(a.result.address);
                }
              });
              reader.readAsDataURL(file);
              console.log(file);
              reader.onload = function () {
                file.src = this.result;
                this.vue.imgList.push({
                  file
                });
                console.log(file)
              }
            }
          }
        }
//

      },
      fileDel(index) {
//        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgarr.splice(index, 1);
        this.address.splice(index, 1);
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      dragenter(el) {
        el.stopPropagation();
        el.preventDefault();
      },
      dragover(el) {
        el.stopPropagation();
        el.preventDefault();
      },
      drop(el) {
        el.stopPropagation();
        el.preventDefault();
        this.fileList(el.dataTransfer);
      },

      handleDragStart(e,item){
        this.dragging = item;
      },
      handleDragEnd(e,item){
        this.dragging = null
      },
      //首先把div变成可以放置的元素，即重写dragenter/dragover
      handleDragOver(e) {
//        console.log(e)
        e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
      },
      handleDragEnter(e,item){
        e.dataTransfer.effectAllowed = "move"//为需要移动的元素设置dragstart事件
        if(item === this.dragging){
          return
        }
        const newItems = [...this.imgarr]
        console.log(newItems)
        const src = newItems.indexOf(this.dragging)
        const dst = newItems.indexOf(item)

        newItems.splice(dst, 0, ...newItems.splice(src, 1))

        this.imgarr = newItems

        const newItems1 = [...this.address]
        console.log(newItems1)


        newItems1.splice(dst, 0, ...newItems1.splice(src, 1))

        this.address = newItems1
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
    /*justify-content: space-between;*/
    align-items: center;
    margin: 20px 0;
    font-size: 18px;
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
    margin-right: 40px;
    padding: 40px 0px 0 60px;
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
  .contentBox{
    margin-top: 22px;

    /*height: 200px;*/
    display: flex;
  }
  .textarea{
    width: 725px;
    resize:none;
    margin-left: 25px;

  }

  .vipBox{
    display: flex;
    margin-top: 30px;
  }
  .radio{
    line-height: 21px;
    margin-left: 20px;
  }
  .uploadBox{
    display: flex;
    margin-top: 30px;
  }
  .uploadBorder{
    padding: 20px 60px 30px 20px;
    margin-left: 20px;
    border-radius: 5px;
    border: solid 1px #dedede;
  }
  .upload{

  }
  .add{
    margin: 55px 0 80px 80px;

  }
  .off{
    margin-left: 50px;
  }



  .upload_warp_img_div_del {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  }

  .upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }

  .upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .upload_warp_img_div {
    position: relative;
    height: 100px;
    width: 120px;
    border: 1px solid #ccc;
    margin: 0px 30px 10px 0px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
  }

  .upload_warp_img {
    border-top: 1px solid #D2D2D2;
    padding: 14px 0 0 14px;
    overflow: hidden
  }

  .upload_warp_text {
    text-align: left;
    margin-bottom: 10px;
    padding-top: 10px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
  }

  .upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
    text-align: center;
  }

  .upload_warp_left img {
    margin-top: 32px;
  }

  .upload_warp_left {
    float: left;
    width: 40%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }

  .upload_warp {
    margin: 14px;
    height: 130px;
  }

  .upload {
    border: 1px solid #ccc;
    background-color: #fff;
    width: 650px;
    box-shadow: 0px 1px 0px #ccc;
    border-radius: 4px;
  }

  @media (max-width: 1280px) {
    .main{
      width: 970px;
    }
  }
</style>
