import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogger-api-kappa.vercel.app/",
  withCredentials: true,  
});

export default axiosInstance;
