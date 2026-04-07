// src/components/Sidebar.jsx
function Sidebar({ setActiveTab, activeTab, onUnlock, isAdmin }) {
    const menuItems = ["Dashboard", "Projects", "Skills", "Contact"];

    return (
        <aside className="sidebar">
            {/* 🚀 Your Brand Title */}
            <h2>Ashu's Portfo</h2>

            <ul>
                {menuItems.map((item) => (
                    <li
                        key={item}
                        /* This dynamically adds the 'active' class if the tab matches */
                        className={`menu-item ${activeTab === item ? 'active' : ''}`}
                        onClick={() => setActiveTab(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {/* 🕵️‍♂️ THE SECRET ADMIN TRIGGER */}
            {/* This div is at the bottom. It is invisible (opacity 0). */}
            <div
                onClick={onUnlock}
                style={{
                    marginTop: 'auto',
                    height: '40px',
                    width: '100%',
                    cursor: 'pointer',
                    opacity: isAdmin ? 1 : 0, /* Shows 'Admin Mode' text only when logged in */
                    color: '#60a5fa',
                    fontSize: '10px',
                    textAlign: 'center',
                    borderTop: isAdmin ? '1px dashed rgba(96, 165, 250, 0.2)' : 'none',
                    paddingTop: '10px'
                }}
            >
                {isAdmin ? "Admin Mode Active" : ""}
            </div>
        </aside>
    );
}

export default Sidebar;