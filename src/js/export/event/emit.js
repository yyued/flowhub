/*
 * emit event
 */

'use strict';

export default function ( key, data ) {
    const { observer } = this;

    if ( typeof observer[ key ] !== 'undefined' ) {
        observer[ key ].forEach(( handler, index ) => {
            handler( data );
        });
    }
}
