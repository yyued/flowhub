/*
 * listen event
 */

'use strict';

export default function ( key, handler ) {
    const { observer, data } = this;

    if ( typeof observer[ key ] === 'undefined' ) {
        observer[ key ] = [ ];
    }

    observer[ key ].push( handler );

    // if the listener is from the data store, first time retrun the data value.
    if ( key.indexOf( '@store/' ) === 0 ) {
        const _key = key.split( '@store/' )[ 1 ];
        if ( typeof data[ _key ] !== 'undefined' ) {
            handler( data[ _key ] );
        }
    }
};
