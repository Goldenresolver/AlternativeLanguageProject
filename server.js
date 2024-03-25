import express from "express";

import Cell from "./Cell.js";
//const Cell = require("Cell.js");
import fs from "node:fs";
//const express = require("express");
const app = express();
const port = 3000;

// set the view engine to ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
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

    res.render("pages/index", {
      phones: Cell.phones,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
