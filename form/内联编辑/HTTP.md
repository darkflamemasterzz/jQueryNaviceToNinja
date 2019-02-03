https://developer.mozilla.org/zh-CN/docs/Web/HTTP

应用层 **TCP** **UDP** 

## HTTP 概述



HTTP是一个client-server协议：请求通过一个实体被发出，实体也就是*用户代理（浏览器、机械爬虫）*。

在这个请求与响应之间，还有许许多多的被称为*[proxies](https://developer.mozilla.org/zh-CN/docs/Glossary/Proxy)的实体*，他们的作用与表现各不相同，比如有些是*网关*，*还有些是**[caches](https://developer.mozilla.org/en-US/docs/Glossary/Cache)*等。



## HTTP的基本性质

在 HTTP/1.0 中出现的 ***HTTP headers*** 让协议扩展变得非常容易。只要***服务端和客户端就新 headers 达成语义一致，新功能就可以被轻松加入进来。***



TCP是可靠的，而UDP不是。因此，HTTP依赖于面向连接的TCP进行消息传递，但连接并不是必须的。

但当多个消息周期性发送时，这样就变得更加高效：暖连接比冷连接更高效。

HTTP/1.1引入了流水线（被证明难以实现）和持久连接的概念：底层的TCP连接可以通过[`Connection`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection)头部来被部分控制。**HTTP/2**则发展得更远，通过在一个连接复用消息的方式来让这个连接始终保持为暖连接。 

QUIC。



## HTTP报文



........好多看不懂，看书去吧



## 书

https://zhuanlan.zhihu.com/p/51747107

plus:《TCP/IP》详解











