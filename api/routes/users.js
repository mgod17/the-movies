const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Ruta de registro de usuario
router.post("/register", (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Error creating user" });
    });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Request body:", req.body);
  // Buscar el usuario en la base de datos por su nombre de usuario
  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: "Credenciales inválidas" });
        return;
      }

      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          // Establecer los datos de sesión en la cookie
          req.session.username = username;
          req.session.loggedIn = true;
          res.status(200).send({ message: "Inicio de sesión exitoso" });
        } else {
          res.status(401).send({ message: "Credenciales inválidas" });
        }
      });
    })
    .catch((error) => {
      console.log("Error al autenticar al usuario:", error);
      res.status(500).send({ message: "Error en el servidor" });
    });
});
module.exports = router;
