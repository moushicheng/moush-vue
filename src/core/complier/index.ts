import Watcher from "../observe/watcher"

export default  class Complier{
    $vm:any;
   constructor(vm){
      this.$vm=vm;
      this.run(vm.$el)
   }
   run(node){
    //分析el内部节点类型，遇到对应的节点就生成相应的watcher
    //比如遇到{{age.a}}则去生成new Watcher(vm,"age.a",cb)
    //cb直接替换节点数据即可
    if(node.nodeType==1){
        node.childNodes.forEach(childNode => {
            this.run(childNode)
        })
    }
    if(node.nodeType==3){
        let reg = /{{(.+?)}}/g
        let match
        while(match=reg.exec(node.nodeValue)){
            let raw = match[0]
            let key = match[1].trim()
            let w=new Watcher(this.$vm,raw,key,(val,oldVal)=>{
                
                node.nodeValue = node.nodeValue.replace(oldVal, val)
            })
            w.update();
        }
    }
    //如果要测试v-if，判断属性节点node.nodeType==2?
    //然后
   }
}


