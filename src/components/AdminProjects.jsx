import React, { useEffect, useState } from "react";
import {
  getAllProjects,
  deleteProject,
  updateProject,
} from "../services/projectService";
import { uploadFile } from "../services/uploadService";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Premium toast message
  const [toast, setToast] = useState("");

  // Load all projects
  const load = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Save Edit
  const saveEdit = async () => {
    try {
      let imageUrl = editProject.image;

      // Upload only when a new image is selected
      if (editImageFile) {
        const uploadRes = await uploadFile(editImageFile);
        imageUrl = uploadRes.data.url;
      }

      const updated = {
        ...editProject,
        image: imageUrl,
        tech: editProject.tech.split(",").map((t) => t.trim()),
      };

      await updateProject(editProject._id, updated);

      setToast("Project updated successfully!");
      setEditProject(null);
      setEditImageFile(null);
      load();
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>

      {/* SUCCESS TOAST (Edit + Delete) */}
      {toast && (
        <div
          className="
          fixed top-10 left-1/2 -translate-x-1/2
          bg-gradient-to-r from-indigo-600 to-purple-600
          px-6 py-3 rounded-xl text-white font-medium
          shadow-[0_0_25px_rgba(120,80,255,0.5)]
          animate-toast z-50
        "
        >
          {toast}
        </div>
      )}

      <style>
        {`
        .animate-toast {
          animation: toastFade 3s ease forwards;
        }
        @keyframes toastFade {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          10% { opacity: 1; transform: translate(-50%, 0px); }
          90% { opacity: 1; transform: translate(-50%, 0px); }
          100% { opacity: 0; transform: translate(-50%, -20px); }
        }
        `}
      </style>

      {/* PROJECT TABLE */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-white/5">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Tech</th>
              <th className="p-4">Links</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-t border-white/10">
                <td className="p-3">
                  {p.image ? (
                    <img
                      src={p.image}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>

                <td className="p-3 font-semibold text-white">{p.title}</td>
                <td className="p-3 text-gray-400">{p.description}</td>
                <td className="p-3 text-gray-400">
                  {p.tech?.join(", ")}
                </td>

                <td className="p-3">
                  {p.repo && (
                    <a
                      href={p.repo}
                      className="text-blue-400 block"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  )}
                  {p.url && (
                    <a
                      href={p.url}
                      className="text-green-400 block"
                      target="_blank"
                    >
                      Live Demo
                    </a>
                  )}
                </td>

                <td className="p-4 text-center flex gap-3 justify-center">
                  <button
                    onClick={() =>
                      setEditProject({
                        ...p,
                        tech: p.tech?.join(", ") || "",
                      })
                    }
                    className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-medium text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(p._id)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">

          <div className="
            relative w-full max-w-2xl p-8 rounded-3xl
            bg-gradient-to-br from-[#0e1324]/80 to-[#11182e]/70
            backdrop-blur-2xl border border-white/10
            shadow-[0_0_35px_rgba(120,80,255,0.4)]
            animate-scaleIn
          ">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Project</h2>

            <label className="block text-gray-300 mb-1 text-sm">Project Title</label>
            <input
              value={editProject.title}
              onChange={(e) =>
                setEditProject({ ...editProject, title: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/10 text-white mb-4"
            />

            <label className="block text-gray-300 mb-1 text-sm">Project Description</label>
            <textarea
              value={editProject.description}
              onChange={(e) =>
                setEditProject({
                  ...editProject,
                  description: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/10 text-white mb-4 h-28"
            />

            <label className="block text-gray-300 mb-1 text-sm">Tech Stack (comma separated)</label>
            <input
              value={editProject.tech}
              onChange={(e) =>
                setEditProject({ ...editProject, tech: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/10 text-white mb-4"
            />

            <label className="block text-gray-300 mb-1 text-sm">GitHub Repo URL</label>
            <input
              value={editProject.repo || ""}
              onChange={(e) =>
                setEditProject({ ...editProject, repo: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/10 text-white mb-4"
            />

            <label className="block text-gray-300 mb-1 text-sm">Live Demo URL</label>
            <input
              value={editProject.url || ""}
              onChange={(e) =>
                setEditProject({ ...editProject, url: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/10 text-white mb-4"
            />

            <label className="block text-gray-300 mb-1 text-sm">Choose Image</label>
            <input
              type="file"
              onChange={(e) => setEditImageFile(e.target.files[0])}
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-purple-500/40 text-white cursor-pointer mb-6"
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditProject(null)}
                className="px-6 py-3 rounded-xl bg-gray-600 hover:bg-gray-500 text-white"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="
                  px-6 py-3 rounded-xl
                  bg-gradient-to-r from-indigo-500 to-purple-600
                  hover:from-indigo-400 hover:to-purple-500
                  text-white font-semibold shadow-lg
                "
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">

          <div className="
            w-full max-w-md p-8 rounded-2xl
            bg-gradient-to-br from-[#0e1324]/80 to-[#11182e]/70
            border border-white/10 shadow-xl animate-scaleIn
          ">
            <h2 className="text-xl font-semibold text-white text-center mb-4">Delete Project?</h2>

            <p className="text-gray-300 text-center mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await deleteProject(deleteId);
                  setDeleteId(null);
                  setToast("Project deleted successfully!");
                  load();
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          .animate-scaleIn {
            animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleIn {
            from { transform: scale(0.85); opacity: 0; }
            to   { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
