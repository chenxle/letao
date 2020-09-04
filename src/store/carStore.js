import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

var carData = JSON.parse( localStorage.getItem('carData') || '[]' );
const store = new Vuex.Store({
    //存放数据
    state: {
        carData:carData
    },
    //存放修改的方法
    mutations: {
        //添加到购物车(goods：添加的商品)
        addCar(state,goods){
            var index;
            var hasSomeGoods = state.carData.some(function(item,i){
                index = i;
                return item.id === goods.id;
            });
            if(hasSomeGoods){
                state.carData[index].number += goods.number;
            }else {
                state.carData.push(goods);
            }
            localStorage.setItem('carData',JSON.stringify(state.carData));
        },
        //修改商品选中状态
        setGoodsSelected(state,obj){
            var index = state.carData.findIndex(v =>{
                return v.id == obj.id;
            })

            state.carData[index].selected = obj.selected;
            localStorage.setItem('carData',JSON.stringify(state.carData));
        },
        //删除购物车商品
        deleteGoods(state,id){
            var index = state.carData.findIndex(v => {
                return v.id == id;
            })
            if(index != -1){
                state.carData.splice(index,1);
            }
            localStorage.setItem('carData',JSON.stringify(state.carData))
        },
        //修改购物车商品数量
        setGoodsNumber(state,obj){
            var index = state.carData.findIndex(v =>{
                return v.id == obj.id;
            })

            state.carData[index].number = obj.number;
            localStorage.setItem('carData',JSON.stringify(state.carData));
        }
    },
    //存放获取数据的方法
    getters: {
        //获取购物车所有商品的id
        getCarIds(state){
            var arr = [];
            state.carData.map(v => arr.push(v.id));
            return arr.join(',');
        },
        //获取所有商品的购买数量
        getGoodsNumber(state){
            //格式：k(id) - v(number)
            var obj = {};
            state.carData.map(v=>{
                obj[v.id] = v.number;
            })
            return obj;
        },
        //获取所有商品是否选中状态
        getGoodsSelected(state){
            var obj = {};
            state.carData.map(v=>{
                obj[v.id] = v.selected;
            })
            return obj;
        },
        //获取所有购物车商品数量
        getTotal(state){
            var total = 0;
            state.carData.map(v => total += v.number);
            return total;
        },
        //获取总金额
        getPriceTotal(state){
            var total = 0;
            state.carData.map(v => {
                if(v.selected){
                    total += (parseInt(v.number) * Number(v.price));
                }
            });
            return total * 100;
        },
        //获取所有的选择商品数量
        getNumberTotal(state){
            var total = 0;
            state.carData.map(v => {
                if(v.selected){
                    total += parseInt(v.number);
                }
            });
            return total;
        }
    }

})

export default store;