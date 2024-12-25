const { Sequelize, DataTypes } = require("sequelize");
const {Product} = require("./ProductSchema")
const sequelize = require("../Config/Db");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = {Category};
