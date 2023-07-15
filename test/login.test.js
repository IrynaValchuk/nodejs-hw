/* eslint-disable no-undef */
const mongoose = require("mongoose");
require("dotenv").config();
const request = require("supertest");
const app = require("../app");

const { DB_TEST_HOST } = process.env;

const PATH = "/api/users/login";
const DATA = {
  email: "test@gmail.com",
  password: "1234567",
};

describe("test login controller", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST)
      .then(() => console.log("Database connection successful"))
      .catch((err) => {
        console.log(err);
      });
  });

  test("response return status code 200", async () => {
    const response = await request(app).post(PATH).send(DATA);
    expect(response.statusCode).toBe(200);
  });

  test("response return token", async () => {
    const response = await request(app).post(PATH).send(DATA);
    expect(response.body).toHaveProperty("token");
  });

  test("response return a 'user' object with 2 fields (type: String) 'email' and 'subscription'", async () => {
    const response = await request(app).post(PATH).send(DATA);
    const { user } = response.body;
    expect(typeof user).toBe("object");
    expect(user).toHaveProperty("email");
    expect(typeof user.email).toBe("string");
    expect(user).toHaveProperty("subscription");
    expect(typeof user.subscription).toBe("string");
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST).then(() => {
      console.log("Database disconnected");
    });
  });
});
