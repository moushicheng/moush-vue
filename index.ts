import Observer from "./src/core/observe/observe";
import Complier from "./src/core/complier/index";
import { mergeObj } from "./src/tool/utils";
import helper from "./src/core/init/helper";
import "./config/declare.ts";

//现版本有个问题，moushVue是以根实例的形态构建的，没有考虑组件，现在说不算是重构，但需要增加细节让其变成以组件来构建的形式，毕竟跟实例也能算是个组件

export default class moushVue {
  $options: any;
  $data: any;
  $helper: helper;
  $el: HTMLElement;
  $parentVm: VM
  constructor(options: OPTIONS) {
    this.$options = options;
    this.init();
    this.mount();
   
  }
  init() {
    this.$options = mergeObj(this.$options, {
      beforeMount: () => {},
      watch: () => {},
      method: () => {},
      mounted: () => {},
    });
    this.$parentVm=this.$options.$parentVm
    this.$data = this.$options.data();
    this.$helper = new helper(this);

  }
  mount() {
    this.$options.beforeMount.call(this);

    this.$el = document.querySelector(this.$options.el); //挂载
    new Observer(this.$data); //使data内部数据可观测
    new Complier(this); //分析el内部节点并生成相应watcher

    this.$options.mounted.call(this);
  }
}

export class com extends moushVue{
  constructor(op){
    super(op)
    console.log(11);
  }
  init(){
      console.log('init');
  }
  mount(){
      console.log('mount');
  }
}



const app = new moushVue({
  el: "#app",
  data: function () {
    return {
      age: 1,
      name: "小明",
      isShow: true,
    };
  },
  components: {
    coma: {
      template: `<h1>局部组件{{app}}属性:{{appName}}</h1>`,
      data: function () {
        return {
          app: "moush",
        };
      },
      props: ["appName"],
    },
  },
});
