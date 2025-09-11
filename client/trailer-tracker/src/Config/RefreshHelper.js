
import axiosInstance from "../apiAxios/axios";

export const refreshToken = async () => {
  try {
    const res = await axiosInstance.get("/auth/refresh", { withCredentials: true });
    return res.data.accessToken; // return new access token
  } catch (err) {
    console.error("Failed to refresh token", err);
    throw err;
  }
};
