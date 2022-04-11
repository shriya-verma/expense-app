const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const OweAmounts = sequelize.define("loan", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {type: DataTypes.STRING, allowNull: false},
  oweAmount: { type: DataTypes.STRING, allowNull: false },
 
});

module.exports = OweAmounts;