import $hub from './hub';

// ================ 基本 ================
// const handler = ( data ) => {
//     console.log( 'handler', data );
// }

// // 监听 test 事件流
// const listener = $hub.on( [ 'test' ] , handler );

// $hub.once('test', ( data ) => {
//     console.info( 'once >>>>>>>>', data );
// });

// // 设置 store 值
// $hub.store.code = 1;

// // 监听 store 里具体 某个数值
// // 若 这个数值已存在 “当前值”，则监听成功后，立即返回 “当前值”，就像 Rx.BehaviorSubject
// $hub.on('@store/code', ( code ) => {
//     console.log( 'store code', code );
// })

// const timer = setInterval(() => {
//     // $hub.emit('@store/code', 1);
//     ++$hub.store.code;

//     // 触发 test 事件流
//     $hub.emit( [ 'test' ], { code: 1 } );

//     if ( $hub.store.code === 5 ) {
//         clearInterval( timer );

//         // 移除监听 test 事件流
//         $hub.off('test', handler);
//         // listener.off();
//         // listener.off();
//     }
// }, 1000);

// // ================ 绑定 DOM 事件流 ================

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

// // const d1 = $hub.DOM('button')
// const d1 = $hub.DOM('button')
//     .from('click').convert('DOMEventFormat1').emit('dom-click-event')
//     .from('mousedown').convert('DOMEventFormat2').emit('dom-mousedown-event');


// // 监听对应的 DOM 事件流
// $hub.on('dom-click-event', ( e ) => {
//     console.log( 'button click', e );
// })

// $hub.on('dom-mousedown-event', ( e ) => {
//     console.log( 'button mousedown', e );
// })

// setTimeout(function() {
//     console.log( '---------- off ----------' );
//     // 移除 DOM 监听事件，停止 发送事件流
//     d1.off();
// }, 10000);

// ================ 绑定 Fetch 事件流 ================

// // 格式处理器
// $hub.converter.FetchEventFormat1 = function ( data ) {
//     return data.code;
// }

// $hub.converter.FetchEventFormat2 = function ( data ) {
//     return new Promise(( resolve, reject ) => {
//        setTimeout(function() {
//             resolve( ++data );
//        }, 2000);
//     });
// }

// const d2 = $hub.Fetch('https://legox.org/mock/8f495a90-8659-11e7-a2a8-b9241e7b71e4')
// // .emit('fetch-event1')
// .convert('FetchEventFormat1').convert('FetchEventFormat2').emit('fetch-event2');

// // setTimeout(() => {
// //     // 刷新 fetch 事件流
// //     d2.reload();
// // }, 2000);

// // 监听对应的 fetch 事件流
// // $hub.on('fetch-event1', ( result ) => {
// //     console.log( 'fetch1: ', result);
// // })
// $hub.on('fetch-event2', ( result ) => {
//     console.log( 'fetch2-1: ', result);
// })

// $hub.on('fetch-event2', ( result ) => {
//     console.log( 'fetch2-2: ', result);
// })

// ================ WS ================

// // 格式处理器
// $hub.converter.WSEventFormat = function ( data ) {
//     return new Promise(( resolve, reject ) => {
//         setTimeout(() => {
//             resolve( data.code );
//         }, 1000);
//     });
// }

// const d3 = $hub.WS('ws://legox.org:5353/a3e67a40-863c-11e7-9085-0ba4558c07dc/1000').emit('ws-event1')
// .convert('WSEventFormat').emit('ws-event2');

// $hub.on('ws-event1', ( result ) => {
//     console.log( 'ws1: ', result );
// })
// $hub.on('ws-event2', ( result ) => {
//     console.log( 'ws2: ', result );
// })

// setTimeout(function ( ) {
//     d3.off();
// }, 3000);


// ================ IO ================


// 格式处理器
$hub.converter.IOEventFormat = function ( data ) {
    return new Promise(( resolve, reject ) => {
        setTimeout(( ) => {
            resolve( data.code );
        }, 1000);
    });
}

const d4 = $hub.IO('http://legox.org:5353').from('mock').convert('IOEventFormat').emit('io-event');

d4.socket.emit('mock', {
    key: 'a3e67a40-863c-11e7-9085-0ba4558c07dc',
    time: 1000,
})

$hub.on('io-event', ( result ) => {
    console.log( 'io: ', result );
})

setTimeout(function() {
    d4.off();
}, 3000);

// ================ Chain ================

// $hub.chain('test').pipe(
//     ( d ) => new Promise( ( resolve ) => setTimeout( () => resolve( d + 1 ), 2000 ) ),
//     ( d ) => d + 2,
//     ( d ) => d + 3,
// ).pipe(
//     ( d ) => d + 3,
// ).pipe(
//     ( d, exit ) => {
//         if ( d > 10 ) {
//             exit( 'error > 10' );
//         }
//         else {
//             return d;
//         }
//     }
// )

// $hub.on('@chain/test', ( d ) => {
//     console.log( d );
// }, ( e ) => {
//     // exit callback
//     console.error( e );
// }, ( ) => {
//     // finally callback
//     console.info( 'finally.' );
// })

// $hub.emit( '@chain/test', 1 ); // 10

// setTimeout(( ) => {
//     $hub.emit( '@chain/test', 3 );
// }, 3000);
