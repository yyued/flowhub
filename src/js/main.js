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
const d1 = $hub.DOM('button').with('click', 'dom-click-event').with('mousedown', 'dom-mousedown-event');

// 监听对应的 DOM 事件流
$hub.listen('dom-click-event', ( e ) => {
    console.log( 'button click', e );
})

$hub.listen('dom-mousedown-event', ( e ) => {
    console.log( 'button mousedown', e );
})

setTimeout(function() {
    // 移除 DOM 监听事件，停止 发送事件流
    d1.remove();
}, 10000);

// ================ 绑定 fetch 事件流 ================
// const d2 = $hub.fetch('https://legox.org/mock/8f495a90-8659-11e7-a2a8-b9241e7b71e4').emit('fetch-event1').emit('fetch-event2');

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
// const d3 = $hub.WS('ws://legox.org:5353/a3e67a40-863c-11e7-9085-0ba4558c07dc').emit('ws-event1').emit('ws-event2');

// $hub.listen('ws-event1', ( result ) => {
//     console.log( 'ws1: ', result );
// })
// $hub.listen('ws-event2', ( result ) => {
//     console.log( 'ws2: ', result );
// })


// ================ IO ================
// const d4 = $hub.IO('http://legox.org:5353').with('mock', 'io-event1').with('mock', 'io-event2');

// d4.socket.emit('mock', {
//     key: 'a3e67a40-863c-11e7-9085-0ba4558c07dc',
//     time: 5000,
// })

// $hub.listen('io-event1', ( result ) => {
//     console.log( 'io1: ', result );
// })

// $hub.listen('io-event2', ( result ) => {
//     console.log( 'io2: ', result );
// })
