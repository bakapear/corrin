# corrin
It's her feet.

RSS Feed but with JSON arrays instead.

```js
let Corrin = require("corrin")

let feed = new Corrin([fn, x => x.id])
/*
*let feed = new Corrin([
*    [fn1, x => x.id],
*    [() => fn2('test'), x => x.node.id]
*], 120000)
*/

feed.on('new', items => {
    console.log(items)
    feed.close()
})

async function fn() {
    // ...
    return array
}

```