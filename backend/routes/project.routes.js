import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // ✅ CORRECT PLACE FOR THIS LINE
        const res = await axios.get(`${API}/projects`);
        setProjects(res.data.projects); // 👈 THIS WAS MISSING
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section id="projects" className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-600 mt-2">{project.description}</p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 mt-3 inline-block"
              >
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
