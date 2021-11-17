/*
 * @Author: 某时橙
 * @Date: 2021-10-14 20:43:41
 * @LastEditTime: 2021-11-17 10:03:06
 * @LastEditors: your name
 * @Description: 全局通用工具函数
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

export function isType(ele,type){
   const types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');
  // 判断类型
  const _type = function (ele) {
   return Object.prototype.toString.call(ele).slice(8, -1);
  };
  const res=_type(ele)==type
  return res;
}
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
   Object.defineProperty(obj, key, {
     value: val,
     enumerable: !!enumerable,
     writable: true,
     configurable: true
   })
 }
 
