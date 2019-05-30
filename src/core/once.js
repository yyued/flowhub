export default function (key, handler) {
  const listener = this.on(key, data => {
    handler(data)

    listener.off()
  })
}
