// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://parkxcel-vehicle-parking-app-backend.onrender.com/api",
});

// Automatically attach token if it exists
API.interceptors.request.use(config => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
