let Events = require('events')

class Feed extends Events {
  constructor (arr, interval = 60000) {
    super()
    if (!arr || arr.constructor !== Array) throw new Error('Invalid parameters!')
    if (arr[0] === Function) arr = [arr]
    let last = {}
    let timer = setInterval(async () => {
      let bundle = {}
      for (let i = 0; i < arr.length; i++) {
        let items = await arr[i][0]()
        if (items.length) {
          let unique = getUniques(arr[i][1], last[i], items)
          if (last[i] && unique.length) bundle[i] = unique
        }
        last[i] = items.slice(0)
      }
      if (Object.keys(bundle).length) this.emit('new', bundle)
    }, interval)
    this.close = () => clearInterval(timer)
  }
}

function getUniques (uni, a = [], b = []) {
  let c = a.map(x => uni(x))
  let d = b.map(x => uni(x))
  for (let i = d.length - 1; i >= 0; i--) {
    if (c.includes(d[i])) d.splice(i, 1)
  }
  return d.map(x => b.find(y => uni(y) === x))
}

module.exports = Feed
