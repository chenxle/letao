<template>
    <div class="mycar_container">
        <div v-if="!isShow">
            <div style="padding:10px 5px;"></div>
            <div class="empty">
                <h3>亲，你的购物车为空，去<router-link to="/home">页面</router-link>逛逛吧！</h3>
                <hr>
                <div>
                    <img src="@/assets/images/car.png" alt="">
                </div>
                <div>
                    <router-link to="/home">登录</router-link>后可以同步电脑于手机购物车中的商品
                </div>
            </div>
        </div>

        <div v-else>
            <van-divider :style="{borderColor:'#545e6c',fontSize:'16px',color:'#6f7370',margin:'2px'}">收货地址</van-divider>
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @edit="onEdit"
            />
            <van-divider :style="{borderColor:'#545e6c',fontSize:'16px',color:'#6f7370',margin:'2px'}">购买的商品</van-divider>
            <div class="myCarData">
                <div v-for="(item,index) in myCarData" :key="item.id" class="item">
                    <div class="switchButton">
                        <van-switch
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="switchChange(item.id,$store.getters.getGoodsSelected[item.id])"
                        />
                    </div>
                    <div class="thumbImage">
                        <img :src="item.thumb_path" alt="">
                    </div>
                    <div class="goodsInfo">
                        <div class="title">{{item.title}}</div>
                        <div class="car_good">
                            <span class="price">&yen;{{item.sell_price}}</span>
                            <van-stepper
                                v-model="$store.getters.getGoodsNumber[item.id]" integer min="1" max="200"
                                @change="changeNumber(item.id,$store.getters.getGoodsNumber[item.id])"
                            />
                            <van-button type="danger" @click="del(item.id,index)">删除</van-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 订单支付 -->
            <van-submit-bar :price="$store.getters.getPriceTotal" button-text="订单支付" @submit="orderPay">
                <template #default>
                    共{{$store.getters.getNumberTotal}}件商品
                </template>
            </van-submit-bar>
        </div>


    </div>
</template>

<script>
import { Divider,AddressList,Switch,Stepper,Button,SubmitBar } from 'vant';
import { getCarData } from '@/api/index.js';

    export default {
        data(){
            return {
                isShow:true,
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        isDefault: true,
                    }
                ],
                myCarData:[],
            }
        },
        components: {
            'van-divider':Divider,
            'van-address-list':AddressList,
            'van-switch':Switch,
            'van-stepper':Stepper,
            'van-button':Button,
            "van-submit-bar":SubmitBar,
        },
        methods: {
            onEdit(){
                this.$toast('怎得，还想编辑？');
            },
            async getMyCarData(){
                var ids = this.$store.getters.getCarIds;

                if(!ids){
                    this.isShow = false;
                    return;
                }

                var {message} = await getCarData(ids);
                this.myCarData = message;
            },
            //修改商品状态
            switchChange(good_id,selected){
                this.$store.commit('setGoodsSelected',{id:good_id,selected});
            },
            //订单支付
            orderPay(){
                this.$toast.loading({
                    message: '生成订单支付中...',
                    forbidClick: true,
                });
            },
            //修改购物车商品购买数量
            changeNumber(good_id,number){
                this.$store.commit('setGoodsNumber',{id:good_id,number});
            },
            //删除购物车商品
            del(id,index){
                this.$store.commit('deleteGoods',id);
                this.myCarData.splice(index,1);
                if(this.myCarData.length == 0){
                    this.isShow = false;
                }
            }
        },
        created(){
            this.$parent.topData({title:'我的购物车'});
            this.getMyCarData();
        },

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
    a {
        color: blue;
    }
    .myCarData {
        display: flex;
        flex-wrap: wrap;
        .item {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            background-color: #fff;
            .thumbImage {
                margin: 3px;
                img {
                    width: 50px;
                }
            }
            .goodsInfo {
                display: flex;
                flex-direction: column;
                .title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
                .car_good {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-around;
                    .price {
                        color: red;
                        font-weight: 700;
                    }
                }
            }
        }
    }
    .van-address-list__bottom {
        visibility: hidden;
    }
    .van-address-list {
        padding-bottom: 12px;
    }
    .van-submit-bar {
        bottom: 50px;
    }
}
</style>