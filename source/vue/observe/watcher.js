import { isFun,isUndef,nextTick } from "../utils";
import {pushTarget,popTarget} from './dep'
import {util} from '../compiler/diretive'
let uid = 0; // 每一个new watcher的唯一标识
class Watcher{
    /**
     *Creates an instance of Watcher.
     * @param {*} vm 当前组件的实例 new VUe
     * @param {*} exprOrFn 用户可能传入的是一个表达式 也有可能传入的是一个函数
     * @param {*} cb 用户传入的回调函数 vm.$watch('msg',cb)
     * @param {*} ops 一些其他参数
     * @memberof Watcher
     */
    constructor(vm,exprOrFn,cb=()=>{},ops={}) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if(isFun(exprOrFn)){
            //getter 就是new Watcher传入的第二个函数
            this.getter = exprOrFn;
        }else{
            this.getter = function(){
                return util.getValue(vm,exprOrFn);
            }
        }
        // 标识是用户自己写的watcher
        if (ops.user) {
          this.user = true;  
        }
        this.lazy = ops.lazy;//如果lazy为true 说明是计算属性
        this.dirty = ops.lazy;
        this.cb = cb;
        this.ops = ops; 
        this.uid = uid++;   
        this.deps = [];
        this.depsUid = new Set();
        this.immediate = ops.immediate;
        // 默认创建一个watcher 会调用自身的get方法
        // 创建watcher时，先将表达式对应的值取出来
        // 如果当前我们是计算属性的话 不会立刻执行 在用户调用时才调用
        this.value = this.lazy ? undefined : this.get();
        if(this.immediate){
            this.cb(this.value);
        }
    }
    get(){
        // 
        /**收集watcher 作用是 {{msg}} 变化了 这个watcher重新执行
         *  Dep.target = watcher; 
         */
        pushTarget(this);
        // 让这个当前传入的函数执行 默认就会执行
        let value = this.getter.call(this.vm);
        popTarget();
        return value;
    }
    evaluate(){
        this.value = this.get();
        this.dirty = false;
    }
    depend(){
        let i = this.deps.length;
        while (i--) {
            this.deps[i].depend();
        }
    }
    update(){
        // 计算属性
        if(this.lazy){
            this.dirty = true;
        }else{
            queueWatcher(this);
        }
        
    }
    run(){
        let value = this.get();
        // this.value是老值，value是新值
        if(this.value !== value){
            this.cb(value,this.value);
        }
    }
    addDep(dep){ //同一个watcher 不应该重复记录dep
        let uid = dep.uid; //msg的dep
        if(!this.depsUid.has(uid)){
            this.depsUid.add(uid);
            // 让watcher记住当前的dep
            this.deps.push(dep);
            dep.addSub(this);
        }
    }

}

let has = {};
let queue = [];
// 
function flushQueue(){
    // 等待当前这一轮全部更新后 在去让watcher一次执行
    queue.forEach(watcher => watcher.run());
    has = {};
    queue = [];
}
// 对重复的watcher进行过滤操作
function queueWatcher(watcher){
   let uid = watcher.uid;
   if(isUndef(has[uid])){
       has[uid] = uid;
    //  相同的watcher只会存一个  
       queue.push(watcher);

    //  延迟清空队列
    nextTick(flushQueue);
   }
}
// 渲染使用 计算属性 也用vm.watch 
export default Watcher;