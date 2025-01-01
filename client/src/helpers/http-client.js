import axios from "axios";

export const phase2api = axios.create({
  baseURL: "localhost:3000",
});
