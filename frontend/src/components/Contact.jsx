import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from "lucide-react";

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-11 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-300/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)] sm:px-12 sm:py-4";

  // -----------------------------------------------------------
  // FIXED: Send message to backend (Admin Messages Panel Works)
  // -----------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      await fetch("https://ravi-portfolio-syt2.onrender.com/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Premium popup
      setShowPopup(true);

      e.target.reset();
    } catch (err) {
      console.error("Message send error:", err);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#050816] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_34%)]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto mb-8 max-w-3xl text-center sm:mb-12"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:tracking-[0.32em]">
          Let's connect
        </p>
        <h2 className="mb-4 bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl">
          Contact Me
        </h2>
        <p className="text-sm leading-6 text-slate-400 md:text-base">
          Have a project, opportunity, or collaboration in mind? Send a message
          and I will get back to you soon.
        </p>
      </motion.div>

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
              border border-white/10 w-[calc(100%-2rem)] max-w-md px-6 py-6 sm:px-10 rounded-3xl shadow-xl 
              text-center backdrop-blur-xl
            "
          >
            <h2 className="text-white text-xl sm:text-2xl font-semibold mb-2">
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

      <div className="relative z-10 mx-auto grid max-w-6xl gap-5 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 sm:text-left md:p-10 lg:rounded-[2rem]"
        >
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl" />
          <div className="relative">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.25)] sm:mb-8 sm:h-14 sm:w-14">
              <Sparkles size={26} />
            </div>

            <h3 className="mb-3 text-xl font-bold tracking-tight sm:mb-4 sm:text-2xl md:text-3xl">
              Let's build something meaningful together.
            </h3>
            <p className="mb-6 text-sm leading-6 text-slate-400 sm:mb-8 sm:leading-7 md:text-base">
              Share the details and I will respond with clear next steps. Your
              message goes directly to the admin panel for a faster reply.
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Response
                </p>
                <p className="mt-1 font-semibold text-slate-100">
                  Usually within 24 hours
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Best for
                </p>
                <p className="mt-1 font-semibold text-slate-100">
                  Projects, internships, freelance work
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-3xl border border-cyan-300/15 bg-slate-950/70 p-5 shadow-[0_30px_100px_rgba(8,47,73,0.45)] backdrop-blur-2xl sm:p-6 md:p-8 lg:rounded-[2rem]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl" />

          <div className="relative space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                />
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Message
              </label>
              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-4 top-5 text-cyan-300"
                />
                <textarea
                  name="message"
                  placeholder="Tell me about your idea, role, or project..."
                  className={`${inputClass} min-h-36 resize-none leading-6 sm:min-h-40`}
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-6 py-3.5 font-semibold text-white shadow-[0_18px_45px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(34,211,238,0.35)] sm:py-4"
            >
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
              <span className="relative">Send Message</span>
              <Send size={18} className="relative transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
