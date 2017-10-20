# hub.js

通过简单的方式去处理来自 **自定义发布者** / **DOM 元素** / **Fetch 请求** / **WebSocket** / **socket io** 事件流。

## 安装

```sh
npm i hub-js
```

或者

```html
<script src="./dist/index.min.js"></script>
```

## 简单使用
`npm i hub-js`

```js
import $hub from 'hub-js';

// register an event listener
$hub.listen('test', ( data ) => {
    console.log( 'test', data );
});

setInterval(() => {
    // send the 'test' event
    $hub.emit('test', { code: 1 });
}, 1000);
```

## 例子

[→ 基础用法](https://github.com/yyued/hub.js/blob/master/example/basic_use.html)

[→ store 值](https://github.com/yyued/hub.js/blob/master/example/store_value.html)

[→ DOM 元素原生事件](https://github.com/yyued/hub.js/blob/master/example/native_event_from_dom.html)

[→ fetch 事件](https://github.com/yyued/hub.js/blob/master/example/fetch_event.html)

[→ WebSocket 事件](https://github.com/yyued/hub.js/blob/master/example/websocket_event.html)

[→ socket.io 事件](https://github.com/yyued/hub.js/blob/master/example/socket_io_event.html)

[→ 发送到链式处理](https://github.com/yyued/hub.js/blob/master/example/emit_chain.html)

[→ 转换器 与 链式组合](https://github.com/yyued/hub.js/blob/master/example/converter_chaining.html)

## 许可

MIT
