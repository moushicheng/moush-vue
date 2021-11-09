import Observer from "../observe/observe";
import Complier from "../complier/index";
import { mergeObj } from "../../tool/utils";
import "../../../config/declare"

//现版本有个问题，moushVue是以根实例的形态构建的，没有考虑组件，现在说不算是重构，但需要增加细节让其变成以组件来构建的形式，毕竟跟实例也能算是个组件

export default class moushVue {
  $options: any;
  $data: any;
  $el: HTMLElement;
  $parentVm: VM
  $childrenVm:VM[]
  constructor(options: OPTIONS) {
    this.$options = options;
    this.init();
    this.mount();
   
  }
  protected init() {
    this.$options = mergeObj(this.$options, {
      beforeMount: () => {},
      watch: () => {},
      method: () => {},
      mounted: () => {},
    });
    this.$parentVm=this.$options.parentVm
    this.$childrenVm=[];
    this.$data = this.$options.data();
  }
  mount() {
    this.$options.beforeMount.call(this);

    this.$el = typeof(this.$options.el)=="string"?document.querySelector(this.$options.el):this.$options.el

    new Observer(this.$data); //使data内部数据可观测
    new Complier(this); //分析el内部节点并生成相应watcher

    this.$options.mounted.call(this);
  }
}

export class com extends moushVue{
  constructor(options:any){
    super(options)
    console.log(this);
  }
  protected init(){
     super.init();
     this.$parentVm.$childrenVm.push(this);
  }
  mount(){
    this.$options.beforeMount.call(this);
    const node:HTMLElement=this.$options.el
    const parentNode:HTMLElement=node.parentElement;
    const nextNode=node.nextSibling;
    //替换原节点
    const newNode=CreateDOM(this.$options.template) //根据模板创建新节点
    parentNode.removeChild(node)                    //删除旧节点
    parentNode.insertBefore(newNode,nextNode);      //添加新节点

    //附加原属性
     this.setAttr(node,newNode)


    //挂载
    this.$el=newNode;

    new Observer(this.$data); //使data内部数据可观测
    new Complier(this); //分析el内部节点并生成相应watcher
    this.$options.mounted.call(this);
  }
  getDom(){
    return this.$el;    
  }
  private setAttr(node:HTMLElement,target:HTMLElement){
    const attrs=node.attributes;
    for(let i=0;i<attrs.length;i++){
      const nodeAttr=node.attributes[i];
      target.setAttribute(nodeAttr.name,nodeAttr.value)
    }

  }
}
function CreateDOM(str):HTMLDivElement {
  let dom, tmp = document.createElement('div');
  tmp.innerHTML = str;
  dom = tmp.children[0];
  return dom;
}


