<template>
    <div class="user_container">
        <!-- 用户信息 -->
        <div class="parent_container">
            <!-- 头像和用户名 -->
            <div class="user_message">
                <img src="@/assets/images/logo.png" >
                <div class="name">用户名：xxll</div>
            </div>
            <!-- 修改密码 -->
            <div class="item">
                <div>
                    <span>修改密码</span>
                    <van-icon name="arrow" size="16px" color="#777" />
                </div>
            </div>
            <!-- 我的订单 -->
            <div class="item">
                <div>
                    <span>我的订单</span>
                    <van-icon name="arrow" size="16px" color="#777" />
                </div>
            </div>
            <!-- 地址管理 -->
            <router-link class="item" to="/addrManage" tag="div">
                <div>
                    <span>地址管理</span>
                    <van-icon name="arrow" size="16px" color="#777" />
                </div>
            </router-link>

        </div>
        <br>

        <!-- 提交反馈 -->
        <div class="item">
            <div>
                <span>提交反馈</span>
                <van-icon name="arrow" size="16px" color="#777" />
            </div>
        </div>
        <!-- 关于乐淘 -->
        <div class="item">
            <div>
                <span>关于乐淘</span>
                <span class="versions">v1.0.0</span>
            </div>
        </div>

        <!-- 底部 -->
        <van-button size="large" class="out_login" @click="toLog">退出登录</van-button>

    </div>
</template>

<script>
import { Icon,Button,Dialog } from 'vant';
import { isLogin } from '@/api/index.js';

    export default {
        data(){
            return {

            }
        },
        components: {
            'van-icon':Icon,
            'van-button':Button
        },
        methods: {
            //退出登录
            toLog(){
                Dialog.confirm({
                    message: '确认退出登录吗?',
                })
                .then(() => {
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                })
                .catch(_=>{})

            }
        },
        created(){
            this.$parent.topData({title:'个人中心'});
            this.$parent.setCondition();
            isLogin();
        }
    }
</script>

<style lang="scss" scoped>
.user_container {
    .parent_container {
        background-color: #fff;
        .user_message{
            display: flex;
            align-items: center;
            padding: 10px 16px;
            img {
                width: 20%;
                margin-right: 100px;
            }
            .name {
                color: #5d5555;
                font-size: 20px;
            }
        }
    }
    .out_login {
        position: fixed;
        bottom: 0px;
    }
    .item {
        padding: 10px 16px;
        font-size: 14px;
        background-color: #fff;
        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .versions {
                color: #969799;
            }
        }
    }
}
</style>