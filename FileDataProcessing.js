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
  ); //*/
  // Cell.addPhone();

  //What company (oem) has the highest average weight of the phone body?

  let companyAvg = {};

  let companyCount = {};

  for (let i in Cell.phones) {
    const phone = Cell.phones[i];
    const weight = phone.body_weight;
    const company = phone.oem;
    if (company in companyAvg) {
      companyAvg[company] += weight;
      companyCount[company]++;
    } else {
      companyAvg[company] = weight;
      companyCount[company] = 1;
    }
  }
  //console.log(companyAvg);
  //console.log(companyCount);

  let maxAvg = 0;
  let maxCompany = null;

  for (let company in companyAvg) {
    companyAvg[company] /= companyCount[company];
    if (companyAvg[company] > maxAvg) {
      maxAvg = companyAvg[company];
      maxCompany = company;
    }
  }

  console.log(`Company highest average phone weight is: ${maxCompany}`);

  //Was there any phones that were announced in one year and released in another? What are they? Give me the oem and models.

  //How many phones have only one feature sensor?

  //What year had the most phones launched in any year later than 1999?

  console.log(Cell.phones[0].toString());
});
