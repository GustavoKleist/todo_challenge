import axios from "axios";
import { getToken } from "../authorization/authorizationBusiness";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/"
});

api.interceptors.request.use(async config => {
  const info = getToken();
  if (!config.url.endsWith("login") && !config.url.endsWith("signup")) {
    config.headers.Authorization = `Bearer ${info.token}`;
  }
  return config;
},);

export default api;