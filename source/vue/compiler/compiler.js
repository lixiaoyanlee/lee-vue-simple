import {isElement, isText} from '../utils'
import { util} from './diretive'

// 编译模版, 解析指令
export function complier(node,vm){
    // 获取到所有的子节点,
    // 当前获取的子节点数组是一个伪数组, 需要转为数组
    let childNodes = node.childNodes;
    [...childNodes].forEach(c=>{
        if(isElement(c)){ // 元素节点
            // 编译元素节点
            complier(c,vm);
        }else if(isText(c)){ //文本节点
            // 编译文本节点
            return util.compilerText(c,vm);
        }
    })
}

