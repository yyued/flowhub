/*
 * listen event
 * @param {String} key
 * @param {Function} handler
 * @return {object} listener
 */
export default function (key, handler) {
  const { observer, data } = this

  const setKeyMap = _key => {
    if (typeof observer[_key] === 'undefined') {
      observer[_key] = []
    }

    observer[_key].push(handler)

    // if the listener is from the data store, first time retrun the data value.
    if (_key.indexOf('@store/') === 0) {
      const keySplit = _key.split('@store/')[1]
      if (typeof data[keySplit] !== 'undefined') {
        handler(data[keySplit])
      }
    }
  }

  // the listener
  const listener = {}

  listener.key = key

  if (key instanceof Array) {
    key.forEach(_key => setKeyMap(_key))

    listener.off = () => key.forEach(_key => this.off(_key, handler))
  } else {
    setKeyMap(key)
    listener.off = () => this.off(key, handler)
  }

  return listener
}
