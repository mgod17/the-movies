import React, { createContext, useContext, useState } from "react";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedError, setIsLoggedError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const singin = async (user) => {
    try {
      const res = await userApi.login(user, { withCredentials: true });
      setUser(res.payload);
      setIsAuthenticated(true);
      setIsLoggedError(false);
      closeModal();
      toast.success("login succesful");
      return res;
    } catch (err) {
      setIsLoggedError(true);
      toast.error(err.response.data.message);
      console.log(err, "errrorr");
      return err;
    }
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        singin,
        logout,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
