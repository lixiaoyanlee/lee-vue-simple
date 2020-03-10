/**
 * 
 * 一些帮助工具公共方法
 */
export const emptyObject = Object.freeze({});

export function isTrue(v){
    return v === true
}

export function isFalse(v) {
    return v === false
}

export function isUndef(v){
    return v === undefined || v === null
}

export function isDef(v){
    return v !== undefined && v !== null
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

const _toString = Object.prototype.toString;

export function isRegExp(v){
    return _toString.call(v) === '[object RegExp]'
}

export function isPromise(val) {
    return (
        isDef(val) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function'
    )
}

// 是否有key，
/**
 * 
 * @param {Object} config 虚拟dom树上的属性对象
 */
export function hasValidKey(config) {
    config = config || {};
    return config.key !== undefined;
}
// 是否有ref，
/**
 * 
 * @param {Object} config 虚拟dom树上的属性对象
 */
export function hasValidRef(config) {
    config = config || {};
    return config.ref !== undefined;
}

/**
 * 确定是children中的是文本节点
 * @param {*} value 
 */
export function isPrimitive(value) {
    const type = typeof value;
    return type === 'number' || type === 'string' 
}
/**
 * 判断arr是不是数组
 * @param {Array} arr 
 */
export function isArray(arr) {
    return Array.isArray(arr);
}
// 删除数组arr中的item
export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
export function isFun(fun) {
    return typeof fun === 'function';
}

export function isStr(str){
    return typeof str === 'string';
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj , key) {
    return hasOwnProperty.call(obj, key)
}

// 一个对象的 __proto__ 属性指向了其构造函数的原型
// 从一个空的对象字面量开始沿着原型链逐级检查。
export const hasProto = '__proto__' in {}

// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
export function isReserved(str) {
    const c = (str + '').charCodeAt(0)
    return c === 0x24 || c === 0x5F
}

// 创造一个缓存函数 纯函数
export function cached(fn){
    const cache = Object.create(null)
    return (function cachedFn(str) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str))
    })
}

const camelizeRE = /-(\w)/g;
/** 定义正则表达式：/-(\w)/g，
 * 用来全局匹配字符串中
 * 中横线及连字符后的一个字符。
 * 若捕获到，则将字符以toUpperCase大写替换，否则以''替换。
 * 如：camelize('aa-bb') // aaBb
 * 
 */
export const camelize = cached((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * 驼峰转连字符
 * 实现方式同样是使用正则，
 *  / \B([A - Z])/g用来全局匹配字符串中的大写字母, 然后替换掉。
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str) =>{ 
    return str.replace(hyphenateRE, '-$1').toLowerCase()
})


