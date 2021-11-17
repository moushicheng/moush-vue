/*
 * @Author: 某时橙
 * @Date: 2021-11-12 13:44:36
 * @LastEditTime: 2021-11-17 10:56:59
 * @LastEditors: your name
 * @Description: init类，用于moushVue类对象的初始化 
 * @FilePath: \moush-vue-test\src\core\instance\init.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { mergeObj } from "../../tool/utils";
export default class init{
  $vm:VM;
  constructor(vm){
      this.$vm=vm;
      this.init();
  }
  public init() {
    const vm=this.$vm
     vm.$options = mergeObj(vm.$options, {
      beforeMount: () => {},
      mounted: () => {},
    });
    vm.$parentVm = vm.$options.parentVm;
    vm.$childrenVm = [];
    this.dataInit();
    this.methodInit();
  }
  private dataInit(){
    const vm=this.$vm
    vm.$data = vm.$options.data();
       
    for (const key in vm.$data) {
      Object.defineProperty(vm, key, {
        get() {
          return this.$data[key]
        },
        set(newValue) {
          this.$data[key]= newValue
        },
      })
    }
  }
  private methodInit(){
    const vm=this.$vm
    const methods=vm.$options.methods;
    for(const key in methods){
      methods[key]= methods[key].bind(vm)
    }
    vm.$methods=methods
  }
}