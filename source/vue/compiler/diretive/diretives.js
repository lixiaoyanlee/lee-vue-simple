// 编译指令 比如{{}}  v-mode v-text v-html

// 匹配 {{}}
const defaultReg = /\{\{((?:.|\r?\n)+?)\}\}/g;
export const util = {
    getValue(vm, expr) {
        let keys = expr.split('.');
        return keys.reduce((m, cur) => {
            m = m[cur];
            return m;
        }, vm)
    },
    // 编译文本 {{msg}} {{obj.name}}
    compilerText(node, vm) {
        // 
        if(!node.expr){
            // 给节点增加一个属性 为了后续更新操作
            node.expr = node.textContent;
        }
        node.textContent = node.expr.replace(defaultReg, function (...args) {
            return util.getValue(vm, args[1]);
        })
    }
}
