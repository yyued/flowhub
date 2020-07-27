/*
 * off event
 * @param {String} key
 * @param {Function} handler
 * @return {void}
 */
export default function (key, handler) {
  const { observer } = this

  const offObserver = _key => {
    if (typeof observer[_key] !== 'undefined') {
      observer[_key].forEach((_handler, index) => {
        if (_handler === handler) {
          observer[_key].splice(index, 1)
        }
      })
    }
  }

  if (key instanceof Array) {
    key.forEach(_key => offObserver(_key))
  } else {
    offObserver(key)
  }
}
