import React from "react";
import { useFormik } from "formik";
import { useLoginModal } from "../contexts/LoginModalContext";
import * as Yup from "yup";
import { Box, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const { closeModal } = useLoginModal();
  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("email is required"),
      password: Yup.string()
        .min(6, "password minimun 8 caracters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const loginSuccessful = await userApi.login(values);
        console.log(loginSuccessful, "logeate");
        if (loginSuccessful) {
          signinForm.resetForm();
          closeModal();
          console.log(loginSuccessful, "logueo exitoso");
        }
      } catch (error) {
        console.error("Error during login:", error);
        console.error("Error during login:", error);
        if (error.message) {
          // Manejar mensajes de error específicos de la API
          toast.success("Login successful");
        } else {
          // Manejar errores genéricos
          toast.error(error.message);
        }
      }
    },
  });
  const handleUpdatePassword = () => {};
  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="email"
          placeholder="EMAIL"
          value={signinForm.values.email}
          onChange={signinForm.handleChange}
          name="email"
          fullWidth
          autoFocus
          variant="standard"
          color="success"
          error={
            signinForm.touched.email && signinForm.errors.email !== undefined
          }
          helperText={signinForm.touched.email && signinForm.errors.email}
        />
        <TextField
          type="password"
          placeholder="PASSWORD"
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          name="password"
          fullWidth
          variant="standard"
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          color="success"
          size="large"
          sx={{
            width: "50%",
            marginBottom: 3,
            borderRadius: "20px",
          }}
        >
          LOG IN
        </LoadingButton>
        <Link
          style={{ textDecoration: "none", color: "#595757" }}
          onClick={handleUpdatePassword}
        >
          DID YOU FORGET YOUR PASSWORD?
        </Link>
      </Box>
    </Box>
  );
};
export default LoginForm;
