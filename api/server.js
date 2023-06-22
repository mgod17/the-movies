const express = require("express");
const app = express();
const port = 5000;
const usersRouter = require("./routes/users");

// Configurar el middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configurar las rutas
app.use("/api/users", usersRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
