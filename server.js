//express
const express = require("express");
const app = express();

//get the database setup
const db = require("./config/databaseSetup");

// enables cors for all routes
const cors = require("cors");
app.use(cors());

// using dotenv for the .env file
require("dotenv/config");

// routes
const signUpRouter = require("./routes/user");
const parrotRouter = require("./routes/parrot");
const signInRouter = require("./routes/sessions");

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// define urls
app.use("/api/users", signUpRouter);
app.use("/api/parrots", parrotRouter);
app.use("/api/sessions", signInRouter);

// the database only connects if in the development mode

if (process.env.NODE_ENV !== "test") {
  db.connect();
  app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
  });
}

module.exports = app;
