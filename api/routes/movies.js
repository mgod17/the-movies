const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/all", (req, res) => {
  console.log("Entrando en la ruta /movies/all");
  movieController.getAllMovies(req, res);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
});

router.get("/popular", (req, res) => {
  console.log("Entrando en la ruta /movies/popular");
  movieController.getPopularMovies(req, res);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
});

router.get("/:id", (req, res) => {
  console.log("Entrando en la ruta /movies/:id");
  movieController.getMovieDetails(req, res);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
});

module.exports = router;
