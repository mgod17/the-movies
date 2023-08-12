const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { generateToken } = require("../config/token.config");
const createUser = async (req, res) => {
  try {
    User.create(req.body).then((user) => {
      res.status(201).send(user);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({ message: "Credenciales inválidas" });
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const payload = {
        userId: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      };
      const token = await generateToken(user);
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res
        .status(200)
        .send({ message: "Inicio de sesión exitoso", payload });
    } else {
      return res.status(401).send({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al autenticar al usuario:", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
};

const logout = (req, res) => {
  try {
    if (req.session.loggedIn) {
      // Borrar los datos de sesión
      req.session.destroy((err) => {
        if (err) {
          console.log("Error al desloguear al usuario:", err);
          res.status(500).send({ message: "Error al desloguear al usuario" });
        } else {
          res.status(200).send({ message: "Deslogueo exitoso" });
        }
      });
    } else {
      res.status(401).send({ message: "El usuario no está autenticado" });
    }
  } catch (error) {
    console.log("Error al desloguear al usuario:", error);
    res.status(500).send({ message: "Error al desloguear al usuario" });
  }
};

module.exports = {
  createUser,
  login,
  logout,
};
