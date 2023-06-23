const axios = require("axios");

const API_KEY = "b9f17c84f7ae390b3c0c34383505a1f3";

const getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.id;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );
    const movie = response.data;
    res.status(200).send(movie);
  } catch (error) {
    console.error("Error al obtener los detalles de la película:", error);
    res
      .status(500)
      .send({ message: "Error al obtener los detalles de la película" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );
    const movies = response.data.results;
    res.status(200).send(movies);
  } catch (error) {
    console.error("Error al obtener las películas:", error);
    res.status(500).send({ message: "Error al obtener las películas" });
  }
};

const getPopularMovies = async (req, res) => {
  try {
    console.log("Entrando en getPopularMovies");
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const movies = response.data.results;
    res.status(200).send(movies);
  } catch (error) {
    console.error("Error al obtener las películas populares:", error);
    res
      .status(500)
      .send({ message: "Error al obtener las películas populares" });
  }
};

module.exports = {
  getPopularMovies,
  getAllMovies,
  getMovieDetails,
};
