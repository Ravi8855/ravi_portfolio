// src/api.js
import axios from "axios";

// Must load from Vite env
const API_BASE_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:4000/api";

console.log("Using API URL:", API_BASE_URL); // ✔ Debug line (remove later)

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
