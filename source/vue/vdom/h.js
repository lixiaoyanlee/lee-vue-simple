/** 
 * h函数的主要工作就是把传入的参数封装为vnode
 */

import vnode from './vnode';
import {
  hasValidKey,
  isPrimitive, isArray
} from '../utils/utils'


const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * RESERVED_PROPS 要过滤的属性的字典对象
 * 在react源码中hasValidRef和hasValidKey方法用来校验config中是否存在ref和key属性，
 *  有的话就分别赋值给key和ref变量。 
 * 然后将config.__tagf和config.__source分别赋值给tagf和source变量， 如果不存在则为null。
 * 在本代码中先忽略掉ref、 __tagf、 __source这几个值
 */
const RESERVED_PROPS = {
  key: true,
  __tagf: true,
  __source: true
}
// 将原来的props通过for in循环重新添加到props对象中，
// 且过滤掉RESERVED_PROPS里边属性值为true的值
function getProps(props) {
  let config = {};
  props = props || {};
  const keys = Object.keys(props);
  if (keys.length == 0) {
    return config;
  }
  for (let propName in props) {
    if (hasOwnProperty.call(props, propName) && !RESERVED_PROPS[propName]) {
      config[propName] = props[propName]
    }
  }
  return config;
}

/**
 * 
 * @param {String} tag 选择器
 * @param {Object} props  属性对象
 * @param  {...any} children 子节点集合
 * @returns {{
   tag,
   props,
   children,
   key,
   text,
   elm}
 }
 */
function h(tag, config, ...children) {
  let props = {},c,text,key; 
  c = children || [];
  // 获取key
  key = hasValidKey(props) ? props.key : undefined;
  props = getProps(config);
  // 因为children也可能是一个深层的套了好几层h函数所以需要处理扁平化
  return vnode(tag, props, c.map(child => {
    return isPrimitive(child) ? vnode(undefined, undefined, undefined, undefined, child) : child
  }), key, text, undefined);
}
export default h;