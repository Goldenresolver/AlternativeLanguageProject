import Cell from "./Cell.js";
//const Cell = require("Cell.js");
import fs from 'node:fs';
fs.readFile('cells.csv', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
 const rows = data.split(/[\r\n]+/);
 //console.log(rows);
 const cells = rows.map(row => row.match(/(?:[^",]+|"[^"]*")+|^(?=,)|(?<=,)/g));

 const headers = cells.splice(0,1)[0];
 console.log(headers);

 Cell.headers = headers;

 const phoneHashMap = {};

 for(let i =0; i<cells.length; i++)
 {
    const phone = new Cell(cells[i],headers);

    phoneHashMap[i] = phone;


 }

 console.log(phoneHashMap[1].toString());

 //console.log(cells);
 let cleaned = cells.map(row => row.map((value,i)=>{
  
  value = value.trim();

  if(value=="-"||value=="")
  {
     return null;

  }


  







 }))
});