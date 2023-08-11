// src/themes/muiTheme.js
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    // Define otros colores para el modo día según tus necesidades
  },
  // Otras configuraciones de tema para el modo día
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#0f4c75", // Color azul oscuro para el modo noche
    },
    // Define otros colores para el modo noche según tus necesidades
    background: {
      default: "#0f4c75", // Fondo azul oscuro para el modo noche
      paper: "#1b262c", // Fondo de papel para el modo noche
    },
    text: {
      primary: "#f8f8f8", // Color de texto blanco para el modo noche
    },
  },
  // Otras configuraciones de tema para el modo noche
});

export { lightTheme, darkTheme };
