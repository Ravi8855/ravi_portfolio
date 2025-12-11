import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="w-full min-h-screen bg-[#050816] text-white flex justify-center px-6 md:px-10 lg:px-16 py-20"
    >
      <div className="w-full max-w-6xl">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-slate-400 mb-3">
            Get to know me
          </p>

          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              About <span className="text-cyan-300">Me</span>
            </h2>
            <div className="mt-2 h-[3px] w-full rounded-full bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />
          </div>
        </motion.div>

        {/* GRID LAYOUT */}
        <div className="grid gap-16 lg:gap-20 lg:grid-cols-2 items-start">

          {/* LEFT — SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-300">
              A passionate{" "}
              <span className="text-indigo-400 font-semibold">
                Full-Stack Developer
              </span>{" "}
              &amp;
              <span className="text-pink-400 font-semibold"> AI Enthusiast</span>{" "}
              from
              <span className="text-blue-300 font-semibold"> Mysuru, Karnataka</span>.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              I'm a final-year Computer Science student who loves building fast,
              modern and intelligent applications. I enjoy working on interactive
              UIs, 3D experiences, and solving real-world problems with clean and
              meaningful code.
            </p>

            {/* Resume + Status Badge */}
            <div className="mt-6 flex flex-wrap gap-4">

              <a
                href="/Ravi_Resume.pdf"
                download
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-6 py-2.5 text-sm md:text-base font-semibold text-white shadow-[0_16px_40px_rgba(79,70,229,0.7)] hover:scale-[1.03] active:scale-[0.97] transition-transform"
              >
                Download Resume
              </a>

              <div
                className="
                  inline-flex items-center justify-center
                  rounded-xl
                  px-6 py-2.5
                  text-sm md:text-base font-semibold text-white
                  bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500
                  shadow-[0_16px_40px_rgba(79,70,229,0.7)]
                  hover:scale-[1.03]
                  active:scale-[0.97]
                  transition-transform
                "
              >
                🎓 B.Tech Final Year Student, Mysore
              </div>

            </div>
          </motion.div>

          {/* RIGHT — EDUCATION TIMELINE */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Vertical glowing line */}
            <div className="absolute left-4 top-0 bottom-0 hidden sm:block">
              <div className="h-full w-[2px] bg-gradient-to-b from-cyan-300 via-blue-500/70 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
            </div>

            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-cyan-300 flex items-center gap-2">
              🎓 Education
            </h3>

            <div className="space-y-10">
              {[
                {
                  title: "Bachelor of Engineering – Computer Science",
                  year: "2022 – 2026",
                  college: "VTU Center for PG Studies, Mysuru",
                  scoreLabel: "CGPA",
                  score: "8.2 / 10",
                },
                {
                  title: "PU Science",
                  year: "2020 – 2022",
                  college: "Bendre PU Science College, Dharwad",
                  scoreLabel: "Percentage",
                  score: "83%",
                },
                {
                  title: "SSLC",
                  year: "2019 – 2020",
                  college: "Morarji Desai Residential School, Shahapur",
                  scoreLabel: "Percentage",
                  score: "82%",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-0 sm:pl-10"
                >
                  {/* Glowing dot */}
                  <span className="hidden sm:block absolute left-[0.75rem] top-1 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,1)]" />

                  {/* Card */}
                  <div
                    className="
                      group relative rounded-2xl 
                      border border-cyan-300/20 
                      bg-white/5 
                      backdrop-blur-xl 
                      p-5 md:p-6 
                      transition-all duration-300
                      shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                      hover:shadow-[0_0_45px_rgba(34,211,238,0.9)]
                      hover:border-cyan-300/60
                      hover:scale-[1.02]
                    "
                  >
                    {/* FIX: Title left | Year right always aligned */}
                    <div className="flex items-start justify-between w-full">
                      <h4 className="text-lg md:text-xl font-bold text-white max-w-[75%]">
                        {item.title}
                      </h4>

                      <p className="text-xs md:text-sm text-gray-300 whitespace-nowrap text-right">
                        {item.year}
                      </p>
                    </div>

                    <p className="text-sm text-indigo-300 mt-1">{item.college}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {item.scoreLabel}:{" "}
                      <span className="text-green-400 font-semibold">{item.score}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
