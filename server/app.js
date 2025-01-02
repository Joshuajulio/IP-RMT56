if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");

const router = require("./routers/index");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pplxRequest = require("./helpers/pplxai");
app.get("/ip/openai", async (req, res) => {
  let result = await pplxRequest(
    JSON.stringify({
      name: "Joshua",
      age: 26,
      personalHistory: "Migraine, otot tegang, insomnia",
      familyHistory: "Diabetes, insomnia, tekanan darah tinggi",
      foodAllergy: "Susu, kunyit",
      drugAllergy: "cefadroxil",
      recommendation: "to be filled here",
    })
  );
  res.send(result);
});

app.use(router);

app.use(errorHandler);

module.exports = app;
