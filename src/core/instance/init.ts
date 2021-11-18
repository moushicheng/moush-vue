/*
 * @Author: 某时橙
 * @Date: 2021-11-12 13:44:36
 * @LastEditTime: 2021-11-18 08:39:31
 * @Description: init类，用于moushVue类对象的初始化 
 * @FilePath: \moush-vue-test\src\core\instance\init.ts
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