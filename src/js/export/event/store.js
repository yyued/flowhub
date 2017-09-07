/*
 * store proxy
 */

'use strict';

export default function ( _store, _observer ) {
    return new Proxy({ }, {
        get: function ( target, key, receiver ) {
            return _store[ key ];
        },
        set: function ( target, key, value, receiver ) {
            _store[ key ] = value;

            const observerStoreKey = `@store/${ key }`;

            if ( typeof _observer[ observerStoreKey ] !== 'undefined' ) {
                _observer[ observerStoreKey ].forEach(( handler, index ) => {
                	handler( value );
                });
            }
        }
    });
}
