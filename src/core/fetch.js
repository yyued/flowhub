/*
 * fetch event srouce
 * @param {String} url
 * @param {void | object} args
 * @return {dispatcher | void}
 */
import util from './util'

export default function (url, args = {}) {
  if (!url) return

  const { emit, converter } = this

  let timer

  const dispatcher = {}

  const queue = []

  // out of queue
  const exec = result => {
    if (queue.length > 0) {
      util.iterator(queue, (_i, next) => {
        switch (_i.type) {
          case '__convert__': {
            util.await(_i.func(result), (data) => {
              result = data
              next()
            })
            break
          }
          case '__emit__': {
            _i.func(result)
            break
          }
        }
      })
    }
  }

  dispatcher.convert = key => {
    if (converter[key]) {
      queue.push({
        type: '__convert__',
        func: converter[key]
      })
    }
    return dispatcher
  }

  // send the HTTP request by fetch, and fetch data flow
  dispatcher.emit = (key, data) => {
    queue.push({
      type: '__emit__',
      func: (result) => {
        if (data) {
          emit.bind(this)(key, { result, data })
        } else {
          emit.bind(this)(key, result)
        }
      }
    })

    // 链式多次 emit 去抖
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      dispatcher.reload()
    }, 0)

    return dispatcher
  }

  dispatcher.reload = () => {
    window.fetch(url, args)
      .then(res => {
        if (res.status === 200 && res.json) {
          res.json().then(data => exec(data))
        } else {
          exec(res)
        }
      })
      .catch(err => {
        exec(err)
      })
  }

  return dispatcher
}
