/*
 * emit event
 */

'use strict';

export default function ( key, value ) {
    const { observer, data } = this;

    if ( key.indexOf( '@store/' ) === 0 ) {
        const _key = key.split( '@store/' )[ 1 ];
        if ( typeof data[ _key ] !== 'undefined' ) {
            data[ _key ] = value;
        }
    }

    if ( typeof observer[ key ] !== 'undefined' ) {
        observer[ key ].forEach(( handler, index ) => {
            handler( value );
        });
    }
}
