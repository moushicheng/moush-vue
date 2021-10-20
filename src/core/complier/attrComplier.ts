/*
 * @Author: 某时橙
 * @Date: 2021-10-15 21:28:29
 * @LastEditTime: 2021-10-20 10:54:58
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\core\complier\attrComplier.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
const commonAttr={
    "v-if":/^v-if/,
    "v-on":/^v-on/
}



export default class attrComplier{
    $vm:any;
    $attrs:any;
    $node:any;
    constructor(node,vm){
        
        this.$vm=vm
        this.$node=node;
        this.$attrs=this.formatAttrs(this.getAllVueAttrs(node));

        this.handeler(this.$attrs);
    }
    getAllVueAttrs(node){
       let attrs=Array.from(node.attributes);
        attrs=attrs.filter((attr:any)=>{
            let res=false
            Object.values(commonAttr).map((attrExp)=>{
               if(res==true)return;
               res=attrExp.test(attr.name);
           })
           return res
        })
       return attrs;
    }
    formatAttrs(attrs){
        let res={};
        for(let i=0;i<attrs.length;i++){
            res[attrs[i].name]={
                name:attrs[i].name,
                value:attrs[i].nodeValue,
                run:"handel"+attrs[i].name.split('-').join('').toUpperCase()
            }
        }
        return res
    }
    handeler(attrs){
       if(attrs==false)return;
       attrs=Object.entries(attrs);
       for(let i=0;i<attrs.length;i++){
           const attr=attrs[i][1]
           let run=attr.run;
           this[run](attrs[i])
       }
    }
    handelVIF(attr){
     
    }
} 