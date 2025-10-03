import axios from "axios";

export const API = axios.create({
  baseURL: "eventifymernstackproject-production.up.railway.app/api",
  withCredentials: true, 
});

