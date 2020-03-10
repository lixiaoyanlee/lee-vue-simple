# 原生js实现一版vue
## 主要实现Vue得两大核心点：MVVM和dom-diff；
你从本篇文章中可以学习到：一个库（说是库因为本篇文章中没有实现更多得路由、vuex等，都实现得话篇幅过长，后期会单独文章讲解，具体得去对说明实现原理和步骤）是怎么从无到有、用到得设计模式、工程化方式、目录结构等，自己下载vue查看源码不在愁；

你所能收获的知识：

- vue目录结构设计
- vue核心源码实现原理
- Vue得两大核心点：MVVM和dom-diff
- vue如何实现数据劫持、监听数据的读写？
- vue中观察者模式
- 计算属性和watch区别
- vue中数据的批量更新
- nextTick实现
- proxy

**本篇主要实现Vue得两大核心点：MVVM和dom-diff；**

如果不知道[MVVM](https://juejin.im/post/5cb706efe51d456e6865930a)是什么？可以查看： https://juejin.im/post/5cb706efe51d456e6865930a 

如果不知道[dom-diff](https://juejin.im/post/5e53aad46fb9a07ca5303d7d)是什么？可以查看我的文章： https://juejin.im/post/5e53aad46fb9a07ca5303d7d  都有具体的说明和实现过程。