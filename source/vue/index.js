
import {initState} from './observe'
import Watcher from './observe/watcher';
import { complier } from './compiler';
import {h,render,patch} from './vdom';

function Vue(options){
    this._init(options); //初始化vue 并且将用户选项传入
}
Vue.prototype._init = function (options) {
    // vue中初始化 this.$options 表示得是vue中得参数
    // this指向Vue的实例，所以这里是将Vue的实例缓存给vm变量
    let vm = this;
    vm.$options = options;

    //MVVM原理 响应式数据 需要数据重新初始化 
    // 我们将不同得初始化放入到不同得文件夹中操作，方便维护
    // 初始化state，包括props\methods\data\compunted\watch
    // props\data属性将其设置为vm的响应式属性即需要Object.defineProperty
    // 绑定vm的props和打他属性并设置其getter和setter
    initState(vm);

    // 将实例挂载到dom上
    if (vm.$options.el) {
        vm.$mount(vm.$options.el)
    }
}


function query(el){
    if(typeof el === 'string'){
        return document.querySelector(el);
    }
    return el;
}
const mount = Vue.prototype.$mount;
// 渲染页面将组件进行挂载
Vue.prototype.$mount = function(el){

    let vm = this;
    // 获取dom
    el = vm.$el = el && query(el);

    // 渲染时通过 watcher来渲染 
    //  
    /** 
     * 渲染watcher
     * vue2.0 组件级别更新 new Vue产生一个组件
     * 
     */
    // 更新组件、渲染逻辑 
     let updateComponent = ()=>{
        //  更新组件
        vm._update(vm._render());
     }
    //  渲染watcher
     new Watcher(vm,updateComponent);

}
// 
Vue.prototype._render = function(){
    let vm = this;
    let render = vm.$options.render; //获取用户编写的render方法

    // render函数中的this，是当前Vue的实例
    // render 返回的是虚拟节点
    let vnode = render.call(vm,h);
    return vnode;
}
// 目前用vue1.0 没有使用组件
// 用户传入的数据 去更新视图
Vue.prototype._update = function(vnode){
    console.log("更新操作");
    let vm = this;
    let el = vm.$el;
    let preVnode = vm.preVnode; 
    // 第一次渲染 preVnode不存在
    if(!preVnode){
        vm.preVnode = vnode;
        render(vnode,el);
    }else{
        vm.$el = patch(preVnode,vnode);
    }

    // -------------现在vue1.0之后会用vdom重写----
    // 要循环这个元素 将里边的内容 换成我们的数据
    // 创建文档碎片对象
//     let node = document.createDocumentFragment();
//     let firstChild;
//     // 将当前根元素el中的所有子元素一层层取出来放到文档碎片中, 以减少页面回流和重绘
//    // 将当前el节点对象的所有子节点追加到文档碎片对象中
//     while(firstChild = el.firstChild){
//         node.appendChild(firstChild); //appendChild 具有移动的功能
//     }
//   // 编译模版
//     complier(node,vm);
//     // 追加子元素到根元素
//     el.appendChild(node);
  
    // 需要匹配{{}}的方式来进行替换
    // 我需要让每个数据 它更改了 重新渲染

}

Vue.prototype.$watch = function(expr,handler,opts){
    let vm = this;
    // 原理 创建一个watcher {user:true}标识是用户自己写的一个watcher
    new Watcher(vm,expr,handler,{user:true,...opts});
}
export default Vue
/** 
 * 1、默认会创建一个渲染watcher 这个渲染watcher默认会被执行
 * 2、在渲染之前时，将watcher收集起来pushTarget(this);
 * 执行this.getter()
 * 删除这个渲染后的watcher,popTarget();
 * 3、当用户修改了属性变化后 会调用set方法
 * dep.notify() 发布 之前订阅的watcher 执行
 * */