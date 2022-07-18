/*
 * @Author: 某时橙
 * @Date: 2021-10-15 21:28:29
 * @LastEditTime: 2021-11-18 19:21:26
 * @Description: 属性编辑器，用于分析属性
 * @FilePath: \moush-vue-test\src\core\complier\attrComplier.ts
 */
import { warn, isType, parsePath } from "../../tool/utils";
import Watcher from "../observe/watcher";
import Complier from "./index";
const commonAttr = {
  "v-if": /^v-if/,
  "v-on": /^v-on/,
  "v-bind": /^(v-bind)|^:.+/,
  "v-for": /^v-for/,
};
export default class attrComplier {
  $vm: VM;
  $attrs: Object;
  $node: HTMLDivElement;
  $complierIndex: any;
  constructor(node, vm, complierIndex = 0) {
    this.$vm = vm;
    this.$node = node;
    this.$complierIndex = complierIndex;

    const vueAttrs = this.getAllVueAttrs(node);
    if (vueAttrs.length == 0) {
      return;
    }
    this.$attrs = this.collectAttrs(vueAttrs);
    this.handeler(this.$attrs);
    this.removeAttrs(vueAttrs);
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
  //集合属性，去除attr对象不相关信息
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
  //使v-bind:attr=value这种属性规整化
  formatAttrs(attr) {
    if (/:/.test(attr.name)) {
      const split = attr.name.split(":");
      if (!split[1]) {
        warn("a invalid name:" + split[0]);
        return;
      }
      attr.name = split[0];
      attr.value = `${split[1]}:${attr.value}`;
      attr.run = attr.run.split(":")[0];
    }
    return attr;
  }
  //转换属性别名，如:test="true" ->v-bind:test=“true”
  aliasTransform(attrs) {
    return attrs;
  }
  removeAttrs(attrs) {
    const node = this.$node;
    for (const attr of attrs) {
      if (node.hasAttribute(attr.name)) {
        node.removeAttributeNode(attr);
      }
    }

    return null;
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
  handelVBIND(attr) {}
  handelVON(attr) {
    const node = this.$node;
    const event = attr.value.split(":")[0];
    const funcName = attr.value.split(":")[1];
    const func = parsePath(funcName)(this.$vm.$methods);
    node.addEventListener(event, func);
  }
  handelVFOR(attr) {
    let val = attr.value.split("in");
    const item = val[0].trim();
    const segments = val[1].trim();
    const list = parsePath(segments)(this.$vm.$data);
    //{{item.a}}怎么解析？文本替换即可 ->{{list[0].a}} ->{{list[1].a}}
    const recordSite = this.$node.nextSibling;
    const parentNode = this.$node.parentElement;

    //移除子节点属性
    this.$node.removeAttribute(attr.name);
    //移除子节点
    parentNode.removeChild(this.$node);

    const nodeVal = this.$node.innerHTML;
    for (let i = 0; i < list.length; i++) {

      //替换{{item.a}}->{{arr[0].a}}
      const reg = /{{(.+?)}}/g;
      let match: any = reg.exec(nodeVal);
      if (match) {
        let temp = match[1].split(".");
        temp[0] = segments + `[${i}]`;
        match = temp.join(".");
      }
      //克隆并插入新节点
      let newNodeVal = nodeVal.replace(reg, `{{${match}}}`);
      const node = document.createElement(this.$node.localName);
      node.innerHTML = newNodeVal;
      parentNode.insertBefore(node, recordSite);

      //重新编译
      new Complier(this.$vm,node)
    }
 
  }
}
