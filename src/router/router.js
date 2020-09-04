import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from '@/components/tabbar/home.vue';
import mycar from '@/components/tabbar/mycar.vue';
import user from '@/components/tabbar/user.vue';
import newslist from '@/components/news/newslist.vue';
import commoditylist from '@/components/commodity/commoditylist.vue';
import goodsdetail from '@/components/commodity/goodsdetail.vue';
import newsdetail from "@/components/news/newsdetail.vue";
import photo from '@/components/photo/photo.vue';
import site from '@/components/users/siteManage.vue';
import addSite from '@/components/users/addSite.vue';

const router = new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:home},
        {path:"/mycar",component:mycar},
        {path:"/user",component:user},
        {path:"/newslist",component:newslist,props:true},
        {path:'/commodity',component:commoditylist},
        {path:'/goodsdetail/:id',component:goodsdetail,props:true},
        {path:'/newsdetail/:id',component:newsdetail,props:true},
        {path:'/photo',component:photo,props:true},
        {path:'/site',component:site,props:true},
        {path:'/addSite',component:addSite}
      ]
})

export default router;