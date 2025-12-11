import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  // 🔐 Block access if no token in localStorage
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login", { replace: true });
  }
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#0b1220] text-white">

      {/* PREMIUM SIDEBAR */}
     <aside
  className="
    w-64 
    bg-gradient-to-b from-[#0f162b] to-[#0a0f1d]
    backdrop-blur-xl
    border-r border-white/10 
    shadow-[4px_0_25px_rgba(80,60,255,0.25)] 
    p-6 
    text-gray-200
  "
>
  {/* Title */}
  <h2 className="text-3xl font-bold mb-10 text-white tracking-wide">
    Admin Panel
  </h2>

  {/* Navigation */}
  <nav className="space-y-4">

    <NavLink
      to="/admin/dashboard"
      className={({ isActive }) =>
        `
        flex items-center gap-4 px-4 py-3 rounded-xl
        text-lg font-semibold
        transition-all duration-200

        ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }
        `
      }
    >
      <span className="text-2xl">📊</span>
      Dashboard
    </NavLink>

    <NavLink
      to="/admin/projects"
      className={({ isActive }) =>
        `
        flex items-center gap-4 px-4 py-3 rounded-xl
        text-lg font-semibold
        transition-all duration-200

        ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }
        `
      }
    >
      <span className="text-2xl">📁</span>
      Projects
    </NavLink>

    <NavLink
      to="/admin/certificates"
      className={({ isActive }) =>
        `
        flex items-center gap-4 px-4 py-3 rounded-xl
        text-lg font-semibold
        transition-all duration-200

        ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }
        `
      }
    >
      <span className="text-2xl">🏅</span>
      Certificates
    </NavLink>

    <NavLink
      to="/admin/messages"
      className={({ isActive }) =>
        `
        flex items-center gap-4 px-4 py-3 rounded-xl
        text-lg font-semibold
        transition-all duration-200

        ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }
        `
      }
    >
      <span className="text-2xl">💬</span>
      Messages
    </NavLink>

  </nav>

  {/* Logout */}
  <button
    onClick={handleLogout}
    className="
      mt-10 w-full py-3 rounded-xl font-semibold
      text-lg
      bg-red-600 hover:bg-red-700 
      text-white
      transition-all duration-200
      shadow-lg shadow-red-500/30
    "
  >
    Logout
  </button>
</aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
