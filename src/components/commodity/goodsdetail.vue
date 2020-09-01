<template>
    <div class="goodsdetail_container">
        <!-- 轮播图 -->
        <van-swipe class="my_swipe" :autoplay="3000" indicator-color="#fff">
            <van-swipe-item v-for="item in goodsdetailLuanBoData" :key="item.src">
                <img :src="item.src" />
            </van-swipe-item>
        </van-swipe>

        <!-- 基本信息 -->
        <div class="goodsInfo">
            <div class="title">{{goodsinfoData.title}}</div>
            <van-divider />
            <div class="price">
                <del class="marketPrice">市场价：&yen;{{goodsinfoData.market_price}}</del>
                <span class="shopPrice">
                    本店价：
                    <span class="value">&yen;{{goodsinfoData.sell_price}}</span>
                </span>
            </div>
            <div class="goodsNumber">
                <span>购买数量：</span>
                <van-stepper v-model="value" min="1" max="10" integer />
            </div>
        </div>

        <!-- 其它信息 -->
        <div class="goodsItem">
            <van-divider>其它信息</van-divider>
            <div class="goodsOtherInfo">
                <span>商品货号：{{goodsinfoData.goods_no}}</span>
                <span>库存情况：{{goodsinfoData.stock_quantity}}件</span>
                <span>上架时间：{{goodsinfoData.add_time | dateFormat }}</span>
            </div>
        </div>

        <!-- 介绍 -->
        <div class="goodsItem">
            <van-divider>介绍</van-divider>
            <div class="content">
                <p class="center" v-html="goodsinfoData.content"></p>
            </div>
        </div>

        <!-- 购物车导航 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
            />
        </van-goods-action>

    </div>
</template>

<script>
import { Toast,Swipe, SwipeItem,Divider,Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { getGoodsDetailLunanBoData,getgoodsinfoData } from '@/api/index.js';

    export default {
        props:['id'],
        data(){
            return {
                goodsdetailLuanBoData:[],
                goodsinfoData:{},
                value: 1
            }
        },
        components:{
            "van-swipe-item": SwipeItem,
            "van-swipe": Swipe,
            "van-divider":Divider,
            "van-stepper":Stepper,
            "van-goods-action":GoodsAction,
            "van-goods-action-icon":GoodsActionIcon,
            "van-goods-action-button":GoodsActionButton
        },
        methods:{
            async getGoodsDetailLunanBo(id){
                var {message} = await getGoodsDetailLunanBoData(id);
                this.goodsdetailLuanBoData = message;
            },
            async getgoodsinfo(id){
                var {message} = await getgoodsinfoData(id);
                this.goodsinfoData = message;
            }
        },
        created(){
            this.getGoodsDetailLunanBo(this.id);
            this.getgoodsinfo(this.id);
            this.$parent.topData({title:'商品详情'});
            this.$parent.setCondition();
        }
    }
</script>

<style lang="scss" scoped>
.goodsdetail_container {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    padding-bottom: 50px;
    background-color: #eee;
    .my_swipe {
        width: 100%;
        height: 240px;
        text-align: center;
        background-color: #fff;
        img {
            width: 245px;
            height: 240px;
        }
    }
    .goodsInfo {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 8px;
        margin: 10px 0px;
        background-color: #fff;
        color: #333;
        .price {
            margin-bottom: 20px;
            .shopPrice {
                margin-left: 20px;
                .value {
                    color: red;
                    font-weight: 700;
                }
            }
        }
        .goodsNumber {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .van-stepper {
                display: inline-block;
            }
        }
    }
    .goodsItem {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        background-color: #fff;
        .goodsOtherInfo {
            display: flex;
            flex-direction: column;
            color: #333;
        }
        .content {
            color: #333;
            width: 100%;
            .center {
                width: 100%;
            }
        }
    }
    .van-goods-action {
        flex: 1;
    }
}
</style>
<style lang="scss">
    .center {
        span {
            display: block;
        }
        table {
            width: 100%;
        }
        img {
            width: 100%;
        }
    }
</style>