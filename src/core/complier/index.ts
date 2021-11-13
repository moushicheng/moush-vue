import Watcher from "../observe/watcher"
import attrComplier from "./attrComplier";
import textComplier from "./textComplier";
import componentComplier,{isHtmlTags} from "./componentComplier";

enum type {
    Attr=1,
    A,
    Text

}


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
    const name=node.localName;
    if(node.nodeType==type.Attr){
        if(!isHtmlTags(name)){ 
            const com=new componentComplier(node,this.$vm); //执行流程：重新注册组件替换节点，节点上附上原来就有的属性值attr
            node=com.getComVm().$el;
            new attrComplier(node,this.$vm);
            return; 
        } 
        new attrComplier(node,this.$vm) //处理属性，需要注意的是，如果是vue属性（v-if v-on），应该在处理完之后在节点上删去,否则会和子组件混淆


        node.childNodes.forEach(childNode => {
            this.run(childNode)
        })
    }
    //文字节点
    if(node.nodeType==type.Text){
       new textComplier(node,this.$vm)
    }
   }
}

