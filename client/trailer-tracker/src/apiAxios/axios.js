
import axios from "axios";


const axiosInstanse = axios.create({
 // withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" }
})

axiosInstanse.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstanse;
