/*
 * emit event
 * @param {String} key
 * @param {Any} value
 * @return {void}
 */

'use strict';

const iterineChainer = async ( chainer, value ) => {
    for ( let _c of chainer ) {
        value = await _c( value );
    }
    return { data: value };
}

const toObserver = ( observer, key, value ) => {
    if ( typeof observer[ key ] !== 'undefined' ) {
        observer[ key ].forEach(( handler, index ) => {
            handler( value );
        });
    }
}

export default function ( key, value ) {
    const { observer, data, chainer } = this;

    if ( key.indexOf( '@store/' ) === 0 ) {
        const _key = key.split( '@store/' )[ 1 ];
        if ( typeof data[ _key ] !== 'undefined' ) {
            data[ _key ] = value;
        }
    }

    if ( key.indexOf( '@chain/' ) === 0 ) {
        const _key = key.split( '@chain/' )[ 1 ];
        if ( typeof chainer[ _key ] !== 'undefined' ) {
            iterineChainer( chainer[ _key ], value )
                .then(( { data } ) => {
                    toObserver( observer, key, data );
                })
                .catch(( e ) => {
                    throw e;
                })
            return void 0;
        }
    }

    toObserver( observer, key, value );
}
