"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDrug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserDrug.init(
    {
      UserId: DataTypes.INTEGER,
      DrugId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      drinkTime: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserDrug",
    }
  );
  return UserDrug;
};
