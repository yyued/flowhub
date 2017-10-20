/*
 * chain event
 * @param {String} name
 * @return {object} chainer
 */

'use strict';

module.exports = function ( name ) {

    const { chainer } = this;

    const _chainer = { };

    _chainer.pipe = ( ...args ) => {
        chainer[ name ] = args;
    }

    return _chainer;
};
