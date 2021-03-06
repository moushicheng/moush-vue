/*
 * @Author: 某时橙
 * @Date: 2021-10-30 21:48:22
 * @LastEditTime: 2022-01-27 13:05:38
 * @Description: 编译器，构建$el下的dom
 * @FilePath: \moush-vue-test\src\core\complier\index.ts
 */
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
   constructor(vm,node=vm.$el){
      this.$vm=vm;
      this.run(node)
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
      
            const com=new componentComplier(node,this.$vm); //执行流程：注册组件和替换节点，并执行一系列初始vue的流程,最后会附加旧节点属性到新节点上进行下面的解析。
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

