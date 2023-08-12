const express = require("express");
const session = require("express-session");
const app = express();
const port = 5000;
const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const favoritesRoutes = require("./routes/favoriteRoute");
const cors = require("cors");
const db = require("../api/db/index");
const models = require("./models/index");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
// Configurar el middleware para analizar JSON en las solicitudes
// Configurar las rutas
app.use("/api/users", usersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/favoritos", favoritesRoutes);

// Iniciar el servidor
db.sync({ force: false })
  .then(() => {
    console.log("db conectada");
    app.listen(port, () => {
      console.log("server  on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
