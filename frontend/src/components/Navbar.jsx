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
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050816]/80 py-4 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-14">
          <button
            onClick={() => handleNavClick("#home")}
            className="group flex items-center gap-3 text-left"
            aria-label="Go to home section"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-400 text-sm font-black text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.22)]">
              RC
            </span>
            <span>
              <span className="block text-base font-bold leading-none text-white">
                Ravi Chalmar
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-400">
                Full Stack Developer
              </span>
            </span>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.to)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="rounded-xl border border-white/10 px-3 py-2 text-2xl leading-none text-white md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
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
          aria-label="Close menu"
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
