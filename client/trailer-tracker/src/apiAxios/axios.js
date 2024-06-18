
import axios from "axios";


export default axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" }
})

axios.interceptors.response.use(null, error => {
  if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error;

      switch (error.response?.status) {
          case 400: throw new Error(errorMessage);
          case 401: throw new Error(errorMessage);
          case 404: throw new Error(errorMessage);
          case 409: throw new Error(errorMessage);
          case 429: throw new Error(errorMessage);
      }
  }

  throw error;
}, { synchronous: true });