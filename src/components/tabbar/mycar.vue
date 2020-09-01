<template>
    <div class="mycar_container">
        <div style="padding:10px 5px;"></div>
        <div class="empty">
            <h3>亲，你的购物车为空，去<a href="#">页面</a>逛逛吧！</h3>
            <hr>
            <div>
                <img src="@/assets/images/car.png" alt="">
            </div>
            <div>
                <a href="#">登录</a>后可以同步电脑于手机购物车中的商品
            </div>
        </div>

        <!-- <van-divider :style="{borderColor:'#545e6c',fontSize:'16px',color:'#6f7370',margin:'2px'}">收货地址</van-divider>
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @edit="onEdit"
        />
        <van-divider :style="{borderColor:'#545e6c',fontSize:'16px',color:'#6f7370',margin:'2px'}">收货地址</van-divider>
         -->

    </div>
</template>

<script>
import { Divider,AddressList } from 'vant';

    export default {
        data(){
            return {
            chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        isDefault: true,
                    }
                ]
            }
        },
        components: {
            'van-divider':Divider,
            'van-address-list':AddressList
        },
        methods: {
            onEdit(){
                this.$toast('怎得，还想编辑？');
            }
        },
        created(){
            this.$parent.topData({title:'我的购物车'});
        }
    }
</script>

<style lang="scss" scoped>
.mycar_container{
    .empty{
        text-align: center;
        div {
            img {
                width: 40%;
            }
        }
    }
}
</style>