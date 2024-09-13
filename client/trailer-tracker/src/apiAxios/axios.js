
import axios from "axios";


export default axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" }
})

axios.interceptors.request.use(
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
