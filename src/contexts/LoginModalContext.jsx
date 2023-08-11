import React, { createContext, useContext, useState } from "react";

const LoginModalContext = createContext();

export function LoginModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const login = () => {
    setIsModalOpen(false);
  };

  const logout = () => {};

  return (
    <LoginModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, login, logout }}
    >
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  return useContext(LoginModalContext);
}
