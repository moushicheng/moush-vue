import { makeSet, warn } from "../../tool/utils";

import { com } from "../instance/index";


const HTMLTags = makeSet(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
  );


  const isSVGs = makeSet(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view'
  );

  export function isHtmlTags(tag){
    if(HTMLTags.has(tag))return true;
    
    return false
  }

  export default class componentComplier{
    $vm:VM;
    $node:HTMLBaseElement;
    $comData:any;
      constructor(node,vm){
          this.$vm=vm
          this.$node=node;
          this.$comData=this.getComponent();
          if(!this.$comData)return;
          this.createComponent();
      
      }
      getComponent(){
        const name=this.$node.localName;
        const com=this.$vm.$options.components[name]
        if(!name){
          warn('没有找到组件数据,你真的注册了组件吗？')
        }
        return com;
      }
      createComponent(){
          new com({
             el:this.$node,
             parentVm:this.$vm,
             template:this.$comData.template,
             data:this.$comData.data,
          });
      } 
      
  }