const express = require("express");
const router = express.Router();
const User = require("../models/user");

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

module.exports = router;
