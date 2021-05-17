const supertest = require("supertest");
const app = require("../app");
const setupTestDatabase = require("./helpers/db");

setupTestDatabase();
