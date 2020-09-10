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
import site from '@/components/addr/addrManage.vue';
import addSite from '@/components/addr/addAddr.vue';
import editAddr from '@/components/addr/editAddr.vue';
import login from '@/components/users/login.vue';
import register from '@/components/users/register.vue';

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
        {path:'/addrManage',component:site,props:true},
        {path:'/addAddr',component:addSite},
        {path:'/register',component:register},
        {path:'/login',component:login},
        {path:'/editAddr/:addrInfo',component:editAddr}
      ]
})

export default router;