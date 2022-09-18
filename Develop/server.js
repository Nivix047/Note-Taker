const { resolveNaptr } = require("dns");
const express = require("express");
const path = require("path");
const api = require("./public/assets/js/index");

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET Route for notes page
app.get("/feedback", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/notes.html"));
});

// GET Route for retreiving all the notes
app.get("/api/feedback", (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} reqest received to submit notes`);

  // Destructuring assignment for the items in req.body
});

app.listen(PORT, () => {
  console.log(`APP listening at http://localhost:${PORT}`);
});
