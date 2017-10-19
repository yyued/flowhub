import $hub from './hub';

// ================ 基本 ================
// const handler = ( data ) => {
//     console.log( 'handler', data );
// }

// // 监听 test 事件流
// const listener = $hub.listen('test', handler);

// // 设置 store 值
// $hub.store.code = 1;

// // 监听 store 里具体 某个数值
// // 若 这个数值已存在 “当前值”，则监听成功后，立即返回 “当前值”，就像 Rx.BehaviorSubject
// $hub.listen('@store/code', ( code ) => {
//     console.log( 'store code', code );
// })

// const timer = setInterval(() => {
//     // $hub.emit('@store/code', 1);
//     ++$hub.store.code;

//     // 触发 test 事件流
//     $hub.emit('test', { code: 1 });

//     if ( $hub.store.code === 5 ) {
//         clearInterval( timer );

//         // 移除监听 test 事件流
//         // $hub.removeListen('test', handler);
//         listener.remove();
//     }
// }, 1000);

// ================ 绑定 DOM 事件流 ================

// // 格式处理器
// $hub.converter.DOMEventFormat1 = function ( e ) {
//     return new Promise((resolve, reject) => {
//         setTimeout(function() {
//             resolve( [ e.type, e.target ] );
//         }, 2000);
//     })
// }
// $hub.converter.DOMEventFormat2 = function ( e ) {
//     return [ e.target, e.type ];
// }

// const d1 = $hub.DOM('button').from('click').convert('DOMEventFormat1').emit('dom-click-event').from('mousedown').convert('DOMEventFormat2').emit('dom-mousedown-event');

// // 监听对应的 DOM 事件流
// $hub.listen('dom-click-event', ( e ) => {
//     console.log( 'button click', e );
// })

// $hub.listen('dom-mousedown-event', ( e ) => {
//     console.log( 'button mousedown', e );
// })

// setTimeout(function() {
//     console.log( '---------- remove ----------' );
//     // 移除 DOM 监听事件，停止 发送事件流
//     d1.remove();
// }, 10000);

// ================ 绑定 Fetch 事件流 ================

// // 格式处理器
// $hub.converter.FetchEventFormat = function ( data ) {
//     return data.code;
// }

// const d2 = $hub.Fetch('https://legox.org/mock/8f495a90-8659-11e7-a2a8-b9241e7b71e4').emit('fetch-event1').convert('FetchEventFormat').emit('fetch-event2');

// setTimeout(() => {
//     // 刷新 fetch 事件流
//     d2.reload();
// }, 2000);

// // 监听对应的 fetch 事件流
// $hub.listen('fetch-event1', ( result ) => {
//     console.log( 'fetch1: ', result);
// })
// $hub.listen('fetch-event2', ( result ) => {
//     console.log( 'fetch2: ', result);
// })

// ================ WS ================

// // 格式处理器
// $hub.converter.WSEventFormat = function ( data ) {
//     return data.code;
// }

// const d3 = $hub.WS('ws://legox.org:5353/a3e67a40-863c-11e7-9085-0ba4558c07dc/1000').emit('ws-event1').convert('WSEventFormat').emit('ws-event2');

// $hub.listen('ws-event1', ( result ) => {
//     console.log( 'ws1: ', result );
// })
// $hub.listen('ws-event2', ( result ) => {
//     console.log( 'ws2: ', result );
// })

// setTimeout(function ( ) {
//     d3.remove();
// }, 3000);


// ================ IO ================


// // 格式处理器
// $hub.converter.IOEventFormat = function ( data ) {
//     return data.code;
// }

// const d4 = $hub.IO('http://legox.org:5353').from('mock').convert('IOEventFormat').emit('io-event');

// d4.socket.emit('mock', {
//     key: 'a3e67a40-863c-11e7-9085-0ba4558c07dc',
//     time: 1000,
// })

// $hub.listen('io-event', ( result ) => {
//     console.log( 'io: ', result );
// })

// setTimeout(function() {
//     d4.remove();
// }, 3000);

// ================ Chain ================

$hub.chain('test').pipe(
    ( d ) => new Promise( ( resolve ) => setTimeout( () => resolve( d + 1 ), 2000 ) ),
    ( d ) => d + 2,
    ( d ) => d + 3,
)

$hub.listen('@chain/test', ( d ) => {
    console.log( d );
})

$hub.emit( '@chain/test', 1 ); // 7
