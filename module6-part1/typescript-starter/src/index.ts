const fs = require('fs');

var readable = fs.createReadStream('src/demo.txt', { encoding: 'utf8', highWaterMark: 16 * 1024 });

var writable = fs.createWriteStream('src/playground.txt');

readable.pipe(writable);