import React, { useEffect, useState } from "react";
import API from "../api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    API.get("/projects")
      .then((res) => setProjects(res.data.projects || []))
      .catch((err) => {
        console.error("Fetch projects error", err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="container max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-16">
           Projects
        </h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">Loading...</p>
        )}

        {/* No Projects */}
        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-400">
            No projects added yet — add them from Admin Dashboard.
          </p>
        )}

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((p) => (
            <div key={p._id} className="premium-3d-card">

              {/* IMAGE */}
              <div className="premium-card-image">
                {p.image ? (
                  <img src={p.image} alt={p.title} />
                ) : (
                  <div className="no-image-box">No Image</div>
                )}
              </div>

              {/* TEXT CONTENT */}
              <div className="premium-card-body">
                
                <h3 className="premium-card-title">{p.title}</h3>

                <p className="premium-card-desc">{p.description}</p>

                {/* BUTTONS */}
                <div className="premium-btn-row">
                  {p.repo && (
                    <a
                      href={p.repo}
                      className="premium-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code
                    </a>
                  )}

                  {p.url && (
                    <a
                      href={p.url}
                      className="premium-btn premium-btn-glow"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
