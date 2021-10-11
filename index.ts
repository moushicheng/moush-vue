
import Observer from "./src/core/observe/observe"
import Complier from "./src/core/complier/index"
import  "./declare"

export default class moushVue{
  $el:Object
  $data:any
  constructor(options:any){
      this.$el=document.querySelector(options.el)
      this.$data=options.data
      new Observer(this.$data) //使data内部数据可观测
      new Complier(this);           //分析el内部节点并生成相应watcher
  }
}

 
const app=new moushVue({
  el:"#app",
  data:{
    age:1
  }
})

setInterval(()=>{
  app.$data.age++
},1000)
