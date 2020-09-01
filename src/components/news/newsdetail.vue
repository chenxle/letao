<template>
    <div class="new_container">
        <!-- 标题 -->
        <h3 class="title">{{newData.title}}</h3>
        <!-- 发布时间 -->
        <div class="subtitle">
            <span>发布时间：{{newData.add_time | dateFormat("YYYY-MM-DD hh:mm:ss") }}</span>
            <span>阅读{{newData.click}}次</span>
        </div>
        <!-- 内容 -->
        <div class="content" v-html="newData.content"></div>

        <!-- 评论 -->
        <van-field
            v-model="myMessage"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请有爱的评论"
            show-word-limit
        />
        <van-button type="info" block @click="comment">评论</van-button>
        <!-- 评论信息 -->
        <div class="list">
            <div class="item" v-for="item in commentsData" :key="item.id">
                <div class="content">
                    <div>{{item.user_name}}：{{item.content}}</div>
                    <div>评论时间：{{item.add_time | dateFormat('YYYY-MM-DD hh:mm:ss') }}</div>
                </div>
            </div>
        </div>
        <!-- 查看更多 -->
        <van-button plain size="large" type="danger" @click="queryMore">查看更多</van-button>

    </div>
</template>

<script>
import { Field,Button } from 'vant';
import { getNewData,getCommentsData,postcomment } from '@/api/index.js';

export default {
    props:['id'],
    data(){
        return {
            newData:{},
            commentsData:[],
            myMessage:'',
            pageindex: 1,
            isExist:false,
        }
    },
    methods: {
        async getNew(id){
            var {status,message} = await getNewData(id);
            this.newData = message[0];
        },
        async getComments(pageindex,id=this.id){
            var {message} = await getCommentsData(id,pageindex);
            if(message.length == 0){
                this.isExist = true;
                this.$toast('加载完毕');
                return;
            }
            this.commentsData = this.commentsData.concat(message);
        },
        queryMore(){
            if(this.isExist){
                this.$toast('数据已经都加载完毕了');
                return;
            }
            this.pageindex++;
            this.getComments(this.pageindex);
        },
        async comment(){
            var content =  this.myMessage.trim();
            this.myMessage = '';
            if(content == ""){
                this.$toast('评论不能为空');
                return;
            }

            var {status,message,insertId} = await postcomment(this.id);
            if(status == 0){
                this.$toast(message);
                var item = {
                    id:insertId,
                    content,
                    add_time:Date.now(),
                    user_name:"访客"
                };
                this.commentsData.unshift(item);
            }else {
                this.$toast(message);
            }

        }
    },
    components: {
        "van-field":Field,
        "van-button":Button,
    },
    created(){
        this.getNew(this.id);
        this.getComments();
        this.$parent.topData({title:'新闻详情'});
    }
}
</script>

<style lang="scss" scoped>
.new_container {
    background-color: #fff;
    padding: 0px 10px;
    .title {
        font-size: 16px;
        color: #404040;
        text-align: center;
        padding: 10px 0px;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        color: #888;
        font-size: 14px;
        border-bottom: 1px solid #777;

        padding: 5px;
    }
    .list {
        .item {
            padding: 5px 1px;
            font-size: 12px;
            .content {
                background-color: #eee;
            }
        }
    }
}
</style>