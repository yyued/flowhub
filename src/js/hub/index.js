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
 * DOM event
 */
import DOM from './event/DOM';

let _observer = { };

let _store = { };

module.exports = {

    /*
     * save the listening observer
     */
    observer: _observer,

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
     * save the store value in object
     * @param {String} key
     * @param {Function} handler
     * @return {void}
     */
    data: _store,

    /*
     * make the store proxyer
     * @param {object} _store
     * @param {object} _observer
     * @return {Proxy} store
     */
    store: store( _store, _observer ),

    /*
     * listen DOM native event to emit event flow
     * @param {String} dom
     * @param {String} event
     * @return {dispatcher | void}
     */
    DOM,
}
