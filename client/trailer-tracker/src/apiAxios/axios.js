import axios from "axios";
import { useAuth } from "../Config/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {refreshToken} from '../Config/RefreshHelper';

// Create an axios instance
const axiosInstance = axios.create({
  withCredentials:true,
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" }
});

export const RequestInterceptor = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (config.url !== '/auth' && config.url !== '/auth/logout') {
          // If there's an auth token, attach it to the request
          if (auth) {
            config.headers.Authorization = `Bearer ${auth}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [auth]);
};

// Response Interceptor
export const ResponseInterceptor = () => {
  const { auth, setAuth } = useAuth(); // Assuming you want to update auth token if refreshed

  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => response, async (error) => {
      const originalRequest = error.config;

      if (!error.response) return Promise.reject(error);

      const isRefreshCall = originalRequest.url.includes('/auth/refresh');

      if ((error.response.status === 401 || error.response.status === 403) 
          && !originalRequest._retry && !isRefreshCall) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshToken();
          console.log(newAccessToken)

          if (!newAccessToken) {
            navigate('/Login');
            return Promise.reject(error);
          }

          setAuth(newAccessToken);
          

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          navigate('/Login');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return () => {
    axiosInstance.interceptors.response.eject(responseInterceptor);
  };
}, [auth, setAuth]);

};






export default axiosInstance;


