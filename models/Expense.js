const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Expenses = sequelize.define("expenses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {type: DataTypes.STRING, allowNull: false},
  expense: { type: DataTypes.STRING, allowNull: false },
 
});

module.exports = Expenses;

