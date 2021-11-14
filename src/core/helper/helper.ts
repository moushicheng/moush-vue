/*
 * @Author: 某时橙
 * @Date: 2021-10-28 08:21:09
 * @LastEditTime: 2021-11-14 14:51:53
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\core\helper\helper.ts
 * 可以输入预定的版权声明、个性签名、空行等
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
      data=Object.entries(data);
      data.forEach((val,key)=>{
          //先摸一下
          let temp=val
          console.log(val);
      })
    }
}