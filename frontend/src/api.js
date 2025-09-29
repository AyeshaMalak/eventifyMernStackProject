import axios from "axios";

export const API = axios.create({
  baseURL: "https://eventify-mern-stack-project-oion.vercel.app/api",
});
