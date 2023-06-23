const db = require("../db/index");
const { DataTypes, Model } = require("sequelize");

class Favorito extends Model {}

Favorito.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    original_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vote_average: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "favorito",
  }
);

module.exports = Favorito;
