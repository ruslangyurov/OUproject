
import axios from "axios";
import {useAuth, AuthContext} from "../apiContext/AuthContext";
import { useContext } from "react";



const axiosInstanse = axios.create({
 // withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" }
})

const user = () => {
  const {isAuth, accessToken} = useAuth();
  return 
}


axiosInstanse.interceptors.request.use(() => 
  (config) => {
  
    if (config.url !== '/auth') {
     
     
     
      if (isAuth) {
        console.log(config)
        config.headers.Authorization = `Bearer ${accessToken}`; // set in header
       
      }
      
    }
   
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

axiosInstanse.interceptors.response.use(
  response => response,
  (error) => {
    console.log(error.status)
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && error.response.config.url !== '/auth') { // Code inside this block will refresh the auth token
 
      originalRequest._retry = true;
      const refreshToken = axiosInstanse.get("/auth/refresh")
      if (refreshToken) {
          const [auth, setAuth] = useContext(AuthContext)
          setAuth({"accessToken":refreshToken})
          axiosInstanse.defaults.headers.common['Authorization'] = 'Bearer ' + refreshToken;
          return axios(originalRequest);
      }   
  } 
  return Promise.reject(error);
});
  


export default axiosInstanse;
