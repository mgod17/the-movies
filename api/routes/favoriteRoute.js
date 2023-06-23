const express = require("express");
const favoriteControllers = require("../controllers/favoriteController");

const router = express.Router();

router.get("/:id", favoriteControllers.getFavoritosByUserId);
router.post("/new", favoriteControllers.addFavorito);
router.delete("/delete/:id", favoriteControllers.removeFavorito);

module.exports = router;
