<template>
    <div class="commoditylist_container">
        <div class="commoditylist">
            <!-- 商品列表 -->
            <div class="item" v-for="item in componentsData" :key="item.id" @click="goodsdetail(item.id)">
                <img v-lazy="item.img_url" alt=""/>
                <div class="text">
                    <div class="title">{{ item.title }}</div>
                    <div class="realize">
                        <span class="sell_price"
                            >&yen;{{ item.sell_price }}</span
                        >
                        <del class="market_price"
                            >&yen;{{ item.market_price }}</del
                        >
                    </div>
                    <div class="hot">
                        <span>热卖中</span>
                        <span>剩{{ item.stock_quantity }}件</span>
                    </div>
                </div>
            </div>
            <!-- 加载更多 -->
            <van-button type="danger" @click="nextPage">加载更多</van-button>
        </div>
    </div>
</template>

<script>
import { Lazyload, Button,Toast,NavBar } from "vant";
import { getComponentsData } from "@/api/index.js";
export default {
    data() {
        return {
            componentsData: [],
            currentPage: 1,
            all:true,
        };
    },
    components: {
        "van-button": Button,
        "van-nav-bar":NavBar
    },
    methods: {
        async getComponents(pageindex) {
            var { message } = await getComponentsData(pageindex);
            if(message.length == 0){
                Toast("加载完毕");
                this.all = false;
                return;
            }
            this.componentsData = this.componentsData.concat(message);
        },
        //加载更多
        nextPage(){
            if(!this.all){
                Toast("已获取所有商品");
                return;
            }
            this.getComponents(this.currentPage+=1);
        },
        //跳转详情页
        goodsdetail(id){
            this.$router.push(`/goodsdetail/${id}`);
        },
    },
    created() {
        this.getComponents();
        this.$parent.topData({title:'商品列表'});
    }
};
</script>

<style lang="scss" scoped>
.commoditylist_container {
    background-color: rgb(238, 238, 238);
    .van-nav-bar {
        width: 100%;
    }
    .commoditylist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 5px;
        .item {
            display: flex;
            width: 47%;
            padding: 4px;
            margin-bottom: 5px;
            border-radius: 6px;
            border: 1px solid #ccc;
            overflow: hidden;
            background-color: #fff;
            flex-direction: column;
            justify-content: space-between;
            img {
                height: 160px;
            }
            .text {
                color: #565352;
                padding: 3px 5px;
                .title {
                    font-size: 12px;
                    color: #333;
                    padding: 2px;
                }
                .realize {
                    .sell_price {
                        font-weight: 700;
                        color: red;
                    }
                    .market_price {
                        margin-left: 8px;
                        font-size: 12px;
                    }
                }
                .hot {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                }
            }
        }
    }
    .van-button {
        flex: 1;
    }
}
</style>
