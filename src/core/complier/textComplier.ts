/*
 * @Author: 某时橙
 * @Date: 2021-10-28 13:13:20
 * @LastEditTime: 2021-11-18 08:41:09
 * @Description: 文本编译器
 * @FilePath: \moush-vue-test\src\core\complier\textComplier.ts
 */
import { isType } from "../../tool/utils";
import Watcher from "../observe/watcher";

export default class textComplier{
    $node:any
    $vm:VM
    constructor(node,vm){
        this.$node=node;
        this.$vm=vm;
        this.handel(node.nodeValue)
    }
    handel(nodeValue:string){
        let reg = /{{(.+?)}}/g 
        let splitTemplate=nodeValue.split(reg)
        let match
        while(match=reg.exec(nodeValue)){
            let raw = match[0]
            let key = match[1].trim()
            let index=splitTemplate.indexOf(key)
            
            let w=new Watcher(this.$vm,raw,key,(val,oldVal)=>{
                if(isType(val,'Object') || isType(val,'Array')){
                    val=JSON.stringify(val);
                }
                splitTemplate[index]=val;
                
                this.$node.nodeValue =splitTemplate.join('')
            })
            w.update();
        }
    }
}

