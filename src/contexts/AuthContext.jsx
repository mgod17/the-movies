import React, { createContext, useContext, useState } from "react";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export function AuthProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedError, setIsLoggedError] = useState(false);

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
      closeModal();
      setIsAuthenticated(true);
      setIsLoggedError(false);
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
      value={{ isModalOpen, openModal, closeModal, singin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useLoginModal() {
  return useContext(AuthContext);
}
