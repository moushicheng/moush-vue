/*
 * @Author: 某时橙
 * @Date: 2021-10-15 21:28:29
 * @LastEditTime: 2021-11-11 10:00:41
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\core\complier\attrComplier.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { warn } from "../../tool/utils";
import Watcher from "../observe/watcher";
const commonAttr = {
  "v-if": /^v-if/,
  "v-on": /^v-on/,
  "v-bind": /^(v-bind)|^:.+/,
};
export default class attrComplier {
  $vm: VM;
  $attrs: Object;
  $node: any;
  constructor(node, vm) {
    this.$vm = vm;
    this.$node = node;

    let vueAttrs = this.getAllVueAttrs(node);

    vueAttrs = this.aliasTransform(vueAttrs);

    this.$attrs = this.collectAttrs(vueAttrs);
    console.log(this.$attrs);
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
  //集合属性
  collectAttrs(attrs) {
    const res = {};
    for (let i = 0; i < attrs.length; i++) {
      res[attrs[i].name] = {
        name: attrs[i].name,
        value: attrs[i].nodeValue,
        run: "handel" + attrs[i].name.split("-").join("").toUpperCase(),
      };
      this.formatAttrs(res[attrs[i].name]);
    }
    return res;
  }
  formatAttrs(attr) {
    if (/:/.test(attr.name)) {
      const split = attr.name.split(":");
      if (!split[1]) {
        warn("a invalid name:" + split[0]);
        return;
      }
      attr.name=split[0]
      attr.value=`${split[1]}:${attr.value}`
      attr.run=attr.run.split(':')[0];
    }
    return attr;
  }
  //转换属性别名，如:test="true" ->v-bind:test=“true”
  aliasTransform(attrs) {
    return attrs;
  }
  handeler(attrs) {
    if (attrs == false) return;
    attrs = Object.entries(attrs);
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i][1];
      const run = attr.run;
      this[run](attrs[i][1]);
    }
  }
  handelVIF(attr) {
    const parentNode = this.$node.parentElement;
    const key = attr.value; //v-if:value,value实际上是data选项里的key之一
    // let nodeCopy=this.$node.cloneNode(true);

    let isExist = true;
    let lastSiteNode; //记录最后一次删除时，节点所在的位置
    let w = new Watcher(this.$vm, false, key, (val, oldVal) => {
      if (val == undefined) {
        warn(
          "undefinedKey:" + attr.value + " In node:" + this.$vm.$el.nodeName
        );
        return;
      }

      if (val) {
        if (isExist) return;
        //赋予父节点当前节点
        parentNode.insertBefore(this.$node, lastSiteNode);
        // this.$vm.$helper.touch();
      } else {
        isExist = false;
        lastSiteNode = this.$node.nextSibling;
        parentNode.removeChild(this.$node);
      }
    });
    w.update();
  }
  handelVBIND(attr) {
  }
  handelVON(attr){
  }
}
