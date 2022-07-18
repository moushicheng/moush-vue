/*
 * @Author: 某时橙
 * @Date: 2021-10-28 08:21:09
 * @LastEditTime: 2021-11-18 19:42:26
 * @Description: 为vm本身添加一些运行时常用方法
 * @FilePath: \moush-vue-test\src\core\helper\helper.ts
 */
export default class helper{
   $vm:VM
    constructor(vm){
        this.$vm=vm;
    }
    //touch all data for update
    touch(){
      let data=this.$vm.$data;
      if(!data)return;
      Object.entries(data).forEach((val,key)=>{
          //先摸一下
          let temp=val
          console.log(val);
      })
    }
}