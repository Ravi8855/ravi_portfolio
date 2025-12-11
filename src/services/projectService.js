import API from "../api";

export function getAllProjects() {
  return API.get("/projects");
}

export function createProject(data) {
  return API.post("/projects", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

export function deleteProject(id) {
  return API.delete(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

export function updateProject(id, data) {
  return API.put(`/projects/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}
