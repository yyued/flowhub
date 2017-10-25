/*
 * emit event
 * @param {String} key
 * @param {Any} value
 * @return {void}
 */

'use strict';

const util = require('./util');

const iterineChainer = ( chainer, value, callback ) => {
    util.iterator(chainer, ( _c , next ) => {
        util.await( _c( value ), ( data ) => {
            value = data;
            next();
        })
    }, ( ) => {
        callback( value );
    })
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
            iterineChainer( chainer[ _key ], value, ( data ) => {
                toObserver( observer, key, data );
            });
            return void 0;
        }
    }

    toObserver( observer, key, value );
}
