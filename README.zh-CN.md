# hub.js

[![](https://img.shields.io/badge/npm-v0.1.2-green.svg)](https://www.npmjs.org/package/hub-js)
[![](https://img.shields.io/badge/size-%3C7kb-blue.svg)](https://www.npmjs.org/package/hub-js)
[![](https://img.shields.io/badge/Browser-%3E%3DIE8-blue.svg)](https://www.npmjs.org/package/hub-js)

通过简单的方式去处理来自 **自定义发布者** / **DOM 元素** / **Fetch 请求** / **WebSocket** / **socket io** 事件流。

## 为什么使用

[RxJS](https://github.com/reactivex/rxjs) 是一个很好的库去处理复杂的数据流，构成基于事件的程序。但对于一些中小型项目来说，就显得有点笨重了，并且对开发人员 需要一定的学习成本。

相对来说, **[hub.js](https://github.com/yyued/hub.js)** 显得更加简单，更加轻量 ( ungzip 仅 6kb )。它能满足绝大部分情况事件驱动的情况，适合用于处理各种事件流。

## 安装

```sh
npm i hub-js --save
```

或者

```html
<script src="./dist/hub.min.js"></script>
```

## 简单使用
`npm i hub-js`

```js
import $hub from 'hub-js';

// register an event listener
$hub.listen('test', ( data ) => {
    console.log( 'test', data );
});

setInterval(( ) => {
    // send the 'test' event
    $hub.emit('test', { code: 1 });
}, 1000);
```

## 例子

[→ 基础用法](https://github.com/yyued/hub.js/blob/master/example/basic_use.html)

[→ store 值](https://github.com/yyued/hub.js/blob/master/example/store_value.html)

[→ DOM 元素原生事件](https://github.com/yyued/hub.js/blob/master/example/native_event_from_dom.html)

[→ Fetch 事件](https://github.com/yyued/hub.js/blob/master/example/fetch_event.html)

[→ WebSocket 事件](https://github.com/yyued/hub.js/blob/master/example/websocket_event.html)

[→ socket.io 事件](https://github.com/yyued/hub.js/blob/master/example/socket_io_event.html)

[→ 发送到链式处理](https://github.com/yyued/hub.js/blob/master/example/emit_chain.html)

[→ 转换器 与 链式组合](https://github.com/yyued/hub.js/blob/master/example/converter_chaining.html)

## 许可

MIT
