<h1 align="center"> hub.js </h1>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="Licence" src="https://img.shields.io/badge/license-MIT-green.svg" />
  </a>
  <a href="https://www.npmjs.org/package/hub-js">
    <img alt="NPM" src="https://img.shields.io/badge/npm-v0.2.1-brightgreen.svg" />
  </a>
  <a href="">
    <img alt="Size" src="https://img.shields.io/badge/size-7kb-blue.svg" />
  </a>
</p>

## Why

hub.js is more simpler and lightweight (gzip 2kb). It satisfies most of the situation event-driven situation, suitable for dealing with a variety of  event streams.

For frameworks of component systems, such as React, Vue.js, etc., communication between non parent and child components is a bothering thing, but it can be made easy by using hub.js.

[简体中文](./README.zh-CN.md)

## Installing

```sh
npm i hub-js --save
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/hub-js/dist/hub.min.js"></script>
```

## Simple Usage

```js
import $hub from 'hub-js';

// register an event listener
$hub.on('test', data => console.log('test', data))

setInterval(() => {
  // send the 'test' event
  $hub.emit('test', { code: 1 })
}, 1000)
```

## More

### Remove listener

```js
const listener = $hub.on('test', data => console.log(data))

$hub.emit('test', { code: 1 })

listener.off()
// or
// $hub.off('test', listener)

$hub.emit('test', { code: 2 })
```

### once

```js
const listener = $hub.once('test', data => console.log(data))

$hub.emit('test', { code: 1 })

$hub.emit('test', { code: 2 })
```

### Multiple

```js
const listener = $hub.on(['test', 'test-1', 'test-2'], data => console.log(data))


$hub.emit(['test', 'test-1', 'test-2'], { code: 1 })

listener.off()
// or
// $hub.off([ 'test', 'test-1' ], listener)

$hub.emit(['test', 'test-1', 'test-2'], { code: 2 })
```

Note that, the listener receives each time the adapted event source occurs. For example, the above example will produce three logs.


### Store

```js
// set store value
$hub.store.code = 1

// listen store  value
// if this value already has a "current value," the listener immediately returns the "current value," just as Rx.BehaviorSubject
$hub.on('@store/code', data => console.log('store code', data)

setInterval(() => {
  ++$hub.store.code
  // o
  // hub.emit('@store/code', 1)
}, 1000)
```

### DOM Element

```js
const dispatcher = $hub.DOM('button')
                        .from('click').emit('dom-click-event')
                        .from('mousedown').emit('dom-mousedown-event')

$hub.on('dom-click-event', event => console.log('button click', event))
$hub.on('dom-mousedown-event', event => console.log('button mousedown', event))
setTimeout(dispatcher.off, 10000)
```

### Fetch

```js
const dispatcher = $hub.Fetch('https://legox.org/mock/8f495a90-8659-11e7-a2a8-b9241e7b71e4')
                        .emit('fetch-event1')
                        .emit('fetch-event2')

setTimeout(dispatcher.reload, 2000)

$hub.on('fetch-event1', result => console.log('fetch1', result))
$hub.on('fetch-event2', result => console.log('fetch2', result))
```

### WebSocket

```js
const dispatcher = $hub.WS('ws://legox.org:5353/a3e67a40-863c-11e7-9085-0ba4558c07dc/1000')
                        .emit('ws-event1')
                        .emit('ws-event2')

$hub.on('ws-event1', result => console.log('ws1: ', result))
$hub.on('ws-event2', result => console.log('ws2: ', result))

setTimeout(dispatcher.off, 3000)
```

### socket.io

```html
<script src="./lib/socket.io.min.js"></script>

<script>
const dispatcher = $hub.IO('http://legox.org:5353')
                        .from('mock')
                        .emit('io-event')

dispatcher.socket.emit('mock', {
  key: 'a3e67a40-863c-11e7-9085-0ba4558c07dc',
  time: 1000
})

$hub.on('io-event', result => console.log('io:', result))

setTimeout(dispatcher.off, 3000)
</script>
```

### Chain Pipe

```js
$hub.chain('test')
        .pipe(
          d => new Promise((resolve) => setTimeout(() => resolve(d + 1), 2000)),
          d => d + 2,
          d => d + 3
        )
        .pipe(
          d => d + 3
        )

$hub.on('@chain/test', d => console.log(d))

$hub.emit('@chain/test', 1) // 10
```

### Chaining & Converter

```js
// register converter
$hub.converter.DOMEventFormat1 = function (event) {
  return [e.type, e.target]
}
$hub.converter.DOMEventFormat2 = function (event) {
  return [e.target, e.type]
}

// you can control the convection by free combination of chaining, so as to get the effect you want.
const dispatcher = $hub.DOM('button')
                        .from('click').convert('DOMEventFormat1').emit('dom-click-event')
                        .from('mousedown').convert('DOMEventFormat1').emit('dom-mousedown-event')
// or
// $hub.DOM('button').from('click').convert('DOMEventFormat1').emit('dom-click-event1').emit('dom-click-event2')
// $hub.DOM('button').from('click').convert('DOMEventFormat1').convert('DOMEventFormat2').emit('dom-click-event1')

// other
// $hub.Fetch('https://xxx').emit('e1').convert('converter').emit('e2')
// $hub.WS('ws://xxx').emit('e1').convert('converter').emit('e2')
// $hub.IO('https://xxx').from('x1').convert('converter').emit('e1').from('x2').emit('e1')

$hub.on('dom-click-event', event => console.log('button click', event))

$hub.on('dom-mousedown-event', event => console.log('button mousedown', event))

setTimeout(dispatcher.off, 10000)
```

## Diff 0.1.x

* ~~$hub.listen~~ → $hub.on
* ~~$hub.removeListen~~ → $hub.off
* ~~listener.remove~~ → listener.off

## License

[MIT](./LICENSE)
