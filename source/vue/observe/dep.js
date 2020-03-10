
import {remove} from '../utils'
let uid = 0;
// 收集数据 收集的时一个个watcher
class Dep{
    constructor() {
        // Dep实例的uid，为了方便去重
        this.uid = uid++;
        // 存储收集器中需要通知的Watcher
        this.subs = [];
        
    }
    // 添加订阅 搜集watcher Watcher 的实例，将来用来通知更新
    addSub(watcher){
        this.subs.push(watcher);
    }
    removeSub(sub) {
        remove(this.subs, sub)
    }
    // 通知watcher执行update方法更新
    notify(){
        this.subs.forEach(watcher=>watcher.update());
    }
    depend(){
        // 防止直接调用depend方法 
        if(Dep.target){
            // Dep.target 是一个渲染的watcher
            // 希望与watcher互相记忆
            Dep.target.addDep(this);
        }
    }
}
let stack = [];//watcher 栈
Dep.target = null;
// 用来保存当前的watcher
/**
 * 将watcher观察者实例设置给Dep.target， 用以依赖收集。
 *  同时将该实例存入stack栈中
 * * @param {*} watcher
 */
export function pushTarget(watcher){
    Dep.target = watcher;
    stack.push(watcher);
}
/** 
 将观察者实例从stack栈中取出并设置给Dep.target
 */
export function popTarget(){
    stack.pop();
    Dep.target = stack[stack.length-1];
}
export default Dep;