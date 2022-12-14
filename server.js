const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

// Deployment sites won't host 3001 this allows deployment sites such as Heroku or Glitch host
const PORT = process.env.PORT || 3001;

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
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/pages/notes.html"));
});

app.listen(PORT, () => {
  console.log(`APP listening at http://localhost:${PORT}`);
});
