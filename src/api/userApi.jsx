import axios from "axios";

const API_URL = "http://localhost:5000/api";

const userApi = {
  login: async (values) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, values);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default userApi;
