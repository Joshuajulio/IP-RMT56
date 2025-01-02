const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    // console.log(bearerToken);
    if (!bearerToken) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }
    const token = bearerToken.split(" ")[1];
    if (!token) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    const data = verifyToken(token);
    const user = await User.findByPk(data.id);
    if (!user) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }
    // console.log(user)
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication };
