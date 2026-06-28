import React from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ClipboardCheck,
  CloudUpload,
  Code,
  Database,
  Mouse,
  Settings,
  Wrench,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const workflowSteps = [
  {
    title: "FRONTEND",
    Icon: Code,
    position: "left-1/2 top-[8%]",
    labelPosition: "left-1/2 top-full mt-2 -translate-x-1/2 text-center sm:mt-3",
    labelAlign: "items-center",
    glow: "from-cyan-300 to-teal-300 text-cyan-200 shadow-cyan-400/50",
  },
  {
    title: "BACKEND",
    Icon: Settings,
    position: "left-[83%] top-[27%]",
    labelPosition:
      "left-1/2 top-full mt-2 -translate-x-1/2 text-center sm:left-full sm:top-1/2 sm:ml-3 sm:mt-0 sm:-translate-x-0 sm:-translate-y-1/2 sm:text-left",
    labelAlign: "items-center sm:items-start",
    glow: "from-sky-300 to-blue-500 text-sky-200 shadow-sky-400/50",
  },
  {
    title: "DATABASE",
    Icon: Database,
    position: "left-[83%] top-[73%]",
    labelPosition:
      "left-1/2 top-full mt-2 -translate-x-1/2 text-center sm:left-full sm:top-1/2 sm:ml-3 sm:mt-0 sm:-translate-x-0 sm:-translate-y-1/2 sm:text-left",
    labelAlign: "items-center sm:items-start",
    glow: "from-violet-300 to-fuchsia-500 text-violet-200 shadow-violet-400/50",
  },
  {
    title: "TESTING",
    Icon: ClipboardCheck,
    position: "left-1/2 top-[92%]",
    labelPosition: "bottom-full left-1/2 mb-2 -translate-x-1/2 text-center sm:mb-3",
    labelAlign: "items-center",
    glow: "from-amber-300 to-orange-500 text-orange-200 shadow-orange-400/50",
  },
  {
    title: "DEPLOYMENT",
    Icon: CloudUpload,
    position: "left-[17%] top-[73%]",
    labelPosition:
      "left-1/2 top-full mt-2 -translate-x-1/2 text-center sm:right-full sm:left-auto sm:top-1/2 sm:mr-3 sm:mt-0 sm:-translate-y-1/2 sm:translate-x-0 sm:text-right",
    labelAlign: "items-center sm:items-end",
    glow: "from-cyan-300 to-sky-500 text-cyan-200 shadow-cyan-400/50",
  },
  {
    title: "MAINTENANCE",
    Icon: Wrench,
    position: "left-[17%] top-[27%]",
    labelPosition:
      "left-1/2 top-full mt-2 -translate-x-1/2 text-center sm:right-full sm:left-auto sm:top-1/2 sm:mr-3 sm:mt-0 sm:-translate-y-1/2 sm:translate-x-0 sm:text-right",
    labelAlign: "items-center sm:items-end",
    glow: "from-pink-300 to-purple-500 text-pink-200 shadow-pink-400/50",
  },
];

const particles = [
  "left-[3%] top-[18%] h-1.5 w-1.5",
  "left-[9%] top-[31%] h-1 w-1",
  "left-[18%] top-[8%] h-1.5 w-1.5",
  "left-[27%] bottom-[15%] h-2 w-2",
  "left-[36%] top-[19%] h-1 w-1",
  "left-[47%] bottom-[7%] h-1.5 w-1.5",
  "right-[4%] top-[21%] h-2 w-2",
  "right-[11%] bottom-[21%] h-1 w-1",
  "right-[19%] top-[10%] h-1.5 w-1.5",
  "right-[29%] bottom-[12%] h-1.5 w-1.5",
  "right-[37%] top-[24%] h-1 w-1",
  "left-[62%] top-[17%] h-1.5 w-1.5",
];

const orbitPath =
  "M 360 64 C 495 68 612 139 656 248 C 704 368 665 505 560 586 C 447 673 273 673 160 586 C 55 505 16 368 64 248 C 108 139 225 68 360 64";

const WorkflowStep = ({ step, index }) => {
  const Icon = step.Icon;

  return (
    <div className={`absolute z-30 ${step.position}`}>
      <motion.div
        animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
        transition={{
          duration: 4.6 + index * 0.25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.12,
        }}
        whileHover={{ scale: 1.1 }}
        className="relative -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 24px rgba(34,211,238,0.28), inset 0 0 20px rgba(255,255,255,0.06)",
              "0 0 44px rgba(34,211,238,0.58), inset 0 0 28px rgba(255,255,255,0.1)",
              "0 0 24px rgba(34,211,238,0.28), inset 0 0 20px rgba(255,255,255,0.06)",
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-[#071124]/85 shadow-lg backdrop-blur-md sm:h-16 sm:w-16 lg:h-[82px] lg:w-[82px] ${step.glow}`}
        >
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20" />
          <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.glow.split(" ").slice(0, 2).join(" ")} opacity-15`} />
          <Icon
            size={34}
            strokeWidth={1.7}
            className="relative z-10 drop-shadow-[0_0_14px_currentColor]"
          />
        </motion.div>

        <div
          className={`absolute z-20 flex min-w-[5.25rem] flex-col gap-1 sm:min-w-[8rem] ${step.labelAlign} ${step.labelPosition}`}
        >
          <span className="text-[8px] font-black tracking-[0.14em] text-white drop-shadow-[0_0_12px_rgba(125,211,252,0.9)] min-[430px]:text-[9px] sm:text-[11px] lg:text-sm">
            {step.title}
          </span>
          <span className="h-px w-8 rounded-full bg-cyan-300/70 shadow-[0_0_12px_rgba(34,211,238,0.9)] sm:w-14" />
        </div>
      </motion.div>
    </div>
  );
};

const WorkflowOrbit = () => {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto aspect-square w-[min(90vw,720px)] max-w-[720px] sm:w-[min(86vw,720px)]"
    >
      <div className="absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <svg
        viewBox="0 0 720 720"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="workflow-orbit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#a855f7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.22" />
          </linearGradient>
        </defs>
        <path
          d={orbitPath}
          fill="none"
          stroke="url(#workflow-orbit)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 12"
        />
        <path
          d={orbitPath}
          fill="none"
          stroke="rgba(125,211,252,0.2)"
          strokeWidth="10"
          strokeLinecap="round"
          className="blur-md"
        />
        <motion.circle
          r="5"
          fill="#67e8f9"
          filter="drop-shadow(0 0 12px #67e8f9)"
        >
          <animateMotion dur="12s" repeatCount="indefinite" path={orbitPath} />
        </motion.circle>
      </svg>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-300/25 shadow-[0_0_72px_rgba(34,211,238,0.12)]"
      />

      <div className="absolute left-1/2 top-1/2 z-20 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 min-[430px]:h-[36%] min-[430px]:w-[36%] lg:h-[34%] lg:w-[34%]">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 36px rgba(91,200,255,0.42), 0 0 86px rgba(168,85,247,0.16)",
              "0 0 62px rgba(91,200,255,0.72), 0 0 122px rgba(168,85,247,0.28)",
              "0 0 36px rgba(91,200,255,0.42), 0 0 86px rgba(168,85,247,0.16)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative h-full w-full rounded-full bg-gradient-to-br from-cyan-200 via-sky-400 to-violet-500 p-[4px] sm:p-[5px]"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.38, 0.75, 0.38] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-7 rounded-full bg-cyan-400/25 blur-2xl"
          />
          <div className="relative h-full w-full overflow-hidden rounded-full border-[5px] border-[#07111f] bg-slate-950 sm:border-[7px]">
            <motion.img
              src="/ravi-profile.png"
              alt="Ravi Chalmar professional portrait"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full object-cover object-[center_18%]"
            />
          </div>
        </motion.div>
      </div>

      {workflowSteps.map((step, index) => (
        <WorkflowStep key={step.title} step={step} index={index} />
      ))}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative -mt-20 min-h-screen w-full overflow-hidden bg-[#05070f] pt-20 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(34,211,238,0.2),transparent_30%),radial-gradient(circle_at_18%_42%,rgba(168,85,247,0.14),transparent_26%),radial-gradient(circle_at_82%_44%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#05070f_0%,#050816_48%,#080d1c_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(226,232,240,0.34)_1px,transparent_1.5px)] bg-[length:96px_96px] opacity-25" />
        {particles.map((particle, index) => (
          <motion.span
            key={particle}
            animate={{
              x: [0, index % 2 === 0 ? 18 : -18, 0],
              y: [0, index % 3 === 0 ? -22 : 20, 0],
              opacity: [0.2, 0.95, 0.2],
              scale: [1, 1.45, 1],
            }}
            transition={{
              duration: 4.5 + (index % 4) * 0.65,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.14,
            }}
            className={`absolute rounded-full bg-cyan-300/80 shadow-[0_0_18px_rgba(91,200,255,0.95)] ${particle}`}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 md:px-10 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
              },
            },
          }}
          className="w-full"
        >
          <div className="relative z-30 mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center text-center">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.38em] text-sky-100/90 sm:mb-4 sm:text-sm lg:tracking-[0.6em]"
            >
              FULL STACK DEVELOPER
            </motion.p>

            <WorkflowOrbit />

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-10 text-4xl font-extrabold tracking-tight text-white sm:mt-8 sm:text-5xl lg:mt-6 lg:text-6xl"
            >
              Ravi Chalmar
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"
            >
              Full Stack Developer focused on designing and developing modern web
              applications with clean UI, scalable architecture, secure APIs,
              and smooth user experiences that solve real-world problems
              efficiently.
            </motion.p>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-7 flex flex-col items-center gap-2 text-slate-300/85"
              aria-hidden="true"
            >
              <Mouse size={26} strokeWidth={1.5} />
              <ChevronDown size={18} strokeWidth={1.7} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
