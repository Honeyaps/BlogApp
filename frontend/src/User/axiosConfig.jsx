import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogger-api-kappa.vercel.app/",
});

export default axiosInstance;
