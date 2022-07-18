/*
 * @Author: 某时橙
 * @Date: 2021-10-08 21:03:32
 * @LastEditTime: 2021-11-18 09:08:56
 * @Description: 依赖本身，最终的目的都是调用cb
 * @FilePath: \moush-vue-test\src\core\observe\watcher.ts
 */  
 
import { isType, parsePath } from "../../tool/utils";

export default class Watcher {
    vm:VM
    cb:Function;
    getter:Function;
    value:any;
    
    constructor (vm,initVal,expOrFn,cb) {
      this.vm = vm;
      this.cb = cb;
      if(isType(expOrFn,'String'))this.getter = parsePath(expOrFn)
      else if(isType(expOrFn,'Function'))this.getter=expOrFn
      this.value = this.get() //收集依赖
      this.value=initVal
    }
    get () {
      window.target = this;
      let value = this.getter(this.vm.$data)
      window.target = undefined;
      return value
    }
    update () {
      const oldValue = this.value
      // this.value = this.get() //更新时不要触发getter否则会收集依赖
      this.value = this.getter(this.vm.$data)
      this.cb.call(this.vm, this.value, oldValue)
    }
  }
  

