
import axios from "axios";
import {useAuth, AuthContext} from "../apiContext/AuthContext";
import { useContext, useEffect } from "react";



const axiosInstanse = axios.create({
 // withCredentials: true,
  baseURL: "http://localhost:10000",
  headers: { "Content-Type": "application/json" }
})

export const AxiosInterceptor = () => {
  const {auth} = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstanse.interceptors.request.use(
      (config) => {
       
        if (config.url !== '/auth') { 
         // get stored access token
          config.headers.Authorization = `Bearer ${auth}`; // set in header 
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    } 
  }, [auth]);
}





export const ResponseInterceptor = () => {
  const {auth, setAuth} = useAuth()
  axiosInstanse.interceptors.response.use(
    response => response,
    (error) => {
      console.log(error.status)
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry && error.response.config.url !== '/auth') { // Code inside this block will refresh the auth token
   
        originalRequest._retry = true;
        const refreshToken = axiosInstanse.get("/auth/refresh")
        if (refreshToken) {
           
            axiosInstanse.defaults.headers.common['Authorization'] = 'Bearer ' + refreshToken;
            return axios(originalRequest);
        }   
    } 
    return Promise.reject(error);
  });
}
  


export default axiosInstanse;