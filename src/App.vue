<template>
    <div class="app_container">
        <!-- home页面的头部 -->
        <van-sticky v-show="isShow">
            <div class="header">
                <img src="./assets/images/logo.png" alt="">
                <Search placeholder="请输入搜索关键字"></Search>
            </div>
        </van-sticky>

        <!-- 其它页面的头部 -->
        <van-sticky>
            <van-nav-bar
                :title="title"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
                v-show="!isShow"
            />
        </van-sticky>

        <!-- keep-slive 开启缓存 -->
        <!-- include：缓存的组件，不指定则缓存全部组件 用法：组件名 使用,分割 -->
        <keep-alive include="newslist-component,home-component">
            <!-- 通过底部选择显示视图(默认为主页home组件) -->
            <router-view></router-view>
        </keep-alive>

        <!-- 底部 -->
        <van-tabbar v-model="active" v-show="condition">
            <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/mycar" icon="cart-o" :badge="$store.getters.getTotal">购物车</van-tabbar-item>
            <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
// 导入获取vuex中的state的辅助函数
import { mapState } from "vuex";
import {Search,Tabbar,TabbarItem,Sticky,NavBar } from 'vant';
export default {
    data(){
        return {
            active:0,  //默认选中主页home,
            isShow:false,
            title:'',
            condition:true,
        }
    },
    components: {
        Search,
        "van-tabbar":Tabbar,
        "van-tabbar-item":TabbarItem,
        'van-sticky':Sticky,
        "van-nav-bar":NavBar,
    },
    methods:{
        getPath(){
            switch (this.$route.path) {
                case '/home':
                    this.active = 0;
                    break;
                case '/mycar':
                    this.active = 1;
                    break;
                case '/user':
                    this.active = 2;
                    break;
                default:
                    this.active = -1;
                    break;
            }
            if(this.$route.path != '/home'){
                this.isShow = false;
            }else {
                this.isShow = true;
            }
            this.condition = true;
        },
        onClickLeft(){
            this.$router.go(-1);
        },
        topData(options){
            this.title = options.title;
        },
        setCondition(){
            this.condition = false;
        },
    },
    watch: {
        $route:'getPath',
        //监听isPending，true开启loading，false就关闭
        'isPending':function(isPending){
            isPending
            ? this.$toast.loading({
                message:'loading...',
                forbidClick:true,
                duration:0
            })
            : this.$toast.clear();
        }
    },
    computed:{
        /*
        isPending:function(){
            return this.$store.state.isPending
        }
        等价于
        */
        ...mapState(['isPending'])
    },
    created(){
        this.getPath();
    }
}
</script>

<style lang="scss" scoped>
.app_container {
    min-width:320px;
    max-width: 750px;
    margin: auto;
    padding-bottom: 50px;
    height: 90vh;
    background-color: #eee;
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