import React, { useEffect, useState } from "react";
import { createProject, getAllProjects } from "../services/projectService";
import API from "../api";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    stack: "",
    repo: "",
    url: "",
    imageFile: null,
  });

  // Load projects
  const loadProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Upload image
  const handleImageUpload = async (file) => {
    if (!file) return null;

    const fd = new FormData();
    fd.append("file", file);

    const res = await API.post("/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
  };

  // Save project
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;

    if (form.imageFile) {
      imageUrl = await handleImageUpload(form.imageFile);
    }

    const payload = {
      title: form.title,
      description: form.description,
      stack: form.stack.split(",").map((t) => t.trim()),
      repo: form.repo,
      url: form.url,
      image: imageUrl,
    };

    await createProject(payload);

    // Show popup
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);

    // Reset
    setForm({
      title: "",
      description: "",
      stack: "",
      repo: "",
      url: "",
      imageFile: null,
    });

    loadProjects();
  };

  return (
    <div className="max-w-4xl mx-auto">

      {/* Premium Saved Popup */}
      {showSaved && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fadeIn">
          <div
            className="
              bg-gradient-to-br from-purple-600/20 to-indigo-600/20
              border border-white/10 px-10 py-6 rounded-3xl
              shadow-xl backdrop-blur-2xl text-center animate-scaleIn
            "
          >
            <h2 className="text-white text-2xl font-semibold mb-2">
              🎉 Project Saved!
            </h2>
            <p className="text-gray-300 mb-6">
              Your project has been added successfully.
            </p>

            <button
              onClick={() => setShowSaved(false)}
              className="
                px-6 py-2 bg-indigo-600 hover:bg-indigo-700
                rounded-xl text-white font-medium shadow-md
              "
            >
              OK
            </button>
          </div>

          {/* Popup Animations */}
          <style>{`
            .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
            .animate-scaleIn {
              animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes scaleIn {
              from { transform: scale(0.85); opacity: 0; }
              to   { transform: scale(1);   opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold mb-8">Dashboard — Add New Project</h1>

      {/* Create Project Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f1724]/60 border border-white/10 p-8 rounded-xl space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-300 mb-1">Project Title</label>
          <input
            type="text"
            className="inputBox"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 mb-1">Project Description</label>
          <textarea
            className="inputBox h-24"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-gray-300 mb-1">
            Tech Stack (comma separated)
          </label>
          <input
            type="text"
            className="inputBox"
            value={form.stack}
            onChange={(e) => setForm({ ...form, stack: e.target.value })}
          />
        </div>

        {/* Repo */}
        <div>
          <label className="block text-gray-300 mb-1">GitHub Repo URL</label>
          <input
            type="text"
            className="inputBox"
            value={form.repo}
            onChange={(e) => setForm({ ...form, repo: e.target.value })}
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-gray-300 mb-1">Live Demo URL</label>
          <input
            type="text"
            className="inputBox"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>

        {/* Premium file input */}
        <div>
          <label className="block text-gray-300 mb-2">Project Image</label>

          <div
            className="
              flex items-center justify-between
              bg-[#141b2d] border border-indigo-500/40
              p-3 rounded-lg cursor-pointer
              hover:border-indigo-400 transition
            "
          >
            <span className="text-gray-400">
              {form.imageFile ? form.imageFile.name : "Choose File…"}
            </span>

            <input
              type="file"
              className="hidden"
              id="filePicker"
              onChange={(e) =>
                setForm({ ...form, imageFile: e.target.files[0] })
              }
            />

            <label
              htmlFor="filePicker"
              className="
                px-4 py-2 bg-indigo-600 hover:bg-indigo-700
                cursor-pointer rounded-lg text-white text-sm
              "
            >
              Browse
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="
            w-full py-3 mt-4 rounded-lg font-semibold
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            shadow-lg shadow-blue-500/30
            transition-all duration-300
          "
        >
          Save Project
        </button>
      </form>
    </div>
  );
}
