import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Generate Captcha
  const generateCaptcha = () => {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // -----------------------------------------------------------
  // FIXED: Send message to backend (Admin Messages Panel Works)
  // -----------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputCaptcha !== captcha) {
      setCaptchaError("Captcha does not match ❌");
      return;
    }

    setCaptchaError("");

    // Collect form data
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      await fetch("http://localhost:4000/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Premium popup
      setShowPopup(true);

      e.target.reset();
      generateCaptcha();
    } catch (err) {
      console.error("Message send error:", err);
    }
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          Contact Me
        </h2>
        <p className="text-sm text-gray-400">
          Feel free to reach out — I'm always available!
        </p>
      </div>

      {/* PREMIUM SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          ></div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="
              relative bg-gradient-to-br from-purple-600/20 to-indigo-600/20
              border border-white/10 px-10 py-6 rounded-3xl shadow-xl 
              text-center backdrop-blur-xl
            "
          >
            <h2 className="text-white text-2xl font-semibold mb-2">
              Message Sent Successfully! 🎉
            </h2>

            <p className="text-gray-300 mb-6">
              Thank you for reaching out. I'll reply soon!
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                         rounded-xl text-white font-medium shadow-md"
            >
              OK
            </button>
          </motion.div>
        </div>
      )}

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[#0f1120] border border-gray-800 p-8 rounded-2xl shadow-xl space-y-6"
      >
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-lg bg-[#111525] border border-gray-700 
                     text-gray-200 outline-none focus:border-indigo-500"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-lg bg-[#111525] border border-gray-700 
                     text-gray-200 outline-none focus:border-indigo-500"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full h-32 p-3 rounded-lg bg-[#111525] border border-gray-700 
                     text-gray-200 outline-none focus:border-indigo-500"
          required
        ></textarea>

        {/* CAPTCHA */}
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-[#14182b] border border-purple-500 rounded-lg text-lg tracking-widest font-bold text-purple-300 shadow-lg">
            {captcha}
          </div>

          <button
            type="button"
            onClick={generateCaptcha}
            className="px-3 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 
                       rounded-lg text-white shadow-md"
          >
            Refresh
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter Captcha"
          className="w-full p-3 rounded-lg bg-[#111525] border border-gray-700 
                     text-gray-200 outline-none focus:border-indigo-500"
          onChange={(e) => setInputCaptcha(e.target.value.toUpperCase())}
          required
        />

        {captchaError && (
          <p className="text-red-400 text-sm">{captchaError}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     hover:from-blue-700 hover:to-indigo-700
                     shadow-lg shadow-blue-500/30
                     transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
