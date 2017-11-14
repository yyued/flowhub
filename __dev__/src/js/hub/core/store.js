/*
 * store proxy
 * @param {object} _store
 * @param {object} _observer
 * @return {Proxy} store
 */

'use strict';

export default function ( _store, _observer ) {
    return new Proxy({ }, {
        get: function ( target, key, receiver ) {
            return _store[ key ];
        },

        // TODO: support the complicated data type
        set: function ( target, key, value, receiver ) {
            // can not the same value
            if ( !( _store[ key ] && _store[ key ] == value ) ) {
                _store[ key ] = value;

                const observerStoreKey = `@store/${ key }`;

                if ( typeof _observer[ observerStoreKey ] !== 'undefined' ) {
                    _observer[ observerStoreKey ].forEach(( handler, index ) => {
                        handler( value );
                    });
                }
            }
        }
    });
}
