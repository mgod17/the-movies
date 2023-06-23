const axios = require("axios");
const Favorito = require("../models/favorite");

const getFavoritosByUserId = async (req, res) => {
  try {
    console.log("Ruta de favoritos:", req.url);
    const userId = req.params.id;
    const userFav = await Favorito.findAll({ where: { userId } });
    return res.status(200).send(userFav);
  } catch (error) {
    return res.sendStatus(404);
  }
};

const addFavorito = async (req, res) => {
  try {
    const {
      userId,
      code,
      original_title,
      poster_path,
      overview,
      vote_average,
    } = req.body;
    console.log("Received data:", req.body);
    const [favorito, created] = await Favorito.findOrCreate({
      where: { code, userId },
      defaults: {
        userId,
        code,
        original_title,
        poster_path,
        overview,
        vote_average,
      },
    });
    console.log("Favorito:", favorito);
    console.log("Created:", created);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};

const removeFavorito = async (req, res) => {
  try {
    const favoritoId = req.params.id;
    await Favorito.destroy({
      where: { id: favoritoId },
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  getFavoritosByUserId,
  addFavorito,
  removeFavorito,
};
