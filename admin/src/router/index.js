import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/login'
import about from '@/pages/about'
import index from '@/pages/index'
import navigation from '@/components/nav'
import palace from '@/pages/material_template_palace'
import addPalace from '@/pages/material_template_addPalace'
import teamList from '@/pages/teamList'
import poster from '@/pages/poster'
import addPoster from '@/pages/addPoster'
import palace1 from '@/pages/palace'
import poster1 from '@/pages/poster1'
import teamMemberList from '@/pages/teamMemberList'
import VIPusers from '@/pages/VIPusers'
import ordinaryUsers from '@/pages/ordinaryUsers'

import dvideo from '@/pages/dvideo'
import dvideo1 from '@/pages/dvideo1'
import library1 from '@/pages/library1'
import library from '@/pages/library'
import addlibrary from '@/pages/addlibrary'
import materialList from '@/pages/materialList'
import order from '@/pages/order'
import withdrawCash from '@/pages/withdrawCash'
import adddvideo from '@/pages/adddvideo'
import distributorList from '@/pages/distributorList'
import distributionSetting from '@/pages/distributionSetting'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/about',
      name:'about',
      component:about
    },
    {
      path:'/index',
      name:'index',
      component:index
    },
    {
      path:'/navigation',
      name:'navigation',
      component:navigation
    },
    {
      path:'/palace',
      name:'palace',
      component:palace
    },
    {
      path:'/addPalace',
      name:'addPalace',
      component:addPalace
    },
    {
      path:'/teamList',
      name:'teamList',
      component:teamList
    },
    {
      path:'/poster',
      name:'poster',
      component:poster
    },
    {
      path:'/addPoster',
      name:'addPoster',
      component:addPoster
    },
    {
      path:'/palace1',
      name:'palace1',
      component:palace1
    },
    {
      path:'/poster1',
      name:'poster1',
      component:poster1
    },
    {
      path:'/teamMemberList',
      name:'teamMemberList',
      component:teamMemberList
    },
    {
      path:'/VIPusers',
      name:'VIPusers',
      component:VIPusers
    },
    {
      path:'/ordinaryUsers',
      name:'ordinaryUsers',
      component:ordinaryUsers
    },
    {
      path:'/dvideo',
      name:'dvideo',
      component:dvideo
    },
    {
      path:'/adddvideo',
      name:'adddvideo',
      component:adddvideo
    },
    {
      path:'/dvideo1',
      name:'dvideo1',
      component:dvideo1
    },
    {
      path:'/library1',
      name:'library1',
      component:library1
    },
    {
      path:'/library',
      name:'library',
      component:library
    },
    ,
    {
      path:'/addlibrary',
      name:'addlibrary',
      component:addlibrary
    },
    {
      path:'/materialList',
      name:'materialList',
      component:materialList
    },
    {
      path:'/order',
      name:'order',
      component:order
    },
    {
      path:'/withdrawCash',
      name:'withdrawCash',
      component:withdrawCash
    },
    {
      path:'/distributorList',
      name:'distributorList',
      component:distributorList
    },
    {
      path:'/distributionSetting',
      name:'distributionSetting',
      component:distributionSetting
    }
  ]
})
