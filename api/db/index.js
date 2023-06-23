const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tmdb", null, null, {
  dialect: "postgres",
  logging: false,
  host: "localhost",
  // storage: "./db/database.sqlite",
});

module.exports = sequelize;
