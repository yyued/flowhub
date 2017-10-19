/*
 * WebSocket event srouce
 * @param {String} url
 * @return {dispatcher | void}
 */

'use strict';

export default function ( url ) {
    const { emit, socket, converter } = this;

    if ( url ) {
        const dispatcher = { };

        let queue = [ ];

        const _socket = new WebSocket( url );

        socket.ws.push({
            url,
            socket,
        })

        dispatcher.socket = _socket;

        let _eventListener = ( res ) => {
            if ( res.data ) {
                try {
                    exec( JSON.parse( res.data ) );
                } catch ( e ) {
                    exec( res.data );
                }
            }
            else {
                exec( res );
            }
        };

        _socket.addEventListener('message', _eventListener);

        // 出队列
        let exec = async ( result ) => {
            if ( queue.length > 0 ) {
                let _result = result;

                for ( _i of queue ) {
                    switch ( _i.type ) {
                        case '__convert__': {
                            _result = await _i.func( _result );
                            break;
                        }
                        case '__emit__': {
                            _i.func( _result );
                            break;
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

        dispatcher.emit = ( key, data ) => {
            queue.push({
                type: '__emit__',
                func: ( result ) => {
                    if ( data ) {
                        emit.bind( this )( key, { result, data, } );
                    }
                    else {
                        emit.bind( this )( key, result );
                    }
                }
            })

            return dispatcher;
        }

        dispatcher.remove = () => {
            _socket.removeEventListener('message', _eventListener);
        }

        return dispatcher;
    }
};
