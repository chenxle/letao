<template>
    <div class="news_container">
        <div class="newslist">
            <router-link tag="div" :to="'/newsdetail/'+item.id" class="item" v-for="item in photochildren" :key="item.id">
                <div class="img_container">
                    <img @click.stop="imgClick(item.id)" v-lazy="item.img_url" alt="">
                </div>
                <div class="text">
                    <div class="title">{{ item.title }}</div>
                    <div class="zhaiyao">
                        {{item.zhaiyao}}
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "common-news",
        props: ['photochildren'],
        methods:{
            imgClick(id){
                //   this.$toast(id)
                // 把数据传递父组件
                this.$emit('img-click',id)
            }
        }
    }
</script>

<style lang="scss" scoped>
.newslist{
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

                // 限制两行文本，超出显示省略号
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .zhaiyao {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
        }
    }
}
</style>