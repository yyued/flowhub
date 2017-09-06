/*
 * listen event
 */

'use strict';

export default function ( key: string, handler: Function ): void {
    const { observer } = this;

    if ( typeof observer[ key ] === 'undefined' ) {
        observer[ key ] = [ ];
    }

    observer[ key ].push( handler );
};
