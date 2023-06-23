import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.log(error);
        console.error("Error al obtener los detalles de la película:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>

      <h3>Información adicional:</h3>
      <p>Géneros: {movie.genres.map((genre) => genre.name).join(", ")}</p>
      <p>Fecha de lanzamiento: {movie.release_date}</p>
      <p>Duración: {movie.runtime} minutos</p>
      <p>Popularidad: {movie.popularity}</p>
      <p>Presupuesto: ${movie.budget}</p>
    </div>
  );
};

export default MovieDetails;
