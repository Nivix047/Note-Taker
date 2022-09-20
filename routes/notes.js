const { v4: uuidv4 } = require("uuid");
const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  readAndRemove,
} = require("../helpers/fsUtils");

console.log("----__dirname----");
console.log(__dirname);

// GET Route for retreiving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
notes.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object that will be saved
    const newNotes = {
      title,
      text,
    };
    // Used uuid (npm i uuid) to create unique id
    newNotes.id = uuidv4();

    readAndAppend(newNotes, "./db/db.json");

    const response = {
      status: "success",
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json("Error in posting Notes");
  }
});

notes.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    readAndRemove(id, "./db/db.json");
    const response = {
      status: "success",
      body: id,
    };
    res.json(response);
  } else {
    res.json("Error in posting Notes");
  }
});
// Delete Notes
// notes.delete("/:id", (req, res) => {
//   const { id } = req.params.id;
// });
module.exports = notes;
