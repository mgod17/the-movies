const User = require("../models/user");
const bcrypt = require("bcrypt");

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
    console.log("Request body:", req.body);
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          res.status(401).send({ message: "Credenciales inválidas" });
          return;
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            // Establecer los datos de sesión en la cookie
            req.session.email = email;
            req.session.loggedIn = true;
            res.status(200).send({ message: "Inicio de sesión exitoso bro" });
          } else {
            res.status(401).send({ message: "Credenciales inválidas" });
          }
        });
      })
      .catch((error) => {
        console.log("Error al autenticar al usuario:", error);
        res.status(500).send({ message: "Error en el servidor" });
      });
  } catch (error) {
    console.log("Error al autenticar al usuario:", error);
    res.status(500).send({ message: "Error en el servidor" });
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
