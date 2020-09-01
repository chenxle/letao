//封装一个模块，用于定义各种请求的方法
import instance from './config.js';

export async function getLunBoData(){
    return await instance.get('/getlunbo');
}

export async function getRecommendData(limit = 6){
    return await instance.get(`/recommend?limit=${limit}`);
}

export async function getComponentsData(pageindex = 1){
    return await instance.get(`/getgoods?pageindex=${pageindex}`);
}

export async function getNewslistData(page = 1,pagesize = 10){
    return await instance.get(`getnewslist?page=${page}&pagesize=${pagesize}`);
}

export async function getGoodsDetailLunanBoData(goodId){
    return await instance.get(`getthumbimages/${goodId}`);
}

export async function getgoodsinfoData(goodId){
    return await instance.get(`getgoodsinfo/${goodId}`);
}

export async function getNewData(newId){
    return await instance.get(`getnew/${newId}`);
}

export async function getCommentsData(artid,pageindex = 1){
    return await instance.get(`getcomments/${artid}?pageindex=${pageindex}`);
}

export async function postcomment(id){
    return await instance.post(`postcomment/${id}`);
}