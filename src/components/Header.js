import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkAuthStatus } from "../services/authService";
import SignUpForm from "./SignUpForm";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const data = await checkAuthStatus();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };

  return (
    <header>
      <h1>Nombre de la App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Buscador</Link>
          </li>
          {!isLoggedIn && (
            <div>
              <li>
                <Link to="/login">Inicia sesión</Link>
              </li>
              <li>
                <Link to="#" onClick={handleSignUpClick}>
                  Regístrate
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
      {showSignUpForm && <SignUpForm />}
    </header>
  );
};

export default Header;
