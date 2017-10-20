# hub.js

Through a simple way to deal with the event streams from **customized dispatcher** / **DOM element** / **Fetch request** / **WebSocket** / **socket io**.

[中文](./README.zh-CN.md)

## Why

[RxJS](https://github.com/reactivex/rxjs) is a good tool to handle complex data streams that make up the event-based programs. But for some small and medium-sized projects, it is a bit cumbersome, and it requires a certain amount of learning costs for developers.

In contrast, **hub.js** is more simpler and lightweight ( ungzip only 6kb ). It satisfies most of the situation event-driven situation, suitable for dealing with a variety of  event streams.

## Installing

```sh
npm i hub-js
```

or

```html
<script src="./dist/hub.min.js"></script>
```

## Simple Usage

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

## Example

[→ basic use](https://github.com/yyued/hub.js/blob/master/example/basic_use.html)

[→ store value](https://github.com/yyued/hub.js/blob/master/example/store_value.html)

[→ native event from DOM](https://github.com/yyued/hub.js/blob/master/example/native_event_from_dom.html)

[→ Fetch event](https://github.com/yyued/hub.js/blob/master/example/fetch_event.html)

[→ WebSocket event](https://github.com/yyued/hub.js/blob/master/example/websocket_event.html)

[→ socket.io event](https://github.com/yyued/hub.js/blob/master/example/socket_io_event.html)

[→ emit chain](https://github.com/yyued/hub.js/blob/master/example/emit_chain.html)

[→ the converter & the chainning](https://github.com/yyued/hub.js/blob/master/example/converter_chaining.html)

## License

MIT
