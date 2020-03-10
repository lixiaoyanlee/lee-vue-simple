import {observe} from './index';
import {observeArray, arrayMethods,dependArray} from './array';
import Dep from './dep';
// 定义响应式数据变化
export function defineReactive(data,key,val){
    // 递归 判断val是不是对象{name:'lee',age:18} [1,2]
    let childOb = observe(val);
    // 收集依赖 收集的是watcher
    let dep = new Dep();
    Object.defineProperty(data,key,{
        get(){ // 只要对这个属性 精选取值操作，就会将当前的watcher存入
            // 如果有值 就是渲染的watcher
            if(Dep.target){
                /** 我们希望存入的watcher 不能重复，如果重复会造成更新多次
                 *dep.depend() 让中可以存watcher watcher中存dep
                 *  dep 实现多对多的关系
                 */
                dep.depend();
                // childOb 针对数组的收集
                if(childOb){
                    // 收集数组的依赖
                    childOb.dep.depend();
                    // [[1,2],3,4] 需要对数组中的每一项收集，比如二维数组
                    dependArray(val);
                }
            }
            return val;
        },
        set(newVal){
            if (val === newVal) return;
            // 如果设置的是一个对象的话，需要继续观察
            observe(newVal);
            val = newVal;
            // 通知订阅器找到对应的观察者,通知观察者更新视图
            dep.notify();
        }
    });
}

export class Observe{
    constructor(data) { // 此时得data就是定义得vm._data
        // this.dep 专门来收集数组的
        this.dep = new Dep();
        // 给data添加一个属性__ob__，每个数组和对象都有__obj__属性，返回的是当前Observe实例
        Object.defineProperty(data,'__ob__',{
            get:()=>this
        });
        //将用户得数据使用Object.defineProperty重新定义
        if(Array.isArray(data)){
            // 我们需要通过原型链 调用我们重写的相关的数组的方法
            data.__proto__ = arrayMethods;
            // 监控数组中的每一项 因为有可能数组中里边也是对象
            observeArray(data);
        }else{
            this.walk(data);
        }
        
    }
    walk(data){       
        for (let [key, val] of Object.entries(data)) {
            // 对每一个属性 重新用defineProperty定义
            defineReactive(data, key, val);
        }
    }
    
}

export default Observe;