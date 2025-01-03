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

// const pplxRequest = require("./helpers/pplxai");
// app.get("/ip/openai", async (req, res) => {
//   let result = await pplxRequest(
//     JSON.stringify({
//       name: "Joshua",
//       age: 26,
//       personalHistory: "Migraine, otot tegang, insomnia",
//       familyHistory: "Diabetes, insomnia, tekanan darah tinggi",
//       foodAllergy: "Susu, kunyit",
//       drugAllergy: "cefadroxil",
//       recommendation: "to be filled here",
//     })
//   );
//   res.send(result);
// });

app.use(router);

// const cron = require("node-cron");
// cron.tz = "Asia/Jakarta";
// const { User, Drug, UserDrug } = require("./models");
// const { Op } = require("sequelize");
// const sendMail = require("./helpers/sendMail");
// async function sendReminder1x() {
//   const drugs = await UserDrug.findAll({
//     where: {
//       drinkTime: "1x",
//       [Op.and]: [
//         { quantity: { [Op.gt]: 0 } },
//         { endDate: { [Op.gte]: new Date() } },
//       ],
//     },
//     include: [
//       {
//         model: User,
//         attributes: ["email"],
//       },
//       {
//         model: Drug,
//         attributes: ["id", "name", "imgUrl"],
//       },
//     ],
//   });
//   drugs.map((drug) => {
//     console.log(drug.User.email);
//     console.log(drug.Drug.name);
//     sendMail(
//       drug.User.email,
//       `Don't forget to take ${drug.Drug.name}`,
//       `Don't forget to take ${drug.Drug.name}`
//     );
//   });
// }
// cron.schedule("30 11 * * *", sendReminder1x);
// cron.schedule("0 12 * * *", sendReminder1x);
// cron.schedule("30 12 * * *", sendReminder1x);

// async function sendReminder2x() {
//   const drugs = await UserDrug.findAll({
//     where: {
//       drinkTime: "2x",
//       [Op.and]: [
//         { quantity: { [Op.gt]: 0 } },
//         { endDate: { [Op.gte]: new Date() } },
//       ],
//     },
//     include: [
//       {
//         model: User,
//         attributes: ["email"],
//       },
//       {
//         model: Drug,
//         attributes: ["id", "name", "imgUrl"],
//       },
//     ],
//   });
//   drugs.map((drug) => {
//     console.log(drug.User.email);
//     console.log(drug.Drug.name);
//     sendMail(
//       drug.User.email,
//       `Don't forget to take ${drug.Drug.name}`,
//       `Don't forget to take ${drug.Drug.name}`
//     );
//   });
// }
// cron.schedule("30 11 * * *", sendReminder2x);
// cron.schedule("0 12 * * *", sendReminder2x);
// cron.schedule("30 12 * * *", sendReminder2x);
// cron.schedule("30 20 * * *", sendReminder2x);
// cron.schedule("0 21 * * *", sendReminder2x);
// cron.schedule("30 21 * * *", sendReminder2x);

// async function sendReminder3x() {
//   const drugs = await UserDrug.findAll({
//     where: {
//       drinkTime: "3x",
//       [Op.and]: [
//         { quantity: { [Op.gt]: 0 } },
//         { endDate: { [Op.gte]: new Date() } },
//       ],
//     },
//     include: [
//       {
//         model: User,
//         attributes: ["email"],
//       },
//       {
//         model: Drug,
//         attributes: ["id", "name", "imgUrl"],
//       },
//     ],
//   });
//   drugs.map((drug) => {
//     console.log(drug.User.email);
//     console.log(drug.Drug.name);
//     sendMail(
//       drug.User.email,
//       `Don't forget to take ${drug.Drug.name}`,
//       `Don't forget to take ${drug.Drug.name}`
//     );
//   });
// }
// cron.schedule("30 8 * * *", sendReminder3x);
// cron.schedule("0 9 * * *", sendReminder3x);
// cron.schedule("30 9 * * *", sendReminder3x);
// cron.schedule("30 11 * * *", sendReminder3x);
// cron.schedule("0 12 * * *", sendReminder3x);
// cron.schedule("30 12 * * *", sendReminder3x);
// cron.schedule("30 20 * * *", sendReminder3x);
// cron.schedule("0 21 * * *", sendReminder3x);
// cron.schedule("30 21 * * *", sendReminder3x);

app.use(errorHandler);

module.exports = app;
