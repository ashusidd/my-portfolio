// src/components/ProjectCard.jsx

// 🚀 ADDED 'isAdmin' to the props list
function ProjectCard({ id, title, description, tech, image, liveLink, repoLink, onDelete, isAdmin }) {

    const formatLink = (url) => {
        if (!url) return null;
        return url.startsWith('http') ? url : `https://${url}`;
    };

    return (
        <div className="card">
            {/* 🛡️ SECURITY FIX: Only show delete button if isAdmin is true */}
            {isAdmin && (
                <button className="delete-btn" onClick={() => onDelete(id)}>×</button>
            )}

            {image && <img src={image} alt={title} className="card-image" />}

            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>

                <div className="tags">
                    {tech && tech.map(t => <span key={t} className="tag-badge">{t}</span>)}
                </div>

                <div className="card-links">
                    {liveLink && (
                        <a
                            href={formatLink(liveLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-link"
                        >
                            Live Demo
                        </a>
                    )}

                    {repoLink && (
                        <a
                            href={formatLink(repoLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-repo"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;