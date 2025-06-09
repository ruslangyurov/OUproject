import axios from "axios";
import { useAuth } from "../Config/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Create an axios instance
const axiosInstance = axios.create({
  withCredentials:true,
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" }
});



// Request Interceptor
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
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // If the response status is 403 (token expired)
        if (error.response.status === 403 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
          originalRequest._retry = true;

          // Try to refresh the token
          try {
            const refreshResponse = await axiosInstance.get("/auth/refresh", {withCredentials:true});
            const newAccessToken = refreshResponse.data.accessToken;
            if (!newAccessToken) {
              navigate("/Login")
            } else {
              setAuth(newAccessToken);
              // Retry the original request with the new token
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);

            
            }
           
          } catch (refreshError) {
            // Handle refresh token failure (e.g., log out the user)
            console.log("Failed to refresh token:", refreshError);
            return Promise.reject(refreshError);
          }
        }

        // If not a 403 error, reject the promise
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor on component unmount
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, setAuth]); // You might want to update auth context on a refresh

  return null; // No UI rendering needed for this component
};

export default axiosInstance;
