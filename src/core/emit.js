/*
 * emit event
 * @param {String} key
 * @param {Any} value
 * @return {void}
 */
import util from './util'

const iterineChainer = (chainer, value, callback) => {
  util.iterator(chainer, (_c, next) => {
    util.await(_c(value), data => {
      value = data
      next()
    })
  }, () => {
    callback(value)
  })
}

const toObserver = (observer, key, value) => {
  if (typeof observer[key] !== 'undefined') {
    observer[key].forEach((handler, index) => {
      handler(value)
    })
  }
}

export default function (key, value) {
  const { observer, data, chainer } = this

  const keyToObserver = (_key) => {
    if (key.indexOf('@store/') === 0) {
      const keySplit = key.split('@store/')[1]
      if (typeof data[keySplit] !== 'undefined') {
        data[keySplit] = value
      }
    }

    if (key.indexOf('@chain/') === 0) {
      const keySplit = key.split('@chain/')[1]
      if (typeof chainer[keySplit] !== 'undefined') {
        iterineChainer(chainer[keySplit], value, (data) => {
          toObserver(observer, key, data)
        })
        return undefined
      }
    }

    toObserver(observer, _key, value)
  }

  if (key instanceof Array) {
    key.forEach(_key => keyToObserver(_key))
  } else {
    keyToObserver(key)
  }
}
