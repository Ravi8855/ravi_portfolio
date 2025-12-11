import React from "react";
import { ExternalLink, Code2 } from "lucide-react";

const Internship = () => {
  const internships = [
    {
      id: 1,
      tag: "GUEST HOUSE BOOKING — INTERNSHIP PROJECT",
      role: "Frontend Developer Internship",
      projectName: "Guest House Booking System",
      tasks: [
        "Secure user authentication & registration.",
        "Real-time room availability, pricing, and filtering.",
        "Booking flow with date selection, guest details & summary.",
        "Admin-side views to review & manage bookings.",
        "Fully responsive layout with clean UI.",
      ],
      tech: [
        "React",
        "Tailwind CSS",
        "Frontend Development",
        "Routing",
        "Responsive UI",
      ],
      live: "https://guest-house-booking-nine.vercel.app/",
      code: "https://github.com/Ravi8855/guest-house-booking",
    },
    {
      id: 2,
      tag: "FRONTEND DEVELOPER ASSIGNMENT",
      role: "Frontend Developer Internship",
      projectName: "Task Management Dashboard",
      tasks: [
        "Secure user authentication & registration.",
        "Real-time task creation, updating & deletion.",
        "Modern responsive dashboard layout.",
        "Smooth interactions & high performance.",
      ],
      tech: [
        "React",
        "Tailwind CSS",
        "Authentication",
        "UI/UX Design",
        "CRUD Operations",
      ],
      live: "https://frontend-developer-assignment-six.vercel.app/",
      code: "https://github.com/Ravi8855/frontend-developer-assignment",
    },
  ];

  return (
    <section id="internship" className="w-full py-24 px-4 md:px-10 lg:px-20">
      {/* SECTION HEADING */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          Internship <span className="text-indigo-400">Experience</span>
        </h2>
        <p className="mt-3 text-gray-400 text-lg">
          Real-world projects completed during my internships.
        </p>
      </div>

      {/* INTERNSHIP CARDS */}
      <div className="space-y-20">
        {internships.map((item) => (
          <div
            key={item.id}
            className="
              w-full 
              max-w-6xl 
              mx-auto 
              bg-[#0f1116] 
              border border-white/10 
              rounded-2xl 
              p-10 md:p-14 
              shadow-[0_0_45px_rgba(70,70,120,0.35)] 
              backdrop-blur-xl
              transition-all duration-300
              hover:shadow-[0_0_65px_rgba(110,110,255,0.45)]
            "
          >
            {/* TAG */}
            <p className="text-xs tracking-widest text-indigo-300 mb-6">
              • {item.tag}
            </p>

            {/* TITLE */}
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {item.role}
            </h3>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              {item.projectName}
            </p>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-14">
              {/* LEFT SIDE */}
              <div>
                <h4 className="text-lg text-indigo-300 font-semibold mb-3">
                  Project Task / Scope
                </h4>

                <ul className="space-y-4 text-gray-300 text-[16px] leading-relaxed">
                  {item.tasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-indigo-400 text-xl">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT SIDE */}
              <div>
                <h4 className="text-lg text-indigo-300 font-semibold mb-3">
                  Technologies Used
                </h4>

                <div className="flex flex-wrap gap-3 mb-10">
                  {item.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="
                        px-4 py-1.5 
                        bg-white/5 
                        text-gray-300 
                        rounded-full 
                        border border-white/10
                        text-sm
                        transition-all duration-200
                        hover:bg-indigo-500/25
                        hover:border-indigo-400
                        hover:text-white
                        hover:shadow-[0_0_12px_rgba(99,102,241,0.45)]
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-4">
                  {/* VIEW LIVE */}
                  <a
                    href={item.live}
                    target="_blank"
                    className="
                      flex items-center gap-2
                      px-6 py-3
                      rounded-xl
                      font-medium
                      bg-gradient-to-r from-indigo-500 to-blue-600
                      text-white
                      shadow-[0_0_18px_rgba(99,102,241,0.55)]
                      transition-all duration-300
                      hover:scale-[1.05]
                      hover:shadow-[0_0_28px_rgba(99,102,241,0.75)]
                      active:scale-95
                    "
                  >
                    <ExternalLink size={16} />
                    View Live Project
                  </a>

                  {/* VIEW CODE — MATCHED STYLE */}
                  <a
                    href={item.code}
                    target="_blank"
                    className="
                      flex items-center gap-2
                      px-6 py-3
                      rounded-xl
                      font-medium
                      bg-gradient-to-r from-[#3f4c6b] to-[#606c88]
                      text-gray-200
                      shadow-[0_0_18px_rgba(96,108,136,0.45)]
                      transition-all duration-300
                      hover:scale-[1.05]
                      hover:shadow-[0_0_28px_rgba(96,108,136,0.65)]
                      active:scale-95
                    "
                  >
                    <Code2 size={16} />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Internship;
