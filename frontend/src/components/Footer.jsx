import React from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaUserGraduate,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaCertificate
} from "react-icons/fa";

export default function Footer() {
  const links = [
    { name: "Home", href: "#home", icon: <FaHome />, color: "text-blue-400" },
    { name: "About", href: "#about", icon: <FaUserGraduate />, color: "text-yellow-300" },
    { name: "Skills", href: "#skills", icon: <FaUserGraduate />, color: "text-purple-300" },
    { name: "Projects", href: "#projects", icon: <FaProjectDiagram />, color: "text-teal-300" },
    { name: "Internship", href: "#internship", icon: <FaUserGraduate />, color: "text-pink-300" },
    { name: "Certificates", href: "#certificates", icon: <FaCertificate />, color: "text-indigo-300" },
    { name: "Contact", href: "#contact", icon: <FaEnvelope />, color: "text-red-300" },
  ];

  const socials = [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/ravi-s-b7b86135a/", glow: "shadow-blue-500", color: "text-blue-400" },
    { icon: <FaGithub />, href: "https://github.com/Ravi8855", glow: "shadow-gray-400", color: "text-gray-300" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/ravi_____here", glow: "shadow-pink-500", color: "text-pink-300" },
    { icon: <FaWhatsapp />, href: "https://wa.me/918855025560", glow: "shadow-green-500", color: "text-green-300" },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#06070d] to-black pt-24 pb-12 text-white">

      {/* Bioluminescent Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(90,60,255,0.25),transparent)]"></div>

      {/* Footer Content */}
      <div
        className="
        relative z-10 max-w-7xl mx-auto px-6 
        grid grid-cols-1 md:grid-cols-3 
        gap-16 items-start 
        text-center md:text-left
      "
      >

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>

          <p className="flex items-center gap-3 mt-3 text-gray-300 hover:text-blue-300 transition">
            <FaMapMarkerAlt className="text-blue-400 drop-shadow-sm" />
            Visvesvaraya Technological University, Mysore, Karnataka
          </p>

          <p className="flex items-center gap-3 mt-3 text-gray-300 hover:text-green-300 transition">
            <FaPhoneAlt className="text-green-400 drop-shadow-sm" />
            +91 88550 25560
          </p>

          <p className="flex items-center gap-3 mt-3 text-gray-300 hover:text-red-300 transition">
            <FaEnvelope className="text-red-400 drop-shadow-sm" />
            ravichalmar@gmail.com
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>

          <div className="grid grid-cols-2 gap-3 justify-center">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-2 text-gray-300 hover:scale-105 transition"
              >
                <span className={`${link.color} text-lg drop-shadow-md`}>{link.icon}</span>
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold mb-4">Get in touch with me</h3>

          <div className="flex gap-6 mt-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                className={`text-3xl ${social.color} transition transform hover:scale-150 hover:${social.color} drop-shadow-[0_0_10px] hover:${social.glow}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto mt-10 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      {/* Copyright */}
      <p className="relative z-10 text-center text-gray-400">
        © {new Date().getFullYear()} Ravi — Crafted with excellence & vision.
      </p>

      {/* Scroll to Top Button */}
      <a
        href="#home"
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(160,70,255,0.7)] hover:scale-110 transition"
      >
        ↑
      </a>
    </footer>
  );
}
