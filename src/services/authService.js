import axios from "axios";

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/protected"
    );
    return response.data;
  } catch (error) {
    console.log(error, "eRRROR");
    throw new Error("Error al verificar el estado de autenticación");
  }
};
