// import {h,render,patch} from "../source/vue/vdom";

// let container = document.getElementById('app');
// let vnode =  h('ul', null, 
//     h('li',{class:'item',key:'A'},'A'),    
//     h('li',{class:'item',key:'B'},'B'),
//     h('li',{class:'item',key:'C'},'C'),    
//     h('li',{class:'item',key:'D'},'D'),
//     );

// render(vnode, container);

// let newVnode = h('ul', null,     
//     h('li',{class:'item',key:'E'},'E'),  
//     h('li',{class:'item',key:'D'},'D'), 
//     h('li',{class:'item',key:'A'},'A'),    
//     h('li',{class:'item',key:'B'},'B'),    
//     h('li',{class:'item a',key:'C'},'C'),
//     ); 

// patch(vnode,newVnode);
import Vue from 'vue';
let vm = new Vue({
    el:'#app', //表示要渲染得元素是app
    data(){
        return {
            msg:'hello',
            obj:{name:'lee',age:18},
            arr:[[1],2,3],
            firstName:'lee',
            lastName:'Hello'
        }
    },
   render(h){
        return h('div',null,this.msg);
   }
});
vm.msg = "更改msg的值";
// vm.firstName = '周'

// setTimeout(() => {
//     // vm.msg = '第一次更新msg';
//     // vm.msg = '第二次更新msg';
//     // vm.msg = '第三次更新msg';
//     // vm.msg = '第四次更新msg';
//     // vm.msg = '第五次更新msg';
//     vm.arr[0].push(100);
// }, 2000);


/**
1. 无法监听数据的 `length`，导致 `arr.length` 这样的数据改变无法被监听
2. 通过角标更改数据，即类似 `arr[2] = 1` 这样的赋值操作，也无法被监听
 */