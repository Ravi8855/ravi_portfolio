import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  return (
    <div className="pro-card">
      <div className="pro-img-wrap">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className="pro-no-img">No Image</div>
        )}
      </div>

      <div className="pro-content">
        <h3 className="pro-title">{project.title}</h3>
        <p className="pro-desc">{project.description}</p>

        <div className="pro-stack">
          {project.stack?.map((item, i) => (
            <span key={i} className="pro-chip">{item}</span>
          ))}
        </div>

        <div className="pro-actions">
          {project.repo && (
            <a href={project.repo} target="_blank" className="pro-btn">
              <FaGithub size={16} /> Repo
            </a>
          )}
          {project.url && (
            <a href={project.url} target="_blank" className="pro-btn pro-live">
              <FaExternalLinkAlt size={16} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
