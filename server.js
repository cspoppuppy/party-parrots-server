if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
//const routes = require("./routes/");

const app = express();

const signUpRouter = require("./routes/user");
const parrotRouter = require("./routes/parrot");
const signInRouter = require("./routes/sessions");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected"));

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`);
});

app.use("/api/users", signUpRouter);
app.use("/api/parrots", parrotRouter);
app.use("/api/sessions", signInRouter);
