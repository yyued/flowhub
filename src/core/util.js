export default {
  iterator (list, index, ctx, callback) {
    if (arguments.length === 2 && !ctx) {
      this.iterator(list, 0, index, null)
    } else if (arguments.length === 3 && !callback) {
      this.iterator(list, 0, index, ctx)
    } else if (index < list.length) {
      ctx(list[index], () => {
        this.iterator(list, ++index, ctx, callback)
      })
    } else if (index >= list.length - 1) {
      callback && callback()
    }
  },
  await (result, callback) {
    if (result.then) {
      result.then(data => {
        callback && callback(data)
      })
    } else {
      callback && callback(result)
    }
  }
}
