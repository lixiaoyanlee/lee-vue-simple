
/** DOM 操作的方法
 * 元素/节点 的 创建、删除、判断等
 */

 function createElement(tagName){
    return document.createElement(tagName);
 }

 function createTextNode(text) {
     return document.createTextNode(text);
 }

export function isElement(node) {
    return node.nodeType === 1
}

export function isText(node) {
    return node.nodeType === 3
}
/**
 *
 *
 * @param {*} parentNode
 * @param {*} newNode
 * @param {
     *
 }
 referenceNode 在Chrome浏览器下， 如果不指定referenceNode的话， 将会报错。
 当传入null时， 新插入的元素将会插入到父元素的子元素列表末尾。
 */
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode)
}

function removeChild(node, child) {
    node.removeChild(child)
}

function appendChild(node, child) {
    node.appendChild(child)
}

function parentNode(node) {
    return node.parentNode
}

function nextSibling(node) {
    return node.nextSibling
}

function tagName(elm) {
    return elm.tagName
}

function setTextContent(node, text) {
    node.textContent = text
}

function getTextContent(node) {
    return node.textContent
}



function setAttribute(node,key,value) {
    node.setAttribute(key, value);
}

function setStyleContent(node, styleObj) {
    // styleObj = {'fontSize':'12px','color':'red'} ->
    // cssText : 'font-size:12px;color:red'
     let cssText = Object.keys(styleObj).map(attr => {
         return `${attr.replace(/([A-Z])/g,function(){ return"-"+arguments[1].toLowerCase()})}:${styleObj[attr]}`;
     }).join(';');

     node.style.cssText = cssText;
}
export const htmlApi = {
    createElement,
    createTextNode,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    getTextContent,
    setAttribute,
    isElement,
    isText
}
 export default htmlApi;