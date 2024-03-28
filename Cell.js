// Declaration

//import Prompt from "prompt-sync";

import promptSync from "prompt-sync";
const prompt = promptSync();

export default class Cell {
  static counts = {};
  static phones = {};

  static headers;

  static currentIndex = 0;

  // static prompt = new Prompt();

  static displayHeaders = {
    oem: "Manufacturer",
    model: "Model",
    launch_announced: "Launch Announced",
    launch_status: "Launch Status",
    body_dimensions: "Body Dimensions",
    body_weight: "Body Weight",
    body_sim: "Body SIM",
    display_type: "Display Type",
    display_size: "Display Size",
    display_resolution: "Display Resolution",
    features_sensors: "Features/Sensors",
    platform_os: "Operating System",
  };

  constructor(info, index) {
    const self = this;

    Cell.headers.forEach((header, i) => {
      let value = info[i];

      if (typeof value === "string")
        value = value.trim().replace(/^"(.+(?="$))"$/, "$1");

      if (value == "-" || value == "") {
        value = null;
      }

      self[header] = value;
    });
    Cell.phones[index] = this;
    if (index > Cell.currentIndex) {
      Cell.currentIndex = index;
    }
  }

  // oem,model,launch_announced,launch_status,body_dimensions,body_weight,body_sim,display_type,display_size,display_resolution,features_sensors,platform_os

  get oem() {
    return this._oem;
  }

  set oem(value) {
    this._oem = value;
  }

  get model() {
    return this._model;
  }

  set model(value) {
    this._model = value;
  }

  get launch_announced() {
    return this._launch_announced;
  }

  set launch_announced(value) {
    if (value) value = value.match(/(?:[^\d]|^)(\d{4})(?:[^\d]|$)/);
    this._launch_announced = value ? parseInt(value[1]) : null;
  }

  get launch_status() {
    return this._launch_status;
  }

  set launch_status(value) {
    if (value && value != "Discontinued" && value != "Cancelled") {
      value = value.match(/(?:[^\d]|^)(\d{4})(?:[^\d]|$)/);
      value = value ? parseInt(value[1]) : null;
    }
    this._launch_status = value;
  }

  get body_dimensions() {
    return this._body_dimensions;
  }

  set body_dimensions(value) {
    this._body_dimensions = value;
  }

  get body_weight() {
    return this._body_weight;
  }

  set body_weight(value) {
    if (value) {
      value = value.match(/(\d+(\.\d*)?)\s*g/);

      if (value) value = parseFloat(value[1]);
    }

    this._body_weight = value;
  }

  get body_sim() {
    return this._body_sim;
  }

  set body_sim(value) {
    if (value == "No" || value == "Yes") value = null;
    this._body_sim = value;
  }

  get display_type() {
    return this._display_type;
  }

  set display_type(value) {
    this._display_type = value;
  }

  get display_size() {
    return this._display_size;
  }

  set display_size(value) {
    if (value) {
      value = value.match(/(\d+(\.\d*)?)\s*inches/);

      if (value) value = parseFloat(value[1]);
    }

    this._display_size = value;
  }

  get display_resolution() {
    return this._display_resolution;
  }

  set display_resolution(value) {
    this._display_resolution = value;
  }

  get features_sensors() {
    return this._features_sensors;
  }

  set features_sensors(value) {
    if (value && value.match(/^\d+(\.\d*)?$/)) value = null;
    this._features_sensors = value;
  }

  get platform_os() {
    return this._platform_os;
  }

  set platform_os(value) {
    if (value) {
      value = value.match(/^[^,]+/);
      if (value) value = value[0];
    }
    this._platform_os = value;
  }

  toString() {
    let str = "{\n";
    for (const header of Cell.headers) {
      str += `  ${Cell.displayHeaders[header]}:  ${this[header]}\n`;
    }

    str += "}";
    return str;
  }

  static getValueCounts(attr) {
    let counts = {};

    for (const index in Cell.phones) {
      const phone = Cell.phones[index];
      const value = phone[attr];

      if (value != null) {
        if (counts.hasOwnProperty(value)) {
          counts[value]++;
        } else counts[value] = 1;
      }
    }
    Cell.counts[attr] = counts;
  }

  static getAllValueCounts() {
    for (const attr of Cell.headers) {
      Cell.getValueCounts(attr);
    }
  }

  static mean(attr) {
    let sum = 0,
      count = 0;
    for (const value in Cell.counts[attr]) {
      const valueCount = Cell.counts[attr][value];
      sum += valueCount * value;

      count += valueCount;
    }

    return sum / count;
  }

  static mode(attr, ignoredValues = []) {
    let maxValue = null,
      maxCount = 0;
    for (const value in Cell.counts[attr]) {
      if (
        !ignoredValues.includes(value) &&
        Cell.counts[attr][value] > maxCount
      ) {
        maxCount = Cell.counts[attr][value];
        maxValue = value;
      }
    }

    return [maxValue, maxCount];
  }

  static stddev(attr) {
    const mean = Cell.mean(attr);

    let n = 0;
    let x = 0;

    for (const value in Cell.counts[attr]) {
      const valueCount = Cell.counts[attr][value];
      n += valueCount;
      x += valueCount * (value - mean) ** 2;
    }

    return Math.sqrt(x / n);
  }

  static uniqueValues(attr) {
    return Object.keys(Cell.counts[attr]);
  }

  static addPhoneConsole() {
    const phone = new Cell([], Cell.currentIndex + 1);

    for (const attr of Cell.headers) {
      while (!phone[attr]) {
        const value = prompt(`Enter the  ${Cell.displayHeaders[attr]}: `);

        phone[attr] = value;
      }
    }

    console.log(`phone successfully added:\n ${phone.toString()}`);
  }

  static addPhone(data) {
    const phone = new Cell([], Cell.currentIndex + 1);

    for (const attr of Cell.headers) {
      phone[attr] = data[attr];
    }
    console.log(Cell.phones[Cell.currentIndex]);

    console.log(phone);
  }
  static deletePhone(id) {
    delete Cell.phones[id];
  }
}
