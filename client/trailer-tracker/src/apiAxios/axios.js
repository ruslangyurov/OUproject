
import axios from "axios";
import {useAuth, AuthContext} from "../apiContext/AuthContext";
import { useContext, useEffect } from "react";



const axiosInstanse = axios.create({
 // withCredentials: true,
  baseURL: "https://vigilant-guacamole-wrx955w64vq3694-10000.app.github.dev/",
  headers: { "Content-Type": "application/json" }
})

export const RequestInterceptor = () => {
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
  const {auth} = useAuth()

  useEffect(() => {
    axiosInstanse.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry && error.response.config.url !== '/auth') { // Code inside this block will refresh the auth token
     
          originalRequest._retry = true;
          const refreshToken = axiosInstanse.get("/auth/refresh")
          if (refreshToken) {
             
            axiosInstanse.defaults.headers.common['Authorization'] = 'Bearer ' + refreshToken;
            return axios(originalRequest);
          }   
      } 
      return Promise.reject(error);
    });
    })
  
}


export default axiosInstanse;