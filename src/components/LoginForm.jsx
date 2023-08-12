import React from "react";
import { useFormik } from "formik";
import { useLoginModal, useAuth } from "../contexts/AuthContext";
import * as Yup from "yup";
import { Box, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { closeModal } = useLoginModal();
  const { singin } = useAuth();
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
      await singin(values);
      signinForm.resetForm();
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
