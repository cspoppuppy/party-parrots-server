const db = require("../../config/databaseSetup");
const express = require("express");
const app = express();

function setupTestDatabase() {
  let server;
  // connects to test database before all tests
  beforeAll(async () => {
    server = app.listen(9000, () => {
      console.log("Test server running");
    });
    await db.connect();
  });

  // drop each collection after every test
  afterEach(async () => {
    await db
      .connection()
      .listCollections()
      .forEach(async (collection) => {
        if (collection) {
          await db.connection().dropCollection(collection.name);
        }
      })
      .catch((error) => console.log(error));
  });

  // after all tests finished disconnects
  afterAll(async () => {
    await server.close(console.log("Test server closed"));
    await db.disconnect().catch((error) => console.log(error));
  });
}

module.exports = setupTestDatabase;
