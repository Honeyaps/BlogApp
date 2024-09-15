import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogger-api-kappa.vercel.app/v1",
});

// local
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4500/v1"
// });

export default axiosInstance;
