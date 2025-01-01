const {
  expect,
  test,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");

beforeAll(async () => {
  console.log("beforeAll");
  const users = require("../data/user.json").map((el) => {
    delete el.id;
    return {
      ...el,
      password: hashPassword(el.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  console.log(users);
  await queryInterface.bulkInsert("Users", users);
});

afterAll(async () => {
  console.log("afterAll");
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Testing for Login (POST /login)", () => {
  test("Success Login", async () => {
    const response = await request(app).post("/ip/login").send({
      email: "joshua@mail.com",
      password: "joshua123",
    });
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });
  test("Email not provided / not inputted", async () => {
    const response = await request(app).post("/ip/login").send({
      password: "joshua",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Password not provided / not inputted", async () => {
    const response = await request(app).post("/ip/login").send({
      email: "joshua@mail.com",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Invalid email / password", async () => {
    const response = await request(app).post("/ip/login").send({
      email: "joshua@mail.com",
      password: "joshua12",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
