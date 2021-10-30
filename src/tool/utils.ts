/*
 * @Author: 某时橙
 * @Date: 2021-10-14 20:43:41
 * @LastEditTime: 2021-10-30 21:50:18
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\tool\utils.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

export function mergeObj(obj1:Object,obj2:Object){
   return {...obj1,...obj2}
}
export function makeSet(items:string):Set<string>{
     const splitItems=items.split(',');
     const set:Set<string> =new Set();
     splitItems.forEach(item=>{
        set.add(item);
     })
     return set
}

export function warn(string){
   console.warn(string);
}