
const fs = require('node:fs');
fs.readFile('cells.csv', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
 let rows = data.split('\n');
 let cells = rows.map(row => row.split(","));
 console.log(cells);
});