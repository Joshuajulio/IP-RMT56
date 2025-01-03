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

describe("Testing for Register (POST /register)", () => {
  test("Success Register", async () => {
    const response = await request(app).post("/ip/register").send({
      email: "joshua2@mail.com",
      password: "joshua123",
    });
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
  });
  test("Email not provided / not inputted", async () => {
    const response = await request(app).post("/ip/register").send({
      password: "joshua",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
  test("Password not provided / not inputted", async () => {
    const response = await request(app).post("/ip/register").send({
      email: "joshua3@mail.com",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
  test("Email already registered", async () => {
    const response = await request(app).post("/ip/register").send({
      email: "joshua_julio@ymail.com",
      password: "joshua123",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
