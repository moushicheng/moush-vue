<!--
 * @Author: 某时橙
 * @Date: 2021-10-13 21:35:58
 * @LastEditTime: 2021-11-18 08:56:11
 * @LastEditors: Please set LastEditors
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\README.md
 * 可以输入预定的版权声明、个性签名、空行等
-->
# moush-vue
在react、vue等MVVM框架如此流行的今天，你要问我仿写一个Vue有什么意义吗?我只能很遗憾的告诉你，没什么意义。但于我个人而言，这能帮助我理解vue的源码原理等等其实就已
经足够了。


## install
> npm run install
## start
> npm run dev
## build
> npm run build or webpack


## feature

1. 框架直接操作真实dom而没有用到vdom
2. 只实现了vue的部分功能，因为事无巨细全部实现的话有点搬砖。
3. 不像vue2.x的缺陷,moush-vue内数组可通过下标索引完成视图更新

## finish
1. 声明式渲染
2. 条件渲染 v-if
3. 事件处理
4. 组件渲染

## for dev
在config/indexTemplate.html中定义模板
在index.ts中编写vue代码
然后输入npm run dev即可看到效果
