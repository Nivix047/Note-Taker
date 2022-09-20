const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    err ? console.err(err) : console.info(`\nData written to ${destination}`);
  });
};

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
      console.log("----file----");
      console.log(file);
      console.log("----content----");
      console.log(content);
    }
  });
};

const readAndRemove = (id, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const parseData = JSON.parse(data);
    console.log(parseData);
    for (let i = 0; i < parseData.length; i++) {
      if (id === parseData[i].id) {
        parseData.splice(i, 1);
        writeToFile(file, parseData);
      }
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndRemove };
