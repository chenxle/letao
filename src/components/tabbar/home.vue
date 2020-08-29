<template>
    <div class="home_container">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color='#ccc'>
            <van-swipe-item v-for="item in lunboData" :key="item.img">
                <img :src=item.img />
            </van-swipe-item>
        </van-swipe>

        <!-- 8宫格 -->
        <van-grid :column-num="4" :border="false">
      <van-grid-item to="/commodity">
        <img src="../../assets/images/menu10.png" alt>
        <div>数码电器</div>
      </van-grid-item>
      <van-grid-item to="/newslist">
        <img src="../../assets/images/menu19.png" alt>
        <div>乐淘头条</div>
      </van-grid-item>
      <van-grid-item >
        <img src="../../assets/images/menu18.png" alt>
        <div>美图欣赏</div>
      </van-grid-item>
      <van-grid-item >
        <img src="../../assets/images/menu15.png" alt>
        <div>乐淘服饰</div>
      </van-grid-item>
      <van-grid-item >
        <img src="../../assets/images/menu12.png" alt>
        <div>9.9元拼单</div>
      </van-grid-item>
      <van-grid-item >
        <img src="../../assets/images/menu15.png" alt>
        <div>话费充值</div>
      </van-grid-item>
      <van-grid-item >
        <img src="../../assets/images/menu16.png" alt>
        <div>物流查询</div>
      </van-grid-item>
      <van-grid-item >
        <img src="../../assets/images/menu17.png" alt>
        <div class="text">全部</div>
      </van-grid-item>
    </van-grid>

    <div class="goodslist">
        <van-divider :style="{borderColor:'rgb(198,201,204)'}">
            为你推荐
        </van-divider>
        <div class="recommend-commodity">
            <div class="item" v-for="item in recommendData" :key="item.id">
                <img v-lazy="item.img_url" alt="">
                <div class="text">
                    <div class="title">{{item.title}}</div>
                    <div class="realize">
                        <span class="price">￥{{item.sell_price}}</span>
                        <span class="buy">{{item.buy}}人已购买</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
import { Swipe,SwipeItem,Grid,GridItem,Divider } from 'vant';
import { getLunBoData,getRecommendData } from '@/api/index.js';

export default {
    name:"HomeComponent",
    data(){
        return {
            lunboData:[],
            recommendData:[],
        }
    },
    components: {
        "van-swipe":Swipe,
        "van-swipe-item":SwipeItem,
        "van-grid":Grid,
        "van-grid-item":GridItem,
        "van-divider":Divider
    },
    methods: {
        async getLunBo() {
            var res = await getLunBoData();
            this.lunboData = res.message;
        },
        async getRecommend(){
            var {message} = await getRecommendData();
            this.recommendData = message;
        }
    },
    created(){
        this.getLunBo();
        this.getRecommend();
    }
}
</script>

<style lang="scss" scoped>
.home_container {
    background-color: rgb(238,238,238);
    .my-swipe {
        height: 200px;
        .van-swipe-item {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .van-grid {
        background-color: #fff;
        .van-grid-item {
            padding: 8px 2px;
            img {
                width: 50%;
            }
            .text {
                color: #524949;
            }
        }
    }
    .goodslist {
        display: flex;
        flex-direction: column;
        padding: 0px 8px;

        .recommend-commodity {
            display: flex;
            flex-wrap:wrap;
            justify-content:space-between;
            .item {
                display: flex;
                width: 48%;
                margin: 4px 0px;
                border-radius: 6px;
                overflow: hidden;
                background-color: #fff;
                flex-direction: column;
                justify-content: space-between;
                img {
                    width: 100%;
                }
                .text {
                    .title {
                        font-size: 12px;
                        color: #333;
                    }
                    .realize{
                        padding: 10px 0px;
                        .price {
                            font-size: 14px;
                            color: #f50;
                        }
                        .buy {
                            margin-left: 10px;
                            font-size: 12px;
                            color: #999;
                        }
                    }
                }
            }
        }
    }
}
</style>
