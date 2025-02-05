import axios from "axios";
import { useAuth } from "../apiContext/AuthContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create an axios instance
const axiosInstanse = axios.create({
  withCredentials:true,
  baseURL: "http://localhost:10000", 
  headers: { "Content-Type": "application/json" }
});

// Request Interceptor
export const RequestInterceptor = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstanse.interceptors.request.use(
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
      axiosInstanse.interceptors.request.eject(requestInterceptor);
    };
  }, [auth]);
};

// Response Interceptor
export const ResponseInterceptor = () => {
  const { auth, setAuth } = useAuth(); // Assuming you want to update auth token if refreshed

  useEffect(() => {
    const responseInterceptor = axiosInstanse.interceptors.response.use(
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
            const refreshResponse = await axiosInstanse.get("/auth/refresh", {withCredentials:true});
            const newAccessToken = refreshResponse.data.accessToken;
            const dec = jwtDecode(newAccessToken)
            console.log(dec.exp * 1000)

            // Update the auth context with the new token
            setAuth(newAccessToken);

            // Retry the original request with the new token
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstanse(originalRequest);
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
      axiosInstanse.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, setAuth]); // You might want to update auth context on a refresh

  return null; // No UI rendering needed for this component
};

export default axiosInstanse;
