/*
 * @Author: 某时橙
 * @Date: 2021-10-15 21:28:29
 * @LastEditTime: 2021-10-15 21:36:59
 * @LastEditors: your name
 * @Description: 请添加介绍
 * @FilePath: \moush-vue-test\src\core\complier\attrComplier.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
const attrName=["vIf","vOn"]
const vIf=/^v-if=".+"/

export default class attrComplier{
    $vm:any;
    constructor(node,vm){
        this.$vm=vm

    }
    test(){

    }
} 