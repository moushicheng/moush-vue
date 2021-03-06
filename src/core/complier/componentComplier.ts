/*
 * @Author: 某时橙
 * @Date: 2021-10-30 21:48:22
 * @LastEditTime: 2021-11-18 08:40:04
 * @Description: 分析组件，构建组件
 * @FilePath: \moush-vue-test\src\core\complier\componentComplier.ts
 */
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
    'content,element,shadow,template,blockquote,iframe,tfoot'+
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view'
  );
  // const isSVGs = makeSet(
  //   'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  //   'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  //   'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view'
  // );

  export function isHtmlTags(tag){
    if(HTMLTags.has(tag))return true;
    
    return false
  }

  export default class componentComplier{
    $fatherVm:VM;
    $comVm:VM;
    $node:HTMLDivElement; 
    $comData:any;
      constructor(node,vm){
          this.$fatherVm=vm
          this.$node=node;
          this.$comData=this.getComponentData();
          if(!this.$comData)return;
          this.$comVm=this.createComponent();
      }
      getComponentData(){
        const name=this.$node.localName;
        const com=this.$fatherVm.$options.components[name]
        if(!com){
          warn('没有找到组件数据,你真的注册了组件吗？')
        }
        return com;
      }
      createComponent(){
          return new com({
             el:this.$node,
             parentVm:this.$fatherVm,
             template:this.$comData.template,
             data:this.$comData.data,
          });
      }
      getComVm(){
         return this.$comVm;
      }
  }