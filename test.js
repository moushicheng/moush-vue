/*
 * @Author: 某时橙
 * @Date: 2021-10-07 09:28:07
 * @LastEditTime: 2021-10-07 09:29:44
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue\test.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
class Watcher {
    constructor () {
      this.get()
    }
    get () {
    //   window.target = this;
      const vm = this
      console.log(this.getter);
      let value = this.getter.call(vm, vm)
      window.target = undefined;
      return value
    }
    update () {

    }
  }

  new Watcher()