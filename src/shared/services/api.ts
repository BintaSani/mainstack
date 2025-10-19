import axios from "axios";

// Read base URL from .env
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, //  prevents hanging requests
});
