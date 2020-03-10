import { observe } from "./index";
import { isArray } from "../utils";

/**  拦截用户调用得push、shift、unshift、pop reverse sort splice
 * 因为这些方法会改变原来得数组 这些需要重写
 */

//  先获取老得数组得方法 目前只改写这7个方法
let oldArrProtoMethods = Array.prototype;

// 拷贝一个新得对象 可以查找到老得方法
export let arrayMethods = Object.create(oldArrProtoMethods);

let methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'reverse',
    'sort',
    'splice'
];

// 需要循环对新增的每一项数据进行观察
export function observeArray(inserted) {
    for(let i=0;i<inserted.length;i++){
        observe(inserted[i]);
    }
}
// 递归收集数组中的每一项数据
export function dependArray(val){
    for(let i=0;i<val.length;i++){
        let cur = val[i];
        cur.__ob__ && cur.__ob__.dep.depend();
        if(isArray(cur)){
            dependArray(cur);
        }
    }
}
methods.forEach(m=>{
    // 函数劫持 切片编程
    arrayMethods[m] = function(...arg){
       const r = oldArrProtoMethods[m].apply(this,arg);
    //    我们需要对新增的数据进行监控
       let inserted;
       switch (m) {
           case 'push':
           case 'unshift':
               inserted = arg;
               break;
           case 'splice':
                inserted = args.slice(2)
               break;
       }
       if(inserted) observeArray(inserted);
       if(this.__ob__) this.__ob__.dep.notify();
       return r;
    }
})