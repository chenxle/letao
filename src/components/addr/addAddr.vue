<template>
    <div class="add_addr_container">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @change-area="onChangeArea"
        />
    </div>
</template>

<script>
import { AddressEdit } from 'vant';
import areaList from '@/util/area.js';
import { addAddr } from '@/api/index.js';

    export default {
        data(){
            return {
                areaList,
                searchResult:[],
                areaCode:''
            }
        },
        methods: {
            async onSave(data){
                //将默认选中修改成数字
                data.isDefault = (data.isDefault ? 1 : 0);
                //将区code 改为 省-市-区code
                data.areaCode = this.areaCode;
                data.country = data.county;
                var user = JSON.parse( localStorage.getItem('userInfo') );
                var {message,status} = await addAddr(user.id,data);
                this.$toast(message);
                if(status == 0){
                    this.$router.push('/addrManage');
                }

            },
            // 用户点击省市区确认按钮会触发
            onChangeArea(values){
                var areaArr = []
                values.map(v=>{
                    areaArr.push(v.code);
                })
                this.areaCode = areaArr.join('-');
            }
        },
        components:{
            'van-address-edit':AddressEdit,
        },
        created(){
            this.$parent.topData({title:'添加地址'});
        }
    }
</script>

<style lang="scss" scoped>

</style>