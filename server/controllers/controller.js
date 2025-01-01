const { User, Profile, Drug, UserDrug } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Op } = require("sequelize");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }
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
      let options = {
        attributes: ["id", "name", "imgUrl"],
      };
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

  static async getDrugById(req, res, next) {
    try {
      const drug = await Drug.findByPk(req.params.id);
      res.status(200).json(drug);
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const profile = await Profile.findOne({
        where: { UserId: req.user.id },
      });
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const profile = await Profile.update(req.body, {
        where: { UserId: req.user.id },
        returning: true,
      });
      res.status(200).json({
        data: profile,
        message: `Profile updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentDrugs(req, res, next) {
    try {
      const drugs = await UserDrug.findAll({
        where: {
          UserId: req.user.id,
          [Op.and]: [
            { quantity: { [Op.gt]: 0 } },
            { endDate: { [Op.gte]: new Date() } },
          ],
        },
        include: {
          model: Drug,
          attributes: ["id", "name", "imgUrl"],
        },
      });
      res.status(200).json(drugs);
    } catch (error) {
      next(error);
    }
  }

  static async addCurrentDrugs(req, res, next) {
    try {
      const { DrugId, quantity, drinkTime, startDate, endDate } = req.body;
      const newDrug = await UserDrug.create({
        UserId: req.user.id,
        DrugId,
        quantity,
        drinkTime,
        startDate,
        endDate,
      });
      res.status(201).json({
        id: newDrug.id,
        UserId: newDrug.UserId,
        DrugId: newDrug.DrugId,
        message: `Drug has been added successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCurrentDrugs(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity, drinkTime, startDate, endDate } = req.body;
      const drug = await UserDrug.findByPk(id);
      if (!drug) {
        throw { name: "NotFound", message: "Drug not found" };
      }
      if (drug.UserId !== req.user.id) {
        throw { name: "Forbidden", message: "You are not authorized" };
      }
      await UserDrug.update(
        { quantity, drinkTime, startDate, endDate },
        { where: { id } }
      );
      res.status(200).json({
        message: `Drug has been updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCurrentDrugs(req, res, next) {
    try {
      const { id } = req.params;
      const drug = await UserDrug.findByPk(id);
      if (!drug) {
        throw { name: "NotFound", message: "Drug not found" };
      }
      if (drug.UserId !== req.user.id) {
        throw { name: "Forbidden", message: "You are not authorized" };
      }
      await UserDrug.destroy({ where: { id } });
      res.status(200).json({
        message: `Drug has been deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPastDrugs(req, res, next) {
    try {
      const drugs = await UserDrug.findAll({
        where: {
          UserId: req.user.id,
          [Op.or]: [
            { quantity: { [Op.lte]: 0 } },
            { endDate: { [Op.lte]: new Date() } },
          ],
        },
        attributes: ["id", "drinkTime", "startDate", "endDate"],
        include: {
          model: Drug,
          attributes: ["id", "name", "imgUrl"],
        },
      });
      res.status(200).json(drugs);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Controller };
