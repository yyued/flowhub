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
import store from './event/store.js';


let _observer = { };

let _store = { };

module.exports = {

    /*
     * save the listening observer
     */
    observer: _observer,

    /*
     * emit to the observer
     */
    emit,

    /*
     * register to be an observer
     */
    listen,

    /*
     * remove the listener from the observer
     */
    removeListen,

    /*
     * save the store value in object
     */
    data: _store,

    /*
     * make the store proxyer
     */
    store: store( _store, _observer ),
}
