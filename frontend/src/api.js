// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";


console.log("Using API URL:", API_BASE_URL);

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
