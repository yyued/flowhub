# hub.js

Through a simple way to deal with the event flow.

## Simple Usage

```js
import $hub from './hub.min.js';

// register an event listener
$hub.listen('test', ( data ) => {
    console.log( 'test', data );
});

setInterval(() => {
    // send the 'test' event
    $hub.emit('test', { code: 1 });
}, 1000);
```

## Example

[→ simple example](https://github.com/yyued/hub.js/blob/master/example/index.html)

## License

MIT
