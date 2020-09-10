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
            <van-field
                v-model="confirmPwd"
                type="password"
                name="confirmPwd"
                label="确认密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>

        <!-- 跳转到登录 -->
        <div class="register">
            <router-link to="/login">登录</router-link>
        </div>
    </div>
</template>

<script>
import { Form,Field,Button } from 'vant';
import { userRegister } from '@/api/index.js';

    export default {
        data(){
            return {
                username: '',
                password: '',
                confirmPwd: '',
            }
        },
        methods:{
            async onSubmit(data){
                var { username,password,confirmPwd } = data;
                if(password != confirmPwd){
                    this.$toast('二次输入的密码不一致');
                    return;
                }
                var {status,message} = await userRegister();
                this.$toast(message);
                if(status == 0){
                    this.$router.push('/login');
                }
            }
        },
        components:{
            'van-form': Form,
            'van-field':Field,
            'van-button':Button
        },
        created(){
            this.$parent.topData({title:'注册'});
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