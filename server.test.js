const mongoose = require("mongoose");
// const createServer = require("./server");

//Before each test, set up the

beforeEach((done) => {
  mongoose.connect(
    process.env.TEST_DATABASE_URL,
    { useNewUrlParser: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// Tests
// First we have to create a user in our empty database because we
test("GET /users", async () => {
  const user = await User.create({
    email: "test@example.com",
    username: "test1",
    password: "password123",
    forename: "Test",
    lastname: "Tester",
    type: "admin",
  });

  await supertest(app)
    .get("/api/users")
    .expect(201)
    .then((response) => {
      // Check the response type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check the response data
      expect(response.body[0]._id).toBe(user.id);
      expect(response.body[0].email).toBe(user.email);
      expect(response.body[0].password).toBe(user.password);
      expect(response.body[0].username).toBe(user.username);
      expect(response.body[0].forename).toBe(user.forename);
      expect(response.body[0].lastname).toBe(user.lastname);
      expect(response.body[0].type).toBe(user.type);
    });
});
