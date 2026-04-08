import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProjectCard from './components/ProjectCard';
import StatCard from './components/StatCard';
import ContactForm from './components/ContactForm';
import AddProject from './components/AddProject';
import MessageList from './components/MessageList';
import './App.css';

function App() {
  // --- 1. UI STATE ---
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");

  // --- 2. ADMIN STATE ---
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('is-ashu-admin') === 'true';
  });

  // --- 3. PROJECTS STATE ---
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('my-dashboard-projects');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "Solar Powered Garbage Collector",
        description: "An automated robot designed for waste management using Arduino and solar energy.",
        tech: ["Arduino", "C++", "Solar Tech"],
        image: "/images/garbage-bot.jpg",
        liveLink: "#",
        repoLink: "#"
      },
      {
        id: 2,
        title: "Market Expense Tracker",
        description: "A full-stack tracking application to manage and split group expenses efficiently.",
        tech: ["React", "JavaScript", "LocalStorage"],
        image: "/images/expense-app.png",
        liveLink: "#",
        repoLink: "#"
      }
    ];
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('portfolio-messages');
    return saved ? JSON.parse(saved) : [];
  });

  // --- 4. PERSISTENCE (Only for Projects and Messages) ---
  useEffect(() => {
    localStorage.setItem('my-dashboard-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio-messages', JSON.stringify(messages));
  }, [messages]);

  // --- 5. ACTION HANDLERS ---
  const handleAdminUnlock = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.removeItem('is-ashu-admin');
      alert("Admin Mode: OFF.");
    } else {
      const password = prompt("Enter Secret Key:");
      if (password === "Ashuuu") {
        setIsAdmin(true);
        localStorage.setItem('is-ashu-admin', 'true');
        alert("Welcome, Ashu! Admin Mode: ON 🚀");
      } else {
        alert("Wrong Key!");
      }
    }
  };

  const addProject = (newProj) => setProjects((prev) => [newProj, ...prev]);
  const deleteProject = (id) => setProjects((prev) => prev.filter((p) => p.id !== id));

  const filteredProjects = projects.filter((proj) =>
    proj.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-theme' : ''}`}>
      <Sidebar
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        isAdmin={isAdmin}
        onUnlock={handleAdminUnlock}
      />

      <main className="content">
        <header className="content-header">
          <h1>{activeTab}</h1>
          <div className="header-controls">
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <input
              type="text"
              placeholder="Search Project"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value.length > 0) setActiveTab("Projects");
              }}
            />
          </div>
        </header>

        {/* --- TAB: DASHBOARD --- */}
        {activeTab === "Dashboard" && (
          <div className="dashboard-view">
            <section className="stats-row">
              <StatCard label="Total Projects" value={projects.length} iconColor="#4f46e5" />
              <StatCard label="Inbox Messages" value={messages.length} iconColor="#10b981" />
              <StatCard label="Role" value={isAdmin ? "Admin" : "Visitor"} iconColor="#f59e0b" />
            </section>

            {/* CV & SOCIALS SECTION - DIRECTLY IN CODE */}
            <div className="profile-card card glass-card">
              <h3>Connect & Resume</h3>
              <div className="profile-actions">
                <div className="visitor-links">
                  {/* 🔗 Replace '#' with your Google Drive Link */}
                  <a href="#" target="_blank" rel="noreferrer" className="cv-btn">
                    📥 Download CV
                  </a>
                  <div className="social-group">
                    <a href="https://linkedin.com/in/ashrafali" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="https://instagram.com/er_ashuuu" target="_blank" rel="noreferrer">Instagram</a>
                    <a href="https://github.com/ashusidd" target="_blank" rel="noreferrer">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- OTHER TABS --- */}
        {activeTab === "Projects" && (
          <>
            {isAdmin && <AddProject onAdd={addProject} />}
            <div className="project-grid">
              {filteredProjects.map((proj) => (
                <ProjectCard key={proj.id} {...proj} onDelete={deleteProject} isAdmin={isAdmin} />
              ))}
            </div>
          </>
        )}

        {activeTab === "Contact" && (
          <div className="contact-page">
            <ContactForm />
            {isAdmin && messages.length > 0 && (
              <div className="admin-inbox-section">
                <hr style={{ margin: '40px 0', opacity: '0.1' }} />
                <h3>Local History (Admin Only)</h3>
                <MessageList messages={messages} />
              </div>
            )}
          </div>
        )}

        {activeTab === "Skills" && (
          <div className="card glass-card">
            <h3>Technical Skills</h3>
            <p style={{ marginTop: '10px', lineHeight: '1.6' }}>
              <strong>Frontend:</strong> React, JavaScript (ES6+), HTML5, CSS3 <br />
              <strong>Backend:</strong> Node.js, Express, MongoDB <br />
              <strong>Hardware:</strong> Arduino, C++, Solar Tech
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;