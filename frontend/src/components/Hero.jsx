import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const roleText = "Software Developer";

const bubbles = [
  { className: "left-2 top-8 h-3 w-3", delay: 0, moveX: 10, moveY: -18 },
  { className: "right-4 top-10 h-4 w-4", delay: 0.7, moveX: -12, moveY: -22 },
  { className: "left-0 bottom-16 h-5 w-5", delay: 1.1, moveX: 14, moveY: -16 },
  { className: "right-0 bottom-12 h-3 w-3", delay: 1.6, moveX: -10, moveY: -20 },
  { className: "left-10 -bottom-2 h-2.5 w-2.5", delay: 2.1, moveX: 8, moveY: -14 },
  { className: "right-12 -top-3 h-2.5 w-2.5", delay: 2.6, moveX: -8, moveY: 14 },
];

const roleContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.2,
    },
  },
};

const roleLetter = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? -28 : 28,
    y: index % 3 === 0 ? -36 : 36,
    rotate: index % 2 === 0 ? -10 : 10,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#050816] pt-28 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.16),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-5xl items-center justify-center px-6 py-16 md:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.16,
                delayChildren: 0.1,
              },
            },
          }}
          className="w-full"
        >
          <div className="relative mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 md:py-12">
            <div className="absolute left-8 top-8 h-20 w-20 rounded-full border border-sky-300/20 bg-sky-300/10 blur-xl" />
            <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full border border-indigo-300/20 bg-indigo-300/10 blur-xl" />
            <motion.div
              animate={{ y: [0, -14, 0], opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-16 top-16 h-2 w-2 rounded-full bg-sky-300"
            />
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 left-14 h-2.5 w-2.5 rounded-full bg-indigo-300"
            />

            <motion.p
              variants={roleContainer}
              className="relative mb-10 text-sm font-semibold uppercase tracking-[0.28em] sm:text-base"
              aria-label={roleText}
            >
              {Array.from(roleText).map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  custom={index}
                  variants={roleLetter}
                  className={`inline-block bg-gradient-to-r from-sky-200 via-cyan-300 to-sky-200 bg-[length:200%_100%] bg-clip-text text-transparent ${
                    letter === " " ? "w-3 sm:w-4" : ""
                  }`}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.p>

            <div className="relative mx-auto h-60 w-60 rounded-full bg-gradient-to-br from-sky-300 via-indigo-300 to-white p-[4px] shadow-[0_30px_90px_rgba(56,189,248,0.28)] sm:h-72 sm:w-72">
              {bubbles.map((bubble, index) => (
                <motion.span
                  key={index}
                  animate={{
                    x: [0, bubble.moveX, 0],
                    y: [0, bubble.moveY, 0],
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.9, 0.35],
                  }}
                  transition={{
                    duration: 3.6 + index * 0.35,
                    delay: bubble.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`pointer-events-none absolute rounded-full border border-cyan-200/70 bg-cyan-200/20 shadow-[0_0_18px_rgba(125,211,252,0.75)] backdrop-blur-sm ${bubble.className}`}
                />
              ))}
              <div className="h-full w-full overflow-hidden rounded-full border-[6px] border-[#07111f] bg-slate-950">
                <img
                  src="/ravi-profile.png"
                  alt="Ravi Chalmar professional portrait"
                  className="h-full w-full object-cover object-[center_18%]"
                />
              </div>
            </div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-8 text-5xl font-bold tracking-tight md:text-7xl"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block bg-gradient-to-r from-white via-sky-100 to-slate-300 bg-[length:180%_100%] bg-clip-text text-transparent"
              >
                Ravi Chalmar
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
            >
              Software developer focused on designing and developing modern web
              applications with clean UI, scalable architecture, secure APIs,
              and smooth user experiences that solve real-world problems
              efficiently.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-950/45 px-5 py-3 text-sm font-medium text-slate-300"
            >
              <MapPin size={18} className="text-sky-300" />
              Pune, Maharashtra, India
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
