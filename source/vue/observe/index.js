import {Observe} from './observe'
import Watcher from './watcher';
import Dep, { pushTarget, popTarget } from './dep'

export function initState(vm){
    let options = vm.$options;
    if (options.data)  initData(vm);//初始化数据
    if (options.watch) initWatch(vm); //初始化watch
    if (options.computed) initComputed(vm,options.computed); //初始化计算属性
}
// 观察
export function observe(data){
    if(typeof data !== 'object' || data == null){
        return;
    }
    // 已经被监控过了
    if(data.__ob__){
        return data.__ob__;
    }
    return new Observe(data);
}
function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key];
        },
        set(newVal){
            vm[source][key] = newVal;
        }
    })
}
// 初始化数据  将数据重新定义 核心：Object.defineProperty
function initData(vm){
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    // 将在vm._data上得操作代理到vm上
    for(let key in data){
        proxy(vm,'_data',key);
    }
    observe(vm._data);
}

function createWatcher(vm,key,handler,opts){
    return vm.$watch(key,handler,opts);
}

function initWatch(vm) {
    // 用户传入的watch属性
    let watch = vm.$options.watch;
    for (let [key, val] of Object.entries(watch)) {
        let cur = val;
        let handler = cur;
        if(val.handler){
            handler = val;
        }
        createWatcher(vm, key, handler, {immediate:val.immediate});
    }

}

function createComputedGetter(vm,key) {
    let watcher = vm._watchersComputed[key];
    return function(){ //用户取值会执行此方法
        if(watcher){
            // 如果页面取值，dirty是true，就会去调用watcher的get方法
        //    dirty是false 不需要重新执行计算属性的方法
            if(watcher.dirty){
                // 计算
                watcher.evaluate();
            }
            if(Dep.target){
                watcher.depend();
            }
            return watcher.value;
        }
    }
    
}
// 计算属性 默认不执行 等用户取值时在执行，会缓存取值结果
function initComputed(vm,computed){
    // 将计算属性的配置 放到vm上
    let watchers = vm._watchersComputed = Object.create(null); //创建储存watcher的对象
    // computed 是{fullName:()=>this.firstName+this.lastName}
    for (let key in computed) {
        const userDef = computed[key];
        //如果computed的属性值为函数，取这个函数为watcher的第二个参数 即getter
        // 如果不是function，则为这个属性定义一个
        const getter = typeof userDef === 'function' ? userDef : userDef.get;
        // lazy:true 表示刚调用的watcher先不执行此方法 实例化的过程中不去完成收集依赖
        watchers[key] = new Watcher(vm, getter, () => {}, {
            lazy: true
        });
        if(!(key in vm)){
            Object.defineProperty(vm, key, {
                get: createComputedGetter(vm, key)
            })
        }
        
    }
}