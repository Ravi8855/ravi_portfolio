import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#050816] via-[#050818] to-[#02030a] pt-28"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-700/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -right-20 w-[28rem] h-[28rem] bg-violet-600/35 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-[32rem] h-[32rem] -translate-x-1/2 -translate-y-1/2 bg-amber-400/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 md:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs md:text-sm tracking-[0.18em] uppercase text-slate-300/90 shadow-[0_0_25px_rgba(236,72,153,0.35)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Full-Stack Developer · AI Enthusiast
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-purple-400 drop-shadow-[0_0_25px_rgba(244,114,182,0.55)]">
              Ravi
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-4 max-w-xl text-[15px] md:text-base leading-relaxed text-slate-300/90"
          >
            I build fast, modern and intelligent web applications with clean UI,
            scalable architecture and a strong focus on real-world impact.
          </motion.p>

          {/* ULTRA-GLOW INFORMATION CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-10 grid gap-4 sm:grid-cols-3 w-full max-w-2xl"
          >
            {/* CARD 1 — Current Focus */}
            <div className="group relative p-[2px] rounded-2xl bg-gradient-to-br from-fuchsia-500 via-pink-400 to-purple-500 shadow-[0_0_45px_rgba(236,72,153,0.4)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(236,72,153,0.6)]">
              <div className="rounded-2xl bg-[#0d0f1b]/70 backdrop-blur-xl p-4 h-full">
               <h4 className="text-[13px] md:text-[15px] font-semibold tracking-[0.15em] uppercase text-slate-300 mb-1">
  Current Focus
</h4>

                <p className="text-sm text-slate-100">
                  Full-Stack & Software Developer
                </p>
                <div className="mt-3 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent transition-all duration-500" />
              </div>
            </div>

            {/* CARD 2 — Location */}
            <div className="group relative p-[2px] rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-indigo-500 shadow-[0_0_45px_rgba(14,165,233,0.35)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(14,165,233,0.55)]">
              <div className="rounded-2xl bg-[#0d0f1b]/70 backdrop-blur-xl p-4 h-full">
               <h4 className="text-[13px] md:text-[15px] font-semibold tracking-[0.15em] uppercase text-slate-300 mb-1">
  Location
</h4>

                <p className="text-sm text-slate-100">
                  Mysuru, Karnataka · India
                </p>
                <div className="mt-3 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent transition-all duration-500" />
              </div>
            </div>

            {/* CARD 3 — What I Love */}
            <div className="group relative p-[2px] rounded-2xl bg-gradient-to-br from-amber-300 via-orange-400 to-red-500 shadow-[0_0_45px_rgba(249,115,22,0.35)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(249,115,22,0.55)]">
              <div className="rounded-2xl bg-[#0d0f1b]/70 backdrop-blur-xl p-4 h-full">
                <h4 className="text-[13px] md:text-[15px] font-semibold tracking-[0.15em] uppercase text-slate-300 mb-1">
  What I Love
</h4>

                <p className="text-sm text-slate-100">
                  3D interfaces, sign-language tech & smooth UX
                </p>
                <div className="mt-3 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent transition-all duration-500" />
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="mt-16 flex w-full justify-center">
            <div className="flex flex-col items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-slate-500">
              <div className="flex h-10 w-6 items-center justify-center rounded-full border border-slate-500/70">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-2 w-1 rounded-full bg-slate-300"
                />
              </div>
              <span>Scroll</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
