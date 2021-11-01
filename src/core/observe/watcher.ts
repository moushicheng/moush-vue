export default class Watcher {
    vm:VM
    cb:Function;
    getter:any;
    value:any;
    
    constructor (vm,initVal,expOrFn,cb) {
      this.vm = vm;
      this.cb = cb;
      this.getter = parsePath(expOrFn)
      this.value = this.get() //收集依赖
      this.value=initVal
    }
    get () {
      window.target = this;
      let value = this.getter(this.vm.$data)
      window.target = undefined;
      return value
    }
    update () {
      const oldValue = this.value
      // this.value = this.get() //更新时不要触发getter否则会收集依赖
      this.value = this.getter(this.vm.$data)
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