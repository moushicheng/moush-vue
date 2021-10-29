/*
 * @Author: 某时橙
 * @Date: 2021-10-15 21:28:29
 * @LastEditTime: 2021-10-29 22:51:43
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\core\complier\attrComplier.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import Watcher from "../observe/watcher";
const commonAttr = {
  "v-if": /^v-if/,
  "v-on": /^v-on/,
};

export default class attrComplier {
  $vm: VM
  $attrs: any;
  $node: any;
  constructor(node, vm) {
    this.$vm = vm;
    this.$node = node;
    this.$attrs = this.formatAttrs(this.getAllVueAttrs(node));
    this.handeler(this.$attrs);
  }
  //获得所有跟Vue属性相关的属性
  getAllVueAttrs(node) {
    let attrs = Array.from(node.attributes);
    attrs = attrs.filter((attr: any) => {
      let res = false;
      Object.values(commonAttr).map((attrExp) => {
        if (res == true) return;
        res = attrExp.test(attr.name);
      });
      return res;
    });
    return attrs;
  }
  //规整属性
  formatAttrs(attrs) {
    let res = {};
    for (let i = 0; i < attrs.length; i++) {
      res[attrs[i].name] = {
        name: attrs[i].name,
        value: attrs[i].nodeValue,
        run: "handel" + attrs[i].name.split("-").join("").toUpperCase(),
      };
    }
    return res;
  }
  handeler(attrs) {
    if (attrs == false) return;
    attrs = Object.entries(attrs);
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i][1];
      let run = attr.run;
      this[run](attrs[i][1]);
    }
  }
  handelVIF(attr) {
    let key = attr.value;//v-if:value,value实际上是data选项里的key之一
    // let nodeCopy=this.$node.cloneNode(true);
    let parentNode=this.$node.parentElement;
    let isExist:boolean=true
    let lastSiteNode:any; //记录最后一次删除时，节点所在的位置
    let w=new Watcher(this.$vm, false, key, (val, oldVal) => {
      if(val){
        if(isExist)return;
           //赋予父节点当前节点
        parentNode.insertBefore(this.$node,lastSiteNode)
        // this.$vm.$helper.touch();
     
      }else{
        isExist=false;
        lastSiteNode=this.$node.nextSibling
        parentNode.removeChild(this.$node)    
      }
    });
    w.update()
  }
}
