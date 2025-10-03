import axios from "axios";

export const API = axios.create({
  baseURL: "https://eventifymernstackproject-production.up.railway.app/api",
});

