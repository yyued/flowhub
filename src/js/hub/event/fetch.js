/*
 * fetch event srouce
 * @param {String} url
 * @param {void | object} args
 * @return {dispatcher | void}
 */

'use strict';

export default function ( url, args = { } ) {
    if ( url ) {

        const { emit } = this;

        let handler = [];

        let timer = void 0;

        let runHandler = ( data ) => {
            handler.forEach(( _h ) => {
                _h( data );
            })
        }

        const dispatcher = [];

        let reloadHandler = void 0;

        // send the HTTP request by fetch, and fetch data flow
        dispatcher.emit = ( key, data ) => {
            handler.push(( result ) => {
                if ( data ) {
                    emit.bind( this )( key, { result, data, } );
                }
                else {
                    emit.bind( this )( key, result );
                }
            })

            // 多次 emit 去抖
            if ( timer ) {
                clearTimeout( timer );
            }
            timer = setTimeout(() => {
                dispatcher.reload();
            }, 0);

            return dispatcher;
        }

        dispatcher.reload = () => {
            fetch( url, args )
                .then(( res ) => {
                    if ( res.status === 200 && res.json ) {
                        res.json().then( data => runHandler( data ) );
                    }
                    else {
                        runHandler( res );
                    }
                })
                .catch(( err ) => {
                    runHandler( err );
                });
        }

        return dispatcher;
    }
};
