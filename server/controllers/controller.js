const { User, Profile, Drug } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Op } = require("sequelize");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({ email, password });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async createProfile(req, res, next) {
    try {
      const {
        name,
        age,
        personalHistory,
        familyHistory,
        foodAllergy,
        drugAllergy,
      } = req.body;
      const newProfile = await Profile.create({
        UserId: req.user.id,
        name,
        age,
        personalHistory,
        familyHistory,
        foodAllergy,
        drugAllergy,
      });
      res.status(201).json({
        id: newProfile.id,
        name: newProfile.name,
        age: newProfile.age,
        personalHistory: newProfile.personalHistory,
        familyHistory: newProfile.familyHistory,
        foodAllergy: newProfile.foodAllergy,
        drugAllergy: newProfile.drugAllergy,
        message: `Profile with name ${req.body.name} added successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllDrugs(req, res, next) {
    try {
      let options = {};
      const { q, sort, limit, page } = req.query;
      if (q) {
        options.where = {
          name: {
            [Op.iLike]: `%${q}%`,
          },
        };
      }
      if (sort) {
        options.order = [["createdAt", sort]];
      } else {
        options.order = [["id", "ASC"]];
      }
      let pageLimit = limit || 10;
      let pageNumber = page || 1;
      options.limit = pageLimit;
      options.offset = (pageNumber - 1) * pageLimit;
      const { count, rows } = await Drug.findAndCountAll(options);
      res.status(200).json({
        page: pageNumber || 1,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / pageLimit) || 1,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Controller };
