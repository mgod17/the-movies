import axios from "axios";

const API_URL = "http://localhost:5000/api";

const userApi = {
  login: async (values) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, values, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.res ? error.res.data : error;
    }
  },
};

export default userApi;
