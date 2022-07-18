interface OPTIONS {
  data: Object;
  el: string;
  mounted?: Function;
  beforeMount?: Function;
  components?:any;
  methods?:Object<any>;
  template?:string;
}

interface Window {
  target: any;
}


interface VM {
  $options: any;
  $data: any;
  $el: HTMLElement;
  $parentVm: VM;
  $childrenVm: VM[];
  $methods:Object;
}
