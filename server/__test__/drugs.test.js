const {
  expect,
  test,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { User, Profile, Drug, UserDrug, sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const axios = require("axios");

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
    where: { email: "joshua@mail.com" },
  });
  access_token = signToken({ id: user.id });
  const profiles = require("../data/profile.json").map((el) => {
    delete el.id;
    return {
      ...el,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await queryInterface.bulkInsert("Profiles", profiles);
  const response = await axios.get(
    "https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/%20?page=1&per_page=2"
  );
  const drugs = response.data.result.map((drug) => drug.slug);
  const drugDetails = await Promise.all(
    drugs.map(async (slug) => {
      const detailResponse = await axios.get(
        `https://magneto.api.halodoc.com/api/v1/buy-medicine/products/detail/${slug}`
      );
      const { name, description, image_url, composition, dosage } =
        detailResponse.data;
      return {
        name,
        description,
        imgUrl: image_url,
        composition,
        dosage,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    })
  );
  await queryInterface.bulkInsert("Drugs", drugDetails);
  const userDrug = require("../data/userdrug.json").map((el) => {
    delete el.id;
    return {
      ...el,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await queryInterface.bulkInsert("UserDrugs", userDrug);
});

afterAll(async () => {
  console.log("afterAll");
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Profiles", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Drugs", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("UserDrugs", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Testing for Drugs (GET /drugs)", () => {
  test("Success Get All Drugs", async () => {
    const response = await request(app)
      .get("/ip/drugs")
      .set("Authorization", `Bearer ${access_token}`);
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data", expect.any(Array));
    expect(response.body).toHaveProperty("totalData", 3);
  });
  test("Success Get Drug By Id", async () => {
    const response = await request(app)
      .get("/ip/drugs/1")
      .set("Authorization", `Bearer ${access_token}`);
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", expect.any(String));
  });
  test("Success Get Current User Drug", async () => {
    const response = await request(app)
      .get("/ip/currentdrugs")
      .set("Authorization", `Bearer ${access_token}`);
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  test("Success Add Drug", async () => {
    const response = await request(app)
      .post("/ip/currentdrugs")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        DrugId: "1",
        quantity: "1",
        drinkTime: "3x",
        startDate: "2025-01-01",
        endDate: "2025-01-04",
      });
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(201);
  });
  test("Success Edit Drug", async () => {
    const response = await request(app)
      .put("/ip/currentdrugs/1")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        quantity: "2",
        drinkTime: "2x",
        startDate: "2025-01-01",
        endDate: "2025-01-04",
      });
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(200);
  });
  test("Success Delete Drug", async () => {
    const response = await request(app)
      .delete("/ip/currentdrugs/1")
      .set("Authorization", `Bearer ${access_token}`);
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(200);
  });
  test("Failed Add Drug", async () => {
    const response = await request(app)
      .post("/ip/currentdrugs")
      .set("Authorization", `Bearer ${access_token_invalid}`)
      .send({
        DrugId: "1",
        quantity: "1",
        drinkTime: "3x",
        startDate: "2025-01-01",
        endDate: "2025-01-04",
      });
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(401);
  });
  test("Failed Edit Drug", async () => {
    const response = await request(app)
      .put("/ip/currentdrugs/1")
      .set("Authorization", `Bearer ${access_token_invalid}`)
      .send({
        quantity: "2",
        drinkTime: "2x",
        startDate: "2025-01-01",
        endDate: "2025-01-04",
      });
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(401);
  });

  test("Failed Delete Drug", async () => {
    const response = await request(app)
      .delete("/ip/currentdrugs/1")
      .set("Authorization", `Bearer ${access_token_invalid}`);
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(401);
  });
  test("Drug Not Found", async () => {
    const response = await request(app)
      .put("/ip/currentdrugs/1000")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        quantity: "2",
        drinkTime: "2x",
        startDate: "2025-01-01",
        endDate: "2025-01-04",
      });
    // console.log(response.body, "<<< response body");
    expect(response.status).toBe(404);
  });
});
