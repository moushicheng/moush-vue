import Watcher from "../observe/watcher"
import attrComplier from "./attrComplier";
import textComplier from "./textComplier";

export default  class Complier{
    $vm:VM
   constructor(vm){
      this.$vm=vm;
      this.run(vm.$el)
   }
   run(node){
    //分析el内部节点类型，遇到对应的节点就生成相应的watcher
    //比如遇到{{age.a}}则去生成new Watcher(vm,"age.a",cb)
    //cb直接替换节点数据即可
    //看这里，为什么说vue的vnode（虚拟dom）操作起来更节省性能？
    //因为这里的node是浏览器节点，会附带大量的无关信息，而vue的vnode是最精简的js对象操作起来会精简无效信息（性能更好）
    if(node.nodeType==1){
        new attrComplier(node,this.$vm) //处理属性
        
        node.childNodes.forEach(childNode => {
            this.run(childNode)
        })
    }
    //文字节点
    if(node.nodeType==3){
       new textComplier(node,this.$vm)
    }
   }
}


