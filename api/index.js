const express = require("express");
const session = require("express-session");
const app = express();
const port = 5000;

// Configurar el middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configurar el middleware de sesión
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Configurar las rutas
const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});

// Importar la configuración de la base de datos
require("./db");
