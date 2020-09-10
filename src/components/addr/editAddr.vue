<template>
    <div class="edit_addr_container">
        <van-address-edit
            :area-list="areaList"
            :address-info="addrInfo"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-area="onChangeArea"
        />
    </div>
</template>

<script>
import { AddressEdit } from 'vant';
import areaList from '@/util/area.js';
import { delAddr,editAddr } from '@/api/index.js';

    export default {
        data(){
            return {
                addrInfo:JSON.parse( this.$route.params.addrInfo ),
                areaList,
                searchResult: [],
                areaCode:'',
                areaCodes:''
            }
        },
        components:{
            'van-address-edit':AddressEdit
        },
        methods:{
            //保存修改的地址
            async onSave(addrInfo) {
               //将默认选中修改成数字
                addrInfo.isDefault = (addrInfo.isDefault ? 1 : 0);
                addrInfo.areaCode = this.areaCodes;
                addrInfo.country = addrInfo.county;

                var {message,status} = await editAddr(addrInfo.id,addrInfo);
                this.$toast(message);
                if(status == 0){
                    this.$router.push('/addrManage');
                }


            },
            //删除地址
            async onDelete(addrInfo) {
                var addrId = addrInfo.id;

                var {status,message} = await delAddr(addrId);
                this.$toast(message);

                if(status == 0){
                    this.$router.push('/addrManage');
                }

            },
            // 用户点击省市区确认按钮会触发
            onChangeArea(val) {
                var areaArr = []
                val.map(v=>{
                    areaArr.push(v.code);
                })
                this.areaCodes = areaArr.join('-');
                this.areaCode = this.areaCode.split('-')[2];
            }
        },
        created(){
            // 要回显地址的省市区，需要给对象{}加一个areaCode属性，值为区县的areaCode即可
            // areaCode: "130000-130200-130204"
            // 需要这样的数据 areaCode: "130204"
            this.areaCodes = this.addrInfo.areaCode;
            this.addrInfo.areaCode = this.addrInfo.areaCode.split('-')[2];
            this.$parent.topData({title:'编辑地址'});
        }
    }
</script>

<style lang="scss" scoped>

</style>