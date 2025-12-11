// src/components/ProjectModal.jsx
import React from "react";
import API from "../api";


export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full overflow-auto">
        <div className="p-4 border-b border-white/5 flex justify-between">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <button onClick={onClose} className="text-gray-300">Close</button>
        </div>
        <div className="p-4">
          {project.image && <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded" />}
          <p className="mt-3 text-gray-200">{project.description}</p>
          <div className="mt-3 text-sm text-gray-300">Stack: {project.stack?.join(", ")}</div>
          <div className="mt-4 flex gap-3">
            {project.url && <a href={project.url} target="_blank" rel="noreferrer" className="px-3 py-2 bg-indigo-600 rounded">Live</a>}
            {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="px-3 py-2 bg-gray-700 rounded">Repo</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
