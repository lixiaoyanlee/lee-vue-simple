
let callbacks = [];
function flushCallbacks(){
    callbacks.forEach(cb=>cb());
}
/**
 *异步刷新这个callbacks，获取一个异步的方法
 异步是分支执行顺序的
 会先执行微任务（promise\mutationObserver\）
 在执行宏任务(setImmediate\setTimeout)
 * @export
 * @param {*} cb
 */
export function nextTick(cb){
    callbacks.push(cb);

    let timerFnCb = ()=>{
        flushCallbacks();
    }
    
    if(Promise) return Promise.resolve().then(timerFnCb);
    if(MutationObserver){
        let observe = new MutationObserver(timerFnCb);
        let textNode = document.createTextNode(1);
        observe.observe(textNode,{characterData:true});
        textNode.textContent(2);
        return;
    }
    if(setImmediate){
        return setImmediate(timerFnCb);
    }
    setTimeout(timerFnCb, 0);
}