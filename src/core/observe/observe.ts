/*
 * @Author: 某时橙
 * @Date: 2021-10-08 21:03:32
 * @LastEditTime: 2022-01-27 13:11:01
 * @Description: 观察者,用于检测对象|数组内的变化来调用依赖
 * @FilePath: \moush-vue-test\src\core\observe\observe.ts
 */

import { def } from "../../tool/utils";
import Dep from "./dep";

export default class ObserverNext {
  $value: any;
  $parent: any;
  $key: string;
  dep: any;
  constructor(key, value, parent) {
    this.$key = key;
    this.$value = value;

    this.$parent = parent;

    this.dep = new Dep();

    def(value, "__ob__", this);
    this.walk(value);
    this.detect(value, parent);
  }
  private walk(obj: Object | Array<any>) {
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val == "object") {
        //同时判断数组和对象
        new ObserverNext(key, val, obj);
      }
    }
  }
  private detect(val: any, parent: any) {
    const dep = this.dep;
    const key = this.$key;

    const proxy = new Proxy(val, {
      get(obj, property) {
        if (!(property in obj)) {
          return;
        }
        console.log(obj[property]);
        dep.depend(property);
        return obj[property];
      },
      set(obj, property, value) {
        console.log("set");
        obj[property] = value;
        //bug，如果设置的属性是对象，则还未使其深度检测
        // self.walk(value)

        dep.notify(property);
        if (parent.__ob__) parent.__ob__.dep.notify(key);

        return true;
      },
    });

    parent[key] = proxy;
  }
}
// function findKey(obj, value, compare = (a, b) => a === b) {
//   return Object.keys(obj).find((k) => compare(obj[k], value));
// }

// export  class Observer {
//   value: any;
//   $vm: VM
//   constructor(value, refer, vm) {
//     this.value = value;
//     this.$vm = vm;
//     def(value, "__ob__", this);
//     this.walk(value);//walk会深度遍历一切属性
//     if (Array.isArray(this.value)) {
//       this.detectArray(this.value, refer);
//     }

//   }
//   walk(obj: Object) {
//     for (const [key, val] of Object.entries(obj)) {
//       this.detect(obj, key, val);
//     }
//   }
//   detectArray(arr, refer) {
//     const dep = new Dep();

//     const _proxy = new Proxy(refer, {
//       get(obj, property) {
//         dep.depend();
//         return obj[property]
//       },
//       set(obj, property, value) {
//         console.log("@_proxy", property);
//         obj[property] = value;
//         dep.notify();
//         return true;
//       },
//     });

//     this.$vm.$data = _proxy
//     const proxy = new Proxy(arr, {
//       get(obj, property) {
//         dep.depend();
//         return obj[property]
//       },
//       set(obj, property, value) {
//         console.log("@proxy", property);
//         obj[property] = value;
//         dep.notify();
//         return true;
//       },
//     });

//     arr.__target__ = arr;
//     //在父对象上替换obj
//     refer[findKey(refer, arr)] = proxy;
//   }
//   detect(obj, key, val) {
//     if (typeof val == "object") {
//       //同时判断数组和对象
//       new Observer(val, obj, this.$vm);
//       return;
//     }
//     const dep = new Dep(); //针对每一个key，都有一个专属的依赖收集器

//     Object.defineProperty(obj, key, {
//       get() {
//         dep.depend();
//         return val;
//       },
//       set(newVal) {
//         if (val === newVal) {
//           return;
//         }
//         val = newVal;
//         dep.notify();
//       },
//     });
//   }
// }
