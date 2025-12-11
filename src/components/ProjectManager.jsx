// src/components/ProjectManager.jsx
import React, { useEffect, useState } from "react";
import { fetchProjects, createProject, updateProject, deleteProject } from "../services/projectService";
import ProjectForm from "./ProjectForm";
import API from "../api";


export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await fetchProjects();
      setProjects(res.data.projects || res.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(()=>{ load(); }, []);

  const handleCreate = async (formData) => {
    setLoading(true);
    try {
      await createProject(formData);
      setShowForm(false);
      await load();
    } catch (err) { console.error(err); alert("Create failed"); }
    setLoading(false);
  };

  const handleUpdate = async (id, formData) => {
    setLoading(true);
    try {
      await updateProject(id, formData);
      setEditing(null);
      setShowForm(false);
      await load();
    } catch (err) { console.error(err); alert("Update failed"); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete project?")) return;
    try {
      await deleteProject(id);
      await load();
    } catch (err) { console.error(err); alert("Delete failed"); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Projects</h3>
        <button onClick={()=>{ setShowForm(true); setEditing(null); }} className="px-3 py-2 bg-green-600 rounded">Add Project</button>
      </div>

      {showForm && !editing && (
        <div className="mb-4 bg-slate-800 p-4 rounded">
          <ProjectForm onSave={handleCreate} onCancel={()=>setShowForm(false)} />
        </div>
      )}

      {editing && (
        <div className="mb-4 bg-slate-800 p-4 rounded">
          <ProjectForm
            initial={editing}
            onSave={async (fd) => await handleUpdate(editing._id, fd)}
            onCancel={()=>{ setEditing(null); setShowForm(false); }}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map(p => (
          <div key={p._id} className="p-4 bg-slate-700 rounded">
            {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded mb-2" />}
            <h4 className="text-lg font-semibold">{p.title}</h4>
            <p className="text-sm">{p.description}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={()=>{ setEditing(p); setShowForm(true); }} className="px-3 py-1 bg-yellow-500 rounded">Edit</button>
              <button onClick={()=>handleDelete(p._id)} className="px-3 py-1 bg-red-600 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
