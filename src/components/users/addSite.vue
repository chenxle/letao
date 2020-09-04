<template>
    <div>

    </div>
</template>

<script>
import { AddressEdit } from 'vant';
    export default {
        data(){
            return {

            }
        },
        methods: {

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