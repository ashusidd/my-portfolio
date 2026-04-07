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

  // --- 2. ADMIN STATE (Persistent) ---
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('is-ashu-admin') === 'true';
  });

  // --- 3. PROJECTS STATE (Persistent) ---
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('my-dashboard-projects');
    return saved ? JSON.parse(saved) : [{
      id: 1,
      title: "Market Expense Tracker",
      description: "A MERN stack app.",
      tech: ["React", "Node.js"],
      image: "https://via.placeholder.com/300x150",
      liveLink: "#",
      repoLink: "#"
    }];
  });

  // --- 4. MESSAGES STATE (Persistent) ---
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('portfolio-messages');
    return saved ? JSON.parse(saved) : [];
  });

  // --- 5. PERSISTENCE LAYER (Syncing to LocalStorage) ---
  useEffect(() => {
    localStorage.setItem('my-dashboard-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio-messages', JSON.stringify(messages));
  }, [messages]);

  // --- 6. ACTION HANDLERS ---

  // 🔐 Admin Unlock Logic
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

  // 📂 Project Handlers
  const addProject = (newProj) => setProjects((prev) => [newProj, ...prev]);
  const deleteProject = (id) => setProjects((prev) => prev.filter((p) => p.id !== id));

  // 📩 Message Handlers
  const handleSendMessage = (msgData) => {
    const newMsg = {
      ...msgData,
      id: Date.now(),
      date: new Date().toLocaleString(),
      reply: ""
    };
    setMessages((prev) => [newMsg, ...prev]);
    alert("Message sent successfully!");
  };

  const handleAdminReply = (id, replyText) => {
    setMessages((prev) =>
      prev.map(m => m.id === id ? { ...m, reply: replyText } : m)
    );
    alert("Reply saved!");
  };

  // 🔍 Search Logic
  const filteredProjects = projects.filter((proj) =>
    proj.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* SIDEBAR */}
      <Sidebar
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        isAdmin={isAdmin}
        onUnlock={handleAdminUnlock}
      />

      {/* MAIN CONTENT */}
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
          <section className="stats-row">
            <StatCard label="Total Projects" value={projects.length} iconColor="#4f46e5" />
            <StatCard label="Inbox Messages" value={messages.length} iconColor="#10b981" />
            <StatCard label="Role" value={isAdmin ? "Admin" : "Visitor"} iconColor="#f59e0b" />
          </section>
        )}

        {/* --- TAB: PROJECTS --- */}
        {activeTab === "Projects" && (
          <>
            {isAdmin && <AddProject onAdd={addProject} />}
            <div className="project-grid">
              {filteredProjects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  {...proj}
                  onDelete={deleteProject}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          </>
        )}

        {/* --- TAB: CONTACT & INBOX --- */}
        {activeTab === "Contact" && (
          <div className="contact-page">
            <ContactForm onSendMessage={handleSendMessage} />
            {isAdmin && (
              <div className="admin-inbox-section">
                <hr style={{ margin: '40px 0', opacity: '0.1' }} />
                <h3 style={{ marginBottom: '20px' }}>Admin Inbox</h3>
                <MessageList messages={messages} onReply={handleAdminReply} />
              </div>
            )}
          </div>
        )}

        {/* --- TAB: SKILLS --- */}
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