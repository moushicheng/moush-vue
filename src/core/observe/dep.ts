/*
 * @Author: 某时橙
 * @Date: 2021-10-06 15:33:23
 * @LastEditTime: 2021-10-28 16:12:03
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\core\observe\dep.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import Watcher from "./watcher";

export default class Dep {
  subs: Array<Watcher>;
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }
  // 删除一个依赖
  removeSub(item) {
    const index = this.subs.indexOf(item);
    if (index > -1) {
      return this.subs.splice(index, 1);
    }
  }
  // 添加一个依赖
  depend() {
    if (window.target) {
        this.addSub(window.target)
    }
  }
  // 通知所有依赖更新
  notify() {
    const subs = this.subs
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}