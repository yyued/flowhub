/*
 * DOM event
 * @param {String} dom
 * @param {String} event
 * @return {dispatcher | void}
 */

'use strict';

export default function ( dom, event ) {
    if ( dom ) {
        const DOM = document.body.querySelector( dom );

        if ( DOM ) {
            const { emit } = this;

            const dispatcher = { };

            let handler = void 0;

            // dispatcher can emit the native event flow
            dispatcher.emit = ( key, data ) => {
                handler = ( e ) => {
                    if ( data ) {
                        emit.bind( this )( key, { event: e, data, } );
                    }
                    else {
                        emit.bind( this )( key, e );
                    }
                }
                DOM.addEventListener(event, handler);
                return dispatcher;
            }

            // remove the native event, and stop event flow
            dispatcher.remove = ( ) => {
                DOM.removeEventListener(event, handler);
            }

            return dispatcher;
        }
    }
};
