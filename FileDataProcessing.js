import Cell from "./Cell.js";
//const Cell = require("Cell.js");
import fs from "node:fs";
fs.readFile("cells.csv", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rows = data.split(/[\r\n]+/);
  //console.log(rows);
  const cells = rows.map((row) =>
    row.match(/(?:[^",]+|"[^"]*")+|^(?=,)|(?<=,)/g)
  );

  const headers = cells.splice(0, 1)[0];
  console.log(headers);

  Cell.headers = headers;

  for (let i = 0; i < cells.length; i++) {
    const phone = new Cell(cells[i], i);
  }
  Cell.getAllValueCounts();

  console.log(Cell.phones[1].toString());

  console.log(`Average body weight: ${Cell.mean("body_weight").toFixed(2)} g`);

  console.log(
    `Average display size: ${Cell.mean("display_size").toFixed(2)} in`
  );

  console.log(
    `Standard Deviation of body weight: ${Cell.stddev("body_weight").toFixed(
      2
    )} g`
  );
  console.log(
    `Unique values of OEM:\n  ${Cell.uniqueValues("oem").join("\n  ")} `
  );

  const [modeYear, count] = Cell.mode("launch_announced");
  console.log(
    `Year with most releases: ${modeYear} (${count} models released:  )`
  );
  Cell.addPhone();
});
