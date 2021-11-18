/*
 * @Author: 某时橙
 * @Date: 2021-10-30 22:05:23
 * @LastEditTime: 2021-11-18 16:03:17
 * @LastEditors: Please set LastEditors
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import moushVue from "./src/core/instance/index";


const app = new moushVue({
    el: "#app",
    data: function () {
      return {
        age: 1,
        name: "小明",
        isShow: true,
        arr:[1,2,3,4,5,6,7,8,9,10,11],
      };
    },
    methods:{
       addFunc:function(){
         this.arr[0]++
       },
       switchIsShow:function(){
         this.isShow=!this.isShow
       }
    },
    components: {
      coma: {
        template: `<h1 class="com" v-bind:test="appName">局部组件{{appName}}自身属性:{{appAttr}}</h1>`,
        data: function () {
          return {
            appName: "moush",
            appAttr:"attr",
          };
        },
      },
    },
  });