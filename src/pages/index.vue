<template>
  <!--首页-->
  <el-container>
    <el-header style="height: 70px;">
      <v-header :msg="userInfo"></v-header>
    </el-header>
    <el-container>
      <el-aside width="81px" height="100%">
        <v-menu :hidden="hidden" :selected1="0"></v-menu>
      </el-aside>
      <div  class="main" ref="main">
        <el-row class="indexTitle">
          首页
        </el-row>

        <!--用户-->
        <el-row class="items" v-if="admin==0">
          <el-row class="item" >
            <div class="inner">
              <div class="imgBox">
                <img src="../assets/3.png" alt="">
              </div>
              <div class="content" >
                <div>总转发量</div>
                <div>{{totalData.total}}</div>
              </div>
            </div>
          </el-row>

          <el-row class="item" >
            <div class="inner">
              <div class="imgBox">
                <img src="../assets/3.png" alt="">
              </div>
              <div class="content" >
                <div>今日转发</div>
                <div>{{totalData.dayCount}}</div>
              </div>
            </div>
          </el-row>

          <el-row class="item" >
            <div class="inner">
              <div class="imgBox">
                <img src="../assets/2.png" alt="">
              </div>
              <div class="content" >
                <div>创建分类 </div>
                <div>{{totalData.cateCount}}</div>
              </div>
            </div>
          </el-row>

          <el-row class="item" >
            <div class="inner">
              <div class="imgBox">
                <img src="../assets/2.png" alt="">
              </div>
              <div class="content" >
                <div>创建模板</div>
                <div>{{totalData.tempCount}}</div>
              </div>
            </div>
          </el-row>
          <!--<el-row></el-row>-->
        </el-row>

        <!--管理员-->
        <el-row class="items" v-if="admin==1">
          <el-row class="item" >
            <div class="inner">
              <div class="imgBox">
                <img src="../assets/2.png" alt="">
              </div>
              <div class="content" >
                <div>用户总数</div>
                <div>{{totalData.userCount}}</div>
              </div>
            </div>
          </el-row>
          <el-row class="item" >
            <div class="inner">
              <div class="imgBox">
                <img src="../assets/2.png" alt="">
              </div>
              <div class="content" >
                <div>今日新增</div>
                <div>{{totalData.dayCount}}</div>
              </div>
            </div>
          </el-row>
          <el-row class="item" >
            <div class="inner">
              <div class="imgBox">
                <img src="../assets/3.png" alt="">
              </div>
              <div class="content" >
                <div>团队VIP</div>
                <div>{{totalData.teamCount}}</div>
              </div>
            </div>
          </el-row>
          <el-row class="item" >
            <div class="inner">
              <div class="imgBox">
                <img src="../assets/3.png" alt="">
              </div>
              <div class="content" >
                <div>个人VIP</div>
                <div>{{totalData.personalCount}}</div>
              </div>
            </div>
          </el-row>

        </el-row>

        <div class="echars">
          <div id="myChart" >

          </div>
          <div class="china" id="chinaMap" v-if="admin==3" ></div>
        </div>

      </div>
    </el-container>

  </el-container>
</template>
<script>

  export default {
    name:'index',
    data(){
      return{
        items:[{},{},{},{},{},{},{},{}],
        hidden:'0',
        admin1:-1,
        userInfo:'',//登录信息
        totalData:{},
        myChart:'',
        statistics:'',//折线图数据
        admin:0,//管理员权限
      }
    },
    methods:{
      //线状图
      drawLine(){
        let  that=this;
        // 基于准备好的dom，初始化echarts实例
        this. myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        this.myChart.setOption({
          title: { text: '用户使用统计', subtext: '一周内'},
          tooltip: {},
          xAxis: {
            type: 'category',
            axisLabel:{interval:0},
            data: [that.statistics[0].start_time,
              that.statistics[1].start_time,
              that.statistics[2].start_time,
              that.statistics[3].start_time,
              that.statistics[4].start_time,
              that.statistics[5].start_time,
              that.statistics[6].start_time
            ]
          },
          yAxis: {},
          series: [{
            data: [that.statistics[0].count,
              that.statistics[1].count,
              that.statistics[2].count,
              that.statistics[3].count,
              that.statistics[4].count,
              that.statistics[5].count,
              that.statistics[6].count
            ],
            type: 'line',
            itemStyle:{
              normal:{
                color:'#38adff',
                lineStyle:{
                  color:'#38adff'
                }
              }
            }
          }],
          backgroundColor:'#ffffff'
        });
      },
      init(){
        let that=this;
        this.$http('post','/Front/Index/count',{team_id:this.team_id}).then(function (res) {
          console.log(res);
          that.totalData=res.data.result;
        })
      },
      init1(){
        let that=this;
        this.$http('post','/Front/Index/statistics').then(function (res) {
          console.log(res);
          that.totalData=res.data.result;
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
//      console.log(routerParams);

      that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';

      //获取折线图数据
      this.$http('post','/Front/Data/forwardDetail',{team_id:this.team_id}).then(function (res) {
        console.log(res);
        that.statistics=res.data.result;
//        console.log(that.statistics);
        that.drawLine();
      });
      this.admin=this.common.getCookie('admin');
      if(that.admin==1){
        that.init1();
      }else {
        this.init();
      }

      if(this.admin==3){
        var chart = echarts.init(document.getElementById('chinaMap'));
        chart.setOption({
          title:{text: '用户地区分析',
            subtext: '用户分布',
            x:'center'
          },
          visualMap: {//颜色的设置  dataRange
            x: 'left',
            y: 'center',
            splitList: [
              {start: 1500},
              {start: 900, end: 1500},
              {start: 310, end: 1000},
              {start: 200, end: 300},
              {start: 10, end: 200, label: '10 到 200（自定义label）'},
              {start: 5, end: 5, label: '5（自定义特殊颜色）', color: ''},
              {end: 10}
            ],
//            min: 0,
//            max: 2500,
//            calculable : true,//颜色呈条状
            text:['低','高'],// 文本，默认为数值文本
            color: ['#E0022B', '#E09107', '#A3E00B']
          },
          series: [{
            type: 'map',
            map: 'china',
            itemStyle:{//地图区域的多边形 图形样式
              normal:{//是图形在默认状态下的样式
                label:{
                  show:true,//是否显示标签
                  textStyle: {
                    color: "rgb(0, 0, 0)"
                  }
                }
              },
              emphasis:{//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label:{
                  show:true,
                  color:'auto'
                }
              }
            },
            backgroundColor:'#ffffff',
            data:[
              {name: '北京',value: Math.round(Math.random()*2000)},
              {name: '天津',value: Math.round(Math.random()*2000)},
              {name: '上海',value: Math.round(Math.random()*2000)},
              {name: '重庆',value: Math.round(Math.random()*2000)},
              {name: '河北',value: 0},
              {name: '河南',value: Math.round(Math.random()*2000)},
              {name: '云南',value: 5},
              {name: '辽宁',value: 305},
              {name: '黑龙江',value: Math.round(Math.random()*2000)},
              {name: '湖南',value: 200},
              {name: '安徽',value: Math.round(Math.random()*2000)},
              {name: '山东',value: Math.round(Math.random()*2000)},
              {name: '新疆',value: Math.round(Math.random()*2000)},
              {name: '江苏',value: Math.round(Math.random()*2000)},
              {name: '浙江',value: Math.round(Math.random()*2000)},
              {name: '江西',value: Math.round(Math.random()*2000)},
              {name: '湖北',value: Math.round(Math.random()*2000)},
              {name: '广西',value: Math.round(Math.random()*2000)},
              {name: '甘肃',value: Math.round(Math.random()*2000)},
              {name: '山西',value: Math.round(Math.random()*2000)},
              {name: '内蒙古',value: Math.round(Math.random()*2000)},
              {name: '陕西',value: Math.round(Math.random()*2000)},
              {name: '吉林',value: Math.round(Math.random()*2000)},
              {name: '福建',value: Math.round(Math.random()*2000)},
              {name: '贵州',value: Math.round(Math.random()*2000)},
              {name: '广东',value: Math.round(Math.random()*2000)},
              {name: '青海',value: Math.round(Math.random()*2000)},
              {name: '西藏',value: Math.round(Math.random()*2000)},
              {name: '四川',value: Math.round(Math.random()*2000)},
              {name: '宁夏',value: Math.round(Math.random()*2000)},
              {name: '海南',value: Math.round(Math.random()*2000)},
              {name: '台湾',value: Math.round(Math.random()*2000)},
              {name: '香港',value: Math.round(Math.random()*2000)},
              {name: '澳门',value: Math.round(Math.random()*2000)},
              {name: '云南',value: Math.round(Math.random()*2000)}
            ]
          }]
        });
      }else {

      }
      window.onresize = function temp() {
        that.$refs.main.style.height = document.documentElement.clientHeight-70+'px';
//        this.chart = echarts.getInstanceByDom(document.getElementById('myChart'))
//        this.chart.resize()
//        console.log(chart);
        that.myChart.resize()
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
  .indexTitle{
    font-size: 18px;
    margin: 10px 0px 10px 10px;
  }
  .items{
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    font-size: 16px;
    color: #666666;
    width: 100%;
    margin-right: 5%;
  }
  .item{
    width: 25%;
    height: 140px;
  }
  .imgBox img{
    width: 80px;
    height: 80px;
    /*background: red;*/
    margin-left: 60px;
  }
  .imgBox{
    margin-left: 10px;
  }
  .item>.inner{
    display: flex;
    align-items: center;
    width:100%;
    height: 100%;
    /*justify-content: center;*/
  }
  .content{
    margin-left: 30px;
    width: 100%;
  }
  .content1{
    border-right: 1px solid #dedede;
  }
  #myChart{
    margin-top: 30px;
    display: inline-block;
    width: 98%;
    height: 500px;
  }
  .china{
    height: 500px;
    width: 500px;
    /*border: #ccc 1px solid;*/
    display: inline-block;
    margin-left: 30px;
    margin-top: 30px;
  }
  .echars{

    display: flex;
    justify-content: space-between;
  }

  /*兼容*/
  @media(max-width: 1024px){
    /**/
    .items{
      width: 98%;
    }

    #myChart{
      width: 98%;
    }
  } /*<=1024的设备*/
  @media  (min-width: 1024px){
    .items{
      width: 98%;
    }
    #myChart{
      width: 98%;
    }
  }
  @media (min-width: 1100px) {
    .items{
      width: 98%;
    }
    #myChart{
      width: 98%;
    }
  } /*>=1100的设备*/
  @media (min-width: 1280px) {
    .items{
      width: 98%;
    }
    #myChart{
      width: 98%;
    }
  } /*>=1280的设备*/
  @media (min-width: 1366px) {
    .items{
      width: 98%;
    }
    #myChart{
      width: 98%;
    }
  }/*>=1366的设备*/
  @media (min-width: 1440px) {
    .items{
      width: 98%;
    }
    #myChart{
      width: 98%;
    }

  }/*>=1440的设备*/
  @media (min-width: 1680px) {
    .items{
      width: 98%;
    }
    #myChart{
      width: 98%;
    }

  }/*>=1680的设备*/
  @media (min-width: 1920px) {
    .items{
      width: 98%;
    }
    #myChart{
      width: 98%;
    }

  }/*>=1920的设备*/
  .a{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
