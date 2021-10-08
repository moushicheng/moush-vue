
import Observer from "./src/core/observe/observe"
import  "./declare"

class moushVue{
  $el:Object
  $data:Object
  constructor(options:any){
      this.$el=document.querySelector(options.el)
      this.$data=options.data
      new Observer(this.$data) //使data内部数据可观测
  }
}
 
 
const app=new moushVue({
  el:"#app",
  data:{
    age:1
  }
})

