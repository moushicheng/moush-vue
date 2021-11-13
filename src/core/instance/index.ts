import Observer from "../observe/observe";
import Complier from "../complier/index";
import { mergeObj } from "../../tool/utils";
import init from "./init";

//现版本有个问题，moushVue是以根实例的形态构建的，没有考虑组件，现在说不算是重构，但需要增加细节让其变成以组件来构建的形式，毕竟跟实例也能算是个组件

export default class moushVue implements VM{
  $options: any;
  $data: any;
  $el: HTMLElement;
  $parentVm: VM;
  $childrenVm: VM[];
  $methods:any
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
    new Observer(this.$data); //使data内部数据可观测
    new Complier(this); //分析el内部节点并生成相应watcher
  }
}

export class com extends moushVue {
  constructor(options: any) {
    super(options);
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
    //附加原属性
    this.setAttr(node, newNode);
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
