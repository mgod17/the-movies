import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./view/Header.view";
import MovieDetails from "./components/movieDetails";
import { SearchProvider } from "./contexts/SearchContext";
import HomePage from "./components/HomePage";
import { LoginModalProvider } from "./contexts/LoginModalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <ToastContainer />
      <LoginModalProvider>
        <Router>
          <SearchProvider>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
            </Routes>
          </SearchProvider>
        </Router>
      </LoginModalProvider>
    </div>
  );
}

export default App;
