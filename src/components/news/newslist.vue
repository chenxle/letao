<template>
    <div class="newslist_container">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- 新闻列表 -->
            <div class="newslist">
                <router-link class="item" v-for="item in newslistData" :key="item.id" :to="'/newsdetail/'+item.id">
                    <div class="img_container">
                        <img v-lazy="item.img_url" alt="">
                    </div>
                    <div class="text">
                        <h3 class="title overflow_ellipsis">{{item.title}}</h3>
                        <div class="info">
                            <span>发布时间：{{item.add_time | dateFormat('YYYY-MM-DD HH:mm')}}</span>
                            <span>点击：{{item.click}}次</span>
                        </div>
                    </div>
                </router-link>
            </div>
            <!-- 加载更多 -->
            <van-button type="danger" size="large" :loading="hasLoading" loading-text="加载中..." @click="nextPage" v-show="isReveal">加载更多</van-button>
        </van-pull-refresh>

    </div>
</template>

<script>
import { Toast,PullRefresh,NavBar,Button } from 'vant';
import { getNewslistData } from '@/api/index.js';

    export default {
        name:'newslist-component',
        data() {
            return {
                count: 0,
                isLoading: false,
                newslistData:[],
                page:1,
                pagesize:10,
                isEmpty:false,
                hasLoading:false,
                isReveal:true
            };
        },
        components:{
            "van-pull-refresh":PullRefresh,
            "van-nav-bar":NavBar,
            'van-button':Button
        },
        methods: {
            onRefresh() {
                this.isReveal = false;
                this.newslistData = [];
                this.page = 1;
                this.isEmpty = false;
                this.getNewslist();
                this.isReveal = true;
                setTimeout(_=>{
                    this.isLoading = false;
                    Toast('刷新成功');
                },700)
            },
            async getNewslist(){
                this.isReveal = false;
                var res = await getNewslistData(this.page,this.pagesize);
                if(res.message.length == 0){
                    Toast('加载完毕');
                    this.isEmpty = true;
                    this.isReveal = true;
                    return;
                }
                this.newslistData = this.newslistData.concat(res.message);
                this.isReveal = true;
            },
            nextPage(){
                if(this.isEmpty){
                    Toast('已经没有更多数据了');
                    return;
                }
                this.hasLoading = true;
                this.page++;
                this.getNewslist();
                this.hasLoading = false;
            }
        },
        created(){
            this.getNewslist();
            this.$parent.topData({title:'新闻列表'});
        },
        //用于在进入时，缓存传态下，不缓存的数据
        activated:function(){
            this.$parent.topData({title:'新闻列表'});
            console.log('activated');
        },
        //用于在退出时，缓存传态下，不缓存的数据
        deactivated:function(){
            console.log('deactivated');
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.newslist_container {
    background-color: rgb(238, 238, 238);
    margin-bottom: 50px;
    .newslist {
        .item {
            display: flex;
            border-bottom: 1px solid #ccc;
            margin-top: 2px;
            .img_container {
                width: 100px;
                height: 100px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .text {
                flex: 1;
                padding: 2px;
                .title {
                    color:#000;
                    font-weight: 700;
                    font-size: 14px;
                    margin: 14px 0px;

                    // // 限制两行文本，超出显示省略号
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                    // display: -webkit-box;
                    // -webkit-box-orient: vertical;
                    // -webkit-line-clamp: 2;
                }
                .info {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #888;
                }
            }
        }
    }
}
</style>