<template>
    <div class="photo_container">
        <!-- 分类选择 -->
        <van-tree-select
            @click-nav='navHandle'
            :items="items"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
        >
            <template #content>
                <news v-if="isShowNews" @img-click="thumb" :photochildren="items[activeIndex].children"></news>
            </template>

        </van-tree-select>
    </div>
</template>

<script>
import news from '@/components/common/news.vue';
import { TreeSelect, ImagePreview } from 'vant';
import { getCategoryData,getCatelistData,getPhotoThumbData } from '@/api/index.js';

    export default {
        data(){
            return{
                items:[],
                activeId: 1,
                activeIndex: 0,
                categoryData:[],
                isShowNews:false,
            }
        },
        components:{
            'van-tree-select':TreeSelect,
            news,
        },
        methods:{
            async getCategory(){
                var {message} = await getCategoryData();
                message.map(v => {
                    v.text = v.title;
                    delete v.title;
                });
                var first_id = message[0].id;
                var first_childern = await this.getCatelist(first_id);
                message[0].children = first_childern;

                this.items = message;
                this.isShowNews = true;
            },
            async getCatelist(id){
                var {message} = await getCatelistData(id);
                message.map( v=>{
                    v.text = v.title;
                })
                return message;
            },
            async navHandle(index){
                if(this.items[index].children){
                    return;
                }
                this.isShowNews = false;
                var id = this.items[index].id;
                var children = await this.getCatelist(id);
                this.items[index].children = children;
                this.isShowNews = true;
            },
            async thumb(id){
                var {message} = await getPhotoThumbData(id);
                if(!message.length){
                    this.$toast('这里是真的没有图');
                    return;
                }
                var thumbArr = [];
                message.map(v => thumbArr.push(v.src));
                ImagePreview(thumbArr);
            }
        },
        created(){
            this.$parent.topData({title:'美图欣赏'});
            this.getCategory();
        }
    }
</script>

<style lang="scss" scoped>
.photo_container {
    .van-tree-select {
        height: 100vh !important;
    }
}
</style>