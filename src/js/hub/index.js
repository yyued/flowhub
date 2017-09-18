/**
 * @file: hub
 * @author: lijialiang
 * @team: UED中心
 * @export: umd
 * @export name: $hub
 * @export file: hub
 */

/*
 * emit event
 */
import emit from './event/emit';

/*
 * listen event
 */
import listen from './event/listen';

/*
 * removeListen event
 */
import removeListen from './event/removeListen';

/*
 * store proxy
 */
import store from './event/store';

/*
 * DOM event srouce
 */
import DOM from './event/dom';

/*
 * fetch event srouce
 */
import Fetch from './event/fetch';

/*
 * socket.io event srouce
 */
import IO from './event/io';

/*
 * websocket event
 */
import WS from './event/ws';

let _observer = { };

// 用于存储一些持久化链接
let _socket = {
    ws: [ ],
    io: [ ],
};

let _store = { };

let _converter = { };

module.exports = {

    /*
     * save the listening observer
     */
    observer: _observer,

    /*
     * save the store value in object
     */
    data: _store,

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

    converter: _converter,
}
