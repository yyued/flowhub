'use strict';

/*
 * emit event
 */
import emit from './core/emit';

/*
 * listen event
 */
import listen from './core/listen';

/*
 * removeListen event
 */
import removeListen from './core/remove_listen';

/*
 * store proxy
 */
import store from './core/store';

/*
 * DOM event srouce
 */
import DOM from './core/dom';

/*
 * fetch event srouce
 */
import Fetch from './core/fetch';

/*
 * socket.io event srouce
 */
import IO from './core/io';

/*
 * websocket event
 */
import WS from './core/ws';

/*
 * chain event
 */
import chain from './core/chain';

let _observer = { };

// 用于存储一些持久化链接
let _socket = {
    ws: [ ],
    io: [ ],
};

let _store = { };

let _converter = { };

let _chainer = { };

module.exports = {

    /*
     * save the listening observer
     */
    observer: _observer,

    /*
     * save the store value in object
     */
    data: _store,

    chainer: _chainer,

    /*
     * save the socket ( WS / IO )
     */
    socket: _socket,

    /*
     * emit to the observer
     * @param {String} key
     * @param {Any} value
     * @return {void}
     */
    emit,

    /*
     * register to be an observer
     * @param {String} key
     * @param {Function} handler
     * @return {object} listener
     */
    listen,

    /*
     * remove the listener from the observer
     */
    removeListen,

    /*
     * build the store proxyer
     * @param {object} _store
     * @param {object} _observer
     * @return {Proxy} store
     */
    store: store( _store, _observer ),

    /*
     * listen native event from DOM element, and emit event flow
     * @param {String} dom
     * @return {dispatcher | void}
     */
    DOM,

    /*
     * fetch event source
     * @param {String} url
     * @param {void | object} args
     * @return {dispatcher | void}
     */
    Fetch,

    /*
     * WebSocket event can emit flow to the listener.
     * @param {SFKey} the key of socket
     * @param {String} url
     * @return {dispatcher | void}
     */
    WS,

    /*
     * socket.io event can emit flow to the listener.
     * @param {SFKey} the key of socket
     * @param {String} url
     * @return {dispatcher | void}
     */
    IO,

    /*
     * chain event
     * @param {String} name
     * @return {object} chainer
     */
    chain,

    converter: _converter,

}
