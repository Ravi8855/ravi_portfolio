import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [preview, setPreview] = useState(null);

  // Fetch messages (correct API endpoint)
  const fetchMessages = () => {
    API.get(`/messages?page=${page}&limit=10`)
      .then((res) => {
        setMessages(res.data.messages || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => console.error("Fetch messages error:", err));
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  // Delete Message
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await API.delete(`/message/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Toggle Read / Unread
  const toggleRead = async (id) => {
    try {
      await API.patch(`/message/${id}/read`);
      fetchMessages();
    } catch (err) {
      console.error("Toggle read error:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Messages</h1>

      {messages.length === 0 && (
        <p className="text-gray-400">No messages yet.</p>
      )}

      <div className="space-y-6">
        {messages.map((m) => (
          <div
            key={m._id}
            className="
              p-6 rounded-2xl relative
              bg-gradient-to-br from-[#0d1220]/70 to-[#11182e]/60
              border border-white/10 backdrop-blur-xl
              shadow-[0_0_15px_rgba(120,80,255,0.15)]
              hover:shadow-[0_0_25px_rgba(120,80,255,0.25)]
              transition-all duration-300
            "
          >
            {/* Read Badge */}
            <span
              onClick={() => toggleRead(m._id)}
              className={`
                absolute top-4 right-4 px-3 py-1 text-xs rounded-full cursor-pointer 
                ${
                  m.isRead
                    ? "bg-green-700/40 text-green-300 border border-green-500/20"
                    : "bg-yellow-700/40 text-yellow-300 border border-yellow-500/20"
                }
              `}
            >
              {m.isRead ? "Read" : "Unread"}
            </span>

            {/* Name + Email */}
            <h3 className="text-xl font-semibold text-white">{m.name}</h3>
            <p className="text-gray-400 text-sm">{m.email}</p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setPreview(m)}
                className="
                  px-5 py-2 rounded-xl
                  bg-indigo-600 hover:bg-indigo-700
                  text-white font-medium shadow-lg
                  transition-all duration-200 active:scale-95
                "
              >
                View
              </button>

              <button
                onClick={() => deleteMessage(m._id)}
                className="
                  px-5 py-2 rounded-xl
                  bg-red-600 hover:bg-red-700
                  text-white font-medium shadow-lg
                  transition-all duration-200 active:scale-95
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-700 disabled:bg-gray-900 rounded-md"
        >
          Previous
        </button>

        <span className="text-gray-300">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-700 disabled:bg-gray-900 rounded-md"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div
            className="
              relative w-full max-w-2xl p-8 rounded-3xl
              bg-gradient-to-br from-[#0e1324]/80 to-[#11182e]/70
              backdrop-blur-2xl border border-white/10
              shadow-[0_0_35px_rgba(120,80,255,0.4)]
              animate-scaleIn overflow-hidden
            "
          >
            {/* Date */}
            <div className="absolute top-4 right-4">
              <span
                className="
                  inline-block px-3 py-1 rounded-xl text-xs font-semibold
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  text-white shadow-md ring-1 ring-white/20
                "
              >
                {new Date(preview.createdAt).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-5 mb-6">
              <div
                className="
                  w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600
                  flex items-center justify-center text-white font-bold text-2xl
                  shadow-[0_4px_15px_rgba(120,60,255,0.5)]
                "
              >
                {preview.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-white">
                  {preview.name}
                </h2>
                <p className="text-indigo-300 font-medium text-sm">
                  {preview.email}
                </p>
              </div>
            </div>

            {/* Message */}
            <div
              className="
                bg-[#121a33]/80 rounded-2xl p-6 border border-white/10 shadow-inner
                max-h-[350px] overflow-y-auto text-gray-200 leading-relaxed
              "
            >
              {preview.message}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${preview.email}`}
                target="_blank"
                className="
                  px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
                  text-white font-medium shadow-lg hover:scale-95 transition
                "
              >
                Reply to Mail
              </a>

              <button
                onClick={() => setPreview(null)}
                className="
                  px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
                  text-white font-medium shadow-lg hover:scale-95 transition
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
