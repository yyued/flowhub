/*
 * socket.io event srouce
 * @param {String} url
 * @return {dispatcher | void}
 */

'use strict';

export default function ( url ) {
    const { emit, socket, converter } = this;

    if ( url ) {
        const dispatcher = { };

        let queue = [ ];

        const _socket = io( url );

        dispatcher.socket = _socket;

        socket.io.push({
            url,
            socket,
        })

        // 出队列
        let exec = async ( key, result ) => {
            let index = void 0;

            queue.forEach(( item, _index ) => {
                if ( item.type === '__from__' && item.func === key ) {
                    index = _index;
                }
            })

            if ( typeof index !== 'undefined' ) {
                const _q = queue.slice( index + 1, queue.length );

                if ( _q.length > 0 ) {
                    let _result = result;
                    let isBreak = false;

                    for ( _i of _q ) {
                        if ( isBreak ) {
                            break;
                        }

                        switch ( _i.type ) {
                            case '__convert__': {
                                _result = await _i.func( _result );
                                break;
                            }
                            case '__emit__': {
                                _i.func( _result );
                                break;
                            }
                            case '__from__': {
                                isBreak = true;
                                break;
                            }
                        }
                    }
                }
            }
        }

        dispatcher.convert = ( key ) => {
            if ( converter[ key ] ) {
                queue.push({
                    type: '__convert__',
                    func: converter[ key ],
                });
            }
            return dispatcher;
        }

        dispatcher.from = ( key ) => {
            let _eventListener = ( result ) => {
                exec( key, result );
            }

            queue.push({
                type: '__from__',
                func: key,
                _eventListener,
            })

            _socket.on( key, _eventListener );

            return dispatcher;
        }

        dispatcher.emit = ( key, data ) => {
            queue.push({
                type: '__emit__',
                func: ( e ) => {
                    if ( data ) {
                        emit.bind( this )( key, { event: e, data, } );
                    }
                    else {
                        emit.bind( this )( key, e );
                    }
                },
            })

            return dispatcher;
        }

        dispatcher.remove = () => {
            queue.forEach(( item, index ) => {
            	if ( item.type === '__from__' ) {
                    _socket.off( item.func, item._eventListener );
                }
            });
        }

        return dispatcher;
    }
};
