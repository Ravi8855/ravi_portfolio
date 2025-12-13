import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import API from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [theme, setTheme] = useState("gold");
  const [captchaValue, setCaptchaValue] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorAnim, setErrorAnim] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  // Generate Captcha
  const generateCaptcha = () => {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCaptchaValue(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorAnim(false);
    setSuccessAnim(false);

    if (inputCaptcha !== captchaValue) {
      toast.error("❌ Incorrect Captcha!");
      setErrorAnim(true);
      return;
    }

    if (!username || !password) {
      toast.error("⚠️ Enter Username and Password");
      setErrorAnim(true);
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/admin/login", { username, password });

      const { token } = res.data;
      localStorage.setItem("token", token);

      toast.success("✅ Login Successful!");
      setSuccessAnim(true);

      setTimeout(() => {
        window.location.href = "/admin/dashboard"; // ✅ FIXED
      }, 600);

    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error("❌ Wrong Username or Password");
      } else {
        toast.error("⚠️ Server Error");
      }
      setErrorAnim(true);
    }

    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0f0f14]">

      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 2500,
          style: {
            padding: "14px 22px",
            borderRadius: "18px",
            background: "rgba(255, 255, 255, 0.08)",
            color: "white",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 25px rgba(255,255,255,0.15)",
            fontSize: "16px",
            fontWeight: "500",
          },
          success: {
            style: {
              border: "1px solid rgba(0,255,120,0.45)",
              boxShadow: "0 0 30px rgba(0,255,120,0.35)",
            },
          },
          error: {
            style: {
              border: "1px solid rgba(255,60,60,0.45)",
              boxShadow: "0 0 30px rgba(255,60,60,0.35)",
            },
          },
        }}
      />

      <div className={`absolute inset-0 overflow-hidden ${theme}`}>
        <span className="sphere sphere1"></span>
        <span className="sphere sphere2"></span>
        <span className="sphere sphere3"></span>
        <span className="sphere sphere4"></span>
        <span className="sphere sphere5"></span>
      </div>

      <div
        className={`relative z-10 w-[420px] p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_0_80px_rgba(255,255,255,0.15)] transition duration-300
        ${errorAnim ? "shake" : ""} ${successAnim ? "glow" : ""}`}
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Admin Login
        </h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none
            focus:ring-2 focus:ring-yellow-300 hover:bg-white/25 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none
              focus:ring-2 focus:ring-yellow-300 hover:bg-white/25 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="absolute right-3 top-3.5 text-white cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center bg-white/20 px-4 py-3 rounded-xl text-white font-bold tracking-widest">
              {captchaValue}
              <button type="button" onClick={generateCaptcha} className="text-yellow-300">
                ↻
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter Captcha"
              value={inputCaptcha}
              onChange={(e) => setInputCaptcha(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none
              focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold
            shadow-lg hover:scale-105 active:scale-95 transition disabled:opacity-60"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
