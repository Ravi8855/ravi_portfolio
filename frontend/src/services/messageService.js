// src/services/messageService.js
import API from "../api";

// Get paginated messages
export function getMessages(page = 1, limit = 10) {
  return API.get(`/api/messages?page=${page}&limit=${limit}`); // ✔ protected route
}

// Mark message as read/unread
export function toggleRead(id) {
  return API.put(`/api/messages/${id}/toggle`); // ✔ uses token
}

// Delete message
export function deleteMessage(id) {
  return API.delete(`/api/messages/${id}`); // ✔ uses token
}
