let Events = require('events')

class Feed extends Events {
  constructor (fn, uni = x => x, interval = 60000) {
    super()
    if (!fn) throw new Error('Please provide a function!')
    let last = []
    let timer = setInterval(async () => {
      let items = await fn()
      if (items.length) {
        let unique = getUniques(last, items)
        if (last.length && unique.length) {
          this.emit('new', unique)
        }
      }
      last = items.slice(0)
    }, interval)
    this.close = () => clearInterval(timer)
    function getUniques (a, b) {
      let c = a.map(x => uni(x))
      let d = b.map(x => uni(x))
      for (let i = d.length - 1; i >= 0; i--) {
        if (c.includes(d[i])) d.splice(i, 1)
      }
      return d.map(x => b.find(y => uni(y) === x))
    }
  }
}

module.exports = Feed
