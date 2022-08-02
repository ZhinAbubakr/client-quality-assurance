import axios from "axios";

const axiosInstance = axios.create();

export function setHeader() {
  axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
}

export default axiosInstance;
