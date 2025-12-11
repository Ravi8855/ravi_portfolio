import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminCertificates() {
  const [certName, setCertName] = useState("");
  const [company, setCompany] = useState("");
  const [file, setFile] = useState(null);
  const [certificates, setCertificates] = useState([]);

  // --- Premium Popup State ---
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // --- Load Certificates ---
  const loadCertificates = async () => {
    try {
      const res = await API.get("/certificates");
      setCertificates(res.data.certificates || []);
    } catch (err) {
      console.error("Fetch certificates error:", err);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  // --- File Upload Handler ---
  const uploadImage = async () => {
    if (!file) return null;

    const fd = new FormData();
    fd.append("file", file);

    const res = await API.post("/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
  };

  // --- Save Certificate ---
  const handleSave = async (e) => {
    e.preventDefault();

    let imageUrl = await uploadImage();

    const payload = {
      name: certName,
      company,
      image: imageUrl,
    };

    await API.post("/certificates", payload);

    // --- Premium Popup ---
    setPopupMessage("Certificate Saved Successfully!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);

    // Reset Form
    setCertName("");
    setCompany("");
    setFile(null);

    loadCertificates();
  };

  // --- Delete Certificate ---
  const deleteCertificate = async (id) => {
    await API.delete(`/certificates/${id}`);
    loadCertificates();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">

      {/* ⭐ PREMIUM POPUP ⭐ */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          <div
            className="
              relative bg-gradient-to-br from-purple-600/20 to-indigo-600/20
              border border-white/10 backdrop-blur-xl
              px-10 py-6 rounded-3xl shadow-xl text-center
              animate-scaleIn
            "
          >
            <h2 className="text-white text-xl font-semibold mb-2">
              {popupMessage}
            </h2>

            <p className="text-gray-300 mb-4">Your certificate is now live.</p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                       rounded-xl text-white font-medium shadow-md"
            >
              OK
            </button>
          </div>

          <style>{`
            .animate-fadeIn { animation: fadeIn .25s ease-out; }
            .animate-scaleIn {
              animation: scaleIn .35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes fadeIn { from{opacity:0} to{opacity:1} }
            @keyframes scaleIn {
              from { transform:scale(.85); opacity:0; }
              to   { transform:scale(1); opacity:1; }
            }
          `}</style>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-white">Manage Certificates</h1>

      {/* --- FORM --- */}
      <form
        onSubmit={handleSave}
        className="bg-[#0f1724]/60 border border-white/10 p-6 rounded-xl space-y-5"
      >
        <div>
          <label className="text-gray-300 block mb-1">Certificate Name</label>
          <input
            type="text"
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
            className="inputBox"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-1">Company Name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="inputBox"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-2">Upload Certificate</label>

          <div className="flex items-center justify-between bg-[#141b2d] border border-indigo-500/40 p-3 rounded-lg cursor-pointer">
            <span className="text-gray-400">
              {file ? file.name : "Choose File…"}
            </span>

            <input
              type="file"
              className="hidden"
              id="filePicker"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="filePicker"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm cursor-pointer"
            >
              Browse
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
        >
          Save Certificate
        </button>
      </form>

      {/* --- LIST --- */}
      <h2 className="text-xl font-bold mt-8 mb-3 text-white">Certificates List</h2>

      {certificates.length === 0 && (
        <p className="text-gray-400">No certificates uploaded yet.</p>
      )}

      {certificates.map((c) => (
        <div
          key={c._id}
          className="bg-[#141b2d] border border-white/10 p-4 rounded-xl flex justify-between items-center mt-3"
        >
          <span className="text-white">{c.name}</span>

          <button
            onClick={() => deleteCertificate(c._id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
