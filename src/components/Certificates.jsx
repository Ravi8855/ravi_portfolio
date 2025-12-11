import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles.css";
import closeIcon from "../assets/close-icon.svg";

// ----------------------------------------------------
// COMPANY COLORS + LOGOS (For Static + Dynamic Certs)
// ----------------------------------------------------
const BRAND_COLORS = {
  microsoft: "#00A4EF",
  infosys: "#0084FF",
  google: "#EA4335",
  hp: "#0096D6",
  ibm: "#1261FE",
  oracle: "#F80000",
  cisco: "#049FD9",
  python: "#FFD43B",
  edunet: "#6C63FF",
  unknown: "#6B7280",
};

const COMPANY_LOGOS = {
  microsoft: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg",
  infosys: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/infosys.svg",
  google: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecloud.svg",
  hp: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hp.svg",
  ibm: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ibm.svg",
  oracle: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/oracle.svg",
  cisco: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cisco.svg",
  python: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/python.svg",
  edunet: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/coursera.svg",
  unknown: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/certificate.svg",
};

// ----------------------------------------------------
// STATIC CERTIFICATES (Your original ones)
// ----------------------------------------------------
const STATIC_CERTS = [
  {
    id: 1,
    company: "Microsoft",
    key: "microsoft",
    title: "Generative AI for Data Science",
    src: "/certificates/data_science_microsoft.jpg",
  },
  {
    id: 2,
    company: "Infosys",
    key: "infosys",
    title: "Prompt Engineering",
    src: "/certificates/infosys_prompt_engineering.jpg",
  },
  {
    id: 3,
    company: "Infosys",
    key: "infosys",
    title: "Generative AI Foundations: IT Integration with Generative AI",
    src: "/certificates/infosys_generative_ai.jpg",
  },
  {
    id: 4,
    company: "Google",
    key: "google",
    title: "Introduction to Generative AI",
    src: "/certificates/google_cloud.jpg",
  },
  {
    id: 5,
    company: "IBM",
    key: "ibm",
    title: "Generative AI: Prompt Engineering Basics",
    src: "/certificates/ibm_ml.jpg",
  },
  {
    id: 6,
    company: "Oracle",
    key: "oracle",
    title: "Oracle Certified Foundations Associate",
    src: "/certificates/oracle_foundations.jpg",
  },
  {
    id: 7,
    company: "Cisco",
    key: "cisco",
    title: "JavaScript Essentials 1",
    src: "/certificates/javascript.jpg",
  },
  {
    id: 8,
    company: "IIT Bombay",
    key: "python",
    title: "Python 3.4.3",
    src: "/certificates/python.jpg",
  },
  {
    id: 9,
    company: "Edunet Foundation",
    key: "edunet",
    title: "Green Skills and Artificial Intelligence",
    src: "/certificates/edunet_certificate.jpg",
  },
  {
    id: 10,
    company: "HP",
    key: "hp",
    title: "HP Power Lab 2.0 — Participation Certificate",
    src: "/certificates/hp_lab.jpg",
  },
];

export default function Certificates() {
  const [active, setActive] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [dbCertificates, setDbCertificates] = useState([]);

  // ---------------------------
  // Fetch NEW certificates
  // ---------------------------
  useEffect(() => {
    fetch("http://localhost:4000/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched certificates:", data.certificates);
        setDbCertificates(data.certificates || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const openModal = (c) => {
    setActive(c);
    setTimeout(() => setZoom(true), 20);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setZoom(false);
    setTimeout(() => {
      setActive(null);
      document.body.style.overflow = "";
    }, 250);
  };

  // ----------------------------------------------------
  // MERGE STATIC + DATABASE CERTIFICATES
  // ----------------------------------------------------
  const ALL_CERTIFICATES = [
    ...STATIC_CERTS,
    ...dbCertificates.map((c, i) => {
      const companyKey = (c.company || "unknown").toLowerCase();

      return {
        id: STATIC_CERTS.length + i + 1,
        title: c.name,
        company: c.company || "Unknown",
        key: companyKey,
        src: c.image,
      };
    }),
  ];

  return (
    <section id="certificates" className="px-6 md:px-12 lg:px-20 py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          Certificates
        </h2>
        <p className="text-sm text-gray-400">
          Verified certificates — click to view the original.
        </p>
      </div>

      {/* CERTIFICATE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {ALL_CERTIFICATES.map((c) => {
          const glow = BRAND_COLORS[c.key] || BRAND_COLORS.unknown;
          const logo = COMPANY_LOGOS[c.key] || COMPANY_LOGOS.unknown;

          return (
            <motion.div key={c.id}>
              <motion.div
                onClick={() => openModal(c)}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: `0 14px 35px ${glow}55`,
                }}
                transition={{ duration: 0.25 }}
                className="relative bg-[#0f1120] border border-gray-800 rounded-2xl p-4 shadow-xl cursor-pointer"
                style={{ boxShadow: `0 0 18px ${glow}25` }}
              >
                {/* Logo + Name */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${glow}22`,
                      boxShadow: `0 0 10px ${glow}55`,
                    }}
                  >
                    <img
                      src={logo}
                      className="w-6 h-6"
                      style={{
                        filter: "invert(1) brightness(2.2) contrast(1.3)",
                      }}
                    />
                  </div>

                  <span className="font-semibold text-white text-sm">
                    {c.company}
                  </span>
                </div>

                {/* Title */}
                <div
                  className="w-full h-24 flex items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${glow}55, #6b4eff66)`,
                    boxShadow: `0 0 16px ${glow}33 inset`,
                  }}
                >
                  <p className="text-center px-3 text-white font-semibold text-sm">
                    {c.title}
                  </p>
                </div>

                <p className="mt-3 text-[11px] text-gray-400">Click to view the certificate.</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{
              scale: zoom ? 1 : 0.85,
              opacity: 1,
            }}
            transition={{ duration: 0.25 }}
            className="relative bg-[#15172b] w-[90%] md:w-3/4 lg:w-2/3 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div>
                <p className="text-gray-400 text-xs">{active.company}</p>
                <h4 className="text-lg font-semibold text-gray-100">{active.title}</h4>
              </div>

              <button onClick={closeModal} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                <img src={closeIcon} className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex items-center justify-center bg-[#0f1120]">
              <motion.img
                src={active.src}
                className="max-h-[80vh] object-contain"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
