import { Box, Modal } from "@mui/material";
import React from "react";
import { useLoginModal } from "../contexts/LoginModalContext";
import LoginForm from "../components/LoginForm";

const LoginModal = () => {
  const { isModalOpen } = useLoginModal();
  return (
    <Modal open={isModalOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
            borderRadius: "20px",
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;