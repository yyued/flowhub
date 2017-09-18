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

            let queue = [ ];

            // 出队列
            let exec = async ( e ) => {
                const type = e.type;

                let index = void 0;

                queue.forEach(( item, _index ) => {
                    if ( item.type === '__from__' && item.func === type ) {
                        index = _index;
                    }
                })

                if ( typeof index !== 'undefined' ) {
                    const _q = queue.slice( index + 1, queue.length );

                    if ( _q.length > 0 ) {
                        let _e = e;
                        let isBreak = false;

                        for ( _i of _q ) {
                            if ( isBreak ) {
                                break;
                            }

                            switch ( _i.type ) {
                                case '__convert__': {
                                    _e = await _i.func( _e );
                                    break;
                                }
                                case '__emit__': {
                                    _i.func( _e );
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
                    })
                }
                return dispatcher;
            }

            dispatcher.from = ( type ) => {
                queue.push({
                    type: '__from__',
                    func: type,
                })

                DOM.addEventListener( type, exec );

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

            // remove the native event, and stop event flow
            dispatcher.remove = ( ) => {
                queue.forEach(( item, index ) => {
                	if ( item.type === '__from__' ) {
                        DOM.removeEventListener( item.func, exec );
                    }
                });
            }

            return dispatcher;
        }
    }
};
