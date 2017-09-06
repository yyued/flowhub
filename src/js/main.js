import $hub from './export';

$hub.listen('test', ( data ) => {
    console.log( 'test', data );
})

setInterval(() => {
    $hub.emit('test', { code: 1 });
}, 1000);
