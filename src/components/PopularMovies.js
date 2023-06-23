import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/style/cards.css";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/movies/popular"
      );
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h2>Popular</h2>
      <div className="container">
        {movies.map((movie) => (
          <div
            className="card"
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
          >
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div>
          <h3>{selectedMovie.title}</h3>
          <p>{selectedMovie.overview}</p>
          <button onClick={() => setSelectedMovie(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default PopularMovies;
