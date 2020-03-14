# corrin
It's her feet.

RSS Feed but with JSON arrays instead.

```js
let Corrin = require("corrin")

let feed = new Corrin(fn, x => x.id)

feed.on('new', items => {
    console.log(items)
    feed.close()
})

async function fn() {
    // ...
    return array
}

```