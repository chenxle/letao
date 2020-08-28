<template>
    <div class="app_container">
        <!-- 头部 -->
        <van-sticky>
            <div class="header">
                <img src="./assets/images/logo.png" alt="">
                <Search placeholder="请输入搜索关键字"></Search>
            </div>
        </van-sticky>

        <!-- 通过底部选择显示视图(默认为主页home组件) -->
        <router-view></router-view>

        <!-- 底部 -->
        <van-tabbar v-model="active">
            <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/mycar" icon="cart-o" badge="20">购物车</van-tabbar-item>
            <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
import {Search,Tabbar,TabbarItem,Sticky } from 'vant';
export default {
    data(){
        return {
            active:0  //默认选中主页home
        }
    },
    components: {
        Search,
        "van-tabbar":Tabbar,
        "van-tabbar-item":TabbarItem,
        'van-sticky':Sticky
    }
}
</script>

<style lang="scss" scoped>
.app_container {
    min-width:320px;
    max-width: 750px;
    margin: auto;
    padding-bottom: 50px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 750px;
        margin: auto;
        background-color: #fff;
        img {
            height: 44px;
        }
        .van-search {
            flex: 1;
        }
    }


}
</style>