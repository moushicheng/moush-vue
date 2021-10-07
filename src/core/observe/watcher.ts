export default class Watcher {
    vm:any
    cb:Function;
    getter:any;
    value:any;
    
    constructor (vm,expOrFn,cb) {
      this.vm = vm;
      this.cb = cb;
      this.getter = parsePath(expOrFn)
      this.value = this.get()
    }
    get () {
      window.target = this;
      const vm = this.vm
      let value = this.getter.call(vm, vm)
      window.target = undefined;
      return value
    }
    update () {
      const oldValue = this.value
      this.value = this.get()
      this.cb.call(this.vm, this.value, oldValue)
    }
  }
  
  /**
   * Parse simple path.
   * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
   * 例如：
   * data = {a:{b:{c:2}}}
   * parsePath('a.b.c')(data)  // 2
   */
  const bailRE = /[^\w.$]/
  export function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    const segments = path.split('.')
    return function (obj) {
      for (let i = 0; i < segments.length; i++) {
        if (!obj) return
        obj = obj[segments[i]]
      }
      return obj
    }
  }