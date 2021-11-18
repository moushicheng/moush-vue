/*
 * @Author: 某时橙
 * @Date: 2021-10-28 08:21:09
 * @LastEditTime: 2021-11-18 08:39:47
 * @Description: 请添加介绍
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
      data=Object.entries(data);
      data.forEach((val,key)=>{
          //先摸一下
          let temp=val
          console.log(val);
      })
    }
}