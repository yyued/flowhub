'use strict';

export default function ( key, handler ) {
    const { observer, data, chainer } = this;

    const listener = this.on( key, ( data ) => {
        handler( data );

        listener.off( );
    })
}
