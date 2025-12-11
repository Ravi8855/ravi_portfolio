// src/components/ProjectForm.jsx
import React, { useState } from "react";
import { uploadFile } from "../services/uploadService";
import { createProject, updateProject } from "../services/projectService";
import API from "../api";


export default function ProjectForm({ existing, onSaved }) {
  // existing = project object when editing
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [stack, setStack] = useState((existing?.stack || []).join(", "));
  const [url, setUrl] = useState(existing?.url || "");
  const [repo, setRepo] = useState(existing?.repo || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let imageUrl = existing?.image || null;
      // upload image if provided
      if (file) {
        const uploadRes = await uploadFile(file);
        imageUrl = uploadRes.url;
      }

      const payload = {
        title,
        description,
        stack: stack.split(",").map(s => s.trim()).filter(Boolean),
        url,
        repo,
        image: imageUrl,
      };

      if (existing && existing._id) {
        await updateProject(existing._id, payload);
      } else {
        await createProject(payload);
      }

      setLoading(false);
      onSaved && onSaved();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Save failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded shadow">
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <label className="block">Title</label>
      <input className="w-full mb-2" value={title} onChange={e=>setTitle(e.target.value)} required />

      <label className="block">Description</label>
      <textarea className="w-full mb-2" value={description} onChange={e=>setDescription(e.target.value)} required />

      <label className="block">Stack (comma separated)</label>
      <input className="w-full mb-2" value={stack} onChange={e=>setStack(e.target.value)} />

      <label className="block">Live URL</label>
      <input className="w-full mb-2" value={url} onChange={e=>setUrl(e.target.value)} />

      <label className="block">Repo URL</label>
      <input className="w-full mb-2" value={repo} onChange={e=>setRepo(e.target.value)} />

      <label className="block">Image (optional)</label>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />

      <div className="mt-3">
        <button className="bg-indigo-600 px-4 py-2 rounded" disabled={loading}>
          {loading ? "Saving..." : (existing ? "Update" : "Create")}
        </button>
      </div>
    </form>
  );
}
