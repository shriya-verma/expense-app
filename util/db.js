const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-app", "root", "", {
  dialect: "mysql",
  host: "127.0.0.1",
  logging: false,
});

module.exports = sequelize;