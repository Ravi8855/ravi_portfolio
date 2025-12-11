import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", to: "#home" },
    { label: "About", to: "#about" },
    { label: "Skills", to: "#skills" },
    { label: "Projects", to: "#projects" },
    { label: "Internship", to: "#internship" },
    { label: "Certificates", to: "#certificates" },
    { label: "Contact", to: "#contact" },
    { label: "Admin", to: "/login" },
  ];

  const handleNavClick = (target) => {
    if (target.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(target);
    }

    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl py-3">
        <div className="w-full px-6 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">
            Welcome to <span className="text-indigo-400">Ravi's Portfolio</span>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.to)}
                  className="text-base md:text-lg font-semibold text-gray-300 hover:text-white transition-all"

                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 animate-fadeIn"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* MOBILE SIDEBAR PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0b1220]/95 border-l border-white/10 
                    backdrop-blur-xl z-[60] transform 
                    ${menuOpen ? "translate-x-0 animate-slideIn" : "translate-x-full"} 
                    transition-all duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-300 text-3xl hover:text-white transition"
        >
          ✕
        </button>

        {/* Menu Items */}
        <ul className="mt-20 px-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavClick(item.to)}
                className="
                  w-full text-left text-lg font-semibold 
                  text-gray-300 hover:text-white 
                  px-3 py-2 rounded-lg
                  hover:bg-indigo-600/30 
                  transition-all duration-200
                  hover:shadow-[0_0_12px_rgba(99,102,241,0.4)]
                "
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn .3s ease-out;
          }

          @keyframes slideIn {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
          .animate-slideIn {
            animation: slideIn .3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}
      </style>
    </>
  );
}
