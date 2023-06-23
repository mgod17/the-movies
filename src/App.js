import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MovieDetails from "./components/movieDetails";
import { SearchProvider } from "./context/SearchContext";
import "./App.css";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <SearchProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MovieDetails></MovieDetails>} />
          </Routes>
        </div>
      </SearchProvider>
    </Router>
  );
}

export default App;
