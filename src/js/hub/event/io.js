/*
 * socket.io event srouce
 * @param {SFKey} the key of socket
 * @param {String} url
 * @return {dispatcher | void}
 */

'use strict';

export default function ( SFKey, url ) {
    const { emit, socket, converter } = this;

    if ( !url ) {
        url = SFKey;
    }

    if ( url ) {
        const _socket = io( url );

        socket.io.push({
            key: SFKey,
            url,
            socket,
        })

        const dispatcher = { };

        let _converter = void 0;

        dispatcher.convert = ( key ) => {
            if ( converter[ key ] ) {
                _converter = converter[ key ];
            }
            return dispatcher;
        }

        dispatcher.socket = _socket;

        dispatcher.with = ( SKey, key, data ) => {
            const handler = async ( result ) => {
                if ( _converter ) {
                    result = await _converter( result );
                }

                if ( data ) {
                    emit.bind( this )( key, { result, data, } );
                }
                else {
                    emit.bind( this )( key, result );
                }
            }

            _socket.on(SKey, function ( res ) {
                try {
                    handler( JSON.parse( res ) );
                } catch ( e ) {
                    handler( res );
                }
            });

            return dispatcher;
        }

        return dispatcher;
    }
};
