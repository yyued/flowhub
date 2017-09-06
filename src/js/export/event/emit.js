/*
 * emit event
 */

'use strict';

export default function ( key: string, data: any ): void {
    const { observer } = this;

    if ( typeof observer[ key ] !== 'undefined' ) {
        observer[ key ].forEach(( handler, index ) => {
            handler( data );
        });
    }
}
