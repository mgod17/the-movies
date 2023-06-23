import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/style/cards.css";

function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/movies/all");
      setMovies(response.data);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h2>All</h2>
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

        {selectedMovie && (
          <div>
            <h3>{selectedMovie.title}</h3>
            <p>{selectedMovie.overview}</p>
            <button onClick={() => setSelectedMovie(null)}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllMovies;
