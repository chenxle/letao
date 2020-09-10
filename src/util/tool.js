//延时函数sleep
export function sleep(time){
    return new Promise((resolve,reject)=>{
        setTimeout(_=>{
            resolve();
        },time)
    })
}