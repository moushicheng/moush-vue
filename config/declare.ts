/*
 * @Author: 某时橙
 * @Date: 2021-10-14 23:23:59
 * @LastEditTime: 2021-10-28 15:50:57
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\config\declare.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import moushVue from "../index"

declare global {
  interface Window {
    target: any;
  }
  interface VM extends moushVue{

  }
}

export default () => {};
