import React, { useEffect, useState } from "react";

// AdminPanelStyleB.jsx
export default function AdminPanelStyleB() {
  const [tab, setTab] = useState("overview");
  const [projects, setProjects] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ⭐ ADDED unread count
  const [unreadCount, setUnreadCount] = useState(0);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  useEffect(() => {
    loadAll();
    fetchUnreadMessages(); // ⭐ ADDED
  }, []);

  async function fetchUnreadMessages() {
    try {
      const res = await fetch(`${API_BASE}/messages?page=1&limit=100`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });

      const data = await res.json();

      const count = data.messages?.filter((m) => !m.isRead).length || 0;

      setUnreadCount(count); // update badge
    } catch (err) {
      console.error("Unread count error:", err);
    }
  }

  async function loadAll() {
    setLoading(true);
    try {
      const p = await fetch(`${API_BASE}/projects`).then((r) => r.json()).catch(() => ({ projects: [] }));
      const c = await fetch(`${API_BASE}/certs`).then((r) => r.json()).catch(() => ([]));

      setProjects(p.projects || []);
      setCerts(c || []);

    } catch (err) {
      console.error(err);
      setMessage("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProject(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const body = Object.fromEntries(form);
    if (body.stack) body.stack = body.stack.split(",").map((s) => s.trim());

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setProjects((p) => [data.project, ...p]);
        e.target.reset();
        setMessage("Project created");
      } else {
        setMessage(data.error || "Create failed");
      }

    } catch (err) {
      console.error(err);
      setMessage("Create request failed");
    }
  }

  async function handleDeleteProject(id) {
    if (!confirm("Delete this project?")) return;

    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      if (res.ok) {
        setProjects((p) => p.filter((x) => x._id !== id));
        setMessage("Project deleted");
      } else {
        const d = await res.json();
        setMessage(d.error || "Delete failed");
      }

    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
    }
  }

  const Icon = ({ children }) => (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-700 to-cyan-400 grid place-items-center text-white shadow-lg">
      {children}
    </div>
  );

  const StatCard = ({ title, value, subtitle }) => (
    <div className="p-4 bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-xl border border-slate-700 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <div className="text-sm text-slate-400">{subtitle}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#071029] to-[#051021] text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

        {/* SIDEBAR */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-slate-900/40 backdrop-blur p-4 rounded-2xl border border-slate-700 shadow-2xl">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-violet-500 grid place-items-center font-bold text-lg">RA</div>
            <div>
              <div className="font-bold text-lg">Ravi — Admin</div>
              <div className="text-xs text-slate-400">Full-stack Portfolio</div>
            </div>
          </div>

          <nav className="space-y-2">
            <button onClick={() => setTab("overview")} className={`w-full text-left px-3 py-2 rounded-md ${tab==='overview' ? 'bg-indigo-700/40' : 'hover:bg-white/5'}`}>Overview</button>

            <button onClick={() => setTab("projects")} className={`w-full text-left px-3 py-2 rounded-md ${tab==='projects' ? 'bg-indigo-700/40' : 'hover:bg-white/5'}`}>Projects</button>

            <button onClick={() => setTab("certificates")} className={`w-full text-left px-3 py-2 rounded-md ${tab==='certificates' ? 'bg-indigo-700/40' : 'hover:bg-white/5'}`}>Certificates</button>

            {/* ⭐ ADDED: Messages with badge */}
            <button
              onClick={() => setTab("messages")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
                tab === "messages" ? "bg-indigo-700/40" : "hover:bg-white/5"
              }`}
            >
              <span>Messages</span>

              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-red-600 text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {/* END OF NEW CODE */}

            <button onClick={() => setTab("users")} className={`w-full text-left px-3 py-2 rounded-md ${tab==='users' ? 'bg-indigo-700/40' : 'hover:bg-white/5'}`}>Users</button>

            <button onClick={() => setTab("settings")} className={`w-full text-left px-3 py-2 rounded-md ${tab==='settings' ? 'bg-indigo-700/40' : 'hover:bg-white/5'}`}>Settings</button>
          </nav>

          <div className="mt-6 text-xs text-slate-400">Quick actions</div>
          <div className="mt-2 flex flex-col gap-2">
            <button className="px-3 py-2 rounded-md bg-indigo-600/30 hover:bg-indigo-600/50">Invite User</button>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
              }}
              className="px-3 py-2 rounded-md bg-red-600/30 hover:bg-red-600/50"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT — NO CHANGES AT ALL */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <div className="text-sm text-slate-400">
                Style B — Neon Tech. Manage your portfolio content here.
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex gap-4">
                <StatCard title="Projects" value={projects.length} subtitle="live" />
                <StatCard title="Certificates" value={certs.length} subtitle="cloud" />
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-400">
                  Signed in as{" "}
                  <span className="text-indigo-400 font-medium">admin</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">

            {tab === "overview" && (
              <section className="grid md:grid-cols-3 gap-6">
                {/* (Original overview section — unchanged) */}
              </section>
            )}

            {tab === "projects" && (
              <section>
                {/* (Original projects section — unchanged) */}
              </section>
            )}

            {tab === "certificates" && (
              <section>
                {/* (Original certificates section — unchanged) */}
              </section>
            )}

            {/* ⭐ ADDED NEW TAB RENDER */}
            {tab === "messages" && (
              <section className="text-slate-300">
                <div className="text-center text-lg opacity-50 mt-20">
                  Messages panel opens from your main AdminMessages page.
                  <br />
                  <span className="text-sm">(This placeholder prevents breaking your UI)</span>
                </div>
              </section>
            )}
            {/* END OF NEW CODE */}

            {tab === "users" && (
              <section className="bg-slate-900/40 p-4 rounded-xl border border-slate-700">
                Users management (placeholder)
              </section>
            )}

            {tab === "settings" && (
              <section className="bg-slate-900/40 p-4 rounded-xl border border-slate-700">
                Settings (placeholder)
              </section>
            )}

          </div>

          {message && <div className="mt-4 text-sm text-indigo-300">{message}</div>}
        </main>
      </div>
    </div>
  );
}
