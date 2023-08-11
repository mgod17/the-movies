import React from "react";
import LoginModal from "./LoginModal.view";
import { useLoginModal } from "../contexts/LoginModalContext";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "5px",
  padding: "5px",
}));

const LoginIcon = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const Header = () => {
  const { isModalOpen, openModal, closeModal, login } = useLoginModal();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PeliculasApp
          </Typography>
          <SearchContainer>
            <SearchIcon sx={{ marginRight: 1 }} />
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </SearchContainer>

          <LoginIcon onClick={openModal} color="inherit">
            Login
          </LoginIcon>
          {/* {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : ( */}
          <LoginModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            login={login}
          />
          {/* )} */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
