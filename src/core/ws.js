/*
 * WebSocket event srouce
 * @param {String} url
 * @return {dispatcher | void}
 */
import util from './util'

export default function (url) {
  if (!url) return

  const { emit, socket, converter } = this
  const dispatcher = {}
  const queue = []
  const _socket = new window.WebSocket(url)

  socket.ws.push({ url, socket })

  dispatcher.socket = _socket

  const _eventListener = (res) => {
    if (res.data) {
      try {
        exec(JSON.parse(res.data))
      } catch (e) {
        exec(res.data)
      }
    } else {
      exec(res)
    }
  }

  _socket.addEventListener('message', _eventListener)

  // out of queue
  const exec = (result) => {
    if (queue.length > 0) {
      let _result = result

      util.iterator(queue, (_i, next) => {
        switch (_i.type) {
          case '__convert__': {
            util.await(_i.func(_result), (data) => {
              _result = data
              next()
            })
            break
          }
          case '__emit__': {
            _i.func(_result)
            next()
            break
          }
        }
      })
    }
  }

  dispatcher.convert = (key) => {
    if (converter[key]) {
      queue.push({
        type: '__convert__',
        func: converter[key]
      })
    }
    return dispatcher
  }

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

    return dispatcher
  }

  dispatcher.off = () => {
    _socket.removeEventListener('message', _eventListener)
  }

  return dispatcher
}
