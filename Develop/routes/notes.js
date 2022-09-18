const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

// GET Route for retreiving all the notes
app.get("/api/feedback", (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} reqest received to submit notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  console.log("----req.body----");
  console.log(req.body);

  // If all the required properties are present
  if ((title, text)) {
    // Variable for the object that will be saved
    const newNotes = {
      title,
      text,
    };
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

module.exports = notes;
