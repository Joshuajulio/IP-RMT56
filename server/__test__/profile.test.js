const {
  expect,
  test,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { User, Profile, sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

let access_token;
let access_token_invalid = "ez.ez.ez";

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
  await queryInterface.bulkInsert("Users", users);
  const user = await User.findOne({
    where: { email: "joshua_julio@ymail.com" },
  });
  access_token = signToken({ id: user.id });
});

afterAll(async () => {
  console.log("afterAll");
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Testing for Profile (POST /profile)", () => {
  test("Success Create Profile", async () => {
    const response = await request(app)
      .post("/ip/createprofile")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        name: "Joshua",
        age: 26,
        personalHistory: "Migraine, otot tegang, insomnia",
        familyHistory: "Diabetes, insomnia, tekanan darah tinggi",
        foodAllergy: "Susu, kunyit",
        drugAllergy: "cefadroxil",
      });
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  }, 60000);
  test("Unauthorized", async () => {
    const response = await request(app)
      .post("/ip/createprofile")
      .set("Authorization", `Bearer ${access_token_invalid}`)
      .send({
        name: "Joshua",
        age: 26,
        personalHistory: "Migraine, otot tegang, insomnia",
        familyHistory: "Diabetes, insomnia, tekanan darah tinggi",
        foodAllergy: "Susu, kunyit",
        drugAllergy: "cefadroxil",
      });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  test("Get Profile", async () => {
    const response = await request(app)
      .get("/ip/profile")
      .set("Authorization", `Bearer ${access_token}`);
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Joshua");
  }, 20000);
  test("Edit Profile", async () => {
    const response = await request(app)
      .put("/ip/profile/")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        name: "Joshua2",
        age: 26,
        personalHistory: "Migraine, otot tegang",
        familyHistory: "Diabetes, insomnia",
        foodAllergy: "Susu, kunyit",
        drugAllergy: "cefadroxil",
      });
    // console.log(response.body.data, "<<< response body");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data[1][0]).toHaveProperty("name", "Joshua2");
  }, 60000);
  test("Edit Profile Unathorized", async () => {
    const response = await request(app)
      .put("/ip/profile/")
      .set("Authorization", `Bearer ${access_token_invalid}`)
      .send({
        name: "Joshua2",
        age: 26,
        personalHistory: "Migraine, otot tegang, insomnia",
        familyHistory: "Diabetes, insomnia, tekanan darah tinggi",
        foodAllergy: "Susu, kunyit",
        drugAllergy: "cefadroxil",
      });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid token");
  });
});
