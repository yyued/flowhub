/*
 * DOM event source
 * @param {String} dom
 * @return {dispatcher | void}
 */

'use strict';

export default function ( dom ) {
    if ( dom ) {
        let DOM = void 0;

        if ( typeof dom === 'string' ) {
            DOM = document.body.querySelector( dom );
        }
        else {
            DOM = dom;
        }

        if ( DOM ) {
            const { emit, format, converter } = this;

            const dispatcher = { };

            let handler = [];

            let _converter = void 0;

            dispatcher.convert = ( key ) => {
                if ( converter[ key ] ) {
                    _converter = converter[ key ];
                }
                return dispatcher;
            }

            // dispatcher can emit the native event flow
            dispatcher.with = ( type, key, data ) => {
                const _handler = async ( e ) => {
                    if ( _converter ) {
                        e = await _converter( e );
                    }

                    if ( data ) {
                        emit.bind( this )( key, { event: e, data, } );
                    }
                    else {
                        emit.bind( this )( key, e );
                    }
                }

                handler.push({
                    type,
                    handler: _handler,
                });

                DOM.addEventListener(type, _handler);

                return dispatcher;
            }

            // remove the native event, and stop event flow
            dispatcher.remove = ( ) => {
                handler.forEach(( { type: _t, handler: _h } ) => {
                    DOM.removeEventListener( _t, _h );
                })
            }

            return dispatcher;
        }
    }
};
