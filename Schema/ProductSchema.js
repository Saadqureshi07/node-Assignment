const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Config/Db");
const {Category} = require("./CategorySchema.js")

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Categories",
      key: "id"
    }
  }
});
module.exports = {Product};