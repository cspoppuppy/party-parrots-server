const mongoose = require("mongoose");

// a function to choose the right database based on the env
const env = () => {
  if (process.env.NODE_ENV === "test") {
    return process.env.TEST_DATABASE_URL;
  } else if (process.env.NODE_ENV === "dev") {
    console.log(process.env.DATABASE_URL);
    return process.env.DATABASE_URL;
  }
};

// a function to connect to the database
const connect = async () => {
  try {
    await mongoose.connect(env(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");
  } catch {
    console.log(error.message);
  }
};

// the connection
const connection = () => {
  return mongoose.connection.db;
};

// a function to disconnect from the database

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected");
  } catch {
    console.log(error);
  }
};

module.exports = { connect, disconnect, connection };
