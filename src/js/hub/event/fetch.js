/*
 * fetch event
 * @param {String} url
 * @param {void | object} args
 * @return {dispatcher | void}
 */

'use strict';

export default function ( url, args = { } ) {
    if ( url ) {

        const { emit } = this;

        const dispatcher = { };

        let handler = void 0;

        let reloadHandler = void 0;

        // send the HTTP request by fetch, and fetch data flow
        dispatcher.emit = ( key, data ) => {
            handler = ( result ) => {
                if ( data ) {
                    emit.bind( this )( key, { result, data, } );
                }
                else {
                    emit.bind( this )( key, result );
                }
            }

            reloadHandler = () => {
                fetch( url, args )
                    .then(( res ) => {
                        handler( res );
                    })
                    .catch(( err ) => {
                        handler( err );
                    });
            }

            dispatcher.reload = reloadHandler;

            reloadHandler();

            return dispatcher;
        }

        return dispatcher;
    }
};
