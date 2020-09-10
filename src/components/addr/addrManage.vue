<template>
    <div class="site_manage_container">
        <van-address-list
            v-model="chosenAddressId"
            :list="addrList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script>
import { AddressList } from 'vant';
import { getUserAddrData } from '@/api/index.js';

    export default {
        data() {
            return {
                chosenAddressId: '1',
                addrList: []
            };
        },
        methods:{
            onAdd(){
                this.$router.push('/addAddr');
            },
            onEdit(data){
                var addrInfo = JSON.stringify(data);
                this.$router.push(`/editAddr/${addrInfo}`);
            },
            //获取所有的用户地址
            async getAddrManage(){
                //发送请求，并获取数据
                var user = JSON.parse( localStorage.getItem('userInfo') );
                var message = await getUserAddrData(user.id);

                var _this = this;
                //将地址改为地址详情，修改默认
                message.map(v=>{
                    v.address = v.addressDetail;
                    if(v.isDefault == 1){
                        v.isDefault = true;
                        _this.chosenAddressId = v.id;
                    }else {
                        delete v.isDefault;
                    }
                })

                this.addrList = message;
            }
        },
        components:{
            'van-address-list':AddressList,
        },
        created(){
            this.$parent.topData({title:'地址管理'});
            this.getAddrManage();
        }
    }
</script>

<style lang="scss" scoped>
.site_manage_container {
    background-color: #eee;
}
</style>