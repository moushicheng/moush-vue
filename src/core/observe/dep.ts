/*
 * @Author: 某时橙
 * @Date: 2021-10-06 15:33:23
 * @LastEditTime: 2021-11-18 08:38:56
 * @Description: 依赖收集器
 * @FilePath: \moush-vue-test\src\core\observe\dep.ts
 */
import Watcher from "./watcher";

// export default class Dep {
//   subs: Array<Watcher>;
//   constructor() {
//     this.subs = [];
//   }

//   addSub(sub) {
//     this.subs.push(sub);
//   }
//   // 删除一个依赖
//   removeSub(item) {
//     const index = this.subs.indexOf(item);
//     if (index > -1) {
//       return this.subs.splice(index, 1);
//     }
//   }
//   // 添加一个依赖
//   depend() {
//     if (window.target) {
//       this.addSub(window.target);
//     }
//   }
//   // 通知所有依赖更新
//   notify() {
//     const subs = this.subs;
//     for (let i = 0, l = subs.length; i < l; i++) {
//       subs[i].update();
//     }
//   }
// }

export default class depNext {
  subs: Map<string, Array<Watcher>>;
  constructor() {
    this.subs = new Map();
  }

  addSub(prop, target) {
    const sub = this.subs.get(prop);

    if (!sub) {
      this.subs.set(prop, [target]);
      return;
    }

    sub.push(target);
  }
  // 添加一个依赖
  depend(prop) {
    if (window.target) {
      this.addSub(prop, window.target);
    }
  }
  // 通知所有依赖更新
  notify(prop) {

    const watchers = this.subs.get(prop);
    if(!watchers)return;
    for (let i = 0, l = watchers.length; i < l; i++) {
      watchers[i].update();
    }
  }
}
