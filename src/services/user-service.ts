import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
export const getUserDevices = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};