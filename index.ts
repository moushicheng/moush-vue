
import Observer from "./src/core/observe/observe"

declare global {
  interface Window {
    target?: any;
  }
  interface Object{
    entries?:any
  }
}
export default class moushVue{
  $el:Object
  $data:Object
  constructor(options:any){
      this.$el=document.querySelector(options.el)
      this.$data=options.data
      new Observer(this.$data) //使data内部数据可观测
  }
}

