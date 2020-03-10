/** 处理属性
 */

import {
    isArray, hasOwn
} from './utils'

/**
 *更新style属性
 *
 * @param {Object} vnode 新的虚拟dom节点对象
 * @param {Object} oldStyle 
 * @returns
 */
function undateStyle(vnode, oldStyle = {}) {
    let doElement = vnode.elm;
    let newStyle = vnode.props.style || {};
    // 删除style
    for(let oldAttr in oldStyle){
        if (!hasOwn(newStyle, oldAttr)) {
            doElement.style[oldAttr] = '';
        }
    }

    for(let newAttr in newStyle){
        doElement.style[newAttr] = newStyle[newAttr];
    }
}
function filterKeys(obj) {
    return Object.keys(obj).filter(k => {
        return k !== 'style' && k !== 'id' && k !== 'class'
    })
}
/**
 *更新props属性
 * 支持 vnode 使用 props 来操作其它属性。
 * @param {Object} vnode 新的虚拟dom节点对象
 * @param {Object} oldProps 
 * @returns
 */
function undateProps(vnode, oldProps = {}) {
    let doElement = vnode.elm;
    let props = vnode.props.props || {};

    filterKeys(oldProps).forEach(key => {
        if (!props.hasOwnPrpperty[key]) {
            delete doElement[key];
        }
     })

     filterKeys(props).forEach(key => {
         let old = oldProps[key];
         let cur = props[key];
         if (old !== cur && (key !== 'value' || doElement[key] !== cur)) {
            doElement[key] = cur;
         }
     })
}


/**
 *更新className属性 html 中的class
 * 支持 vnode 使用 props 来操作其它属性。
 * @param {Object} vnode 新的虚拟dom节点对象
 * @param {*} oldName 
 * @returns
 */
function updateClassName(vnode, oldName) {
    let doElement = vnode.elm;
    const newName = vnode.props.className || vnode.props.class;

    if (!oldName && !newName) return
    if (oldName === newName) return

    if (typeof newName === 'string' && newName) {
        doElement.className = newName.toString()
    } else if (isArray(newName)) {
        let oldList = [...doElement.classList];
        oldList.forEach(c => {
            if (!newName.indexOf(c)) {
                doElement.classList.remove(c);
            }
        })
        newName.forEach(v => {
            doElement.classList.add(v)
        })
    } else {
        // 所有不合法的值或者空值，都把 className 设为 ''
        doElement.className = ''
    }
}

function initCreateAttr(vnode) {
    updateClassName(vnode);
    undateProps(vnode);
    undateStyle(vnode);
}

function updateAttrs(oldVnode, vnode) {
    updateClassName(vnode, oldVnode.props.className || oldVnode.props.class);
    undateProps(vnode, oldVnode.props.props);
    undateStyle(vnode, oldVnode.props.style);
}

export const styleApis = {
    undateStyle,
    undateProps,
    updateClassName,
    initCreateAttr,
    updateAttrs
};
  export default styleApis;