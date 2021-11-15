/*
 * @Author: 某时橙
 * @Date: 2021-10-05 22:05:34
 * @LastEditTime: 2021-11-15 09:17:21
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\core\observe\observe.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import Dep from "./dep"
export default class Observer{
    value:any

    constructor(value){
        this.value=value
        if(Array.isArray(this.value)){
                 
        }else{
          this.walk(value)
        }
    }
    walk(obj:Object){
        for(const [key,val] of Object.entries(obj)){            
           this.detect(obj,key,val)
        }
    }
    detect(obj,key,val){
        if(typeof(val)=='object'){//同时判断数组和对象
            new Observer(val);
            return;
        }
  
        const dep=new Dep()

        Object.defineProperty(obj,key,{
            get(){       
             dep.depend();  
             return val
            },
            set(newVal){
                if(val === newVal){
                    return
                }
              val=newVal
              dep.notify()
            }
        })
    }
}