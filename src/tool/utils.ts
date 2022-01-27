/*
 * @Author: 某时橙
 * @Date: 2021-10-14 20:43:41
 * @LastEditTime: 2021-11-18 19:42:43
 * @Description: 全局通用工具函数
 * @FilePath: \moush-vue-test\src\tool\utils.ts
 */

export function mergeObj(obj1: Object, obj2: Object) {
  return { ...obj1, ...obj2 };
}
export function makeSet(items: string): Set<string> {
  const splitItems = items.split(",");
  const set: Set<string> = new Set();
  splitItems.forEach((item) => {
    set.add(item);
  });
  return set;
}

export function warn(string) {
  console.warn(string);
}

export function isType(ele, type) {
  const types =
    "Array Object String Date RegExp Function Boolean Number Null Undefined".split(
      " "
    );
  // 判断类型
  const _type = function (ele) {
    return Object.prototype.toString.call(ele).slice(8, -1);
  };
  const res = _type(ele) == type;
  return res;
}
export function def(obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
  /**
   * Parse simple path.
   * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
   * 例如：
   * data = {a:{b:{c:2}}}
   * parsePath('a.b.c')(data)  // 2
   */
export function parsePath(path) {
  const bailRE = /[^\w.$]/;
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      if (bailRE.test(segments[i])) {
        //this.arr[0]  this[arr[0]]
        const match = segments[i].match(/(\w+)\[(.+)\]/);
        obj = obj[match[1]];
        obj = obj[match[2]];
        continue;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}
