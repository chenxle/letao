<template>
    <div class="goodsdetail_container">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#fff" v-for="item in goodsdetailLuanBoData" :key="item.id">
            <van-swipe-item></van-swipe-item>
        </van-swipe>

    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
    export default {
        props:['id'],
        data(){
            return {

            }
        },
        components:{
            "van-swipe-item": SwipeItem,
            "van-swipe": Swipe
        }
    }
</script>

<style lang="scss" scoped>

</style>