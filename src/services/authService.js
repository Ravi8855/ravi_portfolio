import API from "../api";

export function login(username, password) {
  return API.post("/admin/login", { username, password });
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}
