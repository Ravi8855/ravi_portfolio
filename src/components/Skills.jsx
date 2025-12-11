import React from "react";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaCloud,
  FaTools,
  FaBrain,
} from "react-icons/fa";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Frontend Development",
    Icon: FaCode,
    accent: "from-indigo-400 to-sky-400",
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "SASS/SCSS",
      "Redux",
      "Vue.js",
      "Angular",
      "Responsive Design",
    ],
  },
  {
    name: "Backend Development",
    Icon: FaServer,
    accent: "from-sky-400 to-cyan-400",
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "GraphQL",
      "Python",
      "Flask",
      "Java",
      "Spring Boot",
      "PHP",
      "C#",
      ".NET",
    ],
  },
  {
    name: "Databases",
    Icon: FaDatabase,
    accent: "from-purple-400 to-indigo-400",
    skills: [
      "MySQL",
      "MongoDB",,
      "Firebase",
      "SQL",
      "NoSQL",
      "Database Design",
      "ORM (Sequelize, Mongoose)",
    ],
  },
  {
    name: "Cloud & DevOps",
    Icon: FaCloud,
    accent: "from-cyan-400 to-emerald-400",
    skills: [
      "AWS",
      "EC2",
      "S3",
      "Azure",
      "Google Cloud",
      "Docker",,
      "Git",
      "GitHub Actions",
    ],
  },
  {
    name: "Version Control & Tools",
    Icon: FaTools,
    accent: "from-fuchsia-400 to-indigo-400",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "Postman",
      "VS Code",
      "Webpack",
    ],
  },
  {
    name: "Machine Learning & AI",
    Icon: FaBrain,
    accent: "from-violet-400 to-sky-400",
    skills: [
      "TensorFlow.js",
      "Python ML",
      "Scikit-learn",
      "Neural Networks",
      "Computer Vision",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full py-24 px-6 md:px-12 bg-[#050816] text-white overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 w-80 h-80 bg-indigo-600/25 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 right-0 w-96 h-96 bg-purple-600/25 blur-3xl rounded-full" />
        <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.25),transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-slate-400 mb-3">
          </p>

          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Tech <span className="text-indigo-400">Stack</span>
            </h2>
            <div className="mt-3 h-[3px] w-full rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 shadow-[0_0_20px_rgba(129,140,248,0.9)]" />
          </div>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          </p>
        </motion.div>

        {/* ULTRA-MAX LAYOUT (no cards, clean grid) */}
        <div className="grid gap-14 lg:gap-16 lg:grid-cols-2">
          {categories.map(({ name, Icon, accent, skills }, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="w-full"
            >
              {/* Category header row */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`
                    flex h-11 w-11 items-center justify-center
                    rounded-2xl bg-gradient-to-br ${accent}
                    shadow-[0_0_18px_rgba(129,140,248,0.7)]
                    shrink-0
                  `}
                >
                  <Icon className="text-white text-lg" />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-lg md:text-xl font-semibold tracking-wide">
                    {name}
                  </h3>
                  <span className="mt-1 h-[2px] w-20 bg-gradient-to-r from-indigo-400 via-sky-400 to-transparent rounded-full" />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-600/80 to-transparent mb-5" />

              {/* Skill chips */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      y: -4,
                      scale: 1.04,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="
                      px-4 py-2
                      rounded-xl
                      text-[13px] md:text-[14px]
                      font-medium
                      bg-slate-900/70
                      border border-slate-700/70
                      text-slate-200
                      backdrop-blur-md
                      shadow-[0_8px_24px_rgba(15,23,42,0.75)]
                      hover:border-indigo-400
                      hover:text-white
                      hover:bg-indigo-500/20
                      hover:shadow-[0_0_18px_rgba(129,140,248,0.8)]
                      transition-all
                    "
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
