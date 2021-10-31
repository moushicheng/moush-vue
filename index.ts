/*
 * @Author: 某时橙
 * @Date: 2021-10-30 22:05:23
 * @LastEditTime: 2021-10-31 10:21:33
 * @LastEditors: your name
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
      };
    },
    components: {
      coma: {
        template: `<h1>局部组件{{appName}}属性:{{appAttr}}</h1>`,
        data: function () {
          return {
            appName: "moush",
            appAttr:"attr"
          };
        },
        props: ["appProp"],
      },
    },
  });