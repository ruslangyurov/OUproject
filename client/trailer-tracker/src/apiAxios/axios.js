
import axios from "axios";
import { AuthContext } from "../apiContext/authContext";
import { useContext } from "react";


const axiosInstance = axios.create({
 // withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token =  useContext(AuthContext) // get stored access token
    if (token.accessToken) {
      config.headers.Authorization = `Bearer ${token.accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
    try {
      const res = await axios.post('/auth/refresh')
      const newAccessToken = res.data.accessToken
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch(err) {
      return Promise.reject(error);
  }
}
 
});

export default axiosInstance;
