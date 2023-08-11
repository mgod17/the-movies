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

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "mysecret", // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: true,
  })
);
// Configurar el middleware para analizar JSON en las solicitudes
app.use(express.json());

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
