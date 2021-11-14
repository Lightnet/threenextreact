
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
// https://day.js.org/docs/en/installation/node-js
// https://day.js.org/docs/en/parse/unix-timestamp
var dayjs = require('dayjs')



```js
var dayjs = require('dayjs')

// Unix Timestamp
console.log(dayjs().unix())

// convert Unix to DD/MM/YYYY h:m:s a
let utime = 1636842170;
console.log(dayjs.unix(utime).format('DD/MM/YYYY h:m:s a'))

console.log(dayjs().millisecond())
```