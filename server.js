import express from "express";

import Cell from "./Cell.js";
//const Cell = require("Cell.js");
import fs from "node:fs/promises";
import bodyParser from "body-parser";

import { EOL } from "node:os";

//const express = require("express");
const app = express();
const port = 3000;

// set the view engine to ejs
app.set("view engine", "ejs");

app.use("/static", express.static("static"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  readPhones().then(() => {
    res.render("pages/index", {
      phones: Cell.phones,
    });
  });
});

app.post("/add", (req, res) => {
  console.log(req.body);

  readPhones().then(() => {
    Cell.addPhone(req.body);
    writePhones().then(() => {
      res.redirect("/");
    });
  });
});

app.get("/delete", (req, res) => {
  console.log("deleting phone " + req.query.id);
  readPhones().then(() => {
    Cell.deletePhone(req.query.id);
    writePhones().then(() => {
      res.json({
        success: true,
      });
    });
  });
});

async function readPhones() {
  try {
    const data = await fs.readFile("./cellscopy.csv", { encoding: "utf8" });
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
  } catch (err) {
    console.log(err);
  }
}

async function writePhones() {
  try {
    let content = Cell.headers.join(",") + EOL;
    for (const i in Cell.phones) {
      content +=
        Cell.headers
          .map((header) => {
            let value = Cell.phones[i][header];
            if (header == "body_weight") value += " g";
            if (value.includes(",")) value = `"${value}"`;
            return value;
          })
          .join(",") + EOL;
    }
    await fs.writeFile("./cellscopy.csv", content);
  } catch (err) {
    console.log(err);
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
