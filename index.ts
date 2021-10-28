
import Observer from "./src/core/observe/observe"
import Complier from "./src/core/complier/index"
import { mergeObj } from "./src/tool/utils"
import helper from "./src/core/init/helper"
import  "./config/declare"


export default class moushVue{

  $options:any
  $data:any
  $el:Object 
  $helper:any
  constructor(options:OPTIONS){
      this.$options=options
      this.init();
      this.mounted();
  }
  init(){
    this.$options=mergeObj(this.$options,{
        beforeMount:function(){},
        mounted:function(){},
        watch:function(){},
        method:function(){}
    })
    this.$data=this.$options.data;
    this.$helper=new helper(this);
  }
  mounted() {
    this.$options.beforeMount.call(this)

    this.$el=document.querySelector(this.$options.el) //挂载
    new Observer(this.$data) //使data内部数据可观测
    new Complier(this);           //分析el内部节点并生成相应watcher

    this.$options.mounted.call(this) 
  }
}

 
const app=new moushVue({
  el:"#app",
  data:{
    age:1,
    isShow:false
  } 
})

setTimeout(() => {
  app.$data.isShow=true
}, 1000);
setTimeout(() => {
  app.$data.age=5
}, 1000);
