import Observer from "../observe/observe";
import Complier from "../complier/index";
import init from "./init";

/*
 根类对象，用于暴露给用户创建vm实例
*/
export default class moushVue implements VM{
  $options: any;
  $data: any;
  $el: HTMLElement;
  $parentVm: VM;
  $childrenVm: VM[];
  $methods:any
  $oldNode:any;
  constructor(options: OPTIONS) {
    this.$options = options;
    this.init();
    this.mount();
    this.observe();

  }
  protected init() {
    new init(this);
  }
  protected mount() {
    this.$options.beforeMount.call(this);
    this.$el =
      typeof this.$options.el == "string"
        ? document.querySelector(this.$options.el)
        : this.$options.el;
    this.$options.mounted.call(this);
  }
  protected observe() {
    new Observer('$data',this.$data,this); //使data内部数据可观测
    new Complier(this); //分析el内部节点并生成相应watcher
  }
}

/*
 子类对象，不暴露给用户，专用于内部创建子实例对象vm
*/

export class com extends moushVue {
  constructor(options) {
    super(options);
    this.setAttr(this.$oldNode,this.$el); //正因如此，会先分析节点内部属性，再分析后附属性
  }
  protected init() {
    super.init();
    this.$parentVm.$childrenVm.push(this);
  }
  protected mount() { 
    this.$options.beforeMount.call(this);
    const node: HTMLElement = this.$options.el;
    const parentNode: HTMLElement = node.parentElement;
    const nextNode = node.nextSibling;
    //替换原节点
    const newNode = this.createDom(this.$options.template); //根据模板创建新节点
    parentNode.removeChild(node); //删除旧节点
    parentNode.insertBefore(newNode, nextNode); //添加新节点

    //记录旧节点
    this.$oldNode=node;
    //挂载
    this.$el = newNode;
    this.$options.mounted.call(this);
  }
  public getDom() {
    return this.$el;
  }
  private setAttr(node: HTMLElement, target: HTMLElement) {
    const attrs = node.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const nodeAttr = node.attributes[i];
      target.setAttribute(nodeAttr.name, nodeAttr.value);
    }
  }
  private createDom(str): HTMLDivElement {
    let dom,
      tmp = document.createElement("div");
    tmp.innerHTML = str;
    dom = tmp.children[0];
    return dom;
  }
}
