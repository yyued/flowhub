import $hub from './hub';

const handler = ( data ) => {
    console.log( 'handler', data );
}

// 监听 test 事件流
const listener = $hub.listen('test', handler);

// 设置 store 值
$hub.store.code = 1;

// 监听 store 里具体 某个数值
// 若 这个数值已存在 “当前值”，则监听成功后，立即返回 “当前值”，就像 Rx.BehaviorSubject
$hub.listen('@store/code', ( code ) => {
    console.log( 'store code', code );
})

const timer = setInterval(() => {
    // $hub.emit('@store/code', 1);
    ++$hub.store.code;

    // 触发 test 事件流
    $hub.emit('test', { code: 1 });

    if ( $hub.store.code === 5 ) {
        clearInterval( timer );

        // 移除监听 test 事件流
        // $hub.removeListen('test', handler);
        listener.remove();
    }
}, 1000);
