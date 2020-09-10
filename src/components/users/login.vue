<template>
    <div class="register-container">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>

        <!-- 跳转到注册 -->
        <div class="register">
            <router-link to="/register">注册</router-link>
        </div>
    </div>
</template>

<script>
import { Form,Field,Button } from 'vant';
import { userLogin } from '@/api/index.js';

    export default {
        data(){
            return {
                username: '',
                password: '',
            }
        },
        methods:{
            //提交登录
            async onSubmit(data){
                this.$toast.loading({
                    message:'登录中...',
                    forbidClick:true,
                    //持续展示toast
                    duration:0
                })
                var { status,message,userInfo,token } = await userLogin(data);
                //清除toast
                this.$toast.clear();
                this.$toast(message);
                if(status == 0){
                    localStorage.setItem(`userInfo`,JSON.stringify(userInfo));
                    localStorage.setItem('token',token);
                    this.$router.push('/home');
                }
            }
        },
        components:{
            'van-form': Form,
            'van-field':Field,
            'van-button':Button
        },
        created(){
            this.$parent.topData({title:'登录'});
        }
    }
</script>

<style lang="scss" scoped>
.register-container {
    margin-top: 15px;
    .register {
        display: flex;
        justify-content: center;
        a {
            color: rgb(112, 108, 108);
        }
    }
}
</style>