/*
 * @Author: 某时橙
 * @Date: 2021-10-05 22:05:34
 * @LastEditTime: 2021-11-17 08:58:21
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\core\observe\observe.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { def } from "../../tool/utils";
import Dep from "./dep";
export default class Observer {
  value: any;

  constructor(value) {
    this.value = value;
    def(value, '__ob__', this)
    if (Array.isArray(this.value)) {
      this.detectArray(this.value);
    }
    this.walk(value);
  }
  walk(obj: Object) {
    for (const [key, val] of Object.entries(obj)) {
      this.detect(obj, key, val);
    }
  }
  detectArray(arr){

  }
  detect(obj, key, val) {
    if (typeof val == "object") {
      //同时判断数组和对象
      new Observer(val);
      return;
    }

    const dep = new Dep(); //针对每一个key，都有一个专属的依赖收集器
    Object.defineProperty(obj, key, {
      get() {
        dep.depend();
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        dep.notify();
      },
    });
  }
}

// export default class ObserverNext {
//   value: any;
//   $parent: any;
//   constructor(value, parent = null) {
//     this.$parent = parent;
//     this.value = value;
//     //detect应该把对象和数组分开，否则有些东西实在不好搞
//     this.detect(value, parent);
//     this.walk(value, parent);
//   }
//   private walk(obj: Object | Array<any>, parent) {
//     for (const [key, val] of Object.entries(obj)) {
//       if (typeof val == "object" && key != "$target") {
//         //同时判断数组和对象
//         new ObserverNext(val, obj);
//       }
//     }
//   }
//   private detect(val: any, parent: any) {
//     const dep = new Dep();
//     const proxy = new Proxy(val, {
//       get(obj, property) {
       
//         if (!obj.hasOwnProperty(property)) {
//           console.log('obj.has filed');
//           return;
//         }
//         dep.depend(property);
//         return obj[property];
//       },
//       set(obj, property, value) {
//         // console.log(dep, obj);
//         console.log(parent);
//         obj[property] = value;
//         dep.notify(property);
//         return true;
//       },
//     });
//     val.$target = val;
//     //在父对象上替换obj
//     parent[this.findKey(parent, val)] = proxy;
//   }
//   private findKey(obj, value, compare = (a, b) => a === b) {
//     return Object.keys(obj).find((k) => compare(obj[k], value));
//   }
// }
