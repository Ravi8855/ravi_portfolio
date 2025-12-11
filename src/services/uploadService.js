// src/services/uploadService.js
import API from "../api";

export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);

  return API.post("/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
